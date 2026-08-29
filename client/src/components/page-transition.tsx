import * as React from "react";
import { useLocation } from "@/lib/router";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData, standaloneLinks } from "@/lib/navigation-data";
import { isConditionRoute } from "@shared/condition-route-paths";

function buildRouteLabels(): Record<string, string> {
  const labels: Record<string, string> = {
    "/": "Home",
    "/contact": "Contact",
    "/design-system": "Design System",
    "/es": "Inicio",
    "/primary-care": "Primary Care",
    "/palliative-care": "Palliative Care",
    "/es/": "Inicio",
    "/es/medico-de-familia-naples": "Médico de Familia",
    "/es/cuidados-paliativos-naples": "Cuidados Paliativos",
    "/es/seguros-y-medicare": "Seguros y Medicare",
    "/es/contacto": "Contacto",
    "/es/pacientes-nuevos": "Pacientes nuevos",
  };

  for (const category of navigationData) {
    for (const subPage of category.subPages) {
      labels[subPage.href] = subPage.title;
    }
  }

  for (const link of standaloneLinks) {
    if (!labels[link.href]) {
      labels[link.href] = link.title;
    }
  }

  return labels;
}

const routeLabels = buildRouteLabels();

function getLabelForRoute(href: string): string {
  if (routeLabels[href]) return routeLabels[href];

  if (href.startsWith("/primary-care/")) return "Primary Care";
  if (href.startsWith("/palliative-care/")) return "Palliative Care";
  if (href.startsWith("/locations/")) return "Locations";

  return "Faithful Care";
}

function pathForHref(href: string): string {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href.split(/[?#]/, 1)[0] || "/";
  }
}

interface TransitionContextValue {
  navigateTo: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = React.createContext<TransitionContextValue>({
  navigateTo: () => {},
  isTransitioning: false,
});

export function usePageTransition() {
  return React.useContext(TransitionContext);
}

type Phase = "idle" | "exiting" | "holding" | "entering";

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [label, setLabel] = React.useState("");
  const phaseRef = React.useRef<Phase>("idle");
  const locationRef = React.useRef(location);
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const transitionIdRef = React.useRef(0);
  const prefersReducedMotion = React.useRef(false);

  React.useEffect(() => {
    locationRef.current = location;
  }, [location]);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  React.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const navigateTo = React.useCallback(
    (href: string) => {
      if (phaseRef.current !== "idle") return;
      if (href === locationRef.current) return;
      const targetPath = pathForHref(href);
      const requiresPrivacyBoundary = isConditionRoute(locationRef.current)
        || isConditionRoute(targetPath);

      if (prefersReducedMotion.current) {
        if (requiresPrivacyBoundary) {
          window.location.assign(href);
          return;
        }
        setLocation(href);
        window.scrollTo(0, 0);
        return;
      }

      clearTimers();
      const currentId = ++transitionIdRef.current;

      setLabel(getLabelForRoute(href));
      setPhase("exiting");
      phaseRef.current = "exiting";

      const t1 = setTimeout(() => {
        if (transitionIdRef.current !== currentId) return;

        if (requiresPrivacyBoundary) {
          window.location.assign(href);
          return;
        }

        setLocation(href);
        window.scrollTo(0, 0);
        setPhase("holding");
        phaseRef.current = "holding";

        const t2 = setTimeout(() => {
          if (transitionIdRef.current !== currentId) return;

          setPhase("entering");
          phaseRef.current = "entering";

          const t3 = setTimeout(() => {
            if (transitionIdRef.current !== currentId) return;

            setPhase("idle");
            phaseRef.current = "idle";
          }, 700);
          timersRef.current.push(t3);
        }, 400);
        timersRef.current.push(t2);
      }, 700);
      timersRef.current.push(t1);
    },
    [setLocation, clearTimers],
  );

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;

      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;

      if (
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#") ||
        href.startsWith("//")
      )
        return;

      if (href === locationRef.current) return;

      // Once an internal transition has started, keep later clicks from
      // reaching NextLink. In particular, a rapid second click must not turn
      // a privacy-boundary document navigation into an interim SPA route.
      if (phaseRef.current !== "idle") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      navigateTo(href);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [navigateTo]);

  const isActive = phase !== "idle";

  return (
    <TransitionContext.Provider
      value={{ navigateTo, isTransitioning: isActive }}
    >
      {children}
      <AnimatePresence>
        {isActive && (
          <CurtainOverlay key="page-curtain" phase={phase} label={label} />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

function CurtainOverlay({ phase, label }: { phase: Phase; label: string }) {
  const targetY =
    phase === "exiting" || phase === "holding" ? "0%" : "-100%";

  return (
    <div
      className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="page-transition-overlay"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ y: "100%" }}
        animate={{ y: targetY }}
        transition={{
          duration: 0.65,
          ease: CURTAIN_EASE,
        }}
      >
        <svg
          className="absolute w-full left-0"
          style={{ top: "-79px", height: "80px" }}
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-grad-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(216, 100%, 50%)" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(216, 100%, 50%)" stopOpacity="0.72" />
            </linearGradient>
          </defs>
          <path
            d="M0 80 L0 60 Q180 20 360 40 Q540 60 720 30 Q900 0 1080 25 Q1260 50 1440 15 L1440 80 Z"
            fill="url(#wave-grad-top)"
          />
        </svg>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "hsla(216, 100%, 50%, 0.72)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
          }}
        >
          <div className="text-center px-8">
            <motion.div
              className="flex justify-center mb-5"
              initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
              animate={{
                opacity: phase === "entering" ? 0 : 0.5,
                scale: phase === "entering" ? 0.4 : 1,
                rotate: phase === "entering" ? 0 : 180,
              }}
              transition={{
                duration: 0.35,
                delay: phase === "exiting" ? 0.3 : 0,
                rotate: {
                  duration: 0.6,
                  delay: phase === "exiting" ? 0.25 : 0,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="11"
                  y="2"
                  width="6"
                  height="24"
                  rx="3"
                  fill="white"
                />
                <rect
                  x="2"
                  y="11"
                  width="24"
                  height="6"
                  rx="3"
                  fill="white"
                />
              </svg>
            </motion.div>

            <motion.h2
              className="font-serif text-white font-bold drop-shadow-sm"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: phase === "entering" ? 0 : 1,
                y: phase === "entering" ? -30 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: phase === "exiting" ? 0.28 : 0,
              }}
            >
              {label}
            </motion.h2>

            <motion.div
              className="mt-3 mx-auto bg-white/30 rounded-full"
              style={{ width: "40px", height: "2px" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: phase === "entering" ? 0 : 0.8,
                scaleX: phase === "entering" ? 0 : 1,
              }}
              transition={{
                duration: 0.35,
                delay: phase === "exiting" ? 0.35 : 0,
              }}
            />
          </div>
        </div>

        <svg
          className="absolute w-full left-0 rotate-180"
          style={{ bottom: "-79px", height: "80px" }}
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-grad-bottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(216, 100%, 50%)" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(216, 100%, 50%)" stopOpacity="0.72" />
            </linearGradient>
          </defs>
          <path
            d="M0 80 L0 60 Q180 20 360 40 Q540 60 720 30 Q900 0 1080 25 Q1260 50 1440 15 L1440 80 Z"
            fill="url(#wave-grad-bottom)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
