import {NextRequest,NextResponse} from "next/server";
import {COOKIE,session,assertOrigin,consumeLimit} from "../../../../server/blog/auth";
import {BlogError} from "../../../../server/blog/types";
import {uploadImage} from "../../../../server/blog/media";
export const runtime="nodejs";export const maxDuration=60;
const headers={"Cache-Control":"no-store","X-Robots-Tag":"noindex, nofollow"};
export async function POST(request:NextRequest){
 try{
  assertOrigin(request);const editor=await session(request.cookies.get(COOKIE)?.value);if(!editor)throw new BlogError(401,"Editorial login required.");
  await consumeLimit("media-upload",15,3600);
  const reader=request.body?.getReader();if(!reader)throw new BlogError(400,"Choose an image.");
  let size=0;const chunks:Uint8Array[]=[];
  while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>12500000){await reader.cancel();throw new BlogError(413,"Upload exceeds 12 MB.");}chunks.push(part.value);}
  const form=await new Response(Buffer.concat(chunks),{headers:{"Content-Type":request.headers.get("content-type")||""}}).formData();
  const file=form.get("file"),id=String(form.get("postId")||""),alt=String(form.get("alt")||"").trim(),role=form.get("role")==="inline"?"inline":"hero",placement=Number(form.get("placement")||1);
  if(!(file instanceof File)||alt.length<5||alt.length>250||!Number.isInteger(placement)||placement<1||placement>30)throw new BlogError(400,"Choose an image and add useful alternative text.");
  const media=await uploadImage(id,Buffer.from(await file.arrayBuffer()),role,alt,placement);
  return NextResponse.json({media},{headers});
 }catch(e){return NextResponse.json({error:e instanceof BlogError?e.message:"Image upload could not be completed."},{status:e instanceof BlogError?e.status:503,headers});}
}
