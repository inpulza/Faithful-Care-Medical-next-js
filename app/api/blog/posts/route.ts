import {NextRequest,NextResponse} from "next/server";
import {listPosts} from "../../../../server/blog/posts";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 if(process.env.BLOG_ENABLED!=="true")return NextResponse.json({posts:[]});
 const language=request.nextUrl.searchParams.get("language")==="es"?"es":"en";
 try{return NextResponse.json({posts:await listPosts(language)});}catch{return NextResponse.json({error:"Blog temporarily unavailable."},{status:503});}
}
