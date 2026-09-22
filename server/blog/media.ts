import sharp from "sharp";
import {withImageScenePolicy,articleSceneMix,editorialPhotography} from "./image-scene-policy";
import {put} from "@vercel/blob";
import {randomUUID} from "node:crypto";
import {query} from "./db";
import {getPost} from "./posts";
import {BlogError,type Post} from "./types";
import {ownedMediaUrl} from "./media-url";
import {claimJob,failJob,jobStage} from "./jobs";
import {consumeImageBudget} from "./image-budget";
import {rejectPrivateInformation} from "./provider";
export interface Media {id:string;post_id:string;url:string;role:"hero"|"inline";alt:string;placement:number;source:string;reviewed:boolean}
export function mediaConfigured(){return Boolean(process.env.BLOB_READ_WRITE_TOKEN&&process.env.BLOB_PUBLIC_HOSTNAME);}
export async function mediaList(id:string){
 const post=await getPost(id);
 const media=await query<Media>("SELECT m.* FROM fc_blog_media m JOIN fc_blog_posts p ON p.id=m.post_id WHERE p.translation_group=$1 ORDER BY m.created_at DESC",[post.translation_group]);
 return media.map(m=>({...m,alt:post.data.hero===m.url?post.data.heroAlt:post.data.images.find(i=>i.url===m.url)?.alt||m.alt}));
}
async function storeImage(post:Post,bytes:Buffer,role:"hero"|"inline",alt:string,placement:number,source:"upload"|"ai",model?:string,prompt?:string){
 if(!mediaConfigured())throw new BlogError(503,"The client image store is not configured.");
 if(bytes.length>12000000)throw new BlogError(413,"Image exceeds 12 MB.");
 const image=sharp(bytes,{limitInputPixels:40000000,animated:false});
 const metadata=await image.metadata();
 if(!["jpeg","png","webp"].includes(metadata.format||""))throw new BlogError(415,"Use JPEG, PNG or WebP.");
 if(!metadata.width||!metadata.height||metadata.width<600||metadata.height<300)throw new BlogError(422,"Use an image at least 600×300 pixels.");
 const encoded=await image.rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:85}).toBuffer();
 const blob=await put("faithful-care/blog/"+post.id+"/"+randomUUID()+".webp",encoded,{access:"public",contentType:"image/webp",addRandomSuffix:false,token:process.env.BLOB_READ_WRITE_TOKEN});
 if(!ownedMediaUrl(blob.url))throw new BlogError(503,"Image store hostname does not match the client configuration.");
 const [media]=await query<Media>("INSERT INTO fc_blog_media(post_id,url,role,alt,placement,source,model,prompt) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[post.id,blob.url,role,alt,placement,source,model||null,prompt||null]);
 return media;
}
export async function uploadImage(id:string,bytes:Buffer,role:"hero"|"inline",alt:string,placement:number){
 const post=await getPost(id);if(post.status==="published")throw new BlogError(409,"Unpublish before changing article images.");
 return storeImage(post,bytes,role,alt,placement,"upload");
}
export async function selectImage(id:string,mediaId:string,version:number,actor:string,alt:string){
 const post=await getPost(id);if(post.version!==version||post.status==="published")throw new BlogError(409,"Reload the draft before selecting an image.");
 const [media]=await query<Media>("SELECT m.* FROM fc_blog_media m JOIN fc_blog_posts p ON p.id=m.post_id WHERE m.id=$1 AND p.translation_group=$2",[mediaId,post.translation_group]);
 if(!media||!ownedMediaUrl(media.url))throw new BlogError(400,"Choose an image from this article's own library.");
 if(media.role==="inline"&&post.data.images.length>=5&&!post.data.images.some(image=>image.afterHeading===media.placement))
  throw new BlogError(422,"An article supports up to five inline images. Replace an image at an existing section instead.");
 const data={...post.data,reviewConfirmed:false,reviewer:""};
 if(media.role==="hero"){data.hero=media.url;data.heroAlt=alt;}
 else data.images=[...data.images.filter(i=>i.afterHeading!==media.placement),{url:media.url,alt,afterHeading:media.placement}].sort((a,b)=>a.afterHeading-b.afterHeading);
 const rows=await query<Post>(`WITH changed AS (
 UPDATE fc_blog_posts SET data=$2,status='draft',version=version+1,updated_at=now() WHERE id=$1 AND NOT (data ? 'deletedAt') AND version=$3 AND status<>'published' RETURNING *
 ), reviewed AS (UPDATE fc_blog_media SET reviewed=true,alt=CASE WHEN post_id=$1 THEN $5 ELSE alt END WHERE id=$4 AND EXISTS(SELECT 1 FROM changed)),
 audit AS (INSERT INTO fc_blog_events(post_id,action,actor,detail) SELECT id,'image_selected',$6,jsonb_build_object('mediaId',$4::text) FROM changed)
 SELECT * FROM changed`,[id,JSON.stringify(data),version,mediaId,alt,actor]);
 if(!rows[0])throw new BlogError(409,"The article changed. Reload before selecting the image.");
 return rows[0];
}
export async function generateImage(id:string,key:string,role:"hero"|"inline",alt:string,placement:number,actor:string,contextPrompt?:string,timeoutMs=240000){
 if(process.env.BLOG_IMAGES_ENABLED!=="true"||!process.env.OPENAI_API_KEY||!mediaConfigured())throw new BlogError(503,"Image generation is disabled until a provider and this client's storage are configured.");
 const post=await getPost(id);if(post.status==="published")throw new BlogError(409,"Unpublish before changing images.");
 rejectPrivateInformation(post.title);
 const model=process.env.BLOG_IMAGE_MODEL||"gpt-image-2.5-sunburst";
 if(contextPrompt)rejectPrivateInformation(contextPrompt);
 const assignment=contextPrompt||articleSceneMix(post.title)[role==="hero"?0:1+(placement%2)].direction;
 const prompt=withImageScenePolicy(editorialPhotography+"\nArticle context: "+post.title+". Placement: "+role+".\nScene brief: "+assignment);
 const job=await claimJob("image",key,actor,{postId:id,role,model});
 try{
  await consumeImageBudget(key);await jobStage(job.id,"generating_image");
  const response=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+process.env.OPENAI_API_KEY},signal:AbortSignal.timeout(timeoutMs),
   body:JSON.stringify({model,prompt,n:1,size:"1536x1024",quality:"medium",output_format:"webp"})});
  if(!response.ok)throw new BlogError(502,"The image provider could not complete this request.");
  const payload=await response.json(),encoded=payload.data?.[0]?.b64_json;
  if(typeof encoded!=="string"||encoded.length>18000000)throw new BlogError(502,"The image provider returned no usable image.");
  await jobStage(job.id,"storing_image");
  const media=await storeImage(post,Buffer.from(encoded,"base64"),role,alt,placement,"ai",model,prompt);
  await query("UPDATE fc_blog_jobs SET status='completed',stage='candidate_ready',post_id=$2,detail=detail||$3::jsonb,updated_at=now() WHERE id=$1",[job.id,id,JSON.stringify({mediaId:media.id})]);
  return media;
 }catch(e){await failJob(job.id,e instanceof BlogError?e.message:"Image preparation failed safely.");throw e;}
}
