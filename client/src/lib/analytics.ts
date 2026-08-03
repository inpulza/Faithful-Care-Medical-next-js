import {
  CLARITY_PROJECT_ID,
  GA4_MEASUREMENT_ID,
  type ConsentCategories,
} from "@shared/tracking";

type TrackingValue = string | number | boolean | null | undefined;
type TrackingParameters = Record<string, TrackingValue>;
type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: IArguments[];
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: ClarityFunction;
    __fcmsLastTrackedPage?: string;
    __fcmsConsentState?: ConsentCategories;
    __fcmsAnalyticsInitialized?: boolean;
  }
}

function loadTrackingTag(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureAnalyticsLoaded(state: ConsentCategories) {
  if (window.__fcmsAnalyticsInitialized) return;
  window.__fcmsAnalyticsInitialized = true;

  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA4_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  });
  loadTrackingTag(
    "fcms-google-tag",
    `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`,
  );
  loadTrackingTag(
    "fcms-clarity-tag",
    `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=next`,
  );
}

function deleteCookie(name: string) {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const hostname = window.location.hostname;
  const domains = new Set<string | null>([null, hostname, `.${hostname}`]);
  if (hostname === "faithfulcaremedical.com" || hostname.endsWith(".faithfulcaremedical.com")) {
    domains.add(".faithfulcaremedical.com");
  }

  for (const domain of domains) {
    const domainPart = domain ? ` Domain=${domain};` : "";
    document.cookie = `${name}=; Max-Age=0; Path=/;${domainPart} SameSite=Lax`;
  }
}

function clearCookiesWithPrefixes(prefixes: string[]) {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name));

  for (const name of names) {
    if (prefixes.some((prefix) => name === prefix || name.startsWith(prefix))) {
      deleteCookie(name);
    }
  }
}

export function updateTrackingConsent(state: ConsentCategories): boolean {
  if (typeof window === "undefined") return false;
  const trackingWasLoaded = window.__fcmsAnalyticsInitialized === true;
  window.__fcmsConsentState = state;

  window.gtag?.("consent", "update", {
    ad_storage: state.advertising ? "granted" : "denied",
    ad_user_data: state.advertising ? "granted" : "denied",
    ad_personalization: state.personalization ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
  });

  if (state.analytics) {
    window.clarity?.("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "granted",
    });
    ensureAnalyticsLoaded(state);
    trackPageView();
  } else {
    if (window.__fcmsAnalyticsInitialized) {
      window.clarity?.("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "denied",
      });
      window.clarity?.("consent", false);
    }
    window.__fcmsLastTrackedPage = undefined;
    clearCookiesWithPrefixes(["_ga", "_clck", "_clsk"]);
  }
  if (!state.advertising) {
    clearCookiesWithPrefixes(["_gcl_"]);
  }
  return trackingWasLoaded && !state.analytics;
}

export function trackEvent(name: string, parameters: TrackingParameters = {}) {
  if (
    typeof window === "undefined" ||
    window.__fcmsConsentState?.analytics !== true ||
    typeof window.gtag !== "function"
  ) {
    return;
  }
  window.gtag("event", name, parameters);
}

export function trackLead(formId: string, sourcePage: string) {
  if (typeof window === "undefined" || window.__fcmsConsentState?.advertising !== true) {
    return;
  }
  trackEvent("generate_lead", {
    form_id: formId,
    source_page: sourcePage,
  });
}

export function trackPageView() {
  if (typeof window === "undefined" || window.__fcmsConsentState?.analytics !== true) return;
  const pagePath = window.location.pathname;
  if (window.__fcmsLastTrackedPage === pagePath) return;
  window.__fcmsLastTrackedPage = pagePath;

  trackEvent("page_view", {
    page_path: pagePath,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_title: document.title,
  });
}
