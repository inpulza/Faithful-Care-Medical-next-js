import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { assetUrl } from "@/lib/asset-url";
import { Button } from "@/components/ui/button";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import gradientGray from "@/assets/images/gradient-gray.png";
import gradientTeal from "@/assets/images/gradient-teal-v2.png";

export interface LocationService {
  icon: PhosphorIcon;
  title: string;
  description: string;
}

export interface LocationServicesProps {
  id?: string;
  cityName: string;
  primaryCareDescription: string;
  palliativeCareDescription: string;
  primaryCareServices: LocationService[];
  palliativeCareServices: LocationService[];
  className?: string;
}

function ServiceCard({
  service,
  index,
  variant,
  testIdPrefix,
}: {
  service: LocationService;
  index: number;
  variant: "primary" | "secondary";
  testIdPrefix: string;
}) {
  const Icon = service.icon;
  const isPrimary = variant === "primary";

  return (
    <motion.div
      className="group/card loc-svc-card relative p-5 md:p-8 cursor-default overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-testid={`${testIdPrefix}-${index}`}
      data-variant={variant}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-500 relative z-[1]",
        isPrimary ? "bg-primary/12 group-hover/card:bg-primary/18" : "bg-white/20 group-hover/card:bg-white/30"
      )} style={{ border: isPrimary ? "1px solid rgba(29,78,216,0.18)" : "1px solid rgba(255,255,255,0.2)" }}>
        <Icon className={cn("w-7 h-7 transition-colors duration-500", isPrimary ? "text-primary" : "text-white")} weight="regular" />
      </div>
      <span className={cn(
        "text-xs font-mono tracking-wider mb-3 block transition-colors duration-500 relative z-[1]",
        isPrimary ? "text-deep-navy/30 group-hover/card:text-deep-navy/50" : "text-white/35 group-hover/card:text-white/50"
      )}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className={cn(
        "font-semibold text-lg md:text-xl mb-2 transition-colors duration-500 relative z-[1]",
        isPrimary ? "text-deep-navy" : "text-white"
      )}>
        {service.title}
      </h4>
      <p className={cn(
        "text-[15px] md:text-base leading-relaxed transition-colors duration-500 relative z-[1]",
        isPrimary ? "text-deep-navy/55 group-hover/card:text-deep-navy/75" : "text-white/65 group-hover/card:text-white/85"
      )}>
        {service.description}
      </p>
    </motion.div>
  );
}

export function LocationServices({
  id,
  cityName,
  primaryCareDescription,
  palliativeCareDescription,
  primaryCareServices,
  palliativeCareServices,
  className,
}: LocationServicesProps) {
  return (
    <section id={id} className={cn("section-gap", className)} data-testid="section-location-services">
      <div className="container-radical">
        <div className="rounded-[24px] overflow-clip relative">
          <img src={assetUrl(gradientGray)} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
          <div className="px-5 md:px-10 lg:px-14 py-10 md:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            <motion.div
              className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Primary Care
                </p>
              </div>
              <h2 className="font-serif text-2xl md:text-4xl lg:text-[42px] leading-tight text-deep-navy mb-4 md:mb-6">
                Primary care for {cityName} families
              </h2>
              <p className="text-base md:text-lg text-deep-navy/55 leading-relaxed mb-6 md:mb-8">
                {primaryCareDescription}
              </p>
              <Link href="/primary-care/checkups-prevention">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white border-deep-navy/12 text-deep-navy hover:bg-primary hover:text-white hover:border-primary"
                  data-testid="button-primary-care-learn"
                >
                  Learn about primary care
                  <ArrowRight className="ml-1" weight="regular" size={18} />
                </Button>
              </Link>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {primaryCareServices.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    index={index}
                    variant="primary"
                    testIdPrefix="primary-service"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="container-radical mt-6 md:mt-8">
        <div className="rounded-[24px] overflow-clip relative">
          <img src={assetUrl(gradientTeal)} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
          <div className="px-5 md:px-10 lg:px-14 py-10 md:py-20 lg:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-8 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {palliativeCareServices.map((service, index) => (
                    <ServiceCard
                      key={index}
                      service={service}
                      index={index}
                      variant="secondary"
                      testIdPrefix="palliative-service"
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="lg:col-span-4 lg:order-2 lg:sticky lg:top-32 lg:self-start"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                    Palliative Care
                  </p>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl lg:text-[42px] leading-tight text-white mb-4 md:mb-6">
                  Comfort-focused care for {cityName}
                </h2>
                <p className="text-base md:text-lg text-white/60 leading-relaxed mb-6 md:mb-8">
                  {palliativeCareDescription}
                </p>
                <Link href="/palliative-care/about-palliative-care">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white border-white/30 text-deep-navy hover:bg-secondary hover:text-white hover:border-secondary"
                    data-testid="button-palliative-care-learn"
                  >
                    Learn about palliative care
                    <ArrowRight className="ml-1" weight="regular" size={18} />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
