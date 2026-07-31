import type { ReactNode } from "react";
import { siteMetadata, siteViewport } from "../lib/metadata";
import "../../client/src/index.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
