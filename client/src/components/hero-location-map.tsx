import * as React from "react";
import { motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import floridaGeoJson from "@/assets/data/florida-outline.json";

interface HeroLocationMapProps {
  lat: number;
  lng: number;
  label?: string;
  zoom?: number;
}

const NAPLES_OFFICE: [number, number] = [-81.795, 26.142];

const CITY_MARKERS: { name: string; coords: [number, number] }[] = [
  { name: "Naples", coords: [-81.795, 26.142] },
  { name: "Marco Island", coords: [-81.729, 25.941] },
  { name: "Golden Gate", coords: [-81.700, 26.187] },
  { name: "Immokalee", coords: [-81.417, 26.419] },
  { name: "Bonita Springs", coords: [-81.795, 26.340] },
  { name: "Estero", coords: [-81.807, 26.438] },
  { name: "Fort Myers", coords: [-81.872, 26.640] },
  { name: "Cape Coral", coords: [-81.949, 26.563] },
];

const DESTINATIONS = CITY_MARKERS.filter((c) => c.name !== "Naples");

function interpolateCurvedArc(from: [number, number], to: [number, number], steps = 40): [number, number][] {
  const points: [number, number][] = [];
  const midLng = (from[0] + to[0]) / 2;
  const midLat = (from[1] + to[1]) / 2;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const offsetLng = midLng + dy * 0.15;
  const offsetLat = midLat - dx * 0.15;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const lng = u * u * from[0] + 2 * u * t * offsetLng + t * t * to[0];
    const lat = u * u * from[1] + 2 * u * t * offsetLat + t * t * to[1];
    points.push([lng, lat]);
  }
  return points;
}

const floridaStates = floridaGeoJson as any;

function CityDot({ x, y, isOffice, delay = 0 }: { x: number; y: number; isOffice: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
      >
        {isOffice && (
          <>
            <motion.circle
              r={18}
              fill="none"
              stroke="rgba(59,130,246,0.5)"
              strokeWidth={1.5}
              animate={{ opacity: [0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              r={10}
              fill="none"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth={1}
              animate={{ opacity: [0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
          </>
        )}

        <circle
          r={isOffice ? 5 : 4}
          fill={isOffice ? "rgba(59,130,246,0.9)" : "hsl(183,100%,40%)"}
          stroke="white"
          strokeWidth={isOffice ? 2 : 1.5}
        />
      </motion.g>
    </g>
  );
}

function AnimatedArc({ d, delay, duration }: { d: string; delay: number; duration: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth={1.5}
      strokeDasharray="6 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.4, 0.7, 1],
      }}
    />
  );
}

function ArrivalPin({ x, y, delay, duration }: { x: number; y: number; delay: number; duration: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.g
        initial={{ opacity: 0, translateY: 6 }}
        animate={{
          opacity: [0, 0, 1, 1, 0, 0],
          translateY: [6, 6, -18, -18, -18, 6],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeOut",
          times: [0, 0.38, 0.44, 0.68, 0.78, 1],
        }}
      >
        <g transform="translate(-8, -16) scale(0.18)">
          <path
            d="M46 10C30.5 10 18 22.4 18 37.7 18 58.5 46 82 46 82s28-23.5 28-44.3C74 22.4 61.5 10 46 10z"
            fill="#EA4335"
          />
          <circle cx="46" cy="37" r="10" fill="white" />
        </g>
      </motion.g>
    </g>
  );
}

export function HeroLocationMap({ lat, lng, label, zoom = 12 }: HeroLocationMapProps) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 400, height: 500 });

  React.useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setDimensions({ width, height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mapCenter: [number, number] = React.useMemo(() => {
    return [-81.75, 26.30];
  }, []);

  const scale = 18000;

  const projection = React.useMemo(() => {
    return geoMercator()
      .center(mapCenter)
      .scale(scale)
      .translate([dimensions.width / 2, dimensions.height / 2]);
  }, [mapCenter[0], mapCenter[1], scale, dimensions.width, dimensions.height]);

  const pathGenerator = React.useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  const arcs = React.useMemo(() => {
    return DESTINATIONS.map((dest) => {
      const pts = interpolateCurvedArc(NAPLES_OFFICE, dest.coords);
      return {
        name: dest.name,
        geo: {
          type: "Feature" as const,
          properties: {},
          geometry: { type: "LineString" as const, coordinates: pts },
        },
      };
    });
  }, []);

  return (
    <motion.div
      className="hero-map-glass"
      data-testid="hero-location-map"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-map-glass-inner">
        <div className="hero-map-glow hero-map-glow-tl" />
        <div className="hero-map-glow hero-map-glow-tr" />
        <div className="hero-map-glow hero-map-glow-bl" />
        <div className="hero-map-glow hero-map-glow-br" />

        <div className="hero-map-container">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              <clipPath id="map-clip">
                <rect x={0} y={0} width={dimensions.width} height={dimensions.height} rx={16} />
              </clipPath>
              <clipPath id="land-clip">
                {floridaStates.features.map((feature: any, i: number) => (
                  <path
                    key={`land-clip-${i}`}
                    d={pathGenerator(feature as GeoPermissibleObjects) || ""}
                  />
                ))}
              </clipPath>
              <pattern id="land-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
              </pattern>
            </defs>

            <g clipPath="url(#map-clip)">
              {floridaStates.features.map((feature: any, i: number) => (
                <path
                  key={`state-${i}`}
                  d={pathGenerator(feature as GeoPermissibleObjects) || ""}
                  fill="rgba(255,255,255,0.22)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={0.6}
                />
              ))}
              <rect
                x={0}
                y={0}
                width={dimensions.width}
                height={dimensions.height}
                fill="url(#land-grid)"
                clipPath="url(#land-clip)"
              />
            </g>

            {arcs.map((arc, i) => {
              const d = pathGenerator(arc.geo as GeoPermissibleObjects) || "";
              if (!d) return null;
              return (
                <AnimatedArc
                  key={arc.name}
                  d={d}
                  delay={i * 0.6}
                  duration={4}
                />
              );
            })}

            {CITY_MARKERS.map((city, i) => {
              const projected = projection(city.coords);
              if (!projected) return null;
              const isOffice = city.name === "Naples";
              return (
                <CityDot
                  key={city.name}
                  x={projected[0]}
                  y={projected[1]}
                  isOffice={isOffice}
                  delay={0.2 + i * 0.08}
                />
              );
            })}

            {DESTINATIONS.map((dest, i) => {
              const projected = projection(dest.coords);
              if (!projected) return null;
              return (
                <ArrivalPin
                  key={`pin-${dest.name}`}
                  x={projected[0]}
                  y={projected[1]}
                  delay={i * 0.6}
                  duration={4}
                />
              );
            })}
          </svg>
        </div>

        <div className="hero-map-labels" data-testid="hero-map-labels">
          {CITY_MARKERS.map((city, i) => {
            const isOffice = city.name === "Naples";
            const displayName = city.name;
            const isCurrentPage = city.name === label;
            return (
              <motion.div
                key={city.name}
                className={`hero-map-label-pill${isCurrentPage ? " hero-map-label-active" : ""}`}
                data-office={isOffice ? "true" : undefined}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: "easeOut" }}
                data-testid={`map-label-${city.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="hero-map-label-dot" data-office={isOffice ? "true" : undefined} />
                <span className="hero-map-label-text">{displayName}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="hero-map-top-bar"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          data-testid="hero-map-top-bar"
        >
          <div className="hero-map-service-badge" data-testid="badge-service-area">
            <span className="hero-map-pulse-dot" />
            <span className="hero-map-badge-text">Service Area</span>
          </div>
          <a
            href="tel:+1-239-423-0205"
            className="hero-map-call-btn"
            data-testid="button-call-now"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call Now</span>
          </a>
        </motion.div>

        <motion.a
          href="https://maps.app.goo.gl/wfopfjr5d1Yrksqv9"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-map-google-link"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
          data-testid="link-google-maps"
        >
          <svg width="16" height="16" viewBox="0 0 92 92" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 10C30.5 10 18 22.4 18 37.7 18 58.5 46 82 46 82s28-23.5 28-44.3C74 22.4 61.5 10 46 10z" fill="#EA4335"/>
            <circle cx="46" cy="37" r="10" fill="white"/>
          </svg>
          <span>View on Google Maps</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </motion.a>

        <div className="hero-map-border-accent" />
      </div>
    </motion.div>
  );
}
