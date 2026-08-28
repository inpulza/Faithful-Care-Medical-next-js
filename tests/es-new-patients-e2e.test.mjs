import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";
import { baseUrl, unlockPreview } from "./preview-access.mjs";

const path = "/es/pacientes-nuevos";
const canonical = `https://faithfulcaremedical.com${path}`;
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function collectBrowserErrors(page) {
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  return { pageErrors, consoleErrors };
}

test("the Spanish new-patient journey works from the footer on desktop and mobile", async () => {
  const browser = await chromium.launch();

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce",
      });
      await unlockPreview(context);
      const page = await context.newPage();
      const errors = collectBrowserErrors(page);

      try {
        let response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200, `home status at ${viewport.name}`);

        const footerLink = page.getByTestId("footer-link-es-new-patients");
        await footerLink.scrollIntoViewIfNeeded();
        await footerLink.waitFor({ state: "visible" });
        await footerLink.click();
        await page.waitForURL((url) => url.pathname === path);

        const heading = page.locator("main h1").first();
        await heading.waitFor({ state: "visible" });
        assert.match(await heading.innerText(), /aceptamos pacientes nuevos/i);
        assert.equal(await page.locator('html').getAttribute("lang"), "es");
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical);
        assert.equal(
          await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute("href"),
          "https://faithfulcaremedical.com/new-patients",
        );
        assert.equal(
          await page.locator('link[rel="alternate"][hreflang="es"]').getAttribute("href"),
          canonical,
        );

        const mainText = (await page.locator("main").innerText()).replace(/\s+/g, " ");
        assert.match(mainText, /identificaci[oó]n con foto/i);

        if (viewport.name === "mobile") {
          await page.getByTestId("action-bar-appointment").click();
          const actionSheet = page.getByTestId("action-bar-contact-sheet");
          await actionSheet.waitFor({ state: "visible" });
          assert.equal(await actionSheet.getAttribute("lang"), "es");
          assert.match(await actionSheet.innerText(), /pedir una cita/i);
          await actionSheet.getByLabel("Nombre completo").waitFor({ state: "visible" });
          await actionSheet.getByLabel("Correo electrónico").waitFor({ state: "visible" });
          await actionSheet.getByLabel("Motivo").waitFor({ state: "visible" });
          assert.match(await page.getByTestId("button-ab-contact-submit").innerText(), /pedir cita/i);
          await page.getByTestId("button-action-bar-contact-close").click();
          await actionSheet.waitFor({ state: "hidden" });
        }

        const emergencyQuestion = page.getByTestId("faq-trigger-6");
        await emergencyQuestion.scrollIntoViewIfNeeded();
        await emergencyQuestion.click();
        await page.getByTestId("faq-answer-6").waitFor({ state: "visible" });
        assert.match(await page.getByTestId("faq-answer-6").innerText(), /llame al 911/i);

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        assert.ok(overflow <= 1, `Spanish route overflows by ${overflow}px at ${viewport.name}`);
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
