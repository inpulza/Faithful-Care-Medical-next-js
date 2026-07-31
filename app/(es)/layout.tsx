import type { ReactNode } from "react";
import "../../client/src/index.css";

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
