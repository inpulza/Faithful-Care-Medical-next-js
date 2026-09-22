import assert from "node:assert/strict";
import {test,before,after} from "node:test";
import fs from "node:fs/promises";
import {PGlite} from "@electric-sql/pglite";
process.env.NODE_ENV="test";
const {setTestDatabase,query}=await import("../server/blog/db.ts");
const {passwordHash,login,session,logout,assertOrigin,consumeLimit}=await import("../server/blog/auth.ts");
const {createPost,editPost,getPost,listPosts,transition,publicPost,incomingArticleLinks}=await import("../server/blog/posts.ts");
const {blankData}=await import("../server/blog/types.ts");
const {sanitize}=await import("../server/blog/content.ts");
let db;
before(async()=>{db=new PGlite();for(const name of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile(new URL("../migrations/blog/"+name,import.meta.url),"utf8"));setTestDatabase(db);process.env.BLOG_ADMIN_USERNAME="test-editor";process.env.BLOG_ADMIN_PASSWORD_HASH=passwordHash("unit-only-example");process.env.BLOG_ADMIN_SESSION_SECRET="unit-only-secret-1234567890123456789012345";});
after(async()=>{setTestDatabase();await db.close();});
const input=(slug)=>({language:"en",title:"Preparing for your visit",slug,content:"<h2>Preparing</h2><p>Bring your questions.</p>",data:{...blankData}});
test("credentials, revocation, rotation, CSRF and durable rate limits",async()=>{
 await assert.rejects(()=>login("test-editor","wrong","wrong-test"),e=>e.status===401);
 const token=await login("test-editor","unit-only-example","valid-test");
 assert.equal((await session(token)).username,"test-editor");
 assert.equal(await session(token+"bad"),null);
 const rows=await query("SELECT token_hash FROM fc_blog_sessions");
 assert.notEqual(rows[0].token_hash,token);
 await logout(token);assert.equal(await session(token),null);
 const token2=await login("test-editor","unit-only-example","rotation");
 process.env.BLOG_ADMIN_SESSION_SECRET+="rotated";assert.equal(await session(token2),null);
 assert.throws(()=>assertOrigin(new Request("https://site.test/api",{headers:{origin:"https://attacker.test"}})),e=>e.status===403);
 assert.throws(()=>assertOrigin(new Request("https://site.test/api")),e=>e.status===403);
 assertOrigin(new Request("https://site.test/api",{headers:{origin:"https://site.test"}}));
 for(let i=0;i<3;i++)await consumeLimit("bounded-test",3,900);
 await assert.rejects(()=>consumeLimit("bounded-test",3,900),e=>e.status===429);
});
test("private drafts, sanitization, stale edits and publication gates",async()=>{
 const p=await createPost({...input("private-test"),content:'<h2>Safe</h2><script>alert(1)</script><p onclick="alert(1)">Text <a href="javascript:alert(1)">x</a></p>'},"tester");
 assert(!p.content.includes("<script"));assert(!p.content.includes("onclick"));assert(!p.content.includes("javascript:"));
 assert.equal(await publicPost("en",p.slug),null);
 assert.equal((await listPosts()).length,0);
 await assert.rejects(()=>transition(p.id,"published",p.version,"tester"),e=>e.status===422);
 const edited=await editPost(p.id,input("private-test"),p.version,"tester");
 await assert.rejects(()=>editPost(p.id,input("stale-test"),p.version,"tester"),e=>e.status===409);
 const review=await transition(p.id,"pending_review",edited.version,"tester");
 await assert.rejects(()=>transition(p.id,"published",review.version,"tester"),e=>e.status===422);
 assert.equal((await getPost(p.id)).status,"pending_review");
});
test("reviewed publish, language isolation and unpublish",async()=>{
 const source="https://medlineplus.gov/healthscreening.html";
 await query("INSERT INTO fc_blog_links(url,kind,publisher,score,reason,approved,health,checked_at) VALUES($1,'external','MedlinePlus',95,'US National Library of Medicine',false,'healthy',now())",[source]);
 const body="<h2>Prepare for the appointment</h2>"+Array.from({length:100},()=>"<p>Bring a written list of your questions and current medicines to discuss with your clinician.</p>").join("")+'<p><a href="/primary-care">Primary care</a> <a href="/contact">Contact</a> <a href="'+source+'">MedlinePlus</a></p>';
 const p=await createPost({...input("reviewed-test"),content:body,data:{...blankData,excerpt:"Practical questions to help prepare for an upcoming primary care visit.",metaTitle:"Preparing for a primary care visit",metaDescription:"Prepare for a primary care visit with a question list, your current medicines and practical information to discuss with your clinician.",tags:["prevention"],sources:[source],disclaimer:"This article provides general educational information and does not replace personal advice from a licensed clinician. In an emergency call 911."}},"tester");
 const published=await transition(p.id,"published",p.version,"tester");
 assert.equal(published.data.reviewConfirmed,false);assert.equal(published.data.reviewer,"");
 assert.equal((await query("SELECT actor FROM fc_blog_events WHERE post_id=$1 AND action='published'",[p.id]))[0].actor,"tester");
 assert.equal((await publicPost("en",p.slug)).id,p.id);assert.equal(await publicPost("es",p.slug),null);
 await assert.rejects(()=>editPost(p.id,input(p.slug),published.version,"tester"),e=>e.status===409);
 const dependent=await createPost({...p,slug:"dependent-public-post",content:p.content+'<p><a href="/blog/'+p.slug+'?from=related#article-section-1">Related preparation</a></p>'},"tester");
 const liveDependent=await transition(dependent.id,"published",dependent.version,"tester");
 const incoming=await incomingArticleLinks(p.id);assert.equal(incoming.length,1);assert.equal(incoming[0].id,dependent.id);
 await transition(dependent.id,"draft",liveDependent.version,"tester");assert.equal((await incomingArticleLinks(p.id)).length,0);
 const unpublished=await transition(p.id,"draft",published.version,"tester");
 assert.equal(unpublished.published_at,null);assert.equal(await publicPost("en",p.slug),null);
 await assert.rejects(()=>editPost(p.id,{...p,slug:"changed-public-url"},unpublished.version,"tester"),e=>e.status===409);
 const corrected=await editPost(p.id,{...p,title:"Preparing for your next visit"},unpublished.version,"tester");
 const republished=await transition(p.id,"published",corrected.version,"tester");
 assert.equal(String(republished.published_at),String(published.published_at));
 assert.equal((await publicPost("en",p.slug)).title,"Preparing for your next visit");
 // Older withdrawn rows may have lost published_at; the audit trail still locks their URL and restores the original date.
 const withdrawn=await transition(p.id,"draft",republished.version,"tester");
 await query("UPDATE fc_blog_posts SET published_at=NULL WHERE id=$1",[p.id]);
 await assert.rejects(()=>editPost(p.id,{...p,slug:"changed-legacy-url"},withdrawn.version,"tester"),e=>e.status===409);
 const restored=await transition(p.id,"published",withdrawn.version,"tester");
 const [firstEvent]=await query("SELECT min(created_at) AS first FROM fc_blog_events WHERE post_id=$1 AND action='published'",[p.id]);
 assert.equal(String(restored.published_at),String(firstEvent.first));
 await transition(p.id,"draft",restored.version,"tester");
});
test("sanitization is idempotent and rejects encoded active content",()=>{
 const clean=sanitize('<p><a href="https://medlineplus.gov/">Reference</a><a href="/contact">Care</a><img src=x onerror=alert(1)></p>');
 assert.equal(sanitize(clean),clean);
 assert(!sanitize('<a href="&#106;avascript:alert(1)">bad</a>').includes("javascript"));
});

test("generation operation IDs cannot duplicate drafts and saving completes atomically",async()=>{
 const {claimJob,saveGeneratedPost}=await import("../server/blog/jobs.ts");
 const key="2bb3a3a9-a2e6-4e2c-9c1a-89349079018d";
 const job=await claimJob("generate",key,"tester",{topicId:"visit-preparation"});
 await assert.rejects(()=>claimJob("generate",key,"tester"),e=>e.status===409);
 const p=await saveGeneratedPost(input("generated-atomic"),"tester",job.id);
 const [saved]=await query("SELECT * FROM fc_blog_jobs WHERE id=$1",[job.id]);
 assert.equal(saved.status,"completed");assert.equal(saved.post_id,p.id);
 assert.equal(p.status,"draft");assert.equal(p.published_at,null);
 await assert.rejects(()=>saveGeneratedPost(input("generated-repeat"),"tester",job.id),e=>e.status===409);
});

// A selected candidate is required even if its URL belongs to our store.
test("owned images need no separate approval; unrelated media still cannot be published",async()=>{
 const {verify}=await import("../server/blog/quality.ts");
 const {selectImage}=await import("../server/blog/media.ts");
 process.env.BLOB_PUBLIC_HOSTNAME="client.public.blob.vercel-storage.com";
 const url="https://client.public.blob.vercel-storage.com/faithful-care/blog/test.webp";
 let p=await createPost({...input("media-review-test"),data:{...blankData,hero:url,heroAlt:"A calm waiting room"}},"tester");
 assert((await verify(p)).blockers.some(x=>x.includes("Choose images from")));
 const [candidate]=await query("INSERT INTO fc_blog_media(post_id,url,role,alt,placement,source) VALUES($1,$2,'hero','A calm waiting room',1,'upload') RETURNING *",[p.id,url]);
 assert.equal(candidate.reviewed,false);
 assert(!(await verify(p)).blockers.some(x=>x.includes("Choose images from")));
 p=await selectImage(p.id,candidate.id,p.version,"tester","A calm waiting room");
 assert(!(await verify(p)).blockers.some(x=>x.includes("Choose images from")));
 assert.equal(p.data.reviewConfirmed,false);
 await assert.rejects(()=>selectImage(p.id,candidate.id,p.version-1,"tester","A calm waiting room"),e=>e.status===409);
 const es=await createPost({...input("media-es-test"),language:"es",data:{...blankData,hero:url,heroAlt:"Una sala de espera tranquila"}},"tester",p.translation_group);
 assert(!(await verify(es)).blockers.some(x=>x.includes("Choose images from")));
 const {mediaList}=await import("../server/blog/media.ts");assert.equal((await mediaList(es.id))[0].alt,"Una sala de espera tranquila");
 const selectedEs=await selectImage(es.id,candidate.id,es.version,"tester","Una sala luminosa para esperar");assert.equal(selectedEs.data.heroAlt,"Una sala luminosa para esperar");assert.equal((await getPost(p.id)).data.heroAlt,"A calm waiting room");assert.equal((await query("SELECT alt FROM fc_blog_media WHERE id=$1",[candidate.id]))[0].alt,"A calm waiting room");

 const unrelated=await createPost({...input("media-other-test"),data:{...blankData,hero:url,heroAlt:"A calm waiting room"}},"tester");
 assert((await verify(unrelated)).blockers.some(x=>x.includes("Choose images from")));
 await assert.rejects(()=>selectImage(unrelated.id,candidate.id,unrelated.version,"tester","Wrong family"),e=>e.status===400);
 delete process.env.BLOB_PUBLIC_HOSTNAME;
});

test("concurrent requests cannot generate the same topic twice; stale translations are not saved",async()=>{
 const {claimJob,saveGeneratedPost}=await import("../server/blog/jobs.ts");
 const {randomUUID}=await import("node:crypto");
 const first=await claimJob("generate",randomUUID(),"tester",{topicId:"topic-concurrency",language:"en"});
 await assert.rejects(()=>claimJob("generate",randomUUID(),"tester",{topicId:"topic-concurrency",language:"en"}),e=>e.status===409);
 const source=await saveGeneratedPost({...input("topic-first"),data:{...blankData,topic:"topic-concurrency"}},"tester",first.id);
 const second=await claimJob("generate",randomUUID(),"tester",{topicId:"topic-concurrency",language:"en"});
 await assert.rejects(()=>saveGeneratedPost({...input("topic-second"),data:{...blankData,topic:"topic-concurrency"}},"tester",second.id),e=>e.code==="23505");
 const translation=await claimJob("translate",randomUUID(),"tester",{sourceId:source.id});
 await assert.rejects(()=>saveGeneratedPost({...input("stale-translation"),language:"es"},"tester",translation.id,source.translation_group,{id:source.id,version:source.version+1}),e=>e.status===409);
 assert.equal((await query("SELECT id FROM fc_blog_posts WHERE slug='stale-translation'")).length,0);
});

