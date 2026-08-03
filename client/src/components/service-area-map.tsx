import * as React from "react";
import { geoMercator, geoPath } from "d3-geo";
import { motion } from "framer-motion";
import type { GeoPermissibleObjects } from "d3-geo";
import floridaGeoJson from "@/assets/data/florida-outline.json";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 620;
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

const projection = geoMercator()
  .center([-81.65, 26.45])
  .scale(27_000)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
const floridaPath = geoPath(projection)(
  floridaGeoJson as unknown as GeoPermissibleObjects,
) ?? "";

function projectPoint(lat: number, lng: number): [number, number] {
  return projection([lng, lat]) ?? [0, 0];
}

const naplesPoint = projectPoint(...NAPLES_CENTER);
const destinationPoints = SERVICE_DESTINATIONS.map((destination) => ({
  ...destination,
  point: projectPoint(destination.lat, destination.lng),
}));

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
          <h2 className="h2 text-deep-navy">{title}</h2>
          <p className="body-md text-deep-navy/60 mt-6 max-w-2xl mx-auto">{description}</p>
        </motion.div>
      </div>

      <div className="container-radical">
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-primary/30 bg-[#f4f9ff]"
            style={{ zIndex: 0, isolation: "isolate" }}
          >
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="block w-full"
              style={{ height: "clamp(300px, 62vw, 620px)" }}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={mapAriaLabel}
              data-testid="map-service-area-vector"
            >
              <title>{mapAriaLabel}</title>
              <defs>
                <radialGradient id="service-area-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1473e6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#1473e6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#f4f9ff" />
              <path d={floridaPath} fill="#e6f1ff" stroke="#0b5fc7" strokeOpacity="0.28" strokeWidth="2" />
              <circle cx={naplesPoint[0]} cy={naplesPoint[1]} r="235" fill="url(#service-area-glow)" />
              {destinationPoints.map((destination) => (
                <g key={destination.name}>
                  <line
                    x1={naplesPoint[0]}
                    y1={naplesPoint[1]}
                    x2={destination.point[0]}
                    y2={destination.point[1]}
                    stroke="#1473e6"
                    strokeOpacity="0.38"
                    strokeWidth="2"
                    strokeDasharray="7 9"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={destination.point[0]}
                    cy={destination.point[1]}
                    r="6"
                    fill="#16a6a1"
                    stroke="#ffffff"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={destination.point[0] + (destination.point[0] < naplesPoint[0] ? -11 : 11)}
                    y={destination.point[1] - 10}
                    textAnchor={destination.point[0] < naplesPoint[0] ? "end" : "start"}
                    className="fill-deep-navy text-[30px] font-semibold md:text-[15px]"
                  >
                    {destination.name}
                  </text>
                </g>
              ))}
              <circle cx={naplesPoint[0]} cy={naplesPoint[1]} r="14" fill="#0b5fc7" stroke="#ffffff" strokeWidth="5" />
              <text
                x={naplesPoint[0] + 22}
                y={naplesPoint[1] + 5}
                className="fill-deep-navy text-[32px] font-bold md:text-[17px]"
              >
                Faithful Care, Naples
              </text>
            </svg>
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
                  onClick={(event) => {
                    event.preventDefault();
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
                  <span className="text-sm font-medium text-deep-navy whitespace-nowrap">{loc.name}</span>
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
                onClick={(event) => {
                  event.preventDefault();
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
                <span className="text-sm font-medium text-deep-navy whitespace-nowrap">{loc.name}</span>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
