import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

const contractUrl = new URL("../app/lib/route-contract.ts", import.meta.url);

test("Next route contract preserves the public surface and approved redirects", async () => {
  assert.equal(existsSync(contractUrl), true, "Next route contract is missing");

  const { publicRoutes, redirectRules, routeForPath } = await import(contractUrl.href);

  assert.equal(publicRoutes.length, 37);
  assert.equal(new Set(publicRoutes.map((route) => route.path)).size, 37);
  assert.equal(publicRoutes.filter((route) => route.lang === "en").length, 32);
  assert.equal(publicRoutes.filter((route) => route.lang === "es").length, 5);

  assert.equal(routeForPath("/")?.canonical, "https://faithfulcaremedical.com/");
  assert.equal(routeForPath("/es/")?.path, "/es");
  assert.deepEqual(routeForPath("/insurance-accepted")?.languages, {
    en: "https://faithfulcaremedical.com/insurance-accepted",
    es: "https://faithfulcaremedical.com/es/seguros-y-medicare",
    "x-default": "https://faithfulcaremedical.com/insurance-accepted",
  });
  assert.equal(routeForPath("/medicare")?.languages, undefined);
  assert.equal(routeForPath("/does-not-exist"), undefined);

  assert.deepEqual(redirectRules.find((rule) => rule.source === "/dr-addys-reve"), {
    source: "/dr-addys-reve",
    destination: "/about",
    statusCode: 301,
  });
  assert.deepEqual(redirectRules.find((rule) => rule.source === "/about.html"), {
    source: "/about.html",
    destination: "/about",
    statusCode: 301,
  });
});
