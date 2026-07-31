import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "../../shared/seo-data";
import type { PublicRoute } from "./route-contract";

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
      siteName: "Faithful Care Medical Services",
      locale: route.lang === "es" ? "es_US" : "en_US",
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
