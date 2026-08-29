import { ConditionPage } from "@/components/condition-page";
import { useLocation } from "@/lib/router";
import type { ConditionPageMap } from "@/lib/condition-page-types";
import { isConditionRoute } from "@shared/condition-routes";

export function ConditionPageGroup({ pages }: { pages: ConditionPageMap }) {
  const [location] = useLocation();
  if (!isConditionRoute(location)) return null;

  const content = pages[location];
  if (!content) return null;

  return <ConditionPage content={content} />;
}
