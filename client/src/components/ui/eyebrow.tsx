import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: "primary" | "secondary";
}

export function Eyebrow({ children, className, color = "secondary", ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      <span className={cn(
        "w-2 h-2 rounded-full",
        color === "secondary" ? "bg-secondary" : "bg-primary"
      )} />
      <p className={cn(
        "text-sm font-semibold uppercase tracking-widest",
        color === "secondary" ? "text-secondary" : "text-primary"
      )}>
        {children}
      </p>
    </div>
  );
}
