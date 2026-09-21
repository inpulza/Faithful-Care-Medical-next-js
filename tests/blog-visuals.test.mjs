import assert from "node:assert/strict";import {test} from "node:test";
import {sections,validateVisuals} from "../server/blog/visuals.ts";
const post={content:"<h2>Prepare</h2><p>Discuss your questions.</p><h2>Follow up</h2><p>Plan the next conversation.</p>"};
const image=(role,afterHeading)=>({role,afterHeading,prompt:"A calm editorial still life with a closed notebook and a glass of water in natural window light.",alt:"A closed notebook and glass of water beside a window"});
test("visual planner extracts real section positions and rejects invented placements",()=>{
 assert.deepEqual(sections(post.content).map(s=>s.number),[1,2]);assert.equal(sections(post.content)[1].heading,"Follow up");
 assert.equal(validateVisuals({images:[image("hero",0),image("inline",1),image("inline",2)]},post).length,3);
 for(const images of [[image("hero",0),image("inline",1),image("inline",3)],[image("hero",0),image("inline",1),image("inline",1)],[image("hero",0),image("hero",0),image("inline",1)]])assert.throws(()=>validateVisuals({images},post),e=>e.status===422);
});
