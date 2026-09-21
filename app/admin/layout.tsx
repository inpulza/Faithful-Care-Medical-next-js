import type {ReactNode} from "react";
import type {Metadata} from "next";
import "../../client/src/index.css";
import "../blog.css";
import {fontVariables} from "../lib/fonts";
export const metadata:Metadata={title:"Editorial | Faithful Care",robots:{index:false,follow:false,nocache:true},referrer:"no-referrer"};
export default function AdminLayout({children}:{children:ReactNode}){return <html lang="en" className={fontVariables}><body>{children}</body></html>}
