import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

test("Next is the production build authority", () => {
  const pkg = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));

  assert.equal(pkg.scripts.dev, "next dev");
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.start, "next start");
  assert.match(pkg.dependencies.next, /^\^16\./);
  assert.equal(existsSync(new URL("next.config.ts", root)), true);
});
