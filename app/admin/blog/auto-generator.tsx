"use client";
import {useEffect,useRef,useState} from "react";
import {AUTO_STEPS,type AutoView,type AutoStep} from "../../../shared/blog-auto";
type Props={api:(path:string,method?:string,body?:unknown)=>Promise<any>;onDraft:(post:any)=>void;onActive:(active:boolean)=>void;dirty:boolean};
export default function AutoGenerator({api,onDraft,onActive,dirty}:Props){
 const [config,setConfig]=useState<{ready:boolean;missing:string[]}|null>(null),[run,setRun]=useState<AutoView|null>(null);
 const [language,setLanguage]=useState("en"),[translate,setTranslate]=useState(true),[focus,setFocus]=useState(""),[message,setMessage]=useState(""),[starting,setStarting]=useState(false);
 const apiRef=useRef(api),activeRef=useRef(onActive);apiRef.current=api;activeRef.current=onActive;
 function acceptRun(next:AutoView|null){
  setRun(next);
  if(next&&next.status!=="running"&&next.requestId===sessionStorage.getItem("faithful-auto-request"))sessionStorage.removeItem("faithful-auto-request");
 }
 useEffect(()=>{
  if(run&&run.status!=="running"&&run.requestId===sessionStorage.getItem("faithful-auto-request"))sessionStorage.removeItem("faithful-auto-request");
 },[run?.requestId,run?.status]);
 const active=run?.status==="running";
 useEffect(()=>{let live=true;Promise.all([apiRef.current("auto/config"),apiRef.current("auto/current")]).then(([c,r])=>{if(live){setConfig(c);acceptRun(r.run);}}).catch(e=>{if(live)setMessage(e.message);});return()=>{live=false;};},[]);
 useEffect(()=>{activeRef.current(active||starting);return()=>activeRef.current(false);},[active,starting]);
 useEffect(()=>{
  if(!run||run.status!=="running")return;
  const stream=new EventSource("/api/admin/blog/auto/"+run.id+"/events");
  stream.onmessage=event=>{try{const data=JSON.parse(event.data);if(data.run)setRun(data.run);if(data.authExpired){stream.close();window.location.href="/admin/login";}}catch{}};
  return()=>stream.close();
 },[run?.id,run?.status]);
 useEffect(()=>{
  if(!run||run.status!=="running"||!config?.ready)return;
  let stopped=false;
  const id=run.id;
  async function drive(){
   try{
    while(!stopped){
     const current:AutoView=(await apiRef.current("auto/"+id)).run;if(stopped)break;setRun(current);
     if(current.status!=="running")break;
     if(current.busy){await new Promise(r=>setTimeout(r,1800));continue;}
     const next:AutoView=(await apiRef.current("auto/"+id+"/advance","POST",{cursor:current.cursor})).run;
     if(stopped)break;setRun(next);if(next.status!=="running")break;
    }
   }catch(e){if(!stopped)setMessage((e instanceof Error?e.message:"Connection interrupted.")+" Your saved progress is retained. Reload to reconnect.");}
  }
  void drive();return()=>{stopped=true;};
 },[run?.id,run?.status,config?.ready]);
 async function start(){
  setStarting(true);setMessage("");setRun(null);
  const stored=sessionStorage.getItem("faithful-auto-request");
  const key=stored||crypto.randomUUID();sessionStorage.setItem("faithful-auto-request",key);
  try{const result=await api("auto/start","POST",{requestId:key,language,translate,focus});setRun(result.run);sessionStorage.removeItem("faithful-auto-request");}
  catch(e){
   const failure=e instanceof Error?e.message:"Could not start.";
   try{
    const latest:AutoView|null=(await api("auto/current")).run;
    if(latest&&latest.requestId===key){
     acceptRun(latest);
     setMessage(latest.status==="running"?"Reconnected to saved generation progress.":latest.status==="completed"||latest.status==="cancelled"||latest.error?"":failure);
    }else setMessage(failure);
   }catch{setMessage(failure+" The connection could not be confirmed. Retry to reconnect to the same request.");}
  }
  finally{setStarting(false);}
 }
 async function open(id:string){try{onDraft((await api("posts/"+id)).post);}catch(e){setMessage(e instanceof Error?e.message:"Could not open the draft.");}}
 const steps:AutoStep[]=run?.steps||AUTO_STEPS.map(([id,label])=>({id,label,status:"pending" as const}));
 return <section className="auto-generator" aria-labelledby="auto-title">
  <div className="auto-heading"><div><p className="blog-eyebrow">AI EDITORIAL WORKFLOW</p><h3 id="auto-title">From a useful topic to a complete draft</h3></div><span className="blog-pill">English + Español</span></div>
  <p>Auto Generate researches a topic, writes the article and SEO fields, prepares contextual images and alternative text, and creates the second language. You review the result before publication.</p>
  {!config&&<p role="status">Checking the AI connection…</p>}
  {config&&!config.ready&&<p className="auto-notice" role="status"><strong>AI setup is incomplete.</strong> Not connected: {config.missing.join(", ")}. The workflow is visible below, but generation cannot start until the connection is ready.</p>}
  <div className="editor-fields"><label>Original article language<select disabled={active||starting} value={language} onChange={e=>setLanguage(e.target.value)}><option value="en">English</option><option value="es">Español</option></select></label><label>Editorial focus (optional)<input disabled={active||starting} value={focus} maxLength={300} onChange={e=>setFocus(e.target.value)} placeholder="Let AI choose, or suggest a general care topic"/></label></div>
  <label className="editor-check"><input type="checkbox" checked={translate} disabled={active||starting} onChange={e=>setTranslate(e.target.checked)}/>Also prepare the other language</label>
  {dirty&&<p>Save your current article changes before starting a new generation.</p>}
  <div className="editor-actions"><button disabled={!config?.ready||active||starting||dirty} onClick={start}>{starting?"Starting…":"Auto Generate"}</button>{active&&<button className="secondary" onClick={async()=>{try{setRun((await api("auto/"+run!.id+"/cancel","POST",{})).run);}catch(e){setMessage(e instanceof Error?e.message:"Could not stop.");}}}>Stop after current request</button>}</div>
  {message&&<p role="alert" className="auto-notice">{message}</p>}
  {active&&<p role="status">Preparing your draft. You can reload this page to reconnect to saved progress. If you close the editor, the current step may finish; reopen it to continue the remaining steps.</p>}
  {run?.error&&<p role="alert" className="auto-notice">{run.error}</p>}
  <ol className="auto-steps" aria-label="Article generation progress">{steps.map(step=><li key={step.id} data-status={step.status}><span className="auto-step-dot" aria-hidden="true">{step.status==="completed"?"✓":step.status==="failed"?"!":step.status==="running"?"●":"○"}</span><div><strong>{step.label}</strong><span className="auto-step-status">{step.status}</span>{step.detail&&<p>{step.detail}</p>}{"outputs" in step&&step.outputs&&<dl>{Object.entries(step.outputs).map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>}</div></li>)}</ol>
  {run?.status==="completed"&&<p className="auto-complete" role="status">Draft preparation finished. Review the sources, images and clinical content in each language. Nothing has been published.</p>}
  {(run?.postId||run?.translationId)&&<div className="editor-actions">{run.postId&&<button className="secondary" disabled={active} onClick={()=>open(run.postId!)}>Open {run.language==="en"?"English":"Spanish"} draft</button>}{run.translationId&&<button className="secondary" disabled={active} onClick={()=>open(run.translationId!)}>Open {run.language==="en"?"Spanish":"English"} draft</button>}</div>}
 </section>;
}
