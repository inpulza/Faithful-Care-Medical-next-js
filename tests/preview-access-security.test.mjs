import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";
import { request as playwrightRequest } from "playwright";

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server failed to bind");
  return `http://127.0.0.1:${address.port}`;
}

test("Preview bypass headers never follow a cross-origin redirect", async () => {
  const destinationRequests = [];
  const destination = createServer((request, response) => {
    destinationRequests.push(request.headers);
    response.writeHead(200).end("destination");
  });
  const destinationUrl = await listen(destination);
  const source = createServer((request, response) => {
    if (request.url === "/redirect" || request.url === "/") {
      response.writeHead(302, { Location: `${destinationUrl}/captured` }).end();
      return;
    }
    response.writeHead(200).end("source");
  });
  const sourceUrl = await listen(source);
  const previousBaseUrl = process.env.BASE_URL;
  const previousSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  process.env.BASE_URL = sourceUrl;
  process.env.VERCEL_AUTOMATION_BYPASS_SECRET = "synthetic-preview-bypass";

  const api = await playwrightRequest.newContext();
  try {
    const { previewFetch, unlockPreview } = await import(`./preview-access.mjs?security=${Date.now()}`);
    const response = await previewFetch("/redirect");
    assert.equal(response.status, 302);
    assert.equal(destinationRequests.length, 0);

    const context = {
      request: api,
      setDefaultNavigationTimeout() {},
    };
    await assert.rejects(
      () => unlockPreview(context),
      /Protected Preview header authentication should settle successfully/,
    );
    assert.equal(destinationRequests.length, 0);
  } finally {
    await api.dispose();
    await new Promise((resolve, reject) => source.close((error) => error ? reject(error) : resolve()));
    await new Promise((resolve, reject) => destination.close((error) => error ? reject(error) : resolve()));
    if (previousBaseUrl === undefined) delete process.env.BASE_URL;
    else process.env.BASE_URL = previousBaseUrl;
    if (previousSecret === undefined) delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    else process.env.VERCEL_AUTOMATION_BYPASS_SECRET = previousSecret;
  }
});

test("Preview unlock accepts Vercel's same-origin cookie redirect", async () => {
  const source = createServer((request, response) => {
    response.writeHead(307, {
      Location: "/",
      "Set-Cookie": "_vercel_jwt=synthetic-cookie; Path=/; HttpOnly; SameSite=Lax",
    }).end();
  });
  const sourceUrl = await listen(source);
  const previousBaseUrl = process.env.BASE_URL;
  const previousSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  process.env.BASE_URL = sourceUrl;
  process.env.VERCEL_AUTOMATION_BYPASS_SECRET = "synthetic-preview-bypass";

  const api = await playwrightRequest.newContext();
  try {
    const { unlockPreview } = await import(`./preview-access.mjs?cookie=${Date.now()}`);
    const context = {
      request: api,
      setDefaultNavigationTimeout() {},
    };
    await unlockPreview(context);
    const storageState = await api.storageState();
    assert.ok(storageState.cookies.some((cookie) => cookie.name === "_vercel_jwt"));
  } finally {
    await api.dispose();
    await new Promise((resolve, reject) => source.close((error) => error ? reject(error) : resolve()));
    if (previousBaseUrl === undefined) delete process.env.BASE_URL;
    else process.env.BASE_URL = previousBaseUrl;
    if (previousSecret === undefined) delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    else process.env.VERCEL_AUTOMATION_BYPASS_SECRET = previousSecret;
  }
});

test("Preview OIDC is attached only to requests for the configured Preview origin", async () => {
  const previousBaseUrl = process.env.BASE_URL;
  const previousSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  const previousOidc = process.env.VERCEL_OIDC_TOKEN;
  process.env.BASE_URL = "https://preview.example.test";
  delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  process.env.VERCEL_OIDC_TOKEN = "synthetic-short-lived-oidc";

  let routeHandler;
  const context = {
    setDefaultNavigationTimeout() {},
    async route(pattern, handler) {
      assert.equal(pattern, "**/*");
      routeHandler = handler;
    },
  };

  try {
    const { unlockPreview } = await import(`./preview-access.mjs?oidc=${Date.now()}`);
    await unlockPreview(context);
    assert.equal(typeof routeHandler, "function");

    const calls = [];
    const makeRoute = (url) => ({
      request: () => ({ url: () => url, headers: () => ({ accept: "text/html" }) }),
      fallback: (options) => calls.push({ url, options }),
    });
    await routeHandler(makeRoute("https://preview.example.test/primary-care"));
    await routeHandler(makeRoute("https://www.tiktok.com/@addysrevemd"));

    assert.equal(calls[0].options.headers["x-vercel-trusted-oidc-idp-token"], "synthetic-short-lived-oidc");
    assert.equal(calls[1].options, undefined, "OIDC must never be attached to a third-party request");
  } finally {
    if (previousBaseUrl === undefined) delete process.env.BASE_URL;
    else process.env.BASE_URL = previousBaseUrl;
    if (previousSecret === undefined) delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    else process.env.VERCEL_AUTOMATION_BYPASS_SECRET = previousSecret;
    if (previousOidc === undefined) delete process.env.VERCEL_OIDC_TOKEN;
    else process.env.VERCEL_OIDC_TOKEN = previousOidc;
  }
});
