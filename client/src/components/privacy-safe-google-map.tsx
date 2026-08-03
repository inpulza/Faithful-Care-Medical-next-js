import * as React from "react";
import { MapPin } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CLINIC_FULL_ADDRESS, CLINIC_GMAPS_EMBED_URL } from "@/lib/clinic-location";

interface PrivacySafeGoogleMapProps {
  className?: string;
  iframeTestId: string;
  loadButtonTestId?: string;
  locale?: "en" | "es";
  title: string;
  wrapperTestId?: string;
}

const COPY = {
  en: {
    load: "Load interactive map",
    disclosure: "Loading connects your browser to Google Maps.",
  },
  es: {
    load: "Cargar mapa interactivo",
    disclosure: "Al cargarlo, su navegador se conectará con Google Maps.",
  },
} as const;

export function PrivacySafeGoogleMap({
  className,
  iframeTestId,
  loadButtonTestId = "cta-load-map",
  locale = "en",
  title,
  wrapperTestId,
}: PrivacySafeGoogleMapProps) {
  const [loaded, setLoaded] = React.useState(false);
  const copy = COPY[locale];

  return (
    <div
      className={cn("relative overflow-hidden bg-primary/5", className)}
      data-testid={wrapperTestId}
    >
      {loaded ? (
        <iframe
          src={CLINIC_GMAPS_EMBED_URL}
          className="absolute inset-0 block h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          title={title}
          data-testid={iframeTestId}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-deep-navy transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          data-testid={loadButtonTestId}
          aria-label={`${copy.load}: ${CLINIC_FULL_ADDRESS}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-white shadow-sm">
            <MapPin weight="fill" className="h-7 w-7 text-primary" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold md:text-lg">{copy.load}</span>
          <span className="max-w-sm text-center text-sm leading-relaxed text-deep-navy/70">
            {CLINIC_FULL_ADDRESS}<br />
            {copy.disclosure}
          </span>
        </button>
      )}
    </div>
  );
}
