import type { MetadataRoute } from "next";
import { LEGAL_PAGES } from "../shared/seo-data";
import { publicRoutes } from "./lib/route-contract";

function priority(path: string): number {
  if (path === "/") return 1;
  if (["/contact", "/insurance-accepted", "/primary-care", "/es/medico-de-familia-naples"].includes(path)) return 0.9;
  if (LEGAL_PAGES.has(path)) return 0.3;
  if (path.startsWith("/locations/")) return 0.7;
  return 0.8;
}

function changeFrequency(path: string): "weekly" | "monthly" | "yearly" {
  if (path === "/" || path === "/insurance-accepted") return "weekly";
  if (LEGAL_PAGES.has(path)) return "yearly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicRoutes.map(({ path, canonical }) => ({
    url: canonical,
    lastModified,
    changeFrequency: changeFrequency(path),
    priority: priority(path),
  }));
}
