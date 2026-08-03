import assert from "node:assert/strict";

export const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";

const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const explicitAccessUrl = process.env.PREVIEW_ACCESS_URL;

const previewAccessUrl = explicitAccessUrl || (bypassSecret
  ? `${baseUrl}/?x-vercel-protection-bypass=${encodeURIComponent(bypassSecret)}&x-vercel-set-bypass-cookie=true`
  : undefined);

export async function previewFetch(path, init = {}) {
  const headers = new Headers(init.headers);
  if (bypassSecret) headers.set("x-vercel-protection-bypass", bypassSecret);

  return fetch(new URL(path, `${baseUrl}/`), {
    ...init,
    headers,
  });
}

export async function unlockPreview(context) {
  if (!previewAccessUrl) return;

  const accessPage = await context.newPage();
  const response = await accessPage.goto(previewAccessUrl, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "The protected Preview access URL should settle successfully");
  await accessPage.close();
}
