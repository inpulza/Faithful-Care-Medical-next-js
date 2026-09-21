import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {COOKIE,session} from "../../../server/blog/auth";
import Editor from "./studio";
export const dynamic="force-dynamic";
export default async function Admin(){let user=null;try{user=await session((await cookies()).get(COOKIE)?.value);}catch{}if(!user)redirect("/admin/login");return <Editor username={user.username}/>;}
