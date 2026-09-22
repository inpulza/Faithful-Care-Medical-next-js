"use client";
import {useState} from "react";
import Link from "next/link";
type Card={id:string;title:string;href:string;excerpt:string;category:string;hero:string;minutes:number;date:string};
const labels:Record<string,[string,string]>={"prevention":["Prevention","Prevención"],"primary-care":["Primary care","Atención primaria"],"chronic-care":["Chronic care","Enfermedades crónicas"],"senior-care":["Senior care","Adultos mayores"],"palliative-care":["Palliative care","Cuidados paliativos"],"family-support":["Family support","Apoyo familiar"]};
export default function Archive({posts,es}:{posts:Card[];es:boolean}){
 const [category,setCategory]=useState("all");
 const filtered=posts.filter(p=>category==="all"||p.category===category),featured=category==="all"?filtered[0]:null,rest=featured?filtered.slice(1):filtered;
 const categoryName=(key:string)=>labels[key]?.[es?1:0]||key;
 const details=(p:Card)=><><p className="blog-eyebrow">{categoryName(p.category)}</p><h2><Link href={p.href}>{p.title}</Link></h2><p>{p.excerpt}</p><small>{p.date} · {p.minutes} min {es?"de lectura":"read"}</small></>;
 return <section className="journal-archive" aria-label={es?"Artículos de salud":"Health articles"}><div className="journal-categories" aria-label={es?"Filtrar por tema":"Filter by topic"}><button aria-pressed={category==="all"} onClick={()=>setCategory("all")}>{es?"Todos los temas":"All topics"}</button>{Object.keys(labels).filter(c=>posts.some(p=>p.category===c)).map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{categoryName(c)}</button>)}</div>
 {featured&&<article className="journal-featured">{featured.hero&&<Link className="journal-featured-image" href={featured.href} tabIndex={-1} aria-hidden><img src={featured.hero} alt=""/></Link>}<div className="journal-featured-copy"><span className="journal-latest">{es?"LO MÁS RECIENTE":"LATEST IN THE JOURNAL"}</span>{details(featured)}<Link className="journal-read" href={featured.href}>{es?"Leer artículo":"Read article"} →</Link></div></article>}
 <div className="blog-grid">{rest.map(p=><article className="blog-card" key={p.id}>{p.hero&&<Link href={p.href} tabIndex={-1} aria-hidden><img src={p.hero} alt="" loading="lazy"/></Link>}{details(p)}</article>)}</div></section>;
}
