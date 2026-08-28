import * as React from "react";
import type { MarqueeItem } from "@/lib/marquee-data";

interface ImageMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  className?: string;
}

const HOVER_SCALE = 1.6;
const BG_COLOR = "#fafaf8";

function useResponsiveSize() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function ImageMarquee({ items, speed = 50, className }: ImageMarqueeProps) {
  const singleSetRef = React.useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const uniqueId = React.useId().replace(/:/g, "");
  const isMobile = useResponsiveSize();
  const reducedMotion = usePrefersReducedMotion();
  const MARQUEE_HEIGHT = isMobile ? 80 : 110;
  const IMAGE_SIZE = isMobile ? 56 : 74;
  const IMG_MARGIN = isMobile ? 12 : 20;

  React.useEffect(() => {
    if (!singleSetRef.current) return;
    const measure = () => {
      if (singleSetRef.current) {
        setSingleSetWidth(singleSetRef.current.scrollWidth);
      }
    };
    measure();
    const imgs = singleSetRef.current.querySelectorAll("img");
    let loaded = 0;
    imgs.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener("load", () => {
          loaded++;
          if (loaded >= imgs.length) measure();
        }, { once: true });
      }
    });
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, isMobile, reducedMotion]);

  const duration = singleSetWidth > 0 ? singleSetWidth / speed : 30;

  const renderItems = (setItems: MarqueeItem[], keyPrefix: string) =>
    setItems.map((item, index) => {
      if (item.type === "image") {
        return (
          <div
            key={`${keyPrefix}-${index}`}
            className="marquee-img-box flex-shrink-0"
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              marginLeft: IMG_MARGIN,
              marginRight: IMG_MARGIN,
              position: "relative",
            }}
          >
            <img
              src={item.src}
              alt={item.alt || ""}
              draggable={false}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: 14,
                objectFit: "cover",
                display: "block",
                transition: "transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.35s ease",
                cursor: "default",
                position: "relative",
                zIndex: 1,
              }}
              loading="lazy"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = `scale(${HOVER_SCALE})`;
                el.style.zIndex = "50";
                el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "scale(1)";
                el.style.zIndex = "1";
                el.style.boxShadow = "none";
              }}
            />
          </div>
        );
      }

      return (
        <span
          key={`${keyPrefix}-${index}`}
          className="flex-shrink-0 select-none whitespace-nowrap"
          style={{
            marginLeft: isMobile ? 16 : 28,
            marginRight: isMobile ? 16 : 28,
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "hsl(var(--deep-navy) / 0.18)",
          }}
        >
          {item.label}
        </span>
      );
    });

  if (reducedMotion) {
    return (
      <section
        className={`relative ${className || ""}`}
        style={{
          minHeight: MARQUEE_HEIGHT,
          backgroundColor: BG_COLOR,
          marginTop: "clamp(32px, 4vw, 56px)",
          marginBottom: "clamp(32px, 4vw, 56px)",
        }}
        data-testid="section-image-marquee"
      >
        <div className="container-radical flex flex-wrap items-center justify-center gap-y-3 py-3">
          {renderItems(items, "static")}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative ${className || ""}`}
      style={{
        height: MARQUEE_HEIGHT,
        backgroundColor: BG_COLOR,
        marginTop: "clamp(32px, 4vw, 56px)",
        marginBottom: "clamp(32px, 4vw, 56px)",
      }}
      data-testid="section-image-marquee"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, ${BG_COLOR} 0%, transparent 6%, transparent 94%, ${BG_COLOR} 100%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          overflowX: "clip",
          overflowY: "visible",
        }}
      >
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{ overflow: "visible" }}
        >
          <div
            className={`mq-track-${uniqueId} flex items-center h-full`}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
              animation: reducedMotion ? "none" : undefined,
              willChange: "transform",
              width: "max-content",
            }}
          >
            <div ref={singleSetRef} className="flex items-center" style={{ width: "max-content" }}>
              {renderItems(items, "a")}
            </div>
            <div className="flex items-center" style={{ width: "max-content" }} aria-hidden="true">
              {renderItems(items, "b")}
            </div>
            <div className="flex items-center" style={{ width: "max-content" }} aria-hidden="true">
              {renderItems(items, "c")}
            </div>
            <div className="flex items-center" style={{ width: "max-content" }} aria-hidden="true">
              {renderItems(items, "d")}
            </div>
            <div className="flex items-center" style={{ width: "max-content" }} aria-hidden="true">
              {renderItems(items, "e")}
            </div>
            <div className="flex items-center" style={{ width: "max-content" }} aria-hidden="true">
              {renderItems(items, "f")}
            </div>
          </div>
        </div>
      </div>

      {singleSetWidth > 0 && (
        <style>{`
          @keyframes mq_${uniqueId} {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${singleSetWidth}px); }
          }
          .mq-track-${uniqueId} {
            animation: mq_${uniqueId} ${duration}s linear infinite;
          }
        `}</style>
      )}
    </section>
  );
}
