import type {EditorialData,Language} from "./types";
export type Category=EditorialData["category"];
export const SOURCES=[
 {url:"https://medlineplus.gov/healthscreening.html",title:"Health screening",categories:["prevention","primary-care","senior-care"],publisher:"MedlinePlus · National Library of Medicine"},
 {url:"https://medlineplus.gov/diabetes.html",title:"Diabetes",categories:["chronic-care","primary-care"],publisher:"MedlinePlus · National Library of Medicine"},
 {url:"https://medlineplus.gov/highbloodpressure.html",title:"High blood pressure",categories:["chronic-care","senior-care"],publisher:"MedlinePlus · National Library of Medicine"},
 {url:"https://medlineplus.gov/palliativecare.html",title:"Palliative care",categories:["palliative-care","family-support"],publisher:"MedlinePlus · National Library of Medicine"},
] as const;
export const TOPICS:{id:string;category:Category;en:string;es:string;source:string}[]=[
 {id:"visit-preparation",category:"primary-care",en:"Questions to prepare for a primary care visit",es:"Preguntas para preparar una visita de atención primaria",source:SOURCES[0].url},
 {id:"screening-conversation",category:"prevention",en:"How to discuss preventive screenings with your clinician",es:"Cómo hablar sobre pruebas preventivas con tu médico",source:SOURCES[0].url},
 {id:"screening-followup",category:"prevention",en:"Questions about screening results and follow-up",es:"Preguntas sobre resultados de pruebas preventivas y seguimiento",source:SOURCES[0].url},
 {id:"diabetes-questions",category:"chronic-care",en:"Preparing questions for a diabetes follow-up visit",es:"Cómo preparar preguntas para una visita de seguimiento de diabetes",source:SOURCES[1].url},
 {id:"blood-pressure-visit",category:"chronic-care",en:"Discussing blood pressure readings at your next appointment",es:"Cómo hablar de tus lecturas de presión arterial en la consulta",source:SOURCES[2].url},
 {id:"older-adult-prevention",category:"senior-care",en:"Making preventive care conversations useful for older adults",es:"Cómo aprovechar las conversaciones sobre prevención en adultos mayores",source:SOURCES[0].url},
 {id:"palliative-first-conversation",category:"palliative-care",en:"Questions to ask during a first palliative care conversation",es:"Preguntas para una primera conversación sobre cuidados paliativos",source:SOURCES[3].url},
 {id:"palliative-support",category:"family-support",en:"Preparing a family conversation about palliative care",es:"Cómo preparar una conversación familiar sobre cuidados paliativos",source:SOURCES[3].url},
];
export function internalLinks(category:Category,language:Language){
 const palliative=category==="palliative-care"||category==="family-support";
 return language==="es"?[palliative?"/es/cuidados-paliativos-naples":"/es/medico-de-familia-naples","/es/contacto"]:[palliative?"/palliative-care":"/primary-care","/contact"];
}
export const DISCLAIMERS={
 en:"This article is for general education and does not replace an individual assessment or medical advice from your clinician. Do not change treatment based on an article. Call 911 for a medical emergency.",
 es:"Este artículo ofrece información educativa general y no sustituye una evaluación individual ni el consejo de tu profesional de salud. No cambies tu tratamiento por lo que leas en un artículo. Llama al 911 en una emergencia médica.",
};
