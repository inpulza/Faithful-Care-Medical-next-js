"use client";
import type {ReactNode} from "react";
import {MegaMenu} from "@/components/mega-menu";
import {Footer} from "@/components/sections/footer";
import {PageTransitionProvider} from "@/components/page-transition";
import {CookieBanner} from "@/components/cookie-banner";
export default function BlogChrome({children,languageLinks}:{children:ReactNode;languageLinks:{en:string;es:string}}){return <PageTransitionProvider><MegaMenu languageLinks={languageLinks}/>{children}<Footer/><CookieBanner/></PageTransitionProvider>}
