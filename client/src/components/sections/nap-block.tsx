import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Phone, EnvelopeSimple, Clock, MapPin, ArrowRight } from "@phosphor-icons/react";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";
import { PrivacySafeGoogleMap } from "@/components/privacy-safe-google-map";

export interface NapBlockProps {
  cityName: string;
  className?: string;
}

export function NapBlock({ cityName, className }: NapBlockProps) {
  return (
    <section className={cn("section-gap bg-white", className)} data-testid="section-nap-block">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[24px] overflow-hidden border border-deep-navy/6">
          <motion.div
            className="lg:col-span-5 bg-primary p-6 md:p-10 lg:p-12 flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
                Contact & Hours
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3">
                Faithful Care<br />Medical Services
              </h3>
              <p className="text-base text-white/50 mb-6 md:mb-10">
                Serving {cityName} and Southwest Florida
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:2394230205"
                className="group/cta flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
                data-testid="link-nap-phone"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" weight="fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-lg">(239) 423-0205</p>
                  <p className="text-white/40 text-sm">Tap to call</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all" weight="bold" />
              </a>

              <a
                href="mailto:info@faithfulcaremedical.com"
                className="group/cta flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
                data-testid="link-nap-email"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <EnvelopeSimple className="w-6 h-6 text-white" weight="fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm md:text-base break-all">info@faithfulcaremedical.com</p>
                  <p className="text-white/40 text-sm">Send us a message</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all" weight="bold" />
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px h-full" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
              <motion.div
                className="bg-white p-5 md:p-10 flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                data-testid="nap-address"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-white" weight="fill" />
                </div>
                <h4 className="font-semibold text-deep-navy text-lg mb-3">Office Address</h4>
                <p className="text-base text-deep-navy/50 leading-relaxed flex-1">
                  9955 Tamiami Trail N. Suite 2<br />
                  Naples, FL 34108
                </p>
                <a
                  href={CLINIC_GMAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-4 hover:underline"
                  data-testid="link-google-maps-nap"
                >
                  Get directions
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </a>
              </motion.div>

              <motion.div
                className="bg-white p-5 md:p-10 flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                data-testid="nap-hours"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6 text-white" weight="fill" />
                </div>
                <h4 className="font-semibold text-deep-navy text-lg mb-3">Office Hours</h4>
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-deep-navy/70 text-base">Monday - Friday</span>
                    <span className="font-semibold text-deep-navy text-base">8:30 AM - 5 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-deep-navy/70 text-base">Saturday</span>
                    <span className="font-semibold text-deep-navy text-base">8:30 AM - 12 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-deep-navy/70 text-base">Sunday</span>
                    <span className="font-semibold text-deep-navy/40 text-base">Closed</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-5 md:p-10 sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex-1">
                  <p className="text-deep-navy/50 text-base leading-relaxed">
                    Walk-ins welcome for established patients. New patients, please call ahead so we can prepare your visit and have enough time dedicated to you.
                  </p>
                </div>
                <a
                  href="tel:2394230205"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-colors flex-shrink-0"
                  data-testid="button-call-now"
                >
                  <Phone className="w-5 h-5" weight="fill" />
                  Call now
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-6 rounded-[24px] overflow-hidden border border-deep-navy/6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PrivacySafeGoogleMap
            className="h-[280px] w-full"
            iframeTestId="map-google-embed-nap"
            loadButtonTestId="cta-load-map-nap"
            title="Faithful Care Medical Services - 9955 Tamiami Trail N. Suite 2, Naples, FL 34108"
            wrapperTestId="map-google-wrapper-nap"
          />
        </motion.div>
      </div>
    </section>
  );
}
