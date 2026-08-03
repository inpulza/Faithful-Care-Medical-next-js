import * as React from "react";
import { useLocation } from "@/lib/router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Cookie, ShieldCheck } from "@phosphor-icons/react";
import {
  ALL_GRANTED,
  DEFAULT_DENIED,
  OPEN_PREFERENCES_EVENT,
  isLikelyCrawler,
  useConsent,
  type ConsentCategories,
} from "@/hooks/use-consent";

const HIDDEN_PATHS = new Set<string>([
  "/privacy-policy",
  "/notice-of-privacy-practices",
]);

const COOKIE_COPY = {
  en: {
    bannerAria: "Cookie consent",
    title: "We value your privacy",
    body: "We use necessary cookies to run this site. Analytics tools load only with your permission. You can accept all, reject non-essential cookies, or customize your choices. See our",
    privacyPolicy: "Privacy Policy",
    acceptAll: "Accept All",
    reject: "Reject Non-Essential",
    customize: "Customize",
    drawerTitle: "Cookie preferences",
    close: "Close",
    drawerIntro: "Choose how Faithful Care can use cookies on this site. You can change your choices at any time from the footer.",
    necessaryTitle: "Necessary",
    necessaryDescription: "Required for the site to function (security, page navigation, and form submission). Always on.",
    analyticsTitle: "Analytics",
    analyticsDescription: "Loads Google Analytics 4 and Microsoft Clarity only after you allow it, helping us improve traffic and site usability.",
    advertisingTitle: "Advertising",
    advertisingDescription: "Supports measurement for Google Ads campaigns when an advertising tag is enabled.",
    personalizationTitle: "Ad personalization",
    personalizationDescription: "Allows advertising platforms to personalize ads when campaigns are enabled. It is not required to remember your cookie choice.",
    save: "Save my preferences",
    readOur: "Read our",
    and: "and",
    hipaaNotice: "HIPAA Notice",
    details: "for full details.",
  },
  es: {
    bannerAria: "Consentimiento de cookies",
    title: "Valoramos tu privacidad",
    body: "Usamos cookies necesarias para que este sitio funcione. Las herramientas de analítica solo se cargan con tu permiso. Puedes aceptar todo, rechazar las cookies no esenciales o personalizar tus opciones. Consulta nuestra",
    privacyPolicy: "Política de privacidad",
    acceptAll: "Aceptar todo",
    reject: "Rechazar no esenciales",
    customize: "Personalizar",
    drawerTitle: "Preferencias de cookies",
    close: "Cerrar",
    drawerIntro: "Elige cómo Faithful Care puede usar cookies en este sitio. Puedes cambiar tus opciones en cualquier momento desde el pie de página.",
    necessaryTitle: "Necesarias",
    necessaryDescription: "Son imprescindibles para la seguridad, la navegación y el envío de formularios. Siempre están activas.",
    analyticsTitle: "Analítica",
    analyticsDescription: "Carga Google Analytics 4 y Microsoft Clarity solo después de que lo permitas, para ayudarnos a mejorar el tráfico y la experiencia del sitio.",
    advertisingTitle: "Publicidad",
    advertisingDescription: "Permite medir campañas de Google Ads cuando exista una etiqueta publicitaria activa.",
    personalizationTitle: "Personalización de anuncios",
    personalizationDescription: "Permite que las plataformas publicitarias personalicen anuncios cuando haya campañas activas. No es necesaria para recordar tu elección de cookies.",
    save: "Guardar mis preferencias",
    readOur: "Consulta nuestra",
    and: "y el",
    hipaaNotice: "Aviso HIPAA",
    details: "para conocer todos los detalles.",
  },
} as const;

type CookieCopy = (typeof COOKIE_COPY)[keyof typeof COOKIE_COPY];

export function CookieBanner() {
  const [location] = useLocation();
  const copy = COOKIE_COPY[location.startsWith("/es") ? "es" : "en"];
  const { decision, state, setState, save, acceptAll, rejectAll, hasDecision } = useConsent();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [crawler, setCrawler] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    setCrawler(isLikelyCrawler());
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, []);

  React.useEffect(() => {
    const open = () => {
      setState(decision?.state ?? DEFAULT_DENIED);
      setDrawerOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, [decision, setState]);

  const isHiddenPath = HIDDEN_PATHS.has(location);
  const showBanner = !crawler && !hasDecision && !isHiddenPath && !drawerOpen;

  const motionDuration = reducedMotion ? 0 : 0.35;

  const handleSavePreferences = () => {
    save(state);
    setDrawerOpen(false);
  };

  const handleAcceptAllFromDrawer = () => {
    save(ALL_GRANTED);
    setDrawerOpen(false);
  };

  const handleRejectAllFromDrawer = () => {
    save(DEFAULT_DENIED);
    setDrawerOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key="cookie-banner"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: motionDuration, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-x-3 bottom-3 md:inset-x-auto md:right-6 md:bottom-6 md:w-[560px] md:max-w-[calc(100vw-3rem)] z-[100]"
            role="dialog"
            aria-label={copy.bannerAria}
            aria-describedby="cookie-banner-text"
            data-testid="cookie-banner"
          >
            <div className="bg-white rounded-2xl border border-primary/30 shadow-2xl p-5 md:p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-primary" weight="duotone" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-serif text-[20px] leading-tight text-foreground">
                    {copy.title}
                  </h2>
                </div>
              </div>
              <p
                id="cookie-banner-text"
                className="text-[15px] leading-[1.55] text-foreground/80 mb-4"
              >
                {copy.body}{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {copy.privacyPolicy}
                </a>
                .
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="w-full rounded-full bg-primary text-white text-base font-semibold px-6 min-h-[56px] whitespace-nowrap hover:bg-primary/90 transition-colors"
                  data-testid="button-cookie-accept-all"
                >
                  {copy.acceptAll}
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="flex-1 rounded-full border border-primary/40 text-primary text-base font-semibold px-6 min-h-[56px] whitespace-nowrap hover:bg-primary/5 transition-colors"
                    data-testid="button-cookie-reject"
                  >
                    {copy.reject}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setState(decision?.state ?? DEFAULT_DENIED);
                      setDrawerOpen(true);
                    }}
                    className="flex-1 rounded-full border border-primary/40 text-primary text-base font-semibold px-6 min-h-[56px] whitespace-nowrap hover:bg-primary/5 transition-colors"
                    data-testid="button-cookie-customize"
                  >
                    {copy.customize}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferencesDrawer
        open={drawerOpen}
        state={state}
        setState={setState}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSavePreferences}
        onAcceptAll={handleAcceptAllFromDrawer}
        onRejectAll={handleRejectAllFromDrawer}
        canCloseWithoutDecision={hasDecision}
        reducedMotion={reducedMotion}
        copy={copy}
      />
    </>
  );
}

interface DrawerProps {
  open: boolean;
  state: ConsentCategories;
  setState: React.Dispatch<React.SetStateAction<ConsentCategories>>;
  onClose: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  canCloseWithoutDecision: boolean;
  reducedMotion: boolean;
  copy: CookieCopy;
}

function CookiePreferencesDrawer({
  open,
  state,
  setState,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
  canCloseWithoutDecision,
  reducedMotion,
  copy,
}: DrawerProps) {
  const drawerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (canCloseWithoutDecision) onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === drawerRef.current) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus?.();
    };
  }, [open, canCloseWithoutDecision, onClose]);

  const motionDuration = reducedMotion ? 0 : 0.3;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cookie-drawer-root"
          className="fixed inset-0 z-[110] flex items-end md:items-center md:justify-end"
          aria-hidden={!open}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionDuration }}
            className="absolute inset-0 bg-foreground/40"
            onClick={() => {
              if (canCloseWithoutDecision) onClose();
            }}
            data-testid="cookie-drawer-backdrop"
          />
          <motion.div
            ref={drawerRef}
            initial={{ y: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }}
            transition={{ duration: motionDuration, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-h-screen max-h-[100dvh] md:w-[460px] md:h-full md:max-h-screen bg-white overflow-y-auto rounded-t-3xl md:rounded-none border-t md:border-t-0 md:border-l border-primary/20 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-drawer-title"
            tabIndex={-1}
            data-testid="cookie-preferences-drawer"
          >
            <div className="sticky top-0 z-10 bg-white border-b border-primary/15 px-6 py-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" weight="duotone" aria-hidden="true" />
                </div>
                <h2
                  id="cookie-drawer-title"
                  className="font-serif text-[22px] leading-tight text-foreground"
                >
                  {copy.drawerTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (canCloseWithoutDecision) onClose();
                }}
                className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={copy.close}
                disabled={!canCloseWithoutDecision}
                data-testid="button-cookie-drawer-close"
              >
                <X className="w-4 h-4" weight="bold" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-[15px] leading-[1.55] text-foreground/80 mb-6">
                {copy.drawerIntro}
              </p>

              <CategoryRow
                title={copy.necessaryTitle}
                description={copy.necessaryDescription}
                checked
                disabled
                onChange={() => {}}
                testId="cookie-toggle-necessary"
              />
              <CategoryRow
                title={copy.analyticsTitle}
                description={copy.analyticsDescription}
                checked={state.analytics}
                onChange={(v) => setState((s) => ({ ...s, analytics: v }))}
                testId="cookie-toggle-analytics"
              />
              <CategoryRow
                title={copy.advertisingTitle}
                description={copy.advertisingDescription}
                checked={state.advertising}
                onChange={(v) => setState((s) => ({ ...s, advertising: v }))}
                testId="cookie-toggle-advertising"
              />
              <CategoryRow
                title={copy.personalizationTitle}
                description={copy.personalizationDescription}
                checked={state.personalization}
                onChange={(v) => setState((s) => ({ ...s, personalization: v }))}
                testId="cookie-toggle-personalization"
              />

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onAcceptAll}
                  className="rounded-full bg-primary text-white text-base font-semibold px-5 min-h-[64px] hover:bg-primary/90 transition-colors"
                  data-testid="button-cookie-drawer-accept-all"
                >
                  {copy.acceptAll}
                </button>
                <button
                  type="button"
                  onClick={onRejectAll}
                  className="rounded-full border border-primary/40 text-primary text-base font-semibold px-5 min-h-[64px] hover:bg-primary/5 transition-colors"
                  data-testid="button-cookie-drawer-reject"
                >
                  {copy.reject}
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  className="sm:col-span-2 rounded-full border border-primary text-primary text-base font-semibold px-5 min-h-[64px] hover:bg-primary hover:text-white transition-colors"
                  data-testid="button-cookie-drawer-save"
                >
                  {copy.save}
                </button>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-foreground/60">
                {copy.readOur}{" "}
                <a href="/privacy-policy" className="text-primary underline underline-offset-2">
                  {copy.privacyPolicy}
                </a>{" "}
                {copy.and}{" "}
                <a
                  href="/notice-of-privacy-practices"
                  className="text-primary underline underline-offset-2"
                >
                  {copy.hipaaNotice}
                </a>{" "}
                {copy.details}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CategoryRowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  testId: string;
}

function CategoryRow({ title, description, checked, disabled, onChange, testId }: CategoryRowProps) {
  return (
    <div className="py-4 border-b border-primary/10 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-[16px] font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-[14px] leading-[1.5] text-foreground/70">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={`${title} cookies`}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={`relative inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-primary/5"
          }`}
          data-testid={testId}
        >
          <span
            className={`relative block h-8 w-14 rounded-full transition-colors ${
              checked ? "bg-primary" : "bg-foreground/20"
            }`}
          >
            <span
              className={`absolute top-1 inline-block h-6 w-6 rounded-full bg-white shadow transition-transform ${
                checked ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
