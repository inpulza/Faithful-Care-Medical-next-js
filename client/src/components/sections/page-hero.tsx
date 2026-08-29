import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

function StarsRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} weight="fill" className="h-4 w-4 text-amber-400" aria-hidden="true" />
      ))}
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

  return (
    <div
      className={cn("flex gap-3", compact ? "flex-col" : "flex-col sm:flex-row sm:items-center")}
      style={{ marginBottom: compact ? 'clamp(12px, 1.5vw, 20px)' : 'clamp(16px, 2vw, 24px)' }}
      data-testid={compact ? "trust-badge-compact" : "trust-badge"}
    >
      <div className="flex items-center" aria-label="Patients from the Naples community">
        {avatars.map((avatar, i) => (
          <div
            key={`${avatar.src}-${i}`}
            className={cn(
              "relative overflow-hidden rounded-xl border-[3px] border-white shadow-md",
              i > 0 && "-ml-3.5",
            )}
            style={{
              width: 'clamp(34px, 3.5vw, 42px)',
              height: 'clamp(34px, 3.5vw, 42px)',
              zIndex: avatars.length - i,
            }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>

      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex shrink-0 items-center rounded-full border border-primary/10 bg-white px-2 py-1.5 shadow-sm">
          <StarsRow />
        </div>
        <span className={cn(
          "max-w-[220px] text-[13px] font-semibold leading-tight sm:max-w-none sm:text-sm",
          isLight ? "text-deep-navy/80 lg:text-white" : "text-deep-navy/80",
        )}>
          {SOCIAL_PROOF_LABEL}
        </span>
      </div>
    </div>
  );
}

function useHeroParallax(enabled: boolean) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    let ctx: any;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

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
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [enabled]);

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
  const reducedMotion = useReducedMotion();
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
      tabIndex={0}
      className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 items-center gap-2 rounded-l-full bg-primary py-4 pl-4 pr-3 text-white shadow-lg md:flex xl:hidden"
      style={{
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.35)',
      }}
      initial={false}
      animate={{ x: 0, opacity: !reducedMotion && isScrolling ? 0.2 : 1 }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25, delay: isScrolling ? 0 : 0.1 }}
      whileTap={reducedMotion ? undefined : { scale: 0.95 }}
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
  const reducedMotion = useReducedMotion();
  const sheetRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const desktopQuery = window.matchMedia('(min-width: 1280px)');
    if (desktopQuery.matches) {
      onClose();
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !sheetRef.current) return;
      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('hidden'));

      if (focusable.length === 0) {
        event.preventDefault();
        sheetRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (!(activeElement instanceof HTMLElement) || !focusable.includes(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    desktopQuery.addEventListener('change', handleDesktopBreakpoint);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      desktopQuery.removeEventListener('change', handleDesktopBreakpoint);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center xl:hidden"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={onClose}
            data-testid="mobile-contact-backdrop"
          />
          <motion.div
            ref={sheetRef}
            className="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-2xl"
            initial={reducedMotion ? false : { y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 35 }}
            data-testid="mobile-contact-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-contact-title"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p id="mobile-contact-title" className="text-lg font-bold text-[hsl(var(--foreground))]">{t.sheetTitle}</p>
                <p className="text-sm text-[hsl(var(--foreground)/0.5)]">{t.sheetSubtitle}</p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="h-11 w-11 rounded-full bg-[hsl(var(--primary)/0.06)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
  const formInstanceId = React.useId();
  const nameId = `${formInstanceId}-name`;
  const emailId = `${formInstanceId}-email`;
  const phoneId = `${formInstanceId}-phone`;
  const serviceId = `${formInstanceId}-service`;
  const messageId = `${formInstanceId}-message`;
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
  const successRef = React.useRef<HTMLDivElement | null>(null);
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoreNameFocusRef = React.useRef(false);
  const [location] = useLocation();

  React.useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    } else if (restoreNameFocusRef.current) {
      restoreNameFocusRef.current = false;
      nameInputRef.current?.focus();
    }
  }, [submitted]);

  React.useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

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
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        restoreNameFocusRef.current = document.activeElement === successRef.current;
        setSubmitted(false);
        resetTimerRef.current = null;
      }, 5000);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setError(t.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-[hsl(var(--primary)/0.04)] rounded-[12px] border border-[hsl(var(--primary)/0.1)] text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/0.4)] focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))] transition-colors";

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
        <div
          ref={successRef}
          className={cn(
            "flex items-center justify-center gap-3 focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            expanded ? "py-12" : "py-4",
          )}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={-1}
          data-testid="contact-form-success"
        >
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center">
            <PaperPlaneTilt weight="fill" className="w-5 h-5 text-[hsl(var(--success))]" />
          </div>
          <p className="text-lg font-semibold text-[hsl(var(--foreground))]" data-testid="text-form-success">
            {t.success}
          </p>
        </div>
      ) : expanded ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" data-testid="hero-contact-form" data-clarity-mask="true" aria-busy={submitting}>
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
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor={nameId}>
                {t.nameLabel}
              </label>
              <input
                ref={nameInputRef}
                id={nameId}
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
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor={emailId}>
                {t.emailLabel}
              </label>
              <input
                id={emailId}
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
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor={phoneId}>
                {t.phoneLabel}
              </label>
              <input
                id={phoneId}
                type="tel"
                placeholder="(239) 423-0205"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
                data-testid="input-contact-phone"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor={serviceId}>
                {t.helpLabel}
              </label>
              <select
                id={serviceId}
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
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2" htmlFor={messageId}>
              {t.messageLabel}
            </label>
            <textarea
              id={messageId}
              rows={4}
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={inputClass + " resize-none"}
              data-testid="input-contact-message"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3" data-testid="text-form-error" role="alert" aria-live="assertive">{error}</p>
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="hero-contact-form" data-clarity-mask="true" aria-busy={submitting}>
          <div className="flex flex-col lg:flex-row items-end gap-4">
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor={nameId}>
              {t.nameLabel}
            </label>
            <input
              ref={nameInputRef}
              id={nameId}
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
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor={emailId}>
              {t.emailLabel}
            </label>
            <input
              id={emailId}
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
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor={phoneId}>
              {t.phoneLabel}
            </label>
            <input
              id={phoneId}
              type="tel"
              placeholder="(239) 423-0205"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
              data-testid="input-contact-phone"
            />
          </div>
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor={serviceId}>
              {t.helpLabel}
            </label>
            <select
              id={serviceId}
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
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3" data-testid="text-form-error" role="alert" aria-live="assertive">{error}</p>
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
  heroLayout?: "full-bleed" | "split";
  heroImageFit?: "cover" | "contain";
  heroImagePosition?: string;
  heroImagePositionMobile?: string;
  showCtas?: boolean;
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
  heroLayout = "full-bleed",
  heroImageFit = "cover",
  heroImagePosition,
  heroImagePositionMobile,
  showCtas = true,
  showSearchCard = true,
  expandedContactForm = false,
  formLang = "en",
  variant = "interior",
  heroTextTheme = "dark",
  mapConfig,
  mobileGreeting = false,
  realPatients,
}: PageHeroProps) {
  const reducedMotion = useReducedMotion();
  const isLight = heroTextTheme === "light";
  const isSplitHero = heroLayout === "split";
  const photoRef = useHeroParallax(!isSplitHero && !reducedMotion);
  const [mobileFormOpen, setMobileFormOpen] = React.useState(false);
  const [desktopLoaded, setDesktopLoaded] = React.useState(false);
  const [mobileLoaded, setMobileLoaded] = React.useState(false);
  const [desktopBlurVisible, setDesktopBlurVisible] = React.useState(true);
  const [mobileBlurVisible, setMobileBlurVisible] = React.useState(true);
  const desktopImgRef = React.useRef<HTMLImageElement | null>(null);
  const mobileImgRef = React.useRef<HTMLImageElement | null>(null);
  const openMobileForm = React.useCallback(() => setMobileFormOpen(true), []);
  const closeMobileForm = React.useCallback(() => setMobileFormOpen(false), []);

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
      <section
        className={cn("relative w-full overflow-hidden bg-white", isSplitHero && "pt-[72px] xl:pt-0")}
        data-testid="section-hero"
      >
        <div
          ref={isSplitHero ? undefined : photoRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "relative hidden",
            isSplitHero
              ? "xl:block xl:h-[clamp(700px,52vw,780px)] xl:bg-[#f0fbfc]"
              : variant === "interior"
                ? "lg:block lg:h-[clamp(520px,48vw,760px)]"
              : "lg:block lg:min-h-[500px] xl:min-h-[640px]",
          )}
          aria-hidden="true"
          data-testid="hero-media"
        >
          {heroBlurPlaceholder && desktopBlurVisible && (
            <img
              src={heroBlurPlaceholder}
              alt=""
              aria-hidden="true"
              className={cn(
                "absolute z-0 block w-full object-cover transition-opacity duration-500",
                isSplitHero ? "inset-x-0 bottom-0 h-[calc(100%_-_72px)]" : "inset-0 h-full",
              )}
              style={{ filter: 'blur(20px)', transform: 'scale(1.1)', opacity: desktopLoaded ? 0 : 1 }}
            />
          )}
          {isSplitHero && responsiveSlides.map((slide, i) => (
            <div
              key={`ambient-${slide.desktop}-${i}`}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-0 hidden h-[calc(100%_-_72px)] w-full bg-no-repeat min-[2560px]:block"
              data-testid={`hero-ambient-${i}`}
              style={{
                backgroundImage: `url("${slide.desktop}")`,
                backgroundPosition: "left top",
                backgroundSize: "250% 100%",
                opacity: activeSlide === i ? 0.9 : 0,
              }}
            />
          ))}
          {responsiveSlides.map((slide, i) => (
            <picture key={`${slide.desktop}-${slide.mobile}-${i}`} className="contents">
              <source media="(max-width: 1023px)" srcSet={slide.mobile} />
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <img
                ref={i === 0 ? desktopImgRef : undefined}
                src={slide.desktop}
                alt={i === 0 ? heroImageAlt : ""}
                aria-hidden={i === 0 ? undefined : true}
                className={cn(
                  "z-[1] block h-full transition-opacity ease-in-out",
                  heroImageFit === "contain" ? "object-contain" : "object-cover",
                  isSplitHero
                    ? "absolute bottom-0 left-1/2 w-full -translate-x-1/2 min-[2560px]:left-auto min-[2560px]:right-0 min-[2560px]:w-[2400px] min-[2560px]:translate-x-0 min-[2560px]:[mask-image:linear-gradient(to_right,transparent_0px,black_220px)] min-[2560px]:[-webkit-mask-image:linear-gradient(to_right,transparent_0px,black_220px)]"
                    : i === 0
                      ? "relative w-full"
                      : "absolute inset-0 w-full",
                )}
                style={{
                  objectPosition:
                    heroImagePosition ??
                    (isSplitHero ? "center center" : variant === "interior" ? "center 35%" : undefined),
                  height: isSplitHero ? 'calc(100% - 72px)' : undefined,
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
          {isSplitHero && (
            <div
              className="absolute inset-0 z-[2] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(247,253,254,0.82) 0%, rgba(247,253,254,0.76) 34%, rgba(247,253,254,0.58) 46%, rgba(247,253,254,0.22) 56%, rgba(247,253,254,0) 66%)',
              }}
              data-testid="hero-contrast-veil"
              aria-hidden="true"
            />
          )}
        </div>

        <div
          className={cn(
            "relative w-full overflow-hidden",
            isSplitHero ? "aspect-[4/3] md:aspect-[16/9] xl:hidden" : "h-[45vh] lg:hidden",
          )}
          data-testid="hero-media-mobile"
        >
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
                className={cn(
                  i === 0 ? "relative" : "absolute inset-0",
                  "z-[1] h-full w-full transition-opacity ease-in-out",
                  heroImageFit === "contain" && !isSplitHero ? "object-contain" : "object-cover",
                )}
                style={{
                  objectPosition: heroImagePositionMobile ?? (isSplitHero ? "100% center" : heroImagePosition ?? (mapConfig ? 'center top' : 'right top')),
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
          {!mapConfig && !isSplitHero && (
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
              initial={false}
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
          "relative z-10 container-radical py-8",
          isSplitHero
            ? "xl:absolute xl:inset-0 xl:flex xl:items-start xl:pb-10 xl:pt-[clamp(96px,7vw,112px)]"
            : "lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0",
          mapConfig && "lg:justify-between lg:gap-6 xl:gap-8"
        )} data-testid="hero-content">
          <div className={cn(
            isSplitHero
              ? "max-w-[860px] xl:w-[54%] xl:max-w-[690px]"
              : "lg:[margin-top:clamp(-30px,-2vw,0px)]",
            mapConfig ? "lg:flex-1 lg:min-w-0 lg:max-w-[60%]" : !isSplitHero && "max-w-[860px]"
          )} data-testid="hero-copy-region" data-hero-copy-surface={isSplitHero ? "plain" : undefined}>
            <div className={cn(!mapConfig && !isSplitHero && "md:hidden lg:block")}>
              <TrustBadge isLight={isLight} realPatients={realPatients} />
            </div>
            <Typography
              as="h1"
              variant="h1"
              className={cn(
                isSplitHero ? "!text-[clamp(36px,3.6vw,54px)]" : "!text-[clamp(32px,4vw,64px)]",
                !mapConfig && !isSplitHero && "md:sr-only lg:not-sr-only",
                isLight && "text-deep-navy lg:!text-white",
              )}
              data-testid="text-hero-title"
            >
              {title}
            </Typography>
            <Typography
              variant="body-lg"
              className={cn(
                isSplitHero ? "max-w-[640px] !text-deep-navy" : "max-w-2xl",
                isLight && !isSplitHero && "text-deep-navy/70 lg:!text-white/90",
              )}
              style={{ marginTop: 'clamp(12px, 1.2vw, 20px)' }}
              data-testid="text-hero-subtitle"
            >
              {subtitleBold && <span className={cn("font-bold", isSplitHero ? "text-deep-navy" : isLight ? "text-foreground lg:!text-white" : "text-foreground")}>{subtitleBold}</span>}{" "}
              {subtitle}
            </Typography>

            {showCtas && (
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
            )}

            {showTrustLine && (
              <p
                className={cn(
                  "text-sm font-medium",
                  isSplitHero ? "text-deep-navy" : isLight ? "text-deep-navy/70 lg:text-white/85" : "text-deep-navy/70"
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
              className={cn("relative overflow-hidden", isSplitHero && "xl:hidden")}
              style={{ 
                marginTop: 'clamp(16px, 2vw, 32px)',
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }}
              data-testid="marquee-hero"
            >
              <motion.div
                className="flex whitespace-nowrap"
                animate={reducedMotion ? { x: 0 } : { x: [0, -1000] }}
                transition={reducedMotion ? { duration: 0 } : {
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <span key={i} className={cn("text-base tracking-wide flex items-center", isLight ? "text-primary lg:text-white/80" : "text-deep-navy/80")}>
                    {marqueeItems.map((item, idx) => (
                      <React.Fragment key={idx}>
                        {item} <span className={cn("mx-4", isLight ? "text-[hsl(var(--urgent))] lg:text-white/55" : "text-deep-navy/45")}>•</span>
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
              initial={false}
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
          <div
            className={cn(
              "relative hidden xl:block",
              isSplitHero && "z-20 bg-white py-8 xl:py-10",
            )}
            data-testid="search-bar-wrapper"
          >
            <div
              className={cn(
                "z-20 container-radical",
                isSplitHero ? "relative" : "absolute left-0 right-0 top-0 -translate-y-[60%]",
              )}
              data-testid="search-bar-container"
            >
              <ContactFormCard lang={formLang} />
            </div>
          </div>

          <MobileContactFab onClick={openMobileForm} lang={formLang} />
          <MobileContactModal isOpen={mobileFormOpen} onClose={closeMobileForm} lang={formLang} />
        </>
      )}

      {expandedContactForm && (
        <section className="relative z-10 bg-white" data-testid="expanded-contact-section">
          <div className="container-radical py-10 lg:py-14">
            <ContactFormCard expanded lang={formLang} />
          </div>
        </section>
      )}
    </>
  );
}
