import assert from "node:assert/strict";import {test} from "node:test";
import {auditHtml,postUrl} from "../server/blog/seo.ts";
import {isSensitiveHealthRoute,privacySafeTrackingPath,privacySafeTrackingTitle} from "../shared/tracking-route-privacy.ts";
import {TRACKING_BOOTSTRAP} from "../app/tracking-scripts.tsx";
test("Google eligibility requires current server-rendered article, canonical and sitemap",()=>{
 const p={id:"article-id",version:3,language:"es",slug:"preparar-visita"};
 const url=postUrl(p),map="<loc>"+url+"</loc>";
 const html='<link rel="canonical" href="'+url+'"><main data-blog-post-id="article-id" data-blog-version="3"><h1>Preparar la visita</h1><p>'+"useful educational words ".repeat(300)+"</p></main>";
 assert(auditHtml(p,html,map).ok);
 for(const [h,m,r] of [[html,"",""],[html,map,"noindex"],[html.replace('version="3"','version="2"'),map,""],[html.replace(url,"https://wrong.test"),map,""],[html.replace(/<main[\s\S]*/,""),map,""]])assert.equal(auditHtml(p,h,m,r).ok,false);
});
test("blog condition titles and slugs stay behind a document navigation privacy boundary",()=>{
 for(const path of ["/blog/diabetes-questions","/es/blog/preguntas-diabetes"]){assert(isSensitiveHealthRoute(path));assert(!privacySafeTrackingPath(path).includes("diabetes"));assert(!privacySafeTrackingTitle(path,"Diabetes diagnosis").includes("Diabetes"));}
 assert.equal(isSensitiveHealthRoute("/blog"),false);
 assert.doesNotThrow(()=>new Function(TRACKING_BOOTSTRAP));
 assert(TRACKING_BOOTSTRAP.includes("!isBlogArticle(url.pathname)"));
});
