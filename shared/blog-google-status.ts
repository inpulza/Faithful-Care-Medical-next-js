export type GoogleEvent={action:string;created_at:string;detail:{url?:string;articleVersion?:number;status?:string;reason?:string;error?:string;note?:string;checkedAt?:string;sitemapSubmitted?:boolean;sitemapSubmittedAt?:string;inspectedAt?:string;inspectionResultLink?:string;audit?:{ok:boolean};inspection?:{verdict?:string;coverageState?:string;lastCrawlTime?:string;googleCanonical?:string}}};
export const SEARCH_CONSOLE_PROPERTY="https://search.google.com/search-console?resource_id="+encodeURIComponent("sc-domain:faithfulcaremedical.com");
export function searchConsoleLink(value?:string){
 try{const url=new URL(value||"");if(url.protocol==="https:"&&url.hostname==="search.google.com"&&!url.username&&!url.password&&!url.port&&url.pathname.startsWith("/search-console"))return url.href;}catch{}
 return SEARCH_CONSOLE_PROPERTY;
}
// Events arrive newest first. Keep dated evidence, never treat a sitemap receipt as an indexing request.
export function googleEvidence(events:GoogleEvent[],url:string){
 const matching=events.filter(e=>e.detail.url===url);
 const submission=matching.find(e=>e.detail.sitemapSubmitted===true);
 const inspection=matching.find(e=>e.detail.inspection);
 const verdict=inspection?.detail.inspection?.verdict;
 return {latest:matching[0],submission,inspection,indexLabel:verdict==="PASS"?"Indexed by Google":verdict==="NEUTRAL"||verdict==="FAIL"?"Not indexed by Google":"Index status unknown",consoleUrl:searchConsoleLink(inspection?.detail.inspectionResultLink)};
}
