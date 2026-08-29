import type { CompleteConditionPageMap } from "@/lib/condition-page-types";
import { primaryConditionPagesA } from "@/lib/condition-content/primary-a";
import { primaryConditionPagesB } from "@/lib/condition-content/primary-b";
import { palliativeConditionPagesA } from "@/lib/condition-content/palliative-a";
import { palliativeConditionPagesB } from "@/lib/condition-content/palliative-b";

export const conditionPageMap = {
  ...primaryConditionPagesA,
  ...primaryConditionPagesB,
  ...palliativeConditionPagesA,
  ...palliativeConditionPagesB,
} satisfies CompleteConditionPageMap;
