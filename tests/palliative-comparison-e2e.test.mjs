import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

const path = "/palliative-care/about-palliative-care";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

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

        const footnoteContrast = await section.getByTestId("comparison-footnote").evaluate((element) => {
          const parse = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
          const luminance = (rgb) => {
            const linear = rgb.map((channel) => {
              const value = channel / 255;
              return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
            });
            return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
          };
          const foreground = luminance(parse(getComputedStyle(element).color));
          const background = luminance([255, 255, 255]);
          return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
        });
        assert.ok(footnoteContrast >= 4.5, `comparison footnote contrast was ${footnoteContrast.toFixed(2)}:1`);

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
