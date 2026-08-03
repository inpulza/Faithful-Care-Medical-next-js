import * as React from "react";
import { updateTrackingConsent } from "@/lib/analytics";
import {
  ALL_GRANTED,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_DENIED,
  type ConsentCategories,
  type StoredConsent,
} from "@shared/tracking";

export const OPEN_PREFERENCES_EVENT = "fcms:open-cookie-preferences";

export {
  ALL_GRANTED,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_DENIED,
  type ConsentCategories,
  type StoredConsent,
};

function applyBrowserPrivacySignals(state: ConsentCategories): ConsentCategories {
  if (
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  ) {
    return {
      ...state,
      advertising: false,
      personalization: false,
    };
  }
  return state;
}

export function parseStoredConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (
      !parsed ||
      parsed.version !== CONSENT_VERSION ||
      !parsed.state ||
      parsed.state.necessary !== true ||
      typeof parsed.state.analytics !== "boolean" ||
      typeof parsed.state.advertising !== "boolean" ||
      typeof parsed.state.personalization !== "boolean"
    ) {
      return null;
    }
    return {
      ...parsed,
      state: applyBrowserPrivacySignals(parsed.state),
    };
  } catch {
    return null;
  }
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeStoredConsent(state: ConsentCategories): StoredConsent {
  const effectiveState = applyBrowserPrivacySignals(state);
  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    state: effectiveState,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be blocked; fail silently.
  }
  return payload;
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
    setState(stored.state);
    const requiresReload = updateTrackingConsent(stored.state);
    if (requiresReload) {
      window.setTimeout(() => window.location.reload(), 0);
    }
  }, []);

  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY) return;
      const stored = parseStoredConsent(event.newValue);
      const nextState = stored?.state ?? DEFAULT_DENIED;
      setDecision(stored);
      setState(nextState);
      const requiresReload = updateTrackingConsent(nextState);
      if (requiresReload) {
        window.setTimeout(() => window.location.reload(), 0);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
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
