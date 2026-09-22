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
  const page=await context.newPage(),errors=[],expectedConsoleStatuses=new Set();
  page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error"&&![...expectedConsoleStatuses].some(status=>new RegExp("^Failed to load resource: the server responded with a status of "+status+"(?: |$)").test(m.text())))errors.push(m.text());});
  await page.goto(auth.baseUrl+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(auth.username);await page.getByLabel("Password",{exact:true}).fill(auth.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
  await page.getByRole("button",{name:"Auto Generate",exact:true}).click(); const button=page.getByRole("dialog").getByRole("button",{name:"Auto Generate",exact:true});await button.waitFor();assert(await button.isDisabled());assert.equal(await page.locator(".auto-steps>li").count(),15);
  assert.equal((await context.request.post(auth.baseUrl+"/api/admin/blog/auto/start",{headers:{origin:auth.baseUrl},data:{requestId:randomUUID(),language:"en",focus:"",translate:true}})).status(),503);
  // Browser rendering/reconnection contract. Providers are explicitly simulated here;
  // the server/database workflow is independently exercised by blog-auto.test.mjs.
  let run=null;const executed=new Set();const primary=randomUUID(),secondary=randomUUID();
  await page.route("**/api/admin/blog/auto/**",async route=>{
   const pathname=new URL(route.request().url()).pathname;let response;
   if(pathname.endsWith("/config"))response={ready:true,missing:[]};
   else if(pathname.endsWith("/current"))response={run};
   else if(pathname.endsWith("/start")){const body=route.request().postDataJSON();run={id:randomUUID(),requestId:body.requestId,status:"running",cursor:0,busy:false,language:body.language,steps:AUTO_STEPS.map(([id,label])=>({id,label,status:"pending"})),postId:null,translationId:null,error:null};response={run};}
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
  await page.reload();await page.getByRole("button",{name:"Auto Generate",exact:true}).click();await page.waitForFunction(()=>!document.querySelector(".auto-generator button")?.disabled);
  await page.getByRole("combobox",{name:"Original article language",exact:true}).selectOption(width===390?"es":"en");
  await button.click();
  await page.locator('.auto-steps [data-status="completed"]').first().waitFor();
  await page.reload();await page.getByRole("button",{name:/Auto Generate|View generation progress/}).click();
  await page.getByText("Draft preparation finished.",{exact:false}).waitFor({timeout:20000});
  assert.equal(executed.size,15);assert.equal(await page.locator('.auto-steps>li[data-status="completed"]').count(),15);
  await page.getByRole("button",{name:"Open English draft",exact:true}).waitFor();await page.getByRole("button",{name:"Open Spanish draft",exact:true}).waitFor();
  // Failure recovery must never show the previous successful run as this attempt.
  await page.unroute("**/api/admin/blog/auto/**");
  let mode="quota",latest=run;const attempts=[];
  const failed=requestId=>({id:randomUUID(),requestId,status:"failed",cursor:0,busy:false,language:"en",steps:AUTO_STEPS.map(([id,label],index)=>({id,label,status:index===0?"failed":"pending"})),postId:null,translationId:null,error:"Image budget reached. No AI requests were made."});
  expectedConsoleStatuses.add(429);expectedConsoleStatuses.add(503);
  await page.route("**/api/admin/blog/auto/**",async route=>{
   const pathname=new URL(route.request().url()).pathname;let response={run:latest},status=200;
   if(pathname.endsWith("/config"))response={ready:true,missing:[]};
   else if(pathname.endsWith("/start")){
    const body=route.request().postDataJSON();attempts.push(body.requestId);
    if(mode==="quota"){latest=failed(body.requestId);status=429;response={error:latest.error};}
    else if(mode==="ambiguous"){status=503;response={error:"Connection interrupted"};}
    else if(mode==="stale"){status=503;response={error:"Provider unavailable before admission"};}
    else if(mode==="reconnect"){latest={...failed(body.requestId),status:"running",busy:true,error:null};status=503;response={error:"Response interrupted after admission"};}
    else {latest=failed(body.requestId);response={run:latest};}
   }else if(pathname.endsWith("/current")&&mode==="ambiguous"){status=503;response={error:"Connection still interrupted"};}
   else if(pathname.endsWith("/events")){await route.fulfill({status:200,contentType:"text/event-stream",body:"data: "+JSON.stringify({run:latest})+"\n\n"});return;}
   await route.fulfill({status,json:response});
  });
  await button.click();await page.getByRole("alert").filter({hasText:"Image budget reached"}).waitFor();
  assert.equal(await page.locator(".auto-complete").count(),0);assert.equal(await page.locator('.auto-steps>li[data-status="failed"]').count(),1);assert.equal(await page.locator('.auto-steps>li[data-status="completed"]').count(),0);
  assert.equal(await page.evaluate(()=>sessionStorage.getItem("faithful-auto-request")),null);
  mode="known";await button.click();await page.waitForFunction(()=>!document.querySelector(".auto-generator button")?.disabled);assert.equal(attempts.length,2);assert.notEqual(attempts[0],attempts[1]);
  // An ambiguous error retains the same request key even if current cannot be read.
  mode="ambiguous";await button.click();await page.getByRole("alert").filter({hasText:"same request"}).waitFor();const uncertainKey=attempts.at(-1);
  assert.equal(await page.evaluate(()=>sessionStorage.getItem("faithful-auto-request")),uncertainKey);assert.equal(await page.locator(".auto-complete").count(),0);
  mode="known";await button.click();await page.getByRole("alert").filter({hasText:"Image budget reached"}).waitFor();assert.equal(attempts.at(-1),uncertainKey);
  // An unrelated old completion must neither be rendered nor clear an uncertain key.
  latest=run;mode="stale";await button.click();await page.getByRole("alert").filter({hasText:"before admission"}).waitFor();const staleKey=attempts.at(-1);assert.equal(await page.locator(".auto-complete").count(),0);assert.equal(await page.locator('.auto-steps>li[data-status="completed"]').count(),0);assert.equal(await page.evaluate(()=>sessionStorage.getItem("faithful-auto-request")),staleKey);
  // A terminal result from an older UI releases its matching saved key on reload.
  latest=failed(staleKey);mode="known";await page.reload();await page.getByRole("button",{name:"Auto Generate",exact:true}).click();await page.getByRole("alert").filter({hasText:"Image budget reached"}).waitFor();assert.equal(await page.evaluate(()=>sessionStorage.getItem("faithful-auto-request")),null);
  mode="reconnect";await button.click();await page.getByRole("alert").filter({hasText:"Reconnected to saved generation progress"}).waitFor();await page.getByRole("button",{name:"Stop after current request",exact:true}).waitFor();assert.equal(await page.locator(".auto-complete").count(),0);assert(await button.isDisabled());
  const recoveredKey=attempts.at(-1);latest={...latest,status:"failed",busy:false,error:"Recovered generation stopped safely."};
  await page.getByRole("alert").filter({hasText:"Recovered generation stopped safely"}).waitFor();await page.waitForFunction(()=>sessionStorage.getItem("faithful-auto-request")===null);
  mode="known";await button.click();await page.getByRole("alert").filter({hasText:"Image budget reached"}).waitFor();assert.notEqual(attempts.at(-1),recoveredKey,"A run completed after recovery must release its request key");
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);
  await context.close();
 }
 console.log("PASS Auto Generate browser contract: actual login and disabled-provider gate; simulated full EN/ES progress, metadata, image alts, reload recovery, quota retry, ambiguous-request idempotency, stale-result suppression and no duplicate steps on desktop/mobile.");
}finally{await browser.close();}