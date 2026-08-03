import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, previewFetch, unlockPreview } from "./preview-access.mjs";

const { SOCIAL_VIDEOS } = await import(new URL("../shared/social-videos.ts", import.meta.url).href);
const thirdPartyVideoHost = /(?:tiktok\.com|tiktokcdn|instagram\.com|cdninstagram|youtube\.com|youtu\.be|googlevideo)/i;

test("Home and Naples expose every video card in server HTML without third-party media", async () => {
  for (const path of ["/", "/locations/naples"]) {
    const response = await previewFetch(path);
    const html = await response.text();
    assert.equal(response.status, 200);
    for (const video of SOCIAL_VIDEOS) {
      assert.ok(html.includes(video.tiktokUrl), `${path} missing ${video.slug} TikTok link`);
      assert.ok(html.includes(video.instagramUrl), `${path} missing ${video.slug} Instagram link`);
      assert.ok(html.includes(video.thumbnailUrl), `${path} missing ${video.slug} local thumbnail`);
    }
    assert.doesNotMatch(html, /<iframe/i, `${path} must not load social players at startup`);
    assert.doesNotMatch(html, /<script[^>]+(?:tiktok|instagram|youtube)/i, `${path} must not load social scripts`);
  }
});

test("video carousel is accessible and lightweight on desktop and mobile", async () => {
  const browser = await chromium.launch();
  try {
    const viewports = [
      { name: "mobile", width: 390, height: 844, mobile: true },
      { name: "tablet", width: 768, height: 1024, mobile: false },
      { name: "desktop", width: 1440, height: 900, mobile: false },
    ];
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.mobile,
        hasTouch: viewport.mobile,
      });
      await unlockPreview(context);
      const page = await context.newPage();
      const errors = [];
      const socialRequests = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error" && !message.text().includes("/_next/webpack-hmr")) errors.push(message.text());
      });
      page.on("request", (request) => {
        if (thirdPartyVideoHost.test(request.url())) socialRequests.push(request.url());
      });

      const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200);
      const section = page.getByTestId("social-video-section-home");
      await section.scrollIntoViewIfNeeded();
      assert.equal(await section.getByRole("heading", { name: "Clear answers, straight from Dr. Reve." }).count(), 1);
      assert.equal(await section.locator('[data-testid^="social-video-card-"]').count(), SOCIAL_VIDEOS.length);

      for (const video of SOCIAL_VIDEOS) {
        const card = page.getByTestId(`social-video-card-${video.slug}`);
        const link = page.getByTestId(`social-video-link-${video.slug}`);
        assert.equal(await link.getAttribute("href"), video.tiktokUrl);
        assert.equal(await link.getAttribute("target"), "_blank");
        assert.match(await link.getAttribute("rel"), /noopener/);
        assert.equal(await card.getByRole("link", { name: `View ${video.title} on Instagram` }).count(), 1);
      }

      const footerTops = await section.locator('[data-testid^="social-video-footer-"]').evaluateAll((elements) =>
        elements.map((element) => Math.round(element.getBoundingClientRect().top)),
      );
      assert.equal(new Set(footerTops).size, 1, `${viewport.name} card footers must align: ${footerTops.join(", ")}`);

      if (viewport.width >= 768) {
        const next = page.getByTestId("social-video-next-home");
        const previous = page.getByTestId("social-video-previous-home");
        for (const control of [next, previous]) {
          const box = await control.boundingBox();
          assert.ok(box && box.width >= 44 && box.height >= 44, "carousel control must meet touch target size");
        }
        const scroller = page.getByTestId("social-video-carousel-home");
        const before = await scroller.evaluate((element) => element.scrollLeft);
        await next.click();
        await page.waitForTimeout(500);
        const after = await scroller.evaluate((element) => element.scrollLeft);
        assert.ok(after > before, "next button must move the carousel");

      }

      assert.deepEqual(socialRequests, [], "marketing pages must not contact social video hosts before a click");
      assert.deepEqual(errors, [], `${viewport.name} carousel emitted errors`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
});
