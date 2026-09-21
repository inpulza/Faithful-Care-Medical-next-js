import fs from "node:fs/promises";
import path from "node:path";
import {randomBytes,scryptSync} from "node:crypto";
const directory=process.argv[2];if(!directory)throw Error("Pass the client's protected Pass directory.");
await fs.mkdir(directory,{recursive:true});
const target=path.join(directory,"admin-preview.json");
let existing;try{existing=JSON.parse(await fs.readFile(target,"utf8"));}catch(e){if(e.code!=="ENOENT")throw e;}
const config=existing||{username:"faithful-care-editor",password:randomBytes(30).toString("base64url"),sessionSecret:randomBytes(48).toString("base64url")};
if(!existing)await fs.writeFile(target,JSON.stringify(config,null,2),{mode:0o600,flag:"wx"});
const salt=randomBytes(16).toString("hex");
const values={BLOG_ADMIN_USERNAME:config.username,BLOG_ADMIN_PASSWORD_HASH:"scrypt:"+salt+":"+scryptSync(config.password,salt,32).toString("hex"),BLOG_ADMIN_SESSION_SECRET:config.sessionSecret,BLOG_ENABLED:"true",BLOG_AI_ENABLED:"false",BLOG_IMAGES_ENABLED:"false",BLOG_GSC_ENABLED:"false"};
await fs.writeFile(path.join(directory,"preview-env-payload.json"),JSON.stringify(Object.entries(values).map(([key,value])=>({key,value,type:"encrypted",target:["preview"]}))),{mode:0o600});
console.log("Preview credentials prepared in the client Pass directory. No values printed.");
