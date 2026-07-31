import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ["*", "GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "CCBot"].map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: "https://faithfulcaremedical.com/sitemap.xml",
  };
}
