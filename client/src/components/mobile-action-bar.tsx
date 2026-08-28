import * as React from "react";
import { Phone, WhatsappLogo, NavigationArrow, CalendarCheck, X, PaperPlaneTilt, ArrowRight, CircleNotch } from "@phosphor-icons/react";
import { useLocation } from "@/lib/router";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";
import { trackLead } from "@/lib/analytics";

const PHONE_NUMBER = "2394230205";
const WHATSAPP_NUMBER = "17868171932";

const serviceOptions = [
  { value: "Schedule a visit", en: "Schedule a visit", es: "Pedir una cita" },
  { value: "Ask a question", en: "Ask a question", es: "Hacer una pregunta" },
  { value: "Membership info", en: "Membership info", es: "Información de membresía" },
  { value: "Other", en: "Other", es: "Otro" },
];

const actionBarFormText = {
  en: {
    title: "Request a Visit",
    subtitle: "We'll reach out to confirm your appointment.",
    close: "Close form",
    success: "Thank you! A care coordinator will reach out soon.",
    name: "Full name",
    namePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "you@email.com",
    phone: "Phone",
    service: "Service",
    selectService: "Select a service...",
    sending: "Sending...",
    submit: "Request visit",
    genericError: "Something went wrong. Please try again or call us at (239) 423-0205.",
    networkError: "Could not send your request. Please try again or call us at (239) 423-0205.",
    privacy: "This form is not for protected health information. For urgent questions call",
  },
  es: {
    title: "Pedir una cita",
    subtitle: "Nos comunicaremos con usted para confirmar la cita.",
    close: "Cerrar formulario",
    success: "¡Gracias! Nuestro equipo se comunicará con usted pronto.",
    name: "Nombre completo",
    namePlaceholder: "Su nombre completo",
    email: "Correo electrónico",
    emailPlaceholder: "usted@correo.com",
    phone: "Teléfono",
    service: "Motivo",
    selectService: "Seleccione un motivo...",
    sending: "Enviando...",
    submit: "Pedir cita",
    genericError: "Algo salió mal. Intente de nuevo o llámenos al (239) 423-0205.",
    networkError: "No pudimos enviar su solicitud. Intente de nuevo o llámenos al (239) 423-0205.",
    privacy: "Este formulario no es para información médica protegida. Para preguntas urgentes, llame al",
  },
} as const;

const actions = [
  {
    id: "call",
    label: "Llamar",
    labelEn: "Call",
    icon: Phone,
    href: `tel:${PHONE_NUMBER}`,
    color: "text-primary",
    bgColor: "bg-primary/8",
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    labelEn: "WhatsApp",
    icon: WhatsappLogo,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20schedule%20an%20appointment`,
    color: "text-[#25D366]",
    bgColor: "bg-[#25D366]/8",
    external: true,
  },
  {
    id: "directions",
    label: "Llegar",
    labelEn: "Directions",
    icon: NavigationArrow,
    href: CLINIC_GMAPS_DIRECTIONS_URL,
    color: "text-secondary",
    bgColor: "bg-secondary/8",
    external: true,
  },
  {
    id: "appointment",
    label: "Cita",
    labelEn: "Book",
    icon: CalendarCheck,
    href: "#",
    color: "text-primary",
    bgColor: "bg-primary/8",
    external: false,
  },
];

export function MobileActionBar() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [formOpen, setFormOpen] = React.useState(false);
  const [location] = useLocation();
  const isSpanish = location === "/es" || location.startsWith("/es/");

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtBottom = (window.innerHeight + currentScrollY) >= (document.documentElement.scrollHeight - 100);

      if (isAtBottom) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 md:hidden",
          "transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
        data-testid="mobile-action-bar"
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-stretch justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {actions.map((action) => {
              const Icon = action.icon;

              if (action.id === "appointment") {
                return (
                  <button
                    key={action.id}
                    onClick={() => setFormOpen(true)}
                    className="flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-xl active:scale-95 transition-transform"
                    data-testid={`action-bar-${action.id}`}
                  >
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", action.bgColor)}>
                      <Icon className={cn("w-5 h-5", action.color)} weight="fill" />
                    </div>
                    <span className="text-[11px] font-semibold text-deep-navy/70 tracking-tight">
                      {isSpanish ? action.label : action.labelEn}
                    </span>
                  </button>
                );
              }

              if (action.external) {
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.id === "whatsapp" || action.id === "directions" ? "_blank" : undefined}
                    rel={action.id === "whatsapp" || action.id === "directions" ? "noopener noreferrer" : undefined}
                    className="flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-xl active:scale-95 transition-transform"
                    data-testid={`action-bar-${action.id}`}
                  >
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", action.bgColor)}>
                      <Icon className={cn("w-5 h-5", action.color)} weight="fill" />
                    </div>
                    <span className="text-[11px] font-semibold text-deep-navy/70 tracking-tight">
                      {isSpanish ? action.label : action.labelEn}
                    </span>
                  </a>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>

      <ActionBarContactModal isOpen={formOpen} onClose={() => setFormOpen(false)} isSpanish={isSpanish} />
    </>
  );
}

function ActionBarContactModal({ isOpen, onClose, isSpanish }: { isOpen: boolean; onClose: () => void; isSpanish: boolean }) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [location] = useLocation();
  const t = actionBarFormText[isSpanish ? "es" : "en"];

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || "Schedule a visit",
          message: "",
          sourcePage: location,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(isSpanish ? t.genericError : result.error || t.genericError);
        return;
      }
      trackLead("mobile_action_bar_form", location);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "" });
      setTimeout(() => { setSubmitted(false); onClose(); }, 4000);
    } catch {
      setError(t.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-[hsl(var(--primary)/0.04)] rounded-[12px] border border-[hsl(var(--primary)/0.1)] text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/0.4)] focus:outline-none focus:border-[hsl(var(--primary)/0.3)] focus:ring-1 focus:ring-[hsl(var(--primary)/0.15)] transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          lang={isSpanish ? "es" : "en"}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            data-testid="action-bar-contact-backdrop"
          />
          <motion.div
            className="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            data-testid="action-bar-contact-sheet"
            lang={isSpanish ? "es" : "en"}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-lg font-bold text-[hsl(var(--foreground))]">{t.title}</p>
                <p className="text-sm text-[hsl(var(--foreground)/0.5)]">{t.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.06)] flex items-center justify-center"
                data-testid="button-action-bar-contact-close"
                aria-label={t.close}
              >
                <X weight="bold" size={18} className="text-[hsl(var(--foreground))]" />
              </button>
            </div>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 py-8">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center">
                  <PaperPlaneTilt weight="fill" className="w-5 h-5 text-[hsl(var(--success))]" />
                </div>
                <p className="text-lg font-semibold text-[hsl(var(--foreground))]" data-testid="text-action-bar-form-success">
                  {t.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="action-bar-contact-form" data-clarity-mask="true">
                <div>
                  <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="ab-contact-name">
                    {t.name}
                  </label>
                  <input
                    id="ab-contact-name"
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    data-testid="input-ab-contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="ab-contact-email">
                    {t.email}
                  </label>
                  <input
                    id="ab-contact-email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    data-testid="input-ab-contact-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="ab-contact-phone">
                    {t.phone}
                  </label>
                  <input
                    id="ab-contact-phone"
                    type="tel"
                    placeholder="(239) 423-0205"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                    data-testid="input-ab-contact-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5" htmlFor="ab-contact-service">
                    {t.service}
                  </label>
                  <select
                    id="ab-contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={inputClass + " appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10"}
                    data-testid="select-ab-contact-service"
                  >
                    <option value="">{t.selectService}</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{isSpanish ? option.es : option.en}</option>
                    ))}
                  </select>
                </div>
                {error && (
                  <p className="text-sm text-[hsl(var(--urgent))] font-medium" data-testid="text-ab-contact-error">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full flex-shrink-0 whitespace-nowrap mt-2"
                  data-testid="button-ab-contact-submit"
                >
                  {submitting ? (
                    <>
                      <CircleNotch weight="bold" size={20} className="mr-2 animate-spin" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      {t.submit}
                      <ArrowRight weight="regular" size={20} className="ml-1" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-[hsl(var(--foreground)/0.5)] text-center mt-1">
                  {t.privacy} <a href="tel:2394230205" className="underline">(239) 423-0205</a>.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
