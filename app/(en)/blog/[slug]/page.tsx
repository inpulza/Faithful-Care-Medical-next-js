import {ArticlePage,articleMetadata} from "../../../_blog/pages";
export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){return articleMetadata("en",(await params).slug);}
export default async function Page({params}:Props){return <ArticlePage language="en" slug={(await params).slug}/>}
