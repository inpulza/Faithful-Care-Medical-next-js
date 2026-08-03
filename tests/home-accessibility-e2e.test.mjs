import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

function normalizeLabel(value) {
  return value.replace(/\s+/g, " ").trim();
}

test("homepage interactive controls expose valid names, contrast, and touch targets", async () => {
  const browser = await chromium.launch();

  try {
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await unlockPreview(desktop);
    const desktopPage = await desktop.newPage();
    const desktopErrors = [];
    desktopPage.on("pageerror", (error) => desktopErrors.push(error.message));
    desktopPage.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("/_next/webpack-hmr")) {
        desktopErrors.push(message.text());
      }
    });

    const desktopResponse = await desktopPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(desktopResponse?.status(), 200);

    const callCta = desktopPage.getByTestId("button-get-started");
    assert.equal(await callCta.evaluate((element) => element.tagName), "A");
    assert.equal(await callCta.locator("button").count(), 0, "the call link must not nest a button");
    assert.equal(
      await desktopPage.getByRole("link", { name: "Call Now (239) 423-0205", exact: true }).count(),
      1,
      "the desktop call CTA must expose one stable accessible name",
    );

    const footerContrast = await desktopPage
      .locator('[data-testid="footer"] p')
      .filter({ hasText: "All rights reserved." })
      .evaluate((element) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const context = canvas.getContext("2d", { willReadFrequently: true });

        const parseColor = (color) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
          return Array.from(context.getImageData(0, 0, 1, 1).data);
        };
        const foreground = parseColor(getComputedStyle(element).color);
        const background = parseColor(getComputedStyle(element.closest("footer")).backgroundColor);
        const alpha = foreground[3] / 255;
        const composited = foreground.slice(0, 3).map((channel, index) =>
          channel * alpha + background[index] * (1 - alpha),
        );
        const luminance = (rgb) => {
          const linear = rgb.map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
        };
        const foregroundLuminance = luminance(composited);
        const backgroundLuminance = luminance(background.slice(0, 3));
        return (
          (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
          (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
        );
      });
    assert.ok(footerContrast >= 4.5, `footer contrast was ${footerContrast.toFixed(2)}:1`);
    assert.deepEqual(desktopErrors, [], "desktop homepage emitted unexpected console or page errors");
    await desktop.close();

    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    await unlockPreview(mobile);
    const mobilePage = await mobile.newPage();
    const mobileErrors = [];
    mobilePage.on("pageerror", (error) => mobileErrors.push(error.message));
    mobilePage.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("/_next/webpack-hmr")) {
        mobileErrors.push(message.text());
      }
    });

    const mobileResponse = await mobilePage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(mobileResponse?.status(), 200);

    const contactFab = mobilePage.getByTestId("button-mobile-contact-fab");
    await contactFab.waitFor({ state: "visible" });
    assert.equal(
      await contactFab.getAttribute("aria-label"),
      normalizeLabel(await contactFab.innerText()),
      "the FAB accessible name must contain its visible label verbatim",
    );

    const dots = mobilePage.locator('[data-testid^="dpc-dot-"]');
    await dots.first().scrollIntoViewIfNeeded();
    assert.equal(await dots.count(), 6);
    for (let index = 0; index < 6; index += 1) {
      const box = await dots.nth(index).boundingBox();
      assert.ok(box, `DPC dot ${index + 1} is not rendered`);
      assert.ok(box.width >= 24 && box.height >= 24, `DPC dot ${index + 1} is ${box.width}x${box.height}`);
    }

    assert.deepEqual(mobileErrors, [], "mobile homepage emitted unexpected console or page errors");
    await mobile.close();
  } finally {
    await browser.close();
  }
});
