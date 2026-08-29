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

        const primaryCareCta = page.getByTestId("button-atencion-bilingue-cta");
        await primaryCareCta.scrollIntoViewIfNeeded();
        assert.equal((await primaryCareCta.innerText()).trim(), "Ver atención primaria");
        assert.equal(await primaryCareCta.evaluate((element) => element.tagName), "A");
        assert.equal(await primaryCareCta.getAttribute("href"), "/es/medico-de-familia-naples");
        assert.equal(await primaryCareCta.locator("button").count(), 0, "CTA must not nest a button inside its link");
        const textLineCount = await primaryCareCta.evaluate((element) => {
          const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
          if (!textNode) return 0;
          const range = document.createRange();
          range.selectNodeContents(textNode);
          return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
        });
        assert.equal(textLineCount, 1, `primary-care CTA wrapped at ${viewport.name}`);

        const conditionFooter = page.getByTestId("footer-condition-links");
        await conditionFooter.scrollIntoViewIfNeeded();
        assert.match(await conditionFooter.locator("h2").innerText(), /gu[ií]as sobre afecciones/i);
        assert.match(await conditionFooter.locator("p").innerText(), /disponibles en ingl[eé]s/i);
        assert.equal(await conditionFooter.locator('[lang="en"]').count(), 1);

        if (viewport.name === "mobile") {
          const appointmentTrigger = page.getByTestId("action-bar-appointment");
          await appointmentTrigger.click();
          const actionSheet = page.getByRole("dialog", { name: "Pedir una cita" });
          await actionSheet.waitFor({ state: "visible" });
          assert.equal(await actionSheet.getAttribute("lang"), "es");
          assert.equal(await actionSheet.getAttribute("aria-modal"), "true");
          assert.match(await actionSheet.innerText(), /pedir una cita/i);
          await actionSheet.getByLabel("Nombre completo").waitFor({ state: "visible" });
          await actionSheet.getByLabel("Correo electrónico").waitFor({ state: "visible" });
          await actionSheet.getByLabel("Motivo").waitFor({ state: "visible" });
          assert.match(await page.getByTestId("button-ab-contact-submit").innerText(), /pedir cita/i);
          const closeButton = page.getByTestId("button-action-bar-contact-close");
          await page.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "button-action-bar-contact-close");
          await page.keyboard.press("Shift+Tab");
          assert.equal(
            await actionSheet.locator('a[href="tel:2394230205"]').evaluate((element) => element === document.activeElement),
            true,
            "Shift+Tab from the first control should wrap to the final control",
          );
          await page.keyboard.press("Tab");
          await page.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "button-action-bar-contact-close");
          await page.keyboard.press("Escape");
          await actionSheet.waitFor({ state: "hidden" });
          await page.waitForFunction(() => document.activeElement?.getAttribute("data-testid") === "action-bar-appointment");
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
