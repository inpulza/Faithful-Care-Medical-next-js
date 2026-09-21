"use client";
import {useState} from "react";
export default function ArticlePreview({id}:{id:string}){
 const [html,setHtml]=useState(""),[error,setError]=useState("");
 async function load(){if(html)return;try{const r=await fetch("/api/admin/blog/posts/"+id+"/preview");if(!r.ok)throw Error("The saved preview could not be loaded.");setHtml(await r.text());}catch(e){setError(e instanceof Error?e.message:"Preview failed.");}}
 return <details onToggle={e=>{if(e.currentTarget.open)void load();}}><summary>Preview the saved article</summary>{error&&<p role="status">{error}</p>}{html&&<iframe title="Private article preview" sandbox="" srcDoc={html} style={{width:"100%",height:700,border:"1px solid #d8e2e9",borderRadius:16}}/>}</details>;
}
