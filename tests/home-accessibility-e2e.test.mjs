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
    assert.equal(await contactFab.isVisible(), false, "the tablet FAB must not duplicate the mobile action bar");
    await mobilePage.getByTestId("mobile-action-bar").waitFor({ state: "visible" });
    const appointmentTrigger = mobilePage.getByTestId("action-bar-appointment");
    await appointmentTrigger.waitFor({ state: "visible" });
    await appointmentTrigger.click();
    const appointmentDialog = mobilePage.getByRole("dialog", { name: "Request a Visit" });
    await appointmentDialog.waitFor({ state: "visible" });
    assert.equal(await appointmentDialog.getAttribute("aria-modal"), "true");
    await mobilePage.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "button-action-bar-contact-close");
    await mobilePage.keyboard.press("Escape");
    await appointmentDialog.waitFor({ state: "hidden" });
    await mobilePage.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "action-bar-appointment");

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

test("homepage tablet booking sheet keeps focus while the hero carousel advances", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 } });
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

  try {
    const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);

    const fab = page.getByTestId("button-mobile-contact-fab");
    await fab.waitFor({ state: "visible" });
    assert.equal(await page.getByTestId("search-bar-wrapper").evaluate((element) => getComputedStyle(element).display), "none", "tablet exposes the inline form beside the booking sheet trigger");
    assert.equal(await page.locator('[data-testid="contact-form-card"]:visible').count(), 0, "tablet exposes a contact form before opening the sheet");
    await fab.click();

    const dialog = page.getByRole("dialog", { name: "Request a Visit" });
    await dialog.waitFor({ state: "visible" });
    assert.equal(await page.locator('[data-testid="contact-form-card"]:visible').count(), 1, "tablet exposes more than one contact form while the sheet is open");
    const nameInput = dialog.getByTestId("input-contact-name");
    await nameInput.fill("Focus stays here");
    await nameInput.focus();

    const visibleSlide = () => page
      .getByTestId("hero-media")
      .locator('img[data-testid^="img-hero"]')
      .evaluateAll((images) => images.find((image) => Number(getComputedStyle(image).opacity) > 0.5)?.getAttribute("data-testid"));
    const initialSlide = await visibleSlide();
    await page.waitForTimeout(6_500);
    const advancedSlide = await visibleSlide();

    assert.notEqual(advancedSlide, initialSlide, "the regression test must observe one carousel advance");
    assert.equal(await nameInput.inputValue(), "Focus stays here");
    assert.equal(await nameInput.evaluate((element) => document.activeElement === element), true, "carousel advance moved focus out of the field");
    assert.equal(await dialog.isVisible(), true, "carousel advance closed or reset the booking sheet");
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden", "carousel advance unlocked background scrolling");

    await page.setViewportSize({ width: 1279, height: 900 });
    assert.equal(await dialog.isVisible(), true, "booking sheet closed before the xl breakpoint");
    assert.equal(await page.getByTestId("search-bar-wrapper").evaluate((element) => getComputedStyle(element).display), "none", "inline form appeared before the xl breakpoint");
    assert.equal(await page.locator('[data-testid="contact-form-card"]:visible').count(), 1, "1279px exposes duplicate contact forms");

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForFunction(() => window.matchMedia("(min-width: 1280px)").matches);
    await dialog.waitFor({ state: "hidden" });
    assert.equal(await page.evaluate(() => document.body.style.overflow), "", "crossing the desktop breakpoint left background scrolling locked");
    assert.equal(await fab.isVisible(), false, "tablet booking trigger remained visible at the desktop breakpoint");
    assert.equal(await page.getByTestId("search-bar-wrapper").evaluate((element) => getComputedStyle(element).display), "block", "desktop contact form did not activate at the xl breakpoint");
    assert.equal(await page.locator('[data-testid="contact-form-card"]:visible').count(), 1, "desktop exposes more than one visible contact form");
    assert.deepEqual(pageErrors, [], "tablet homepage emitted unexpected page errors");
    assert.deepEqual(consoleErrors, [], "tablet homepage emitted unexpected console errors");
  } finally {
    await context.close();
    await browser.close();
  }
});

test("expanded contact pages expose one form without a competing tablet sheet", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 } });
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

  try {
    for (const path of ["/contact", "/es/contacto"]) {
      pageErrors.length = 0;
      consoleErrors.length = 0;
      const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200, `${path} did not load`);
      await page.getByTestId("expanded-contact-section").waitFor({ state: "visible" });
      assert.equal(await page.locator('[data-testid="contact-form-card"]:visible').count(), 1, `${path} exposes duplicate contact forms at 1024px`);
      assert.equal(await page.getByTestId("button-mobile-contact-fab").count(), 0, `${path} renders a competing tablet booking trigger`);
      assert.equal(await page.getByTestId("mobile-contact-sheet").count(), 0, `${path} mounts a competing tablet booking sheet`);
      assert.deepEqual(pageErrors, [], `${path} emitted unexpected page errors`);
      assert.deepEqual(consoleErrors, [], `${path} emitted unexpected console errors`);
    }
  } finally {
    await context.close();
    await browser.close();
  }
});
