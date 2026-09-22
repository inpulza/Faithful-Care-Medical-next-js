"use client";
import {articleWordCount} from "../../../shared/blog-text";
import {useEffect,useState,useRef} from "react";
import type {Post,Status} from "../../../server/blog/types";
import ArticleText from "./article-text";
import ArticlePreview from "./article-preview";
import MediaPanel from "./media-panel";
import AutoGenerator from "./auto-generator";
import Sources from "./sources";
import Dashboard from "./dashboard";
import {blankData} from "../../../server/blog/types";
type Draft=Pick<Post,"title"|"slug"|"language"|"content"|"data"> & Partial<Post>;
type View="preview"|"text"|"images"|"search";
const fresh=():Draft=>({title:"",slug:"",language:"en",content:"",data:{...blankData}});
export default function Editor({username}:{username:string}){
 const [posts,setPosts]=useState<Post[]>([]),[draft,setDraft]=useState<Draft>(fresh),[message,setMessage]=useState(""),[busy,setBusy]=useState(false);
 const [generating,setGenerating]=useState(false),[editing,setEditing]=useState(false),[view,setView]=useState<View>("preview"),[dirty,setDirty]=useState(false);
 const autoDialog=useRef<HTMLDialogElement>(null),unsaved=useRef(false),leaving=useRef(false);
 unsaved.current=dirty;
 useEffect(()=>{const warn=(event:BeforeUnloadEvent)=>{if(unsaved.current&&!leaving.current){event.preventDefault();event.returnValue="";}};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[]);
 function mayLeave(){return !unsaved.current||window.confirm("You have unsaved changes. Leave without saving?");}
 async function api(path:string,method="GET",body?:unknown){const r=await fetch("/api/admin/blog/"+path,{method,headers:body?{"Content-Type":"application/json"}:undefined,body:body?JSON.stringify(body):undefined});const d=await r.json();if(r.status===401){window.location.href="/admin/login";throw Error("Sign in again.");}if(!r.ok)throw Error(d.error||"Request failed.");return d;}
 async function refresh(){setPosts((await api("posts")).posts);}
 useEffect(()=>{refresh().catch(e=>setMessage(e.message));},[]);
 function choose(p:Draft,next:View=p.id?"preview":"text"){setEditing(true);setDirty(false);setDraft(p);setView(next);setMessage("");window.scrollTo(0,0);}
 function field(key:string,value:unknown){setDirty(true);setDraft(p=>({...p,[key]:value}));}
 function data(key:string,value:unknown){setDirty(true);setDraft(p=>({...p,data:{...p.data,[key]:value}}));}
 async function run(action:()=>Promise<void>){setBusy(true);setMessage("");try{await action();}catch(e){setMessage(e instanceof Error?e.message:"Request failed.");}finally{setBusy(false);}}
 async function save(){const d=await api(draft.id?"posts/"+draft.id:"posts",draft.id?"PUT":"POST",draft);choose(d.post,view);setMessage("Draft saved. It remains private.");await refresh();}
 async function state(post:Post,status:Status){await api("posts/"+post.id+"/status","POST",{status,version:post.version});await refresh();}
 const locked=draft.status==="published",words=articleWordCount(draft.content);
 const links=[...new Set([...draft.content.matchAll(/href="([^"]+)"/g)].map(m=>m[1]))];
 const siblings=posts.filter(p=>p.id!==draft.id&&p.translation_group===draft.translation_group);
 return <div className="editor"><header className="editor-header"><a href="/" onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;if(!mayLeave())e.preventDefault();else leaving.current=true;}}>Faithful Care <span>Editorial studio</span></a><div><span>{username}</span><button className="secondary" disabled={busy} onClick={()=>{if(!mayLeave())return;void run(async()=>{await api("logout","POST",{});leaving.current=true;window.location.href="/admin/login";});}}>Sign out</button></div></header>
 <dialog ref={autoDialog} className="editor-dialog" aria-label="Automatic article preparation"><div className="dialog-toolbar"><span>Faithful Care · AI editorial workflow</span><button className="secondary" onClick={()=>autoDialog.current?.close()}>Close generator</button></div><AutoGenerator api={api} dirty={dirty} onActive={setGenerating} onDraft={p=>{choose(p);autoDialog.current?.close();refresh().catch(e=>setMessage(e.message));}}/></dialog>
 {!editing?<main className="blog-dashboard"><Dashboard posts={posts} generating={generating} onGenerate={()=>autoDialog.current?.showModal()} onNew={()=>choose(fresh())} onSelect={p=>choose(p)} onEdit={p=>choose(p,"text")} onState={state} api={api}/>{message&&<p role="status" className="editor-message">{message}</p>}<Sources api={api}/></main>:<main className="article-workspace">
 <div className="workspace-toolbar"><button className="secondary" disabled={dirty||busy} onClick={()=>{setEditing(false);setMessage("");refresh().catch(e=>setMessage(e.message));}}>Back to dashboard</button><div className="editor-actions">{siblings.map(p=><button key={p.id} className="secondary" disabled={dirty||busy} onClick={()=>choose(p)}>Open {p.language==="es"?"Spanish":"English"}</button>)}{!locked&&<button disabled={busy||generating||!dirty} onClick={()=>run(save)}>Save draft</button>}</div></div>
 <div className="editor-title"><div><p className="blog-eyebrow">{draft.language==="es"?"ESPAÑOL":"ENGLISH"} · ARTICLE WORKSPACE</p><h1>{draft.title||"A new patient resource"}</h1></div><span className={"status-badge status-"+(draft.status||"draft")}>{(draft.status||"draft").replaceAll("_"," ")}</span></div>
 <div className="article-summary"><span>{words.toLocaleString()} words</span><span>{Math.max(1,Math.ceil(words/200))} min read</span><span>{links.filter(l=>l.startsWith("/")).length} internal links</span><span>{draft.data.sources.length} sources</span></div>
 {dirty&&<div className="editor-message"><span>Unsaved changes. Save to update the preview.</span><button className="secondary" disabled={busy} onClick={()=>{const saved=posts.find(p=>p.id===draft.id);choose(saved||fresh(),view);}}>Discard changes</button></div>}
 {locked&&<p className="editor-message">This article is published. Return to the dashboard to unpublish it before editing.</p>}
 {message&&<p role="status" className="editor-message">{message}</p>}
 <nav className="workspace-tabs" aria-label="Article workspace">{([["preview","Preview"],["text","Edit text"],["images","Images"],["search","SEO & links"]] as const).map(([key,label])=><button key={key} className="secondary" aria-pressed={view===key} onClick={()=>setView(key)}>{label}</button>)}</nav>
 {view==="preview"&&(draft.id?<ArticlePreview key={draft.id+":"+draft.version} id={draft.id}/>:<p className="workspace-empty">Save your first draft to see the article preview.</p>)}
 {view==="text"&&<fieldset disabled={busy||generating||locked}><h2>Article text</h2><p className="workspace-help">Read the complete article in Preview. Make corrections here, then save.</p><label>Title<input value={draft.title} onChange={e=>field("title",e.target.value)}/></label><div className="editor-fields"><label>Language<select disabled={!!draft.id} value={draft.language} onChange={e=>field("language",e.target.value)}><option value="en">English</option><option value="es">Español</option></select></label><label>Category<select value={draft.data.category} onChange={e=>data("category",e.target.value)}>{["prevention","primary-care","chronic-care","senior-care","palliative-care","family-support"].map(c=><option key={c}>{c}</option>)}</select></label></div><label>Summary<textarea rows={3} value={draft.data.excerpt} onChange={e=>data("excerpt",e.target.value)}/></label>
 <ArticleText value={draft.content} onChange={html=>field("content",html)} disabled={busy||generating||locked}/><details><summary>Author and disclaimer</summary><label>Editorial author<input value={draft.data.author} onChange={e=>data("author",e.target.value)}/></label><label>Medical disclaimer<textarea value={draft.data.disclaimer} onChange={e=>data("disclaimer",e.target.value)}/></label></details>
 </fieldset>}
 {view==="images"&&(draft.id?<MediaPanel key={draft.id} postId={draft.id} version={draft.version!} disabled={busy||generating||dirty||locked} selected={draft.data} api={api} onChange={p=>{choose(p,"images");refresh().catch(e=>setMessage(e.message));}}/>:<p className="workspace-empty">Save the draft to add images.</p>)}
 {view==="search"&&<div className="workspace-search"><fieldset disabled={busy||generating||locked}><h2>Search appearance</h2><div className="search-snippet"><small>faithfulcaremedical.com{draft.language==="es"?"/es":""}/blog/{draft.slug}</small><h3>{draft.data.metaTitle||draft.title}</h3><p>{draft.data.metaDescription}</p></div><label>URL slug<input value={draft.slug} onChange={e=>field("slug",e.target.value)}/></label><label>SEO title · {draft.data.metaTitle.length}/60<input value={draft.data.metaTitle} onChange={e=>data("metaTitle",e.target.value)}/></label><label>SEO description · {draft.data.metaDescription.length}/160<textarea rows={3} value={draft.data.metaDescription} onChange={e=>data("metaDescription",e.target.value)}/></label><label>Tags (comma separated)<input value={draft.data.tags.join(", ")} onChange={e=>data("tags",e.target.value.split(",").map(s=>s.trim()).filter(Boolean))}/></label></fieldset>
 <section className="workspace-link-panel"><h2>Connected pages & sources</h2><p className="workspace-help">Sources are checked and qualified automatically. Full check history lives in the dashboard library.</p>{[["Within this website",links.filter(l=>l.startsWith("/"))],["Medical sources",[...new Set([...draft.data.sources,...links.filter(l=>l.startsWith("https://"))])]]] .map(([label,urls])=><div key={label as string}><h3>{label as string}</h3><ul>{(urls as string[]).map(url=><li key={url}><a href={url} target="_blank" rel="noreferrer">{url} ↗</a></li>)}</ul>{!(urls as string[]).length&&<p>None added yet.</p>}</div>)}<details><summary>Edit source references</summary><fieldset disabled={busy||generating||locked}><label>Medical sources (one URL per line)<textarea value={draft.data.sources.join("\n")} onChange={e=>data("sources",e.target.value.split("\n").filter(Boolean))}/></label></fieldset></details></section></div>}
 {draft.id&&!siblings.length&&<div className="translation-action"><span>Prepare the other language as a separate draft.</span><button className="secondary" disabled={busy||generating||dirty} onClick={()=>run(async()=>{const d=await api("posts/"+draft.id+"/translate","POST",{requestId:crypto.randomUUID()});choose(d.post);setMessage("Translation saved as a private draft.");await refresh();})}>Translate to {draft.language==="en"?"Spanish":"English"}</button></div>}
 </main>}</div>;
}
