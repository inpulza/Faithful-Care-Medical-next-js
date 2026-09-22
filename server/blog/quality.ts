import {hasInternalEditorialNotes} from "../../shared/blog-text";
import {ARTICLE_MIN_WORDS} from "../../shared/blog-policy";
import {allowedSource,auditSource,qualifiedSource,type LinkRecord} from "./links";
import {ownedMediaUrl} from "./media-url";
import type { Post } from "./types";
import { wordCount,hrefs,sanitize } from "./content";
import { query } from "./db";
import { publicRoutes } from "../../app/lib/route-contract";
export async function verify(post:Post,options:{refreshSources?:boolean;actor?:string}={}) {
  const blockers:string[]=[];
  const warnings:string[]=[];
  const words=wordCount(post.content);
  if(hasInternalEditorialNotes(post.content))blockers.push("Remove internal research notes from the patient-facing article.");
  if(words<ARTICLE_MIN_WORDS) blockers.push("At least "+ARTICLE_MIN_WORDS+" useful words are required.");
  if(!/<h2\b/i.test(post.content)) blockers.push("Add clear article sections.");
  if(sanitize(post.content)!==post.content) blockers.push("Unsafe article HTML.");
  if(post.data.excerpt.length<30) blockers.push("Add a meaningful excerpt.");
  if(post.data.metaTitle.length<10||post.data.metaTitle.length>60) blockers.push("SEO title must contain 10–60 characters.");
  if(post.data.metaDescription.length<50||post.data.metaDescription.length>160) blockers.push("SEO description must contain 50–160 characters.");
  if(post.data.disclaimer.length<50) blockers.push("Add a medical information disclaimer.");
  if(!post.data.tags.length) blockers.push("Choose at least one topic tag.");
  if(!post.data.hero) warnings.push("Select a hero image before the final editorial review.");
  if(post.data.hero&&!post.data.heroAlt.trim()) blockers.push("The hero image needs alternative text.");
  const media=[...(post.data.hero?[{url:post.data.hero,alt:post.data.heroAlt}]:[]),...post.data.images];
  for(const image of media){
    if(!ownedMediaUrl(image.url)){blockers.push("Images must come from this client's own media library.");continue;}
    const approved=await query("SELECT m.id FROM fc_blog_media m JOIN fc_blog_posts p ON p.id=m.post_id WHERE m.url=$1 AND m.reviewed=true AND p.translation_group=$2",[image.url,post.translation_group]);
    if(!approved.length)blockers.push("Review and select each image in this article's media library before publishing.");
    if(!image.alt.trim())blockers.push("Every image needs descriptive alternative text.");
  }
  const headings=(post.content.match(/<h2\b/gi)||[]).length;
  if(post.data.images.some(i=>i.afterHeading>headings))blockers.push("An inline image refers to a section that does not exist.");
  if(new Set(post.data.images.map(i=>i.afterHeading)).size!==post.data.images.length)blockers.push("Choose only one image per section.");
  const links=hrefs(post.content);
  const internal=links.filter(x=>x.startsWith("/"));
  const known=new Set(publicRoutes.map(x=>x.path));
  for(const link of internal) {
    const path=link.split(/[?#]/)[0];
    if(!known.has(path)) {
      const match=path.match(/^(\/es)?\/blog\/([a-z0-9-]+)$/);
      const exists=match ? await query("SELECT id FROM fc_blog_posts WHERE language=$1 AND slug=$2 AND status='published'",[match[1]?"es":"en",match[2]]) : [];
      if(!exists.length) blockers.push("Unknown internal link: "+link);
    }
  }
  if(internal.length<2) blockers.push("Include at least two relevant internal links.");
  const external=links.filter(x=>x.startsWith("https://"));
  if(!external.length) blockers.push("Cite a medical source in the article.");
  for(const url of [...new Set([...external,...post.data.sources])]) {
    if(!allowedSource(url)){blockers.push("Source is outside the verified authority catalog: "+url);continue;}
    let [record]=await query<LinkRecord>("SELECT * FROM fc_blog_links WHERE url=$1",[url]);
    if(!qualifiedSource(record)&&options.refreshSources)record=(await auditSource(url,options.actor||"editorial-check")).record;
    if(!qualifiedSource(record))blockers.push("Source needs a successful recent link check: "+url);
  }
  return {ready:!blockers.length,words,blockers,warnings};
}
