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

import {googleEvidence,searchConsoleLink,SEARCH_CONSOLE_PROPERTY} from "../shared/blog-google-status.ts";
test("Google evidence distinguishes indexing from receipts and retains dated earlier evidence",()=>{
 const url="https://faithfulcaremedical.com/blog/example",receipt={created_at:"2026-09-22T18:00:00Z",action:"seo_checked",detail:{url,sitemapSubmitted:true,inspection:{verdict:"NEUTRAL",coverageState:"URL is unknown to Google"}}};
 assert.equal(googleEvidence([receipt],url).indexLabel,"Not indexed by Google");
 assert.equal(googleEvidence([{...receipt,detail:{url,sitemapSubmitted:true}}],url).indexLabel,"Index status unknown");
 const failed={...receipt,detail:{url,status:"failed",error:"HTTP 503"}};
 const result=googleEvidence([failed,receipt],url);assert.equal(result.latest,failed);assert.equal(result.submission,receipt);assert.equal(result.inspection,receipt);
 assert.equal(googleEvidence([receipt],url+"-changed").submission,undefined);
 assert.equal(googleEvidence([{...receipt,detail:{url,inspection:{verdict:"PASS"}}}],url).indexLabel,"Indexed by Google");
});
test("Search Console links only open the official HTTPS application",()=>{
 const valid="https://search.google.com/search-console/inspect?resource_id=sc-domain%3Afaithfulcaremedical.com&id=real-api-id";assert.equal(searchConsoleLink(valid),valid);
 for(const link of [undefined,"javascript:alert(1)","https://search.google.com.evil.test/search-console","https://user@search.google.com/search-console","http://search.google.com/search-console","https://search.google.com:8443/search-console","https://search.google.com/other"])assert.equal(searchConsoleLink(link),SEARCH_CONSOLE_PROPERTY);
});
