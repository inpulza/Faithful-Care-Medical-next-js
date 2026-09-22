// Shared by the visual planner and the final image request, including manual generations.
export const imageScenePolicy = "Faithful Care serves Naples, Collier County, Southwest Florida, USA. Naples always means Naples, Florida, never Naples, Italy or Napoli. Compose a close interior still life with a neutral indoor background; any window must show only diffuse light, without a recognizable outdoor view. No recognizable landmarks, cityscapes, coastlines, volcanoes, mountains or Italian scenery. This is a generic editorial illustration, not a photograph of the actual Faithful Care clinic or its staff. These location and composition requirements override any conflicting article title, section context or suggested image prompt.";
export function withImageScenePolicy(context:string){
 return context+"\n\nMandatory location and scene requirements: "+imageScenePolicy;
}
