import * as React from "react";

export const CONSENT_STORAGE_KEY = "fcms_consent_v1";
export const CONSENT_VERSION = 1;
export const OPEN_PREFERENCES_EVENT = "fcms:open-cookie-preferences";

export interface ConsentCategories {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
}

export interface StoredConsent {
  version: number;
  decidedAt: string;
  state: ConsentCategories;
}

export const DEFAULT_DENIED: ConsentCategories = {
  necessary: true,
  analytics: false,
  advertising: false,
  personalization: false,
};

export const ALL_GRANTED: ConsentCategories = {
  necessary: true,
  analytics: true,
  advertising: true,
  personalization: true,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredConsent(state: ConsentCategories): StoredConsent {
  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    state,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be blocked; fail silently.
  }
  return payload;
}

export function updateGtagConsent(state: ConsentCategories) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: state.advertising ? "granted" : "denied",
    ad_user_data: state.advertising ? "granted" : "denied",
    ad_personalization: state.personalization ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
  });
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}

export function isLikelyCrawler(): boolean {
  if (typeof navigator === "undefined") return true;
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return true;
  const ua = navigator.userAgent || "";
  return /bot|crawl|spider|headless|preview|prerender|lighthouse/i.test(ua);
}

export interface UseConsentResult {
  decision: StoredConsent | null;
  state: ConsentCategories;
  setState: React.Dispatch<React.SetStateAction<ConsentCategories>>;
  save: (next: ConsentCategories) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  hasDecision: boolean;
}

export function useConsent(): UseConsentResult {
  const [decision, setDecision] = React.useState<StoredConsent | null>(() => readStoredConsent());
  const [state, setState] = React.useState<ConsentCategories>(
    () => decision?.state ?? DEFAULT_DENIED
  );

  const save = React.useCallback((next: ConsentCategories) => {
    const stored = writeStoredConsent(next);
    setDecision(stored);
    setState(next);
    updateGtagConsent(next);
  }, []);

  const acceptAll = React.useCallback(() => save(ALL_GRANTED), [save]);
  const rejectAll = React.useCallback(() => save(DEFAULT_DENIED), [save]);

  return {
    decision,
    state,
    setState,
    save,
    acceptAll,
    rejectAll,
    hasDecision: decision !== null,
  };
}
