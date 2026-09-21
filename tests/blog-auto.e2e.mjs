import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {chromium} from "playwright";
import {randomUUID} from "node:crypto";
import {AUTO_STEPS} from "../shared/blog-auto.ts";
const auth=JSON.parse(await fs.readFile(".local/blog-e2e.json","utf8"));
const browser=await chromium.launch();
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:width===390?844:900}});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
  await page.goto(auth.baseUrl+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(auth.username);await page.getByLabel("Password",{exact:true}).fill(auth.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
  const button=page.getByRole("button",{name:"Auto Generate",exact:true});await button.waitFor();assert(await button.isDisabled());assert.equal(await page.locator(".auto-steps>li").count(),15);
  assert.equal((await context.request.post(auth.baseUrl+"/api/admin/blog/auto/start",{headers:{origin:auth.baseUrl},data:{requestId:randomUUID(),language:"en",focus:"",translate:true}})).status(),503);
  // Browser rendering/reconnection contract. Providers are explicitly simulated here;
  // the server/database workflow is independently exercised by blog-auto.test.mjs.
  let run=null;const executed=new Set();const primary=randomUUID(),secondary=randomUUID();
  await page.route("**/api/admin/blog/auto/**",async route=>{
   const pathname=new URL(route.request().url()).pathname;let response;
   if(pathname.endsWith("/config"))response={ready:true,missing:[]};
   else if(pathname.endsWith("/current"))response={run};
   else if(pathname.endsWith("/start")){const body=route.request().postDataJSON();run={id:randomUUID(),status:"running",cursor:0,busy:false,language:body.language,steps:AUTO_STEPS.map(([id,label])=>({id,label,status:"pending"})),postId:null,translationId:null,error:null};response={run};}
   else if(pathname.endsWith("/advance")){
    const requested=route.request().postDataJSON().cursor;
    if(run.status==="running"&&run.cursor===requested){assert(!executed.has(requested));executed.add(requested);const step=run.steps[requested];step.status="completed";step.detail="Fixture stage completed";step.outputs=step.id==="metadata"?{Slug:"prepared-care","Meta title":"A prepared care visit","Meta description":"A test description for a prepared care discussion."}:step.id==="writing"?{H1:"A prepared care visit"}:step.id==="alt_text"?{"Hero alt":"A closed notebook beside a window"}:{};
     run.cursor++;if(step.id==="save")run.postId=primary;if(step.id==="translation")run.translationId=secondary;if(run.cursor===15)run.status="completed";
    }
    await new Promise(r=>setTimeout(r,80));response={run};
   }else if(pathname.endsWith("/events")){await route.fulfill({status:200,contentType:"text/event-stream",body:"data: "+JSON.stringify({run})+"\n\n"});return;}
   else response={run};
   await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify(response)});
  });
  await page.reload();await page.waitForFunction(()=>!document.querySelector(".auto-generator button")?.disabled);
  await page.getByRole("combobox",{name:"Original article language",exact:true}).selectOption(width===390?"es":"en");
  await button.click();
  await page.locator('.auto-steps [data-status="completed"]').first().waitFor();
  await page.reload();
  await page.getByText("Draft preparation finished.",{exact:false}).waitFor({timeout:20000});
  assert.equal(executed.size,15);assert.equal(await page.locator('.auto-steps>li[data-status="completed"]').count(),15);
  await page.getByRole("button",{name:"Open English draft",exact:true}).waitFor();await page.getByRole("button",{name:"Open Spanish draft",exact:true}).waitFor();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);
  await context.close();
 }
 console.log("PASS Auto Generate browser contract: actual login and disabled-provider gate; simulated full EN/ES progress, metadata, image alts, reload recovery and no duplicate steps on desktop/mobile.");
}finally{await browser.close();}
