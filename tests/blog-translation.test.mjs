import assert from "node:assert/strict";import {test} from "node:test";
import {staticTranslatedLink,translatedDraft} from "../server/blog/translation.ts";import {blankData} from "../server/blog/types.ts";
test("translation uses actual paired service routes and preserves unrelated links",()=>{assert.equal(staticTranslatedLink("/primary-care","es"),"/es/medico-de-familia-naples");assert.equal(staticTranslatedLink("/contact#form","es"),"/es/contacto#form");assert.equal(staticTranslatedLink("https://medlineplus.gov/diabetes.html","es"),"https://medlineplus.gov/diabetes.html");});
test("translated drafts reject missing links and clear clinical review",()=>{
 const source={title:"Preparing your visit",content:"<h2>Prepare</h2><p>"+("Prepare your questions with care. ".repeat(30))+'</p><p><a href="/primary-care">Care</a></p>',data:{...blankData,reviewConfirmed:true,reviewer:"Test clinician"}};
 const result={title:"Prepara tu visita médica",slug:"prepara-visita",content:"<h2>Prepara</h2><p>"+("Prepara tus preguntas con calma. ".repeat(30))+'</p><p><a href="/es/medico-de-familia-naples">Atención</a></p>',excerpt:"Una guía para preparar las preguntas de tu próxima consulta.",metaTitle:"Prepara tu próxima consulta médica",metaDescription:"Prepara una lista de preguntas para conversar con tu profesional de salud durante tu próxima visita de atención primaria.",tags:["prevención"],imageAlts:[]};
 const draft=translatedDraft(source,"es",result,{"/primary-care":"/es/medico-de-familia-naples"});
 assert.equal(draft.data.reviewConfirmed,false);assert.equal(draft.data.reviewer,"");
 assert.throws(()=>translatedDraft(source,"es",{...result,content:result.content.replace("/es/medico-de-familia-naples","/invented")},{"/primary-care":"/es/medico-de-familia-naples"}),e=>e.status===422);
});

test("translation preserves accessible tables and lists and refuses missing cells",()=>{
 const table='<table><caption>Visit preparation</caption><thead><tr><th scope="col">Bring</th><th scope="col">Discuss</th></tr></thead><tbody><tr><td>Questions</td><td>Priorities</td></tr></tbody></table><ul><li>Write questions</li></ul>';
 const content='<h2>Prepare</h2><p>'+('Prepare your questions with care. '.repeat(30))+'</p>'+table;
 const source={title:"Prepare your visit",content,data:{...blankData}};
 const result={title:"Prepara tu visita médica",slug:"prepara-tu-visita",content:content.replace('Visit preparation','Preparar la visita').replace('Write questions','Escribe preguntas'),excerpt:"Una guía para preparar las preguntas de tu próxima consulta.",metaTitle:"Prepara tu próxima consulta médica",metaDescription:"Prepara una lista de preguntas para conversar con tu profesional de salud durante tu próxima visita de atención primaria.",tags:["prevención"],imageAlts:[]};
 const draft=translatedDraft(source,"es",result,{});assert(draft.content.includes('<th scope="col">'));
 assert.throws(()=>translatedDraft(source,"es",{...result,content:result.content.replace('<td>Priorities</td>','')},{}),e=>e.status===422);
 assert.throws(()=>translatedDraft(source,"es",{...result,content:result.content.replace('<li>Escribe preguntas</li>','')},{}),e=>e.status===422);
});
