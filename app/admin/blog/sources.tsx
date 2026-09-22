"use client";
import {useEffect,useState} from "react";
type Source={url:string;title:string;categories:string[];publisher:string;score:number;reason:string;qualified:boolean;health:string;http_status:number|null;checked_at:string|null;cache_expires_at:string|null;usage:number;articles:{id:string;title:string;language:string;status:string}[]};
type Entry={id:string;action:string;created_at:string;detail:{url?:string;health?:string;score?:number;status?:number}};
const date=(v:string|null)=>v?new Date(v).toLocaleString():"Not yet";
const shortDate=(v:string|null)=>v?new Date(v).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"Not checked";
export default function Sources({api}:{api:(path:string,method?:string,body?:unknown)=>Promise<any>}){
 const [sources,setSources]=useState<Source[]>([]),[history,setHistory]=useState<Entry[]>([]),[message,setMessage]=useState(""),[busy,setBusy]=useState(false),[tab,setTab]=useState("library"),[search,setSearch]=useState(""),[filter,setFilter]=useState("all");
 async function load(){const d=await api("links/dashboard");setSources(d.links);setHistory(d.history);}
 useEffect(()=>{load().catch(e=>setMessage(e.message));},[]);
 async function act(action:()=>Promise<void>){setBusy(true);setMessage("");try{await action();await load();}catch(e){setMessage(e instanceof Error?e.message:"Check failed.");}finally{setBusy(false);}}
 const visible=sources.filter(s=>(filter==="all"||filter==="qualified"&&s.qualified||filter==="needs-check"&&!s.qualified||filter==="unhealthy"&&s.health!=="healthy")&&[s.title,s.url,...s.categories].join(" ").toLowerCase().includes(search.toLowerCase()));
 return <section className="source-workspace" aria-labelledby="sources-title">
  <header className="section-heading"><div><p className="blog-eyebrow">RESEARCH & CITATIONS</p><h2 id="sources-title">Sources and link health</h2><p>Your research library, checks and citation history in one place.</p></div><button disabled={busy||!sources.length} className="secondary" onClick={()=>act(async()=>{for(const s of sources)await api("links/check","POST",{url:s.url});setMessage("Live checks completed. Eligible sources are qualified automatically.");})}>Check all sources</button></header>
  <div className="source-panel">
   <div className="source-stats"><div><strong>{sources.length}</strong><span>Curated sources</span></div><div><strong>{sources.filter(s=>s.health==="healthy").length}</strong><span>Healthy links</span></div><div><strong>{sources.filter(s=>s.qualified).length}</strong><span>Qualified to cite</span></div><div><strong>{sources.filter(s=>s.cache_expires_at&&Date.parse(s.cache_expires_at)>Date.now()).length}</strong><span>Fresh research copies</span></div></div>
   <div className="source-tabs" aria-label="Source views">{[["library","Source library"],["history","Consultation history"]].map(([key,label])=><button key={key} aria-pressed={tab===key} aria-controls="source-view" onClick={()=>setTab(key)}>{label}</button>)}</div>
   {message&&<p role="status" className="editor-message">{message}</p>}{busy&&<p role="status" className="source-busy">Checking sources… Each result is saved.</p>}
   <div id="source-view">
   {tab==="library"?<>
    <div className="source-toolbar"><div className="dashboard-filters"><label>Search sources<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Topic, source or URL"/></label><label>Source status<select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All sources</option><option value="qualified">Qualified</option><option value="needs-check">Needs a fresh check</option><option value="unhealthy">Needs a health check</option></select></label></div><p className="source-result-count" role="status">{visible.length} of {sources.length} sources</p></div>
    <div className="source-table-head" aria-hidden="true"><span>Source</span><span>Health & eligibility</span><span>Quality</span><span>Usage</span><span>Actions</span></div>
    <div className="source-list">{visible.map(s=><article key={s.url} className="source-card" aria-label={s.title}>
     <div className="source-row">
      <div className="source-identity"><h3><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></h3><p className="source-publisher">{s.publisher}</p><p className="source-url">{s.url}</p><div className="source-categories">{s.categories.map(c=><span key={c}>{c.replaceAll("-"," ")}</span>)}</div></div>
      <div className="source-state"><span className={"status-badge "+(s.health==="healthy"?"status-published":"status-pending_review")}>{s.health}</span><span className={"source-approval "+(s.qualified?"is-approved":"")}>{s.qualified?"Qualified to cite":"Needs a fresh check"}</span><small title={date(s.checked_at)}>{s.checked_at?"Checked "+shortDate(s.checked_at):"Not checked yet"}{s.http_status?" · "+s.http_status:""}</small></div>
      <div className="source-quality"><span className="source-mobile-label">Quality</span><strong>{s.score}<small>/100</small></strong><span className="source-score-track" aria-hidden="true"><i style={{width:Math.min(100,Math.max(0,s.score))+"%"}}/></span></div>
      <div className="source-usage"><span className="source-mobile-label">Articles</span><strong>{s.usage}</strong></div>
      <div className="source-actions"><button disabled={busy} className="secondary" onClick={()=>act(async()=>{await api("links/check","POST",{url:s.url});})}>Check live URL</button></div>
     </div>
     <details className="source-details"><summary>Details & citations</summary><div className="source-detail-grid"><div><h4>Quality assessment</h4><p>{s.reason||"No assessment recorded yet."}</p><dl className="source-facts"><div><dt>Last live check</dt><dd>{date(s.checked_at)}{s.http_status?" · HTTP "+s.http_status:""}</dd></div><div><dt>Research copy expires</dt><dd>{date(s.cache_expires_at)}</dd></div></dl></div><div><h4>Articles citing this source</h4>{s.articles.length?<ul>{s.articles.map(p=><li key={p.id}><span>{p.title}</span><small>{p.language.toUpperCase()} · {p.status.replaceAll("_"," ")}</small></li>)}</ul>:<p>No saved articles cite this source yet.</p>}</div></div></details>
    </article>)}</div>{!visible.length&&<p className="dashboard-empty">No sources match this filter.</p>}
   </>:<div className="source-history"><div className="source-history-intro"><h3>Consultation history</h3><p>Latest 100 checks, research consultations and qualification results. Research copies last 24 hours; manual health checks always fetch the live page.</p></div>{history.length?<><div className="source-history-head" aria-hidden="true"><span>Activity</span><span>Source & result</span><span>When</span></div>{history.map(h=><article key={h.id}><span className="status-badge">{h.action.replaceAll("_"," ")}</span><div><p>{h.detail.url||"Source library"}</p>{h.detail.health&&<small>{h.detail.health} · Quality {h.detail.score}/100</small>}</div><time dateTime={h.created_at}>{date(h.created_at)}</time></article>)}</>:<p className="dashboard-empty">No source activity recorded yet.</p>}</div>}
   </div>
   <p className="source-footnote">Sources qualify automatically from the authority catalog, quality score and a healthy check within 7 days. No manual approval is needed.</p>
  </div>
 </section>;
}
