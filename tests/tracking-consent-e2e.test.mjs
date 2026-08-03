import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";
const previewAccessUrl = process.env.PREVIEW_ACCESS_URL;
const humanDesktopUa =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/150.0.0.0 Safari/537.36";
const humanMobileUa =
  "Mozilla/5.0 (Linux; Android 15; Pixel 9) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/150.0.0.0 Mobile Safari/537.36";

async function unlockPreview(context) {
  if (!previewAccessUrl) return;
  const page = await context.newPage();
  const response = await page.goto(previewAccessUrl, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "Preview access URL should settle successfully");
  await page.close();
}

async function createHumanContext(browser, { mobile = false } = {}) {
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
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
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
  const response = await fetch(`${baseUrl}/`);
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
    assert.equal(await page.getByTestId("cookie-banner").isVisible(), true);
    assert.equal(await page.locator("#fcms-google-tag").count(), 0);
    assert.equal(await page.locator("#fcms-clarity-tag").count(), 0);
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
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(await page.getByTestId("cookie-banner").isVisible().catch(() => false), false);

    const googleConsent = await commands(page, "google", "consent");
    assert.equal(googleConsent.at(-1)[2].analytics_storage, "granted");
    assert.equal(googleConsent.at(-1)[2].ad_storage, "denied");
    assert.equal(googleConsent.at(-1)[2].ad_personalization, "denied");

    const clarityConsent = await commands(page, "clarity", "consentv2");
    assert.equal(clarityConsent.at(-1)[1].analytics_Storage, "granted");
    assert.equal(clarityConsent.at(-1)[1].ad_Storage, "denied");

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
    await page.getByTestId("button-cookie-accept-all").click();
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
    assert.deepEqual(Object.keys(leads[0][2]).sort(), ["form_id", "source_page"]);
    assert.equal(leads[0][2].source_page, "/contact");
    assert.doesNotMatch(JSON.stringify(leads[0]), /Consent Test|test@example|2395550100/);
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

    const leads = (await commands(page, "google", "event")).filter(
      (entry) => entry[1] === "generate_lead",
    );
    assert.equal(leads.length, 1);
    assert.deepEqual(Object.keys(leads[0][2]).sort(), ["form_id", "source_page"]);
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
    assert.deepEqual(Object.keys(leads[0][2]).sort(), ["form_id", "source_page"]);
    assert.equal(leads[0][2].form_id, "insurance_lp_callback");
    assert.equal(leads[0][2].source_page, "/insurance-accepted");
    assert.doesNotMatch(
      JSON.stringify(leads[0]),
      /Insurance Consent Test|insurance@example|2395550103|Aetna|Spanish/,
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
