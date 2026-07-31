import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, Car, NavigationArrow, Buildings } from "@phosphor-icons/react";
import { CLINIC_GMAPS_SHARE_URL } from "@/lib/clinic-location";

export interface LocalAreaInfoProps {
  cityName: string;
  county: string;
  population?: string;
  driveTime: string;
  driveDistance: string;
  neighborhoods: string[];
  directionsText: string;
  localHealthContext: string;
  className?: string;
}

export function LocalAreaInfo({
  cityName,
  county,
  population,
  driveTime,
  driveDistance,
  neighborhoods,
  directionsText,
  localHealthContext,
  className,
}: LocalAreaInfoProps) {
  return (
    <section className={cn("section-gap bg-white", className)} data-testid="section-local-area">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[24px] overflow-hidden border border-deep-navy/6">
          <motion.div
            className="lg:col-span-4 bg-deep-navy p-6 md:p-10 lg:p-12 flex flex-col justify-between"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                  {county}
                </p>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white mb-4">
                How to reach us from {cityName}
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-6 md:mb-10">
                {driveDistance}
              </p>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary">{driveTime}</span>
              </div>
              <p className="text-sm text-white/40 uppercase tracking-wider mb-8">Drive to our office</p>

              {population && (
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-serif text-3xl md:text-4xl font-light text-secondary">{population}</span>
                  </div>
                  <p className="text-sm text-white/40 uppercase tracking-wider">Residents served</p>
                </div>
              )}
            </div>

            <div className="mt-6 md:mt-10 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" weight="fill" />
                <div>
                  <p className="text-white text-sm font-medium">
                    9955 Tamiami Trail N. Suite 2<br />
                    Naples, FL 34108
                  </p>
                  <a
                    href={CLINIC_GMAPS_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-2 hover:underline"
                    data-testid="link-google-maps"
                  >
                    Open in Google Maps
                    <NavigationArrow className="w-3.5 h-3.5" weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "hsl(var(--foreground) / 0.04)" }}>
              <motion.div
                className="bg-white p-5 md:p-10 sm:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                data-testid="info-directions"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary">
                    <Car className="w-5 h-5 text-white" weight="fill" />
                  </div>
                  <h3 className="font-semibold text-lg text-deep-navy">
                    Directions from {cityName}
                  </h3>
                </div>
                <p className="text-base text-deep-navy/50 leading-relaxed max-w-2xl">
                  {directionsText}
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-5 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                data-testid="info-neighborhoods"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary">
                    <Buildings className="w-5 h-5 text-white" weight="fill" />
                  </div>
                  <h3 className="font-semibold text-lg text-deep-navy">
                    Neighborhoods we serve
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((n, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-secondary/8 text-deep-navy/70 border border-secondary/12 transition-colors hover:bg-secondary hover:text-white hover:border-secondary"
                      data-testid={`neighborhood-tag-${i}`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-5 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
                data-testid="info-health-context"
              >
                <h3 className="font-semibold text-lg text-deep-navy mb-4">
                  Healthcare in {cityName}
                </h3>
                <p className="text-base text-deep-navy/50 leading-relaxed">
                  {localHealthContext}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
