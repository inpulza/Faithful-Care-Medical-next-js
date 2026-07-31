import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  className?: string;
}

interface LogoBarProps {
  title?: string;
  logos?: Logo[];
  className?: string;
}

const placeholderLogos: Logo[] = [
  { name: "Cleveland Clinic" },
  { name: "Johns Hopkins" },
  { name: "Mayo Clinic" },
  { name: "Emory Healthcare" },
  { name: "Duke Health" },
  { name: "Mass General" },
];

export function LogoBar({ 
  title = "Trusted by leading healthcare organizations", 
  logos = placeholderLogos,
  className 
}: LogoBarProps) {
  return (
    <section 
      className={cn("py-16 md:py-24 bg-white border-y-2 border-primary/5", className)}
      data-testid="section-logo-bar"
    >
      <div className="container-radical">
        <motion.p 
          className="text-center text-deep-navy/50 font-medium mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              data-testid={`logo-item-${index}`}
            >
              <div 
                className={cn(
                  "px-6 py-3 rounded-lg bg-primary/5 border border-primary/30",
                  "font-semibold text-deep-navy/40 text-sm md:text-base",
                  "hover:border-primary/20 hover:bg-primary/8 transition-colors",
                  logo.className
                )}
              >
                {logo.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
