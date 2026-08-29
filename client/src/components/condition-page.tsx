import { ArrowLeft, ArrowSquareOut } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import {
  AlternatingBlock,
  CareLevelGuide,
  ComparisonTableSection,
  DetailGrid,
  FaqSection,
  PageHero,
  RelatedCareMosaic,
  SplitFeaturePanel,
  StackedFeatureStories,
  TealCta,
  VisitSteps,
} from "@/components/sections";
import type { ConditionPageData, ConditionSection } from "@/lib/condition-page-types";

function ConditionQuickFacts({ facts }: { facts: ConditionPageData["quickFacts"] }) {
  return (
    <section className="border-y border-primary/10 bg-white" aria-label="Care at a glance" data-testid="section-condition-quick-facts">
      <div className="container-radical py-6 md:py-8">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.label}
                className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-[#f7fafc] px-4 py-4 md:px-5"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" weight="duotone" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-xs font-semibold uppercase tracking-wider text-primary"
                    data-testid="condition-fact-label"
                  >
                    {fact.label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-snug text-deep-navy md:text-base">{fact.value}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ConditionSectionRenderer({ section, index }: { section: ConditionSection; index: number }) {
  switch (section.type) {
    case "editorial":
      return (
        <AlternatingBlock
          key={`editorial-${index}`}
          subtitle={section.eyebrow}
          title={section.title}
          description={section.description}
          imageSrc={section.image}
          imageAlt={section.imageAlt}
          imagePosition={section.imagePosition}
          bulletPoints={section.bullets}
          callout={section.callout}
          reversed={section.reversed}
          variant={section.variant}
          stackUntilXl
          showCta={false}
        />
      );
    case "care-levels":
      return <CareLevelGuide key={`care-levels-${index}`} {...section} />;
    case "detail-grid":
      return <DetailGrid key={`detail-grid-${index}`} {...section} />;
    case "split-panel":
      return <SplitFeaturePanel key={`split-panel-${index}`} {...section} />;
    case "stories":
      return (
        <StackedFeatureStories
          key={`stories-${index}`}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          stories={section.stories}
          className={section.toneClass ?? "bg-[#00c2cc]"}
          testId={`section-condition-stories-${index}`}
        />
      );
    case "comparison":
      return <ComparisonTableSection key={`comparison-${index}`} {...section} />;
    case "visit-steps":
      return <VisitSteps key={`visit-steps-${index}`} {...section} ctaHref={section.ctaHref ?? "/contact"} />;
  }
}

function EvidenceSources({ sources }: { sources: ConditionPageData["sources"] }) {
  return (
    <section className="bg-[#f5f8fb] py-10 md:py-14" data-testid="section-condition-sources">
      <div className="container-radical">
        <div className="rounded-3xl border border-primary/12 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Evidence behind this guide</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-deep-navy md:text-3xl">Reliable information, connected to a real visit.</h2>
              <p className="mt-3 text-sm leading-relaxed text-deep-navy/60 md:text-base">
                This educational guide uses current public health and clinical sources. It does not diagnose a condition or replace advice from a clinician who knows your history.
              </p>
            </div>
            <ul className="grid max-w-2xl gap-2 sm:grid-cols-2" aria-label="Medical sources">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-primary/12 px-4 py-3 text-sm transition-colors hover:border-primary/35 hover:bg-primary/5"
                  >
                    <span>
                      <span className="block font-semibold text-deep-navy">{source.label}</span>
                      <span className="mt-1 block text-deep-navy/50">{source.publisher}</span>
                    </span>
                    <ArrowSquareOut className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConditionPage({ content }: { content: ConditionPageData }) {
  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqPageSchema(content.faqs)]} />
      <main id="main">
        <PageHero
          title={content.hero.title}
          subtitleBold={content.hero.subtitleBold}
          subtitle={content.hero.subtitle}
          marqueeItems={content.hero.marqueeItems}
          heroImage={content.hero.image}
          heroImageMobile={content.hero.imageMobile}
          heroImageAlt={content.hero.imageAlt}
          heroBlurPlaceholder={content.hero.blurPlaceholder}
          heroLayout="split"
          heroImageFit={content.hero.imageFit}
          heroImagePosition={content.hero.imagePosition}
          heroImagePositionMobile={content.hero.imagePositionMobile}
          showCtas={!content.urgentNotice}
          primaryCtaText="Call Faithful Care"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Request a Visit"
          showSearchCard={!content.urgentNotice}
        />

        {content.urgentNotice && (
          <section className="border-y border-red-200 bg-red-50" role="alert" data-testid="condition-urgent-notice">
            <div className="container-radical py-5 md:py-6">
              <p className="font-semibold text-red-800">{content.urgentNotice.title}</p>
              <p className="mt-1 max-w-5xl text-sm leading-relaxed text-red-950/75 md:text-base">
                {content.urgentNotice.description}
              </p>
            </div>
          </section>
        )}

        <section className="bg-white pt-5 md:pt-7" aria-label={`${content.category} navigation`}>
          <div className="container-radical">
            <Link
              href={content.parentHub.href}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              data-testid="link-condition-parent-hub"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {content.parentHub.label}
            </Link>
          </div>
        </section>

        <ConditionQuickFacts facts={content.quickFacts} />

        {content.sections.map((section, index) => (
          <ConditionSectionRenderer key={`${section.type}-${index}`} section={section} index={index} />
        ))}

        <RelatedCareMosaic {...content.related} />

        <FaqSection
          eyebrow="Questions patients ask"
          title={content.faqTitle ?? "Clear answers before your next visit"}
          description={content.faqDescription ?? "Use these answers to prepare for a conversation with your care team."}
          items={content.faqs}
        />

        <EvidenceSources sources={content.sources} />

        <TealCta
          subtitle={content.cta.subtitle}
          title={content.cta.title}
          description={content.cta.description}
          primaryCtaText={content.cta.primaryText}
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>
    </div>
  );
}

export default ConditionPage;
