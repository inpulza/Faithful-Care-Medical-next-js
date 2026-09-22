import {createHash} from "node:crypto";

// Shared by the planner and the final image request, including manual generations.
export const imageScenePolicy = "Faithful Care serves Naples, Collier County, Southwest Florida, USA. Naples always means Naples, Florida, never Naples, Italy or Napoli. Settings may include a modest contemporary interior, a studio-style room, or a shaded low-rise subtropical courtyard. Any exterior detail must be geographically generic and consistent with flat Southwest Florida. No recognizable landmarks, cityscapes, volcanoes, mountains or Italian scenery. This is a generic editorial illustration, not a photograph of the actual Faithful Care clinic or its staff. People are fictional adults only, never real patients, named clinicians or testimonials. No imitation of Dr. Addys Reve or other real people, medical procedures, visible medical records, readable text, logos or dramatic illness. Preserve ordinary individual faces, natural skin texture and coherent anatomy; no beauty-filter smoothing, waxy skin, cloned faces or mannequin expressions. These location, identity and realism requirements override any conflicting article title, section context or suggested image prompt.";

export const editorialPhotography = "Create exactly ONE standalone landscape photograph for an educational primary and palliative care blog. Use an honest, unposed editorial register with restrained navy, soft teal and warm neutral accents. COMPOSITION: medium or environmental framing with one full-frame 50mm lens, natural perspective, breathing room and coherent room details; important faces and hands remain inside the crop. LIGHTING: choose one causal scheme for the scene, specifying source, direction, softness and temperature. A studio scene uses a medium-soft key camera-left, negative fill camera-right with the shadow-side eye readable, a restrained rear accent following hair and shoulders, and separate background exposure. A window scene balances cool side daylight with a subtle warm practical lamp; a shaded outdoor scene uses open-sky light and plausible foliage bounce. Do not combine all schemes in one image. FINISH: believable skin-color variation and pores at photographic scale, individual facial anatomy, slight asymmetry, flyaway hair, fabric folds and contact shadows. Capture an attentive glance, a quiet smile or a mid-conversation gesture with off-camera gaze, as appropriate to the article. Preserve natural expression and readable faces rather than blurring faces to hide artifacts. Keep the setting minimal with two or three meaningful office or everyday elements and restrained fine grain. Create an entirely new image from text, never edit or reuse a previous generated image.";

export type EditorialScene={family:"people"|"environment"|"detail";direction:string};
export function articleSceneMix(seed:string):EditorialScene[]{
 const digest=createHash("sha256").update(seed).digest();
 const casts=[
  "one fictional adult in their late 60s, medium-brown skin, short grey curls, a broad build and expressive smile lines",
  "two fictional adults, one in their early 40s with deep-brown skin and natural coils, the other in their late 60s with light olive skin and silver hair; distinct faces, builds and attention",
  "one fictional adult in their mid 50s, warm olive skin, a stocky build, short salt-and-pepper hair and slight facial asymmetry",
  "one fictional adult in their early 40s, fair freckled skin, wavy dark hair and thin-frame glasses",
 ];
 const settings=["a modest contemporary room with upholstered chairs and matte oak furniture, lit by a side window and a warm practical lamp","a minimal studio-style room with a cream wall and one upholstered chair, shaped by a side key, negative fill and restrained rear accent","a shaded subtropical courtyard with low-rise stucco walls and local greenery, lit by soft open-sky daylight"];
 const scenes:EditorialScene[]=[
  {family:"people",direction:`HUMAN SCENE: Include ${casts[digest[1]%casts.length]} in ${settings[digest[2]%settings.length]}. Choose a simple everyday action linked to the article section, such as listening, preparing a question or conversing with a companion. Ordinary cotton or linen clothing with real folds; spontaneous restrained expression, not a posed healthcare campaign. Keep people the subject, not a desk accessory. This is an illustrative scene, not a care encounter at the actual practice.`},
  {family:"environment",direction:`ENVIRONMENT SCENE: Show an unoccupied ${settings[(digest[2]+1)%settings.length]}. Use a wider environmental composition with useful spatial context and two or three meaningful furnishings. Choose a different setting and light scheme from the human image. Do not make a tabletop close-up the subject.`},
  {family:"detail",direction:"CONTEXTUAL DETAIL: Create a people-free detail tied to the chosen article section, with natural side light, tactile material and visible contact shadows. Select a subject that adds information rather than repeating generic mugs, pens, phones or notebooks. Its subject, distance and angle must differ from the other two images."},
 ];
 const rotation=digest[0]%scenes.length;
 return scenes.map((_,index)=>scenes[(index+rotation)%scenes.length]);
}
export function withImageScenePolicy(context:string){
 return context+"\n\nMandatory location, identity and realism requirements: "+imageScenePolicy;
}
