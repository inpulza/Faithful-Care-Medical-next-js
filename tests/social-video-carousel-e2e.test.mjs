import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, previewFetch, unlockPreview } from "./preview-access.mjs";

const { SOCIAL_VIDEOS } = await import(new URL("../shared/social-videos.ts", import.meta.url).href);
const thirdPartyVideoHost = /(?:tiktok\.com|tiktokcdn|instagram\.com|cdninstagram|youtube\.com|youtu\.be|googlevideo)/i;

test("core acquisition pages expose every video card in server HTML without third-party media", async () => {
  const placements = new Map([
    ["/", "home"],
    ["/locations/naples", "naples"],
    ["/insurance-accepted", "insurance-accepted"],
    ["/primary-care", "primary-care"],
    ["/palliative-care", "palliative-care"],
  ]);
  for (const [path, placement] of placements) {
    const response = await previewFetch(path);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(`data-testid=["']social-video-section-${placement}["']`));
    for (const video of SOCIAL_VIDEOS) {
      assert.ok(html.includes(video.tiktokUrl), `${path} missing ${video.slug} TikTok link`);
      assert.ok(html.includes(video.instagramUrl), `${path} missing ${video.slug} Instagram link`);
      assert.ok(html.includes(video.thumbnailUrl), `${path} missing ${video.slug} local thumbnail`);
    }
    assert.doesNotMatch(html, /<iframe/i, `${path} must not load social players at startup`);
    assert.doesNotMatch(html, /<script[^>]+(?:tiktok|instagram|youtube)/i, `${path} must not load social scripts`);
    assert.doesNotMatch(html, /["']@type["']\s*:\s*["']VideoObject["']/i, `${path} must not claim a primary watch-page video`);
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
      await section.evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY }));
      assert.equal(await section.getByRole("heading", { name: "Clear answers, straight from Dr. Reve." }).count(), 1);
      assert.equal(await section.locator('[data-testid^="social-video-card-"]').count(), SOCIAL_VIDEOS.length);

      for (const video of SOCIAL_VIDEOS) {
        const card = page.getByTestId(`social-video-card-${video.slug}`);
        const link = page.getByTestId(`social-video-link-${video.slug}`);
        const instagramName = video.language === "es"
          ? `Ver ${video.title} en Instagram`
          : `View ${video.title} on Instagram`;
        assert.equal(await card.locator("article").getAttribute("lang"), video.language);
        assert.equal(await link.getAttribute("href"), video.tiktokUrl);
        assert.equal(await link.getAttribute("target"), "_blank");
        assert.match(await link.getAttribute("rel"), /noopener/);
        assert.equal(await card.getByRole("link", { name: instagramName }).count(), 1);
      }

      const footerTops = await section.locator('[data-testid^="social-video-footer-"]').evaluateAll((elements) =>
        elements.map((element) => Math.round(element.getBoundingClientRect().top)),
      );
      assert.equal(new Set(footerTops).size, 1, `${viewport.name} card footers must align: ${footerTops.join(", ")}`);

      if (viewport.width >= 768) {
        const next = page.getByTestId("social-video-next-home");
        const previous = page.getByTestId("social-video-previous-home");
        assert.equal(await previous.isDisabled(), true, "previous control must be disabled at the start");
        assert.equal(await next.isDisabled(), false, "next control must be enabled when more cards remain");
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
        assert.equal(await previous.isDisabled(), false, "previous control must enable after scrolling forward");

        for (let step = 0; step < 5 && !(await next.isDisabled()); step += 1) {
          await next.click();
          await page.waitForTimeout(500);
        }
        assert.equal(await next.isDisabled(), true, "next control must disable at the end");

      }

      assert.deepEqual(socialRequests, [], "marketing pages must not contact social video hosts before a click");
      assert.deepEqual(errors, [], `${viewport.name} carousel emitted errors`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
});

test("social video clicks respect analytics consent and emit one sanitized event", async () => {
  const browser = await chromium.launch();
  try {
    const cases = [
      { decision: "reject", path: "/", placement: "home" },
      { decision: "accept", path: "/", placement: "home" },
      { decision: "accept", path: "/locations/naples", placement: "naples" },
      { decision: "accept", path: "/insurance-accepted", placement: "insurance-accepted" },
    ];
    for (const { decision, path, placement } of cases) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        userAgent: "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36",
        isMobile: true,
        hasTouch: true,
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
      await context.route(thirdPartyVideoHost, (route) =>
        route.fulfill({ status: 200, contentType: "text/html", body: "<title>Social video</title>" }),
      );
      await unlockPreview(context);
      const page = await context.newPage();
      const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200);

      await page.getByTestId(decision === "accept" ? "button-cookie-accept-all" : "button-cookie-reject").click();
      if (decision === "accept") {
        await page.waitForFunction(() => window.__fcmsConsentState?.analytics === true && typeof window.gtag === "function");
      }

      const popupPromise = page.waitForEvent("popup");
      await page.getByTestId("social-video-link-care-plan-for-a-sick-person").click();
      const popup = await popupPromise;
      await popup.waitForLoadState("domcontentloaded");
      assert.equal(popup.url(), SOCIAL_VIDEOS[0].tiktokUrl, `${placement} TikTok click must settle on the exact post URL`);
      await popup.close();
      const events = await page.evaluate(() => (window.dataLayer || [])
        .map((entry) => {
          try { return Array.from(entry); } catch { return entry; }
        })
        .filter((entry) => Array.isArray(entry) && entry[0] === "event" && entry[1] === "social_video_click"));

      if (decision === "reject") {
        assert.equal(events.length, 0, "rejected analytics consent must suppress social_video_click");
      } else {
        assert.equal(events.length, 1, "accepted analytics consent must emit exactly one social_video_click");
        assert.deepEqual(
          {
            video_slug: events[0][2].video_slug,
            platform: events[0][2].platform,
            placement: events[0][2].placement,
          },
          { video_slug: "care-plan-for-a-sick-person", platform: "tiktok", placement },
        );
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
});
