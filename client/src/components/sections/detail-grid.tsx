import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export interface DetailCard {
  icon: PhosphorIcon;
  title: string;
  description: string;
}

interface DetailGridProps {
  id?: string;
  eyebrow: string;
  eyebrowColor?: "primary" | "secondary";
  title: string;
  description: string;
  statNumber: string;
  statLabel: string;
  cards: DetailCard[];
  className?: string;
}

export function DetailGrid({
  id,
  eyebrow,
  eyebrowColor = "secondary",
  title,
  description,
  statNumber,
  statLabel,
  cards,
  className,
}: DetailGridProps) {
  const dotColor = eyebrowColor === "secondary" ? "bg-secondary" : "bg-primary";
  const textColor = eyebrowColor === "secondary" ? "text-secondary" : "text-primary";

  return (
    <section id={id} className={cn("section-gap bg-white", className)} data-testid="section-detail-grid">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className={cn("w-2 h-2 rounded-full", dotColor)} />
              <p className={cn("text-sm font-semibold uppercase tracking-widest", textColor)}>
                {eyebrow}
              </p>
            </div>
            <h2 className="h2 text-deep-navy mb-6">{title}</h2>
            <p className="body-lg text-deep-navy/60 mb-6 md:mb-10 max-w-md">{description}</p>
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 py-6 border-t border-deep-navy/8">
                <span className="font-serif text-5xl font-light text-primary">{statNumber}</span>
                <p className="text-deep-navy/50 text-base leading-snug">{statLabel}</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-deep-navy/6 rounded-2xl overflow-hidden border border-deep-navy/6">
              {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-5 md:p-8 lg:p-10 bg-white cursor-default transition-colors duration-400 hover:bg-secondary"
                    style={{ transitionProperty: "background-color" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    data-testid={`detail-card-${index}`}
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary flex-shrink-0 transition-colors duration-400 promise-icon-box">
                        <Icon className="w-7 h-7 text-white/80 transition-colors duration-400 promise-icon" weight="regular" />
                      </div>
                      <span className="text-sm font-mono text-deep-navy/20 mt-3 transition-colors duration-400 promise-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl text-deep-navy mb-3 transition-colors duration-400 promise-title" data-testid={`detail-card-title-${index}`}>
                      {card.title}
                    </h3>
                    <p className="text-base md:text-lg text-deep-navy/50 leading-relaxed transition-colors duration-400 promise-desc" data-testid={`detail-card-desc-${index}`}>
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
