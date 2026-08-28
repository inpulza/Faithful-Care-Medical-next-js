import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

const contractUrl = new URL("../app/lib/route-contract.ts", import.meta.url);

test("Next route contract preserves the public surface and approved redirects", async () => {
  assert.equal(existsSync(contractUrl), true, "Next route contract is missing");

  const { publicRoutes, redirectRules, routeForPath } = await import(contractUrl.href);

  assert.equal(publicRoutes.length, 39);
  assert.equal(new Set(publicRoutes.map((route) => route.path)).size, 39);
  assert.equal(publicRoutes.filter((route) => route.lang === "en").length, 33);
  assert.equal(publicRoutes.filter((route) => route.lang === "es").length, 6);

  assert.equal(routeForPath("/")?.canonical, "https://faithfulcaremedical.com/");
  assert.equal(routeForPath("/es/")?.path, "/es");
  assert.deepEqual(routeForPath("/insurance-accepted")?.languages, {
    en: "https://faithfulcaremedical.com/insurance-accepted",
    es: "https://faithfulcaremedical.com/es/seguros-y-medicare",
    "x-default": "https://faithfulcaremedical.com/insurance-accepted",
  });
  assert.equal(routeForPath("/medicare")?.languages, undefined);
  assert.deepEqual(routeForPath("/es/pacientes-nuevos")?.languages, {
    en: "https://faithfulcaremedical.com/new-patients",
    es: "https://faithfulcaremedical.com/es/pacientes-nuevos",
    "x-default": "https://faithfulcaremedical.com/new-patients",
  });
  const directPrimaryCareRoute = routeForPath("/direct-primary-care");
  assert.ok(directPrimaryCareRoute);
  assert.equal(directPrimaryCareRoute.title, "Direct Primary Care in Naples, FL");
  assert.match(directPrimaryCareRoute.description, /membership/i);
  assert.equal(
    directPrimaryCareRoute.canonical,
    "https://faithfulcaremedical.com/direct-primary-care",
  );
  assert.equal(directPrimaryCareRoute.lang, "en");
  assert.equal(directPrimaryCareRoute.languages, undefined);
  assert.equal(routeForPath("/dpc"), undefined);
  assert.equal(routeForPath("/does-not-exist"), undefined);

  const { HREFLANG_PAIRS } = await import(new URL("../shared/seo-data.ts", import.meta.url).href);
  assert.equal(HREFLANG_PAIRS.length, 6);
  for (const pair of HREFLANG_PAIRS) {
    assert.equal(routeForPath(pair.en)?.languages?.es, `https://faithfulcaremedical.com${pair.es}`);
    assert.equal(routeForPath(pair.es)?.languages?.en, `https://faithfulcaremedical.com${pair.en}`);
  }

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

  const trailingSlashRules = redirectRules.filter((rule) =>
    rule.source.endsWith("/") && rule.source !== "/",
  );
  assert.equal(trailingSlashRules.length, 38);
  for (const route of publicRoutes.filter(({ path }) => path !== "/")) {
    assert.deepEqual(
      trailingSlashRules.find((rule) => rule.source === `${route.path}/`),
      { source: `${route.path}/`, destination: route.path, statusCode: 301 },
      `${route.path}/ must permanently redirect to its canonical URL`,
    );
  }
});
