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
