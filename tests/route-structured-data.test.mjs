import assert from "node:assert/strict";
import { test } from "node:test";

const routeContractUrl = new URL("../app/lib/route-contract.ts", import.meta.url);
const structuredDataUrl = new URL("../app/lib/structured-data.tsx", import.meta.url);
const clientJsonLdUrl = new URL("../client/src/components/json-ld.tsx", import.meta.url);
const { routeForPath } = await import(routeContractUrl.href);
const { schemasForRoute, serializeJsonLd } = await import(structuredDataUrl.href);
const { serializeJsonLd: serializeClientJsonLd } = await import(clientJsonLdUrl.href);

test("JSON-LD serialization cannot close its script element", () => {
  const serialized = serializeJsonLd({ value: "</script><script>alert(1)</script>" });
  assert.equal(serialized.toLowerCase().includes("</script"), false);
  assert.match(serialized, /\\u003c\/script>/);
  const clientSerialized = serializeClientJsonLd({ value: "</script><script>alert(1)</script>" });
  assert.equal(clientSerialized.toLowerCase().includes("</script"), false);
});

test("home publishes one connected identity graph plus a WebPage", () => {
  const schemas = schemasForRoute(routeForPath("/"));
  const graph = schemas.find((schema) => "@graph" in schema);
  assert.ok(graph, "home identity graph is missing");

  const ids = new Set(graph["@graph"].map((entity) => entity["@id"]));
  assert.deepEqual(ids, new Set([
    "https://faithfulcaremedical.com/#organization",
    "https://faithfulcaremedical.com/#clinic",
    "https://faithfulcaremedical.com/#website",
    "https://faithfulcaremedical.com/#physician",
  ]));
  assert.ok(schemas.some((schema) => schema["@type"] === "WebPage"));
  assert.equal(schemas.some((schema) => schema["@type"] === "BreadcrumbList"), false);
  const organization = graph["@graph"].find((entity) => entity["@id"] === "https://faithfulcaremedical.com/#organization");
  assert.ok(organization.sameAs.includes("https://www.instagram.com/addysreve/"));
  assert.ok(organization.sameAs.includes("https://www.tiktok.com/@addysrevemd"));
  assert.equal(organization.sameAs.some((url) => /youtube/i.test(url)), false);
});

test("nested routes publish connected WebPage and valid hierarchical breadcrumbs", () => {
  const route = routeForPath("/primary-care/checkups-prevention");
  const schemas = schemasForRoute(route);
  const webpage = schemas.find((schema) => schema["@type"] === "WebPage");
  const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");

  assert.deepEqual(webpage?.publisher, { "@id": "https://faithfulcaremedical.com/#organization" });
  assert.deepEqual(webpage?.isPartOf, { "@id": "https://faithfulcaremedical.com/#website" });
  assert.deepEqual(webpage?.mainEntity, {
    "@id": "https://faithfulcaremedical.com/primary-care/checkups-prevention#service",
  });
  assert.deepEqual(
    breadcrumb?.itemListElement.map(({ name, item }) => ({ name, item })),
    [
      { name: "Home", item: "https://faithfulcaremedical.com/" },
      { name: "Primary Care", item: "https://faithfulcaremedical.com/primary-care" },
      { name: "Annual Checkups & Preventive Care", item: route.canonical },
    ],
  );
});

test("every commercial page restores the canonical medical identity graph", async () => {
  const { publicRoutes } = await import(routeContractUrl.href);
  const legalPaths = new Set([
    "/privacy-policy",
    "/notice-of-privacy-practices",
    "/terms-of-use",
    "/medical-disclaimer",
    "/accessibility-statement",
  ]);
  const medicalRoutes = publicRoutes.filter(({ path }) => !legalPaths.has(path));

  for (const route of medicalRoutes) {
    const schemas = schemasForRoute(route);
    const graph = schemas.find((schema) => Array.isArray(schema["@graph"]));
    assert.ok(graph, `${route.path} missing medical identity graph`);
    const types = new Set(graph["@graph"].map((entity) => entity["@type"]));
    for (const type of ["Organization", "MedicalClinic", "WebSite", "IndividualPhysician"]) {
      assert.ok(types.has(type), `${route.path} missing ${type}`);
    }
  }
});

test("existing location and insurance services are connected as each page main entity", () => {
  for (const path of ["/insurance-accepted", "/locations/naples", "/locations/marco-island"]) {
    const route = routeForPath(path);
    const webpage = schemasForRoute(route).find((schema) => schema["@type"] === "WebPage");
    assert.match(webpage.mainEntity["@id"], /(#insurance-verification|#service-area-)/);
  }
});

test("service hubs and Spanish service pages publish addressable services connected to WebPage", () => {
  for (const path of [
    "/primary-care",
    "/palliative-care",
    "/es/medico-de-familia-naples",
    "/es/cuidados-paliativos-naples",
    "/es/seguros-y-medicare",
  ]) {
    const route = routeForPath(path);
    const schemas = schemasForRoute(route);
    const webpage = schemas.find((schema) => schema["@type"] === "WebPage");
    const service = schemas.find((schema) => schema["@type"] === "Service");
    assert.equal(service?.["@id"], `${route.canonical}#service`, `${path} service id`);
    assert.deepEqual(webpage?.mainEntity, { "@id": service["@id"] }, `${path} mainEntity`);
    assert.equal("inLanguage" in service, false);
    assert.equal(
      service.availableChannel.serviceUrl,
      route.lang === "es"
        ? "https://faithfulcaremedical.com/es/contacto"
        : "https://faithfulcaremedical.com/contact",
    );
  }
});

test("Spanish service schema preserves readable accents without mojibake", () => {
  const familyDoctor = schemasForRoute(routeForPath("/es/medico-de-familia-naples"))
    .find((schema) => schema["@type"] === "Service");
  const insurance = schemasForRoute(routeForPath("/es/seguros-y-medicare"))
    .find((schema) => schema["@type"] === "Service");

  assert.equal(familyDoctor.serviceType, "Atenci\u00f3n primaria");
  assert.equal(insurance.name, "Verificaci\u00f3n de cobertura de seguros y Medicare");
  assert.equal(insurance.category, "Seguro m\u00e9dico");
  assert.doesNotMatch(JSON.stringify([familyDoctor, insurance]), /Ã|Â/);
});

test("every non-home route gets a breadcrumb with at least two real URLs", async () => {
  const { publicRoutes } = await import(routeContractUrl.href);
  for (const route of publicRoutes.filter(({ path }) => !["/", "/es"].includes(path))) {
    const breadcrumb = schemasForRoute(route).find((schema) => schema["@type"] === "BreadcrumbList");
    assert.ok(breadcrumb, `${route.path} missing breadcrumb`);
    assert.ok(breadcrumb.itemListElement.length >= 2, `${route.path} breadcrumb is too short`);
    for (const item of breadcrumb.itemListElement) {
      assert.ok(item.item.startsWith("https://faithfulcaremedical.com/"));
    }
  }
});

test("legal WebPage schemas preserve only their declared modification dates", async () => {
  const { publicRoutes } = await import(routeContractUrl.href);
  const datedLegalRoutes = new Map([
    ["/privacy-policy", "2026-08-29"],
    ["/notice-of-privacy-practices", "2026-01-01"],
    ["/terms-of-use", "2026-01-01"],
    ["/accessibility-statement", "2026-01-01"],
  ]);

  for (const route of publicRoutes) {
    const webpage = schemasForRoute(route).find((schema) => schema["@type"] === "WebPage");
    assert.ok(webpage, `${route.path} missing WebPage`);
    if (datedLegalRoutes.has(route.path)) {
      assert.equal(webpage.dateModified, datedLegalRoutes.get(route.path), `${route.path} dateModified`);
    } else {
      assert.equal("dateModified" in webpage, false, `${route.path} gained an undeclared dateModified`);
    }
  }
});
