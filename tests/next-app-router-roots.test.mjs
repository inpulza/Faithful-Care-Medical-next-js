import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const required = [
  "app/(en)/layout.tsx",
  "app/(en)/page.tsx",
  "app/(en)/[...path]/page.tsx",
  "app/(es)/layout.tsx",
  "app/(es)/es/page.tsx",
  "app/(es)/es/[...path]/page.tsx",
  "app/lib/metadata.ts",
  "app/site-shell.tsx",
];

test("App Router has server-rendered English and Spanish roots", () => {
  for (const path of required) {
    assert.equal(existsSync(new URL(path, root)), true, `${path} is missing`);
  }

  const enLayout = readFileSync(new URL("app/(en)/layout.tsx", root), "utf8");
  const esLayout = readFileSync(new URL("app/(es)/layout.tsx", root), "utf8");
  const shell = readFileSync(new URL("app/site-shell.tsx", root), "utf8");

  assert.match(enLayout, /<html lang="en"/);
  assert.match(esLayout, /<html lang="es"/);
  assert.match(shell, /^"use client";/);
  assert.doesNotMatch(shell, /wouter/);
});
