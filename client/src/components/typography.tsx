import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type TypographyVariant = "h1" | "h2" | "h3" | "body-lg" | "body-md";

type Props<T extends React.ElementType> = {
  as?: T;
  asChild?: boolean;
  variant: TypographyVariant;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className"> & {
    children?: React.ReactNode;
  };

const map: Record<TypographyVariant, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  "body-lg": "body-lg",
  "body-md": "body-md",
};

export function Typography<T extends React.ElementType = "p">({
  as,
  asChild,
  variant,
  className,
  ...props
}: Props<T>) {
  const Comp = asChild ? Slot : (as ?? "p");
  return <Comp className={cn(map[variant], className)} {...(props as any)} />;
}
