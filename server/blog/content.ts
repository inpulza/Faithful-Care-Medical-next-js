import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { blankData } from "./types";
export const postInput=z.object({
  language:z.enum(["en","es"]),title:z.string().trim().min(5).max(180),
  slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  content:z.string().max(150000),
  data:z.object({
    excerpt:z.string().max(500),metaTitle:z.string().max(80),metaDescription:z.string().max(180),
    category:z.enum(["prevention","primary-care","chronic-care","senior-care","palliative-care","family-support"]),
    tags:z.array(z.string().max(50)).max(10),author:z.string().max(150),reviewer:z.string().max(150),
    reviewConfirmed:z.boolean(),hero:z.string().max(1000),heroAlt:z.string().max(250),
    images:z.array(z.object({url:z.string().max(1000),alt:z.string().min(5).max(250),afterHeading:z.number().int().min(1).max(30)})).max(5),
    sources:z.array(z.string().url().max(1000)).max(20),topic:z.string().max(300),disclaimer:z.string().max(1500),
  }).default(blankData),
});
export function sanitize(content:string) {
  return sanitizeHtml(content,{
    allowedTags:["p","h2","h3","ul","ol","li","strong","em","blockquote","a","br"],
    allowedAttributes:{a:["href","rel"]},allowedSchemes:["https"],allowProtocolRelative:false,
    transformTags:{a:(_tag,a): {tagName:string;attribs:Record<string,string>}=>{
      const href=a.href||"";
      if(href.startsWith("/")&&!href.startsWith("//")&&!href.includes("\\")) return {tagName:"a",attribs:{href}};
      try { const u=new URL(href); if(u.protocol==="https:"&&!u.username&&!u.password)
        return {tagName:"a",attribs:{href:u.href,rel:"noopener noreferrer"}}; } catch {}
      return {tagName:"a",attribs:{}};
    }},
  }).trim();
}
export function plain(content:string) {return sanitizeHtml(content,{allowedTags:[],allowedAttributes:{}}).replace(/\s+/g," ").trim();}
export function wordCount(content:string) {return plain(content).split(/\s+/).filter(Boolean).length;}
export function hrefs(content:string) {const links:string[]=[];sanitizeHtml(content,{transformTags:{a:(_,a)=>{if(a.href)links.push(a.href);return {tagName:"a",attribs:a};}}});return [...new Set(links)];}
export function slugify(text:string){return text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,170);}
