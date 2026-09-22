"use client";
import {useEffect,useRef,useState} from "react";
export default function ArticleText({value,onChange,disabled}:{value:string;onChange:(html:string)=>void;disabled:boolean}){
 const editor=useRef<HTMLDivElement>(null),[source,setSource]=useState(false);
 useEffect(()=>{if(editor.current&&document.activeElement!==editor.current)editor.current.replaceChildren(safeEditorContent(value));},[value,source]);
 function format(command:string,arg?:string){editor.current?.focus();document.execCommand(command,false,arg);if(editor.current)onChange(editor.current.innerHTML);}
 return <div className="article-text-editor"><div className="text-editor-heading"><h3>Article body</h3><button type="button" className="secondary" aria-pressed={source} onClick={()=>setSource(!source)}>{source?"Visual editor":"Edit HTML"}</button></div>{source?<label>Article HTML<textarea aria-label="Article HTML" className="editor-code" disabled={disabled} rows={18} value={value} onChange={e=>onChange(e.target.value)}/></label>:<><div className="format-toolbar" aria-label="Text formatting">{[["bold","Bold"],["italic","Italic"],["insertUnorderedList","Bullet list"],["insertOrderedList","Numbered list"]].map(([command,label])=><button key={command} type="button" className="secondary" disabled={disabled} onMouseDown={e=>e.preventDefault()} onClick={()=>format(command)}>{label}</button>)}{[["p","Paragraph"],["h2","Heading 2"],["h3","Heading 3"]].map(([tag,label])=><button key={tag} type="button" className="secondary" disabled={disabled} onMouseDown={e=>e.preventDefault()} onClick={()=>format("formatBlock",tag)}>{label}</button>)}</div><div ref={editor} role="textbox" aria-label="Article body" aria-multiline="true" aria-readonly={disabled} contentEditable={!disabled} suppressContentEditableWarning className="visual-article-editor blog-copy" onInput={e=>onChange(e.currentTarget.innerHTML)} onPaste={e=>{e.preventDefault();document.execCommand("insertText",false,e.clipboardData.getData("text/plain"));}} onDrop={e=>e.preventDefault()}/><p className="workspace-help">Paste inserts plain text. Use Edit HTML for tables or link changes.</p></>}</div>;
}

// Templates are inert: rebuild only editing elements before attaching user-edited HTML.
// The server independently sanitizes again when saving.
function safeEditorContent(html:string){
 const template=document.createElement("template");template.innerHTML=html;
 const allowed=new Set(["p","h2","h3","ul","ol","li","strong","em","blockquote","a","br","table","caption","thead","tbody","tfoot","tr","th","td"]);
 function copy(node:Node):Node{
  if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(node.textContent||"");
  const fragment=document.createDocumentFragment();if(!(node instanceof Element))return fragment;
  const original=node.tagName.toLowerCase();if(["script","style","iframe","object","embed","svg","math","template"].includes(original))return fragment;
  const tag=({b:"strong",i:"em",div:"p"} as Record<string,string>)[original]||original;
  const target=allowed.has(tag)?document.createElement(tag):fragment;
  if(target instanceof Element){
   if(tag==="th"&&["col","row"].includes(node.getAttribute("scope")||""))target.setAttribute("scope",node.getAttribute("scope")!);
   if(tag==="a"){const href=node.getAttribute("href")||"";try{const url=new URL(href,location.origin);if(!href.includes("\\")&&!href.startsWith("//")&&((href.startsWith("/")&&url.origin===location.origin)||(url.protocol==="https:"&&!url.username&&!url.password))){target.setAttribute("href",href);target.setAttribute("rel","noopener noreferrer");}}catch{}}
  }
  for(const child of node.childNodes)target.appendChild(copy(child));return target;
 }
 const result=document.createDocumentFragment();for(const child of template.content.childNodes)result.appendChild(copy(child));return result;
}
