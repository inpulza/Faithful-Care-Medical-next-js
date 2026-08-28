import assert from "node:assert/strict";
import { test } from "node:test";

const sitemapUrl = new URL("../app/sitemap.ts", import.meta.url);
const routeContractUrl = new URL("../app/lib/route-contract.ts", import.meta.url);

const { default: sitemap } = await import(sitemapUrl.href);
const { publicRoutes } = await import(routeContractUrl.href);

test("sitemap exactly matches the public route contract without duplicate URLs", () => {
  const entries = sitemap();
  const sitemapUrls = entries.map(({ url }) => url);
  const publicUrls = publicRoutes.map(({ canonical }) => canonical);

  assert.deepEqual(sitemapUrls, publicUrls);
  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length);
  assert.equal(entries.length, publicRoutes.length);
});

test("sitemap lastmod values are explicit and deterministic", () => {
  const first = sitemap();
  const second = sitemap();

  assert.deepEqual(first, second);

  for (const [index, entry] of first.entries()) {
    const route = publicRoutes[index];

    if (route.dateModified) {
      assert.equal(entry.lastModified, route.dateModified);
    } else {
      assert.equal("lastModified" in entry, false, `${route.path} must not invent a lastmod value`);
    }

    assert.equal("priority" in entry, false, `${route.path} must not emit ignored priority hints`);
    assert.equal(
      "changeFrequency" in entry,
      false,
      `${route.path} must not emit ignored change frequency hints`,
    );
  }
});
