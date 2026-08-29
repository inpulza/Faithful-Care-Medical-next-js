import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, previewFetch, unlockPreview } from "./preview-access.mjs";
const { CONDITION_ROUTE_DATA, CONDITION_ROUTE_PATHS } = await import(
  new URL("../shared/condition-routes.ts", import.meta.url).href
);
const {
  CONDITION_TRACKING_PATH_ALIASES,
  CONDITION_TRACKING_TITLE_ALIASES,
} = await import(
  new URL("../shared/tracking-route-privacy.ts", import.meta.url).href
);
const humanDesktopUa =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/150.0.0.0 Safari/537.36";
const humanMobileUa =
  "Mozilla/5.0 (Linux; Android 15; Pixel 9) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/150.0.0.0 Mobile Safari/537.36";

async function createHumanContext(browser, { mobile = false, clarityBody = "" } = {}) {
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    userAgent: mobile ? humanMobileUa : humanDesktopUa,
    isMobile: mobile,
    hasTouch: mobile,
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  await context.route(/googletagmanager\.com\/gtag\/js/, (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  await context.route(/clarity\.ms\/tag\//, (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: clarityBody }),
  );
  await unlockPreview(context);
  return context;
}

async function commands(page, provider, command) {
  return page.evaluate(
    ({ provider, command }) => {
      const queue = provider === "google" ? window.dataLayer || [] : window.clarity?.q || [];
      return queue
        .map((entry) => {
          try {
            return Array.from(entry);
          } catch {
            return entry;
          }
        })
        .filter((entry) => Array.isArray(entry) && entry[0] === command);
    },
    { provider, command },
  );
}

async function firstPartyTrackingCookies(context) {
  return (await context.cookies())
    .map((cookie) => cookie.name)
    .filter((name) => /^_(ga|gcl_|clck|clsk)/.test(name))
    .sort();
}

function collectUnexpectedErrors(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

test("server HTML boots verified basic consent before either tracking tag", async () => {
  const response = await previewFetch("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  const bootstrapIndex = html.indexOf("fcms-consent-bootstrap");
  assert.ok(bootstrapIndex >= 0, "consent bootstrap is missing from server HTML");
  assert.match(html, /loadTrackingTag/);
  assert.match(html, /fcms-google-tag/);
  assert.match(html, /fcms-clarity-tag/);
  assert.match(html, /G-VZGPSTBKE2/);
  assert.match(html, /vypd4irtq1/);
  assert.match(html, /send_page_view[^]*false/);
  assert.doesNotMatch(html, /AW-[A-Z0-9-]+|GTM-[A-Z0-9-]+/);
});

test("fresh desktop and mobile visits start denied with zero tracking requests", async () => {
  const browser = await chromium.launch();
  try {
    for (const mobile of [false, true]) {
      const context = await createHumanContext(browser, { mobile });
      try {
        const page = await context.newPage();
        const errors = [];
        const trackingRequests = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });
        page.on("request", (request) => {
          if (/googletagmanager|google-analytics|clarity\.ms/.test(request.url())) {
            trackingRequests.push(request.url());
          }
        });

        const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200);
        assert.equal(await page.getByTestId("cookie-banner").isVisible(), true);

        const googleConsent = await commands(page, "google", "consent");
        assert.equal(googleConsent.length, 1);
        assert.equal(googleConsent[0][1], "default");
        assert.equal(googleConsent[0][2].analytics_storage, "denied");
        assert.equal(googleConsent[0][2].ad_storage, "denied");

        const clarityConsent = await commands(page, "clarity", "consentv2");
        assert.equal(clarityConsent.length, 0);

        const pageviews = (await commands(page, "google", "event")).filter(
          (entry) => entry[1] === "page_view",
        );
        assert.equal(pageviews.length, 0, `${mobile ? "mobile" : "desktop"} pre-consent pageview`);
        assert.equal(await page.locator("#fcms-google-tag").count(), 0);
        assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
        assert.deepEqual(trackingRequests, []);
        assert.deepEqual(await firstPartyTrackingCookies(context), []);

        if (mobile) {
          await page.getByTestId("button-cookie-reject").click();
          await page.waitForTimeout(100);
          assert.deepEqual(trackingRequests, []);
          assert.equal(
            (await commands(page, "google", "event")).filter(
              (entry) => entry[1] === "page_view",
            ).length,
            0,
          );
        }
        assert.deepEqual(errors, []);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});

test("legacy consent is not reinterpreted after the advertising taxonomy change", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.addInitScript(() => {
    localStorage.setItem(
      "fcms_consent_v1",
      JSON.stringify({
        version: 1,
        decidedAt: "2026-07-01T00:00:00.000Z",
        state: {
          necessary: true,
          analytics: true,
          advertising: true,
          personalization: true,
        },
      }),
    );
  });

  try {
    const page = await context.newPage();
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.getByTestId("cookie-banner").waitFor({ state: "visible" });
    assert.equal(await page.locator("#fcms-google-tag").count(), 0);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("returning consent strips URL and referrer metadata before either tracking tag loads", async () => {
  const clickId = "Test_Click-1234567890";
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.addInitScript(() => {
    localStorage.setItem(
      "fcms_consent_v2",
      JSON.stringify({
        version: 2,
        decidedAt: "2026-08-03T00:00:00.000Z",
        state: {
          necessary: true,
          analytics: true,
          advertising: true,
          personalization: true,
        },
      }),
    );
  });

  try {
    const page = await context.newPage();
    await page.goto(
      `${baseUrl}/contact?patient_condition=diabetes&email=private%40example.com&gclid=${clickId}&gad_source=1&gad_campaignid=1234567890`,
      {
        waitUntil: "networkidle",
        referer: "https://referrer.example/health?patient_condition=diabetes",
      },
    );
    await page.waitForURL(
      `${baseUrl}/contact?gclid=${clickId}&gad_source=1&gad_campaignid=1234567890`,
    );

    assert.equal(await page.locator("#fcms-google-tag").count(), 1);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
    const configs = await commands(page, "google", "config");
    const pageviews = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    );
    assert.equal(configs.at(-1)[2].page_location, `${baseUrl}/contact`);
    assert.equal(configs.at(-1)[2].page_path, "/contact");
    assert.equal(configs.at(-1)[2].page_referrer, "https://referrer.example");
    assert.equal(pageviews.at(-1)[2].page_location, `${baseUrl}/contact`);
    assert.equal(pageviews.at(-1)[2].page_path, "/contact");
    assert.equal(pageviews.at(-1)[2].page_referrer, "https://referrer.example");
    assert.doesNotMatch(
      JSON.stringify([configs.at(-1), pageviews.at(-1)]),
      /patient_condition|diabetes|private@example|gclid|Test_Click|gad_source|gad_campaignid/,
    );

    const referrerOnlyPage = await context.newPage();
    await referrerOnlyPage.goto(`${baseUrl}/contact`, {
      waitUntil: "networkidle",
      referer: "https://referrer.example/health/diabetes",
    });
    assert.equal(await referrerOnlyPage.locator("#fcms-google-tag").count(), 1);
    assert.equal(await referrerOnlyPage.locator("#fcms-clarity-tag").count(), 0);
    const referrerOnlyConfigs = await commands(referrerOnlyPage, "google", "config");
    assert.equal(referrerOnlyConfigs.at(-1)[2].page_referrer, "https://referrer.example");

    const anchorPage = await context.newPage();
    await anchorPage.goto(`${baseUrl}/insurance-accepted#callback`, { waitUntil: "networkidle" });
    await anchorPage.waitForURL(`${baseUrl}/insurance-accepted#callback`);
    assert.equal(await anchorPage.locator("#callback").count(), 1);
    assert.equal(await anchorPage.locator("#fcms-clarity-tag").count(), 0);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("returning consent leaves tracking off on sensitive unknown paths", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.addInitScript(() => {
    localStorage.setItem(
      "fcms_consent_v2",
      JSON.stringify({
        version: 2,
        decidedAt: "2026-08-03T00:00:00.000Z",
        state: {
          necessary: true,
          analytics: true,
          advertising: true,
          personalization: true,
        },
      }),
    );
  });

  try {
    const page = await context.newPage();
    const response = await page.goto(`${baseUrl}/patient-jane-diabetes`, {
      waitUntil: "networkidle",
    });
    assert.equal(response?.status(), 404);
    assert.equal(await page.locator("#fcms-google-tag").count(), 0);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);

    const configs = await commands(page, "google", "config");
    const events = await commands(page, "google", "event");
    assert.equal(configs.length, 0);
    assert.equal(events.length, 0);
    assert.doesNotMatch(
      JSON.stringify(await page.evaluate(() => window.dataLayer)) ?? "",
      /patient|jane|diabetes/,
    );
  } finally {
    await context.close();
    await browser.close();
  }
});

test("fresh and cross-tab consent cannot enable tracking on an unknown path", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  try {
    const knownPage = await context.newPage();
    const unknownPage = await context.newPage();
    await Promise.all([
      knownPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" }),
      unknownPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" }),
    ]);
    await unknownPage.evaluate(() => {
      window.history.replaceState(window.history.state, "", "/patient-jane-diabetes");
    });
    assert.equal(new URL(unknownPage.url()).pathname, "/patient-jane-diabetes");

    await knownPage.getByTestId("button-cookie-accept-all").click();
    await unknownPage.getByTestId("cookie-banner").waitFor({ state: "hidden" });
    await unknownPage.waitForTimeout(300);

    assert.equal(await knownPage.locator("#fcms-google-tag").count(), 1);
    assert.equal(await unknownPage.locator("#fcms-google-tag").count(), 0);
    assert.equal(await unknownPage.locator("#fcms-clarity-tag").count(), 0);

    await unknownPage.evaluate(() => {
      window.history.pushState(window.history.state, "", "/patient-jane-diabetes-follow-up");
    });
    await unknownPage.waitForTimeout(300);

    assert.equal((await commands(unknownPage, "google", "config")).length, 0);
    assert.equal((await commands(unknownPage, "google", "event")).length, 0);
    assert.doesNotMatch(
      JSON.stringify(await unknownPage.evaluate(() => window.dataLayer)) ?? "",
      /patient|jane|diabetes/,
    );
  } finally {
    await context.close();
    await browser.close();
  }
});

test("Spanish mobile consent is localized, focus-trapped, scrollable, and denied by default", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser, { mobile: true });
  try {
    const page = await context.newPage();
    const errors = collectUnexpectedErrors(page);
    const trackingRequests = [];
    page.on("request", (request) => {
      if (/googletagmanager|google-analytics|clarity\.ms/.test(request.url())) {
        trackingRequests.push(request.url());
      }
    });

    await page.goto(`${baseUrl}/es`, { waitUntil: "networkidle" });
    assert.equal(await page.getByText("Valoramos tu privacidad", { exact: true }).isVisible(), true);
    assert.equal(await page.getByTestId("button-cookie-accept-all").textContent(), "Aceptar todo");
    assert.equal(await page.getByTestId("button-cookie-reject").textContent(), "Rechazar no esenciales");

    await page.getByTestId("button-cookie-customize").click();
    const drawer = page.getByTestId("cookie-preferences-drawer");
    await drawer.waitFor({ state: "visible" });
    await page.waitForTimeout(400);
    assert.equal(
      await drawer.getByRole("heading", { name: "Preferencias de cookies", exact: true }).isVisible(),
      true,
    );
    assert.equal(await drawer.evaluate((element) => document.activeElement === element), true);
    const box = await drawer.boundingBox();
    assert.ok(box, "Spanish cookie drawer should have a visible box");
    assert.ok(
      box.y >= -1 && box.y + box.height <= 845,
      `cookie drawer must stay inside mobile viewport: ${JSON.stringify(box)}`,
    );
    assert.equal(await drawer.evaluate((element) => element.scrollHeight >= element.clientHeight), true);

    await page.getByTestId("button-cookie-drawer-reject").click();
    await drawer.waitFor({ state: "hidden" });
    assert.deepEqual(trackingRequests, []);
    assert.deepEqual(await firstPartyTrackingCookies(context), []);
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("accept, customize, reject, and withdrawal stay synchronized and remove cookies", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  try {
    const first = await context.newPage();
    const second = await context.newPage();
    await Promise.all([
      first.goto(`${baseUrl}/`, { waitUntil: "networkidle" }),
      second.goto(`${baseUrl}/`, { waitUntil: "networkidle" }),
    ]);
    assert.equal(await first.getByTestId("cookie-banner").isVisible(), true);
    assert.equal(await second.getByTestId("cookie-banner").isVisible(), true);

    await first.getByTestId("button-cookie-customize").click();
    await first.getByTestId("cookie-toggle-analytics").click();
    await first.getByTestId("button-cookie-drawer-save").click();
    await second.getByTestId("cookie-banner").waitFor({ state: "hidden" });

    const storedInSecond = JSON.parse(
      await second.evaluate(() => localStorage.getItem("fcms_consent_v2")),
    );
    assert.equal(storedInSecond.state.analytics, true);
    assert.equal(storedInSecond.state.advertising, false);
    assert.equal(storedInSecond.state.personalization, false);

    const secondGoogleConsent = await commands(second, "google", "consent");
    assert.equal(secondGoogleConsent.at(-1)[2].analytics_storage, "granted");
    assert.equal(secondGoogleConsent.at(-1)[2].ad_storage, "denied");
    assert.equal(await second.locator("#fcms-google-tag").count(), 1);
    assert.equal(await second.locator("#fcms-clarity-tag").count(), 1);

    await context.addCookies([
      { name: "_ga", value: "seed", url: baseUrl },
      { name: "_ga_TEST", value: "seed", url: baseUrl },
      { name: "_gcl_au", value: "seed", url: baseUrl },
      { name: "_clck", value: "seed", url: baseUrl },
      { name: "_clsk", value: "seed", url: baseUrl },
    ]);
    assert.equal((await firstPartyTrackingCookies(context)).length, 5);

    await first.getByRole("button", { name: "Cookie Preferences" }).click();
    const reloadPromise = first.waitForEvent("load");
    await first.getByTestId("button-cookie-drawer-reject").click();
    await reloadPromise;
    await first.waitForLoadState("networkidle");
    assert.deepEqual(await firstPartyTrackingCookies(context), []);

    const finalStored = JSON.parse(
      await first.evaluate(() => localStorage.getItem("fcms_consent_v2")),
    );
    assert.equal(finalStored.state.analytics, false);
    assert.equal(finalStored.state.advertising, false);
    assert.equal(finalStored.state.personalization, false);

    const finalGoogleConsent = await commands(first, "google", "consent");
    assert.equal(finalGoogleConsent.length, 1);
    assert.equal(finalGoogleConsent[0][1], "default");
    assert.equal(finalGoogleConsent[0][2].analytics_storage, "denied");
    const finalClarityConsent = await commands(first, "clarity", "consentv2");
    assert.equal(finalClarityConsent.length, 0);
    assert.equal(await first.locator("#fcms-google-tag").count(), 0);
    assert.equal(await first.locator("#fcms-clarity-tag").count(), 0);
    const pageviewsBeforeNavigation = (await commands(first, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    ).length;
    await first.getByTestId("footer-link-contact").click();
    await first.waitForURL(`${baseUrl}/contact`);
    const pageviewsAfterNavigation = (await commands(first, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    ).length;
    assert.equal(pageviewsAfterNavigation, pageviewsBeforeNavigation);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("withdrawing Advertising removes retained Google click identifiers", async () => {
  const clickId = "Test_Click-1234567890";
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  try {
    const page = await context.newPage();
    await page.goto(
      `${baseUrl}/?patient_condition=diabetes&gclid=${clickId}&gad_source=1`,
      { waitUntil: "networkidle" },
    );
    await page.getByTestId("button-cookie-accept-all").click();
    await page.waitForURL(`${baseUrl}/?gclid=${clickId}&gad_source=1`);
    assert.equal(await page.locator("#fcms-google-tag").count(), 1);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);

    await page.getByRole("button", { name: "Cookie Preferences" }).click();
    await page.getByTestId("cookie-toggle-advertising").click();
    await page.getByTestId("button-cookie-drawer-save").click();
    await page.waitForURL(`${baseUrl}/`);

    const googleConsent = await commands(page, "google", "consent");
    assert.equal(googleConsent.at(-1)[2].analytics_storage, "granted");
    assert.equal(googleConsent.at(-1)[2].ad_storage, "denied");
    assert.equal(googleConsent.at(-1)[2].ad_user_data, "denied");
  } finally {
    await context.close();
    await browser.close();
  }
});

test("Global Privacy Control keeps advertising and personalization denied", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "globalPrivacyControl", { get: () => true });
    localStorage.setItem(
      "fcms_consent_v2",
      JSON.stringify({
        version: 2,
        decidedAt: "2026-08-03T00:00:00.000Z",
        state: {
          necessary: true,
          analytics: true,
          advertising: true,
          personalization: true,
        },
      }),
    );
  });

  try {
    const page = await context.newPage();
    await page.goto(
      `${baseUrl}/?patient_condition=diabetes&gclid=Test_Click-1234567890&gad_source=1`,
      { waitUntil: "networkidle" },
    );
    await page.waitForURL(`${baseUrl}/`);
    assert.equal(await page.getByTestId("cookie-banner").isVisible().catch(() => false), false);

    const googleConsent = await commands(page, "google", "consent");
    assert.equal(googleConsent.at(-1)[2].analytics_storage, "granted");
    assert.equal(googleConsent.at(-1)[2].ad_storage, "denied");
    assert.equal(googleConsent.at(-1)[2].ad_personalization, "denied");

    const clarityConsent = await commands(page, "clarity", "consentv2");
    assert.equal(clarityConsent.at(-1)[1].analytics_Storage, "denied");
    assert.equal(clarityConsent.at(-1)[1].ad_Storage, "denied");
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);

    await page.getByRole("button", { name: "Cookie Preferences" }).click();
    assert.equal(await page.getByTestId("cookie-toggle-analytics").getAttribute("aria-checked"), "true");
    assert.equal(await page.getByTestId("cookie-toggle-advertising").getAttribute("aria-checked"), "false");
    assert.equal(await page.getByTestId("cookie-toggle-personalization").getAttribute("aria-checked"), "false");
  } finally {
    await context.close();
    await browser.close();
  }
});

test("SPA navigation records one pageview per settled URL without insurance duplication", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  try {
    const page = await context.newPage();
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.getByTestId("button-cookie-accept-all").click();

    await page.getByTestId("footer-link-contact").click();
    await page.waitForURL(`${baseUrl}/contact`);
    await page.getByTestId("footer-link-insurance").click();
    await page.waitForURL(`${baseUrl}/insurance-accepted`);

    const pageviews = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    );
    assert.deepEqual(
      pageviews.map((entry) => entry[2].page_path),
      ["/", "/contact", "/insurance-accepted"],
    );
  } finally {
    await context.close();
    await browser.close();
  }
});

test("English and Spanish contact maps wait for an explicit load action", async () => {
  const browser = await chromium.launch();
  try {
    for (const testCase of [
      {
        path: "/contact",
        buttonTestId: "cta-load-map-contact",
        iframeTestId: "map-google-embed-contact",
        label: "Load interactive map",
      },
      {
        path: "/es/contacto",
        buttonTestId: "cta-load-map-es-contacto",
        iframeTestId: "map-google-embed-es-contacto",
        label: "Cargar mapa interactivo",
      },
      {
        path: "/insurance-accepted",
        buttonTestId: "cta-load-map",
        iframeTestId: "map-callback-embed",
        label: "Load interactive map",
      },
    ]) {
      const context = await createHumanContext(browser);
      const mapRequests = [];
      await context.route(/google\.com\/maps\/embed/, (route) => {
        mapRequests.push(route.request().url());
        return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html>" });
      });
      try {
        const page = await context.newPage();
        const errors = collectUnexpectedErrors(page);
        await page.goto(`${baseUrl}${testCase.path}`, { waitUntil: "networkidle" });

        const loadButton = page.getByTestId(testCase.buttonTestId);
        await loadButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(750);
        assert.equal(await loadButton.getByText(testCase.label, { exact: true }).isVisible(), true);
        assert.equal(await page.getByTestId(testCase.iframeTestId).count(), 0);
        assert.deepEqual(mapRequests, [], `${testCase.path} contacted Google Maps before a click`);

        await page.getByTestId("button-cookie-reject").click();
        const mapRequest = page.waitForRequest(/google\.com\/maps\/embed/);
        await loadButton.click();
        const iframe = page.getByTestId(testCase.iframeTestId);
        await iframe.waitFor({ state: "attached" });
        await mapRequest;
        assert.equal(await iframe.getAttribute("referrerpolicy"), "no-referrer");
        assert.equal(mapRequests.length, 1);
        assert.deepEqual(errors, []);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});

test("the dormant NAP block also uses the shared click-to-load Google map", async () => {
  const source = await readFile(
    new URL("../client/src/components/sections/nap-block.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /<PrivacySafeGoogleMap/);
  assert.doesNotMatch(source, /<iframe|CLINIC_GMAPS_EMBED_URL/);
});

test("English and Spanish service-area maps use only bundled vector data", async () => {
  const source = await readFile(
    new URL("../client/src/components/service-area-map.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /cartocdn|tileLayer|leaflet/i);

  const browser = await chromium.launch();
  try {
    for (const path of ["/", "/es"]) {
      for (const mobile of [false, true]) {
        const context = await createHumanContext(browser, { mobile });
        const tileRequests = [];
        try {
          const page = await context.newPage();
          const errors = collectUnexpectedErrors(page);
          page.on("request", (request) => {
            if (/cartocdn|openstreetmap|mapbox/i.test(request.url())) tileRequests.push(request.url());
          });
          await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });

          const map = page.getByTestId("map-service-area-vector");
          await map.scrollIntoViewIfNeeded();
          await page.waitForTimeout(750);
          assert.equal(await map.isVisible(), true);
          assert.equal(await page.getByTestId("cta-load-service-area-map").count(), 0);
          assert.deepEqual(tileRequests, [], `${path} service map contacted an external tile host`);
          if (mobile) {
            const mapBox = await map.boundingBox();
            assert.ok(mapBox, `${path} mobile service map should have a bounding box`);
            for (const city of ["Cape Coral", "Punta Gorda", "Faithful Care, Naples"]) {
              const labelBox = await map.getByText(city, { exact: true }).boundingBox();
              assert.ok(labelBox, `${city} should have a visible mobile label`);
              assert.ok(
                labelBox.x >= mapBox.x - 1 && labelBox.x + labelBox.width <= mapBox.x + mapBox.width + 1,
                `${city} label must stay inside the mobile service map`,
              );
              assert.ok(labelBox.height >= 9, `${city} mobile label must remain legible`);
            }
          }
          assert.deepEqual(errors, []);
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
});

test("a successful contact request emits one sanitized lead and no form values", async () => {
  const clickId = "Test_Click-1234567890";
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );

  try {
    const page = await context.newPage();
    await page.goto(
      `${baseUrl}/contact?patient_condition=diabetes&email=private%40example.com&gclid=${clickId}&gad_source=1&gad_campaignid=1234567890`,
      {
        waitUntil: "networkidle",
        referer: "https://referrer.example/health?patient_condition=diabetes",
      },
    );
    await page.getByTestId("button-cookie-accept-all").click();
    await page.waitForURL(
      `${baseUrl}/contact?gclid=${clickId}&gad_source=1&gad_campaignid=1234567890`,
    );
    assert.equal(await page.locator("#fcms-google-tag").count(), 1);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
    const configs = await commands(page, "google", "config");
    assert.equal(configs.at(-1)[2].page_location, `${baseUrl}/contact`);
    assert.equal(configs.at(-1)[2].page_path, "/contact");
    assert.equal(configs.at(-1)[2].page_referrer, "https://referrer.example");
    const pageviews = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    );
    assert.equal(pageviews.at(-1)[2].page_location, `${baseUrl}/contact`);
    assert.equal(pageviews.at(-1)[2].page_path, "/contact");
    assert.equal(pageviews.at(-1)[2].page_referrer, "https://referrer.example");
    assert.doesNotMatch(
      JSON.stringify([configs.at(-1), pageviews.at(-1)]),
      /patient_condition|diabetes|private@example|gclid|Test_Click|gad_source|gad_campaignid/,
    );
    assert.equal(
      await page.getByTestId("hero-contact-form").first().getAttribute("data-clarity-mask"),
      "true",
    );
    await page.getByTestId("input-contact-name").first().fill("Consent Test");
    await page.getByTestId("input-contact-email").first().fill("test@example.com");
    await page.getByTestId("input-contact-phone").first().fill("2395550100");
    await page.getByTestId("select-contact-service").first().selectOption({ index: 1 });
    await page.getByTestId("button-contact-submit").first().click();
    await page.getByTestId("text-form-success").waitFor();

    const leads = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "generate_lead",
    );
    assert.equal(leads.length, 1);
    assert.deepEqual(Object.keys(leads[0][2]).sort(), [
      "form_id",
      "page_location",
      "page_path",
      "page_referrer",
      "page_title",
      "source_page",
    ]);
    assert.equal(leads[0][2].source_page, "/contact");
    assert.equal(leads[0][2].page_path, "/contact");
    assert.equal(leads[0][2].page_location, `${baseUrl}/contact`);
    assert.doesNotMatch(
      JSON.stringify(leads[0]),
      /Consent Test|test@example|2395550100|patient_condition|diabetes|private@example|gclid|Test_Click|gad_source|gad_campaignid/,
    );
  } finally {
    await context.close();
    await browser.close();
  }
});

test("the condition privacy registry exactly covers every condition route", () => {
  assert.deepEqual(
    Object.keys(CONDITION_ROUTE_DATA).sort(),
    [...CONDITION_ROUTE_PATHS].sort(),
  );
  assert.deepEqual(
    Object.keys(CONDITION_TRACKING_PATH_ALIASES).sort(),
    [...CONDITION_ROUTE_PATHS].sort(),
  );
  assert.deepEqual(
    Object.keys(CONDITION_TRACKING_TITLE_ALIASES).sort(),
    [...CONDITION_ROUTE_PATHS].sort(),
  );
});

test("all sixteen condition routes collapse to a generic care-hub analytics identity", () => {
  assert.equal(CONDITION_ROUTE_PATHS.length, 16);
  for (const path of CONDITION_ROUTE_PATHS) {
    const expectedPath = path.startsWith("/primary-care/")
      ? "/primary-care"
      : "/palliative-care";
    const expectedTitle = expectedPath === "/primary-care"
      ? "Primary Care | Faithful Care Medical Services"
      : "Palliative Care | Faithful Care Medical Services";
    assert.equal(CONDITION_TRACKING_PATH_ALIASES[path], expectedPath, `${path} exposes its exact path`);
    assert.equal(CONDITION_TRACKING_TITLE_ALIASES[path], expectedTitle, `${path} exposes its exact title`);
  }
});

test("condition guides report only their care hub to analytics and lead tracking", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );

  try {
    const page = await context.newPage();
    const errors = collectUnexpectedErrors(page);
    await page.goto(`${baseUrl}/primary-care/diabetes-care`, { waitUntil: "networkidle" });
    await page.getByTestId("button-cookie-accept-all").click();

    const configs = await commands(page, "google", "config");
    const pageviews = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    );
    assert.equal(configs.at(-1)[2].page_path, "/primary-care");
    assert.equal(configs.at(-1)[2].page_location, `${baseUrl}/primary-care`);
    assert.equal(pageviews.at(-1)[2].page_path, "/primary-care");
    assert.equal(pageviews.at(-1)[2].page_location, `${baseUrl}/primary-care`);
    assert.equal(pageviews.at(-1)[2].page_title, "Primary Care | Faithful Care Medical Services");

    const form = page.getByTestId("hero-contact-form");
    await form.getByTestId("input-contact-name").fill("Privacy Test");
    await form.getByTestId("input-contact-email").fill("privacy@example.com");
    await form.getByTestId("input-contact-phone").fill("2395550199");
    await form.getByTestId("select-contact-service").selectOption({ index: 1 });
    await form.getByTestId("button-contact-submit").click();
    await page.getByTestId("text-form-success").waitFor();

    const leads = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "generate_lead",
    );
    assert.equal(leads.length, 1);
    assert.equal(leads[0][2].source_page, "/primary-care");
    assert.equal(leads[0][2].page_path, "/primary-care");
    assert.equal(leads[0][2].page_location, `${baseUrl}/primary-care`);
    assert.equal(leads[0][2].page_title, "Primary Care | Faithful Care Medical Services");

    assert.doesNotMatch(
      JSON.stringify([configs, pageviews, leads]),
      /diabetes|blood.pressure|privacy@example|2395550199/i,
    );
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("condition guides form a document boundary that keeps Clarity out after consent", async () => {
  const browser = await chromium.launch();
  const clarityObservedClicks = [];
  const context = await createHumanContext(browser, {
    clarityBody: `
      (function () {
        function captureLink(event) {
          var target = event.target;
          var element = target && target.nodeType === 1 ? target : target && target.parentElement;
          var anchor = element && element.closest ? element.closest("a[href]") : null;
          if (anchor && window.__fcmsCaptureClarityLikeClick) {
            window.__fcmsCaptureClarityLikeClick(anchor.href);
          }
        }
        window.addEventListener("click", captureLink, true);
        window.addEventListener("auxclick", captureLink, true);
        window.__fcmsMockClarityCaptureReady = true;
      })();
    `,
  });

  try {
    const page = await context.newPage();
    await page.exposeFunction("__fcmsCaptureClarityLikeClick", (href) => {
      clarityObservedClicks.push(href);
    });
    const errors = collectUnexpectedErrors(page);
    await page.goto(`${baseUrl}/primary-care`, { waitUntil: "networkidle" });
    await page.getByTestId("button-cookie-accept-all").click();
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 1);
    await page.waitForFunction(() => window.__fcmsMockClarityCaptureReady === true);

    await page.locator('a[href="/contact"]').first().dispatchEvent("click", {
      bubbles: true,
      cancelable: true,
      button: 0,
      ctrlKey: true,
    });
    await page.waitForTimeout(25);
    assert.ok(
      clarityObservedClicks.some((href) => new URL(href).pathname === "/contact"),
      "the Clarity-like capture listener did not observe an ordinary link",
    );
    clarityObservedClicks.length = 0;

    const conditionLink = page
      .getByTestId("section-related-care")
      .locator('a[href="/primary-care/diabetes-care"]');
    await conditionLink.scrollIntoViewIfNeeded();

    const modifiedClickResults = await conditionLink.evaluate((anchor) => {
      const ctrlClick = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        button: 0,
        ctrlKey: true,
      });
      const middleClick = new MouseEvent("auxclick", {
        bubbles: true,
        cancelable: true,
        button: 1,
      });
      return {
        ctrlDefaultAllowed: anchor.dispatchEvent(ctrlClick),
        ctrlDefaultPrevented: ctrlClick.defaultPrevented,
        middleDefaultAllowed: anchor.dispatchEvent(middleClick),
        middleDefaultPrevented: middleClick.defaultPrevented,
      };
    });
    assert.deepEqual(modifiedClickResults, {
      ctrlDefaultAllowed: true,
      ctrlDefaultPrevented: false,
      middleDefaultAllowed: true,
      middleDefaultPrevented: false,
    });
    assert.deepEqual(
      clarityObservedClicks,
      [],
      "Clarity-like capture received a modified condition-guide click",
    );

    await page.evaluate(() => {
      window.__fcmsClarityBoundaryMarker = "must-not-survive";
    });
    await conditionLink.click();
    await page.waitForURL(`${baseUrl}/primary-care/diabetes-care`);
    await page.waitForLoadState("networkidle");

    assert.equal(await page.evaluate(() => window.__fcmsClarityBoundaryMarker), undefined);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
    assert.equal(await page.locator("#fcms-google-tag").count(), 1);
    let configs = await commands(page, "google", "config");
    let pageviews = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    );
    assert.equal(configs.at(-1)[2].page_path, "/primary-care");
    assert.equal(configs.at(-1)[2].page_title, "Primary Care | Faithful Care Medical Services");
    assert.equal(pageviews.at(-1)[2].page_path, "/primary-care");
    assert.equal(pageviews.at(-1)[2].page_title, "Primary Care | Faithful Care Medical Services");
    assert.doesNotMatch(JSON.stringify([configs, pageviews]), /diabetes/i);
    assert.deepEqual(
      clarityObservedClicks,
      [],
      "Clarity-like capture received the exact condition-guide click",
    );

    await page.evaluate(() => {
      window.__fcmsSkipLinkDocumentMarker = "must-survive-same-page-navigation";
    });
    await page.getByTestId("link-skip-to-main").focus();
    await page.keyboard.press("Enter");
    await page.waitForURL(`${baseUrl}/primary-care/diabetes-care#main`);
    assert.equal(
      await page.evaluate(() => window.__fcmsSkipLinkDocumentMarker),
      "must-survive-same-page-navigation",
      "the condition-guide skip link reloaded the document",
    );
    assert.equal(
      await page.evaluate(() => document.querySelector(":target")?.id),
      "main",
      "the condition-guide skip link did not reach the main landmark",
    );
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);

    const palliativePage = await context.newPage();
    await palliativePage.goto(`${baseUrl}/palliative-care/for-cancer`, { waitUntil: "networkidle" });
    assert.equal(await palliativePage.locator("#fcms-clarity-tag").count(), 0);
    assert.equal(await palliativePage.locator("#fcms-google-tag").count(), 1);
    configs = await commands(palliativePage, "google", "config");
    pageviews = (await commands(palliativePage, "google", "event")).filter(
      (entry) => entry[1] === "page_view",
    );
    assert.equal(configs.at(-1)[2].page_path, "/palliative-care");
    assert.equal(configs.at(-1)[2].page_title, "Palliative Care | Faithful Care Medical Services");
    assert.equal(pageviews.at(-1)[2].page_path, "/palliative-care");
    assert.equal(pageviews.at(-1)[2].page_title, "Palliative Care | Faithful Care Medical Services");
    assert.doesNotMatch(JSON.stringify([configs, pageviews]), /cancer/i);
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("the mobile action-bar form emits one sanitized lead after full consent", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser, { mobile: true });
  await context.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );

  try {
    const page = await context.newPage();
    const errors = collectUnexpectedErrors(page);
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.getByTestId("button-cookie-accept-all").click();
    await page.getByTestId("action-bar-appointment").click();

    const form = page.getByTestId("action-bar-contact-form");
    await form.waitFor({ state: "visible" });
    assert.equal(await form.getAttribute("data-clarity-mask"), "true");
    await page.getByTestId("input-ab-contact-name").fill("Mobile Consent Test");
    await page.getByTestId("input-ab-contact-email").fill("mobile@example.com");
    await page.getByTestId("input-ab-contact-phone").fill("2395550102");
    await page.getByTestId("select-ab-contact-service").selectOption({ index: 1 });
    await page.getByTestId("button-ab-contact-submit").click();
    await page.getByTestId("text-action-bar-form-success").waitFor();
    await page.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "button-action-bar-contact-close");
    await page.keyboard.press("Tab");
    await page.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "button-action-bar-contact-close");

    const leads = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "generate_lead",
    );
    assert.equal(leads.length, 1);
    assert.deepEqual(Object.keys(leads[0][2]).sort(), [
      "form_id",
      "page_location",
      "page_path",
      "page_referrer",
      "page_title",
      "source_page",
    ]);
    assert.equal(leads[0][2].form_id, "mobile_action_bar_form");
    assert.equal(leads[0][2].source_page, "/");
    assert.doesNotMatch(JSON.stringify(leads[0]), /Mobile Consent Test|mobile@example|2395550102/);
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("the insurance callback emits one sanitized lead without plan or language values", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );

  try {
    const page = await context.newPage();
    const errors = collectUnexpectedErrors(page);
    await page.goto(`${baseUrl}/insurance-accepted`, { waitUntil: "networkidle" });
    await page.getByTestId("button-cookie-accept-all").click();

    const form = page.getByTestId("form-callback");
    await form.waitFor({ state: "attached" });
    await form.scrollIntoViewIfNeeded();
    assert.equal(await form.getAttribute("data-clarity-mask"), "true");
    await page.getByTestId("input-callback-name").fill("Insurance Consent Test");
    await page.getByTestId("input-callback-phone").fill("2395550103");
    await page.getByTestId("input-callback-email").fill("insurance@example.com");
    await page.getByTestId("select-callback-insurance").selectOption("Aetna Commercial");
    await page.getByTestId("radio-callback-lang-spanish").click();
    await page.getByTestId("checkbox-callback-consent").check();
    await page.getByTestId("cta-callback-submit").click();
    await page.getByTestId("text-callback-success").waitFor();

    const leads = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "generate_lead",
    );
    assert.equal(leads.length, 1);
    assert.deepEqual(Object.keys(leads[0][2]).sort(), [
      "form_id",
      "page_location",
      "page_path",
      "page_referrer",
      "page_title",
      "source_page",
    ]);
    assert.equal(leads[0][2].form_id, "insurance_lp_callback");
    assert.equal(leads[0][2].source_page, "/insurance-accepted");
    assert.doesNotMatch(
      JSON.stringify(leads[0]),
      /Insurance Consent Test|insurance@example|2395550103|Aetna Commercial|Spanish/,
    );
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("a rejected visitor can submit the form without emitting a tracking lead", async () => {
  const browser = await chromium.launch();
  const context = await createHumanContext(browser);
  await context.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );

  try {
    const page = await context.newPage();
    await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
    await page.getByTestId("button-cookie-reject").click();
    await page.getByTestId("input-contact-name").first().fill("No Tracking");
    await page.getByTestId("input-contact-email").first().fill("notracking@example.com");
    await page.getByTestId("input-contact-phone").first().fill("2395550101");
    await page.getByTestId("select-contact-service").first().selectOption({ index: 1 });
    await page.getByTestId("button-contact-submit").first().click();
    await page.getByTestId("text-form-success").waitFor();

    const leads = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "generate_lead",
    );
    assert.equal(leads.length, 0);
    assert.equal(await page.locator("#fcms-google-tag").count(), 0);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
  } finally {
    await context.close();
    await browser.close();
  }
});
