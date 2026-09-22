import assert from "node:assert/strict";
import {test,before,after,beforeEach} from "node:test";
import fs from "node:fs/promises";
import {randomUUID} from "node:crypto";
import {PGlite} from "@electric-sql/pglite";
process.env.NODE_ENV="test";
const {setTestDatabase,query}=await import("../server/blog/db.ts");
const {startAuto,advanceAuto,autoRun,cancelAuto,autoConfiguration}=await import("../server/blog/auto.ts");
const editorial=await import("../server/blog/editorial.ts");
const {getPost,createPost,listPosts,transition}=await import("../server/blog/posts.ts");
const {captionAndPlace}=await import("../server/blog/visuals.ts");
const {verify}=await import("../server/blog/quality.ts");
let db;
before(async()=>{db=new PGlite();for(const name of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile(new URL("../migrations/blog/"+name,import.meta.url),"utf8"));setTestDatabase(db);});
after(async()=>{setTestDatabase();await db.close();});
beforeEach(async()=>{await query("UPDATE fc_blog_auto_runs SET status='cancelled' WHERE status='running'");await query("DELETE FROM fc_blog_limits");process.env.BLOG_AI_ENABLED="true";process.env.BLOG_IMAGES_ENABLED="true";process.env.OPENAI_API_KEY="unit-only-key";process.env.BLOB_READ_WRITE_TOKEN="unit-only-blob";process.env.BLOB_PUBLIC_HOSTNAME="client.public.blob.vercel-storage.com";});
const input=()=>({requestId:randomUUID(),language:"en",translate:true,focus:"Preventive visit preparation"});
const candidate={id:"test-preventive-care",title:"Prepare useful questions for your preventive care visit",angle:"A practical conversation about preparing for preventive screening",keyword:"preventive visit",category:"prevention",sourceUrls:["https://medlineplus.gov/healthscreening.html"],recommendation:"create_new",reason:"Distinct practical discussion",overlap:0,score:100,matches:[]};
const body=Array.from({length:4},(_,i)=>"<h2>Section "+i+"</h2>"+Array.from({length:20},()=>"<p>Prepare a written list of questions to discuss your individual screening needs with your clinician during a visit.</p>").join("")).join("")+'<p><a href="/primary-care">Primary care</a> <a href="/contact">Contact</a> <a href="'+candidate.sourceUrls[0]+'">Source</a></p>';
const metadata={slug:"test-preventive-visit",excerpt:"Practical questions to prepare for a preventive care visit.",metaTitle:"Prepare for preventive care",metaDescription:"Prepare a useful question list for your preventive care visit and discuss individual screening choices with your clinician.",tags:["prevention","appointments"]};
const counts={};
const services={...editorial,
 ideate:async()=>{counts.ideas=(counts.ideas||0)+1;return [candidate];},
 assess:async()=>({candidates:[candidate],selected:candidate}),
 research:async()=>[{url:candidate.sourceUrls[0],score:100,excerpt:"Fixture research"}],
 buildBrief:async()=>({sections:["One","Two","Three","Four"],facts:[{},{}]}),
 writeArticle:async()=>({title:candidate.title,content:body}),expandArticle:async article=>article,
 makeMetadata:async()=>metadata,
 planVisuals:async()=>[{role:"hero",afterHeading:0,prompt:"A contextual fixture prompt",alt:"A closed notebook on a desk"},{role:"inline",afterHeading:1,prompt:"Context one",alt:"A glass of water on a desk"},{role:"inline",afterHeading:3,prompt:"Context two",alt:"An empty chair by a window"}],
 generateImage:async(id,key,role,alt,placement)=>{counts.images=(counts.images||0)+1;return (await query("INSERT INTO fc_blog_media(post_id,url,role,alt,placement,source) VALUES($1,$2,$3,$4,$5,'ai') RETURNING *",[id,"https://client.public.blob.vercel-storage.com/faithful-care/blog/"+id+"/"+key+".webp",role,alt,placement]))[0];},
 captionAndPlace:async(id,ids,version,actor)=>{
  const old=globalThis.fetch;
  globalThis.fetch=async(_url,options)=>{const body=JSON.parse(options.body);assert.equal(body.messages[1].content.filter(x=>x.type==="image_url").length,3);const data=JSON.parse(body.messages[1].content[0].text);return Response.json({choices:[{finish_reason:"stop",message:{content:JSON.stringify({images:data.images.map((m,i)=>({id:m.id,alt:"Visible still life composition number "+i}))})}}]});};
  try{return await captionAndPlace(id,ids,version,actor);}finally{globalThis.fetch=old;}
 },
 translatePost:async(id)=>{counts.translations=(counts.translations||0)+1;const p=await getPost(id);return createPost({...p,language:"es",slug:"visita-preventiva-prueba",title:"Preguntas para una visita preventiva"}, "test-editor",p.translation_group);},
 verify
};
test("Auto Generate fails closed before creating a run when AI is disconnected",async()=>{
 delete process.env.OPENAI_API_KEY;assert.equal(autoConfiguration().ready,false);await assert.rejects(()=>startAuto(input(),"test-editor"),e=>e.status===503);assert.equal((await query("SELECT id FROM fc_blog_auto_runs")).length,0);
});
test("workflow runs every stage, saves private bilingual drafts and never approves images",async()=>{
 const request=input();let run=await startAuto(request,"test-editor");assert.equal((await startAuto(request,"test-editor")).id,run.id);
 const oldFetch=globalThis.fetch;globalThis.fetch=async()=>{throw Error("Unexpected provider call");};
 try{for(let i=0;i<15;i++){run=await advanceAuto(run.id,i,services);assert.equal(run.cursor,i+1,run.error);}}finally{globalThis.fetch=oldFetch;}
 assert.equal(run.status,"completed");assert.equal(counts.images,3);assert.equal(counts.translations,1);
 const post=await getPost(run.post_id),translated=await getPost(run.translation_id);assert.equal(post.status,"draft");assert.equal(post.published_at,null);assert.equal(translated.translation_group,post.translation_group);assert.equal(post.data.images.length,2);
 assert.equal((await listPosts()).length,0);assert((await query("SELECT reviewed FROM fc_blog_media")).every(m=>m.reviewed===false));
 assert.equal(run.steps[6].outputs.Slug,metadata.slug);assert(run.steps[12].outputs["Hero alt"]);
 await assert.rejects(()=>transition(post.id,"published",post.version,"test-editor"),e=>e.status===422);
 const before=counts.images;await advanceAuto(run.id,9,services);assert.equal(counts.images,before);
});
test("two concurrent clients execute a stage only once and stale cursors do not advance",async()=>{
 const run=await startAuto(input(),"test-editor");let release,entered;
 const gate=new Promise(r=>release=r),ready=new Promise(r=>entered=r);let calls=0;
 const deps={...services,ideate:async()=>{calls++;entered();await gate;return [candidate];}};
 const first=advanceAuto(run.id,0,deps);await ready;const second=await advanceAuto(run.id,0,deps);assert(second.lease_token);assert.equal(calls,1);
 release();assert.equal((await first).cursor,1);assert.equal((await advanceAuto(run.id,0,deps)).cursor,1);assert.equal(calls,1);await cancelAuto(run.id);
});
test("interrupted leases stop without a blind provider retry",async()=>{
 const run=await startAuto(input(),"test-editor");await query("UPDATE fc_blog_auto_runs SET lease_token=$2,lease_until=now()-interval '1 second' WHERE id=$1",[run.id,randomUUID()]);
 const expired=await autoRun(run.id);assert.equal(expired.status,"failed");let called=false;
 const result=await advanceAuto(run.id,0,{...services,ideate:async()=>{called=true;return [];}});assert.equal(result.status,"failed");assert.equal(called,false);
});
test("cancel during a provider request fences later workflow writes",async()=>{
 const run=await startAuto(input(),"test-editor");let release,entered;const gate=new Promise(r=>release=r),ready=new Promise(r=>entered=r);
 const running=advanceAuto(run.id,0,{...services,ideate:async()=>{entered();await gate;return [candidate];}});await ready;await cancelAuto(run.id);release();
 const ended=await running;assert.equal(ended.status,"cancelled");assert.equal(ended.cursor,0);
});
