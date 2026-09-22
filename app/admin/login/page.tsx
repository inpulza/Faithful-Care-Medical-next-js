"use client";
import {useState,type FormEvent} from "react";
import {useRouter} from "next/navigation";
export default function Login(){
 const [error,setError]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);
 try{const r=await fetch("/api/admin/blog/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:f.get("username"),password:f.get("password")})});const d=await r.json();if(!r.ok)throw Error(d.error);router.replace("/admin/blog");}catch(e){setError(e instanceof Error?e.message:"Unable to sign in.");}finally{setBusy(false);}}
 return <main className="editor-login"><div className="editor-login-brand"><a href="/">FAITHFUL CARE</a><p>Medical Services</p></div><form onSubmit={submit} className="editor-login-form"><p className="blog-eyebrow">EDITORIAL STUDIO</p><h1>Good care starts<br/>with clear information.</h1><p>Sign in to prepare, review and publish patient education.</p><label>Username<input name="username" autoComplete="username" required maxLength={150}/></label><label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={1024}/></label>{error&&<p role="alert">{error}</p>}<button disabled={busy}>{busy?"Signing in…":"Sign in"}</button><small>Private editorial workspace · Authorized access only</small></form></main>;
}
