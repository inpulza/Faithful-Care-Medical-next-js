import assert from "node:assert/strict";
import {test} from "node:test";
import {BLOG_AUTHOR,verifiedBlogAuthor,blogAuthorSchema} from "../shared/blog-author.ts";
import {blankData} from "../server/blog/types.ts";
import {previewArticle} from "../server/blog/render.ts";
test("verified author gets real portrait and Person schema without clinical-review claims",()=>{
 assert.equal(blankData.author,BLOG_AUTHOR.name);assert.equal(blankData.reviewConfirmed,false);
 const schema=blogAuthorSchema(BLOG_AUTHOR.name,"https://faithfulcaremedical.com");
 assert.equal(schema["@type"],"Person");assert.equal(schema.url,"https://faithfulcaremedical.com/about");assert.equal(schema.image,"https://faithfulcaremedical.com/images/dr-addys-reve.webp");
 for(const language of ["en","es"]){const html=previewArticle({language,title:"An article",content:"<h2>Questions</h2><p>Example.</p>",data:{...blankData}});assert.match(html,/class="blog-author-avatar"/);assert.match(html,/rel="author" href="\/about"/);assert.match(html,language==="es"?/Conoce a la doctora/:/Meet your doctor/);assert.doesNotMatch(html,/Clinical review|Revisión clínica/);}
});
test("other editorial authors keep their name without the doctor's image or identity",()=>{
 assert.equal(verifiedBlogAuthor("Another author"),null);assert.equal(blogAuthorSchema("Another author","https://site.test"),undefined);
 assert.equal(blogAuthorSchema("Faithful Care Medical Services","https://site.test")["@type"],"Organization");
 const html=previewArticle({language:"en",title:"An article",content:"<p>Example.</p>",data:{...blankData,author:"Editorial team & contributors"}});
 assert.match(html,/Editorial team &amp; contributors/);assert.doesNotMatch(html,/blog-author-avatar|Dr\. Addys Reve/);
});
