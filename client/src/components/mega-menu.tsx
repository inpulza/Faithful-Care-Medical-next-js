import * as React from "react";
import { Link, useLocation } from "@/lib/router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, List, Phone } from "@phosphor-icons/react";
import { navigationData, standaloneLinks } from "@/lib/navigation-data";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/components/page-transition";
import { hreflangPairForPath, isSpanishPath } from "@shared/seo-data";

interface MegaMenuProps {
  className?: string;
}

export function MegaMenu({ className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [location, setLocation] = useLocation();
  const isLocationPage = location.startsWith("/locations/");
  const normalizedPath = location === "/es/" ? "/es" : location;
  const isSpanish = isSpanishPath(normalizedPath);
  const hreflangPair = hreflangPairForPath(normalizedPath);
  const englishHref = isSpanish ? (hreflangPair?.en ?? "/") : normalizedPath;
  const spanishHref = isSpanish ? normalizedPath : (hreflangPair?.es ?? "/es");

  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const { navigateTo } = usePageTransition();
  const navTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, []);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      navigateTo(href);
    }, 200);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.header
            className={cn(
              "w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300",
              isScrolled
                ? "bg-white border-b-2 border-primary/10"
                : "bg-transparent border-b-2 border-transparent",
              className
            )}
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            data-testid="header-navigation"
          >
            <div className="w-full" style={{ paddingInline: 'clamp(16px, 3vw, 64px)', paddingTop: 'env(safe-area-inset-top, 0px)' }}>
              <div className="flex items-center justify-between" style={{ height: 'clamp(64px, 5vw, 80px)' }}>
                <Link href="/" data-testid="link-home">
                  <div className="flex items-center" style={{ gap: 'clamp(8px, 0.8vw, 12px)' }}>
                    <img
                      src="/images/faithful-care-logo.webp"
                      alt="Faithful Care Medical Services logo"
                      width={220}
                      height={189}
                      fetchPriority="high"
                      decoding="async"
                      className={cn("w-auto", isLocationPage && !isScrolled && "brightness-0 invert")}
                      style={{ height: 'clamp(36px, 3.2vw, 48px)' }}
                    />
                    <div className="hidden sm:flex flex-col items-start">
                      <span className={cn("font-serif font-bold whitespace-nowrap leading-tight", isLocationPage && !isScrolled ? "text-white" : "text-deep-navy")} style={{ fontSize: 'clamp(18px, 1.6vw, 24px)', letterSpacing: '0.02em' }}>
                        Faithful Care
                      </span>
                      <span className={cn("uppercase", isLocationPage && !isScrolled ? "text-white/70" : "text-deep-navy/60")} style={{ fontSize: 'clamp(9px, 0.75vw, 12px)', letterSpacing: '0.18em' }}>
                        Medical Services
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center" style={{ gap: 'clamp(8px, 1vw, 16px)' }}>
                  <div
                    className={cn(
                      "flex items-stretch rounded-xl border overflow-hidden font-semibold text-[13px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
                      isLocationPage && !isScrolled ? "border-white/30" : "border-primary/30"
                    )}
                    style={{
                      background: 'rgba(255, 255, 255, 0.55)',
                      backdropFilter: 'blur(16px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    }}
                    data-testid="lang-selector"
                  >
                    {isSpanish ? (
                      <Link
                        href={englishHref}
                        className="flex items-center text-deep-navy hover:text-primary transition-colors"
                        style={{ paddingInline: 'clamp(10px, 1vw, 14px)', paddingBlock: 'clamp(10px, 0.9vw, 14px)' }}
                        aria-label="View this page in English"
                        lang="en"
                        data-testid="link-lang-en"
                      >
                        EN
                      </Link>
                    ) : (
                      <span
                        className="flex items-center bg-primary text-white"
                        style={{ paddingInline: 'clamp(10px, 1vw, 14px)', paddingBlock: 'clamp(10px, 0.9vw, 14px)' }}
                        aria-current="page"
                        data-testid="text-lang-en"
                      >
                        EN
                      </span>
                    )}
                    {isSpanish ? (
                      <span
                        className="flex items-center bg-primary text-white"
                        style={{ paddingInline: 'clamp(10px, 1vw, 14px)', paddingBlock: 'clamp(10px, 0.9vw, 14px)' }}
                        aria-current="page"
                        data-testid="text-lang-es"
                      >
                        ES
                      </span>
                    ) : (
                      <Link
                        href={spanishHref}
                        className="flex items-center text-deep-navy hover:text-primary transition-colors"
                        style={{ paddingInline: 'clamp(10px, 1vw, 14px)', paddingBlock: 'clamp(10px, 0.9vw, 14px)' }}
                        aria-label="Ver esta página en español"
                        lang="es"
                        data-testid="link-lang-es"
                      >
                        ES
                      </Link>
                    )}
                  </div>
                  <button
                    className="flex items-center gap-2 rounded-xl bg-primary text-white font-semibold text-[15px] hover:bg-primary/90 transition-all"
                    style={{ paddingInline: 'clamp(18px, 1.6vw, 28px)', paddingBlock: 'clamp(10px, 0.9vw, 14px)' }}
                    onClick={() => setIsOpen(true)}
                    data-testid="button-explore-menu"
                    aria-label="Explore our services"
                  >
                    <List weight="bold" className="w-5 h-5" />
                    <span>Explore</span>
                  </button>
                  <a
                    href="tel:2394230205"
                    className={cn("inline-flex items-center gap-2 rounded-xl border font-semibold text-[15px] transition-all whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.06)]", isLocationPage && !isScrolled ? "text-white border-white/30 hover:border-white/50" : "text-deep-navy border-primary/30 hover:border-primary/50")}
                    style={{
                      paddingInline: 'clamp(18px, 1.6vw, 28px)',
                      paddingBlock: 'clamp(10px, 0.9vw, 14px)',
                      background: 'rgba(255, 255, 255, 0.55)',
                      backdropFilter: 'blur(16px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    }}
                    aria-label="Call Now (239) 423-0205"
                    data-testid="button-get-started"
                  >
                    <Phone weight="fill" className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <FullscreenOverlay onClose={() => setIsOpen(false)} onNavigate={handleNavigate} />
        )}
      </AnimatePresence>
    </>
  );
}


function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      className="fixed top-5 right-5 md:top-8 md:right-8 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary border border-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors shadow-lg"
      onClick={onClick}
      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
      data-testid="button-close-menu"
      aria-label="Close menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <motion.line
          x1="6" y1="6" x2="18" y2="18"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
        <motion.line
          x1="18" y1="6" x2="6" y2="18"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />
      </svg>
    </motion.button>
  );
}

function FullscreenOverlay({ onClose, onNavigate }: { onClose: () => void; onNavigate: (href: string) => void }) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const allItems = [
    ...navigationData.map((cat) => ({ type: "category" as const, ...cat })),
    ...standaloneLinks.map((link) => ({ type: "link" as const, ...link })),
  ];

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-2xl overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        data-testid="fullscreen-menu-overlay"
      >
        <div className="flex items-center" style={{ paddingInline: 'clamp(16px, 3vw, 64px)', height: 'clamp(48px, min(5vw, 8vh), 80px)' }}>
          <Link href="/" onClick={() => onClose()} data-testid="overlay-logo">
            <div className="flex items-center" style={{ gap: 'clamp(8px, 0.8vw, 12px)' }}>
              <img
                src="/images/faithful-care-logo.webp"
                alt="Faithful Care Medical Services logo"
                width={220}
                height={189}
                decoding="async"
                className="w-auto"
                style={{ height: 'clamp(36px, 3.2vw, 48px)' }}
              />
              <div className="flex flex-col items-start">
                <span className="font-serif font-bold text-deep-navy whitespace-nowrap leading-tight" style={{ fontSize: 'clamp(18px, 1.6vw, 24px)', letterSpacing: '0.02em' }}>
                  Faithful Care
                </span>
                <span className="text-deep-navy/60 uppercase" style={{ fontSize: 'clamp(9px, 0.75vw, 12px)', letterSpacing: '0.18em' }}>
                  Medical Services
                </span>
              </div>
            </div>
          </Link>
        </div>

        <nav className="overflow-y-auto" style={{ paddingInline: 'clamp(24px, 3vw, 64px)', paddingTop: 'clamp(6px, min(3vw, 2vh), 48px)', paddingBottom: 'clamp(12px, min(5vw, 3vh), 96px)', height: 'calc(100dvh - clamp(48px, min(5vw, 8vh), 80px))' }}>
          <div>
            {allItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {item.type === "category" ? (
                  <AccordionNavItem
                    category={item}
                    index={index}
                    isExpanded={expandedId === item.id}
                    onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    hoveredIndex={hoveredIndex}
                    onHover={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                    onNavigate={onNavigate}
                    totalItems={allItems.length}
                  />
                ) : (
                  <StandaloneNavItem
                    item={item}
                    index={index}
                    hoveredIndex={hoveredIndex}
                    onHover={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                    onNavigate={onNavigate}
                    totalItems={allItems.length}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="lg:max-w-[55%]"
            style={{ marginTop: 'clamp(8px, min(3vw, 2vh), 40px)', paddingTop: 'clamp(4px, min(1vw, 1vh), 16px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-deep-navy/30 text-sm">
              <a href="tel:+1-239-423-0205" className="hover:text-primary transition-colors" data-testid="overlay-phone">
                (239) 423-0205
              </a>
              <a href="mailto:info@faithfulcaremedical.com" className="hover:text-primary transition-colors" data-testid="overlay-email">
                info@faithfulcaremedical.com
              </a>
              <span>9955 Tamiami Trail N. Suite 2, Naples, FL 34108</span>
            </div>
          </motion.div>
        </nav>
      </motion.div>

      <CloseButton onClick={onClose} />
    </>
  );
}

function AccordionNavItem({
  category,
  index,
  isExpanded,
  onToggle,
  hoveredIndex,
  onHover,
  onLeave,
  onNavigate,
  totalItems,
}: {
  category: (typeof navigationData)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
  onNavigate: (href: string) => void;
  totalItems: number;
}) {
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
  const [hoveredSubIndex, setHoveredSubIndex] = React.useState<number | null>(null);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={() => { onLeave(); setHoveredSubIndex(null); }}
      data-testid={`overlay-category-${category.id}`}
    >
      <div className="flex">
        <div className="lg:w-[55%] border-b border-deep-navy/8">
          <div
            className={cn(
              "w-full flex items-center justify-between group transition-opacity duration-300",
              isDimmed ? "opacity-30" : "opacity-100"
            )}
            style={{ paddingBlock: 'min(clamp(12px, 1.5vw, 24px), clamp(4px, 1.6vh, 24px))' }}
          >
            <button
              className="flex-1 min-w-0 text-left"
              onClick={category.hubHref ? () => onNavigate(category.hubHref!) : onToggle}
              data-testid={`overlay-trigger-${category.id}`}
              aria-label={category.hubHref ? `Go to ${category.title} overview page` : `Expand ${category.title}`}
            >
              <span className="font-serif font-bold text-deep-navy/30 group-hover:text-primary transition-colors text-left leading-[1.1] block" style={{ fontSize: 'min(clamp(28px, 3.2vw, 48px), clamp(17px, 4.5vh, 48px))' }}>
                {category.title}
              </span>
            </button>
            <motion.button
              className="rounded-full bg-deep-navy/5 border border-deep-navy/10 flex items-center justify-center text-deep-navy/30 group-hover:text-primary group-hover:bg-primary/5 transition-colors ml-4 flex-shrink-0"
              style={{ width: 'min(clamp(32px, 2.8vw, 40px), clamp(24px, 4vh, 40px))', height: 'min(clamp(32px, 2.8vw, 40px), clamp(24px, 4vh, 40px))' }}
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={onToggle}
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.title} services`}
              data-testid={`overlay-toggle-${category.id}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.button>
          </div>
        </div>
        <div className="hidden lg:block flex-1" />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pl-2 md:pl-4 flex gap-8" style={{ paddingTop: 'clamp(2px, min(0.5vw, 0.5vh), 8px)', paddingBottom: 'clamp(12px, min(2vw, 2vh), 32px)' }}>
              <div className="lg:w-[55%] min-w-0 flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1">
                  {category.subPages.map((subPage, i) => (
                    <motion.button
                      key={i}
                      className={cn(
                        "group/sub flex items-center gap-3 px-4 rounded-xl transition-all text-left w-full",
                        hoveredSubIndex === i ? "bg-primary/5" : "hover:bg-deep-navy/[0.03]"
                      )}
                      style={{ paddingBlock: 'clamp(8px, min(0.8vw, 1.2vh), 12px)' }}
                      onClick={() => onNavigate(subPage.href)}
                      onMouseEnter={() => setHoveredSubIndex(i)}
                      onMouseLeave={() => setHoveredSubIndex(null)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      data-testid={`overlay-link-${category.id}-${i}`}
                    >
                      <ArrowRight className={cn(
                        "w-4 h-4 text-primary transition-opacity flex-shrink-0",
                        hoveredSubIndex === i ? "opacity-100" : "opacity-0"
                      )} />
                      <span className={cn(
                        "text-base md:text-lg font-medium transition-colors",
                        hoveredSubIndex === i ? "text-primary" : "text-deep-navy/35"
                      )}>
                        {subPage.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="hidden lg:grid flex-1 min-w-0 pt-1" style={{ gridTemplateRows: '1fr', gridTemplateColumns: '1fr' }}>
                {category.subPages.map((subPage, i) => {
                  const isActive = hoveredSubIndex === i;
                  const itemHasMany = subPage.details && subPage.details.length > 5;
                  if (!subPage.details && !subPage.detailNote) return null;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "transition-opacity duration-200",
                        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                      )}
                      style={{ gridRow: 1, gridColumn: 1 }}
                    >
                      <div className="bg-primary/[0.03] border border-primary/10 rounded-2xl" style={{ padding: 'clamp(20px, min(2vw, 3vh), 28px)' }}>
                        <h4 className="text-primary/60 text-xs font-semibold uppercase tracking-widest mb-5">
                          {subPage.title}
                        </h4>
                        {subPage.details ? (
                          <ul className={cn(
                            itemHasMany ? "grid grid-cols-2 gap-x-6 gap-y-2.5" : "space-y-2.5"
                          )}>
                            {subPage.details.map((detail, di) => (
                              <li key={di} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/20 flex-shrink-0" />
                                <span className="text-deep-navy/40 text-[15px]">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        ) : subPage.detailNote ? (
                          <p className="text-deep-navy/40 text-[15px] leading-relaxed">
                            {subPage.detailNote}
                          </p>
                        ) : null}
                        <button
                          className="mt-6 flex items-center gap-2 text-primary/40 hover:text-primary text-sm transition-colors"
                          onClick={() => onNavigate(subPage.href)}
                        >
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StandaloneNavItem({
  item,
  index,
  hoveredIndex,
  onHover,
  onLeave,
  onNavigate,
  totalItems,
}: {
  item: { id: string; title: string; href: string };
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
  onNavigate: (href: string) => void;
  totalItems: number;
}) {
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-testid={`overlay-link-${item.id}`}
    >
      <div className="flex">
        <div className="lg:w-[55%] border-b border-deep-navy/8">
          <button
            className={cn(
              "w-full flex items-center justify-between group transition-opacity duration-300",
              isDimmed ? "opacity-30" : "opacity-100"
            )}
            style={{ paddingBlock: 'min(clamp(12px, 1.5vw, 24px), clamp(4px, 1.6vh, 24px))' }}
            onClick={() => onNavigate(item.href)}
            data-testid={`overlay-trigger-${item.id}`}
          >
            <span className="font-serif font-bold text-deep-navy/30 group-hover:text-primary transition-colors text-left leading-[1.1] block" style={{ fontSize: 'min(clamp(28px, 3.2vw, 48px), clamp(17px, 4.5vh, 48px))' }}>
              {item.title}
            </span>
            <ArrowRight className="text-deep-navy/20 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" style={{ width: 'clamp(20px, min(1.8vw, 2.5vh), 28px)', height: 'clamp(20px, min(1.8vw, 2.5vh), 28px)' }} />
          </button>
        </div>
        <div className="hidden lg:block flex-1" />
      </div>
    </div>
  );
}
