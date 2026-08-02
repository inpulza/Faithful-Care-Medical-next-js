import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const clientRoot = new URL("../client/src/", import.meta.url);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) files.push(...await sourceFiles(target));
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(target);
  }
  return files;
}

test("indexable client source contains no internal completion markers", async () => {
  for (const file of await sourceFiles(clientRoot)) {
    const source = await readFile(file, "utf8");
    assert.doesNotMatch(source, /\[COMPLETAR:/, path.basename(file.pathname));
  }
});
