import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/router";
import { ArrowRight } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export interface ServiceCardProps {
  title: string;
  description?: string;
  href: string;
  image?: string;
  icon?: PhosphorIcon;
  aspectRatio?: string;
  delay?: number;
  index?: number;
  className?: string;
  ctaText?: string;
  ctaAriaLabel?: string;
  "data-testid"?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function ServiceCard({
  title,
  description,
  href,
  image,
  aspectRatio = "3 / 4",
  delay = 0,
  index = 0,
  className,
  ctaText = "Learn more",
  ctaAriaLabel,
  "data-testid": testId,
}: ServiceCardProps) {
  const hasImage = image && image.length > 0;

  return (
    <motion.div
      className={cn("group rounded-[20px] overflow-hidden relative", className)}
      style={{ aspectRatio }}
      {...fadeInUp}
      transition={{ duration: 0.5, delay }}
      data-testid={testId}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}
      />

      {hasImage && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="relative z-10 pt-5 px-5 md:pt-7 md:px-7 text-center">
        <h3 className="font-sans font-semibold text-xl md:text-[26px] lg:text-[28px] leading-tight text-deep-navy">
          {title}
        </h3>
      </div>

      <div
        className="absolute -bottom-px -left-px -right-px z-[2] pointer-events-none"
        style={{ height: "58%", borderRadius: "0 0 20px 20px", overflow: "hidden" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 50%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 30%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 30%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: hasImage
              ? "linear-gradient(to top, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 30%, transparent 60%)"
              : "linear-gradient(to top, hsl(var(--primary) / 0.14) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="absolute bottom-4 left-5 right-5 md:bottom-6 md:left-7 md:right-7 z-10 flex items-end justify-between gap-3">
        {description ? (
          <p className="text-[13px] md:text-[15px] font-medium text-deep-navy/45 leading-snug max-w-[55%]">
            {description}
          </p>
        ) : <div />}
        <Link href={href}>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white shadow-lg text-deep-navy font-semibold hover:shadow-xl transition-all duration-200 group/btn flex-shrink-0 w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 text-base whitespace-nowrap"
            aria-label={ctaAriaLabel ?? `${ctaText}: ${title}`}
            data-testid={`button-service-${index}`}
          >
            <span className="hidden sm:inline">{ctaText}</span>
            <span className="sr-only sm:hidden">{ctaAriaLabel ?? `${ctaText}: ${title}`}</span>
            <ArrowRight
              weight="bold"
              size={14}
              className="text-primary group-hover/btn:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
