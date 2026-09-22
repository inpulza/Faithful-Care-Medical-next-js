import {isConditionRoute} from "./condition-route-paths.ts";
export const isBlogArticleRoute=(path:string)=>/^\/(es\/)?blog\/[a-z0-9-]+\/?$/.test(path);
export const isSensitiveHealthRoute=(path:string)=>isConditionRoute(path)||isBlogArticleRoute(path);

import {
  CONDITION_ROUTE_PATHS,
  type ConditionRoutePath,
} from "./condition-route-paths.ts";

export const CONDITION_TRACKING_PATH_ALIASES = Object.freeze(
  Object.fromEntries(
    CONDITION_ROUTE_PATHS.map((path) => [
      path,
      path.startsWith("/primary-care/")
        ? "/primary-care"
        : "/palliative-care",
    ]),
  ) as Record<ConditionRoutePath, "/primary-care" | "/palliative-care">,
);

const CONDITION_TRACKING_TITLES = Object.freeze({
  "/primary-care": "Primary Care | Faithful Care Medical Services",
  "/palliative-care": "Palliative Care | Faithful Care Medical Services",
} as const);

export const CONDITION_TRACKING_TITLE_ALIASES = Object.freeze(
  Object.fromEntries(
    CONDITION_ROUTE_PATHS.map((path) => [
      path,
      CONDITION_TRACKING_TITLES[CONDITION_TRACKING_PATH_ALIASES[path]],
    ]),
  ) as Record<ConditionRoutePath, string>,
);

export function privacySafeTrackingPath(pathname: string): string {
  if(isBlogArticleRoute(pathname))return pathname.startsWith("/es/")?"/es/blog":"/blog";
  return CONDITION_TRACKING_PATH_ALIASES[pathname as ConditionRoutePath] ?? pathname;
}

export function privacySafeTrackingTitle(pathname: string, fallbackTitle: string): string {
  if(isBlogArticleRoute(pathname))return "Health Journal | Faithful Care Medical Services";
  return CONDITION_TRACKING_TITLE_ALIASES[pathname as ConditionRoutePath] ?? fallbackTitle;
}
