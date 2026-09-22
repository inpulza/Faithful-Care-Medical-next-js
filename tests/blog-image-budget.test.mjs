import assert from "node:assert/strict";
import {test,before,after,beforeEach} from "node:test";
import fs from "node:fs/promises";
import {randomUUID,createHash} from "node:crypto";
import {PGlite} from "@electric-sql/pglite";
process.env.NODE_ENV="test";
const {setTestDatabase,query}=await import("../server/blog/db.ts");
const {reserveImageBudget,consumeImageBudget}=await import("../server/blog/image-budget.ts");
const {startAuto,advanceAuto,cancelAuto}=await import("../server/blog/auto.ts");
const budgetKey=createHash("sha256").update("image-generation-global").digest("hex");
const keys=()=>Array.from({length:3},()=>randomUUID());
const input=()=>({requestId:randomUUID(),language:"en",translate:true,focus:""});
let db;
before(async()=>{db=new PGlite();for(const n of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort())await db.exec(await fs.readFile(new URL("../migrations/blog/"+n,import.meta.url),"utf8"));setTestDatabase(db);});
after(async()=>{setTestDatabase();await db.close();});
beforeEach(async()=>{await query("DELETE FROM fc_blog_limits");await query("DELETE FROM fc_blog_auto_runs");Object.assign(process.env,{BLOG_AI_ENABLED:"true",BLOG_IMAGES_ENABLED:"true",OPENAI_API_KEY:"unit-only",BLOB_READ_WRITE_TOKEN:"unit-only",BLOB_PUBLIC_HOSTNAME:"client.public.blob.vercel-storage.com"});});

test("one manual image prevents a whole automatic run before any provider step",async()=>{
 await consumeImageBudget(randomUUID());
 await assert.rejects(()=>startAuto(input(),"tester"),e=>e.status===429);
 const [run]=await query("SELECT * FROM fc_blog_auto_runs");assert.equal(run.status,"failed");assert.equal(run.cursor,0);assert.equal(run.lease_token,null);
 let calls=0;await advanceAuto(run.id,0,{ideate:async()=>{calls++;}});assert.equal(calls,0);
 assert.equal((await query("SELECT attempts FROM fc_blog_limits WHERE key=$1",[budgetKey]))[0].attempts,1);
});

test("reserved automatic images consume once without being charged twice",async()=>{
 const run=await startAuto(input(),"tester");assert.equal(run.lease_token,null);
 const ids=[run.state.keys.hero,run.state.keys.inline_1,run.state.keys.inline_2];
 await Promise.all(ids.map(consumeImageBudget));
 assert.equal((await query("SELECT attempts FROM fc_blog_limits WHERE key=$1",[budgetKey]))[0].attempts,3);
 await assert.rejects(()=>consumeImageBudget(ids[0]),e=>e.status===409);
 await assert.rejects(()=>consumeImageBudget(randomUUID()),e=>e.status===429);
});

test("competing runs reserve only one complete image set",async()=>{
 const a=keys(),b=keys();const results=await Promise.allSettled([reserveImageBudget(a),reserveImageBudget(b)]);
 assert.equal(results.filter(r=>r.status==="fulfilled").length,1);
 assert.equal(results.find(r=>r.status==="rejected").reason.status,429);
 assert.equal((await query("SELECT key FROM fc_blog_limits WHERE key<>$1",[budgetKey])).length,3);
});

test("manual generation racing auto reservation cannot oversubscribe the bucket",async()=>{
 const ids=keys();const results=await Promise.allSettled([consumeImageBudget(randomUUID()),reserveImageBudget(ids)]);
 assert.equal(results.filter(r=>r.status==="fulfilled").length,1);
 const reservations=await query("SELECT key FROM fc_blog_limits WHERE key<>$1",[budgetKey]);
 assert([0,3].includes(reservations.length));
 if(reservations.length)await Promise.all(ids.map(consumeImageBudget));
});

test("a second run is rejected before text; expired hourly buckets reopen safely",async()=>{
 const first=await startAuto(input(),"tester");await cancelAuto(first.id);
 await assert.rejects(()=>startAuto(input(),"tester"),e=>e.status===429);
 await query("UPDATE fc_blog_limits SET expires_at=now()-interval '1 second' WHERE key=$1",[budgetKey]);
 // Clear only the separate test auto-start throttle to isolate image admission.
 const autoKey=createHash("sha256").update("auto-generation-global").digest("hex");await query("DELETE FROM fc_blog_limits WHERE key=$1",[autoKey]);
 const next=await startAuto(input(),"tester");assert.equal(next.status,"running");
 assert.equal((await query("SELECT attempts FROM fc_blog_limits WHERE key=$1",[budgetKey]))[0].attempts,3);
});

test("concurrent duplicate starts share the same reservation",async()=>{
 const request=input();const runs=await Promise.all([startAuto(request,"tester"),startAuto(request,"tester")]);
 assert.equal(runs[0].id,runs[1].id);
 assert.equal((await query("SELECT key FROM fc_blog_limits WHERE key<>$1 AND attempts=0",[budgetKey])).length,3);
 const ids=[runs[0].state.keys.hero,runs[0].state.keys.inline_1,runs[0].state.keys.inline_2];
 const attempts=await Promise.allSettled([consumeImageBudget(ids[0]),consumeImageBudget(ids[0])]);
 assert.equal(attempts.filter(r=>r.status==="fulfilled").length,1);
});

test("interrupted admission never executes a provider after its lease expires",async()=>{
 const run=await startAuto(input(),"tester");
 await query("UPDATE fc_blog_auto_runs SET state=state-'imageBudgetReserved',lease_token=$2,lease_until=now()-interval '1 second' WHERE id=$1",[run.id,randomUUID()]);
 let calls=0;const result=await advanceAuto(run.id,0,{ideate:async()=>{calls++;}});
 assert.equal(result.status,"failed");assert.equal(calls,0);
});

test("a running record without confirmed admission fails closed even without a lease",async()=>{
 const run=await startAuto(input(),"tester");
 await query("UPDATE fc_blog_auto_runs SET state=state-'imageBudgetReserved' WHERE id=$1",[run.id]);
 let calls=0;const result=await advanceAuto(run.id,0,{ideate:async()=>{calls++;}});
 assert.equal(result.status,"failed");assert.equal(calls,0);
});
