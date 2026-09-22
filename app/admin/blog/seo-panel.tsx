"use client";
import {useEffect,useState} from "react";
export default function SeoPanel({id,version,published,api}:{id:string;version:number;published:boolean;api:(path:string,method?:string,body?:unknown)=>Promise<any>}){
 const [events,setEvents]=useState<any[]>([]),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 const refresh=()=>api("posts/"+id+"/seo").then(d=>setEvents(d.events));
 useEffect(()=>{refresh().catch(e=>setMessage(e.message));},[id,version]);
 async function check(){setBusy(true);try{const result=await api("posts/"+id+"/seo","POST",{});setMessage(result.reason||result.error||result.note||result.status);await refresh();}catch(e){setMessage(e instanceof Error?e.message:"Check failed.");}finally{setBusy(false);}}
 return <details><summary>Google visibility and publishing checks</summary><p>Publication checks the live canonical page and sitemap, then submits the sitemap and reads Search Console. Google decides whether and when to index it. Preview never submits test articles.</p><button className="secondary" disabled={busy||!published} onClick={check}>Check Google status</button>{message&&<p role="status">{message}</p>}{events.map((e,i)=><article key={i} className="editor-report"><strong>{e.action.replaceAll("_"," ")} · {new Date(e.created_at).toLocaleString()}</strong><p>{e.detail.reason||e.detail.error||e.detail.note}</p>{e.detail.inspection&&<p>{e.detail.inspection.coverageState||e.detail.inspection.verdict||"Google has no inspection detail yet."}</p>}<p>Sitemap submitted: {e.detail.sitemapSubmitted?"yes":"no"}</p></article>)}</details>;
}
