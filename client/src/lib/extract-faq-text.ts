import * as React from "react";

export function extractFaqText(answer: React.ReactNode): string {
  if (typeof answer === "string") return answer;
  if (answer === null || answer === undefined) return "";
  if (typeof answer === "object" && "props" in (answer as any)) {
    const el = answer as React.ReactElement<{ children?: React.ReactNode }>;
    const children = el.props.children;
    if (Array.isArray(children)) {
      return children
        .map((child: React.ReactNode) => {
          if (typeof child === "string") return child;
          if (child && typeof child === "object" && "props" in (child as any)) {
            const c = (child as React.ReactElement<{ children?: React.ReactNode }>).props.children;
            return typeof c === "string" ? c : "";
          }
          return "";
        })
        .join("");
    }
    return typeof children === "string" ? children : "";
  }
  return String(answer);
}
