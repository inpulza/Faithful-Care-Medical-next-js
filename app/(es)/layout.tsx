import type { ReactNode } from "react";
import "../../client/src/index.css";
import { fontVariables } from "../lib/fonts";

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
