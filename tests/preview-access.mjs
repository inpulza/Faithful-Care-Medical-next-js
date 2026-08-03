import assert from "node:assert/strict";

export const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";

const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const previewAccessUrl = process.env.PREVIEW_ACCESS_URL;
const baseOrigin = new URL(baseUrl).origin;

export async function previewFetch(path, init = {}) {
  const target = new URL(path, `${baseUrl}/`);
  const headers = new Headers(init.headers);
  if (bypassSecret) {
    assert.equal(target.origin, baseOrigin, "Preview bypass headers must stay on the configured origin");
    headers.set("x-vercel-protection-bypass", bypassSecret);
  }

  return fetch(target, {
    ...init,
    headers,
  });
}

export async function unlockPreview(context) {
  if (bypassSecret) {
    const response = await context.request.get(baseUrl, {
      headers: {
        "x-vercel-protection-bypass": bypassSecret,
        "x-vercel-set-bypass-cookie": "true",
      },
    });
    assert.equal(response.status(), 200, "Protected Preview header authentication should settle successfully");
    return;
  }

  if (!previewAccessUrl) return;

  const accessPage = await context.newPage();
  const response = await accessPage.goto(previewAccessUrl, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "The protected Preview access URL should settle successfully");
  await accessPage.close();
}
