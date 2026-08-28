import type { MetadataRoute } from "next";
import { publicRoutes } from "./lib/route-contract";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(({ canonical, dateModified }) => ({
    url: canonical,
    ...(dateModified ? { lastModified: dateModified } : {}),
  }));
}
