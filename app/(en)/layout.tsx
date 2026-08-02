import type { ReactNode } from "react";
import "../../client/src/index.css";
import { fontVariables } from "../lib/fonts";

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
