import {IndexPage,indexMetadata} from "../../_blog/pages";
export const dynamic="force-dynamic";
export const metadata=indexMetadata("en");
export default function Page(){return <IndexPage language="en"/>}
