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
    ...(bypassSecret ? { redirect: "manual" } : {}),
  });
}

export async function unlockPreview(context) {
  if (bypassSecret || previewAccessUrl) {
    context.setDefaultNavigationTimeout(60_000);
  }

  if (bypassSecret) {
    const response = await context.request.get(baseUrl, {
      maxRedirects: 0,
      headers: {
        "x-vercel-protection-bypass": bypassSecret,
        "x-vercel-set-bypass-cookie": "true",
      },
    });
    const status = response.status();
    if (status === 307 || status === 308) {
      const location = response.headers().location;
      assert.ok(location, "Protected Preview cookie redirect must include Location");
      const redirectTarget = new URL(location, baseUrl);
      assert.equal(
        redirectTarget.origin,
        baseOrigin,
        "Protected Preview cookie redirect must stay on the configured origin",
      );
      const storageState = await context.request.storageState();
      assert.ok(
        storageState.cookies.some((cookie) => cookie.name === "_vercel_jwt"),
        "Protected Preview cookie redirect must set the Vercel bypass cookie",
      );
      return;
    }
    assert.equal(status, 200, "Protected Preview header authentication should settle successfully");
    return;
  }

  if (!previewAccessUrl) return;

  const accessPage = await context.newPage();
  const response = await accessPage.goto(previewAccessUrl, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, "The protected Preview access URL should settle successfully");
  await accessPage.close();
}
