import assert from "node:assert/strict";
import {test,before,after} from "node:test";
import fs from "node:fs/promises";
import {randomUUID} from "node:crypto";
import {PGlite} from "@electric-sql/pglite";
process.env.NODE_ENV="test";
const {setTestDatabase,query}=await import("../server/blog/db.ts");
const {createPost,deletePost,listPosts,getPost,editPost,transition,publicPost}=await import("../server/blog/posts.ts");
const {blankData}=await import("../server/blog/types.ts");
const {claimJob,saveGeneratedPost}=await import("../server/blog/jobs.ts");
let db;
before(async()=>{db=new PGlite();for(const n of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile(new URL("../migrations/blog/"+n,import.meta.url),"utf8"));setTestDatabase(db);});
after(async()=>{setTestDatabase();await db.close();});
const input=()=>({language:"en",title:"Deletion verification article",slug:"delete-"+randomUUID(),content:"<p>Test draft.</p>",data:{...blankData}});
test("deletion hides only the chosen language and keeps shared media and audit",async()=>{
 const a=await createPost(input(),"tester"),b=await createPost({...input(),language:"es"},"tester",a.translation_group);
 await query("INSERT INTO fc_blog_media(post_id,url,role,alt,source) VALUES($1,$2,'hero','Test shared image','ai')",[a.id,"https://example.com/"+a.id]);
 await deletePost(a.id,a.version,"tester");
 assert(!(await listPosts(undefined,true)).some(p=>p.id===a.id));assert.equal((await getPost(b.id)).id,b.id);
 await assert.rejects(()=>getPost(a.id),e=>e.status===404);
 await assert.rejects(()=>editPost(a.id,input(),a.version,"tester"),e=>e.status===409);
 await assert.rejects(()=>transition(a.id,"published",a.version,"tester"),e=>e.status===404);
 assert.equal(await publicPost("en",a.slug),null);
 assert.equal((await query("SELECT * FROM fc_blog_media WHERE post_id=$1",[a.id])).length,1);
 assert.equal((await query("SELECT * FROM fc_blog_events WHERE post_id=$1 AND action='deleted'",[a.id])).length,1);
});
test("published, stale and generating articles cannot be deleted",async()=>{
 const a=await createPost(input(),"tester");
 await assert.rejects(()=>deletePost(a.id,a.version+1,"tester"),e=>e.status===409);
 await query("UPDATE fc_blog_posts SET status='published',published_at=now() WHERE id=$1",[a.id]);
 await assert.rejects(()=>deletePost(a.id,a.version,"tester"),e=>e.status===409);
 await query("UPDATE fc_blog_posts SET status='draft',published_at=NULL WHERE id=$1",[a.id]);
 await claimJob("image",randomUUID(),"tester",{postId:a.id});
 await assert.rejects(()=>deletePost(a.id,a.version,"tester"),e=>e.status===409);
});
test("concurrent delete requests produce exactly one deletion",async()=>{
 const a=await createPost(input(),"tester");const results=await Promise.allSettled([deletePost(a.id,a.version,"tester"),deletePost(a.id,a.version,"tester")]);
 assert.equal(results.filter(r=>r.status==="fulfilled").length,1);
});

test("active translation blocks source deletion and deleted translation can be regenerated",async()=>{
 const a=await createPost(input(),"tester"),b=await createPost({...input(),language:"es"},"tester",a.translation_group);
 await deletePost(b.id,b.version,"tester");
 const job=await claimJob("translate",randomUUID(),"tester",{sourceId:a.id});
 await assert.rejects(()=>deletePost(a.id,a.version,"tester"),e=>e.status===409);
 const replacement={...input(),language:"es"};
 const restored=await saveGeneratedPost(replacement,"tester",job.id,a.translation_group,{id:a.id,version:a.version});
 assert.equal(restored.id,b.id);assert.equal(restored.slug,replacement.slug);assert.equal(restored.status,"draft");assert(!restored.data.deletedAt);
 assert.equal((await getPost(restored.id)).id,b.id);
});

test("deletion frees topic and slug and clears completed generator links",async()=>{
 const original={...input(),data:{...blankData,topic:"Reusable topic"}};const a=await createPost(original,"tester");
 await query("INSERT INTO fc_blog_auto_runs(request_key,actor,language,status,steps,post_id) VALUES($1,'tester','en','completed','[]',$2)",[randomUUID(),a.id]);
 await deletePost(a.id,a.version,"tester");
 assert.equal((await query("SELECT post_id FROM fc_blog_auto_runs WHERE actor='tester' ORDER BY created_at DESC LIMIT 1"))[0].post_id,null);
 const replacement=await createPost(original,"tester");assert.notEqual(replacement.id,a.id);assert.equal(replacement.slug,a.slug);
});
