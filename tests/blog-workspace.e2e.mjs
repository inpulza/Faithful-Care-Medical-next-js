import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {chromium} from "playwright";
const config=JSON.parse(await fs.readFile(".local/blog-e2e.json","utf8"));
assert(new URL(config.baseUrl).hostname==="127.0.0.1","This test publishes only to the isolated local database");
const browser=await chromium.launch();await fs.mkdir("artifacts/blog-workspace",{recursive:true});
try{
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
 await page.goto(config.baseUrl+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(config.username);await page.getByLabel("Password",{exact:true}).fill(config.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
 const source="https://medlineplus.gov/healthscreening.html",slug="workspace-qa-"+Date.now();
 const content='<p>LOCAL QA FIXTURE. Prepare a question list before your appointment.</p><h2>Preparing your questions</h2><ul><li>Bring your questions.</li><li>Discuss follow-up.</li></ul><table><caption>Preparing for a visit</caption><thead><tr><th scope="col">Bring</th><th scope="col">Discuss</th></tr></thead><tbody><tr><td>Question list</td><td>Your priorities</td></tr></tbody></table><h2>During the appointment</h2>'+Array.from({length:85},()=>'<p>LOCAL QA FIXTURE. This paragraph tests article layout and length, and does not provide medical advice.</p>').join('')+'<h2>Questions to discuss</h2><p><a href="/primary-care">Primary care</a> <a href="/contact">Contact our team</a> <a href="'+source+'">MedlinePlus</a></p><h2>Next steps</h2><p>Discuss your questions with your clinician.</p>';
 const response=await context.request.post(config.baseUrl+"/api/admin/blog/posts",{headers:{Origin:config.baseUrl},data:{title:"Local QA: preparing questions for a care visit",slug,language:"en",content,data:{excerpt:"Local QA fixture for testing the complete article workspace and publication controls.",metaTitle:"Preparing questions for a care visit",metaDescription:"Local technical fixture for testing preview, readable tables, internal links and publication from the Faithful Care editorial dashboard.",category:"prevention",tags:["prevention"],author:"Faithful Care editorial team",reviewer:"",reviewConfirmed:false,hero:"",heroAlt:"",images:[],sources:[source],topic:"",disclaimer:"LOCAL QA FIXTURE ONLY. This text checks technical behavior and is not patient guidance or medical advice. Consult your clinician for personal care."}}});assert.equal(response.status(),201);const post=(await response.json()).post;
 await page.reload();await page.getByLabel("Search articles",{exact:true}).fill(slug);
 await page.locator(".article-row").getByRole("button",{name:"Preview",exact:true}).click();
 const frame=page.locator(".saved-article-preview");await frame.getByRole("heading",{level:1}).waitFor();assert.equal(await frame.locator('th[scope="col"]').count(),2);assert.equal(await frame.locator(".blog-copy ul li").count(),2);
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/blog-workspace/workspace-${width}x${height}.png`});
  await page.locator(".article-preview-panel").scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/blog-workspace/preview-${width}x${height}.png`});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.equal(await frame.locator("script,iframe,object").count(),0);
  await frame.getByRole("link",{name:"Preparing your questions",exact:true}).click();await frame.locator("table").waitFor();
  await page.screenshot({path:`artifacts/blog-workspace/table-${width}x${height}.png`});
  await page.getByRole("button",{name:"SEO & links",exact:true}).click();await page.getByRole("heading",{name:"Connected pages & sources",exact:true}).waitFor();assert.equal(await page.locator('.workspace-link-panel a[href="/primary-care"]').count(),1);
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/blog-workspace/seo-${width}x${height}.png`});
  await page.getByRole("button",{name:"Preview",exact:true}).click();await frame.getByRole("heading",{level:1}).waitFor();
 }
 await page.getByRole("button",{name:"Edit text",exact:true}).click();
 await page.getByRole("button",{name:"Edit HTML",exact:true}).click();const html=page.getByLabel("Article HTML",{exact:true});const original=await html.inputValue();await html.fill(original+'<img src="/qa-never-request" onerror="window.__editorInjected=true"><script>window.__editorInjected=true</script>');await page.getByRole("button",{name:"Visual editor",exact:true}).click();assert.equal(await page.locator(".visual-article-editor img,.visual-article-editor script").count(),0);assert.equal(await page.evaluate(()=>window.__editorInjected),undefined);
 const editor=page.getByRole("textbox",{name:"Article body",exact:true});await editor.click();await page.keyboard.press("Control+End");await page.keyboard.type(" Edited in the visual editor.");
 assert(await page.getByRole("button",{name:"Back to dashboard",exact:true}).isDisabled());
 for(const control of [page.locator('.editor-header>a'),page.getByRole("button",{name:"Sign out",exact:true})]){
  const prompt=page.waitForEvent("dialog");const click=control.click();const dialog=await prompt;assert.equal(dialog.type(),"confirm");await dialog.dismiss();await click;
  assert(page.url().endsWith("/admin/blog"));assert((await editor.innerText()).includes("Edited in the visual editor."));
 }
 const reloadPrompt=page.waitForEvent("dialog");const reload=page.reload().catch(()=>null);const reloadDialog=await reloadPrompt;assert.equal(reloadDialog.type(),"beforeunload");await reloadDialog.dismiss();await reload;
 assert((await editor.innerText()).includes("Edited in the visual editor."));
 await page.getByRole("button",{name:"Save draft",exact:true}).click();await page.getByRole("status").filter({hasText:"Draft saved"}).waitFor();
 assert.equal(await page.evaluate(()=>{const event=new Event("beforeunload",{cancelable:true});window.dispatchEvent(event);return event.defaultPrevented;}),false,"Saving releases the exit guard");
 await page.getByLabel("Title",{exact:true}).fill("Unsaved title to discard");await page.getByRole("button",{name:"Discard changes",exact:true}).click();
 assert.equal(await page.getByLabel("Title",{exact:true}).inputValue(),post.title);
 assert.equal(await page.evaluate(()=>{const event=new Event("beforeunload",{cancelable:true});window.dispatchEvent(event);return event.defaultPrevented;}),false,"Discarding releases the exit guard");
 await page.locator('.editor-header>a').click();await page.waitForURL(config.baseUrl+"/");await page.goto(config.baseUrl+"/admin/blog");await page.getByLabel("Search articles",{exact:true}).fill(slug);await page.locator(".article-row").getByRole("button",{name:"Preview",exact:true}).click();await frame.getByText("Edited in the visual editor.",{exact:false}).waitFor();
 await page.getByRole("button",{name:"Back to dashboard",exact:true}).click();await page.getByLabel("Search articles",{exact:true}).fill(slug);
 const row=page.locator(".article-row");await row.getByRole("button",{name:"Manage",exact:true}).click();await row.getByRole("button",{name:"Check article",exact:true}).click();await row.getByText("Publication checks passed.",{exact:true}).waitFor();
 assert.equal(await page.getByLabel("Reviewing clinician",{exact:true}).count(),0);assert.equal(await page.getByRole("button",{name:"Approve source",exact:true}).count(),0);
 await row.getByRole("button",{name:"Send to review",exact:true}).click();await row.getByText("Moved to pending review.",{exact:true}).waitFor();
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){await page.setViewportSize({width,height});await row.scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/blog-workspace/actions-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 await row.getByRole("button",{name:"Publish",exact:true}).click();await row.getByText("Article published.",{exact:true}).waitFor();
 const publicPage=await context.newPage();publicPage.on("pageerror",e=>errors.push(e.message));publicPage.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
 assert.equal((await publicPage.goto(config.baseUrl+"/blog/"+slug)).status(),200);assert.equal(await publicPage.locator('.blog-copy table th[scope="col"]').count(),2);
 for(const width of [390,1440]){await publicPage.setViewportSize({width,height:900});await publicPage.locator("table").scrollIntoViewIfNeeded();assert(await publicPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 const incoming=await context.request.get(config.baseUrl+"/api/admin/blog/posts/"+post.id+"/incoming-links");assert.equal(incoming.status(),200);assert.deepEqual((await incoming.json()).articles,[]);
 await page.route("**/api/admin/blog/posts/"+post.id+"/incoming-links",route=>route.fulfill({json:{articles:[{id:"related-qa",title:"Related published QA article",language:"en",url:"/blog/related-qa"}]}}));
 const cancelPrompt=page.waitForEvent("dialog");const cancelClick=row.getByRole("button",{name:"Unpublish",exact:true}).click();const cancelDialog=await cancelPrompt;assert.match(cancelDialog.message(),/Related published QA article/);await cancelDialog.dismiss();await cancelClick;
 assert.equal((await context.request.get(config.baseUrl+"/blog/"+slug)).status(),200,"Cancel keeps the target published");
 const confirmPrompt=page.waitForEvent("dialog");const confirmClick=row.getByRole("button",{name:"Unpublish",exact:true}).click();const confirmDialog=await confirmPrompt;await confirmDialog.accept();await confirmClick;await row.getByText("Returned to draft. The article is private.",{exact:true}).waitFor();assert.equal((await context.request.get(config.baseUrl+"/blog/"+slug)).status(),404);
 const saved=(await(await context.request.get(config.baseUrl+"/api/admin/blog/posts/"+post.id)).json()).post;assert.equal(saved.data.reviewConfirmed,false);assert.equal(saved.data.reviewer,"");
 await row.getByRole("button",{name:"Edit",exact:true}).click();await page.getByLabel("Title",{exact:true}).fill("Discard this title on sign out");
 const exitPrompt=page.waitForEvent("dialog");const exitClick=page.getByRole("button",{name:"Sign out",exact:true}).click();const exitDialog=await exitPrompt;assert.equal(exitDialog.type(),"confirm");await exitDialog.accept();await exitClick;await page.waitForURL("**/admin/login");
 assert.deepEqual(errors,[]);await context.close();console.log("PASS: visual editing, five viewport preview/table/SEO/action matrix, no manual doctor/source approvals, dashboard publication and unpublish, public table rendering.");
}finally{await browser.close();}
