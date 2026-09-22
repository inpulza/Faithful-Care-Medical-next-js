import type { MetadataRoute } from "next";
import { publicRoutes } from "./lib/route-contract";
import { listPosts } from "../server/blog/posts";
import {DOMAIN} from "../shared/seo-data";
export const dynamic="force-dynamic";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const entries:MetadataRoute.Sitemap=publicRoutes.map(({canonical,dateModified})=>({url:canonical,...(dateModified?{lastModified:dateModified}:{})}));
 if(process.env.BLOG_ENABLED!=="true")return entries;
 const posts=await listPosts();
 entries.push({url:DOMAIN+"/blog",alternates:{languages:{en:DOMAIN+"/blog",es:DOMAIN+"/es/blog"}}},{url:DOMAIN+"/es/blog",alternates:{languages:{en:DOMAIN+"/blog",es:DOMAIN+"/es/blog"}}});
 for(const post of posts){
  const siblings=posts.filter(p=>p.translation_group===post.translation_group);
  entries.push({url:DOMAIN+(post.language==="es"?"/es":"")+"/blog/"+post.slug,lastModified:new Date(post.updated_at),
   alternates:{languages:Object.fromEntries(siblings.map(p=>[p.language,DOMAIN+(p.language==="es"?"/es":"")+"/blog/"+p.slug]))}});
 }
 return entries;
}
