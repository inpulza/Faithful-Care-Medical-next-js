import {ArticlePage,articleMetadata} from "../../../../_blog/pages";
export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){return articleMetadata("es",(await params).slug);}
export default async function Page({params}:Props){return <ArticlePage language="es" slug={(await params).slug}/>}
