import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlternatingBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  reversed?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export function AlternatingBlock({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "Feature illustration",
  ctaText = "Learn more",
  ctaHref = "#",
  reversed = false,
  variant = "primary",
  className
}: AlternatingBlockProps) {
  const isPrimary = variant === "primary";

  return (
    <section 
      className={cn("section-gap bg-white", className)}
      data-testid="section-alternating-block"
    >
      <div className="container-radical">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center",
          reversed && "lg:flex-row-reverse"
        )}>
          <motion.div
            className={cn(
              reversed && "lg:order-2"
            )}
            initial={{ opacity: 0, x: reversed ? 48 : -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div 
              className={cn(
                "rounded-2xl overflow-hidden border w-full aspect-[4/3] md:aspect-square",
                isPrimary ? "border-primary/30" : "border-secondary/30",
                isPrimary ? "inner-glow-primary" : "inner-glow-teal"
              )}
            >
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  data-testid="img-block-feature"
                />
              ) : (
                <div 
                  className={cn(
                    "w-full h-full flex items-center justify-center",
                    isPrimary ? "bg-primary/5" : "bg-secondary/5"
                  )}
                  data-testid="placeholder-block-image"
                >
                  <span className="text-deep-navy/30 font-medium">Image Placeholder</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className={cn(reversed && "lg:order-1")}
            initial={{ opacity: 0, x: reversed ? -48 : 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {subtitle && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                  {subtitle}
                </p>
              </div>
            )}
            <h2 className="h2 text-deep-navy mb-6">
              {title}
            </h2>
            <p className="body-lg text-deep-navy/70 mb-8 leading-relaxed">
              {description}
            </p>
            <Link href={ctaHref}>
              <Button 
                variant={isPrimary ? "default" : "secondary"}
                className="group"
                data-testid="button-block-cta"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
