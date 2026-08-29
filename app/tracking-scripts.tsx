import {
  CLARITY_PROJECT_ID,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GA4_MEASUREMENT_ID,
} from "@shared/tracking";
import {
  CONDITION_TRACKING_PATH_ALIASES,
  CONDITION_TRACKING_TITLE_ALIASES,
} from "@shared/tracking-route-privacy";
import { publicRoutes } from "./lib/route-contract";

const TRACKABLE_PATHS = publicRoutes.map(({ path }) => path);

export const TRACKING_BOOTSTRAP = `
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
  var trackingPathAliases = Object.freeze(${JSON.stringify(CONDITION_TRACKING_PATH_ALIASES)});
  var trackingTitleAliases = Object.freeze(${JSON.stringify(CONDITION_TRACKING_TITLE_ALIASES)});
  function conditionGuideLinkForEvent(event) {
    var target = event.target;
    var element = target && target.nodeType === 1 ? target : target && target.parentElement;
    var anchor = element && typeof element.closest === "function"
      ? element.closest("a[href]")
      : null;
    if (!anchor) return null;

    try {
      var url = new URL(anchor.getAttribute("href"), window.location.href);
      if (
        url.origin !== window.location.origin ||
        !Object.prototype.hasOwnProperty.call(trackingPathAliases, url.pathname)
      ) {
        return null;
      }
      // Hash links and other same-page actions inside a condition guide do
      // not cross the privacy boundary. Leave their native behavior intact.
      if (url.pathname === window.location.pathname) return null;
      return { anchor: anchor, url: url };
    } catch (error) {
      return null;
    }
  }
  function guardConditionGuideClick(event) {
    var match = conditionGuideLinkForEvent(event);
    if (!match) return;

    // This listener is installed before Clarity. Stop the exact guide click
    // from reaching later capture listeners while preserving native modified
    // clicks and new-tab behavior.
    event.stopImmediatePropagation();
    var opensSeparateContext =
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      match.anchor.getAttribute("target") === "_blank";
    if (event.type === "click" && !opensSeparateContext) {
      event.preventDefault();
      window.location.assign(match.url.href);
    }
  }
  window.addEventListener("click", guardConditionGuideClick, true);
  window.addEventListener("auxclick", guardConditionGuideClick, true);
  function safeTrackingPath(pathname) {
    if (allowedTrackingPaths.indexOf(pathname) === -1) return "/404";
    return trackingPathAliases[pathname] || pathname;
  }
  function safeTrackingTitle(pathname) {
    return trackingTitleAliases[pathname] || document.title;
  }
  window.__fcmsAllowedTrackingPaths = allowedTrackingPaths;
  var trackingPathAllowed = allowedTrackingPaths.indexOf(window.location.pathname) !== -1;
  var clarityEligible = !trackingPathAliases[window.location.pathname];
  var pagePath = safeTrackingPath(window.location.pathname);
  var pageLocation = window.location.origin + pagePath;
  var pageReferrer = "";
  var pageTitle = safeTrackingTitle(window.location.pathname);

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
      clarityEligible = trackingPathAllowed
        && !trackingPathAliases[originalUrl.pathname]
        && !originalUrl.search
        && !originalUrl.hash
        && !referrerUrl;
      if (referrerUrl) {
        var referrerPath = safeTrackingPath(referrerUrl.pathname);
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
      pagePath = safeTrackingPath(originalUrl.pathname);
      pageLocation = originalUrl.origin + pagePath;
      pageTitle = safeTrackingTitle(originalUrl.pathname);
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
      analytics_Storage: clarityEligible ? "granted" : "denied"
    });
    if (!clarityEligible) window.clarity("consent", false);

    window.gtag("js", new Date());
    window.gtag("config", ${JSON.stringify(GA4_MEASUREMENT_ID)}, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: pageLocation,
      page_path: pagePath,
      page_referrer: pageReferrer,
      page_title: pageTitle,
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
