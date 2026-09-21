import { query,configured } from "./db";
import { postInput,sanitize } from "./content";
import { BlogError, type Post, type Language, type Status } from "./types";
export async function listPosts(language?:Language,admin=false) {
  if(!configured()) return [];
  return query<Post>(`SELECT * FROM fc_blog_posts WHERE ($1::text IS NULL OR language=$1)
    AND ($2::boolean OR status='published') ORDER BY published_at DESC NULLS LAST,created_at DESC`,[language||null,admin]);
}
export async function getPost(id:string) {
  if(!/^[a-f0-9-]{36}$/i.test(id)) throw new BlogError(404,"Article not found.");
  const rows=await query<Post>("SELECT * FROM fc_blog_posts WHERE id=$1",[id]);
  if(!rows[0]) throw new BlogError(404,"Article not found.");
  return rows[0];
}
export async function publicPost(language:Language,slug:string) {
  if(!configured()) return null;
  return (await query<Post>("SELECT * FROM fc_blog_posts WHERE language=$1 AND slug=$2 AND status='published'",[language,slug]))[0]||null;
}
export async function translations(post:Post) {
  return query<Post>("SELECT * FROM fc_blog_posts WHERE translation_group=$1 AND status='published'",[post.translation_group]);
}
export async function createPost(input:unknown,actor:string,translationGroup?:string) {
  const data=postInput.parse(input);
  const [post]=await query<Post>(`WITH changed AS (INSERT INTO fc_blog_posts(language,title,slug,content,data,translation_group)
    VALUES($1,$2,$3,$4,$5,COALESCE($6::uuid,gen_random_uuid())) RETURNING *), audit AS (INSERT INTO fc_blog_events(post_id,action,actor) SELECT id,'created',$7 FROM changed) SELECT * FROM changed`,
    [data.language,data.title,data.slug,sanitize(data.content),JSON.stringify({...data.data,reviewConfirmed:false,reviewer:""}),translationGroup||null,actor]);

  return post;
}
export async function editPost(id:string,input:unknown,version:number,actor:string) {
  const inputData=postInput.parse(input);
  const rows=await query<Post>(`WITH changed AS (UPDATE fc_blog_posts SET title=$2,slug=$3,content=$4,data=$5,version=version+1,
    updated_at=now(),status='draft' WHERE id=$1 AND version=$6 AND status<>'published' AND language=$7 RETURNING *), audit AS (INSERT INTO fc_blog_events(post_id,action,actor) SELECT id,'edited',$8 FROM changed) SELECT * FROM changed`,
    [id,inputData.title,inputData.slug,sanitize(inputData.content),JSON.stringify({...inputData.data,reviewConfirmed:false,reviewer:""}),version,inputData.language,actor]);
  if(!rows[0]) throw new BlogError(409,"The article changed or is published. Reload it; unpublish before editing.");

  return rows[0];
}
export async function transition(id:string,next:Status,version:number,actor:string) {
  const post=await getPost(id);
  const allowed:Record<Status,Status[]>={draft:["pending_review","published","rejected"],pending_review:["published","draft","rejected"],published:["draft"],rejected:["draft"]};
  if(post.version!==version||!allowed[post.status].includes(next)) throw new BlogError(409,"Invalid or stale editorial transition.");
  if(next==="published") {
    const {verify}=await import("./quality");
    const report=await verify(post,{refreshSources:true,actor});
    if(report.blockers.length) throw new BlogError(422,report.blockers.join(" "));
  }
  const data={...post.data,reviewConfirmed:false,reviewer:""};
  const rows=await query<Post>(`WITH changed AS (UPDATE fc_blog_posts SET status=$2,data=$3,version=version+1,updated_at=now(),
    published_at=CASE WHEN $2='published' THEN now() ELSE NULL END WHERE id=$1 AND version=$4 RETURNING *), audit AS (INSERT INTO fc_blog_events(post_id,action,actor,detail) SELECT id,$2,$5,$6 FROM changed) SELECT * FROM changed`,[id,next,JSON.stringify(data),version,actor,JSON.stringify({publicationChecks:next==="published"?"passed":null})]);
  if(!rows[0]) throw new BlogError(409,"The article changed. Reload before publishing.");

  return rows[0];
}
export async function event(id:string|null,action:string,actor:string,detail:unknown={}) {
  await query("INSERT INTO fc_blog_events(post_id,action,actor,detail) VALUES($1,$2,$3,$4)",[id,action,actor,JSON.stringify(detail)]);
}
