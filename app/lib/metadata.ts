import type { Metadata, Viewport } from "next";
import { BRAND, DEFAULT_OG_IMAGE, DOMAIN } from "../../shared/seo-data";
import type { PublicRoute } from "./route-contract";

const SOCIAL_IMAGE_ALT = "Faithful Care Medical Services in Naples, Florida";

export const siteMetadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  applicationName: BRAND,
  authors: [{ name: BRAND, url: DOMAIN }],
  creator: BRAND,
  publisher: BRAND,
  category: "healthcare",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export function metadataForRoute(route: PublicRoute): Metadata {
  return {
    title: route.title,
    description: route.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: route.canonical,
      languages: route.languages,
    },
    openGraph: {
      type: "website",
      title: route.title,
      description: route.description,
      url: route.canonical,
      siteName: BRAND,
      locale: route.lang === "es" ? "es_US" : "en_US",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          secureUrl: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@faithfulcaremd",
      title: route.title,
      description: route.description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: SOCIAL_IMAGE_ALT }],
    },
  };
}
