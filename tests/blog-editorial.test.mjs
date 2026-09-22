import assert from "node:assert/strict";
import {test} from "node:test";
import {portfolio,validateBrief,buildBrief,assertLinks,assess,makeMetadata,assemble} from "../server/blog/editorial.ts";
import {blankData} from "../server/blog/types.ts";
const candidate={id:"preventive-visit",title:"Preparing a preventive visit",angle:"Prepare a practical question list with a clinician",keyword:"preventive visit",category:"prevention",sourceUrls:["https://medlineplus.gov/healthscreening.html"]};
async function provider(values,fn){const fetch=globalThis.fetch,saved={...process.env};let count=0;process.env.BLOG_AI_ENABLED="true";process.env.OPENAI_API_KEY="unit-only";globalThis.fetch=async()=>Response.json({choices:[{finish_reason:"stop",message:{content:JSON.stringify(values[count++])}}]});try{await fn(()=>count);}finally{globalThis.fetch=fetch;for(const key of ["BLOG_AI_ENABLED","OPENAI_API_KEY"]){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}}}
test("editorial memory groups translations and carries body/metadata evidence",()=>{
 const base={id:"a",translation_group:"same",title:"Prevention",content:"<p>Ask your clinician</p>",data:{...blankData,excerpt:"Useful discussion"}};
 const result=portfolio([base,{...base,id:"b",language:"es"}]);assert.equal(result.length,1);assert.equal(result[0].body,"Ask your clinician");
});
test("research brief rejects invented source evidence",()=>{
 const brief={audience:"Adults preparing a visit",intent:"Discuss screening with a clinician",sections:["First section","Second section","Third section","Fourth section"],facts:[{claim:"Discuss screening needs",url:candidate.sourceUrls[0],support:"Discuss screening needs"},{claim:"Discuss screening choices",url:candidate.sourceUrls[0],support:"Discuss screening choices"}],limits:["Not individual advice"]};
 assert.throws(()=>validateBrief(brief,[{url:candidate.sourceUrls[0],excerpt:"This does not contain the invented support."}]),e=>e.status===422);
 assert.equal(validateBrief(brief,[{url:candidate.sourceUrls[0],excerpt:"Discuss screening needs. Discuss screening choices."}]).facts.length,2);
});
test("generated links in HTML and plain metadata fail closed",()=>{
 assertLinks('<a href="/contact">Care</a>',["/contact"]);
 for(const value of ['<a href="https://evil.example">source</a>',"Read https://evil.example"])assert.throws(()=>assertLinks(value,["/contact"]),e=>e.status===422);
});
test("semantic reviewer can stop a superficially different duplicate",async()=>{
 await provider([{reviews:[{id:candidate.id,recommendation:"update_existing",reason:"Same reader intent as the existing discussion",matches:[]}]}],async()=>{await assert.rejects(()=>assess([candidate],[]),e=>e.status===409);});
});
test("metadata repair is bounded and validates every returned SEO field",async()=>{
 const good={slug:"prepare-a-visit",excerpt:"Prepare useful questions for a preventive care conversation.",metaTitle:"Preparing for preventive care",metaDescription:"Prepare for a preventive care visit with a practical question list and discuss screening choices with your clinician.",tags:["prevention","appointments"]};
 await provider([{...good,metaTitle:"x".repeat(100)},good],async count=>{assert.deepEqual(await makeMetadata({title:candidate.title,content:"Article"},candidate,"en"),good);assert.equal(count(),2);});
 await provider([{},{},{}],async count=>{await assert.rejects(()=>makeMetadata({title:candidate.title,content:"Article"},candidate,"en"),e=>e.status===422);assert.equal(count(),2);});
});
test("assembly does not save incomplete drafts or fabricate missing links",()=>{
 assert.throws(()=>assemble(candidate,"en",{title:candidate.title,content:"<p>Too short</p>"},{slug:"short",excerpt:"Short",metaTitle:"Short",metaDescription:"Short",tags:[]}),e=>e.status===422);
});

test("brief repair handles schema errors without weakening exact source evidence",async()=>{
 const brief={audience:"Adults preparing a visit",intent:"Discuss screening with a clinician",sections:["First section","Second section","Third section","Fourth section"],facts:[{claim:"Discuss screening needs",url:candidate.sourceUrls[0],support:"Discuss screening needs"},{claim:"Discuss screening choices",url:candidate.sourceUrls[0],support:"Discuss screening choices"}],limits:["Not individual advice"]};
 const sources=[{url:candidate.sourceUrls[0],excerpt:"Discuss screening needs. Discuss screening choices."}];
 await provider([{...brief,sections:brief.sections.map(title=>({title}))},brief],async count=>{assert.deepEqual(await buildBrief(candidate,"en",sources),brief);assert.equal(count(),2);});
 const invented={...brief,facts:brief.facts.map(f=>({...f,support:"This evidence was never in the source"}))};
 await provider([invented,brief],async count=>{assert.deepEqual(await buildBrief(candidate,"en",sources),brief);assert.equal(count(),2);});
 await provider([invented,invented,brief],async count=>{await assert.rejects(()=>buildBrief(candidate,"en",sources),e=>e.status===422&&e.message.includes("after one repair"));assert.equal(count(),2);});
});

test("related article suggestions include only published same-language relevant pages",async()=>{
 const {relatedArticleLinks}=await import("../server/blog/editorial.ts");
 const post={title:"Discussing a preventive visit",slug:"preventive-questions",language:"en",status:"published",data:{...blankData,category:"prevention",topic:"different",excerpt:"A practical question list before a preventive visit"}};
 const result=relatedArticleLinks([post,{...post,status:"draft",slug:"private"},{...post,language:"es",slug:"es"},{...post,data:{...post.data,category:"palliative-care"},slug:"other"},{...post,data:{...post.data,topic:candidate.id},slug:"duplicate"}],candidate,"en");
 assert.deepEqual(result,[{url:"/blog/preventive-questions",title:post.title}]);
});


test("explicit editorial focus cannot be replaced by a novel unrelated topic",async()=>{
 const unrelated={...candidate,id:"palliative-family",title:"Discussing palliative family care",category:"family-support",sourceUrls:["https://medlineplus.gov/palliativecare.html"]};
 const reviews=[{id:candidate.id,recommendation:"update_existing",reason:"Existing article has the requested primary care intent",matches:[],focusMatch:true},{id:unrelated.id,recommendation:"create_new",reason:"Novel but unrelated to the requested primary care visit",matches:[],focusMatch:false}];
 await provider([{reviews}],async()=>{await assert.rejects(()=>assess([candidate,unrelated],[],"Prepare for a primary care visit"),e=>e.status===409);});
 await provider([{reviews:[{...reviews[0],recommendation:"create_new"},reviews[1]]}],async()=>{assert.equal((await assess([candidate,unrelated],[],"Prepare for a primary care visit")).selected.id,candidate.id);});
});

test("article minimum matches XL length policy and expansion requests substantial useful coverage",async()=>{
 const {expandArticle}=await import("../server/blog/editorial.ts");
 const {ARTICLE_MIN_WORDS,ARTICLE_TARGET_MIN_WORDS}=await import("../shared/blog-policy.ts");
 assert.equal(ARTICLE_MIN_WORDS,1200);assert.equal(ARTICLE_TARGET_MIN_WORDS,1500);
 const html=n=>'<h2>One</h2><h2>Two</h2><h2>Three</h2><h2>Four</h2><p>'+Array.from({length:n},()=>"word").join(" ")+'</p><p><a href="/primary-care">Care</a><a href="/contact">Contact</a><a href="'+candidate.sourceUrls[0]+'">Source</a></p>';
 const metadata={slug:"useful-visit",excerpt:"Prepare practical questions for your upcoming clinical visit.",metaTitle:"Preparing for a clinical visit",metaDescription:"Prepare useful questions before your primary care visit and discuss appropriate preventive screening with your clinician.",tags:["prevention","visits"]};
 assert.throws(()=>assemble(candidate,"en",{title:candidate.title,content:html(1100)},metadata),e=>e.status===422);
 assert.equal(assemble(candidate,"en",{title:candidate.title,content:html(1250)},metadata).title,candidate.title);
 await provider([{title:candidate.title,content:html(1600)}],async count=>{const result=await expandArticle({title:candidate.title,content:html(1250)},candidate,"en",{});assert(result.content.includes("word"));assert.equal(count(),1);});
});
