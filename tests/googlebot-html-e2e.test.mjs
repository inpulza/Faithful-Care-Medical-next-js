import assert from "node:assert/strict";
import { test } from "node:test";
import { baseUrl, previewFetch } from "./preview-access.mjs";

const { publicRoutes } = await import(
  new URL("../app/lib/route-contract.ts", import.meta.url).href
);

const googlebotUserAgent =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const isProtectedVercelPreview = new URL(baseUrl).hostname.endsWith(".vercel.app");

const expectedH1ByPath = new Map([
  ["/", "Primary Care & Palliative Care in Naples, Florida."],
  ["/contact", "We're Here When You Need Us"],
  ["/insurance-accepted", "A Naples doctor that takes your insurance."],
  ["/about", "Meet Dr. Addys Reve, MD"],
  ["/reviews", "Patient Reviews"],
  ["/new-patients", "Accepting New Patients in Naples, FL"],
  ["/medicare", "Medicare & Medicare Advantage Primary Care in Naples"],
  ["/direct-primary-care", "Direct Primary Care Membership in Naples, FL"],
  ["/primary-care", "Primary Care Doctor in Naples, FL"],
  ["/palliative-care", "Palliative Care in Naples, FL"],
  ["/primary-care/checkups-prevention", "Annual Checkups & Preventive Care"],
  ["/primary-care/chronic-disease", "Chronic Disease Management"],
  ["/primary-care/same-day-visits", "Same-Day & Urgent Visits"],
  ["/primary-care/womens-health", "Women's Health Services"],
  ["/primary-care/senior-care", "Specialized Care for Seniors"],
  ["/primary-care/procedures-diagnostics", "In-Office Procedures & Diagnostics"],
  ["/palliative-care/about-palliative-care", "What Is Palliative Care?"],
  ["/palliative-care/symptom-relief", "Relief From Pain & Difficult Symptoms"],
  ["/palliative-care/patient-family-support", "Support for Patients & Families"],
  ["/palliative-care/planning-transitions", "Advance Planning & Care Transitions"],
  ["/locations/naples", "Primary Care & Palliative Care in Naples"],
  ["/locations/marco-island", "Primary Care Doctor Near Marco Island, FL"],
  ["/locations/golden-gate", "Healthcare for Golden Gate & Golden Gate Estates"],
  ["/locations/immokalee", "Medical Care for Immokalee Families"],
  ["/locations/bonita-springs", "Primary Care & Palliative Care in Bonita Springs"],
  ["/locations/estero", "Doctor's Office Near Estero, FL"],
  ["/locations/fort-myers", "Primary Care Doctor Near Fort Myers, FL"],
  ["/locations/cape-coral", "Doctor Accepting Patients from Cape Coral, FL"],
  ["/privacy-policy", "Privacy Policy"],
  ["/notice-of-privacy-practices", "Notice of Privacy Practices"],
  ["/terms-of-use", "Terms of Use"],
  ["/medical-disclaimer", "Medical Disclaimer"],
  ["/accessibility-statement", "Accessibility Statement"],
  ["/es", "Atención Primaria y Cuidados Paliativos en Naples, Florida."],
  ["/es/medico-de-familia-naples", "Médico de Familia en Naples que Habla Español"],
  ["/es/cuidados-paliativos-naples", "Cuidados Paliativos en Naples"],
  ["/es/seguros-y-medicare", "Seguros que Aceptamos y Medicare"],
  ["/es/contacto", "Contacto y Cómo Llegar"],
]);

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];
}

function elements(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(
    (match) => match[0],
  );
}

function textContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalLinks(html) {
  return elements(html, "link")
    .filter((tag) => (attribute(tag, "rel") || "").toLowerCase().split(/\s+/).includes("canonical"))
    .map((tag) => attribute(tag, "href"));
}

function normalizedCanonical(value) {
  const url = new URL(value);
  return `${url.origin}${url.pathname === "/" ? "" : url.pathname}${url.search}${url.hash}`;
}

function robotsDirectives(html) {
  return elements(html, "meta")
    .filter((tag) => (attribute(tag, "name") || "").toLowerCase() === "robots")
    .map((tag) => attribute(tag, "content") || "");
}

function jsonLdSchemas(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => JSON.parse(match[1]));
}

function mainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  return textContent(main);
}

function h1Texts(html) {
  return [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => textContent(match[1]))
    .filter(Boolean);
}

test("Googlebot receives useful, indexable server HTML for every canonical route", async () => {
  const results = await Promise.all(
    publicRoutes.map(async (route) => {
      const response = await previewFetch(route.path, {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "User-Agent": googlebotUserAgent,
        },
        redirect: "manual",
      });

      return { route, response, html: await response.text() };
    }),
  );

  for (const { route, response, html } of results) {
    assert.equal(response.status, 200, `${route.path} returned ${response.status} to Googlebot`);
    assert.match(
      response.headers.get("content-type") || "",
      /text\/html/i,
      `${route.path} did not return HTML`,
    );
    if (!isProtectedVercelPreview) {
      assert.doesNotMatch(
        response.headers.get("x-robots-tag") || "",
        /(?:^|,)\s*noindex\b/i,
        `${route.path} sent an X-Robots-Tag noindex`,
      );
    }
    assert.match(
      html,
      new RegExp(`<html\\b[^>]*\\blang=["']${route.lang}["']`, "i"),
      `${route.path} has the wrong document language`,
    );

    const canonicals = canonicalLinks(html);
    assert.deepEqual(
      canonicals.map(normalizedCanonical),
      [normalizedCanonical(route.canonical)],
      `${route.path} canonical mismatch`,
    );
    assert.ok(
      robotsDirectives(html).every((content) => !/(?:^|,)\s*noindex\b/i.test(content)),
      `${route.path} unexpectedly contains a robots noindex`,
    );

    const headings = h1Texts(html);
    assert.equal(headings.length, 1, `${route.path} must serve exactly one non-empty H1`);
    assert.equal(
      headings[0],
      expectedH1ByPath.get(route.path),
      `${route.path} served the wrong route-specific H1`,
    );
    assert.doesNotMatch(headings[0], /page not found|not found|404/i, `${route.path} served a 404 H1`);

    const visibleMainText = mainText(html);
    assert.ok(
      visibleMainText.length >= 200,
      `${route.path} server-rendered main content is too thin (${visibleMainText.length} characters)`,
    );
    assert.doesNotMatch(
      visibleMainText,
      /page not found|content for this page is not yet available/i,
      `${route.path} rendered fallback content`,
    );

    let schemas;
    assert.doesNotThrow(
      () => {
        schemas = jsonLdSchemas(html);
      },
      `${route.path} contains invalid JSON-LD`,
    );
    assert.ok(schemas.length > 0, `${route.path} is missing server-rendered JSON-LD`);
    assert.ok(
      schemas.some((schema) => schema?.["@type"] === "WebPage"),
      `${route.path} is missing its WebPage JSON-LD`,
    );
  }
});

test("Googlebot HTML keeps the core acquisition pages route-specific", async () => {
  const expectations = new Map([
    ["/", /primary care.*palliative care/i],
    ["/locations/naples", /naples/i],
    ["/palliative-care", /palliative care/i],
  ]);

  for (const [path, expectedText] of expectations) {
    const response = await previewFetch(path, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": googlebotUserAgent,
      },
    });
    const html = await response.text();
    assert.equal(response.status, 200, `${path} returned ${response.status} to Googlebot`);
    assert.match(h1Texts(html)[0] || "", expectedText, `${path} served the wrong H1`);
    assert.match(mainText(html), expectedText, `${path} omitted its core topic from server HTML`);
  }
});

test("Googlebot receives cautious Direct Primary Care membership content", async () => {
  const path = "/direct-primary-care";
  const response = await previewFetch(path, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": googlebotUserAgent,
    },
    redirect: "manual",
  });
  const html = await response.text();
  const content = mainText(html);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /text\/html/i);
  assert.deepEqual(
    canonicalLinks(html).map(normalizedCanonical),
    ["https://faithfulcaremedical.com/direct-primary-care"],
  );
  assert.deepEqual(h1Texts(html), ["Direct Primary Care Membership in Naples, FL"]);
  assert.match(content, /(?:DPC|Direct Primary Care) is not (?:a )?health insurance/i);
  assert.match(content, /does not replace coverage for (?:hospital care|hospitalization)/i);
  assert.match(content, /written (?:membership )?agreement/i);

  const unsupportedAbsoluteClaims = [
    /unlimited visits/i,
    /no copays,? no limits/i,
    /sick today,? seen today/i,
    /same-day access is built into every/i,
    /same-day appointments? (?:are|is) guaranteed/i,
    /30 to 60 minutes,? every time/i,
    /one fee,? everything included/i,
    /covers all your primary care needs/i,
    /wholesale medications/i,
    /prescriptions at cost/i,
    /HSA-eligible starting 2026/i,
  ];
  for (const claim of unsupportedAbsoluteClaims) {
    assert.doesNotMatch(content, claim, `DPC page retained unsupported absolute claim ${claim}`);
  }
});
