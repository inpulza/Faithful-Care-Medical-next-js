import {randomUUID} from "node:crypto";
import {z} from "zod";
import {query,configured} from "./db";
import {aiConfig,rejectPrivateInformation} from "./provider";
import {mediaConfigured,generateImage} from "./media";
import {consumeLimit} from "./auth";
import {reserveImageBudget} from "./image-budget";
import {listPosts,getPost} from "./posts";
import {translatePost} from "./translation";
import {verify} from "./quality";
import * as editorial from "./editorial";
import {planVisuals,captionAndPlace} from "./visuals";
import {BlogError,type Language,type Post} from "./types";
import {AUTO_STEPS,type AutoStep,type AutoView} from "../../shared/blog-auto";

export type AutoRun={id:string;request_key:string;actor:string;language:Language;focus:string;translate:boolean;status:AutoView["status"];cursor:number;state:Record<string,any>;steps:AutoStep[];post_id:string|null;translation_id:string|null;lease_token:string|null;lease_until:string|null;error:string|null};
const inputSchema=z.object({requestId:z.string().uuid(),language:z.enum(["en","es"]),focus:z.string().trim().max(300).default(""),translate:z.boolean().default(true)});
export function autoConfiguration(){
 const missing:string[]=[];
 if(!configured())missing.push("Editorial database");
 if(process.env.BLOG_AI_ENABLED!=="true"||!process.env.OPENAI_API_KEY)missing.push("AI writing and translation");
 if(process.env.BLOG_IMAGES_ENABLED!=="true"||!process.env.OPENAI_API_KEY)missing.push("AI image generation");
 if(!mediaConfigured())missing.push("Article image storage");
 return {ready:missing.length===0,missing};
}
function preflight(){aiConfig();const c=autoConfiguration();if(!c.ready)throw new BlogError(503,"Auto Generate is not connected yet: "+c.missing.join(", ")+". No generation was started.");}
export function viewRun(r:AutoRun):AutoView{return {id:r.id,status:r.status,cursor:r.cursor,busy:!!r.lease_token,language:r.language,steps:r.steps,postId:r.post_id,translationId:r.translation_id,error:r.error};}
async function expireRuns(){
 await query("UPDATE fc_blog_auto_runs SET status='failed',error='The last step was interrupted. Inspect its saved draft and operation history before starting another run; it was not retried.',lease_token=NULL,lease_until=NULL,updated_at=now() WHERE status='running' AND lease_until<now()");
}
export async function autoRun(id:string){
 if(!z.string().uuid().safeParse(id).success)throw new BlogError(404,"Generation run not found.");
 await expireRuns();const [run]=await query<AutoRun>("SELECT * FROM fc_blog_auto_runs WHERE id=$1",[id]);
 if(!run)throw new BlogError(404,"Generation run not found.");return run;
}
export async function currentRun(){await expireRuns();return (await query<AutoRun>("SELECT * FROM fc_blog_auto_runs ORDER BY (status='running') DESC,created_at DESC LIMIT 1"))[0]||null;}
export async function startAuto(input:unknown,actor:string){
 const p=inputSchema.parse(input);rejectPrivateInformation(p.focus);
 await expireRuns();
 const existing=(await query<AutoRun>("SELECT * FROM fc_blog_auto_runs WHERE request_key=$1",[p.requestId]))[0];
 if(existing){if(existing.actor!==actor||existing.language!==p.language||existing.focus!==p.focus||existing.translate!==p.translate)throw new BlogError(409,"That operation ID belongs to a different request.");return existing;}
 preflight();
 const active=(await query<AutoRun>("SELECT * FROM fc_blog_auto_runs WHERE status='running' LIMIT 1"))[0];if(active)return active;
 await consumeLimit("auto-generation-global",2,3600);
 const steps:AutoStep[]=AUTO_STEPS.map(([id,label])=>({id,label,status:"pending"}));
 const keys=Object.fromEntries(["hero","inline_1","inline_2","translation"].map(k=>[k,randomUUID()]));
 // Hold an admission lease until all three images have budget. A concurrent
 // client can see the run, but cannot start a provider request before admission.
 const admission=randomUUID();
 const rows=await query<AutoRun>("INSERT INTO fc_blog_auto_runs(request_key,actor,language,focus,translate,state,steps,lease_token,lease_until) VALUES($1,$2,$3,$4,$5,$6,$7,$8,now()+interval '6 minutes') ON CONFLICT DO NOTHING RETURNING *",[p.requestId,actor,p.language,p.focus,p.translate,JSON.stringify({keys,imageBudgetReserved:false}),JSON.stringify(steps),admission]);
 if(rows[0]){
  try{
   await reserveImageBudget([keys.hero,keys.inline_1,keys.inline_2]);
   await query("UPDATE fc_blog_auto_runs SET state=state||'{\"imageBudgetReserved\":true}'::jsonb,lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id=$1 AND lease_token=$2 AND status='running'",[rows[0].id,admission]);
   return autoRun(rows[0].id);
  }catch(error){
   const message=error instanceof BlogError?error.message:"Image budget admission did not complete. No AI requests were sent.";
   await query("UPDATE fc_blog_auto_runs SET status='failed',error=$3,lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id=$1 AND lease_token=$2 AND status='running'",[rows[0].id,admission,message]);
   throw error;
  }
 }
 const raced=(await query<AutoRun>("SELECT * FROM fc_blog_auto_runs WHERE request_key=$1 OR status='running' ORDER BY created_at DESC LIMIT 1",[p.requestId]))[0];
 if(!raced)throw new BlogError(409,"Another generation finished while this request started. Refresh the run history.");return raced;
}
export async function cancelAuto(id:string){
 await autoRun(id);
 await query("UPDATE fc_blog_auto_runs SET status='cancelled',error='Stopped by the editor. An already submitted provider request may still finish; inspect saved candidates before starting again.',lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id=$1 AND status='running'",[id]);
 return autoRun(id);
}
const defaults={...editorial,planVisuals,generateImage,captionAndPlace,translatePost,verify};
export type AutoServices=typeof defaults;

async function persistDraft(run:AutoRun,token:string,input:ReturnType<typeof editorial.assemble>){
 // Deterministic ID plus the run lease prevents duplicate drafts after an ambiguous response.
 const rows=await query<Post>(`WITH admitted AS (
 SELECT id FROM fc_blog_auto_runs WHERE id=$1 AND lease_token=$7 AND status='running' FOR UPDATE
 ), inserted AS (
 INSERT INTO fc_blog_posts(id,language,title,slug,content,data) SELECT id,$2,$3,$4,$5,$6 FROM admitted ON CONFLICT(id) DO NOTHING RETURNING *
 ), linked AS (
 UPDATE fc_blog_auto_runs SET post_id=$1 WHERE id=$1 AND lease_token=$7 AND EXISTS(SELECT 1 FROM inserted)
 ), audit AS (
 INSERT INTO fc_blog_events(post_id,action,actor,detail) SELECT id,'auto_draft_saved',$8,jsonb_build_object('runId',$1::text) FROM inserted
 ) SELECT * FROM inserted`,[run.id,input.language,input.title,input.slug,input.content,JSON.stringify(input.data),token,run.actor]);
 if(rows[0])return rows[0];
 const current=await autoRun(run.id);if(current.status!=="running"||current.lease_token!==token||current.post_id!==run.id)throw new BlogError(409,"The generation lease changed. No draft was saved.");
 return getPost(run.id);
}
export async function advanceAuto(id:string,expectedCursor:number,services:AutoServices=defaults){
 const current=await autoRun(id);
 if(current.status!=="running"||current.cursor!==expectedCursor||current.lease_token)return current;
 if(current.state.imageBudgetReserved!==true){
  await query("UPDATE fc_blog_auto_runs SET status='failed',error='This run has no confirmed image budget reservation. Inspect its saved progress before starting again.',updated_at=now() WHERE id=$1 AND status='running' AND lease_token IS NULL",[id]);
  return autoRun(id);
 }
 preflight();
 const token=randomUUID();
 const claimed=await query<AutoRun>("UPDATE fc_blog_auto_runs SET lease_token=$2,lease_until=now()+interval '6 minutes',updated_at=now() WHERE id=$1 AND status='running' AND lease_token IS NULL AND cursor=$3 RETURNING *",[id,token,expectedCursor]);
 if(!claimed[0])return autoRun(id);
 const run=claimed[0],state={...run.state},steps=run.steps.map(s=>({...s}));
 const step=steps[run.cursor];step.status="running";step.detail="Working";
 await query("UPDATE fc_blog_auto_runs SET steps=$3 WHERE id=$1 AND lease_token=$2",[id,token,JSON.stringify(steps)]);
 let postId=run.post_id,translationId=run.translation_id;
 const outputs:Record<string,string>={};
 try{
  switch(step.id){
   case "ideas":state.candidates=await services.ideate(run.language,run.focus,await listPosts(undefined,true));outputs.Candidates=state.candidates.map((c:any)=>c.title).join("\n");break;
   case "memory":state.plan=await services.assess(state.candidates,await listPosts(undefined,true),run.focus);outputs.Topic=state.plan.selected.title;outputs.Angle=state.plan.selected.angle;outputs.Reason=state.plan.selected.reason;break;
   case "research":state.sources=await services.research(state.plan.selected,run.actor);outputs.Sources=state.sources.map((s:any)=>s.url+" · "+s.score+"/100").join("\n");break;
   case "brief":state.brief=await services.buildBrief(state.plan.selected,run.language,state.sources);outputs.Sections=state.brief.sections.join("\n");outputs.Evidence=state.brief.facts.length+" supported research points";break;
   case "writing":state.article=await services.writeArticle(state.plan.selected,run.language,state.brief);outputs.H1=state.article.title;break;
   case "expansion":state.article=await services.expandArticle(state.article,state.plan.selected,run.language,state.brief);outputs.H1=state.article.title;break;
   case "metadata":state.metadata=await services.makeMetadata(state.article,state.plan.selected,run.language);outputs.Slug=state.metadata.slug;outputs["Meta title"]=state.metadata.metaTitle;outputs["Meta description"]=state.metadata.metaDescription;outputs.Summary=state.metadata.excerpt;outputs.Tags=state.metadata.tags.join(", ");break;
   case "save":{const input=services.assemble(state.plan.selected,run.language,state.article,state.metadata,state.brief?.relatedLinks);const post=await persistDraft(run,token,input);postId=post.id;state.version=post.version;outputs.Status="Private draft saved";break;}
   case "visual_plan":{const post=await getPost(postId!);if(post.status!=="draft"||post.version!==state.version)throw new BlogError(409,"The saved draft changed. Stop and review it before generating images.");state.visuals=await services.planVisuals(post);outputs.Placement=state.visuals.map((v:any)=>v.role==="hero"?"Hero":"After section "+v.afterHeading).join("\n");break;}
   case "hero":case "inline_1":case "inline_2":{
    const post=await getPost(postId!);if(post.status!=="draft"||post.version!==state.version)throw new BlogError(409,"The saved draft changed before image generation.");
    const index=step.id==="hero"?0:step.id==="inline_1"?1:2,visual=state.visuals[index];
    const media=await services.generateImage(postId!,state.keys[step.id],visual.role,visual.alt,visual.afterHeading||1,run.actor,visual.prompt);
    state.media={...state.media,[step.id]:media.id};outputs.Status="Candidate saved; visual review is pending";break;
   }
   case "alt_text":{const post=await services.captionAndPlace(postId!,[state.media.hero,state.media.inline_1,state.media.inline_2],state.version,run.actor);state.version=post.version;outputs["Hero alt"]=post.data.heroAlt;post.data.images.forEach((m,i)=>outputs["Inline "+(i+1)+" alt"]=m.alt);break;}
   case "translation":{
    if(!run.translate){step.status="skipped";outputs.Status="Second language was not requested";break;}
    const post=await getPost(postId!);if(post.status!=="draft"||post.version!==state.version)throw new BlogError(409,"The original draft changed before translation.");
    const translated=await services.translatePost(postId!,state.keys.translation,run.actor);translationId=translated.id;outputs.Language=translated.language.toUpperCase();outputs.H1=translated.title;outputs.Slug=translated.slug;outputs["Meta description"]=translated.data.metaDescription;break;
   }
   case "verify":{
    const post=await getPost(postId!);state.verification=await services.verify(post);
    if(translationId)state.translationVerification=await services.verify(await getPost(translationId));
    outputs.Words=String(state.verification.words);outputs["Before publication"]=[...state.verification.blockers,...state.verification.warnings].join("\n")||"Ready for the editor to publish from the dashboard.";
    outputs.Status="Draft preparation complete. Nothing was published.";break;
   }
  }
  if(step.status==="running")step.status="completed";step.detail=step.status==="skipped"?"Not requested":"Completed";step.outputs=outputs;
  const cursor=run.cursor+1,status=cursor===steps.length?"completed":"running";
  await query("UPDATE fc_blog_auto_runs SET state=$3,steps=$4,cursor=$5,status=$6,post_id=$7,translation_id=$8,lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id=$1 AND lease_token=$2 AND status='running'",[id,token,JSON.stringify(state),JSON.stringify(steps),cursor,status,postId,translationId]);
 }catch(error){
  step.status="failed";const message=error instanceof BlogError?error.message:error instanceof z.ZodError?"The AI response did not match the required structure. Review this step before trying another run.":"This step could not finish. Inspect the saved draft and operation history before starting again.";
  step.detail=message;
  await query("UPDATE fc_blog_auto_runs SET status='failed',error=$3,steps=$4,lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id=$1 AND lease_token=$2 AND status='running'",[id,token,message,JSON.stringify(steps)]);
 }
 return autoRun(id);
}
