import sharp from "sharp";import {put} from "@vercel/blob";import fs from "node:fs/promises";import path from "node:path";
const directory=process.argv[2];if(!directory)throw Error("Pass the protected client directory.");
const bytes=await sharp({create:{width:800,height:500,channels:3,background:"#07345b"}}).webp().toBuffer();
const blob=await put("faithful-care/blog/qa/storage-check.webp",bytes,{access:"public",addRandomSuffix:false,allowOverwrite:true,contentType:"image/webp"});
const host=new URL(blob.url).hostname;
await fs.writeFile(path.join(directory,"blob-hostname.txt"),host);
console.log(JSON.stringify({url:blob.url,hostname:host,status:(await fetch(blob.url)).status}));
