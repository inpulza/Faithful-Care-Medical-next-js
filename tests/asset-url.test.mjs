import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

const helperUrl = new URL("../client/src/lib/asset-url.ts", import.meta.url);

test("assetUrl normalizes Vite strings and Next static image objects", async () => {
  assert.equal(existsSync(helperUrl), true, "asset URL normalizer is missing");
  const { assetUrl } = await import(helperUrl.href);

  assert.equal(assetUrl("/assets/hero.webp"), "/assets/hero.webp");
  assert.equal(assetUrl({ src: "/_next/static/media/hero.abc.webp" }), "/_next/static/media/hero.abc.webp");
  assert.throws(() => assetUrl({}), /Unsupported static asset/);
});
