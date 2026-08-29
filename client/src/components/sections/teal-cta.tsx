import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function isExternalHref(href: string): boolean {
  return href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
}

interface TealCtaProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function TealCta({
  title,
  subtitle,
  description,
  primaryCtaText = "Get Started",
  primaryCtaHref = "/contact",
  secondaryCtaText,
  secondaryCtaHref = "tel:2394230205",
  className
}: TealCtaProps) {
  return (
    <section 
      className={cn(
        "section-gap teal-surface relative overflow-hidden",
        className
      )}
      data-testid="section-teal-cta"
    >
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path 
            d="M0,200 Q360,100 720,200 T1440,200 L1440,400 L0,400 Z" 
            fill="white"
          />
        </svg>
      </div>

      <div className="container-radical relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {subtitle && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">{subtitle}</p>
            </div>
          )}
          <h2 className="h2 text-white mb-6">{title}</h2>
          {description && (
            <p className="body-lg text-white/80 mb-6 md:mb-10 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isExternalHref(primaryCtaHref) ? (
              <Button
                asChild
                variant="outline"
                className="bg-white text-secondary hover:bg-white/90 border-white min-h-[56px] md:min-h-[64px] px-6 md:px-8 text-base md:text-lg group"
                data-testid="button-teal-cta-primary"
              >
                <a href={primaryCtaHref}>
                  {primaryCtaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="bg-white text-secondary hover:bg-white/90 border-white min-h-[56px] md:min-h-[64px] px-6 md:px-8 text-base md:text-lg group"
                data-testid="button-teal-cta-primary"
              >
                <Link href={primaryCtaHref}>
                  {primaryCtaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
            {secondaryCtaText && (
              isExternalHref(secondaryCtaHref) ? (
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 min-h-[56px] md:min-h-[64px] px-6 md:px-8 text-base md:text-lg"
                  data-testid="button-teal-cta-secondary"
                >
                  <a href={secondaryCtaHref}>
                    {secondaryCtaText}
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 min-h-[56px] md:min-h-[64px] px-6 md:px-8 text-base md:text-lg"
                  data-testid="button-teal-cta-secondary"
                >
                  <Link href={secondaryCtaHref}>
                    {secondaryCtaText}
                  </Link>
                </Button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
