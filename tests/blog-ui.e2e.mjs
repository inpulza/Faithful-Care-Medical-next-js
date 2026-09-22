import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {chromium} from "playwright";
const config=JSON.parse(await fs.readFile(".local/blog-e2e.json","utf8"));
const browser=await chromium.launch();
await fs.mkdir("artifacts/blog",{recursive:true});
try{
 for(const [width,height] of [[1440,900],[390,844]]){
  const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
  await page.goto(config.baseUrl+"/admin/blog");await page.waitForURL("**/admin/login");
  await page.getByLabel("Username",{exact:true}).fill(config.username);
  await page.getByLabel("Password",{exact:true}).fill(config.password);
  await page.getByRole("button",{name:"Sign in",exact:true}).click();
  await page.waitForURL("**/admin/blog");
  await page.getByRole("button",{name:"New draft",exact:true}).click();
  const slug="browser-private-"+width+"-"+Date.now();
  await page.getByLabel("Title",{exact:true}).fill("Preparing for a thoughtful primary care visit");
  await page.getByRole("button",{name:"Edit HTML",exact:true}).click();
  await page.getByLabel("Article HTML",{exact:true}).fill("<h2>Prepare your questions</h2><p>This is an isolated browser test article.</p>");
  await page.getByLabel("Summary",{exact:true}).fill("A private test draft that must never be visible to public visitors.");
  await page.getByRole("button",{name:"SEO & links",exact:true}).click();
  await page.getByLabel("URL slug",{exact:true}).fill(slug);
  await page.getByRole("button",{name:"Save draft",exact:true}).click();
  await page.getByRole("status").filter({hasText:"Draft saved"}).waitFor();
  const publicResponse=await context.request.get(config.baseUrl+"/api/blog/posts");assert.equal(publicResponse.status(),200);
  assert(!(await publicResponse.text()).includes(slug));
  assert.equal((await context.request.get(config.baseUrl+"/blog/"+slug)).status(),404);
  await page.getByRole("button",{name:"Preview",exact:true}).click();
  await page.locator(".saved-article-preview").getByRole("heading",{name:"Prepare your questions",exact:true}).waitFor();
  assert.equal(await page.getByRole("button",{name:"Send to review",exact:true}).count(),0);
  assert.equal(await page.getByLabel("Reviewing clinician",{exact:true}).count(),0);
  await page.getByRole("button",{name:"Back to dashboard",exact:true}).click();
  await page.getByLabel("Search articles",{exact:true}).fill(slug);
  const row=page.locator(".article-row");await row.getByRole("button",{name:"Manage",exact:true}).click();
  await row.getByRole("button",{name:"Send to review",exact:true}).click();
  await row.getByRole("status").filter({hasText:"Moved to pending review"}).waitFor();
  assert(await row.getByRole("button",{name:"Publish",exact:true}).isEnabled());
  await row.getByRole("button",{name:"Return to draft",exact:true}).click();
  await row.getByRole("status").filter({hasText:"Returned to draft"}).waitFor();
  await page.screenshot({path:"artifacts/blog/editor-"+width+"x"+height+".png",fullPage:false});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No horizontal overflow");
  page.once("dialog",d=>d.dismiss());await row.getByRole("button",{name:"Delete article",exact:true}).click();assert.equal(await row.count(),1);
  page.once("dialog",d=>d.accept());await row.getByRole("button",{name:"Delete article",exact:true}).click();await page.getByRole("status").filter({hasText:"Article deleted"}).waitFor();assert.equal(await row.count(),0);
  await page.reload();await page.getByRole("heading",{name:"Blog management",exact:true}).waitFor();assert(!(await (await context.request.get(config.baseUrl+"/api/admin/blog/posts")).json()).posts.some(p=>p.slug===slug));
  await page.getByRole("button",{name:"Sign out",exact:true}).click();await page.waitForURL("**/admin/login");
  assert.equal((await context.request.get(config.baseUrl+"/api/admin/blog/posts")).status(),401);
  assert.deepEqual(errors,[],"Unexpected browser errors");
  await context.close();
 }
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){
  const page=await browser.newPage({viewport:{width,height}});const errors=[];
  page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
  for(const language of ["en","es"]){
   const response=await page.goto(config.baseUrl+(language==="es"?"/es":"")+"/blog",{waitUntil:"networkidle"});
   assert.equal(response.status(),200);assert.equal(await page.locator("h1").count(),1);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No horizontal overflow");
   await page.screenshot({path:"artifacts/blog/archive-"+language+"-"+width+"x"+height+".png",fullPage:false});
  }
  await page.goto(config.baseUrl+"/es",{waitUntil:"networkidle"});
  await page.getByTestId("button-explore-menu").click();
  await page.getByTestId("overlay-trigger-journal").click();
  await page.waitForURL(url=>url.pathname==="/es/blog");
  await page.getByTestId("link-lang-en").click();
  await page.waitForURL(url=>url.pathname==="/blog");
  await page.goto(config.baseUrl+"/admin/login",{waitUntil:"networkidle"});
  await page.screenshot({path:"artifacts/blog/login-"+width+"x"+height+".png",fullPage:false});
  assert.deepEqual(errors,[],"Unexpected browser errors");
  await page.close();
 }
 console.log("PASS: desktop/mobile editorial workflow, private drafts, logout, EN/ES archives and five viewport matrix.");
}finally{await browser.close();}
