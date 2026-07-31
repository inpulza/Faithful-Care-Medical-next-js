import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  overlay?: "navy" | "primary" | "teal" | "none";
  priority?: boolean;
  "data-testid"?: string;
};

export function MedicalPhoto({
  src,
  alt,
  className,
  overlay = "navy",
  priority,
  "data-testid": dataTestId,
}: Props) {
  const overlayClass =
    overlay === "none"
      ? ""
      : overlay === "primary"
        ? "from-[hsl(var(--primary)/0.45)]"
        : overlay === "teal"
          ? "from-[hsl(var(--secondary)/0.45)]"
          : "from-[hsl(var(--foreground)/0.55)]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl medical-border bg-white",
        className
      )}
      data-testid={dataTestId}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
        data-testid={dataTestId ? `${dataTestId}-img` : undefined}
      />
      {overlay !== "none" ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-tr",
            overlayClass,
            "via-transparent to-transparent"
          )}
          data-testid={dataTestId ? `${dataTestId}-overlay` : undefined}
        />
      ) : null}
    </div>
  );
}
