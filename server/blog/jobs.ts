import {query} from "./db";
import {BlogError,type Post} from "./types";
import {postInput,sanitize} from "./content";
export interface Job {id:string;post_id:string|null;kind:string;status:string;stage:string;detail:Record<string,unknown>;created_at:string;updated_at:string}
export async function claimJob(kind:string,key:string,actor:string,detail:Record<string,unknown>={}){
 if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(key))throw new BlogError(400,"A unique operation ID is required.");
 const rows=await query<Job>("INSERT INTO fc_blog_jobs(kind,status,request_key,detail) VALUES($1,'running',$2,$3) ON CONFLICT(request_key) DO NOTHING RETURNING *",[kind,key,JSON.stringify({...detail,actor})]);
 if(!rows[0])throw new BlogError(409,"This operation was already started. Check operation history before trying again.");
 return rows[0];
}
export async function jobStage(id:string,stage:string){await query("UPDATE fc_blog_jobs SET stage=$2,updated_at=now() WHERE id=$1 AND status='running'",[id,stage]);}
export async function failJob(id:string,message:string){await query("UPDATE fc_blog_jobs SET status='failed',stage='stopped',detail=detail||$2::jsonb,updated_at=now() WHERE id=$1 AND status='running'",[id,JSON.stringify({error:message})]);}
export async function jobHistory(){
 await query("UPDATE fc_blog_jobs SET status='failed',stage='interrupted',detail=detail||'{\"error\":\"Operation exceeded the execution window; inspect before retrying.\"}'::jsonb,updated_at=now() WHERE status='running' AND updated_at<now()-interval '15 minutes'");
 return query<Job>("SELECT * FROM fc_blog_jobs ORDER BY created_at DESC LIMIT 30");
}
export async function saveGeneratedPost(input:unknown,actor:string,jobId:string,group?:string){
 const p=postInput.parse(input);const data={...p.data,reviewConfirmed:false,reviewer:""};
 const rows=await query<Post>(`WITH admitted AS (
   SELECT id FROM fc_blog_jobs WHERE id=$7 AND status='running' FOR UPDATE
 ), changed AS (
 INSERT INTO fc_blog_posts(language,title,slug,content,data,translation_group)
 SELECT $1,$2,$3,$4,$5,COALESCE($6::uuid,gen_random_uuid()) FROM admitted RETURNING *
 ), audit AS (INSERT INTO fc_blog_events(post_id,action,actor,detail) SELECT id,'generated',$8,jsonb_build_object('jobId',$7::text) FROM changed),
 complete AS (UPDATE fc_blog_jobs SET status='completed',stage='draft_saved',post_id=(SELECT id FROM changed),updated_at=now() WHERE id=$7 AND EXISTS(SELECT 1 FROM changed))
 SELECT * FROM changed`,[p.language,p.title,p.slug,sanitize(p.content),JSON.stringify(data),group||null,jobId,actor]);
 if(!rows[0])throw new BlogError(409,"This operation is no longer active.");
 return rows[0];
}
