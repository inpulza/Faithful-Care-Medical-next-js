import assert from "node:assert/strict";
import { test } from "node:test";

const routeContractUrl = new URL("../app/lib/route-contract.ts", import.meta.url);
const sitemapUrl = new URL("../app/sitemap.ts", import.meta.url);
const structuredDataUrl = new URL("../app/lib/structured-data.tsx", import.meta.url);

const { publicRoutes, redirectRules, routeForPath } = await import(routeContractUrl.href);
const { default: sitemap } = await import(sitemapUrl.href);
const { schemasForRoute } = await import(structuredDataUrl.href);

const path = "/direct-primary-care";
const canonical = "https://faithfulcaremedical.com/direct-primary-care";

test("Direct Primary Care has one canonical public route and deterministic discovery entry", () => {
  const route = routeForPath(path);
  assert.ok(route, `${path} is missing from the public route contract`);
  assert.equal(route.canonical, canonical);
  assert.equal(route.lang, "en");
  assert.equal(route.languages, undefined);
  assert.equal(publicRoutes.filter((candidate) => candidate.path === path).length, 1);
  assert.equal(publicRoutes.some((candidate) => candidate.path === "/dpc"), false);

  const entries = sitemap().filter((entry) => entry.url === canonical);
  assert.equal(entries.length, 1, "sitemap must expose one Direct Primary Care canonical");

  for (const expected of [
    { source: "/direct-primary-care/", destination: path, statusCode: 301 },
    { source: "/direct-primary-care.html", destination: path, statusCode: 301 },
  ]) {
    assert.deepEqual(
      redirectRules.find((rule) => rule.source === expected.source),
      expected,
      `${expected.source} must permanently redirect to the DPC canonical`,
    );
  }
});

test("Direct Primary Care schema is a clinic-connected Service and WebPage main entity", () => {
  const route = routeForPath(path);
  assert.ok(route, `${path} is missing from the public route contract`);

  const schemas = schemasForRoute(route);
  const webpage = schemas.find((schema) => schema["@type"] === "WebPage");
  const service = schemas.find((schema) => schema["@type"] === "Service");
  const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");

  assert.ok(webpage, "DPC WebPage schema is missing");
  assert.ok(service, "DPC Service schema is missing");
  assert.equal(service["@id"], `${canonical}#service`);
  assert.deepEqual(service.provider, { "@id": "https://faithfulcaremedical.com/#clinic" });
  assert.match(`${service.name} ${service.serviceType} ${service.category}`, /direct primary care/i);
  assert.equal(service.availableChannel?.serviceUrl, "https://faithfulcaremedical.com/contact");
  assert.deepEqual(webpage.mainEntity, { "@id": service["@id"] });

  assert.ok(breadcrumb, "DPC breadcrumb is missing");
  assert.deepEqual(
    breadcrumb.itemListElement.map(({ name, item }) => ({ name, item })),
    [
      { name: "Home", item: "https://faithfulcaremedical.com/" },
      { name: "Direct Primary Care", item: canonical },
    ],
  );
});
