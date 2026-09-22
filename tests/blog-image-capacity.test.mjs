import assert from "node:assert/strict";
import {test,before,after} from "node:test";
import fs from "node:fs/promises";
import {randomUUID} from "node:crypto";
import {PGlite} from "@electric-sql/pglite";
process.env.NODE_ENV="test";
const {setTestDatabase,query}=await import("../server/blog/db.ts");
const {createPost,editPost,getPost}=await import("../server/blog/posts.ts");
const {selectImage}=await import("../server/blog/media.ts");
const {translatePost}=await import("../server/blog/translation.ts");
const {blankData}=await import("../server/blog/types.ts");
let db;
before(async()=>{db=new PGlite();for(const n of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile(new URL("../migrations/blog/"+n,import.meta.url),"utf8"));setTestDatabase(db);process.env.BLOB_PUBLIC_HOSTNAME="client.public.blob.vercel-storage.com";});
after(async()=>{setTestDatabase();await db.close();});
const article=slug=>({language:"en",title:"Preparing useful questions for your visit",slug,content:"<h2>Prepare for care</h2><p>"+"Prepare useful questions for your next visit. ".repeat(25)+"</p>",data:{...blankData}});
async function candidate(id,placement){return (await query("INSERT INTO fc_blog_media(post_id,url,role,alt,placement,source) VALUES($1,$2,'inline','A calm care setting',$3,'upload') RETURNING *",[id,"https://client.public.blob.vercel-storage.com/faithful-care/blog/"+randomUUID()+".webp",placement]))[0];}

test("five inline selections remain editable; a sixth is rejected but replacement works",async()=>{
 let post=await createPost(article("five-image-capacity"),"tester");
 for(let i=1;i<=5;i++){const media=await candidate(post.id,i);post=await selectImage(post.id,media.id,post.version,"tester",media.alt);}
 const sixth=await candidate(post.id,6);
 await assert.rejects(()=>selectImage(post.id,sixth.id,post.version,"tester",sixth.alt),e=>e.status===422);
 assert.equal((await getPost(post.id)).version,post.version);
 post=await editPost(post.id,{...post,title:"Updated questions for the next visit"},post.version,"tester");
 const replacement=await candidate(post.id,3);post=await selectImage(post.id,replacement.id,post.version,"tester",replacement.alt);
 assert.equal(post.data.images.length,5);assert.equal(post.data.images.find(i=>i.afterHeading===3).url,replacement.url);
});

test("translation provider accepts and preserves alternative text for five inline images",async()=>{
 let post=await createPost(article("five-image-translation"),"tester");
 for(let i=1;i<=5;i++){const media=await candidate(post.id,i);post=await selectImage(post.id,media.id,post.version,"tester",media.alt);}
 Object.assign(process.env,{BLOG_AI_ENABLED:"true",OPENAI_API_KEY:"unit-only"});
 const previous=globalThis.fetch;let providerCalls=0;
 globalThis.fetch=async(url,options)=>{
  assert.equal(url,"https://api.openai.com/v1/chat/completions");providerCalls++;
  const request=JSON.parse(options.body);assert.equal(request.response_format.json_schema.schema.properties.imageAlts.maxItems,5);
  return Response.json({choices:[{finish_reason:"stop",message:{content:JSON.stringify({title:"Preguntas para preparar tu próxima visita",slug:"cinco-imagenes-traduccion",excerpt:"Prepara preguntas para tu próxima visita médica.",content:post.content,metaTitle:"Prepara tu próxima visita",metaDescription:"Prepara preguntas útiles para conversar con tu equipo médico durante tu próxima visita y comprender tus necesidades.",tags:["visitas","preguntas"],heroAlt:"",imageAlts:Array.from({length:5},(_,i)=>"Un espacio tranquilo de atención número "+i)})}}]});
 };
 try{const translated=await translatePost(post.id,randomUUID(),"tester");assert.equal(translated.data.images.length,5);assert.equal(translated.data.images[4].alt,"Un espacio tranquilo de atención número 4");assert.equal(providerCalls,1);}finally{globalThis.fetch=previous;}
});
