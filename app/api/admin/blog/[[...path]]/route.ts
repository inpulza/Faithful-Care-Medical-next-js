import { NextRequest,NextResponse } from "next/server";
import { COOKIE,cookieOptions,assertOrigin,login,logout,session } from "../../../../../server/blog/auth";
import { BlogError } from "../../../../../server/blog/types";
import { createPost,editPost,getPost,listPosts,transition } from "../../../../../server/blog/posts";
import { verify } from "../../../../../server/blog/quality";
import { ZodError } from "zod";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=300;
const headers={"Cache-Control":"no-store","X-Robots-Tag":"noindex, nofollow, noarchive"};
type Context={params:Promise<{path?:string[]}>};
const json=(value:unknown,status=200)=>NextResponse.json(value,{status,headers});
async function handle(request:NextRequest,context:Context) {
 try {
  const path=(await context.params).path||[];
  const token=request.cookies.get(COOKIE)?.value;
  let body:Record<string,any>={};
  if(request.method!=="GET"){
   assertOrigin(request);
   if(!request.headers.get("content-type")?.startsWith("application/json")) throw new BlogError(415,"JSON is required.");
   const reader=request.body?.getReader();const chunks:Uint8Array[]=[];let length=0;
   if(reader){while(true){const part=await reader.read();if(part.done)break;length+=part.value.length;if(length>200000){await reader.cancel();throw new BlogError(413,"Request is too large.");}chunks.push(part.value);}}
   try{body=JSON.parse(Buffer.concat(chunks).toString("utf8"));}catch{throw new BlogError(400,"Invalid JSON.");}
   if(!body||typeof body!=="object"||Array.isArray(body))throw new BlogError(400,"Invalid request.");
  }
  if(path.join("/")==="login"&&request.method==="POST"){
   if(typeof body.username!=="string"||typeof body.password!=="string"||body.username.length>150||body.password.length>1024)throw new BlogError(400,"Invalid credentials.");
   // Vercel sets x-vercel-forwarded-for; never trust arbitrary X-Forwarded-For as the only limit.
   const ip=process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")||"unknown" : "local";
   const value=await login(body.username,body.password,ip);
   const response=json({ok:true});response.cookies.set(COOKIE,value,cookieOptions);return response;
  }
  const editor=await session(token);
  if(!editor)throw new BlogError(401,"Editorial login required.");
  if(path.join("/")==="session"&&request.method==="GET")return json({username:editor.username});
  if(path.join("/")==="logout"&&request.method==="POST"){
    await logout(token);const response=json({ok:true});response.cookies.set(COOKIE,"",{...cookieOptions,maxAge:0});return response;
  }
  if(path[0]==="topics"&&request.method==="GET"){const m=await import("../../../../../server/blog/generation");return json({topics:await m.topicPlan(request.nextUrl.searchParams.get("language")==="es"?"es":"en")});}
  if(path[0]==="jobs"&&request.method==="GET"){const m=await import("../../../../../server/blog/jobs");return json({jobs:await m.jobHistory()});}
  if(path[0]==="generate"&&request.method==="POST"){if(!["en","es"].includes(body.language))throw new BlogError(400,"Choose a language.");const m=await import("../../../../../server/blog/generation");return json({post:await m.generateDraft(String(body.topicId||""),body.language,String(body.requestId||""),editor.username)},201);}
  if(path[0]==="links"){
    const links=await import("../../../../../server/blog/links");
    if(path.length===1&&request.method==="GET")return json({links:await links.linkLibrary()});
    if(path[1]==="check"&&request.method==="POST")return json(await links.auditSource(String(body.url||""),editor.username));
    if(path[1]==="approve"&&request.method==="POST"&&typeof body.approved==="boolean")return json({link:await links.approveSource(String(body.url||""),body.approved,editor.username)});
  }
  if(path[0]==="posts"){
   if(path.length===1&&request.method==="GET")return json({posts:await listPosts(undefined,true)});
   if(path.length===1&&request.method==="POST")return json({post:await createPost(body,editor.username)},201);
   if(path.length===3&&path[2]==="translate"&&request.method==="POST"){const m=await import("../../../../../server/blog/translation");return json({post:await m.translatePost(path[1],String(body.requestId||""),editor.username)},201);}
   if(path.length===2&&request.method==="GET")return json({post:await getPost(path[1])});
   if(path.length===2&&request.method==="PUT")return json({post:await editPost(path[1],body,Number(body.version),editor.username)});
   if(path.length===3&&path[2]==="verify"&&request.method==="POST")return json(await verify(await getPost(path[1])));
   if(path.length===3&&path[2]==="status"&&request.method==="POST"){
    if(!["draft","pending_review","published","rejected"].includes(body.status))throw new BlogError(400,"Invalid status.");
    return json({post:await transition(path[1],body.status,Number(body.version),editor.username,String(body.reviewer||"").slice(0,150))});
   }
  }
  throw new BlogError(404,"Editorial endpoint not found.");
 }catch(error){
  if(error instanceof BlogError)return json({error:error.message},error.status);
  if(error instanceof ZodError)return json({error:"Please check the article fields.",fields:error.flatten()},400);
  if((error as {code?:string})?.code==="23505")return json({error:"That slug or translation already exists."},409);
  console.error("Blog request failed",error instanceof Error?error.name:"unknown");
  return json({error:"The editorial service is unavailable. Try again later."},503);
 }
}
export const GET=handle;export const POST=handle;export const PUT=handle;
