import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Typography } from "@/components/typography";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "mb-16 md:mb-24",
        align === "center" && "text-center max-w-3xl mx-auto",
        align === "left" && "max-w-2xl",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <Eyebrow className="mb-6 justify-center">{eyebrow}</Eyebrow>
      )}
      <Typography variant="h2">{title}</Typography>
      {subtitle && (
        <Typography variant="body-lg" className="mt-6 text-[hsl(var(--foreground)/0.72)]">
          {subtitle}
        </Typography>
      )}
    </motion.div>
  );
}
