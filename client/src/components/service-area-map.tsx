import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Map as LeafletMap } from "leaflet";

const NAPLES_CENTER: [number, number] = [26.142, -81.795];

const SERVICE_DESTINATIONS: { name: string; lat: number; lng: number; county: string }[] = [
  { name: "Fort Myers", lat: 26.640, lng: -81.872, county: "Lee" },
  { name: "Cape Coral", lat: 26.563, lng: -81.949, county: "Lee" },
  { name: "Punta Gorda", lat: 26.929, lng: -82.045, county: "Charlotte" },
  { name: "LaBelle", lat: 26.762, lng: -81.438, county: "Hendry" },
  { name: "Marco Island", lat: 25.941, lng: -81.729, county: "Collier" },
  { name: "Immokalee", lat: 26.419, lng: -81.417, county: "Collier" },
  { name: "Bonita Springs", lat: 26.340, lng: -81.795, county: "Lee" },
  { name: "Estero", lat: 26.438, lng: -81.807, county: "Lee" },
];

const LOCATION_LINKS: { name: string; href?: string }[] = [
  { name: "Naples", href: "/locations/naples" },
  { name: "Marco Island", href: "/locations/marco-island" },
  { name: "Golden Gate", href: "/locations/golden-gate" },
  { name: "Immokalee", href: "/locations/immokalee" },
  { name: "Bonita Springs", href: "/locations/bonita-springs" },
  { name: "Estero", href: "/locations/estero" },
  { name: "Fort Myers", href: "/locations/fort-myers" },
  { name: "Cape Coral", href: "/locations/cape-coral" },
];

interface ServiceAreaMapProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  disclaimer?: string;
  mapAriaLabel?: string;
  locationLinks?: { name: string; href?: string }[];
}

export default function ServiceAreaMap({
  eyebrow = "Our Service Area",
  title = (
    <>
      Based in Naples, serving all<br className="hidden lg:block" /> of Southwest Florida.
    </>
  ),
  description = "Our office is located in Naples, but we proudly provide compassionate, high-quality primary care across Collier, Lee, Charlotte, Hendry, and Glades counties.",
  disclaimer = "Service areas only, not physical locations",
  mapAriaLabel = "Map showing Faithful Care service area across Southwest Florida",
  locationLinks = LOCATION_LINKS,
}: ServiceAreaMapProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "300px 0px" }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      await import("leaflet/dist/leaflet.css");
      if (cancelled) return;
      const { default: L } = await import("leaflet");
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [26.45, -81.65],
        zoom: 9,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      const naplesIcon = L.divIcon({
        html: `
          <div style="position:relative;width:40px;height:40px;">
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:hsla(216,100%,50%,0.15);animation:pulse-ring 2s ease-out infinite;"></div>
          </div>
        `,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const naplesMarker = L.marker(NAPLES_CENTER, {
        icon: naplesIcon,
        interactive: false,
        keyboard: false,
        alt: "Faithful Care Medical Services in Naples, Florida",
      }).addTo(map);
      const naplesEl = naplesMarker.getElement();
      if (naplesEl) {
        naplesEl.setAttribute("aria-label", "Faithful Care Medical Services in Naples, Florida");
        naplesEl.removeAttribute("role");
        naplesEl.removeAttribute("tabindex");
      }
      naplesMarker.bindTooltip("Faithful Care, Naples", {
        permanent: true,
        direction: "top",
        offset: [0, -24],
        className: "map-naples-tooltip",
      });

      SERVICE_DESTINATIONS.forEach((dest) => {
        const line = L.polyline(
          [NAPLES_CENTER, [dest.lat, dest.lng]],
          {
            color: "hsl(216, 100%, 50%)",
            weight: 1.5,
            opacity: 0.4,
            dashArray: "6 8",
          }
        ).addTo(map);
        const el = line.getElement();
        if (el) el.classList.add("animated-dash-line");
      });

      L.circle([26.44, -81.75], {
        radius: 62000,
        color: "hsl(216, 100%, 50%)",
        weight: 1.5,
        opacity: 0.25,
        fillColor: "hsl(216, 100%, 50%)",
        fillOpacity: 0.04,
        dashArray: "8 6",
      }).addTo(map);

      cleanup = () => {
        map.remove();
        mapInstanceRef.current = null;
      };
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [shouldLoad]);

  return (
    <section className="section-gap bg-white" data-testid="section-service-area">
      <div className="container-radical">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">{eyebrow}</p>
          </div>
          <h2 className="h2 text-deep-navy">
            {title}
          </h2>
          <p className="body-md text-deep-navy/60 mt-6 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="container-radical">
        <motion.div
          ref={containerRef}
          className="relative w-full"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-primary/30"
            style={{ zIndex: 0, isolation: "isolate" }}
          >
            <div
              ref={mapRef}
              className="w-full bg-white"
              style={{ height: "clamp(380px, calc(55vh + 20px), 740px)" }}
              data-testid="map-leaflet"
              aria-label={mapAriaLabel}
            />
          </div>

          <div className="absolute top-4 right-4 md:top-5 md:right-6 z-10">
            <motion.div
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-amber-300/40 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              data-testid="service-area-disclaimer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span className="text-xs font-medium text-deep-navy/70">{disclaimer}</span>
            </motion.div>
          </div>

          <div className="hidden md:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 flex-col gap-1.5">
            {locationLinks.map((loc, i) =>
              loc.href ? (
                <motion.a
                  key={loc.name}
                  href={loc.href}
                  className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-primary/15 hover:bg-primary hover:border-primary shadow-sm hover:shadow-lg transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  data-testid={`location-link-${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "instant" });
                    window.location.href = loc.href!;
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-white shrink-0 transition-colors duration-200" />
                  <span className="text-sm font-medium text-deep-navy group-hover:text-white whitespace-nowrap transition-colors duration-200">
                    {loc.name}
                  </span>
                  <svg className="w-3.5 h-3.5 text-primary/40 group-hover:text-white/70 ml-auto transition-all duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ) : (
                <motion.div
                  key={loc.name}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-primary/15 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  data-testid={`location-link-${i}`}
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm font-medium text-deep-navy whitespace-nowrap">
                    {loc.name}
                  </span>
                </motion.div>
              )
            )}
          </div>

        </motion.div>

        <div className="md:hidden mt-4 grid grid-cols-2 gap-2">
          {locationLinks.map((loc, i) =>
            loc.href ? (
              <motion.a
                key={loc.name}
                href={loc.href}
                className="group flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-primary/15 hover:bg-primary hover:border-primary shadow-sm transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                data-testid={`location-link-mobile-${i}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "instant" });
                  window.location.href = loc.href!;
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-white shrink-0 transition-colors duration-200" />
                <span className="text-sm font-medium text-deep-navy group-hover:text-white whitespace-nowrap transition-colors duration-200">
                  {loc.name}
                </span>
              </motion.a>
            ) : (
              <motion.div
                key={loc.name}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-primary/15 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                data-testid={`location-link-mobile-${i}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-medium text-deep-navy whitespace-nowrap">
                  {loc.name}
                </span>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
