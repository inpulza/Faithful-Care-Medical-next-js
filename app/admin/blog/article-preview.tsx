"use client";
import {useEffect,useState} from "react";
export default function ArticlePreview({id}:{id:string}){
 const [html,setHtml]=useState(""),[error,setError]=useState("");
 useEffect(()=>{const controller=new AbortController();fetch("/api/admin/blog/posts/"+id+"/preview",{headers:{Accept:"application/json"},signal:controller.signal}).then(async r=>{if(!r.ok)throw Error("The saved preview could not be loaded.");setHtml((await r.json()).html);}).catch(e=>{if(!controller.signal.aborted)setError(e.message);});return()=>controller.abort();},[id]);
 return <section className="article-preview-panel" aria-label="Saved article preview"><p className="preview-caption">Saved article preview</p>{error&&<p role="alert">{error}</p>}{!html&&!error&&<p role="status">Loading article…</p>}{html&&<div onClick={e=>{const link=(e.target as Element).closest("a");if(link?.getAttribute("href")?.startsWith("#")){e.preventDefault();e.currentTarget.querySelector(link.getAttribute("href")!)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});}else if(link){e.preventDefault();window.open(link.href,"_blank","noopener,noreferrer");}}} dangerouslySetInnerHTML={{__html:html}}/>}</section>;
}
