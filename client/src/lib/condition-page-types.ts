import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { CareLevelItem, ComparisonRow, DetailCard, RelatedCareLink, SplitFeatureItem, StackedFeatureStory, VisitStep } from "@/components/sections";
import type { ConditionRoutePath } from "@shared/condition-routes";

export type ConditionSection =
  | {
      type: "editorial";
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      imagePosition?: string;
      bullets?: string[];
      callout?: string;
      reversed?: boolean;
      variant?: "primary" | "secondary";
    }
  | {
      type: "care-levels";
      eyebrow?: string;
      title: string;
      description: string;
      items: CareLevelItem[];
      note?: string;
    }
  | {
      type: "detail-grid";
      eyebrow: string;
      eyebrowColor?: "primary" | "secondary";
      title: string;
      description: string;
      statNumber: string;
      statLabel: string;
      cards: DetailCard[];
    }
  | {
      type: "split-panel";
      eyebrow: string;
      title: string;
      description: string;
      items: SplitFeatureItem[];
      tone?: "light" | "navy" | "plain";
    }
  | {
      type: "stories";
      eyebrow: string;
      title: string;
      description?: string;
      stories: StackedFeatureStory[];
      toneClass?: string;
    }
  | {
      type: "comparison";
      eyebrow: string;
      title: string;
      description: string;
      leftHeading: string;
      rightHeading: string;
      rows: ComparisonRow[];
      note?: string;
      sources?: { label: string; href: string }[];
    }
  | {
      type: "visit-steps";
      eyebrow?: string;
      title: string;
      subtitle?: string;
      steps: VisitStep[];
      ctaText: string;
      ctaHref?: string;
    };

export interface ConditionPageData {
  path: string;
  category: "Primary Care" | "Palliative Care";
  parentHub: { label: string; href: "/primary-care" | "/palliative-care" };
  hero: {
    title: string;
    subtitleBold: string;
    subtitle: string;
    marqueeItems: string[];
    image: string;
    imageMobile?: string;
    imageAlt: string;
    blurPlaceholder?: string;
    imageFit?: "cover" | "contain";
    imagePosition?: string;
    imagePositionMobile?: string;
  };
  urgentNotice?: {
    title: string;
    description: string;
    suppressHeroActions?: boolean;
  };
  quickFacts: {
    icon: PhosphorIcon;
    label: string;
    value: string;
  }[];
  sections: ConditionSection[];
  related: {
    eyebrow?: string;
    title: string;
    description: string;
    featured: RelatedCareLink & {
      image: string;
      imageAlt: string;
      imagePosition?: string;
    };
    links: RelatedCareLink[];
  };
  faqTitle?: string;
  faqDescription?: string;
  faqs: { question: string; answer: string }[];
  sources: { label: string; href: string; publisher: string }[];
  cta: {
    subtitle: string;
    title: string;
    description: string;
    primaryText: string;
  };
}

export type ConditionPageMap = Partial<Record<ConditionRoutePath, ConditionPageData>>;
export type CompleteConditionPageMap = Record<ConditionRoutePath, ConditionPageData>;
