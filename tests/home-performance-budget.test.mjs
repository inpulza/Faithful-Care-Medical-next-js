import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

const MAX_INITIAL_SCRIPT_BYTES = 650 * 1024;
const MAX_CONDITION_SCRIPT_BYTES = 390 * 1024;

async function inspectHeroVariant(browser, viewport, expectedTestId, hiddenVariantTestId, maxTransferBytes) {
  const context = await browser.newContext({
    viewport,
    isMobile: viewport.width < 1024,
    hasTouch: viewport.width < 1024,
    extraHTTPHeaders: { "x-vercel-skip-toolbar": "1" },
  });
  const requests = [];
  const errors = [];

  try {
    await unlockPreview(context);
    const page = await context.newPage();
    page.on("request", (request) => requests.push(request.url()));
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);

    const expectedImage = page.getByTestId(expectedTestId);
    const hiddenVariantImage = page.getByTestId(hiddenVariantTestId);
    await expectedImage.evaluate((image) => image.decode());

    const selectedUrl = await expectedImage.evaluate((image) => image.currentSrc);
    const hiddenSelectedUrl = await hiddenVariantImage.evaluate((image) => image.currentSrc);
    const oppositeViewportUrl = await expectedImage.evaluate((image) => {
      const source = Array.from(image.parentElement.querySelectorAll("source"))
        .find((candidate) => !matchMedia(candidate.media).matches);
      if (!source) throw new Error("responsive hero is missing its opposite viewport source");
      return new URL(source.srcset, location.href).href;
    });
    assert.equal(hiddenSelectedUrl, selectedUrl, "both responsive branches must select the same viewport asset");
    assert.notEqual(oppositeViewportUrl, selectedUrl, "the responsive sources must provide distinct viewport assets");

    const selectedRequests = requests.filter((url) => url === selectedUrl);
    assert.equal(selectedRequests.length, 1, "the responsive hero must download its selected asset exactly once");
    assert.equal(requests.includes(oppositeViewportUrl), false, "the opposite viewport hero asset must not be downloaded");

    const transfer = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      return {
        total: resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
        scripts: resources
          .filter((resource) => resource.initiatorType === "script")
          .reduce((sum, resource) => sum + resource.encodedBodySize, 0),
      };
    });
    assert.ok(
      transfer.total <= maxTransferBytes,
      `initial transfer exceeded ${maxTransferBytes} bytes: ${transfer.total}`,
    );
    assert.ok(
      transfer.scripts <= MAX_INITIAL_SCRIPT_BYTES,
      `initial script transfer exceeded ${MAX_INITIAL_SCRIPT_BYTES} bytes: ${transfer.scripts}`,
    );
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
  }
}

test("homepage enforces responsive hero and initial transfer budgets", async () => {
  const browser = await chromium.launch();
  try {
    await inspectHeroVariant(browser, { width: 390, height: 844 }, "img-hero-mobile", "img-hero-bg", 1_000 * 1024);
    await inspectHeroVariant(browser, { width: 1440, height: 900 }, "img-hero-bg", "img-hero-mobile", 1_600 * 1024);
  } finally {
    await browser.close();
  }
});

test("split condition heroes do not load the GSAP parallax runtime", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { "x-vercel-skip-toolbar": "1" },
  });

  try {
    await unlockPreview(context);
    const page = await context.newPage();
    const response = await page.goto(`${baseUrl}/primary-care/high-blood-pressure-care`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);

    const scripts = await page.evaluate(() => performance
      .getEntriesByType("resource")
      .filter((resource) => resource.initiatorType === "script")
      .map((resource) => ({ url: resource.name, bytes: resource.encodedBodySize })));
    const scriptBytes = scripts.reduce((sum, script) => sum + script.bytes, 0);
    assert.ok(
      scriptBytes <= MAX_CONDITION_SCRIPT_BYTES,
      `condition script transfer exceeded ${MAX_CONDITION_SCRIPT_BYTES} bytes: ${scriptBytes}`,
    );

    const gsapRuntimeScripts = [];
    for (const script of scripts) {
      const scriptResponse = await context.request.get(script.url);
      const source = await scriptResponse.text();
      if (/GreenSock|CSSPlugin/.test(source)) gsapRuntimeScripts.push(script.url);
    }
    assert.deepEqual(gsapRuntimeScripts, [], "split condition hero loaded the GSAP runtime despite having no parallax");
  } finally {
    await context.close();
    await browser.close();
  }
});
