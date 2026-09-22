import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {chromium} from "playwright";
const auth=JSON.parse(await fs.readFile(".local/blog-e2e.json","utf8"));
assert.equal(new URL(auth.baseUrl).hostname,"127.0.0.1","Filter fixtures belong only to the isolated local database");
const browser=await chromium.launch();
await fs.mkdir("artifacts/blog-layout",{recursive:true});
try{
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
 await page.goto(auth.baseUrl+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(auth.username);await page.getByLabel("Password",{exact:true}).fill(auth.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");await page.getByRole("heading",{name:"Blog management",exact:true}).waitFor();
 await page.locator(".source-card").first().waitFor();
 const marker="filter-qa-"+Date.now(),fixtures=[];
 for(const language of ["en","es"]){
  const response=await context.request.post(auth.baseUrl+"/api/admin/blog/posts",{headers:{Origin:auth.baseUrl},data:{title:"Local filter QA "+language+" "+marker,slug:marker+"-"+language,language,content:"<p>Private local filter fixture.</p>"}});
  assert.equal(response.status(),201);let post=(await response.json()).post;
  const changed=await context.request.put(auth.baseUrl+"/api/admin/blog/posts/"+post.id,{headers:{Origin:auth.baseUrl},data:{...post,data:{...post.data,topic:"Prevenci\u00f3n cl\u00ednica "+marker}}});assert.equal(changed.status(),200);post=(await changed.json()).post;
  if(language==="es"){const status=await context.request.post(auth.baseUrl+"/api/admin/blog/posts/"+post.id+"/status",{headers:{Origin:auth.baseUrl},data:{status:"pending_review",version:post.version}});assert.equal(status.status(),200);}
  fixtures.push(post);
 }
 await page.reload();await page.getByRole("heading",{name:"Blog management",exact:true}).waitFor();
 await page.getByRole("article",{name:fixtures[0].title,exact:true}).waitFor();
 await page.getByLabel("Search articles",{exact:true}).fill("no-matching-fixture-xyz");await page.getByRole("heading",{name:"No articles match these filters"}).waitFor();await page.getByLabel("Search articles",{exact:true}).fill("");
 const search=page.getByLabel("Search articles",{exact:true}),languageFilter=page.getByRole("combobox",{name:"Article language",exact:true});
 const statuses=page.locator(".status-filters");
 for(const [width,height] of [[1440,900],[390,844]]){
  await page.setViewportSize({width,height});await search.fill("  PREVENCION   CLINICA "+marker+"  ");
  await languageFilter.selectOption("all");await statuses.getByRole("button",{name:"All articles",exact:true}).click();
  assert.equal(await page.locator(".article-row").count(),2,"Topic search must positively find both language fixtures");
  await languageFilter.selectOption("es");await statuses.getByRole("button",{name:"Pending review",exact:true}).click();
  const row=page.locator(".article-row");assert.equal(await row.count(),1);assert.equal(await row.getAttribute("aria-label"),fixtures[1].title);assert((await row.locator(".status-badge").first().textContent()).includes("pending review"));
  for(const name of ["Preview","Edit","Manage"]){const button=row.getByRole("button",{name,exact:true});assert(await button.getAttribute("title"));assert.equal(await button.locator("svg[aria-hidden=true]").count(),1);const box=await button.boundingBox();assert(box&&box.width>=44&&box.height>=44,"Accessible action touch target");}
  const boxes=await row.locator(".article-row-actions button").evaluateAll(buttons=>buttons.map(b=>b.getBoundingClientRect().top));assert(boxes.every(top=>Math.abs(top-boxes[0])<1),"Actions stay on one row");
  await row.getByRole("button",{name:"Manage",exact:true}).click();await row.getByRole("button",{name:"Return to draft",exact:true}).waitFor();await row.getByRole("button",{name:"Manage",exact:true}).click();
  await statuses.getByRole("button",{name:"Drafts",exact:true}).click();assert.equal(await page.locator(".article-row").count(),0);await page.getByRole("heading",{name:"No articles match these filters"}).waitFor();
  await languageFilter.selectOption("en");assert.equal(await page.locator(".article-row").count(),1);assert.equal(await page.locator(".article-row").getAttribute("aria-label"),fixtures[0].title);
 }
 await search.fill("");await languageFilter.selectOption("all");await statuses.getByRole("button",{name:"All articles",exact:true}).click();
 const library=await (await context.request.get(auth.baseUrl+"/api/admin/blog/links/dashboard")).json();const publisherMatches=library.links.filter(source=>source.publisher.toLowerCase().includes("national library")).length;assert(publisherMatches>0);
 await page.getByLabel("Search sources",{exact:true}).fill("  NATIONAL   LIBRARY  ");assert.equal(await page.locator(".source-card").count(),publisherMatches);
 await page.getByLabel("Search sources",{exact:true}).fill("  DIAB\u00c9TES  ");assert.equal(await page.locator(".source-card").count(),1);await page.getByLabel("Search sources",{exact:true}).fill("");
 const sourcePanel=page.locator(".source-panel");
 for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/blog-layout/dashboard-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator(".source-workspace").evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-24,behavior:"instant"}));await page.screenshot({path:`artifacts/blog-layout/sources-${width}x${height}.png`});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator(".source-list").evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-24,behavior:"instant"}));await page.screenshot({path:`artifacts/blog-layout/source-rows-${width}x${height}.png`});
  const card=page.locator(".source-card").filter({has:page.getByRole("heading",{name:"Health screening"})});
  await card.locator("summary").click();await card.getByRole("heading",{name:"Technical assessment",exact:true}).waitFor();assert(await card.getByText("Research copy expires",{exact:true}).isVisible());await card.locator("summary").click();
  await sourcePanel.getByRole("button",{name:"Consultation history",exact:true}).click();await page.locator(".source-history").waitFor();await page.locator(".source-workspace").evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-24,behavior:"instant"}));await page.screenshot({path:`artifacts/blog-layout/source-history-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await sourcePanel.getByRole("button",{name:"Source library",exact:true}).click();
  await page.getByRole("button",{name:"Auto Generate",exact:true}).click();await page.getByRole("dialog").waitFor();assert(await page.getByRole("dialog").getByRole("button",{name:"Auto Generate",exact:true}).isDisabled());await page.screenshot({path:`artifacts/blog-layout/generator-${width}x${height}.png`});await page.getByRole("button",{name:"Close generator"}).click();
 }
 await page.getByRole("button",{name:"Consultation history",exact:true}).click();await page.locator(".source-history").waitFor();await page.getByRole("button",{name:"Source library",exact:true}).click();
 await page.getByRole("combobox",{name:"Source status",exact:true}).selectOption("qualified");
 const qualified=page.locator(".source-card").filter({has:page.getByRole("heading",{name:"Health screening"})});await qualified.waitFor();
 assert.equal(await page.getByRole("button",{name:/Approve source|Block source/}).count(),0);
 await page.getByRole("combobox",{name:"Source status",exact:true}).selectOption("needs-check");assert.equal(await qualified.count(),0);
 await page.getByRole("combobox",{name:"Source status",exact:true}).selectOption("all");await qualified.waitFor();
 // API fixture deliberately arrives newest-first; the image UI must use reading order.
 await page.route("**/api/admin/blog/posts/"+fixtures[0].id+"/media",route=>route.fulfill({json:{media:[4,2].map(placement=>({id:"order-"+placement,role:"inline",placement,url:"/images/dr-addys-reve.webp",alt:"Local image order fixture",reviewed:false,source:"upload"}))}}));
 await page.getByRole("article",{name:fixtures[0].title,exact:true}).getByRole("button",{name:"Edit",exact:true}).click();
 await page.getByRole("button",{name:"Images",exact:true}).click();await page.locator(".media-inline .media-candidate").first().waitFor();
 assert.deepEqual(await page.locator(".media-inline .media-candidate-body>p").allTextContents(),["Uploaded \u00b7 After section 2","Uploaded \u00b7 After section 4"],"Inline image candidates follow article reading order");
 assert.deepEqual(errors,[]);await context.close();console.log("PASS XL-style dashboard, filters, source views, accessible generator dialog and five viewport matrix.");
}finally{await browser.close();}
