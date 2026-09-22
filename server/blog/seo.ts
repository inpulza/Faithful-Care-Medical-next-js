import {DOMAIN} from "../../shared/seo-data";
import {query} from "./db";
import {event,getPost} from "./posts";
import {BlogError,type Post} from "./types";
import {wordCount} from "./content";
export const PROPERTY="sc-domain:faithfulcaremedical.com";
export const SITEMAP=DOMAIN+"/sitemap.xml";
export function postUrl(post:Post){return DOMAIN+(post.language==="es"?"/es":"")+"/blog/"+post.slug;}
export function auditHtml(post:Post,html:string,sitemap:string,robotsHeader=""){
 const url=postUrl(post),blockers:string[]=[];
 const attrs=(tag:string)=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
 const canonical=(html.match(/<link\b[^>]*>/gi)||[]).map(attrs).find(a=>a.rel==="canonical")?.href;
 const robots=(html.match(/<meta\b[^>]*>/gi)||[]).map(attrs).filter(a=>a.name==="robots"||a.name==="googlebot").map(a=>a.content).join(" ")+robotsHeader;
 if(canonical!==url)blockers.push("Canonical URL does not match the published article.");
 if(/noindex|none/i.test(robots))blockers.push("A robots directive prevents indexing.");
 if(!sitemap.includes("<loc>"+url+"</loc>"))blockers.push("The exact URL is missing from the sitemap.");
 if(!html.includes('data-blog-post-id="'+post.id+'"')||!html.includes('data-blog-version="'+post.version+'"'))blockers.push("The public response does not contain this saved article version.");
 const article=html.match(/<main\b[^>]*data-blog-post-id[^>]*>([\s\S]*?)<\/main>/i)?.[1]||"";
 if(!/<h1\b[^>]*>[^<]+<\/h1>/i.test(article))blockers.push("The article heading is missing from the server response.");
 if(wordCount(article)<800)blockers.push("The server response has insufficient article content.");
 return {ok:!blockers.length,url,canonical,blockers};
}
export function googleConfigured(){return Boolean(process.env.GSC_OAUTH_CLIENT_ID&&process.env.GSC_OAUTH_CLIENT_SECRET&&process.env.GSC_OAUTH_REFRESH_TOKEN);}
async function accessToken(){
 if(!googleConfigured())throw new BlogError(503,"The agency Google connection is not configured.");
 const response=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:process.env.GSC_OAUTH_CLIENT_ID!,client_secret:process.env.GSC_OAUTH_CLIENT_SECRET!,refresh_token:process.env.GSC_OAUTH_REFRESH_TOKEN!,grant_type:"refresh_token"}),signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw new BlogError(502,"Google authorization could not be refreshed (HTTP "+response.status+").");
 const payload=await response.json();if(typeof payload.access_token!=="string")throw new BlogError(502,"Google returned no access token.");return payload.access_token as string;
}
async function google(token:string,url:string,method="GET",body?:unknown){
 const response=await fetch(url,{method,headers:{Authorization:"Bearer "+token,...(body?{"Content-Type":"application/json"}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw new BlogError(502,"Search Console request failed (HTTP "+response.status+").");
 return response.status===204?{}:response.json();
}
export async function googleConnection(){
 const token=await accessToken();
 const result=await google(token,"https://www.googleapis.com/webmasters/v3/sites/"+encodeURIComponent(PROPERTY));
 return {property:PROPERTY,permission:result.permissionLevel,connected:result.siteUrl===PROPERTY};
}
export async function seoHistory(id:string){await getPost(id);return query("SELECT action,detail,created_at FROM fc_blog_events WHERE post_id=$1 AND action LIKE 'seo_%' ORDER BY created_at DESC LIMIT 10",[id]);}
export async function publishSeo(id:string,actor:string){
 const post=await getPost(id);if(post.status!=="published")throw new BlogError(409,"Publish the reviewed article before checking its public indexing status.");
 if(process.env.VERCEL_ENV!=="production"||process.env.BLOG_GSC_ENABLED!=="true"){
  const result={status:"skipped",reason:process.env.VERCEL_ENV!=="production"?"Preview does not submit articles to Google. Check this article in production.":"Automatic Google submissions are disabled in this production deployment.",url:postUrl(post)};
  await event(id,"seo_skipped",actor,result);return result;
 }
 const {consumeLimit}=await import("./auth");await consumeLimit("seo:"+id,4,3600);
 const result:Record<string,unknown>={url:postUrl(post),articleVersion:post.version,checkedAt:new Date().toISOString(),sitemapSubmitted:false,inspection:null,status:"checking"};
 try{
  const [page,map]=await Promise.all([fetch(postUrl(post),{redirect:"manual",cache:"no-store",signal:AbortSignal.timeout(25000)}),fetch(SITEMAP,{redirect:"manual",cache:"no-store",signal:AbortSignal.timeout(25000)})]);
  if(page.status!==200||map.status!==200)throw new BlogError(502,"The canonical article and sitemap must both return HTTP 200 without redirects.");
  const audit=auditHtml(post,await page.text(),await map.text(),page.headers.get("x-robots-tag")||"");result.audit=audit;
  if(!audit.ok)throw new BlogError(422,audit.blockers.join(" "));
  const current=await getPost(id);if(current.status!=="published"||current.version!==post.version)throw new BlogError(409,"The article changed during the Google check. Retry its current published version.");
  const token=await accessToken();
  await google(token,"https://www.googleapis.com/webmasters/v3/sites/"+encodeURIComponent(PROPERTY)+"/sitemaps/"+encodeURIComponent(SITEMAP),"PUT");result.sitemapSubmitted=true;result.sitemapSubmittedAt=new Date().toISOString();
  const inspected=await google(token,"https://searchconsole.googleapis.com/v1/urlInspection/index:inspect","POST",{inspectionUrl:postUrl(post),siteUrl:PROPERTY,languageCode:post.language});
  const index=inspected.inspectionResult?.indexStatusResult||{};
  result.inspectedAt=new Date().toISOString();
  result.inspectionResultLink=inspected.inspectionResult?.inspectionResultLink;
  result.inspection={verdict:index.verdict,coverageState:index.coverageState,lastCrawlTime:index.lastCrawlTime,googleCanonical:index.googleCanonical,userCanonical:index.userCanonical,pageFetchState:index.pageFetchState};
  result.status="checked";result.note="Sitemap submission and URL Inspection are not a guarantee of indexing.";
  await event(id,"seo_checked",actor,result);return result;
 }catch(e){result.status="failed";result.error=e instanceof BlogError?e.message:"The publishing check failed; no indexing success is assumed.";await event(id,"seo_failed",actor,result);return result;}
}
