"use client";
import {useEffect,useState} from "react";
export type Heading={id:string;title:string};
export default function Contents({headings,es}:{headings:Heading[];es:boolean}){
 const [active,setActive]=useState(headings[0]?.id||"");
 useEffect(()=>{let queued=false;function update(){queued=false;const items=headings.map(h=>document.getElementById(h.id)).filter((x):x is HTMLElement=>!!x);let current=items[0]?.id||"";for(const item of items){if(item.getBoundingClientRect().top<=180)current=item.id;}setActive(current);}function scroll(){if(!queued){queued=true;requestAnimationFrame(update);}}update();window.addEventListener("scroll",scroll,{passive:true});return()=>window.removeEventListener("scroll",scroll);},[headings]);
 if(!headings.length)return null;
 const links=<ol>{headings.map(h=><li key={h.id}><a href={"#"+h.id} aria-current={active===h.id?"location":undefined} onClick={e=>{e.preventDefault();document.getElementById(h.id)?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});history.replaceState(null,"","#"+h.id);setActive(h.id);}}>{h.title}</a></li>)}</ol>;
 return <nav className="article-contents" aria-label={es?"Índice del artículo":"Article contents"}><div className="contents-desktop"><p className="blog-eyebrow">{es?"EN ESTE ARTÍCULO":"IN THIS ARTICLE"}</p>{links}<a className="contents-top" href="#article-top">{es?"Volver arriba ↑":"Back to top ↑"}</a></div><details className="contents-mobile"><summary>{es?"En este artículo":"In this article"}</summary>{links}</details></nav>;
}
