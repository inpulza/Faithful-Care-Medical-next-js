import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlternatingBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  ctaText?: string;
  ctaHref?: string;
  showCta?: boolean;
  bulletPoints?: string[];
  callout?: string;
  reversed?: boolean;
  variant?: "primary" | "secondary";
  stackUntilXl?: boolean;
  className?: string;
}

export function AlternatingBlock({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "Feature illustration",
  imagePosition = "center",
  ctaText = "Learn more",
  ctaHref = "#",
  showCta = true,
  bulletPoints = [],
  callout,
  reversed = false,
  variant = "primary",
  stackUntilXl = false,
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
          "grid grid-cols-1 items-center gap-8",
          stackUntilXl ? "xl:grid-cols-2 xl:gap-20" : "lg:grid-cols-2 lg:gap-20",
        )}>
          <motion.div
            className={cn(
              reversed && (stackUntilXl ? "xl:order-2" : "lg:order-2")
            )}
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div 
              className={cn(
                "relative w-full overflow-hidden rounded-2xl border",
                stackUntilXl ? "aspect-[4/3] md:aspect-[16/9] xl:aspect-square" : "aspect-[4/3] md:aspect-square",
                isPrimary ? "border-primary/30" : "border-secondary/30",
                isPrimary ? "inner-glow-primary" : "inner-glow-teal"
              )}
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes={stackUntilXl ? "(max-width: 1279px) 100vw, 50vw" : "(max-width: 1023px) 100vw, 50vw"}
                  className="object-cover"
                  style={{ objectPosition: imagePosition }}
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
            className={cn(reversed && (stackUntilXl ? "xl:order-1" : "lg:order-1"))}
            initial={false}
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
            {bulletPoints.length > 0 && (
              <ul className="mb-8 grid gap-3" data-testid="list-block-points">
                {bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-deep-navy/70 md:text-lg">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-primary" weight="fill" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
            {callout && (
              <p className="mb-8 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 text-base font-medium leading-relaxed text-deep-navy" data-testid="text-block-callout">
                {callout}
              </p>
            )}
            {showCta && (
              <Button asChild variant={isPrimary ? "default" : "secondary"} className="group" data-testid="button-block-cta">
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
