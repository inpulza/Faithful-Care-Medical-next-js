import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

const path = "/palliative-care/about-palliative-care";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

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

test("the palliative and hospice comparison preserves table semantics responsively", async () => {
  const browser = await chromium.launch();

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce",
      });
      await unlockPreview(context);
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });

      try {
        const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200, `status at ${viewport.name}`);
        const section = page.getByTestId("section-comparison-table");
        await section.scrollIntoViewIfNeeded();

        const table = section.locator("table");
        await table.waitFor({ state: "visible" });
        assert.equal(await table.locator('th[scope="col"]').count(), 3);
        assert.deepEqual(
          await table.locator('th[scope="col"]').allTextContents(),
          ["Compare", "Palliative care", "Hospice care"],
        );
        assert.equal(await table.locator('th[scope="row"]').count(), 5);
        assert.equal(await table.locator("tbody tr").count(), 5);

        const footnoteContrast = await contrastRatio(section.getByTestId("comparison-footnote"));
        assert.ok(footnoteContrast >= 4.5, `comparison footnote contrast was ${footnoteContrast.toFixed(2)}:1`);
        const eyebrowContrast = await contrastRatio(section.locator("p").filter({ hasText: "Palliative care and hospice" }).first());
        assert.ok(eyebrowContrast >= 4.5, `comparison eyebrow contrast was ${eyebrowContrast.toFixed(2)}:1`);
        if (viewport.name === "mobile") {
          const mobileRightHeading = section.getByTestId("comparison-mobile-right-heading").first();
          const headingContrast = await contrastRatio(mobileRightHeading);
          assert.ok(headingContrast >= 4.5, `mobile hospice label contrast was ${headingContrast.toFixed(2)}:1`);
        }

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        assert.ok(overflow <= 1, `comparison overflows by ${overflow}px at ${viewport.name}`);
        assert.deepEqual(errors, [], `browser errors at ${viewport.name}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});
