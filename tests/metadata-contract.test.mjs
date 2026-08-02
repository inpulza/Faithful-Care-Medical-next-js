import assert from "node:assert/strict";
import { test } from "node:test";

const metadataUrl = new URL("../app/lib/metadata.ts", import.meta.url);
const routeContractUrl = new URL("../app/lib/route-contract.ts", import.meta.url);
const { metadataForRoute, siteMetadata, siteViewport } = await import(metadataUrl.href);
const { routeForPath } = await import(routeContractUrl.href);

test("route metadata includes robust social image attribution", () => {
  const metadata = metadataForRoute(routeForPath("/about"));
  const ogImage = metadata.openGraph.images[0];
  const twitterImage = metadata.twitter.images[0];

  assert.deepEqual(ogImage, {
    url: "https://faithfulcaremedical.com/og-image.png",
    secureUrl: "https://faithfulcaremedical.com/og-image.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Faithful Care Medical Services in Naples, Florida",
  });
  assert.deepEqual(twitterImage, {
    url: "https://faithfulcaremedical.com/og-image.png",
    alt: "Faithful Care Medical Services in Naples, Florida",
  });
  assert.equal(metadata.twitter.site, undefined, "metadata must not invent an unverified social account");
});

test("root metadata links existing brand icons and manifest", () => {
  assert.equal(siteMetadata.manifest, "/site.webmanifest");
  assert.deepEqual(siteMetadata.icons, {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  });
  assert.equal(siteViewport.themeColor, "#ffffff");
});
