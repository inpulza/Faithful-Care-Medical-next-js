import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsBandProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
  variant?: "light" | "teal";
  className?: string;
}

export function StatsBand({ 
  title, 
  subtitle, 
  stats, 
  variant = "light",
  className 
}: StatsBandProps) {
  const isLight = variant === "light";

  return (
    <section 
      className={cn(
        "section-gap",
        isLight ? "bg-white" : "teal-surface",
        className
      )}
      data-testid="section-stats-band"
    >
      <div className="container-radical">
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-10 md:mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <div className="flex items-center gap-2 mb-6">
                <span className={cn("w-2 h-2 rounded-full", isLight ? "bg-secondary" : "bg-white/80")} />
                <p className={cn(
                  "text-sm font-semibold uppercase tracking-widest",
                  isLight ? "text-secondary" : "text-white/80"
                )}>
                  {subtitle}
                </p>
              </div>
            )}
            {title && (
              <h2 className={cn(
                "h2",
                isLight ? "text-deep-navy" : "text-white"
              )}>
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              data-testid={`stat-item-${index}`}
            >
              <div 
                className={cn(
                  "font-sans font-bold tracking-tight mb-4",
                  isLight ? "text-primary" : "text-white",
                  "text-4xl md:text-6xl lg:text-8xl"
                )}
                data-testid={`stat-value-${index}`}
              >
                {stat.value}
              </div>
              <h3 
                className={cn(
                  "font-semibold text-xl md:text-2xl mb-2",
                  isLight ? "text-deep-navy" : "text-white"
                )}
                data-testid={`stat-label-${index}`}
              >
                {stat.label}
              </h3>
              {stat.description && (
                <p className={cn(
                  "body-lg",
                  isLight ? "text-deep-navy/60" : "text-white/70"
                )}>
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
