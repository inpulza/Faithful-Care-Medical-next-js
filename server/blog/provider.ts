import {BlogError} from "./types";
export function aiConfig(){
 if(process.env.BLOG_AI_ENABLED!=="true"||!process.env.OPENAI_API_KEY)throw new BlogError(503,"Text generation is not configured. Add this client's provider key and enable BLOG_AI_ENABLED.");
 return {key:process.env.OPENAI_API_KEY,model:process.env.BLOG_AI_MODEL||"gpt-5.6-sol"};
}
export async function generateJson(instruction:string,data:unknown){
 const config=aiConfig();
 const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+config.key},
  signal:AbortSignal.timeout(150000),body:JSON.stringify({model:config.model,messages:[{role:"system",content:instruction},{role:"user",content:JSON.stringify(data)}],response_format:{type:"json_object"},max_completion_tokens:12000,...(config.model.startsWith("gpt-5")?{reasoning_effort:"low"}:{})})});
 if(!response.ok)throw new BlogError(response.status===429?429:502,"The text provider could not complete the request.");
 const result=await response.json();const choice=result.choices?.[0];
 if(choice?.finish_reason!=="stop"||typeof choice.message?.content!=="string")throw new BlogError(502,"The provider returned incomplete content; no draft was saved.");
 try{return JSON.parse(choice.message.content);}catch{throw new BlogError(502,"The provider returned invalid content; no draft was saved.");}
}
export function rejectPrivateInformation(text:string){
 if(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text)||/\b\d{3}-\d{2}-\d{4}\b/.test(text)||/\b(?:patient name|nombre del paciente|MRN|DOB|date of birth|fecha de nacimiento)\s*:/i.test(text))
  throw new BlogError(400,"Remove identifying patient information before using a text provider.");
}
