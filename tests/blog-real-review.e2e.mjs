import assert from "node:assert/strict";
import fs from "node:fs/promises";import path from "node:path";import {chromium} from "playwright";
if(process.env.BLOG_RUN_REAL!=="1")throw Error("Explicit real-provider test flag required.");
const base=process.env.BLOG_PREVIEW_URL,directory=process.env.BLOG_PASS_DIRECTORY,expected=process.env.EXPECTED_SHA;
assert(base&&directory&&expected);
const credentials=JSON.parse(await fs.readFile(path.join(directory,"admin-preview.json"),"utf8"));
const jar=await fs.readFile(path.join(directory,"preview-cookies.txt"),"utf8");
const cookies=jar.split(/\r?\n/).filter(l=>l&&!l.startsWith("# ")).map(l=>l.replace(/^#HttpOnly_/,"")).filter(l=>!l.startsWith("#")).map(l=>{const [domain,,p,secure,expires,name,value]=l.split("\t");return {domain,path:p,secure:secure==="TRUE",expires:Number(expires)||-1,name,value,httpOnly:true,sameSite:"Lax"};});
await fs.mkdir("artifacts/blog-editor-preview",{recursive:true});
const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});await context.addCookies(cookies);
 const deployment=await(await context.request.get(base+"/api/blog/deployment")).json();assert.equal(deployment.sha,expected);assert.equal(deployment.environment,"preview");
 const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(credentials.username);await page.getByLabel("Password",{exact:true}).fill(credentials.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
 const run=(await(await context.request.get(base+"/api/admin/blog/auto/current")).json()).run;assert.equal(run.status,"completed","Review only: no new generation is allowed");
 const posts=[];for(const id of [run.postId,run.translationId]){const post=(await(await context.request.get(base+"/api/admin/blog/posts/"+id)).json()).post;assert(["draft","pending_review"].includes(post.status),"Review only: the article must remain private");assert.equal(post.data.reviewConfirmed,false);assert.equal((await context.request.get(base+(post.language==="es"?"/es":"")+"/blog/"+post.slug)).status(),404);posts.push(post);}
 const blocked=[];await page.route("**/api/admin/blog/**",async route=>{const req=route.request(),url=new URL(req.url());if(req.method()!=="GET"&&!url.pathname.endsWith("/logout")){blocked.push(url.pathname);return route.abort();}return route.continue();});
 page.on("console",e=>{if(e.type()==="error")errors.push(e.text());});
 const sizes=[[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]];
 for(const post of posts){
  await page.getByRole("button",{name:post.title,exact:true}).click();await page.locator(".editor-title h1").waitFor();
  const preview=page.locator(".saved-article-preview");await preview.getByRole("heading",{level:1}).waitFor();assert.equal(await preview.locator("img").count(),3);assert.equal(await preview.locator("script,iframe,object").count(),0);
  assert.equal(await page.getByRole("button",{name:"Send to review",exact:true}).count(),0);assert.equal(await page.getByLabel("Reviewing clinician",{exact:true}).count(),0);
  for(const [width,height] of sizes){await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/blog-editor-preview/workspace-${post.language}-${width}x${height}.png`});await preview.evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));await page.screenshot({path:`artifacts/blog-editor-preview/article-${post.language}-${width}x${height}.png`});await preview.locator(".blog-copy h2").first().evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));await page.screenshot({path:`artifacts/blog-editor-preview/reading-${post.language}-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await page.getByRole("button",{name:"Images",exact:true}).click();await page.locator(".media-candidate img").first().waitFor();assert.equal(await page.locator(".media-candidate").count(),3);
  if(post.language==="en"){await page.waitForFunction(()=>[...document.querySelectorAll(".media-candidate img")].every(i=>i.complete&&i.naturalWidth>0));for(const [width,height] of sizes){await page.setViewportSize({width,height});await page.locator(".media-organizer").evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));await page.screenshot({path:`artifacts/blog-editor-preview/images-${width}x${height}.png`});}}
  await page.getByRole("button",{name:"SEO & links",exact:true}).click();await page.getByRole("heading",{name:"Connected pages & sources",exact:true}).waitFor();assert(await page.locator(".workspace-link-panel a").count()>=3);
  if(post.language==="en")for(const [width,height] of sizes){await page.setViewportSize({width,height});await page.locator(".workspace-tabs").evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));await page.screenshot({path:`artifacts/blog-editor-preview/seo-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await page.getByRole("button",{name:"Back to dashboard",exact:true}).click();await page.getByLabel("Search articles",{exact:true}).fill(post.slug);const row=page.locator(".article-row");await row.getByRole("button",{name:"Manage",exact:true}).click();await row.getByRole("button",{name:"Publish",exact:true}).waitFor();
  if(post.language==="en")for(const [width,height] of sizes){await page.setViewportSize({width,height});await row.evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));await page.screenshot({path:`artifacts/blog-editor-preview/actions-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await row.getByRole("button",{name:"Manage",exact:true}).click();await page.getByLabel("Search articles",{exact:true}).fill("");
 }
 await page.getByRole("button",{name:"Sign out",exact:true}).click();await page.waitForURL("**/admin/login");assert.deepEqual(blocked,[]);assert.deepEqual(errors,[]);
 const result={result:"PASS",sha:expected,runId:run.id,checkedAt:new Date().toISOString(),privateDrafts:2,languages:posts.map(p=>p.language),viewports:sizes,unexpectedConsoleErrors:errors,blockedMutations:blocked,newGenerations:0,published:0};await fs.writeFile("artifacts/blog-editor-preview/review.json",JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{try{await browser.contexts()[0]?.request.post(base+"/api/admin/blog/logout",{headers:{Origin:base},data:{}});}finally{await browser.close();}}
