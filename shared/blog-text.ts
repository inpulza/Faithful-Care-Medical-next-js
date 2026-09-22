import {decodeHTML} from "entities";
// Preserve boundaries between HTML blocks without splitting words around inline tags.
export function articleWordCount(html:string){
 const text=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,"").replace(/<!--[\s\S]*?-->/g,"").replace(/<\/?(?:p|h[1-6]|li|ul|ol|table|caption|thead|tbody|tfoot|tr|th|td|div|section|article|blockquote|br)\b[^>]*>/gi," ").replace(/<[^>]*>/g,"");
 return decodeHTML(text).trim().split(/\s+/u).filter(Boolean).length;
}
export function articleReadingMinutes(html:string){return Math.max(1,Math.ceil(articleWordCount(html)/200));}
export function hasInternalEditorialNotes(html:string){
 const text=decodeHTML(html.replace(/<[^>]*>/g," ")).replace(/\s+/g," ");
 return /\b(?:supplied|provided) (?:educational )?(?:source|material|excerpt|brief)\b|\b(?:fuente|material|extracto) (?:educativ[ao] )?(?:proporcionad[ao]|suministrad[ao])\b|\b(?:internal editorial|editorial brief|notas internas|instrucciones internas)\b/i.test(text);
}
