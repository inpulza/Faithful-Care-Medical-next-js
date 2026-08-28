import assert from "node:assert/strict";
import { test } from "node:test";
import { baseUrl, previewFetch } from "./preview-access.mjs";

const { publicRoutes, redirectRules } = await import(new URL("../app/lib/route-contract.ts", import.meta.url).href);
const datedLegalRoutes = new Map([
  ["/privacy-policy", "2026-08-03"],
  ["/notice-of-privacy-practices", "2026-01-01"],
  ["/terms-of-use", "2026-01-01"],
  ["/accessibility-statement", "2026-01-01"],
]);

function attr(html, selectorName) {
  const pattern = new RegExp(`<[^>]+${selectorName}=["']([^"']+)["'][^>]*>`, "i");
  return html.match(pattern)?.[1];
}

function jsonLdSchemas(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]));
}

function graphTypes(schemas) {
  const types = new Set();
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (value["@type"]) {
      for (const type of Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]]) {
        types.add(type);
      }
    }
    for (const child of Array.isArray(value) ? value : Object.values(value)) visit(child);
  };
  for (const schema of schemas.filter((schema) => Array.isArray(schema["@graph"]))) visit(schema);
  return types;
}

test("all canonical routes return indexable localized HTML", async () => {
  const results = await Promise.all(publicRoutes.map(async (route) => {
    const response = await previewFetch(route.path, { redirect: "manual" });
    return { route, response, html: await response.text() };
  }));

  for (const { route, response, html } of results) {
    assert.equal(response.status, 200, `${route.path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") || "", /text\/html/);
    assert.match(html, new RegExp(`<html[^>]+lang=["']${route.lang}["']`, "i"), `${route.path} lang`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${route.path} title`);
    assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i, `${route.path} description`);
    const canonicalHref = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
    assert.ok(canonicalHref, `${route.path} canonical missing`);
    assert.equal(new URL(canonicalHref).href, new URL(route.canonical).href, `${route.path} canonical`);
    assert.doesNotMatch(html, /\[object Object\]/, `${route.path} serialized object`);
    assert.doesNotMatch(html, /noindex/i, `${route.path} unexpectedly noindex`);

    const schemas = jsonLdSchemas(html);
    const webpage = schemas.find((schema) => schema["@type"] === "WebPage");
    assert.equal(
      schemas.filter((schema) => schema["@type"] === "WebPage").length,
      1,
      `${route.path} must publish one WebPage schema`,
    );
    if (datedLegalRoutes.has(route.path)) {
      assert.equal(webpage.dateModified, datedLegalRoutes.get(route.path), `${route.path} dateModified`);
    } else {
      assert.equal("dateModified" in webpage, false, `${route.path} gained an undeclared dateModified`);
    }
    if (!datedLegalRoutes.has(route.path) && route.path !== "/medical-disclaimer") {
      const graph = schemas.find((schema) => Array.isArray(schema["@graph"]));
      const ids = new Set(graph?.["@graph"].map((entity) => entity["@id"]));
      for (const id of ["#organization", "#clinic", "#website", "#physician"]) {
        assert.ok(ids.has(`https://faithfulcaremedical.com/${id}`), `${route.path} missing ${id}`);
      }
      const types = graphTypes(schemas);
      for (const type of ["MedicalClinic", "IndividualPhysician", "PostalAddress", "GeoCoordinates", "OpeningHoursSpecification"])
        assert.ok(types.has(type), `${route.path} missing ${type}`);
    }
    if (["/primary-care", "/palliative-care"].includes(route.path)) {
      const faqPages = schemas.filter((schema) => schema["@type"] === "FAQPage");
      assert.equal(faqPages.length, 1, `${route.path} must publish its visible FAQ`);
      assert.ok(faqPages[0].mainEntity.length >= 3, `${route.path} FAQ is incomplete`);
    }
    if (route.path !== "/" && route.path !== "/es") {
      const breadcrumbs = schemas.filter((schema) => schema["@type"] === "BreadcrumbList");
      assert.equal(breadcrumbs.length, 1, `${route.path} must publish one breadcrumb`);
      assert.ok(breadcrumbs[0].itemListElement.length >= 2, `${route.path} valid breadcrumb`);
    }
  }
});

test("all approved aliases return permanent redirects to their canonicals", async () => {
  const results = await Promise.all(redirectRules.map(async (rule) => {
    const response = await previewFetch(rule.source, { redirect: "manual" });
    return { rule, response };
  }));

  for (const { rule, response } of results) {
    assert.equal(response.status, 301, `${rule.source} returned ${response.status}`);
    const location = response.headers.get("location");
    assert.ok(location, `${rule.source} omitted Location`);
    const target = new URL(location, baseUrl);
    assert.equal(`${target.pathname}${target.hash}`, rule.destination, `${rule.source} destination`);
  }
});

test("production HTML preserves security and crawler-facing headers", async () => {
  const response = await previewFetch("/");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.doesNotMatch(response.headers.get("content-security-policy") || "", /unsafe-inline/);
  assert.notEqual(response.headers.get("cross-origin-resource-policy"), "cross-origin");
  assert.match(response.headers.get("permissions-policy") || "", /geolocation=\(\)/);
});

test("discovery files expose every canonical route", async () => {
  const [sitemapResponse, robotsResponse, llmsResponse] = await Promise.all([
    previewFetch("/sitemap.xml"),
    previewFetch("/robots.txt"),
    previewFetch("/llms.txt"),
  ]);
  const [sitemap, robots, llms] = await Promise.all([
    sitemapResponse.text(),
    robotsResponse.text(),
    llmsResponse.text(),
  ]);

  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") || "", /xml/);
  for (const route of publicRoutes) assert.ok(sitemap.includes(route.canonical), `sitemap missing ${route.path}`);

  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-agent: \*/i);
  assert.match(robots, /Sitemap: https:\/\/faithfulcaremedical\.com\/sitemap\.xml/);

  assert.equal(llmsResponse.status, 200);
  assert.match(llms, /Faithful Care Medical Services/);
  assert.match(llms, /\(239\) 423-0205/);
});
