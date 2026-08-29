import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, previewFetch, unlockPreview } from "./preview-access.mjs";

const { CONDITION_ROUTE_DATA, CONDITION_ROUTE_PATHS } = await import(
  new URL("../shared/condition-routes.ts", import.meta.url).href
);
const { publicRoutes } = await import(
  new URL("../app/lib/route-contract.ts", import.meta.url).href
);
const publicRoutePaths = new Set(publicRoutes.map((route) => route.path));

const representativeRoutes = [
  "/primary-care/diabetes-care",
  "/primary-care/fall-prevention",
  "/palliative-care/for-cancer",
  "/palliative-care/shortness-of-breath",
];

const heroMatrixViewports = [
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1279, height: 900 },
  { width: 1280, height: 900 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 3440, height: 1440 },
];

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

test("all sixteen condition guides ship substantial server HTML and their exact canonical", async () => {
  const results = [];
  for (const path of CONDITION_ROUTE_PATHS) {
    const response = await previewFetch(path, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
    });
    results.push({ path, response, html: await response.text() });
  }

  for (const { path, response, html } of results) {
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") || "", /text\/html/i);
    assert.match(
      html,
      new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']https://faithfulcaremedical\\.com${path}["']`, "i"),
      `${path} is missing its exact canonical`,
    );
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${path} must serve one H1`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
    assert.ok(visibleText(main).length >= 2_500, `${path} content is too thin for its clinical intent`);
    assert.match(html, /data-testid=["']section-condition-sources["']/i, `${path} is missing visible evidence sources`);
    assert.match(html, /["']@type["']\s*:\s*["']FAQPage["']/i, `${path} is missing FAQPage JSON-LD`);

    const internalLinks = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)]
      .map((match) => match[1])
      .filter((href) => href.startsWith("/") && !href.startsWith("//"))
      .map((href) => new URL(href, "https://faithfulcaremedical.com").pathname);
    for (const href of internalLinks) {
      assert.ok(publicRoutePaths.has(href), `${path} links to an unknown internal route: ${href}`);
    }
  }
});

test("representative condition layouts work without overflow or browser errors on desktop and mobile", async () => {
  const browser = await chromium.launch();
  try {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.name === "mobile",
        hasTouch: viewport.name === "mobile",
      });
      await unlockPreview(context);

      for (const path of representativeRoutes) {
        const page = await context.newPage();
        const pageErrors = [];
        const consoleErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));
        page.on("console", (message) => {
          if (message.type() === "error" && !message.text().includes("/_next/webpack-hmr")) {
            consoleErrors.push(message.text());
          }
        });

        const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
        assert.equal(response?.status(), 200, `${path} failed at ${viewport.name}`);
        await page.getByTestId("text-hero-title").waitFor({ state: "visible" });

        assert.equal(await page.locator("main h1").count(), 1, `${path} H1 count at ${viewport.name}`);
        assert.equal(await page.getByTestId("section-condition-quick-facts").locator("article, div.rounded-2xl").count(), 3);
        assert.equal(await page.getByTestId("link-condition-parent-hub").getAttribute("href"), CONDITION_ROUTE_DATA[path].group === "primary" ? "/primary-care" : "/palliative-care");
        assert.ok(await page.getByTestId("section-faq").locator('[data-testid^="faq-question-"]').count() >= 6);
        assert.ok(await page.getByTestId("section-condition-sources").locator("a").count() >= 4);
        const relatedCare = page.getByTestId("section-related-care");
        assert.ok(await relatedCare.locator("a").count() >= 4);

        const featuredRegions = await relatedCare.getByTestId("related-care-featured").evaluate((card) => {
          const image = card.querySelector("img")?.getBoundingClientRect();
          const heading = card.querySelector("h3")?.getBoundingClientRect();
          if (!image || !heading) return null;
          return {
            image: { left: image.left, top: image.top, right: image.right, bottom: image.bottom },
            heading: { left: heading.left, top: heading.top, right: heading.right, bottom: heading.bottom },
          };
        });
        assert.ok(featuredRegions, `${path} featured related-care regions missing at ${viewport.name}`);
        const featuredOverlap = !(
          featuredRegions.image.bottom <= featuredRegions.heading.top + 1
          || featuredRegions.heading.bottom <= featuredRegions.image.top + 1
          || featuredRegions.image.right <= featuredRegions.heading.left + 1
          || featuredRegions.heading.right <= featuredRegions.image.left + 1
        );
        assert.equal(featuredOverlap, false, `${path} related-care text overlaps its image at ${viewport.name}`);

        const relatedCardMetrics = await relatedCare.locator('[data-testid^="related-care-link-"]').evaluateAll((cards) =>
          cards.map((card) => {
            const cardBox = card.getBoundingClientRect();
            const ctaBox = card.lastElementChild?.getBoundingClientRect();
            return { height: cardBox.height, ctaBottom: ctaBox?.bottom ?? 0 };
          }),
        );
        const cardHeights = relatedCardMetrics.map(({ height }) => height);
        const ctaBottoms = relatedCardMetrics.map(({ ctaBottom }) => ctaBottom);
        assert.ok(Math.max(...cardHeights) - Math.min(...cardHeights) <= 1, `${path} related cards have unequal heights at ${viewport.name}`);
        assert.ok(Math.max(...ctaBottoms) - Math.min(...ctaBottoms) <= 1, `${path} related-card CTAs are misaligned at ${viewport.name}`);

        const smallTextContrasts = await page
          .locator('[data-testid="condition-fact-label"], [data-testid="related-care-index"]')
          .evaluateAll((elements) => {
            const luminance = (rgb) => {
              const linear = rgb.map((channel) => {
                const value = channel / 255;
                return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
              });
              return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
            };
            const ratio = (foreground, background) => {
              const canvas = document.createElement("canvas");
              canvas.width = 1;
              canvas.height = 1;
              const context = canvas.getContext("2d", { willReadFrequently: true });
              context.fillStyle = "#ffffff";
              context.fillRect(0, 0, 1, 1);
              context.fillStyle = background;
              context.fillRect(0, 0, 1, 1);
              const backgroundRgb = Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
              context.fillStyle = foreground;
              context.fillRect(0, 0, 1, 1);
              const foregroundRgb = Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
              const foregroundLuminance = luminance(foregroundRgb);
              const backgroundLuminance = luminance(backgroundRgb);
              return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
                / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
            };

            return elements.map((element) => {
              const surface = element.matches('[data-testid="related-care-index"]')
                ? element.closest('[data-testid^="related-care-link-"]')
                : element.closest('[data-testid="section-condition-quick-facts"]')?.querySelector("div.rounded-2xl");
              return {
                text: element.textContent?.trim(),
                ratio: ratio(getComputedStyle(element).color, getComputedStyle(surface || document.body).backgroundColor),
              };
            });
          });
        for (const sample of smallTextContrasts) {
          assert.ok(sample.ratio >= 4.5, `${path} small label "${sample.text}" contrast was ${sample.ratio.toFixed(2)}:1 at ${viewport.name}`);
        }

        const failedImages = await page.locator("main img").evaluateAll((images) =>
          images
            .filter((image) => !image.closest('[aria-hidden="true"]'))
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src),
        );
        assert.deepEqual(failedImages, [], `${path} has broken images at ${viewport.name}`);

        const overflow = await page.evaluate(() => ({
          viewport: window.innerWidth,
          document: document.documentElement.scrollWidth,
        }));
        assert.ok(
          overflow.document <= overflow.viewport + 1,
          `${path} overflows ${viewport.name}: ${overflow.document}px > ${overflow.viewport}px`,
        );

        if (viewport.name === "desktop") {
          const heroMedia = page.getByTestId("hero-media");
          const heroImage = page.getByTestId("img-hero-bg");
          const copyRegion = page.getByTestId("hero-copy-region");
          const header = page.getByTestId("header-navigation");
          const [mediaBox, imageBox, copyBox, headerBox] = await Promise.all([
            heroMedia.boundingBox(),
            heroImage.boundingBox(),
            copyRegion.boundingBox(),
            header.boundingBox(),
          ]);
          assert.ok(mediaBox && imageBox && copyBox && headerBox, `${path} desktop hero geometry missing`);
          assert.ok(copyBox.y >= headerBox.y + headerBox.height + 16, `${path} hero copy crowds the fixed header`);
          assert.ok(copyBox.y + copyBox.height <= mediaBox.y + mediaBox.height - 12, `${path} hero copy is clipped by the media boundary`);
          assert.ok(Math.abs(imageBox.x - mediaBox.x) <= 1, `${path} hero image leaves a left-side color patch`);
          assert.ok(Math.abs((imageBox.x + imageBox.width) - (mediaBox.x + mediaBox.width)) <= 1, `${path} hero image does not fill the full hero width`);

          const copySurface = await copyRegion.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
              backgroundColor: style.backgroundColor,
              borderTopWidth: style.borderTopWidth,
              boxShadow: style.boxShadow,
            };
          });
          assert.ok(
            copySurface.backgroundColor === "rgba(0, 0, 0, 0)" || copySurface.backgroundColor === "transparent",
            `${path} condition hero copy must not sit inside an opaque panel`,
          );
          assert.equal(copySurface.borderTopWidth, "0px", `${path} condition hero copy must not have a card border`);
          assert.equal(copySurface.boxShadow, "none", `${path} condition hero copy must not have a card shadow`);

          if (await page.getByTestId("search-bar-container").count()) {
            const contactFormBox = await page.getByTestId("search-bar-container").boundingBox();
            assert.ok(contactFormBox, `${path} desktop contact form geometry missing`);
            assert.ok(
              contactFormBox.y >= mediaBox.y + mediaBox.height + 24,
              `${path} contact form collides with the hero instead of following it`,
            );
          }
        } else {
          const [mobileMediaBox, mobileImageBox, copyBox] = await Promise.all([
            page.getByTestId("hero-media-mobile").boundingBox(),
            page.getByTestId("img-hero-mobile").boundingBox(),
            page.getByTestId("hero-copy-region").boundingBox(),
          ]);
          assert.ok(mobileMediaBox && mobileImageBox && copyBox, `${path} mobile hero geometry missing`);
          assert.ok(Math.abs(mobileImageBox.x - mobileMediaBox.x) <= 1, `${path} mobile hero image is off-center`);
          assert.ok(Math.abs(mobileImageBox.width - mobileMediaBox.width) <= 1, `${path} mobile hero image does not fill its frame`);
          assert.ok(copyBox.y >= mobileMediaBox.y + mobileMediaBox.height + 20, `${path} mobile hero copy collides with the photo`);
        }

        const faqParity = await page.evaluate(() => {
          const visibleQuestions = [...document.querySelectorAll('[data-testid^="faq-question-"]')]
            .map((element) => element.textContent?.replace(/\s+/g, " ").trim())
            .filter(Boolean);
          const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
            .map((script) => {
              try { return JSON.parse(script.textContent || "{}"); } catch { return null; }
            })
            .filter(Boolean);
          const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
          return {
            visibleQuestions,
            schemaQuestions: faq?.mainEntity?.map((entry) => entry.name) || [],
          };
        });
        assert.deepEqual(faqParity.schemaQuestions, faqParity.visibleQuestions, `${path} FAQ schema must match visible questions`);

        if (path === "/palliative-care/shortness-of-breath") {
          assert.equal(await page.getByTestId("condition-urgent-notice").count(), 1);
          assert.equal(await page.getByTestId("hero-ctas").count(), 0, "breathing safety page must not lead with commercial CTAs");
          assert.equal(await page.getByTestId("search-bar-wrapper").count(), 0, "breathing safety page must not lead with the contact form");
          assert.match(await page.getByTestId("condition-urgent-notice").innerText(), /call 911/i);
        }

        if (path === "/palliative-care/for-cancer") {
          assert.equal(await page.getByTestId("condition-urgent-notice").count(), 1);
          assert.equal(await page.getByTestId("hero-ctas").count(), 1, "cancer safety guidance must not remove routine hero actions");
          if (viewport.name === "desktop") {
            assert.equal(await page.getByTestId("search-bar-wrapper").count(), 1, "cancer safety guidance must preserve the routine contact form");
          }
        }

        assert.deepEqual(pageErrors, [], `${path} page errors at ${viewport.name}`);
        assert.deepEqual(consoleErrors, [], `${path} console errors at ${viewport.name}`);
        await page.close();
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
});

test("all condition heroes hold their geometry and conversion path across the full breakpoint matrix", async () => {
  const browser = await chromium.launch();
  try {
    for (const viewport of heroMatrixViewports) {
      const context = await browser.newContext({
        viewport,
        isMobile: viewport.width < 768,
        hasTouch: viewport.width < 1280,
      });
      await unlockPreview(context);
      const page = await context.newPage();
      const pageErrors = [];
      const consoleErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error" && !message.text().includes("/_next/webpack-hmr")) {
          consoleErrors.push(message.text());
        }
      });

      for (const path of CONDITION_ROUTE_PATHS) {
        pageErrors.length = 0;
        consoleErrors.length = 0;
        const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
        assert.equal(response?.status(), 200, `${path} returned ${response?.status()} at ${viewport.width}px`);
        await page.getByTestId("text-hero-title").waitFor({ state: "visible" });

        const geometry = await page.evaluate(({ desktop }) => {
          const box = (selector) => {
            const element = document.querySelector(selector);
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              left: rect.left,
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
              width: rect.width,
              height: rect.height,
              display: style.display,
              visibility: style.visibility,
              opacity: Number(style.opacity),
            };
          };
          const inViewport = (metrics) => Boolean(
            metrics
            && metrics.display !== "none"
            && metrics.visibility !== "hidden"
            && metrics.opacity > 0
            && metrics.right > 0
            && metrics.left < window.innerWidth
            && metrics.bottom > 0
            && metrics.top < window.innerHeight
          );
          const media = box(desktop ? '[data-testid="hero-media"]' : '[data-testid="hero-media-mobile"]');
          const image = box(desktop ? '[data-testid="img-hero-bg"]' : '[data-testid="img-hero-mobile"]');
          const copy = box('[data-testid="hero-copy-region"]');
          const h1 = box('[data-testid="text-hero-title"]');
          const header = box('[data-testid="header-navigation"]');
          const primaryCta = box('[data-testid="button-hero-primary"]');
          const fab = box('[data-testid="button-mobile-contact-fab"]');
          const headerCall = box('[data-testid="header-navigation"] a[href^="tel:"]');
          const ambient = box('[data-testid="hero-ambient-0"]');
          const h1Element = document.querySelector('[data-testid="text-hero-title"]');
          const h1Style = h1Element ? getComputedStyle(h1Element) : null;
          return {
            media,
            image,
            copy,
            h1,
            header,
            ambient,
            overflow: document.documentElement.scrollWidth - window.innerWidth,
            h1Clipped: h1Element && h1Style
              ? ["hidden", "clip"].includes(h1Style.overflowY) && h1Element.scrollHeight > h1Element.clientHeight + 1
              : true,
            hasViewportAction: [primaryCta, fab, headerCall].some(inViewport),
          };
        }, { desktop: viewport.width >= 1280 });

        assert.ok(geometry.media && geometry.image && geometry.copy && geometry.h1 && geometry.header, `${path} hero geometry is incomplete at ${viewport.width}px`);
        assert.ok(geometry.overflow <= 1, `${path} overflows by ${geometry.overflow}px at ${viewport.width}px`);
        assert.equal(geometry.h1Clipped, false, `${path} clips its H1 at ${viewport.width}px`);
        assert.ok(geometry.h1.left >= -1 && geometry.h1.right <= viewport.width + 1, `${path} pushes its H1 outside the viewport at ${viewport.width}px`);
        assert.ok(geometry.h1.top >= geometry.header.bottom + 16, `${path} places its H1 under the fixed header at ${viewport.width}px`);
        if (viewport.width >= 2560) {
          assert.ok(geometry.ambient, `${path} has no ultrawide ambient image at ${viewport.width}px`);
          assert.ok(Math.abs(geometry.ambient.left - geometry.media.left) <= 1 && Math.abs(geometry.ambient.right - geometry.media.right) <= 1, `${path} ambient image does not cover the ultrawide hero at ${viewport.width}px`);
          assert.ok(Math.abs(geometry.image.right - geometry.media.right) <= 1, `${path} foreground image leaves a right patch at ${viewport.width}px`);
        } else {
          assert.ok(Math.abs(geometry.image.left - geometry.media.left) <= 1, `${path} image leaves a left patch at ${viewport.width}px`);
          assert.ok(Math.abs(geometry.image.right - geometry.media.right) <= 1, `${path} image leaves a right patch at ${viewport.width}px`);
        }
        assert.ok(geometry.hasViewportAction || path === "/palliative-care/shortness-of-breath", `${path} has no visible safe action at ${viewport.width}px`);

        if (viewport.width >= 1280) {
          assert.ok(geometry.copy.bottom <= geometry.media.bottom - 12, `${path} clips copy at ${viewport.width}px`);
          assert.equal(await page.getByTestId("button-mobile-contact-fab").isVisible(), false, `${path} leaves the tablet FAB visible at ${viewport.width}px`);
        } else {
          assert.ok(geometry.copy.top >= geometry.media.bottom + 20, `${path} overlaps copy and image at ${viewport.width}px`);
          const hasUrgentNotice = await page.getByTestId("condition-urgent-notice").count() > 0;
          if (viewport.width >= 768 && !hasUrgentNotice) {
            assert.equal(await page.getByTestId("button-mobile-contact-fab").isVisible(), true, `${path} loses the tablet booking action at ${viewport.width}px`);
          }
        }

        assert.deepEqual(pageErrors, [], `${path} page errors at ${viewport.width}px`);
        assert.deepEqual(consoleErrors, [], `${path} console errors at ${viewport.width}px`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
});

test("tablet booking sheet announces outcomes, traps focus, and remains keyboard-operable", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 800, height: 900 },
    reducedMotion: "reduce",
  });
  await unlockPreview(context);
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("/_next/webpack-hmr")) consoleErrors.push(message.text());
  });

  try {
    await page.route("**/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: false, error: "Test error" }) });
    });
    const response = await page.goto(`${baseUrl}/primary-care/diabetes-care`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);

    const fab = page.getByTestId("button-mobile-contact-fab");
    await fab.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    await page.waitForTimeout(50);
    assert.equal(await dialog.getAttribute("aria-modal"), "true");
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("data-testid")), "button-mobile-contact-close");

    const dialogAudit = await dialog.evaluate((element) => {
      const ids = [...element.querySelectorAll("[id]")].map((node) => node.id).filter(Boolean);
      const close = element.querySelector('[data-testid="button-mobile-contact-close"]')?.getBoundingClientRect();
      return {
        uniqueIds: new Set(ids).size === ids.length,
        closeWidth: close?.width ?? 0,
        closeHeight: close?.height ?? 0,
      };
    });
    assert.equal(dialogAudit.uniqueIds, true, "contact sheet contains duplicate IDs");
    assert.ok(dialogAudit.closeWidth >= 44 && dialogAudit.closeHeight >= 44, "contact close target is smaller than 44px");

    const close = page.getByTestId("button-mobile-contact-close");
    await close.focus();
    await page.keyboard.press("Shift+Tab");
    assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true, "Shift+Tab escaped the dialog");

    const form = dialog.getByTestId("hero-contact-form");
    const name = form.getByTestId("input-contact-name");
    await name.focus();
    const focusStyle = await name.evaluate((element) => ({
      boxShadow: getComputedStyle(element).boxShadow,
      outlineWidth: getComputedStyle(element).outlineWidth,
    }));
    assert.notEqual(focusStyle.boxShadow, "none", "form control has no visible focus ring");

    await name.fill("Accessibility Test");
    await form.getByTestId("input-contact-email").fill("test@example.com");
    await form.getByTestId("button-contact-submit").click();
    await page.waitForFunction(() => document.querySelector('[role="dialog"] form')?.getAttribute("aria-busy") === "true");
    const alert = dialog.getByRole("alert");
    await alert.waitFor({ state: "visible" });
    assert.equal(await alert.getAttribute("aria-live"), "assertive");

    await page.unroute("**/api/contact");
    await page.route("**/api/contact", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) }));
    await form.getByTestId("button-contact-submit").click();
    const status = dialog.getByRole("status");
    await status.waitFor({ state: "visible" });
    assert.equal(await status.getAttribute("aria-live"), "polite");

    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("data-testid")), "button-mobile-contact-fab");
    assert.deepEqual(pageErrors, [], "tablet sheet page errors");
    assert.deepEqual(consoleErrors, [], "tablet sheet console errors");
  } finally {
    await context.close();
    await browser.close();
  }
});

test("condition pages stop entrance and marquee motion when the visitor requests reduced motion", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await unlockPreview(context);
  const page = await context.newPage();

  try {
    const response = await page.goto(`${baseUrl}/primary-care/diabetes-care`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);

    const marqueeTrack = page.getByTestId("marquee-hero").locator(".flex.whitespace-nowrap");
    const marqueeBefore = await marqueeTrack.evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(350);
    const marqueeAfter = await marqueeTrack.evaluate((element) => getComputedStyle(element).transform);
    assert.equal(marqueeAfter, marqueeBefore, "reduced-motion marquee must remain stationary");

    const detailHeading = page.getByTestId("section-detail-grid").locator(".lg\\:col-span-5");
    await detailHeading.scrollIntoViewIfNeeded();
    const detailStyle = await detailHeading.evaluate((element) => ({
      opacity: getComputedStyle(element).opacity,
      transform: getComputedStyle(element).transform,
    }));
    assert.equal(detailStyle.opacity, "1");
    assert.ok(
      detailStyle.transform === "none" || detailStyle.transform === "matrix(1, 0, 0, 1, 0, 0)",
      `detail grid moved under reduced motion: ${detailStyle.transform}`,
    );
  } finally {
    await context.close();
    await browser.close();
  }
});

test("care hubs do not mass-prefetch the sixteen condition guides", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await unlockPreview(context);
  const page = await context.newPage();
  const conditionRequests = [];

  page.on("request", (request) => {
    const pathname = new URL(request.url()).pathname;
    if (CONDITION_ROUTE_PATHS.includes(pathname)) conditionRequests.push(pathname);
  });

  try {
    const response = await page.goto(`${baseUrl}/primary-care`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);
    await page.getByTestId("section-related-care").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    assert.deepEqual([...new Set(conditionRequests)], [], "primary-care hub prefetched condition routes before interaction");
  } finally {
    await context.close();
    await browser.close();
  }
});
