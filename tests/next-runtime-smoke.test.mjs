import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, previewFetch, unlockPreview } from "./preview-access.mjs";

async function scrollSweep(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const waitForViewportImages = async () => {
      const images = [...document.images].filter((image) => {
        const rect = image.getBoundingClientRect();
        return rect.bottom >= 0 && rect.top <= innerHeight && image.currentSrc;
      });
      await Promise.all(images.map((image) => {
        if (image.complete) return Promise.resolve();
        return Promise.race([
          new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          }),
          pause(2000),
        ]);
      }));
    };
    for (let y = 0; y <= document.documentElement.scrollHeight; y += Math.max(240, innerHeight * 0.65)) {
      scrollTo(0, y);
      await pause(35);
      await waitForViewportImages();
    }
    scrollTo(0, document.documentElement.scrollHeight);
    await waitForViewportImages();
    scrollTo(0, 0);
    await waitForViewportImages();
    await pause(500);
  });
}

test("Next home survives a settled scroll sweep with all images loaded", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await unlockPreview(context);
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  try {
    const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);
    await scrollSweep(page);

    const result = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((link) => link.href),
      objectSources: [...document.images].filter((image) => image.getAttribute("src")?.includes("[object Object]")).map((image) => image.alt),
      brokenImages: [...document.images]
        .filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0)
        .map((image) => ({ alt: image.alt, src: image.getAttribute("src"), currentSrc: image.currentSrc })),
    }));

    assert.equal(result.lang, "en");
    assert.deepEqual(result.canonical, ["https://faithfulcaremedical.com/"]);
    assert.deepEqual(result.objectSources, []);
    assert.deepEqual(result.brokenImages, []);
    assert.deepEqual(pageErrors, []);
  } finally {
    await browser.close();
  }
});

test("Spanish root emits Spanish HTML and unknown routes are real 404s", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await unlockPreview(context);
  const page = await context.newPage();
  try {
    const spanish = await page.goto(`${baseUrl}/es`, { waitUntil: "domcontentloaded" });
    assert.equal(spanish?.status(), 200);
    assert.equal(await page.locator("html").getAttribute("lang"), "es");

    const missing = await page.goto(`${baseUrl}/route-that-does-not-exist`, { waitUntil: "domcontentloaded" });
    assert.equal(missing?.status(), 404);
    const browserRobots = await page.locator('meta[name="robots"]').evaluateAll((metas) =>
      metas.map((meta) => meta.getAttribute("content") || ""),
    );
    assert.ok(browserRobots.length >= 1, "hydrated 404 must retain a robots directive");
    assert.ok(browserRobots.every((content) => /noindex/i.test(content)), "every hydrated 404 robots directive must remain noindex");

    const rawMissing = await previewFetch("/route-that-does-not-exist", { redirect: "manual" });
    const rawHtml = await rawMissing.text();
    assert.equal(rawMissing.status, 404);
    const rawRobots = [...rawHtml.matchAll(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/gi)]
      .map((match) => match[1]);
    assert.deepEqual(rawRobots, ["noindex"], "server HTML must expose exactly one noindex directive to crawlers");
  } finally {
    await browser.close();
  }
});
