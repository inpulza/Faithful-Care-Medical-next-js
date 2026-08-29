export const CONDITION_ROUTE_PATHS = [
  "/primary-care/diabetes-care",
  "/primary-care/high-blood-pressure-care",
  "/primary-care/copd-care",
  "/primary-care/thyroid-care",
  "/primary-care/menopause-care",
  "/primary-care/fall-prevention",
  "/primary-care/memory-screening",
  "/primary-care/medication-review-for-seniors",
  "/palliative-care/for-cancer",
  "/palliative-care/for-heart-failure",
  "/palliative-care/for-copd-and-lung-disease",
  "/palliative-care/for-advanced-kidney-disease",
  "/palliative-care/for-dementia",
  "/palliative-care/for-parkinsons",
  "/palliative-care/pain-management",
  "/palliative-care/shortness-of-breath",
] as const;

export type ConditionRoutePath = (typeof CONDITION_ROUTE_PATHS)[number];

const CONDITION_ROUTE_PATH_SET = new Set<string>(CONDITION_ROUTE_PATHS);

export function isConditionRoute(path: string): path is ConditionRoutePath {
  return CONDITION_ROUTE_PATH_SET.has(path);
}
