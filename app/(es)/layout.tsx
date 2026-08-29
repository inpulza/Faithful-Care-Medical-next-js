import type { ReactNode } from "react";
import { siteMetadata, siteViewport } from "../lib/metadata";
import "../../client/src/index.css";
import { fontVariables } from "../lib/fonts";
import Script from "next/script";
import { TRACKING_BOOTSTRAP } from "../tracking-scripts";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body>
        {children}
        <Script
          id="fcms-consent-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: TRACKING_BOOTSTRAP }}
        />
      </body>
    </html>
  );
}
