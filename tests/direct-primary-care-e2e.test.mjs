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
