import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import {chromium} from "playwright";
import sharp from "sharp";
const base=process.env.BLOG_PREVIEW_URL,expected=process.env.EXPECTED_SHA,directory=process.env.BLOG_PASS_DIRECTORY;
assert(base&&expected&&directory);
const credentials=JSON.parse(await fs.readFile(path.join(directory,"admin-preview.json"),"utf8"));
const jar=await fs.readFile(path.join(directory,"preview-cookies.txt"),"utf8");
const cookies=jar.split(/\r?\n/).filter(l=>l&&!l.startsWith("# ")).map(l=>l.replace(/^#HttpOnly_/,"")).filter(l=>!l.startsWith("#")).map(l=>{const [domain,,p,secure,expires,name,value]=l.split("\t");return {domain,path:p,secure:secure==="TRUE",expires:Number(expires)||-1,name,value,httpOnly:true,sameSite:"Lax"};});
const browser=await chromium.launch();await fs.mkdir("artifacts/blog-preview",{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:900}});await context.addCookies(cookies);
 const deployment=await (await context.request.get(base+"/api/blog/deployment")).json();assert.equal(deployment.sha,expected);assert.equal(deployment.environment,"preview");assert.equal(deployment.blogEnabled,true);
 assert.equal((await context.request.get(base+"/api/admin/blog/posts")).status(),401);
 const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
 await page.goto(base+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(credentials.username);await page.getByLabel("Password",{exact:true}).fill(credentials.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
 await page.getByRole("button",{name:"New draft",exact:true}).click();
 const slug="preview-verification-"+Date.now();
 await page.getByLabel("Title",{exact:true}).fill("Preview verification: private editorial draft");
 await page.getByLabel("URL slug",{exact:true}).fill(slug);
 await page.getByLabel("Article HTML",{exact:true}).fill("<h2>Private verification</h2><p>Technical QA only. This draft is not an approved medical article and is never published.</p>");
 await page.getByLabel("Summary",{exact:true}).fill("Private technical check of the deployed editorial studio.");
 await page.getByRole("button",{name:"Save draft",exact:true}).click();await page.getByRole("status").filter({hasText:"Draft saved"}).waitFor();
 const posts=await (await context.request.get(base+"/api/admin/blog/posts")).json(),p=posts.posts.find(p=>p.slug===slug);assert(p);
 assert(!(await (await context.request.get(base+"/api/blog/posts")).text()).includes(slug));assert.equal((await context.request.get(base+"/blog/"+slug)).status(),404);
 const headers={origin:base,"Content-Type":"application/json"};
 const source=await context.request.post(base+"/api/admin/blog/links/check",{headers,data:{url:"https://medlineplus.gov/healthscreening.html"}});assert.equal(source.status(),200);const sourceResult=await source.json();assert.equal(sourceResult.record.health,"healthy");
 const generation=await context.request.post(base+"/api/admin/blog/generate",{headers,data:{topicId:"visit-preparation",language:"en",requestId:crypto.randomUUID()}});assert.equal(generation.status(),503);
 const translation=await context.request.post(base+"/api/admin/blog/posts/"+p.id+"/translate",{headers,data:{requestId:crypto.randomUUID()}});assert.equal(translation.status(),503);
 const google=await context.request.get(base+"/api/admin/blog/google-connection");assert.equal(google.status(),503);
 const bytes=await sharp({create:{width:800,height:500,channels:3,background:"#153d57"}}).webp().toBuffer();
 await page.getByLabel("Alternative text",{exact:true}).fill("Solid navy technical verification image");
 await page.getByLabel("Approved image file",{exact:true}).setInputFiles({name:"preview-qa.webp",mimeType:"image/webp",buffer:bytes});
 await page.getByRole("button",{name:"Upload candidate",exact:true}).click();await page.getByRole("status").filter({hasText:"Candidate uploaded"}).waitFor();
 await page.getByRole("button",{name:"Use reviewed image",exact:true}).click();await page.getByRole("status").filter({hasText:"Image selected"}).waitFor();
 await page.getByText("Preview the saved article",{exact:true}).click();await page.frameLocator('iframe[title="Private article preview"]').getByRole("heading",{level:1}).waitFor();
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:"artifacts/blog-preview/editor-"+width+"x"+height+".png"});}
 await page.getByRole("button",{name:"Sign out",exact:true}).click();await page.waitForURL("**/admin/login");assert.equal((await context.request.get(base+"/api/admin/blog/posts")).status(),401);
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){await page.setViewportSize({width,height});for(const [name,url] of [["login","/admin/login"],["archive-en","/blog"],["archive-es","/es/blog"]]){const r=await page.goto(base+url,{waitUntil:"networkidle"});assert.equal(r.status(),200);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:"artifacts/blog-preview/"+name+"-"+width+"x"+height+".png"});}}
 assert.deepEqual(errors,[]);
 await fs.writeFile("artifacts/blog-preview/result.json",JSON.stringify({sha:expected,base,checkedAt:new Date().toISOString(),status:"passed",checks:["protected login/logout","private database draft","public draft 404","real source audit","AI and Google fail closed","actual blob upload and review","sandboxed preview","five viewports"],privateQaSlug:slug},null,2));
 console.log("PASS Preview "+expected+": real database/login/source audit/Blob/private preview; inactive providers fail closed; five viewport matrix.");
 await context.close();
}finally{await browser.close();}
