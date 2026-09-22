import assert from "node:assert/strict";
import {test} from "node:test";
import {articleWordCount,articleReadingMinutes,hasInternalEditorialNotes} from "../shared/blog-text.ts";
import {wordCount} from "../server/blog/content.ts";
import {articleHtml,previewArticle} from "../server/blog/render.ts";
import {blankData} from "../server/blog/types.ts";
test("word count preserves block boundaries, inline words and entities consistently",()=>{
 const html='<p>First paragraph.</p><p>Second <strong>paragraph</strong>.</p><ul><li>One</li><li>Two</li></ul><p>care&nbsp;team &amp; support</p><script>do not count this</script>';
 assert.equal(articleWordCount(html),10);assert.equal(wordCount(html),10);
 assert.equal(articleReadingMinutes('<p>'+"word ".repeat(1401)+'</p>'),8);
});
test("internal research notes are detected in both languages without rejecting patient caveats",()=>{
 assert(hasInternalEditorialNotes('The supplied educational source does not verify staffing.'));
 assert(hasInternalEditorialNotes('La fuente educativa proporcionada no verifica los servicios.'));
 assert(!hasInternalEditorialNotes('Discuss available services with your clinician. This article does not replace medical advice.'));
});
test("article and saved preview preserve lists and use the same reading count",()=>{
 const post={title:"Preparing for a visit",language:"en",content:'<p>'+"word ".repeat(1401)+'</p><ul><li>First item</li><li>Second item</li></ul><ol><li>Next step</li></ol>',data:{...blankData}};
 assert.equal((articleHtml(post).match(/<li>/g)||[]).length,3);
 assert.equal((previewArticle(post).match(/<li>/g)||[]).length,3);
 assert(previewArticle(post).includes('8 min read'));
});
