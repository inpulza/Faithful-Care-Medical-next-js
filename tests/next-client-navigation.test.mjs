import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { readdirSync, statSync } from "node:fs";

const root = new URL("../", import.meta.url);
const clientRoot = new URL("client/src/", root);

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    return entry.isDirectory() ? sourceFiles(url) : /\.(ts|tsx)$/.test(entry.name) ? [url] : [];
  });
}

test("client navigation uses Next instead of Wouter", () => {
  const adapter = new URL("client/src/lib/router.tsx", root);
  assert.equal(existsSync(adapter), true, "Next navigation adapter is missing");

  const offenders = sourceFiles(clientRoot)
    .filter((file) => readFileSync(file, "utf8").includes("wouter"))
    .map((file) => file.pathname);
  assert.deepEqual(offenders, []);

  const adapterSource = readFileSync(adapter, "utf8");
  assert.match(adapterSource, /from "next\/link"/);
  assert.match(adapterSource, /from "next\/navigation"/);

  const app = readFileSync(new URL("client/src/App.tsx", root), "utf8");
  assert.doesNotMatch(app, /<Switch\b|<Route\b|<Redirect\b/);
  assert.match(app, /routeComponents/);
  assert.doesNotMatch(app, /DesignSystem/);
});
