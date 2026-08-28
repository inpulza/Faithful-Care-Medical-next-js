import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, PaperPlaneTilt, X, CalendarPlus, CircleNotch, Phone } from "@phosphor-icons/react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePageTransition } from "@/components/page-transition";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";
import { useLocation } from "@/lib/router";
import { assetUrl } from "@/lib/asset-url";
import type { MapConfig } from "@/lib/page-content";
import { trackLead } from "@/lib/analytics";

const LazyHeroLocationMap = React.lazy(() => import("@/components/hero-location-map").then(m => ({ default: m.HeroLocationMap })));

import face1 from "@/assets/social-proof/face1.webp";
import face2 from "@/assets/social-proof/face2.webp";
import face3 from "@/assets/social-proof/face3.webp";
import face4 from "@/assets/social-proof/face4.webp";
import face5 from "@/assets/social-proof/face5.webp";
import face6 from "@/assets/social-proof/face6.webp";

export interface PatientPhoto {
  src: string;
  alt: string;
}

const COMMUNITY_FACES: PatientPhoto[] = [
  { src: assetUrl(face1), alt: "Friendly face representing the Naples community" },
  { src: assetUrl(face2), alt: "Friendly face representing the Naples community" },
  { src: assetUrl(face3), alt: "Friendly face representing the Naples community" },
  { src: assetUrl(face4), alt: "Friendly face representing the Naples community" },
  { src: assetUrl(face5), alt: "Friendly face representing the Naples community" },
  { src: assetUrl(face6), alt: "Friendly face representing the Naples community" },
];

const SOCIAL_PROOF_LABEL = "Welcoming new patients across Naples";

function StarsRow({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const isLast = i === 4;
        return (
          <motion.div
            key={i}
            initial={{ x: -30, opacity: 0, scale: 1 }}
            animate={{ 
              x: isExpanded ? 0 : -30,
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded && isLast ? [1, 1.4, 1.15] : 1,
              color: isExpanded 
                ? ["hsl(170, 60%, 45%)", "hsl(50, 95%, 50%)", "hsl(45, 100%, 50%)"]
                : "hsl(170, 60%, 45%)"
            }}
            transition={{ 
              duration: isExpanded ? 0.5 : 0.2, 
              delay: isExpanded ? 0.15 + i * 0.12 : 0,
              ease: [0.25, 0.1, 0.25, 1],
              scale: { 
                delay: isExpanded ? 0.15 + i * 0.12 : 0, 
                duration: isLast && isExpanded ? 0.4 : 0.2,
                times: isLast ? [0, 0.6, 1] : undefined
              },
              color: {
                delay: isExpanded ? 0.1 + i * 0.12 : 0,
                duration: isExpanded ? 0.4 : 0.3
              }
            }}
          >
            <Star 
              weight="fill" 
              className="w-4 h-4"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function TrustBadge({
  isLight = false,
  compact = false,
  realPatients,
}: {
  isLight?: boolean;
  compact?: boolean;
  realPatients?: PatientPhoto[];
}) {
  const avatars = (realPatients && realPatients.length > 0 ? realPatients : COMMUNITY_FACES);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsExpanded(true);
      setTimeout(() => setIsExpanded(false), 3500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex flex-col gap-2" style={{ marginBottom: 'clamp(12px, 1.5vw, 20px)' }} data-testid="trust-badge-compact">
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 6 }}
          transition={{ duration: 0.4, delay: isExpanded ? 0.1 : 0 }}
        >
          <div className="flex items-center gap-0.5">
            <StarsRow isExpanded={isExpanded} />
          </div>
          <motion.span
            className="text-sm font-semibold whitespace-nowrap text-primary"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isExpanded ? 0.5 : 0 }}
          >
            {SOCIAL_PROOF_LABEL}
          </motion.span>
        </motion.div>

        <motion.div 
          className="flex items-center"
          animate={{ gap: isExpanded ? "4px" : "0px" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {avatars.map((avatar, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl overflow-hidden border-[3px] border-white shadow-md"
              style={{ 
                width: 'clamp(34px, 3.5vw, 42px)', 
                height: 'clamp(34px, 3.5vw, 42px)',
                marginLeft: i === 0 ? 0 : isExpanded ? 0 : -16,
                zIndex: avatars.length - i
              }}
              animate={{ 
                marginLeft: i === 0 ? 0 : isExpanded ? 6 : -16,
              }}
              transition={{ 
                duration: isExpanded ? 0.6 : 0.8, 
                ease: isExpanded ? [0.25, 0.1, 0.25, 1] : [0.4, 0, 0.2, 1],
                delay: isExpanded ? i * 0.03 : (avatars.length - 1 - i) * 0.04
              }}
            >
              <img 
                src={avatar.src} 
                alt={avatar.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={80}
                height={80}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3" style={{ marginBottom: 'clamp(16px, 2vw, 24px)' }} data-testid="trust-badge">
      <div className="flex items-center">
        <motion.div 
          className="flex items-center"
          animate={{ gap: isExpanded ? "4px" : "0px" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {avatars.map((avatar, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl overflow-hidden border-[3px] border-white shadow-md"
              style={{ 
                width: 'clamp(34px, 3.5vw, 42px)', 
                height: 'clamp(34px, 3.5vw, 42px)',
                marginLeft: i === 0 ? 0 : isExpanded ? 0 : -16,
                zIndex: avatars.length - i
              }}
              animate={{ 
                marginLeft: i === 0 ? 0 : isExpanded ? 6 : -16,
              }}
              transition={{ 
                duration: isExpanded ? 0.6 : 0.8, 
                ease: isExpanded ? [0.25, 0.1, 0.25, 1] : [0.4, 0, 0.2, 1],
                delay: isExpanded ? i * 0.03 : (avatars.length - 1 - i) * 0.04
              }}
            >
              <img 
                src={avatar.src} 
                alt={avatar.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={80}
                height={80}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={cn("hidden sm:flex items-center ml-4 rounded-full shadow-sm overflow-hidden", "bg-white border border-primary/10")}
          animate={{ 
            width: isExpanded ? "auto" : 0,
            paddingLeft: isExpanded ? 8 : 0,
            paddingRight: isExpanded ? 8 : 0,
            paddingTop: isExpanded ? 6 : 0,
            paddingBottom: isExpanded ? 6 : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: isExpanded ? 0.4 : 0.25, ease: "easeInOut", delay: isExpanded ? 0.2 : 0 }}
        >
          <StarsRow isExpanded={isExpanded} />
        </motion.div>
      </div>

      <div className="flex items-center sm:hidden">
        <div
          className={cn("flex items-center rounded-full shadow-sm", "bg-white border border-primary/10")}
          style={{ padding: '6px 8px' }}
        >
          <StarsRow isExpanded={true} />
        </div>

        <span
          className={cn("text-sm font-semibold whitespace-nowrap ml-3", isLight ? "text-primary lg:text-white/80" : "text-primary")}
        >
          {SOCIAL_PROOF_LABEL}
        </span>
      </div>

      <motion.span 
        className={cn("hidden sm:block text-sm font-semibold whitespace-nowrap", isLight ? "text-primary lg:text-white/80" : "text-primary")}
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          marginLeft: isExpanded ? 16 : 0
        }}
        transition={{ 
          duration: 0.3, 
          marginLeft: { duration: isExpanded ? 0.2 : 0.15 },
          opacity: { duration: 0.3, delay: isExpanded ? 0.5 : 0 }
        }}
      >
        {SOCIAL_PROOF_LABEL}
      </motion.span>
    </div>
  );
}

function useHeroParallax() {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    let ctx: any;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current;
      if (!el) return;

      ctx = gsap.context(() => {
        gsap.to(el, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return ref;
}

const FORM_TEXT = {
  en: {
    sheetTitle: "Request a Visit",
    sheetSubtitle: "We'll reach out to confirm your appointment.",
    closeAria: "Close form",
    expandedTitle: "Request a Visit",
    expandedSubtitle: "Fill out the form below and a care coordinator will reach out to confirm your appointment.",
    nameLabel: "Full name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    phoneLabel: "Phone",
    helpLabel: "How can we help?",
    chooseReason: "Choose a reason...",
    serviceOptions: [
      { value: "Schedule a visit", label: "Schedule a visit" },
      { value: "Ask a question", label: "Ask a question" },
      { value: "Membership info", label: "Membership info" },
      { value: "Other", label: "Other" },
    ],
    messageLabel: "Message (optional)",
    messagePlaceholder: "Tell us about your needs or any questions you have...",
    sending: "Sending...",
    submit: "Request visit",
    success: "Thank you! A care coordinator will reach out soon.",
    genericError: "Something went wrong. Please try again or call us at (239) 423-0205.",
    networkError: "Could not send your message. Please check your connection and try again, or call us at (239) 423-0205.",
    privacyLabel: "Privacy notice.",
    phi: "By submitting this form, you acknowledge it is not intended for protected health information. For urgent medical questions or to discuss conditions, please call (239) 423-0205. We do not transmit sensitive health information via this form.",
    fabAria: "Book Visit",
    fabLine1: "Book",
    fabLine2: "Visit",
  },
  es: {
    sheetTitle: "Pida su cita",
    sheetSubtitle: "Le llamamos para confirmar su cita.",
    closeAria: "Cerrar formulario",
    expandedTitle: "Pida su cita",
    expandedSubtitle: "Complete el formulario y le llamamos para confirmar su cita.",
    nameLabel: "Nombre completo",
    namePlaceholder: "Su nombre completo",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "usted@correo.com",
    phoneLabel: "Teléfono",
    helpLabel: "¿Cómo le ayudamos?",
    chooseReason: "Elija un motivo...",
    serviceOptions: [
      { value: "Schedule a visit", label: "Pedir una cita" },
      { value: "Ask a question", label: "Hacer una pregunta" },
      { value: "Membership info", label: "Información de membresía" },
      { value: "Other", label: "Otro" },
    ],
    messageLabel: "Mensaje (opcional)",
    messagePlaceholder: "Cuéntenos qué necesita o qué preguntas tiene...",
    sending: "Enviando...",
    submit: "Pedir cita",
    success: "¡Gracias! Le llamamos muy pronto para confirmar.",
    genericError: "Algo salió mal. Intente de nuevo o llámenos al (239) 423-0205.",
    networkError: "No pudimos enviar su mensaje. Revise su conexión e intente de nuevo, o llámenos al (239) 423-0205.",
    privacyLabel: "Aviso de privacidad.",
    phi: "Al enviar este formulario, usted reconoce que no es para información médica protegida. Para preguntas médicas urgentes o para hablar de una condición de salud, llame al (239) 423-0205. No envíe información de salud delicada por este formulario.",
    fabAria: "Pedir cita",
    fabLine1: "Pedir",
    fabLine2: "cita",
  },
} as const;

export type HeroFormLang = keyof typeof FORM_TEXT;

function MobileContactFab({ onClick, lang = "en" }: { onClick: () => void; lang?: HeroFormLang }) {
  const t = FORM_TEXT[lang];
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <motion.button
      onClick={onClick}
      className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 items-center gap-2 rounded-l-full bg-primary py-4 pl-4 pr-3 text-white shadow-lg md:flex lg:hidden"
      style={{
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.35)',
      }}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: isScrolling ? 0.2 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: isScrolling ? 0 : 0.1 }}
      whileTap={{ scale: 0.95 }}
      data-testid="button-mobile-contact-fab"
      aria-label={t.fabAria}
    >
      <CalendarPlus weight="bold" size={22} aria-hidden="true" />
      <span className="text-sm font-semibold leading-none">{t.fabLine1}<br />{t.fabLine2}</span>
    </motion.button>
  );
}

function MobileContactModal({ isOpen, onClose, lang = "en" }: { isOpen: boolean; onClose: () => void; lang?: HeroFormLang }) {
  const t = FORM_TEXT[lang];
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 z-[200] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={onClose}
            data-testid="mobile-contact-backdrop"
          />
          <motion.div
            className="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            data-testid="mobile-contact-sheet"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-lg font-bold text-[hsl(var(--foreground))]">{t.sheetTitle}</p>
                <p className="text-sm text-[hsl(var(--foreground)/0.5)]">{t.sheetSubtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.06)] flex items-center justify-center"
                data-testid="button-mobile-contact-close"
                aria-label={t.closeAria}
              >
                <X weight="bold" size={18} className="text-[hsl(var(--foreground))]" />
              </button>
            </div>
            <ContactFormCard lang={lang} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactFormCard({ expanded = false, lang = "en" }: { expanded?: boolean; lang?: HeroFormLang }) {
  const t = FORM_TEXT[lang];
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [location] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, sourcePage: location }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || t.genericError);
        return;
      }

      trackLead(expanded ? "contact_page_form" : "hero_contact_form", location);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setError(t.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-[hsl(var(--primary)/0.04)] rounded-[12px] border border-[hsl(var(--primary)/0.1)] text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/0.4)] focus:outline-none focus:border-[hsl(var(--primary)/0.3)] focus:ring-1 focus:ring-[hsl(var(--primary)/0.15)] transition-colors";

  return (
    <div
      className="w-full bg-white/80 rounded-[20px] medical-border inner-glow-primary shadow-[0_20px_50px_rgba(16,24,40,0.10)]"
      style={{
        padding: expanded ? 'clamp(28px, 3vw, 44px)' : 'clamp(20px, 2.5vw, 32px)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      }}
      data-testid="contact-form-card"
    >
      {submitted ? (
        <div className={cn("flex items-center justify-center gap-3", expanded ? "py-12" : "py-4")}>
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center">
            <PaperPlaneTilt weight="fill" className="w-5 h-5 text-[hsl(var(--success))]" />
          </div>
          <p className="text-lg font-semibold text-[hsl(var(--foreground))]" data-testid="text-form-success">
            {t.success}
          </p>
        </div>
      ) : expanded ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" data-testid="hero-contact-form" data-clarity-mask="true">
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))]" data-testid="text-expanded-form-title">
              {t.expandedTitle}
            </h3>
            <p className="text-[hsl(var(--foreground)/0.55)] mt-1.5 text-base">
              {t.expandedSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor="contact-name">
                {t.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                data-testid="input-contact-name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor="contact-email">
                {t.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
                data-testid="input-contact-email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor="contact-phone">
                {t.phoneLabel}
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="(239) 423-0205"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
                data-testid="input-contact-phone"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor="contact-service">
                {t.helpLabel}
              </label>
              <select
                id="contact-service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={inputClass + " appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10"}
                data-testid="select-contact-service"
              >
                <option value="">{t.chooseReason}</option>
                {t.serviceOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor="contact-message">
              {t.messageLabel}
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={inputClass + " resize-none"}
              data-testid="input-contact-message"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3" data-testid="text-form-error">{error}</p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full md:w-auto md:self-start flex-shrink-0 whitespace-nowrap"
            data-testid="button-contact-submit"
          >
            {submitting ? (
              <>
                <CircleNotch weight="bold" size={20} className="mr-1 animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                {t.submit}
                <ArrowRight weight="regular" size={20} className="ml-1" />
              </>
            )}
          </Button>
          <p
            className="text-[13px] leading-[1.55] text-deep-navy/75"
            data-testid="text-phi-disclosure"
          >
            <strong className="text-primary">{t.privacyLabel}</strong> {t.phi}
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="hero-contact-form" data-clarity-mask="true">
          <div className="flex flex-col lg:flex-row items-end gap-4">
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="contact-name">
              {t.nameLabel}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              data-testid="input-contact-name"
            />
          </div>
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="contact-email">
              {t.emailLabel}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              data-testid="input-contact-email"
            />
          </div>
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="contact-phone">
              {t.phoneLabel}
            </label>
            <input
              id="contact-phone"
              type="tel"
              placeholder="(239) 423-0205"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
              data-testid="input-contact-phone"
            />
          </div>
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="contact-service">
              {t.helpLabel}
            </label>
            <select
              id="contact-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={inputClass + " appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10"}
              data-testid="select-contact-service"
            >
              <option value="">{t.chooseReason}</option>
              {t.serviceOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full lg:w-auto flex flex-col gap-2">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3" data-testid="text-form-error">{error}</p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full lg:w-auto flex-shrink-0 whitespace-nowrap"
              data-testid="button-contact-submit"
            >
              {submitting ? (
                <>
                  <CircleNotch weight="bold" size={20} className="mr-1 animate-spin" />
                  {t.sending}
                </>
              ) : (
                <>
                  {t.submit}
                  <ArrowRight weight="regular" size={20} className="ml-1" />
                </>
              )}
            </Button>
          </div>
          </div>
          <p
            className="text-[12px] leading-[1.5] text-deep-navy/75"
            data-testid="text-phi-disclosure"
          >
            <strong className="text-primary">{t.privacyLabel}</strong> {t.phi}
          </p>
        </form>
      )}
    </div>
  );
}

export interface PageHeroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  subtitleBold?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  primaryCtaOnClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaOnClick?: () => void;
  showTrustLine?: boolean;
  trustLineText?: React.ReactNode;
  marqueeItems?: string[];
  heroImage: string;
  heroImageMobile?: string;
  heroImages?: string[];
  heroImagesMobile?: string[];
  heroImageAlt?: string;
  heroBlurPlaceholder?: string;
  showSearchCard?: boolean;
  expandedContactForm?: boolean;
  formLang?: HeroFormLang;
  variant?: "home" | "interior";
  heroTextTheme?: "dark" | "light";
  mapConfig?: MapConfig;
  mobileGreeting?: boolean;
  realPatients?: PatientPhoto[];
}

export function PageHero({
  title,
  subtitle,
  subtitleBold,
  primaryCtaText = "Call Now",
  primaryCtaHref = "tel:2394230205",
  primaryCtaOnClick,
  secondaryCtaText = "Request a Visit",
  secondaryCtaHref,
  secondaryCtaOnClick,
  showTrustLine = true,
  trustLineText,
  marqueeItems = ["Accepting new patients", "Naples, FL", "Geriatric & palliative care"],
  heroImage,
  heroImageMobile,
  heroImages,
  heroImagesMobile,
  heroImageAlt = "Faithful Care Medical Services",
  heroBlurPlaceholder,
  showSearchCard = true,
  expandedContactForm = false,
  formLang = "en",
  variant = "interior",
  heroTextTheme = "dark",
  mapConfig,
  mobileGreeting = false,
  realPatients,
}: PageHeroProps) {
  const isLight = heroTextTheme === "light";
  const photoRef = useHeroParallax();
  const [mobileFormOpen, setMobileFormOpen] = React.useState(false);
  const [desktopLoaded, setDesktopLoaded] = React.useState(false);
  const [mobileLoaded, setMobileLoaded] = React.useState(false);
  const [desktopBlurVisible, setDesktopBlurVisible] = React.useState(true);
  const [mobileBlurVisible, setMobileBlurVisible] = React.useState(true);
  const desktopImgRef = React.useRef<HTMLImageElement | null>(null);
  const mobileImgRef = React.useRef<HTMLImageElement | null>(null);

  const { navigateTo } = usePageTransition();

  const desktopSlides = React.useMemo(
    () => (heroImages && heroImages.length > 0 ? heroImages : [heroImage]).map(assetUrl),
    [heroImages, heroImage],
  );
  const mobileSlides = React.useMemo(
    () => (heroImagesMobile && heroImagesMobile.length > 0 ? heroImagesMobile : [heroImageMobile || heroImage]).map(assetUrl),
    [heroImagesMobile, heroImageMobile, heroImage],
  );
  const slideCount = Math.max(desktopSlides.length, mobileSlides.length);
  const responsiveSlides = React.useMemo(
    () => Array.from({ length: slideCount }, (_, index) => ({
      desktop: desktopSlides[index] ?? desktopSlides[0],
      mobile: mobileSlides[index] ?? mobileSlides[0],
    })),
    [desktopSlides, mobileSlides, slideCount],
  );
  const isCarousel = slideCount > 1;
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    if (!isCarousel) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % slideCount);
    }, 6000);
    return () => window.clearInterval(id);
  }, [isCarousel, slideCount]);

  React.useEffect(() => {
    setDesktopLoaded(false);
    setMobileLoaded(false);
    setDesktopBlurVisible(true);
    setMobileBlurVisible(true);

    // Pages ship server-rendered, so the browser can finish loading the
    // hero image BEFORE React hydrates. In that case `onLoad` never fires
    // and the image would stay at opacity 0 behind the blur placeholder
    // forever, so reconcile against the real element state here.
    const desktopImg = desktopImgRef.current;
    if (desktopImg?.complete && desktopImg.naturalWidth > 0) {
      setDesktopLoaded(true);
    }
    const mobileImg = mobileImgRef.current;
    if (mobileImg?.complete && mobileImg.naturalWidth > 0) {
      setMobileLoaded(true);
    }
  }, [heroImage, heroImageMobile]);

  React.useEffect(() => {
    if (desktopLoaded) {
      const t = setTimeout(() => setDesktopBlurVisible(false), 600);
      return () => clearTimeout(t);
    }
  }, [desktopLoaded]);

  React.useEffect(() => {
    if (mobileLoaded) {
      const t = setTimeout(() => setMobileBlurVisible(false), 600);
      return () => clearTimeout(t);
    }
  }, [mobileLoaded]);

  const isPrimaryExternal = primaryCtaHref?.startsWith("tel:") || primaryCtaHref?.startsWith("mailto:") || primaryCtaHref?.startsWith("http");
  const isSecondaryExternal = secondaryCtaHref?.startsWith("tel:") || secondaryCtaHref?.startsWith("mailto:") || secondaryCtaHref?.startsWith("http");

  const handlePrimaryClick = primaryCtaOnClick || (() => {
    if (primaryCtaHref && !isPrimaryExternal) {
      navigateTo(primaryCtaHref);
      return;
    }
    navigateTo("/contact");
  });

  const handleSecondaryClick = secondaryCtaOnClick || (() => {
    if (secondaryCtaHref && !isSecondaryExternal) {
      navigateTo(secondaryCtaHref);
      return;
    }
    const target = document.getElementById("page-content");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigateTo("/contact");
  });

  return (
    <>
      {responsiveSlides[0] && (
        responsiveSlides[0].desktop === responsiveSlides[0].mobile ? (
          <link
            rel="preload"
            as="image"
            href={responsiveSlides[0].desktop}
            fetchPriority="high"
          />
        ) : (
          <>
            <link
              rel="preload"
              as="image"
              href={responsiveSlides[0].mobile}
              media="(max-width: 1023px)"
              fetchPriority="high"
            />
            <link
              rel="preload"
              as="image"
              href={responsiveSlides[0].desktop}
              media="(min-width: 1024px)"
              fetchPriority="high"
            />
          </>
        )
      )}
      <section className="relative w-full overflow-hidden bg-white" data-testid="section-hero">
        <div
          ref={photoRef as React.RefObject<HTMLDivElement>}
          className="hidden lg:block lg:min-h-[500px] xl:min-h-[640px] relative"
          aria-hidden="true"
          data-testid="hero-media"
        >
          {heroBlurPlaceholder && desktopBlurVisible && (
            <img
              src={heroBlurPlaceholder}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover block z-0 transition-opacity duration-500"
              style={{ filter: 'blur(20px)', transform: 'scale(1.1)', opacity: desktopLoaded ? 0 : 1 }}
            />
          )}
          {responsiveSlides.map((slide, i) => (
            <picture key={`${slide.desktop}-${slide.mobile}-${i}`} className="contents">
              <source media="(max-width: 1023px)" srcSet={slide.mobile} />
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <img
                ref={i === 0 ? desktopImgRef : undefined}
                src={slide.desktop}
                alt={i === 0 ? heroImageAlt : ""}
                aria-hidden={i === 0 ? undefined : true}
                className={
                  (i === 0
                    ? "w-full h-full object-cover block relative"
                    : "absolute inset-0 w-full h-full object-cover block") +
                  " z-[1] transition-opacity ease-in-out"
                }
                style={{
                  transitionDuration: "1200ms",
                  opacity:
                    i === 0
                      ? (heroBlurPlaceholder && !desktopLoaded ? 0 : activeSlide === 0 ? 1 : 0)
                      : activeSlide === i
                        ? 1
                        : 0,
                }}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                width={2400}
                height={1340}
                onLoad={i === 0 ? () => setDesktopLoaded(true) : undefined}
                data-testid={i === 0 ? "img-hero-bg" : `img-hero-slide-${i}`}
              />
            </picture>
          ))}
          {isLight && (
            <div
              className="absolute inset-0 z-[2] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.52) 30%, rgba(0,0,0,0.32) 55%, rgba(0,0,0,0.14) 75%, transparent 92%)',
              }}
            />
          )}
        </div>

        <div className="lg:hidden w-full h-[45vh] overflow-hidden relative" data-testid="hero-media-mobile">
          {heroBlurPlaceholder && mobileBlurVisible && (
            <img
              src={heroBlurPlaceholder}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
              style={{ filter: 'blur(20px)', transform: 'scale(1.1)', opacity: mobileLoaded ? 0 : 1 }}
            />
          )}
          {responsiveSlides.map((slide, i) => (
            <picture key={`${slide.desktop}-${slide.mobile}-${i}`} className="contents">
              <source media="(max-width: 1023px)" srcSet={slide.mobile} />
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <img
                ref={i === 0 ? mobileImgRef : undefined}
                src={slide.desktop}
                alt={i === 0 ? heroImageAlt : ""}
                aria-hidden={i === 0 ? undefined : true}
                className={
                  (i === 0 ? "relative" : "absolute inset-0") +
                  " w-full h-full object-cover z-[1] transition-opacity ease-in-out"
                }
                style={{
                  objectPosition: mapConfig ? 'center top' : 'right top',
                  transitionDuration: "1200ms",
                  opacity:
                    i === 0
                      ? (heroBlurPlaceholder && !mobileLoaded ? 0 : activeSlide === 0 ? 1 : 0)
                      : activeSlide === i
                        ? 1
                        : 0,
                }}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                width={800}
                height={447}
                onLoad={i === 0 ? () => setMobileLoaded(true) : undefined}
                data-testid={i === 0 ? "img-hero-mobile" : `img-hero-mobile-slide-${i}`}
              />
            </picture>
          ))}
          {!mapConfig && (
            <div
              className="hidden md:flex lg:hidden flex-col justify-center absolute inset-y-0 left-0 z-10"
              style={{
                padding: 'clamp(16px, 3vw, 40px)',
                maxWidth: '55%',
              }}
              data-testid="hero-tablet-overlay"
            >
              <TrustBadge isLight={false} compact realPatients={realPatients} />
              <Typography
                as="div"
                variant="h1"
                className="!text-[clamp(26px,3.2vw,40px)]"
                aria-hidden="true"
              >
                {title}
              </Typography>
            </div>
          )}

          {mobileGreeting && (
            <motion.div
              className="md:hidden absolute z-20 max-w-[62%]"
              style={{ bottom: 'max(16px, env(safe-area-inset-bottom))', left: 'var(--container-px)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              data-testid="hero-mobile-greeting"
            >
              <div className="font-serif italic text-[15px] text-deep-navy leading-snug">
                So glad you stopped by.
              </div>

              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-deep-navy/75 leading-tight">
                  Dr. Addys Reve, MD
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <div className={cn(
          "relative z-10 container-radical py-8 lg:absolute lg:inset-0 lg:py-0 lg:flex lg:items-center",
          mapConfig && "lg:justify-between lg:gap-6 xl:gap-8"
        )} data-testid="hero-content">
          <div className={cn(
            "lg:[margin-top:clamp(-30px,-2vw,0px)]",
            mapConfig ? "lg:flex-1 lg:min-w-0 lg:max-w-[60%]" : "max-w-[860px]"
          )}>
            <div className={cn(!mapConfig && "md:hidden lg:block")}>
              <TrustBadge isLight={isLight} realPatients={realPatients} />
            </div>
            <Typography
              as="h1"
              variant="h1"
              className={cn(
                "!text-[clamp(32px,4vw,64px)]",
                !mapConfig && "md:sr-only lg:not-sr-only",
                isLight && "text-deep-navy lg:!text-white",
              )}
              data-testid="text-hero-title"
            >
              {title}
            </Typography>
            <Typography
              variant="body-lg"
              className={cn("max-w-2xl", isLight && "text-deep-navy/70 lg:!text-white/90")}
              style={{ marginTop: 'clamp(12px, 1.2vw, 20px)' }}
              data-testid="text-hero-subtitle"
            >
              {subtitleBold && <span className={cn("font-bold", isLight ? "text-foreground lg:!text-white" : "text-foreground")}>{subtitleBold}</span>}{" "}
              {subtitle}
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4" style={{ marginTop: 'clamp(16px, 2vw, 32px)' }} data-testid="hero-ctas">
              {isPrimaryExternal && !primaryCtaOnClick ? (
                <Button asChild size="lg" data-testid="button-hero-primary">
                  <a href={primaryCtaHref}>
                    <Phone weight="fill" size={20} className="mr-1" />
                    {primaryCtaText}
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handlePrimaryClick}
                  data-testid="button-hero-primary"
                >
                  {primaryCtaText}
                  <ArrowRight className="ml-1" weight="regular" size={20} />
                </Button>
              )}
              {isSecondaryExternal && !secondaryCtaOnClick ? (
                <a
                  href={secondaryCtaHref}
                  data-testid="link-hero-secondary"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-medium transition-all backdrop-blur-[16px] backdrop-saturate-[180%]",
                    isLight
                      ? "border border-deep-navy/20 text-deep-navy bg-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-deep-navy/40 lg:border-white/40 lg:!text-white lg:bg-white/15 lg:shadow-[0_2px_12px_rgba(0,0,0,0.15)] lg:hover:border-white/60"
                      : "border border-primary/25 text-deep-navy bg-white/55 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-primary/40"
                  )}
                  style={{
                    minHeight: 'clamp(56px, 4vw, 64px)',
                    paddingInline: 'clamp(24px, 2.5vw, 32px)',
                    fontSize: 'clamp(16px, 1.1vw, 18px)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              ) : (
                <button
                  className={cn(
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-medium transition-all backdrop-blur-[16px] backdrop-saturate-[180%]",
                    isLight
                      ? "border border-deep-navy/20 text-deep-navy bg-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-deep-navy/40 lg:border-white/40 lg:!text-white lg:bg-white/15 lg:shadow-[0_2px_12px_rgba(0,0,0,0.15)] lg:hover:border-white/60"
                      : "border border-primary/25 text-deep-navy bg-white/55 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-primary/40"
                  )}
                  style={{
                    minHeight: 'clamp(56px, 4vw, 64px)',
                    paddingInline: 'clamp(24px, 2.5vw, 32px)',
                    fontSize: 'clamp(16px, 1.1vw, 18px)',
                  }}
                  onClick={handleSecondaryClick}
                  data-testid="button-hero-secondary"
                >
                  {secondaryCtaText}
                </button>
              )}
            </div>

            {showTrustLine && (
              <p
                className={cn(
                  "text-sm font-medium",
                  isLight ? "text-deep-navy/70 lg:text-white/85" : "text-deep-navy/70"
                )}
                style={{ marginTop: 'clamp(10px, 1vw, 16px)' }}
                data-testid="hero-trust-line"
              >
                {trustLineText ?? (
                  <>
                    Medicare, Medicaid, Aetna, Cigna &amp; Humana <span className="opacity-60">·</span> Se habla espa&ntilde;ol
                  </>
                )}
              </p>
            )}

            <div 
              className="relative overflow-hidden"
              style={{ 
                marginTop: 'clamp(16px, 2vw, 32px)',
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }}
              data-testid="marquee-hero"
            >
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: 'linear',
                  repeatType: 'loop'
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <span key={i} className={cn("text-base tracking-wide flex items-center", isLight ? "text-primary lg:text-white/70" : "text-primary")}>
                    {marqueeItems.map((item, idx) => (
                      <React.Fragment key={idx}>
                        {item} <span className={cn("mx-4", isLight ? "text-[hsl(var(--urgent))] lg:text-white/40" : "text-[hsl(var(--urgent))]")}>•</span>
                      </React.Fragment>
                    ))}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {mapConfig && (
            <motion.div
              className="hidden lg:block flex-shrink-0"
              style={{ width: 'clamp(300px, 26vw, 440px)', height: 'clamp(380px, 32vw, 520px)' }}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              data-testid="hero-map-wrapper"
            >
              <React.Suspense fallback={<div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-xl animate-pulse" />}>
                <LazyHeroLocationMap
                  lat={mapConfig.lat}
                  lng={mapConfig.lng}
                  label={mapConfig.label}
                  zoom={mapConfig.zoom}
                />
              </React.Suspense>
            </motion.div>
          )}
        </div>
      </section>

      {showSearchCard && !expandedContactForm && (
        <>
          <div className="hidden lg:block relative" data-testid="search-bar-wrapper">
            <div 
              className="absolute left-0 right-0 top-0 -translate-y-[60%] z-20 container-radical"
              data-testid="search-bar-container"
            >
              <ContactFormCard lang={formLang} />
            </div>
          </div>

          <MobileContactFab onClick={() => setMobileFormOpen(true)} lang={formLang} />
          <MobileContactModal isOpen={mobileFormOpen} onClose={() => setMobileFormOpen(false)} lang={formLang} />
        </>
      )}

      {expandedContactForm && (
        <>
          <section className="relative z-10 bg-white" data-testid="expanded-contact-section">
            <div className="container-radical py-10 lg:py-14">
              <ContactFormCard expanded lang={formLang} />
            </div>
          </section>

          <div className="lg:hidden">
            <MobileContactFab onClick={() => setMobileFormOpen(true)} lang={formLang} />
            <MobileContactModal isOpen={mobileFormOpen} onClose={() => setMobileFormOpen(false)} lang={formLang} />
          </div>
        </>
      )}
    </>
  );
}
