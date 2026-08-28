import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const sourceRoutes = ["/", "/locations/naples"];
const childRoutes = [
  "/palliative-care/about-palliative-care",
  "/palliative-care/symptom-relief",
  "/palliative-care/patient-family-support",
  "/palliative-care/planning-transitions",
];

function pathname(page) {
  const url = new URL(page.url());
  return `${url.pathname}${url.search}${url.hash}`;
}

async function assertSettledRoute(page, path) {
  assert.equal(pathname(page), path, `navigation settled at ${page.url()}`);
  const expectedCanonical = `https://faithfulcaremedical.com${path}`;
  await page.waitForFunction(
    (canonical) => document.querySelector('link[rel="canonical"]')?.getAttribute("href") === canonical,
    expectedCanonical,
  );
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    expectedCanonical,
    `${path} canonical mismatch`,
  );

  const heading = page.locator("main h1").first();
  await heading.waitFor({ state: "visible" });
  const headingText = (await heading.innerText()).trim();
  assert.ok(headingText.length >= 8, `${path} H1 is not descriptive`);
  assert.doesNotMatch(headingText, /page not found|not found|404/i, `${path} rendered a 404`);
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

test("home and Naples route contextually to the canonical palliative care hub", async () => {
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
        for (const sourcePath of sourceRoutes) {
          const response = await page.goto(`${baseUrl}${sourcePath}`, { waitUntil: "networkidle" });
          assert.equal(response?.status(), 200, `${sourcePath} status at ${viewport.name}`);

          const contextualLink = page.locator('main a[href="/palliative-care"]');
          assert.ok(
            (await contextualLink.count()) > 0,
            `${sourcePath} lacks a contextual link to /palliative-care at ${viewport.name}`,
          );

          const link = contextualLink.first();
          const accessibleName = (await link.innerText()).replace(/\s+/g, " ").trim();
          assert.match(
            accessibleName,
            /palliative/i,
            `${sourcePath} contextual link is not descriptive at ${viewport.name}`,
          );

          await link.click();
          await page.waitForURL((url) => url.pathname === "/palliative-care");
          await assertSettledRoute(page, "/palliative-care");
        }

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

test("the palliative care hub routes to all four child services", async () => {
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
        for (const childPath of childRoutes) {
          const hubResponse = await page.goto(`${baseUrl}/palliative-care`, {
            waitUntil: "networkidle",
          });
          assert.equal(hubResponse?.status(), 200, `hub status at ${viewport.name}`);

          const childLink = page.locator(`main a[href="${childPath}"]`);
          assert.ok(
            (await childLink.count()) > 0,
            `hub must expose a contextual ${childPath} link at ${viewport.name}`,
          );

          await childLink.first().click();
          await page.waitForURL((url) => url.pathname === childPath);
          await assertSettledRoute(page, childPath);
        }

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
