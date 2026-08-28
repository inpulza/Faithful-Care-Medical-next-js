import { motion, useReducedMotion } from "framer-motion";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface SplitFeatureItem {
  icon: PhosphorIcon;
  title: string;
  description: string;
}

interface SplitFeaturePanelProps {
  eyebrow: string;
  title: string;
  description: string;
  items: SplitFeatureItem[];
  tone?: "light" | "navy";
  className?: string;
  testId?: string;
}

export function SplitFeaturePanel({
  eyebrow,
  title,
  description,
  items,
  tone = "light",
  className,
  testId = "section-split-feature-panel",
}: SplitFeaturePanelProps) {
  const reducedMotion = useReducedMotion();
  const dark = tone === "navy";

  return (
    <section className={cn("section-gap", className)} data-testid={testId}>
      <div className="container-radical">
        <div
          className={cn(
            "relative overflow-hidden rounded-[24px]",
            dark
              ? "bg-deep-navy"
              : "bg-[radial-gradient(circle_at_78%_78%,rgba(9,39,75,0.22),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.95),transparent_42%),linear-gradient(135deg,#f5f2e9_0%,#e8eef1_52%,#c7d2d9_100%)]",
          )}
        >
          <div className="relative z-10 grid grid-cols-1 gap-10 px-5 py-10 md:px-10 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-14 lg:py-20">
            <motion.div
              className="lg:col-span-4 lg:self-start lg:sticky lg:top-32"
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", dark ? "bg-secondary" : "bg-primary")} />
                <p className={cn("text-sm font-semibold uppercase tracking-widest", dark ? "text-secondary" : "text-primary")}>{eyebrow}</p>
              </div>
              <h2 className={cn("font-serif text-3xl leading-tight md:text-4xl lg:text-[42px]", dark ? "text-white" : "text-deep-navy")}>{title}</h2>
              <p className={cn("mt-6 text-base leading-relaxed md:text-lg", dark ? "text-white/70" : "text-deep-navy/60")}>{description}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8 md:gap-4">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    className={cn(
                      "rounded-2xl border p-5 md:p-7",
                      dark ? "border-white/15 bg-white/7" : "border-white/60 bg-white/55 shadow-[0_12px_40px_rgba(9,39,75,0.08)] backdrop-blur-md",
                    )}
                    initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                  >
                    <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-xl", dark ? "bg-white/12" : "border border-primary/15 bg-primary/10")}>
                      <Icon className={cn("h-6 w-6", dark ? "text-secondary" : "text-primary")} weight="regular" aria-hidden="true" />
                    </div>
                    <span className={cn("mb-2 block font-mono text-xs", dark ? "text-white/35" : "text-deep-navy/30")}>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className={cn("mb-2 text-lg font-semibold md:text-xl", dark ? "text-white" : "text-deep-navy")}>{item.title}</h3>
                    <p className={cn("text-[15px] leading-relaxed md:text-base", dark ? "text-white/65" : "text-deep-navy/60")}>{item.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
