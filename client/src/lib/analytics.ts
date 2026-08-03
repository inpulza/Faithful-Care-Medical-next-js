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
    __fcmsInitialPageLocation?: string;
    __fcmsAllowedTrackingPaths?: readonly string[];
  }
}

function safeTrackingPath(pathname: string) {
  return window.__fcmsAllowedTrackingPaths?.includes(pathname) ? pathname : "/404";
}

function sanitizedReferrer() {
  if (!document.referrer) return "";
  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin
      ? `${referrer.origin}${safeTrackingPath(referrer.pathname)}`
      : referrer.origin;
  } catch {
    return "";
  }
}

function currentPageContext() {
  const pagePath = safeTrackingPath(window.location.pathname);
  return {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_referrer: sanitizedReferrer(),
  };
}

function sanitizeSourcePage(sourcePage: string) {
  try {
    const source = new URL(sourcePage, window.location.origin);
    return source.origin === window.location.origin
      ? safeTrackingPath(source.pathname)
      : safeTrackingPath(window.location.pathname);
  } catch {
    return safeTrackingPath(window.location.pathname);
  }
}

const AD_CLICK_PARAMETERS = ["gclid", "dclid", "gbraid", "wbraid"] as const;
const AD_AGGREGATE_PARAMETERS = ["gad", "gad_source", "gad_campaignid"] as const;
const VALID_AD_CLICK_ID = /^[A-Za-z0-9._~-]{1,512}$/;
const VALID_AD_AGGREGATE_ID = /^[0-9]{1,20}$/;

function prepareBrowserUrlForTracking(state: ConsentCategories) {
  const originalUrl = new URL(window.location.href);
  const pagePath = safeTrackingPath(originalUrl.pathname);
  const safeHash = originalUrl.hash === "#main" || originalUrl.hash === "#callback"
    ? originalUrl.hash
    : "";
  const retainedParameters = new URLSearchParams();
  if (state.advertising) {
    for (const name of AD_CLICK_PARAMETERS) {
      const values = originalUrl.searchParams.getAll(name);
      const value = values.length === 1 ? values[0] : "";
      if (VALID_AD_CLICK_ID.test(value)) retainedParameters.set(name, value);
    }
    for (const name of AD_AGGREGATE_PARAMETERS) {
      const values = originalUrl.searchParams.getAll(name);
      const value = values.length === 1 ? values[0] : "";
      if (VALID_AD_AGGREGATE_ID.test(value)) retainedParameters.set(name, value);
    }
  }
  const serializedParameters = retainedParameters.toString();
  const retainedSearch = serializedParameters ? `?${serializedParameters}` : "";
  const clarityEligible = pagePath !== "/404"
    && !originalUrl.search
    && !originalUrl.hash
    && !document.referrer;

  if (originalUrl.search !== retainedSearch || originalUrl.hash !== safeHash) {
    window.history.replaceState(
      window.history.state,
      "",
      `${originalUrl.pathname}${retainedSearch}${safeHash}`,
    );
  }

  return {
    clarityEligible,
    initialPageLocation: `${originalUrl.origin}${pagePath}`,
  };
}

function loadTrackingTag(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureAnalyticsLoaded(
  state: ConsentCategories,
  prepared = prepareBrowserUrlForTracking(state),
) {
  if (window.__fcmsAnalyticsInitialized) return;
  window.__fcmsAnalyticsInitialized = true;
  const { clarityEligible, initialPageLocation } = prepared;
  const pageContext = currentPageContext();
  window.__fcmsInitialPageLocation = initialPageLocation;

  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA4_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: initialPageLocation,
    page_path: pageContext.page_path,
    page_referrer: pageContext.page_referrer,
    send_page_view: false,
  });
  loadTrackingTag(
    "fcms-google-tag",
    `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`,
  );
  if (clarityEligible) {
    loadTrackingTag(
      "fcms-clarity-tag",
      `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=next`,
    );
  }
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
  const prepared = prepareBrowserUrlForTracking(state);
  const trackingPathAllowed = safeTrackingPath(window.location.pathname) !== "/404";

  if (!trackingPathAllowed) {
    window.__fcmsLastTrackedPage = undefined;
    if (trackingWasLoaded) {
      window.gtag?.("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      window.clarity?.("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "denied",
      });
      window.clarity?.("consent", false);
      clearCookiesWithPrefixes(["_ga", "_gcl_", "_clck", "_clsk"]);
    }
    return trackingWasLoaded;
  }

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
    ensureAnalyticsLoaded(state, prepared);
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
    safeTrackingPath(window.location.pathname) === "/404" ||
    window.__fcmsConsentState?.analytics !== true ||
    typeof window.gtag !== "function"
  ) {
    return;
  }
  const pageContext = currentPageContext();
  const pageLocation = name === "page_view" && window.__fcmsInitialPageLocation
    ? window.__fcmsInitialPageLocation
    : pageContext.page_location;
  window.gtag("event", name, {
    ...parameters,
    page_path: pageContext.page_path,
    page_location: pageLocation,
    page_referrer: pageContext.page_referrer,
  });
  if (name === "page_view") window.__fcmsInitialPageLocation = undefined;
}

export function trackLead(formId: string, sourcePage: string) {
  if (typeof window === "undefined" || window.__fcmsConsentState?.advertising !== true) {
    return;
  }
  trackEvent("generate_lead", {
    form_id: formId,
    source_page: sanitizeSourcePage(sourcePage),
  });
}

export function trackPageView() {
  if (typeof window === "undefined" || window.__fcmsConsentState?.analytics !== true) return;
  const pagePath = safeTrackingPath(window.location.pathname);
  if (pagePath === "/404") return;
  if (window.__fcmsLastTrackedPage === pagePath) return;
  window.__fcmsLastTrackedPage = pagePath;

  trackEvent("page_view", {
    page_path: pagePath,
    page_title: document.title,
  });
}
