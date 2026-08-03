import {
  CLARITY_PROJECT_ID,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GA4_MEASUREMENT_ID,
} from "@shared/tracking";
import Script from "next/script";
import { publicRoutes } from "./lib/route-contract";

const TRACKABLE_PATHS = publicRoutes.map(({ path }) => path);

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
  var allowedTrackingPaths = Object.freeze(${JSON.stringify(TRACKABLE_PATHS)});
  window.__fcmsAllowedTrackingPaths = allowedTrackingPaths;
  var trackingPathAllowed = allowedTrackingPaths.indexOf(window.location.pathname) !== -1;
  var clarityEligible = true;
  var pagePath = trackingPathAllowed ? window.location.pathname : "/404";
  var pageLocation = window.location.origin + pagePath;
  var pageReferrer = "";

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  if (state.analytics && trackingPathAllowed) {
    try {
      var originalUrl = new URL(window.location.href);
      var referrerUrl = document.referrer ? new URL(document.referrer) : null;
      trackingPathAllowed = allowedTrackingPaths.indexOf(originalUrl.pathname) !== -1;
      var safeHash = originalUrl.hash === "#main" || originalUrl.hash === "#callback"
        ? originalUrl.hash
        : "";
      var retainedSearch = "";
      if (state.advertising) {
        var retainedParameters = new URLSearchParams();
        ["gclid", "dclid", "gbraid", "wbraid"].forEach(function (name) {
          var values = originalUrl.searchParams.getAll(name);
          var value = values.length === 1 ? values[0] : "";
          if (/^[A-Za-z0-9._~-]{1,512}$/.test(value)) {
            retainedParameters.set(name, value);
          }
        });
        ["gad", "gad_source", "gad_campaignid"].forEach(function (name) {
          var values = originalUrl.searchParams.getAll(name);
          var value = values.length === 1 ? values[0] : "";
          if (/^[0-9]{1,20}$/.test(value)) {
            retainedParameters.set(name, value);
          }
        });
        var serializedParameters = retainedParameters.toString();
        retainedSearch = serializedParameters ? "?" + serializedParameters : "";
      }
      clarityEligible = trackingPathAllowed && !originalUrl.search && !originalUrl.hash && !referrerUrl;
      if (referrerUrl) {
        var referrerPath = allowedTrackingPaths.indexOf(referrerUrl.pathname) !== -1
          ? referrerUrl.pathname
          : "/404";
        pageReferrer = referrerUrl.origin === originalUrl.origin
          ? referrerUrl.origin + referrerPath
          : referrerUrl.origin;
      }
      if (originalUrl.search !== retainedSearch || originalUrl.hash !== safeHash) {
        window.history.replaceState(
          window.history.state,
          "",
          originalUrl.pathname + retainedSearch + safeHash
        );
      }
      pagePath = trackingPathAllowed ? originalUrl.pathname : "/404";
      pageLocation = originalUrl.origin + pagePath;
      window.__fcmsInitialPageLocation = pageLocation;
    } catch (error) {
      clarityEligible = false;
      window.__fcmsInitialPageLocation = pageLocation;
    }

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
      page_location: pageLocation,
      page_path: pagePath,
      page_referrer: pageReferrer,
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

  if (state.analytics && trackingPathAllowed) {
    window.__fcmsAnalyticsInitialized = true;
    loadTrackingTag(
      "fcms-google-tag",
      "https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}"
    );
    if (clarityEligible) {
      loadTrackingTag(
        "fcms-clarity-tag",
        "https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=next"
      );
    }
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
