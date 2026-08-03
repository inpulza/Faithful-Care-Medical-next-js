import type { ReactNode } from "react";
import { siteMetadata, siteViewport } from "../lib/metadata";
import "../../client/src/index.css";
import { fontVariables } from "../lib/fonts";
import { TrackingScripts } from "../tracking-scripts";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <TrackingScripts />
      <body>{children}</body>
    </html>
  );
}
