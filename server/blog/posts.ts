import { query,configured } from "./db";
import { postInput,sanitize,hrefs } from "./content";
import { BlogError, type Post, type Language, type Status } from "./types";
export async function listPosts(language?:Language,admin=false) {
  if(!configured()) return [];
  return query<Post>(`SELECT * FROM fc_blog_posts WHERE NOT (data ? 'deletedAt') AND ($1::text IS NULL OR language=$1)
    AND ($2::boolean OR status='published') ORDER BY published_at DESC NULLS LAST,created_at DESC`,[language||null,admin]);
}
export async function getPost(id:string) {
  if(!/^[a-f0-9-]{36}$/i.test(id)) throw new BlogError(404,"Article not found.");
  const rows=await query<Post>("SELECT * FROM fc_blog_posts WHERE id=$1 AND NOT (data ? 'deletedAt')",[id]);
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
    updated_at=now(),status='draft' WHERE id=$1 AND NOT (data ? 'deletedAt') AND version=$6 AND status<>'published' AND language=$7 AND (slug=$3 OR (published_at IS NULL AND NOT EXISTS (SELECT 1 FROM fc_blog_events e WHERE e.post_id=fc_blog_posts.id AND e.action='published'))) RETURNING *), audit AS (INSERT INTO fc_blog_events(post_id,action,actor) SELECT id,'edited',$8 FROM changed) SELECT * FROM changed`,
    [id,inputData.title,inputData.slug,sanitize(inputData.content),JSON.stringify({...inputData.data,reviewConfirmed:false,reviewer:""}),version,inputData.language,actor]);
  if(!rows[0]) throw new BlogError(409,"The article changed, is published, or its previously published URL was changed. Reload it; unpublish before editing and keep the original slug.");

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
    published_at=CASE WHEN $2='published' THEN COALESCE(published_at,(SELECT min(e.created_at) FROM fc_blog_events e WHERE e.post_id=fc_blog_posts.id AND e.action='published'),now()) ELSE NULL END WHERE id=$1 AND NOT (data ? 'deletedAt') AND version=$4 RETURNING *), audit AS (INSERT INTO fc_blog_events(post_id,action,actor,detail) SELECT id,$2,$5,$6 FROM changed) SELECT * FROM changed`,[id,next,JSON.stringify(data),version,actor,JSON.stringify({publicationChecks:next==="published"?"passed":null})]);
  if(!rows[0]) throw new BlogError(409,"The article changed. Reload before publishing.");

  return rows[0];
}
export async function event(id:string|null,action:string,actor:string,detail:unknown={}) {
  await query("INSERT INTO fc_blog_events(post_id,action,actor,detail) VALUES($1,$2,$3,$4)",[id,action,actor,JSON.stringify(detail)]);
}

export async function incomingArticleLinks(id:string) {
  const target=await getPost(id);
  const path=(target.language==="es"?"/es":"")+"/blog/"+target.slug;
  return (await listPosts()).filter(post=>post.id!==id&&hrefs(post.content).some(href=>href.split(/[?#]/)[0]===path))
    .map(post=>({id:post.id,title:post.title,language:post.language,url:(post.language==="es"?"/es":"")+"/blog/"+post.slug}));
}

// Keep audit history and shared translated media; deleted articles are private tombstones.
export async function deletePost(id:string,version:number,actor:string){
 const rows=await query(`WITH changed AS (
  UPDATE fc_blog_posts SET data=data||jsonb_build_object('deletedAt',now()),
   version=version+1,updated_at=now()
  WHERE id=$1 AND version=$2 AND status<>'published' AND NOT (data ? 'deletedAt')
  AND NOT EXISTS(SELECT 1 FROM fc_blog_auto_runs WHERE status='running' AND (post_id=$1 OR translation_id=$1))
  AND NOT EXISTS(SELECT 1 FROM fc_blog_jobs WHERE status='running' AND post_id=$1)
  RETURNING id
 ), audit AS (INSERT INTO fc_blog_events(post_id,action,actor) SELECT id,'deleted',$3 FROM changed)
 SELECT id FROM changed`,[id,version,actor]);
 if(!rows.length)throw new BlogError(409,"The article changed, is published, or is still generating. Reload and unpublish it before deleting.");
}
