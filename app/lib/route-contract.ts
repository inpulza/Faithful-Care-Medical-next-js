import {
  DOMAIN,
  HREFLANG_PAIRS,
  seoMap,
  isSpanishPath,
  type PageSeo,
} from "../../shared/seo-data";

export type SiteLanguage = "en" | "es";

export interface PublicRoute extends PageSeo {
  path: string;
  canonical: string;
  lang: SiteLanguage;
  languages?: Record<"en" | "es" | "x-default", string>;
}

export interface RedirectRule {
  source: string;
  destination: string;
  statusCode: 301;
}


function normalizePath(path: string): string {
  if (path === "/es/") return "/es";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function languagesForPath(path: string): PublicRoute["languages"] {
  const pair = HREFLANG_PAIRS.find(({ en, es }) => en === path || es === path);
  if (!pair) return undefined;

  return {
    en: `${DOMAIN}${pair.en}`,
    es: `${DOMAIN}${pair.es}`,
    "x-default": `${DOMAIN}${pair.en}`,
  };
}

export const publicRoutes: PublicRoute[] = Object.entries(seoMap).map(([path, seo]) => ({
  path,
  ...seo,
  canonical: `${DOMAIN}${path}`,
  lang: isSpanishPath(path) ? "es" : "en",
  languages: languagesForPath(path),
}));

const canonicalHtmlAliases: RedirectRule[] = publicRoutes.map(({ path }) => ({
  source: path === "/" ? "/index.html" : `${path}.html`,
  destination: path,
  statusCode: 301,
}));

const canonicalSlashAliases: RedirectRule[] = publicRoutes
  .filter(({ path }) => path !== "/")
  .map(({ path }) => ({
    source: `${path}/`,
    destination: path,
    statusCode: 301,
  }));

export const redirectRules: RedirectRule[] = [
  { source: "/dr-addys-reve", destination: "/about", statusCode: 301 },
  { source: "/palliative-humana", destination: "/insurance-accepted#humana", statusCode: 301 },
  { source: "/primary-care-aetna", destination: "/insurance-accepted#aetna", statusCode: 301 },
  ...canonicalSlashAliases,
  ...canonicalHtmlAliases,
];

const routesByPath = new Map(publicRoutes.map((route) => [route.path, route]));

export function routeForPath(path: string): PublicRoute | undefined {
  return routesByPath.get(normalizePath(path));
}
