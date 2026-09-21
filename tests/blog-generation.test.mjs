import assert from "node:assert/strict";import {test} from "node:test";
import {overlap} from "../server/blog/generation.ts";import {aiConfig,rejectPrivateInformation,generateJson} from "../server/blog/provider.ts";
test("generation fails closed without configuration and blocks obvious patient identifiers",async()=>{delete process.env.OPENAI_API_KEY;process.env.BLOG_AI_ENABLED="false";assert.throws(aiConfig,e=>e.status===503);for(const text of ["patient name: example","DOB: 01/01/1980","example@example.com","123-45-6789"])assert.throws(()=>rejectPrivateInformation(text),e=>e.status===400);rejectPrivateInformation("General preventive care information");});
test("topic matching recognizes repeated titles",()=>{assert.equal(overlap("Preparing diabetes questions","Preparing diabetes questions"),1);assert.equal(overlap("Primary prevention","Palliative family"),0);});
test("provider truncation and malformed JSON never return content",async()=>{
 const original=globalThis.fetch;process.env.BLOG_AI_ENABLED="true";process.env.OPENAI_API_KEY="unit-only-key";
 try{
  globalThis.fetch=async()=>Response.json({choices:[{finish_reason:"length",message:{content:'{"title":"partial"}'}}]});
  await assert.rejects(()=>generateJson("test",{}),e=>e.status===502);
  globalThis.fetch=async()=>Response.json({choices:[{finish_reason:"stop",message:{content:"not JSON"}}]});
  await assert.rejects(()=>generateJson("test",{}),e=>e.status===502);
 }finally{globalThis.fetch=original;delete process.env.OPENAI_API_KEY;process.env.BLOG_AI_ENABLED="false";}
});
