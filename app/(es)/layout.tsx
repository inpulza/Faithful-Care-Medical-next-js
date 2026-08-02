import type { ReactNode } from "react";
import { siteMetadata, siteViewport } from "../lib/metadata";
import "../../client/src/index.css";
import { fontVariables } from "../lib/fonts";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
