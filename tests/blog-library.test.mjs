import assert from "node:assert/strict";
import {test,before,after} from "node:test";
import fs from "node:fs/promises";
import {PGlite} from "@electric-sql/pglite";
process.env.NODE_ENV="test";
const {setTestDatabase,query}=await import("../server/blog/db.ts");
const {seedSources,researchSource,sourceDashboard}=await import("../server/blog/links.ts");
const {createPost}=await import("../server/blog/posts.ts");
const {blankData}=await import("../server/blog/types.ts");
const {articleHtml,articleHeadings}=await import("../server/blog/render.ts");
let db;
before(async()=>{db=new PGlite();for(const n of (await fs.readdir("migrations/blog")).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile("migrations/blog/"+n,"utf8"));setTestDatabase(db);});
after(async()=>{setTestDatabase();await db.close();});
test("research reuses a fresh verified copy and records its use without changing approval",async()=>{
 await seedSources();const url="https://medlineplus.gov/healthscreening.html";
 await query("UPDATE fc_blog_links SET health='healthy',checked_at=now() WHERE url=$1",[url]);
 await query("INSERT INTO fc_blog_source_cache(url,excerpt,fetched_at) SELECT url,$2,checked_at FROM fc_blog_links WHERE url=$1",[url,"Verified source fixture with clear educational information."]);
 const result=await researchSource(url,"tester");assert.equal(result.excerpt,"Verified source fixture with clear educational information.");assert.equal(result.record.approved,false);
 await createPost({title:"Preparing questions for a visit",slug:"source-usage",language:"en",content:"<h2>Questions</h2><p>Fixture.</p>",data:{...blankData,sources:[url]}},"tester");
 const dashboard=await sourceDashboard();const source=dashboard.links.find(s=>s.url===url);
 assert.equal(source.usage,1);assert.equal(source.articles[0].title,"Preparing questions for a visit");assert(source.cache_expires_at);assert.equal(dashboard.history[0].action,"source_reused");
 await assert.rejects(()=>researchSource("https://example.com/private","tester"),e=>e.status===400);
});
test("article outline and rendered headings stay aligned without preserving injected IDs",()=>{
 const post={content:'<h2 id="evil" onclick="bad()">First &amp; second</h2><p>Text.</p><h2>First &amp; second</h2>',data:{images:[]}};
 const headings=articleHeadings(post),html=articleHtml(post);
 assert.deepEqual(headings.map(h=>h.id),["article-section-1","article-section-2"]);
 assert.equal(headings[0].title,"First & second");assert(html.includes('id="article-section-2"'));assert(!html.includes('id="evil"'));assert(!html.includes("onclick"));
});
