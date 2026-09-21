import assert from "node:assert/strict";
import fs from "node:fs/promises";import path from "node:path";import {chromium} from "playwright";
if(process.env.BLOG_RUN_REAL!=="1")throw Error("Explicit real-provider test flag required.");
const base=process.env.BLOG_PREVIEW_URL,directory=process.env.BLOG_PASS_DIRECTORY,expected=process.env.EXPECTED_SHA;
assert(base&&directory&&expected);
const credentials=JSON.parse(await fs.readFile(path.join(directory,"admin-preview.json"),"utf8"));
const jar=await fs.readFile(path.join(directory,"preview-cookies.txt"),"utf8");
const cookies=jar.split(/\r?\n/).filter(l=>l&&!l.startsWith("# ")).map(l=>l.replace(/^#HttpOnly_/,"")).filter(l=>!l.startsWith("#")).map(l=>{const [domain,,p,secure,expires,name,value]=l.split("\t");return {domain,path:p,secure:secure==="TRUE",expires:Number(expires)||-1,name,value,httpOnly:true,sameSite:"Lax"};});
await fs.mkdir("artifacts/blog-real",{recursive:true});
const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});await context.addCookies(cookies);
 const deployment=await(await context.request.get(base+"/api/blog/deployment")).json();assert.equal(deployment.sha,expected);assert.equal(deployment.environment,"preview");
 const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(credentials.username);await page.getByLabel("Password",{exact:true}).fill(credentials.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
 const run=(await(await context.request.get(base+"/api/admin/blog/auto/current")).json()).run;assert.equal(run.status,"completed","Review only: no new generation is allowed");
 const posts=[];for(const id of [run.postId,run.translationId]){const post=(await(await context.request.get(base+"/api/admin/blog/posts/"+id)).json()).post;assert.equal(post.status,"draft");assert.equal(post.data.reviewConfirmed,false);assert.equal((await context.request.get(base+(post.language==="es"?"/es":"")+"/blog/"+post.slug)).status(),404);posts.push(post);}
 const blocked=[];await page.route("**/api/admin/blog/**",async route=>{const req=route.request(),url=new URL(req.url());if(req.method()!=="GET"&&!/\/(logout|verify)$/.test(url.pathname)){blocked.push(url.pathname);return route.abort();}return route.continue();});
 page.on("console",e=>{if(e.type()==="error")errors.push(e.text());});
 const sizes=[[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]];
 for(const post of posts){await page.getByRole("button",{name:post.title,exact:true}).click();await page.getByRole("heading",{level:1,name:post.title}).waitFor();
 await page.getByRole("button",{name:"Check article",exact:true}).click();await page.getByRole("heading",{name:/Prepublication checks/}).waitFor();assert.match(await page.getByRole("heading",{name:/Prepublication checks/}).locator("..").innerText(),/Clinical review/);
 await page.getByText("Preview the saved article",{exact:true}).click();await page.frameLocator('iframe[title="Private article preview"]').getByRole("heading",{level:1}).waitFor();
 for(const [width,height] of sizes){await page.setViewportSize({width,height});await page.locator('iframe[title="Private article preview"]').evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-24,behavior:"instant"}));await page.screenshot({path:"artifacts/blog-real/article-"+post.language+"-"+width+"x"+height+".png"});}
 if(post.language==="en"){await page.waitForFunction(()=>[...document.querySelectorAll(".media-candidate img")].every(i=>i.complete&&i.naturalWidth>0));for(const [width,height] of sizes){await page.setViewportSize({width,height});await page.locator(".media-organizer").evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-24,behavior:"instant"}));await page.screenshot({path:"artifacts/blog-real/images-"+width+"x"+height+".png"});}}
 await page.getByRole("button",{name:"Back to dashboard",exact:true}).click();}
 await page.getByRole("button",{name:"Sign out",exact:true}).click();await page.waitForURL("**/admin/login");assert.deepEqual(blocked,[]);assert.deepEqual(errors,[]);
 const result={result:"PASS",sha:expected,runId:run.id,checkedAt:new Date().toISOString(),privateDrafts:2,languages:posts.map(p=>p.language),viewports:sizes,unexpectedConsoleErrors:errors,blockedMutations:blocked,newGenerations:0,published:0};await fs.writeFile("artifacts/blog-real/review.json",JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{try{await browser.contexts()[0]?.request.post(base+"/api/admin/blog/logout",{headers:{Origin:base},data:{}});}finally{await browser.close();}}
