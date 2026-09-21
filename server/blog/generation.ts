import {TOPICS} from "./catalog";
import {aiConfig} from "./provider";
import {claimJob,failJob,jobStage,saveGeneratedPost} from "./jobs";
import {listPosts} from "./posts";
import {consumeLimit} from "./auth";
import {BlogError,type Language} from "./types";
import {assess,research,buildBrief,writeArticle,expandArticle,makeMetadata,assemble,similarity,type Candidate} from "./editorial";
export const overlap=similarity;
export async function topicPlan(language:Language){
 const existing=await listPosts(undefined,true);
 return TOPICS.map(topic=>{const matches=existing.map(p=>({id:p.id,title:p.title,score:p.data.topic===topic.id?1:overlap(topic[language],p.title+" "+p.data.excerpt+" "+p.data.topic)})).filter(p=>p.score>=.55).sort((a,b)=>b.score-a.score);return {...topic,title:topic[language],matches,recommendation:matches.length?"update_existing":"create_new"};});
}
export async function generateDraft(topicId:string,language:Language,key:string,actor:string){
 aiConfig();
 const topic=TOPICS.find(t=>t.id===topicId);if(!topic)throw new BlogError(400,"Choose a catalog topic.");
 const candidate:Candidate={id:topic.id,title:topic[language],angle:topic[language]+"; practical questions for a clinical conversation",keyword:topic[language],category:topic.category,sourceUrls:[topic.source]};
 const job=await claimJob("generate",key,actor,{topicId,language});
 try{
  await consumeLimit("text-generation-global",5,3600);
  await jobStage(job.id,"semantic_review");await assess([candidate],await listPosts(undefined,true));
  await jobStage(job.id,"checking_sources");const sources=await research(candidate,actor);
  await jobStage(job.id,"editorial_brief");const brief=await buildBrief(candidate,language,sources);
  await jobStage(job.id,"writing");const article=await writeArticle(candidate,language,brief);
  await jobStage(job.id,"expanding");const expanded=await expandArticle(article,candidate,language,brief);
  await jobStage(job.id,"seo_metadata");const metadata=await makeMetadata(expanded,candidate,language);
  const post=assemble(candidate,language,expanded,metadata,brief.relatedLinks);
  await jobStage(job.id,"saving_draft");return await saveGeneratedPost(post,actor,job.id);
 }catch(e){await failJob(job.id,e instanceof BlogError?e.message:"Generation failed safely.");throw e;}
}
