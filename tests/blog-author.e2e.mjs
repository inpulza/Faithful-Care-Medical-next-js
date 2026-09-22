import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {chromium} from "playwright";
import {blankData} from "../server/blog/types.ts";
const config=JSON.parse(await fs.readFile(".local/blog-e2e.json","utf8"));
assert.equal(new URL(config.baseUrl).hostname,"127.0.0.1","Author publication test is local only");
const browser=await chromium.launch();const sizes=[[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]];
await fs.mkdir("artifacts/blog-author",{recursive:true});
try{
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));page.on("console",e=>{if(e.type()==="error")errors.push(e.text());});
 await page.goto(config.baseUrl+"/admin/login");await page.getByLabel("Username",{exact:true}).fill(config.username);await page.getByLabel("Password",{exact:true}).fill(config.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await page.waitForURL("**/admin/blog");
 const api=async(path,method="GET",data)=>{const r=await context.request.fetch(config.baseUrl+"/api/admin/blog/"+path,{method,headers:{Origin:config.baseUrl},data});assert(r.ok(),await r.text());return r.json();};
 for(const language of ["en","es"]){
  const slug="author-qa-"+language+"-"+Date.now(),es=language==="es";
  const content='<h2>'+(es?'Preparar tu visita':'Preparing your visit')+'</h2>'+Array.from({length:75},()=>'<p>LOCAL QA FIXTURE ONLY. This text validates author layout and does not provide medical guidance.</p>').join('')+'<p><a href="/primary-care">Primary care</a> <a href="/contact">Contact</a> <a href="https://medlineplus.gov/healthscreening.html">MedlinePlus</a></p>';
  const {post}=await api("posts","POST",{language,slug,title:es?"Preguntas para preparar tu próxima consulta":"Questions to prepare for your next care visit",content,data:{...blankData,excerpt:es?"Una guía práctica para preparar tus preguntas y conversar con tu doctora.":"A practical guide to preparing your questions and talking with your doctor.",metaTitle:"Preparing questions for a care visit",metaDescription:"Local technical fixture for testing the verified author portrait, biography link, language and structured data in the article page.",tags:["prevention"],sources:["https://medlineplus.gov/healthscreening.html"],disclaimer:"LOCAL QA FIXTURE ONLY. This text checks the author layout and is not medical advice. Ask your clinician for personal guidance."}});
  await page.reload();await page.getByLabel("Search articles",{exact:true}).fill(slug);await page.locator(".article-row").getByRole("button",{name:"Preview",exact:true}).click();
  const preview=page.locator(".saved-article-preview");await preview.locator(".blog-author-avatar img").waitFor();
  await page.waitForFunction(()=>[...document.querySelectorAll('.blog-author-avatar img')].every(img=>img.complete&&img.naturalWidth>0));
  assert.equal(await preview.locator('a[rel="author"]').getAttribute("href"),"/about");assert.equal(await preview.locator(".blog-author strong").innerText(),blankData.author);
  for(const [width,height] of sizes){await page.setViewportSize({width,height});await preview.locator("h1").evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-30,behavior:"instant"}));await page.screenshot({path:`artifacts/blog-author/preview-${language}-${width}x${height}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  const standalone=await context.newPage();assert.equal((await standalone.goto(config.baseUrl+"/api/admin/blog/posts/"+post.id+"/preview")).status(),200);await standalone.waitForFunction(()=>{const img=document.querySelector('.blog-author-avatar img');return img?.complete&&img.naturalWidth>0;});await standalone.close();
  const {post:published}=await api("posts/"+post.id+"/status","POST",{status:"published",version:post.version});
  const article=await context.newPage();article.on("pageerror",e=>errors.push(e.message));article.on("console",e=>{if(e.type()==="error")errors.push(e.text());});
  assert.equal((await article.goto(config.baseUrl+(es?"/es":"")+"/blog/"+slug)).status(),200);
  await article.waitForFunction(()=>[...document.querySelectorAll('.blog-author-avatar img')].every(img=>img.complete&&img.naturalWidth>0));
  const schema=await article.locator('main script[type="application/ld+json"]').textContent();assert.equal(JSON.parse(schema).author["@type"],"Person");assert.equal(JSON.parse(schema).author.name,blankData.author);
  for(const [width,height] of sizes){await article.setViewportSize({width,height});await article.evaluate(()=>scrollTo(0,0));await article.screenshot({path:`artifacts/blog-author/public-${language}-${width}x${height}.png`});assert(await article.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const box=await article.locator('.blog-author-avatar').boundingBox();assert.equal(box.width,56);assert.equal(box.height,56);}
  await article.locator('a[rel="author"]').click();await article.waitForURL("**/about");await article.getByRole("heading",{name:/About Dr. Addys Reve/}).waitFor();await article.close();
  await api("posts/"+post.id+"/status","POST",{status:"draft",version:published.version});
  await api("posts/"+post.id,"PUT",{...post,version:published.version+1,data:{...post.data,author:"Faithful Care editorial team"}});
  await page.goto(config.baseUrl+"/admin/blog");await page.getByLabel("Search articles",{exact:true}).fill(slug);await page.locator(".article-row").getByRole("button",{name:"Preview",exact:true}).click();await preview.getByRole("heading",{level:1}).waitFor();assert.equal(await preview.locator('.blog-author-avatar').count(),0);assert((await preview.innerText()).includes("Faithful Care editorial team"));
  await page.getByRole("button",{name:"Back to dashboard",exact:true}).click();
 }
 assert.deepEqual(errors,[]);await context.close();console.log("PASS: real author avatar, biography navigation, Person schema, custom author isolation and 5 viewports EN/ES public + Preview.");
}finally{await browser.close();}
