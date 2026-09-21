import {decodeHTML} from "entities";
import {sanitize,plain} from "./content";
import {ownedMediaUrl} from "./media-url";
import type {Post} from "./types";
export const escapeHtml=(s:string)=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!));
export function articleHeadings(post:Post){return [...sanitize(post.content).matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m,i)=>({id:"article-section-"+(i+1),title:decodeHTML(plain(m[1]))}));}
export function articleHtml(post:Post){
 const sections=sanitize(post.content).split(/(?=<h2\b)/i);
 let heading=0;
 return sections.map(section=>{
  if(/^<h2\b/i.test(section)){heading++;section=section.replace(/<h2\b[^>]*>/i,'<h2 id="article-section-'+heading+'">');}
  const media=post.data.images.filter(i=>i.afterHeading===heading&&ownedMediaUrl(i.url));
  return section+media.map(i=>'<figure><img src="'+escapeHtml(i.url)+'" alt="'+escapeHtml(i.alt)+'" loading="lazy"/></figure>').join("");
 }).join("");
}
export function previewHtml(post:Post){return '<!doctype html><html lang="'+post.language+'"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Private article preview</title><style>body{font:18px/1.7 Georgia,serif;color:#122e44;max-width:780px;margin:32px auto;padding:0 24px}img{display:block;max-width:100%;height:auto;border-radius:16px}h1{font-size:42px;line-height:1.15}a{color:#176ba0}aside{font:14px/1.6 system-ui;background:#eff4f6;padding:20px}figure{margin:30px 0}</style><body><p>PRIVATE EDITORIAL PREVIEW</p><h1>'+escapeHtml(post.title)+'</h1><p>'+escapeHtml(post.data.excerpt)+'</p>'+(ownedMediaUrl(post.data.hero)?'<img src="'+escapeHtml(post.data.hero)+'" alt="'+escapeHtml(post.data.heroAlt)+'"/>':'')+articleHtml(post)+'<aside>'+escapeHtml(post.data.disclaimer)+'</aside></body></html>';}
