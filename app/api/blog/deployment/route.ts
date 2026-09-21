import {NextResponse} from "next/server";
export const dynamic="force-dynamic";
export function GET(){return NextResponse.json({sha:process.env.VERCEL_GIT_COMMIT_SHA||null,environment:process.env.VERCEL_ENV||"local",blogEnabled:process.env.BLOG_ENABLED==="true"},{headers:{"Cache-Control":"no-store","X-Robots-Tag":"noindex"}});}
