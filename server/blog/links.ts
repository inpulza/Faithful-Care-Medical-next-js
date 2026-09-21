import https from "node:https";
import {lookup} from "node:dns/promises";
import {SOURCES} from "./catalog";
import {query} from "./db";
import {BlogError} from "./types";
import {plain} from "./content";
import {event} from "./posts";
export interface LinkRecord {url:string;publisher:string;score:number;reason:string;approved:boolean;health:string;http_status:number|null;checked_at:string|null}
export function publicIpv4(ip:string){
 const parts=ip.split(".").map(Number);
 if(parts.length!==4||parts.some(x=>!Number.isInteger(x)||x<0||x>255))return false;
 const [a,b]=parts;
 return !(a===0||a===10||a===127||a>=224||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&(b===168||b===0))||(a===100&&b>=64&&b<=127)||(a===198&&(b===18||b===19)));
}
export function allowedSource(url:string){return SOURCES.find(s=>s.url===url);}
export function qualifiedSource(record?:LinkRecord){return !!record&&!!allowedSource(record.url)&&record.health==="healthy"&&record.score>=70&&!!record.checked_at&&Date.parse(record.checked_at)>Date.now()-7*86400000;}
export async function readSource(url:string):Promise<{status:number;html:string}>{
 if(!allowedSource(url))throw new BlogError(400,"Only exact catalog source URLs may be checked.");
 const target=new URL(url);
 const addresses=(await lookup(target.hostname,{all:true,family:4})).map(item=>item.address);
 if(!addresses.length||addresses.some(ip=>!publicIpv4(ip)))throw new BlogError(400,"Source did not resolve to a public address.");
 const address=addresses[0];
 return new Promise((resolve,reject)=>{
  const req=https.get(target,{headers:{"User-Agent":"FaithfulCareEditorial/1.0","Accept":"text/html","Accept-Encoding":"identity"},
   lookup:((_host:unknown,options:unknown,cb:Function)=>{ if(typeof options==="function"){(options as Function)(null,address,4);return;}
     if((options as {all?:boolean})?.all)cb(null,[{address,family:4}]);else cb(null,address,4);}) as any,
  },res=>{
   const status=res.statusCode||0;
   if(status!==200){res.resume();resolve({status,html:""});return;}
   if(!String(res.headers["content-type"]).includes("text/html")){res.resume();reject(new BlogError(422,"Source is not an HTML page."));return;}
   const chunks:Buffer[]=[];let size=0;
   res.on("data",chunk=>{size+=chunk.length;if(size>600000){res.destroy();reject(new BlogError(422,"Source exceeds the safe response size."));}else chunks.push(chunk);});
   res.on("end",()=>resolve({status,html:Buffer.concat(chunks).toString("utf8")}));res.on("error",reject);
  });
  const deadline=setTimeout(()=>req.destroy(new Error("Source request deadline exceeded")),15000);
  req.on("close",()=>clearTimeout(deadline));req.on("error",reject);
 });
}
export async function seedSources(){
 for(const source of SOURCES)await query("INSERT INTO fc_blog_links(url,kind,publisher,score,reason) VALUES($1,'external',$2,75,$3) ON CONFLICT(url) DO NOTHING",
 [source.url,source.publisher,"Publisher identity 35/35; government health source 25/25; exact stable HTTPS URL 15/15. Live readability 0/15, current health 0/10 until checked. This is source quality, not proof of a clinical claim."]);
}
export async function linkLibrary(){await seedSources();return query<LinkRecord>("SELECT * FROM fc_blog_links ORDER BY publisher,url");}
export async function auditSource(url:string,actor:string){
 if(!allowedSource(url))throw new BlogError(400,"Unknown catalog source.");
 await seedSources();
 let status:number|null=null,health="unreachable",readable=false,excerpt="";
 try{const response=await readSource(url);status=response.status;readable=plain(response.html).length>300;health=status===200&&readable?"healthy":status>=300&&status<400?"redirected":"broken";excerpt=plain(response.html).slice(0,18000);}catch{}
 const score=75+(readable?15:0)+(health==="healthy"?10:0);
 const reason="Publisher 35/35; government health source 25/25; exact stable HTTPS URL 15/15; readability "+(readable?"15":"0")+"/15; HTTP health "+(health==="healthy"?"10":"0")+"/10. Article-specific clinical relevance must still be reviewed.";
 const [record]=await query<LinkRecord>("UPDATE fc_blog_links SET score=$2,reason=$3,health=$4,http_status=$5,checked_at=now(),approved=CASE WHEN $4='healthy' THEN approved ELSE false END WHERE url=$1 RETURNING *",[url,score,reason,health,status]);
 if(health==="healthy")await query("INSERT INTO fc_blog_source_cache(url,excerpt,fetched_at,expires_at) VALUES($1,$2,$3::timestamptz,$3::timestamptz+interval '24 hours') ON CONFLICT(url) DO UPDATE SET excerpt=excluded.excerpt,fetched_at=excluded.fetched_at,expires_at=excluded.expires_at",[url,excerpt,record.checked_at]);
 else await query("DELETE FROM fc_blog_source_cache WHERE url=$1",[url]);
 await event(null,"source_checked",actor,{url,health,status,score});
 return {record,excerpt};
}
export async function sourceDashboard(){
 const links=await linkLibrary();
 const cached=await query<{url:string;expires_at:string}>("SELECT url,expires_at FROM fc_blog_source_cache");
 const posts=await query<{id:string;title:string;language:string;status:string;sources:string[]}>("SELECT id,title,language,status,data->'sources' AS sources FROM fc_blog_posts ORDER BY updated_at DESC");
 const history=await query("SELECT id,action,created_at,detail FROM fc_blog_events WHERE action IN ('source_checked','source_reused','source_researched','source_approved','source_blocked') ORDER BY id DESC LIMIT 100");
 return {links:links.map(link=>{const source=SOURCES.find(s=>s.url===link.url);const articles=posts.filter(p=>Array.isArray(p.sources)&&p.sources.includes(link.url)).map(({sources,...p})=>p);return {...link,qualified:qualifiedSource(link),title:source?.title||link.url,categories:source?.categories||[],cache_expires_at:cached.find(c=>c.url===link.url)?.expires_at||null,usage:articles.length,articles};}),history};
}
export async function researchSource(url:string,actor:string){
 if(!allowedSource(url))throw new BlogError(400,"Unknown catalog source.");
 const [cached]=await query<LinkRecord & {excerpt:string}>(`SELECT l.*,c.excerpt FROM fc_blog_links l JOIN fc_blog_source_cache c ON c.url=l.url WHERE l.url=$1 AND l.health='healthy' AND c.expires_at>now() AND c.fetched_at=l.checked_at`,[url]);
 if(cached){const {excerpt,...record}=cached;await event(null,"source_reused",actor,{url,checkedAt:record.checked_at});return {record,excerpt};}
 const result=await auditSource(url,actor);
 await event(null,"source_researched",actor,{url,health:result.record.health,score:result.record.score});
 return result;
}
