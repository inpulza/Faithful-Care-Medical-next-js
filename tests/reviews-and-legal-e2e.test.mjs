import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";
const previewAccessUrl = process.env.PREVIEW_ACCESS_URL;
const reviewUrl = "https://search.google.com/local/writereview?placeid=ChIJp-qiqPIf24gRXbYjPaNmLIQ";
const datedLegalRoutes = new Map([
  ["/privacy-policy", "2026-08-03"],
  ["/notice-of-privacy-practices", "2026-01-01"],
  ["/terms-of-use", "2026-01-01"],
  ["/accessibility-statement", "2026-01-01"],
]);

async function unlockPreview(context) {
  if (!previewAccessUrl) return;
  const accessPage = await context.newPage();
  const response = await accessPage.goto(previewAccessUrl, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "The protected Preview access URL should settle successfully");
  await accessPage.close();
}

function jsonLdSchemas(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]));
}

test("English and Spanish review CTAs open the verified composer on desktop and mobile", async () => {
  const browser = await chromium.launch();

  try {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      const context = await browser.newContext({ viewport });
      const pageErrors = [];
      const consoleErrors = [];

      try {
        await unlockPreview(context);
        await context.route(reviewUrl, (route) => route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<!doctype html><title>Google review composer target</title>",
        }));

        const page = await context.newPage();
        page.on("pageerror", (error) => pageErrors.push(error.message));
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });

        const response = await page.goto(`${baseUrl}/reviews`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200);

        for (const testId of ["button-leave-review-en", "button-leave-review-es"]) {
          const link = page.getByTestId(testId);
          assert.equal(await link.getAttribute("href"), reviewUrl, `${testId} href`);
          assert.equal(await link.getAttribute("target"), "_blank", `${testId} target`);
          assert.match((await link.getAttribute("rel")) || "", /noopener/);

          const popupPromise = page.waitForEvent("popup");
          await link.click();
          const popup = await popupPromise;
          await popup.waitForLoadState("domcontentloaded");
          assert.equal(popup.url(), reviewUrl, `${testId} settled URL`);
          await popup.close();
        }

        assert.deepEqual(pageErrors, [], `page errors at ${viewport.width}px`);
        assert.deepEqual(consoleErrors, [], `console errors at ${viewport.width}px`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});

test("Googlebot receives one server-rendered WebPage with the exact legal dates", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    javaScriptEnabled: false,
    userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  });

  try {
    await unlockPreview(context);
    const page = await context.newPage();
    for (const [path, dateModified] of [
      ...datedLegalRoutes,
      ["/medical-disclaimer", undefined],
    ]) {
      const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
      assert.equal(response?.status(), 200, `${path} status`);
      const html = await response.text();
      assert.match(html, /<h1[\s>]/i, `${path} server HTML is missing its H1`);

      const webpages = jsonLdSchemas(html).filter((schema) => schema["@type"] === "WebPage");
      assert.equal(webpages.length, 1, `${path} must serve exactly one WebPage`);
      if (dateModified) {
        assert.equal(webpages[0].dateModified, dateModified, `${path} dateModified`);
      } else {
        assert.equal("dateModified" in webpages[0], false, `${path} should not invent dateModified`);
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }
});
