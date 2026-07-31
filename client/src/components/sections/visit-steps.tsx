import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import type { Icon } from "@phosphor-icons/react";

export interface VisitStep {
  icon: Icon;
  title: string;
  description: string;
  duration?: string;
}

interface VisitStepsProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: VisitStep[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function VisitSteps({
  eyebrow = "Your visit, step by step",
  title,
  subtitle,
  steps,
  ctaText = "Schedule My Visit",
  ctaHref = "/contact",
  className,
}: VisitStepsProps) {
  const isExternalCta = /^(tel:|mailto:|https?:)/i.test(ctaHref);

  return (
    <section
      className={cn("section-gap bg-white", className)}
      data-testid="section-visit-steps"
    >
      <div className="container-radical">
        <motion.div
          className="text-center mb-10 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {eyebrow}
            </p>
          </div>
          <h2 className="h2 text-deep-navy max-w-3xl mx-auto">{title}</h2>
          {subtitle && (
            <p className="body-lg text-deep-navy/60 mt-6 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div
            className="absolute left-[27px] md:left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/25 via-secondary/25 to-primary/25"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  key={index}
                  className={cn("relative flex gap-4 md:gap-8", !isLast && "pb-6 md:pb-14")}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`visit-step-${index}`}
                >
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center shadow-sm">
                      <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/8 flex items-center justify-center">
                        <StepIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" weight="duotone" />
                      </div>
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 pt-2 md:pt-3">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-serif text-xl md:text-2xl text-deep-navy leading-snug">
                        {step.title}
                      </h3>
                      {step.duration && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold whitespace-nowrap">
                          <Clock className="w-4 h-4" weight="bold" />
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-deep-navy/55 text-base md:text-lg leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 md:mt-14 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isExternalCta ? (
              <a href={ctaHref}>
                <Button
                  size="lg"
                  className="group"
                  data-testid="button-visit-steps-cta"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" weight="regular" />
                </Button>
              </a>
            ) : (
              <Link href={ctaHref}>
                <Button
                  size="lg"
                  className="group"
                  data-testid="button-visit-steps-cta"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" weight="regular" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
