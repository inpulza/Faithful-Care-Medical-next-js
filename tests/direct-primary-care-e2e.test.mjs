import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

const path = "/direct-primary-care";
const canonical = "https://faithfulcaremedical.com/direct-primary-care";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function currentPath(page) {
  const url = new URL(page.url());
  return `${url.pathname}${url.search}${url.hash}`;
}

function collectBrowserErrors(page) {
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  return { pageErrors, consoleErrors };
}

async function contrastRatio(locator) {
  return locator.evaluate((element) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const parse = (value) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data);
    };
    const luminance = (rgb) => {
      const linear = rgb.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    };
    let backgroundElement = element;
    let background = [255, 255, 255, 255];
    while (backgroundElement) {
      const candidate = parse(getComputedStyle(backgroundElement).backgroundColor);
      if (candidate[3] === 255) {
        background = candidate;
        break;
      }
      backgroundElement = backgroundElement.parentElement;
    }
    const foregroundColor = parse(getComputedStyle(element).color);
    const alpha = foregroundColor[3] / 255;
    const composited = foregroundColor.slice(0, 3).map((channel, index) =>
      channel * alpha + background[index] * (1 - alpha),
    );
    const foreground = luminance(composited);
    const backgroundLuminance = luminance(background.slice(0, 3));
    return (Math.max(foreground, backgroundLuminance) + 0.05) / (Math.min(foreground, backgroundLuminance) + 0.05);
  });
}

async function assertDpcPage(page) {
  assert.equal(currentPath(page), path);
  await page.waitForFunction(
    (expected) => document.querySelector('link[rel="canonical"]')?.getAttribute("href") === expected,
    canonical,
  );
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical);

  const heading = page.locator("main h1").first();
  await heading.waitFor({ state: "visible" });
  assert.match((await heading.innerText()).trim(), /direct primary care/i);

  const mainText = (await page.locator("main").innerText()).replace(/\s+/g, " ");
  assert.match(mainText, /(?:DPC|Direct Primary Care) is not (?:a )?health insurance/i);
  assert.match(mainText, /does not replace coverage for (?:hospital care|hospitalization)/i);
  assert.equal(
    await page.getByTestId("insurance-marquee").count(),
    0,
    "DPC page must reuse the membership UI without unrelated insurance logos",
  );

  for (const testId of ["section-dpc-enrollment", "section-dpc-included", "section-dpc-outside"]) {
    const section = page.getByTestId(testId);
    await section.scrollIntoViewIfNeeded();
    await section.waitFor({ state: "visible" });
    const box = await section.boundingBox();
    const viewport = page.viewportSize();
    assert.ok(box && viewport, `${testId} must have a measurable viewport box`);
    assert.ok(box.x >= -0.5, `${testId} overflows the left viewport edge`);
    assert.ok(box.x + box.width <= viewport.width + 0.5, `${testId} overflows the right viewport edge`);
  }

  const accessibleMarqueeImages = await page
    .getByTestId("section-image-marquee")
    .locator("img")
    .evaluateAll((images) => images.filter((image) => !image.closest('[aria-hidden="true"]')).length);
  assert.equal(accessibleMarqueeImages, 4, "screen readers must receive only one marquee image set");

  const agreementImage = page.getByTestId("section-dpc-enrollment-story-1").locator("img");
  assert.match(await agreementImage.getAttribute("src"), /planning-transitions\.webp$/);
  assert.match(await agreementImage.getAttribute("alt"), /holding a document/i);

  const storiesHeader = page.getByTestId("section-dpc-enrollment-header");
  assert.ok(await contrastRatio(storiesHeader.locator("h2")) >= 3, "the large stories heading must meet 3:1 contrast");
  for (const paragraph of await storiesHeader.locator("p").all()) {
    assert.ok(await contrastRatio(paragraph) >= 4.5, "stories header body text must meet 4.5:1 contrast");
  }
  for (const note of await page.locator('[data-testid^="section-dpc-enrollment-story-"][data-testid$="-note"]').all()) {
    assert.ok(await contrastRatio(note) >= 4.5, "enrollment notes must meet 4.5:1 contrast");
  }

  if (page.viewportSize()?.width < 768) {
    assert.equal(await page.getByTestId("button-mobile-contact-fab").isVisible(), false);
    await page.getByTestId("mobile-action-bar").waitFor({ state: "visible" });
  }
}

test("Direct Primary Care is discoverable from navigation and home on desktop and mobile", async () => {
  const browser = await chromium.launch();

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      await unlockPreview(context);
      const page = await context.newPage();
      const errors = collectBrowserErrors(page);

      try {
        let response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200, `home status at ${viewport.name}`);

        await page.getByTestId("button-explore-menu").click();
        const overlay = page.getByTestId("fullscreen-menu-overlay");
        await overlay.waitFor({ state: "visible" });
        await overlay.getByTestId("overlay-toggle-insurance").click();
        const navEntry = overlay.getByRole("button", { name: /direct primary care/i }).first();
        await navEntry.waitFor({ state: "visible" });
        await navEntry.click();
        await page.waitForURL((url) => url.pathname === path);
        await assertDpcPage(page);

        response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200, `home status before contextual click at ${viewport.name}`);
        const contextualLink = page.locator(`main a[href="${path}"]`).first();
        await contextualLink.waitFor({ state: "visible" });
        assert.match((await contextualLink.innerText()).trim(), /direct primary care|membership/i);
        await contextualLink.click();
        await page.waitForURL((url) => url.pathname === path);
        await assertDpcPage(page);

        assert.deepEqual(errors.pageErrors, [], `page errors at ${viewport.name}`);
        assert.deepEqual(errors.consoleErrors, [], `console errors at ${viewport.name}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});

test("Direct Primary Care membership CTA reaches contact on desktop and mobile", async () => {
  const browser = await chromium.launch();

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      await unlockPreview(context);
      const page = await context.newPage();
      const errors = collectBrowserErrors(page);

      try {
        const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200, `DPC status at ${viewport.name}`);
        await assertDpcPage(page);
        assert.equal(
          await page.evaluate(() => performance.getEntriesByType("resource").some((entry) => entry.name.includes("gradient-gray"))),
          false,
          `DPC must not download the legacy 1.17 MB gradient at ${viewport.name}`,
        );

        const cta = page
          .locator('main a[href="/contact"]')
          .filter({ hasText: /request (?:current )?membership terms|ask about membership|membership information|contact/i })
          .first();
        await cta.waitFor({ state: "visible" });
        await cta.click();
        await page.waitForURL((url) => url.pathname === "/contact");
        assert.equal(currentPath(page), "/contact");
        await page.locator("main h1").first().waitFor({ state: "visible" });

        assert.deepEqual(errors.pageErrors, [], `page errors at ${viewport.name}`);
        assert.deepEqual(errors.consoleErrors, [], `console errors at ${viewport.name}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});

test("Direct Primary Care exposes every marquee item when motion is reduced", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await unlockPreview(context);
  const page = await context.newPage();
  const errors = collectBrowserErrors(page);

  try {
    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);
    const marquee = page.getByTestId("section-image-marquee");
    await marquee.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('[class*="mq-track-"]'));

    const accessibleImages = marquee.locator("img");
    assert.equal(await accessibleImages.count(), 4);
    const sectionBox = await marquee.boundingBox();
    assert.ok(sectionBox);
    for (let index = 0; index < 4; index += 1) {
      const imageBox = await accessibleImages.nth(index).boundingBox();
      assert.ok(imageBox, `reduced-motion marquee image ${index + 1} must be visible`);
      assert.ok(imageBox.y >= sectionBox.y - 1);
      assert.ok(imageBox.y + imageBox.height <= sectionBox.y + sectionBox.height + 1);
    }

    assert.deepEqual(errors.pageErrors, []);
    assert.deepEqual(errors.consoleErrors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});
