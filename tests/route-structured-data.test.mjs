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
});

test("nested routes publish connected WebPage and valid hierarchical breadcrumbs", () => {
  const route = routeForPath("/primary-care/checkups-prevention");
  const schemas = schemasForRoute(route);
  const webpage = schemas.find((schema) => schema["@type"] === "WebPage");
  const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");

  assert.deepEqual(webpage?.publisher, { "@id": "https://faithfulcaremedical.com/#organization" });
  assert.deepEqual(webpage?.isPartOf, { "@id": "https://faithfulcaremedical.com/#website" });
  assert.deepEqual(
    breadcrumb?.itemListElement.map(({ name, item }) => ({ name, item })),
    [
      { name: "Home", item: "https://faithfulcaremedical.com/" },
      { name: "Primary Care", item: "https://faithfulcaremedical.com/primary-care" },
      { name: "Annual Checkups & Preventive Care", item: route.canonical },
    ],
  );
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
