import {
  CLARITY_PROJECT_ID,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GA4_MEASUREMENT_ID,
} from "@shared/tracking";
import Script from "next/script";

const bootstrap = `
(function () {
  var state = {
    necessary: true,
    analytics: false,
    advertising: false,
    personalization: false
  };

  try {
    var raw = window.localStorage && window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
    var stored = raw ? JSON.parse(raw) : null;
    if (
      stored &&
      stored.version === ${CONSENT_VERSION} &&
      stored.state &&
      stored.state.necessary === true &&
      typeof stored.state.analytics === "boolean" &&
      typeof stored.state.advertising === "boolean" &&
      typeof stored.state.personalization === "boolean"
    ) {
      state = stored.state;
    }
  } catch (error) {}

  if (navigator.globalPrivacyControl === true) {
    state = {
      necessary: true,
      analytics: state.analytics,
      advertising: false,
      personalization: false
    };
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  window.__fcmsConsentState = state;
  window.__fcmsAnalyticsInitialized = false;

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  if (state.analytics) {
    window.gtag("consent", "update", {
      ad_storage: state.advertising ? "granted" : "denied",
      ad_user_data: state.advertising ? "granted" : "denied",
      ad_personalization: state.personalization ? "granted" : "denied",
      analytics_storage: state.analytics ? "granted" : "denied"
    });

    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "granted"
    });

    window.gtag("js", new Date());
    window.gtag("config", ${JSON.stringify(GA4_MEASUREMENT_ID)}, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: false
    });
  }

  function loadTrackingTag(id, src) {
    if (document.getElementById(id)) return;
    var script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  if (state.analytics) {
    window.__fcmsAnalyticsInitialized = true;
    loadTrackingTag(
      "fcms-google-tag",
      "https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}"
    );
    loadTrackingTag(
      "fcms-clarity-tag",
      "https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=next"
    );
  }
})();
`;

export function TrackingScripts() {
  return (
    <Script
      id="fcms-consent-bootstrap"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: bootstrap }}
    />
  );
}
