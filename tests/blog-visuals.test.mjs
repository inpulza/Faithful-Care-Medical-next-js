import assert from "node:assert/strict";import {test} from "node:test";
import {sections,validateVisuals} from "../server/blog/visuals.ts";
const post={content:"<h2>Prepare</h2><p>Discuss your questions.</p><h2>Follow up</h2><p>Plan the next conversation.</p>"};
const image=(role,afterHeading)=>({role,afterHeading,prompt:"A calm editorial still life with a closed notebook and a glass of water in natural window light.",alt:"A closed notebook and glass of water beside a window"});
test("visual planner extracts real section positions and rejects invented placements",()=>{
 assert.deepEqual(sections(post.content).map(s=>s.number),[1,2]);assert.equal(sections(post.content)[1].heading,"Follow up");
 assert.equal(validateVisuals({images:[image("hero",0),image("inline",1),image("inline",2)]},post).length,3);
 for(const images of [[image("hero",0),image("inline",1),image("inline",3)],[image("hero",0),image("inline",1),image("inline",1)],[image("hero",0),image("hero",0),image("inline",1)]])assert.throws(()=>validateVisuals({images},post),e=>e.status===422);
});

test("planner and final image provider both receive the Florida and human editorial policy even with conflicting context",async()=>{
 const {PGlite}=await import("@electric-sql/pglite");
 const fs=await import("node:fs/promises");
 const {randomUUID}=await import("node:crypto");
 const {setTestDatabase,query}=await import("../server/blog/db.ts");
 const {planVisuals}=await import("../server/blog/visuals.ts");
 const {generateImage}=await import("../server/blog/media.ts");
 const {imageScenePolicy,humanRealismRequirements}=await import("../server/blog/image-scene-policy.ts");
 const names=["NODE_ENV","BLOG_AI_ENABLED","BLOG_IMAGES_ENABLED","OPENAI_API_KEY","BLOB_READ_WRITE_TOKEN","BLOB_PUBLIC_HOSTNAME"];
 const prior=Object.fromEntries(names.map(name=>[name,process.env[name]]));
 const oldFetch=globalThis.fetch;let db;
 const calls=[];
 try{
  Object.assign(process.env,{NODE_ENV:"test",BLOG_AI_ENABLED:"true",BLOG_IMAGES_ENABLED:"true",OPENAI_API_KEY:"test-only-key",BLOB_READ_WRITE_TOKEN:"test-only-blob",BLOB_PUBLIC_HOSTNAME:"client.public.blob.vercel-storage.com"});
  db=new PGlite();
  for(const name of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile(new URL("../migrations/blog/"+name,import.meta.url),"utf8"));
  setTestDatabase(db);
  const [draft]=await query("INSERT INTO fc_blog_posts(language,title,slug,content,data) VALUES('es',$1,'naples-policy-test',$2,'{}') RETURNING *",["Preparar una visita en Naples",post.content]);
  globalThis.fetch=async(url,options)=>{
   const body=JSON.parse(options.body);calls.push({url,body});
   if(url.endsWith("/chat/completions"))return Response.json({choices:[{finish_reason:"stop",message:{content:JSON.stringify({images:[image("hero",0),image("inline",1),image("inline",2)]})}}]});
   // Stop after observing the real outgoing request; never upload or call a live provider.
   return new Response(null,{status:502});
  };
  const planned=await planVisuals(draft);
  assert.equal(planned.length,3);
  for(const family of ["HUMAN SCENE:","ENVIRONMENT SCENE:","CONTEXTUAL DETAIL:"])assert.equal(planned.filter(p=>p.prompt.includes(family)).length,1);
  for(const context of [undefined,"Show Naples, Italy, Mount Vesuvius and a dramatic city skyline.",planned.find(p=>p.prompt.includes("HUMAN SCENE:")).prompt]){
   await assert.rejects(()=>generateImage(draft.id,randomUUID(),"hero","Closed notebook and water",0,"test-editor",context),e=>e.status===502);
  }
  assert.equal(calls.length,4);
  const planner=calls[0].body.messages.find(m=>m.role==="system").content;
  assert(planner.endsWith(imageScenePolicy));
  assert(planner.includes(humanRealismRequirements));
  for(const {url,body} of calls.slice(1)){
   assert.equal(url,"https://api.openai.com/v1/images/generations");
   assert(body.prompt.endsWith(imageScenePolicy));
   assert(body.prompt.includes(humanRealismRequirements));
   assert(body.prompt.indexOf(humanRealismRequirements)>body.prompt.indexOf("Scene brief:"));
   assert.match(body.prompt,/Naples, Collier County, Southwest Florida, USA/);
   assert.match(body.prompt,/People are fictional adults only/);
   assert.match(body.prompt,/controlled fill and natural falloff/);
   assert.match(body.prompt,/natural skin texture/);
   assert(!body.prompt.includes("Compose a close interior still life"));
   assert.match(body.prompt,/not a photograph of the actual Faithful Care clinic/);
   assert.equal(body.n,1);
   assert.equal(body.image,undefined);
  }
  assert.match(calls[3].body.prompt,/HUMAN SCENE:/);
  const assignments=JSON.parse(calls[0].body.messages[1].content).sceneAssignments;
  assert.deepEqual(new Set(assignments.map(s=>s.family)),new Set(["people","environment","detail"]));
  assert(calls[2].body.prompt.indexOf(imageScenePolicy)>calls[2].body.prompt.indexOf("Show Naples, Italy"));
 }finally{
  globalThis.fetch=oldFetch;setTestDatabase();if(db)await db.close();
  for(const name of names){if(prior[name]===undefined)delete process.env[name];else process.env[name]=prior[name];}
 }
});


test("scene assignment mixes all three families and rotates hero treatments across article topics",async()=>{
 const {articleSceneMix}=await import("../server/blog/image-scene-policy.ts");
 const heroFamilies=new Set(),casting=new Set();
 for(let i=0;i<30;i++){
  const seed="Preparing a care discussion "+i,mix=articleSceneMix(seed);
  assert.deepEqual(mix,articleSceneMix(seed));
  assert.deepEqual(new Set(mix.map(s=>s.family)),new Set(["people","environment","detail"]));
  heroFamilies.add(mix[0].family);casting.add(mix.find(s=>s.family==="people").direction);
 }
 assert.equal(heroFamilies.size,3);assert(casting.size>=4);
});

test("human scene assignments specify a consistent light setup and concrete attention targets",async()=>{
 const {articleSceneMix}=await import("../server/blog/image-scene-policy.ts");
 const cases=new Set();
 for(let i=0;i<100;i++){
  const mix=articleSceneMix("Natural care scene "+i);
  const direction=mix.find(s=>s.family==="people").direction;
  assert.doesNotMatch(mix.find(s=>s.family==="environment").direction,/\b(?:cheek|eye detail|hair|shoulder|nose shadow|subjects)\b/);
  assert.match(direction,/camera-left/);assert.match(direction,/pupils|both eyes/);
  if(direction.includes("two fictional adults")){
   assert.match(direction,/camera-right/);
   if(direction.includes("looks back")){cases.add("mutual");assert.match(direction,/speaker's eyes/);}
   else {cases.add("shared");assert.match(direction,/same visible point/);assert.match(direction,/older adult on camera-right speaks/);assert.match(direction,/younger adult on camera-left listens/);}
  }else{cases.add("solo");assert.match(direction,/same concrete target/);assert.match(direction,/section-specific action/);assert.match(direction,/Keep exactly one person/);}
 }
 assert.deepEqual(cases,new Set(["mutual","shared","solo"]));
});
