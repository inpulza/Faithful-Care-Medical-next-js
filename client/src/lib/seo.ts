import { useEffect } from "react";
import { useLocation } from "@/lib/router";
import { seoMap, DOMAIN, DEFAULT_OG_IMAGE, hreflangPairForPath, isSpanishPath } from "@shared/seo-data";

function updateMetaTag(property: string, content: string, isProperty = true) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (el) {
    el.content = content;
  } else {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    el.content = content;
    document.head.appendChild(el);
  }
}

function updateCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (el) {
    el.href = href;
  } else {
    el = document.createElement("link");
    el.rel = "canonical";
    el.href = href;
    document.head.appendChild(el);
  }
}

function updateHreflangLinks(path: string) {
  document
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());

  const pair = hreflangPairForPath(path);
  if (!pair) return;

  const links: { hreflang: string; href: string }[] = [
    { hreflang: "en", href: `${DOMAIN}${pair.en}` },
    { hreflang: "es", href: `${DOMAIN}${pair.es}` },
    { hreflang: "x-default", href: `${DOMAIN}${pair.en}` },
  ];

  for (const { hreflang, href } of links) {
    const el = document.createElement("link");
    el.rel = "alternate";
    el.hreflang = hreflang;
    el.href = href;
    document.head.appendChild(el);
  }
}

export function usePageSeo() {
  const [rawLocation] = useLocation();
  const location = rawLocation === "/es/" ? "/es" : rawLocation;

  useEffect(() => {
    if (!(location in seoMap)) return;

    const publicPath = location as keyof typeof seoMap;
    const seo = seoMap[publicPath];

    const canonical = `${DOMAIN}${publicPath}`;

    document.title = seo.title;
    document.documentElement.lang = isSpanishPath(publicPath) ? "es" : "en";

    updateMetaTag("description", seo.description, false);
    updateMetaTag("og:title", seo.title);
    updateMetaTag("og:description", seo.description);
    updateMetaTag("og:url", canonical);
    updateMetaTag("og:image", DEFAULT_OG_IMAGE);
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    updateMetaTag("twitter:image", DEFAULT_OG_IMAGE);

    updateCanonical(canonical);
    updateHreflangLinks(publicPath);
  }, [location]);
}
