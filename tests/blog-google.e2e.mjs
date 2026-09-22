import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from 'playwright';
const auth=JSON.parse(await fs.readFile(process.env.GOOGLE_UI_AUTH_FILE||'.local/blog-e2e.json','utf8'));
if(process.env.GOOGLE_UI_BASE_URL)auth.baseUrl=process.env.GOOGLE_UI_BASE_URL;
let protection=[];if(process.env.GOOGLE_UI_COOKIE_FILE){const jar=await fs.readFile(process.env.GOOGLE_UI_COOKIE_FILE,'utf8');protection=jar.split(/\r?\n/).map(l=>l.replace(/^#HttpOnly_/, '')).filter(l=>l&&!l.startsWith('#')).map(l=>{const [domain,,path,secure,expires,name,value]=l.split('\t');return{domain,path,secure:secure==='TRUE',expires:Number(expires)||-1,name,value};});}
const browser=await chromium.launch();await fs.mkdir('artifacts/blog-google',{recursive:true});let session;
try{for(const [width,height] of [[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440]]){
const context=await browser.newContext({viewport:{width,height},storageState:session}),page=await context.newPage(),errors=[];
if(protection.length)await context.addCookies(protection);if(process.env.EXPECTED_SHA)assert.equal((await(await context.request.get(auth.baseUrl+'/api/blog/deployment')).json()).sha,process.env.EXPECTED_SHA);
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const url='https://faithfulcaremedical.com/blog/google-ui-test',official='https://search.google.com/search-console/inspect?resource_id=sc-domain%3Afaithfulcaremedical.com&id=fixture';
let enabled=true,posts=0,events=[{action:'seo_checked',created_at:'2026-09-22T18:00:00Z',detail:{url,articleVersion:2,status:'checked',sitemapSubmitted:true,inspectionResultLink:official,inspection:{verdict:'NEUTRAL',coverageState:'URL is unknown to Google'}}}];
const post={id:'google-ui-fixture',version:2,language:'en',slug:'google-ui-test',title:'Google evidence fixture',status:'published',updated_at:'2026-09-22T18:00:00Z',data:{topic:'Fixture',category:'primary-care',tags:[],excerpt:'UI contract only; never published.',hero:''}};
await page.route('**/api/admin/blog/posts',route=>route.fulfill({json:{posts:[post]}}));
await page.route('**/api/admin/blog/posts/google-ui-fixture/seo',async route=>{if(route.request().method()==='POST'){posts++;await new Promise(r=>setTimeout(r,350));events=[{...events[0],detail:{...events[0].detail,inspection:{verdict:'PASS',coverageState:'Submitted and indexed'}}}];return route.fulfill({json:{status:'checked'}});}await route.fulfill({json:{enabled,events}});});
await context.route('https://search.google.com/**',route=>route.fulfill({body:'Official console destination simulated for UI test.'}));
if(!session){await page.goto(auth.baseUrl+'/admin/login');await page.getByLabel('Username',{exact:true}).fill(auth.username);await page.getByLabel('Password',{exact:true}).fill(auth.password);await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.waitForURL('**/admin/blog');session=await context.storageState();}else await page.goto(auth.baseUrl+'/admin/blog');
async function open(){await page.getByRole('button',{name:'Manage',exact:true}).click();await page.getByText('Google visibility and publishing checks',{exact:true}).click();await page.getByText('Accepted by Google',{exact:true}).waitFor();}
await open();const panel=page.locator('.google-visibility');await panel.getByText('Not indexed by Google',{exact:true}).waitFor();assert.equal(await panel.getByRole('link',{name:'Open in Search Console'}).getAttribute('href'),official);
const popupPromise=context.waitForEvent('page');await panel.getByRole('link',{name:'Open in Search Console'}).click();const popup=await popupPromise;await popup.waitForLoadState();assert.equal(popup.url(),official);await popup.close();assert.equal(posts,0,'Opening Google must not submit');
await panel.getByRole('button',{name:'Check Google status',exact:true}).click();await panel.getByRole('button',{name:'Checking Google…',exact:true}).waitFor();await panel.getByText('Indexed by Google',{exact:true}).waitFor();assert.equal(posts,1);
await panel.scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/blog-google/evidence-${width}x${height}.png`});assert(await page.locator('body').evaluate(el=>el.scrollWidth<=innerWidth+1));
events.unshift({action:'seo_failed',created_at:'2026-09-22T19:00:00Z',detail:{url,status:'failed',error:'Google HTTP 503'}});await page.reload();await open();await panel.getByRole('alert').filter({hasText:'Latest check failed'}).waitFor();await panel.getByText('Indexed by Google',{exact:true}).waitFor();
enabled=false;await page.reload();await open();assert(await panel.getByRole('button',{name:'Check Google status',exact:true}).isDisabled());assert.deepEqual(errors,[]);await context.close();}
console.log('PASS: Google receipt vs index status, real button flow with simulated provider, official new tab without submission, error history, disabled preview, five viewports.');}finally{await browser.close();}
