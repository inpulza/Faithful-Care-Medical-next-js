import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";
const previewAccessUrl = process.env.PREVIEW_ACCESS_URL;
const root = new URL("../", import.meta.url);

test("both language roots install the shared optimized fonts", () => {
  const fonts = readFileSync(new URL("app/lib/fonts.ts", root), "utf8");
  const enLayout = readFileSync(new URL("app/(en)/layout.tsx", root), "utf8");
  const esLayout = readFileSync(new URL("app/(es)/layout.tsx", root), "utf8");
  const css = readFileSync(new URL("client/src/index.css", root), "utf8");

  assert.match(fonts, /DM_Serif_Display/);
  assert.match(fonts, /Inter/);
  assert.match(fonts, /style: "normal"/);
  assert.match(fonts, /style: "italic"/);
  assert.match(fonts, /preload: false/);
  assert.match(fonts, /axes: \["opsz"\]/);
  assert.match(fonts, /weight: "variable"/);
  assert.match(fonts, /weight: "400"/);
  assert.match(fonts, /--font-inter-loaded/);
  assert.match(fonts, /--font-dm-serif-display-loaded/);
  assert.match(enLayout, /className=\{fontVariables\}/);
  assert.match(esLayout, /className=\{fontVariables\}/);
  assert.match(css, /var\(--font-inter-loaded, "Inter"\)/);
  assert.match(css, /var\(--font-dm-serif-display-loaded, "DM Serif Display"\)/);
});

test("Naples renders the real display and body fonts on desktop and mobile", async () => {
  const browser = await chromium.launch();
  const pageErrors = [];

  try {
    for (const expected of [
      {
        width: 1440,
        height: 900,
        size: "57.6px",
        lineHeight: "63.36px",
        letterSpacing: "-1.44px",
        color: "rgb(255, 255, 255)",
        subtitleSize: "21.6px",
        subtitleLineHeight: "34.56px",
      },
      {
        width: 390,
        height: 844,
        size: "32px",
        lineHeight: "35.2px",
        letterSpacing: "-0.8px",
        color: "rgb(0, 23, 51)",
        subtitleSize: "18px",
        subtitleLineHeight: "28.8px",
      },
    ]) {
      const context = await browser.newContext({ viewport: expected });
      const page = await context.newPage();

      try {
        if (previewAccessUrl) {
          const accessPage = await context.newPage();
          const accessResponse = await accessPage.goto(previewAccessUrl, { waitUntil: "networkidle" });
          assert.equal(accessResponse?.status(), 200, "The protected Preview access URL should settle successfully");
          await accessPage.close();
        }

        page.on("pageerror", (error) => pageErrors.push(error.message));

        const response = await page.goto(`${baseUrl}/locations/naples`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200);
        await page.evaluate(() => document.fonts.ready);

        const result = await page.evaluate(() => {
          const heading = document.querySelector("h1");
          const subtitle = document.querySelector('[data-testid="text-hero-subtitle"]');
          if (!(heading instanceof Element)) {
            throw new Error("Naples H1 is missing");
          }
          if (!(subtitle instanceof Element)) {
            throw new Error("Naples hero subtitle is missing");
          }
          const headingStyle = getComputedStyle(heading);
          const subtitleStyle = getComputedStyle(subtitle);
          const bodyStyle = getComputedStyle(document.body);

          return {
            heading: {
              family: headingStyle.fontFamily,
              size: headingStyle.fontSize,
              weight: headingStyle.fontWeight,
              lineHeight: headingStyle.lineHeight,
              letterSpacing: headingStyle.letterSpacing,
              color: headingStyle.color,
            },
            subtitle: {
              family: subtitleStyle.fontFamily,
              size: subtitleStyle.fontSize,
              weight: subtitleStyle.fontWeight,
              lineHeight: subtitleStyle.lineHeight,
              letterSpacing: subtitleStyle.letterSpacing,
            },
            bodyFamily: bodyStyle.fontFamily,
            loadedFamilies: Array.from(document.fonts)
              .filter((face) => face.status === "loaded")
              .map((face) => face.family),
            googleFontResources: performance
              .getEntriesByType("resource")
              .map((entry) => entry.name)
              .filter((url) => /fonts\.googleapis|fonts\.gstatic/i.test(url)),
            localFontResources: performance
              .getEntriesByType("resource")
              .filter((entry) => /\/_next\/static\/media\/.*\.(?:woff2?|ttf)(?:\?|$)/i.test(entry.name))
              .map((entry) => ({
                url: entry.name,
                encodedBodySize: entry.encodedBodySize,
              })),
          };
        });
        const headingPlatformFonts = await getPlatformFonts(page, "h1");
        const subtitlePlatformFonts = await getPlatformFonts(page, '[data-testid="text-hero-subtitle"]');

        assert.match(result.heading.family, /DM.Serif.Display/i);
        assert.doesNotMatch(result.heading.family, /^(?:"?Georgia|"?Times New Roman)/i);
        assert.equal(result.heading.size, expected.size);
        assert.equal(result.heading.weight, "400");
        assert.equal(result.heading.lineHeight, expected.lineHeight);
        assert.equal(result.heading.letterSpacing, expected.letterSpacing);
        assert.equal(result.heading.color, expected.color);
        assert.match(result.subtitle.family, /Inter/i);
        assert.equal(result.subtitle.size, expected.subtitleSize);
        assert.equal(result.subtitle.weight, "400");
        assert.equal(result.subtitle.lineHeight, expected.subtitleLineHeight);
        assert.equal(result.subtitle.letterSpacing, "-0.16px");
        assert.match(result.bodyFamily, /Inter/i);
        assert.ok(result.loadedFamilies.some((family) => /DM.Serif.Display/i.test(family)));
        assert.ok(result.loadedFamilies.some((family) => /Inter/i.test(family)));
        assert.deepEqual(result.googleFontResources, []);
        assert.equal(result.localFontResources.length, 2, "Naples should load only the normal display and body font files");
        const initialFontBytes = result.localFontResources.reduce((total, resource) => total + resource.encodedBodySize, 0);
        assert.ok(initialFontBytes > 0, "Font resource sizes should be available to enforce the runtime budget");
        assert.ok(initialFontBytes <= 100 * 1024, `Initial font payload exceeded 100 KiB: ${initialFontBytes} bytes`);
        assert.ok(headingPlatformFonts.some((font) => font.isCustomFont && /DM.Serif.Display/i.test(`${font.familyName} ${font.postScriptName}`)));
        assert.ok(subtitlePlatformFonts.some((font) => font.isCustomFont && /Inter/i.test(`${font.familyName} ${font.postScriptName}`)));
      } finally {
        await context.close();
      }
    }

    assert.deepEqual(pageErrors, []);
  } finally {
    await browser.close();
  }
});

async function getPlatformFonts(page, selector) {
  const session = await page.context().newCDPSession(page);
  try {
    await Promise.all([session.send("DOM.enable"), session.send("CSS.enable")]);
    const { root: documentNode } = await session.send("DOM.getDocument");
    const { nodeId } = await session.send("DOM.querySelector", {
      nodeId: documentNode.nodeId,
      selector,
    });
    assert.notEqual(nodeId, 0, `${selector} is missing from the DOM`);
    const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
    return fonts;
  } finally {
    await session.detach();
  }
}
