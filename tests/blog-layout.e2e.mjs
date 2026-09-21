import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {chromium} from "playwright";
const auth=JSON.parse(await fs.readFile(".local/blog-e2e.json","utf8"));
const browser=await chromium.launch();
await fs.mkdir("artifacts/blog-layout",{recursive:true});
try{
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
 await page.goto(auth.baseUrl+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(auth.username);await page.getByLabel("Password",{exact:true}).fill(auth.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");await page.getByRole("heading",{name:"Blog management",exact:true}).waitFor();
 await page.locator(".source-card").first().waitFor();
 await page.getByLabel("Search articles",{exact:true}).fill("no-matching-fixture-xyz");await page.getByRole("heading",{name:"No articles match these filters"}).waitFor();await page.getByLabel("Search articles",{exact:true}).fill("");
 await page.getByRole("combobox",{name:"Article language",exact:true}).selectOption("es");assert(await page.locator(".article-row-title small").allTextContents().then(items=>items.every(s=>s.startsWith("ES"))));await page.getByRole("combobox",{name:"Article language",exact:true}).selectOption("all");
 await page.getByLabel("Search sources",{exact:true}).fill("Diabetes");assert.equal(await page.locator(".source-card").count(),1);await page.getByLabel("Search sources",{exact:true}).fill("");
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/blog-layout/dashboard-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator(".source-workspace").scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/blog-layout/sources-${width}x${height}.png`});
  await page.getByRole("button",{name:"Auto Generate",exact:true}).click();await page.getByRole("dialog").waitFor();assert(await page.getByRole("dialog").getByRole("button",{name:"Auto Generate",exact:true}).isDisabled());await page.screenshot({path:`artifacts/blog-layout/generator-${width}x${height}.png`});await page.getByRole("button",{name:"Close generator"}).click();
 }
 await page.getByRole("button",{name:"Consultation history",exact:true}).click();await page.locator(".source-history").waitFor();await page.getByRole("button",{name:"Source library",exact:true}).click();
 assert.deepEqual(errors,[]);await context.close();console.log("PASS XL-style dashboard, filters, source views, accessible generator dialog and five viewport matrix.");
}finally{await browser.close();}
