import assert from "node:assert/strict";
import { test } from "node:test";

const { CONDITION_ROUTE_DATA, CONDITION_ROUTE_PATHS } = await import(
  new URL("../shared/condition-routes.ts", import.meta.url).href
);
const { publicRoutes, routeForPath } = await import(
  new URL("../app/lib/route-contract.ts", import.meta.url).href
);
const { schemasForRoute } = await import(
  new URL("../app/lib/structured-data.tsx", import.meta.url).href
);
const { GET: getLlmsText } = await import(
  new URL("../app/llms.txt/route.ts", import.meta.url).href
);

test("condition cluster exposes sixteen unique, descriptive canonical routes", () => {
  assert.equal(CONDITION_ROUTE_PATHS.length, 16);
  assert.equal(new Set(CONDITION_ROUTE_PATHS).size, 16);

  const publicPaths = new Set(publicRoutes.map((route) => route.path));
  for (const path of CONDITION_ROUTE_PATHS) {
    const definition = CONDITION_ROUTE_DATA[path];
    assert.ok(publicPaths.has(path), `${path} missing from public route contract`);
    assert.match(path, /^\/(primary-care|palliative-care)\/[a-z0-9-]+$/);
    assert.ok(definition.title.length >= 30, `${path} title is not descriptive`);
    assert.ok(definition.description.length >= 100, `${path} description is too thin`);
    assert.ok(definition.description.length <= 175, `${path} description is too long`);
  }
});

test("each condition route publishes a connected Service and three-level breadcrumb", () => {
  for (const path of CONDITION_ROUTE_PATHS) {
    const route = routeForPath(path);
    assert.ok(route, `${path} did not resolve`);

    const schemas = schemasForRoute(route);
    const webpage = schemas.find((schema) => schema["@type"] === "WebPage");
    const service = schemas.find((schema) => schema["@type"] === "Service");
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");

    assert.ok(service, `${path} missing Service schema`);
    assert.equal(service["@id"], `${route.canonical}#service`);
    assert.deepEqual(webpage?.mainEntity, { "@id": service["@id"] });
    assert.equal(service.provider?.["@id"], "https://faithfulcaremedical.com/#clinic");
    assert.equal(service.category, CONDITION_ROUTE_DATA[path].category);
    assert.equal(breadcrumb?.itemListElement.length, 3, `${path} breadcrumb depth`);
    assert.equal(breadcrumb.itemListElement.at(-1).item, route.canonical);
  }
});

test("condition paths stay grouped under real care hubs instead of city doorway variants", () => {
  const primary = CONDITION_ROUTE_PATHS.filter((path) => CONDITION_ROUTE_DATA[path].group === "primary");
  const palliative = CONDITION_ROUTE_PATHS.filter((path) => CONDITION_ROUTE_DATA[path].group === "palliative");

  assert.equal(primary.length, 8);
  assert.equal(palliative.length, 8);
  assert.ok(primary.every((path) => path.startsWith("/primary-care/")));
  assert.ok(palliative.every((path) => path.startsWith("/palliative-care/")));
  assert.ok(CONDITION_ROUTE_PATHS.every((path) => !/naples|marco|bonita|estero|fort-myers|cape-coral/.test(path)));
});

test("llms.txt exposes every condition guide under its real care family", async () => {
  const response = getLlmsText();
  const body = await response.text();

  assert.match(body, /Primary Care Condition Guides/);
  assert.match(body, /Palliative Support by Illness or Symptom/);
  for (const path of CONDITION_ROUTE_PATHS) {
    assert.ok(body.includes(`https://faithfulcaremedical.com${path}`), `llms.txt missing ${path}`);
  }
});
