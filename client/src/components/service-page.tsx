import * as React from "react";
import { Link, useLocation } from "@/lib/router";
import { PageHero, InsuranceLogos, TealCta, MeetYourDoctor, TestimonialsSection, DetailGrid, FaqSection, VisitSteps, marqueeDataMap } from "@/components/sections";
const ImageMarquee = React.lazy(() =>
  import("@/components/sections/image-marquee").then(m => ({ default: m.ImageMarquee }))
);
const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);
import { pageContentMap } from "@/lib/page-content";
import { serviceSectionsMap } from "@/lib/service-sections";
import { JsonLdArray } from "@/components/json-ld";
import { medicalServiceSchema, faqPageSchema } from "@/lib/schemas";
import { ArrowRight } from "@phosphor-icons/react";

const serviceMetadata: Record<string, { name: string; description: string; serviceType: string; category: "Primary Care" | "Palliative Care" }> = {
  "/primary-care/checkups-prevention": {
    name: "Annual Checkups and Prevention",
    description: "Comprehensive annual physicals, preventive screenings, and wellness exams for adults and seniors in Naples, FL.",
    serviceType: "Preventive Medicine",
    category: "Primary Care",
  },
  "/primary-care/chronic-disease": {
    name: "Chronic Disease Management",
    description: "Ongoing management of diabetes, hypertension, heart disease, COPD, and other chronic conditions in Naples, FL.",
    serviceType: "Chronic Disease Management",
    category: "Primary Care",
  },
  "/primary-care/same-day-visits": {
    name: "Same-Day Visits",
    description: "Urgent same-day medical appointments for acute illnesses, infections, injuries, and unexpected health concerns in Naples, FL.",
    serviceType: "Urgent Care",
    category: "Primary Care",
  },
  "/primary-care/womens-health": {
    name: "Women's Health",
    description: "Women's health services including wellness exams, reproductive health, menopause management, and preventive care in Naples, FL.",
    serviceType: "Women's Health",
    category: "Primary Care",
  },
  "/primary-care/senior-care": {
    name: "Senior Care",
    description: "Specialized geriatric care for adults 65 and older including Medicare wellness visits, fall prevention, and cognitive screening in Naples, FL.",
    serviceType: "Geriatric Medicine",
    category: "Primary Care",
  },
  "/primary-care/procedures-diagnostics": {
    name: "Procedures and Diagnostics",
    description: "In-office medical procedures, lab work, EKGs, and diagnostic testing for accurate diagnosis and treatment in Naples, FL.",
    serviceType: "Diagnostic Services",
    category: "Primary Care",
  },
  "/palliative-care/about-palliative-care": {
    name: "About Palliative Care",
    description: "Understanding palliative care: specialized medical support for serious illness focused on comfort, quality of life, and symptom management in Naples, FL.",
    serviceType: "Palliative Medicine",
    category: "Palliative Care",
  },
  "/palliative-care/symptom-relief": {
    name: "Symptom and Pain Relief",
    description: "Expert symptom management and pain relief for patients with serious or chronic illness in Naples, FL.",
    serviceType: "Pain Management",
    category: "Palliative Care",
  },
  "/palliative-care/patient-family-support": {
    name: "Patient and Family Support",
    description: "Emotional support, caregiver guidance, and family care coordination for patients with serious illness in Naples, FL.",
    serviceType: "Patient Support",
    category: "Palliative Care",
  },
  "/palliative-care/planning-transitions": {
    name: "Care Planning and Transitions",
    description: "Advance care planning, goals-of-care conversations, and smooth transitions between care settings in Naples, FL.",
    serviceType: "Care Coordination",
    category: "Palliative Care",
  },
};

function extractFaqText(answer: React.ReactNode): string {
  if (typeof answer === "string") return answer;
  if (answer === null || answer === undefined) return "";
  if (typeof answer === "object" && "props" in (answer as any)) {
    const el = answer as React.ReactElement<{ children?: React.ReactNode }>;
    const children = el.props.children;
    if (Array.isArray(children)) {
      return children
        .map((child: React.ReactNode) => {
          if (typeof child === "string") return child;
          if (child && typeof child === "object" && "props" in (child as any)) {
            const c = (child as React.ReactElement<{ children?: React.ReactNode }>).props.children;
            return typeof c === "string" ? c : "";
          }
          return "";
        })
        .join("");
    }
    return typeof children === "string" ? children : "";
  }
  return String(answer);
}

export function ServicePage() {
  const [location] = useLocation();
  const content = pageContentMap[location];
  const sections = serviceSectionsMap[location];
  const meta = serviceMetadata[location];
  const isPalliativeService = location.startsWith("/palliative-care/");

  if (!content) {
    return (
      <div className="container-radical py-20 text-center">
        <h1 className="h1">Page Not Found</h1>
        <p className="body-lg mt-4">Content for this page is not yet available.</p>
      </div>
    );
  }

  const plainFaqs = sections?.faq?.items
    ? sections.faq.items.map((faq) => ({
        question: faq.question,
        answer: extractFaqText(faq.answer),
      }))
    : [];

  const schemas: (Record<string, unknown> | null)[] = [];

  if (meta) {
    schemas.push(
      medicalServiceSchema({
        name: meta.name,
        description: meta.description,
        url: location,
        serviceType: meta.serviceType,
        category: meta.category,
      })
    );
  }

  if (plainFaqs.length > 0) {
    schemas.push(faqPageSchema(plainFaqs));
  }

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      {schemas.length > 0 && <JsonLdArray schemas={schemas} />}
      <main id="main">
        <PageHero
          title={content.title}
          subtitle={content.subtitle}
          subtitleBold={content.subtitleBold}
          marqueeItems={content.marqueeItems}
          heroImage={content.heroImage}
          heroImageMobile={content.heroImageMobile}
          heroImageAlt={content.heroImageAlt}
          heroBlurPlaceholder={content.heroBlurPlaceholder}
          primaryCtaText={content.primaryCtaText || "Call Now"}
          primaryCtaHref="tel:2394230205"
          secondaryCtaText={content.secondaryCtaText || "Request a Visit"}
          showSearchCard={true}
          heroTextTheme={content.heroTextTheme}
          mobileGreeting={content.mobileGreeting}
        />

        <InsuranceLogos />

        {isPalliativeService && (
          <section className="bg-white pt-6 md:pt-8" aria-label="Palliative care overview">
            <div className="container-radical">
              <Link
                href="/palliative-care"
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-5 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                data-testid="link-palliative-care-hub"
              >
                Explore all palliative care services
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {sections ? (
          <>
            <DetailGrid
              id="page-content"
              eyebrow={sections.detailGrid.eyebrow}
              eyebrowColor={sections.detailGrid.eyebrowColor}
              title={sections.detailGrid.title}
              description={sections.detailGrid.description}
              statNumber={sections.detailGrid.statNumber}
              statLabel={sections.detailGrid.statLabel}
              cards={sections.detailGrid.cards}
            />

            {marqueeDataMap[location] && (
              <React.Suspense fallback={<div style={{ minHeight: "clamp(220px, 30vh, 360px)" }} aria-hidden="true" />}>
                <ImageMarquee items={marqueeDataMap[location]} />
              </React.Suspense>
            )}

            <VisitSteps
              title={sections.visitSteps.title}
              subtitle={sections.visitSteps.subtitle}
              steps={sections.visitSteps.steps}
              ctaText={sections.visitSteps.ctaText}
              ctaHref={sections.visitSteps.ctaHref}
            />

            <MeetYourDoctor />

            <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
              <InsuranceMembership />
            </React.Suspense>

            <TestimonialsSection />

            <FaqSection
              eyebrow={sections.faq.eyebrow}
              title={sections.faq.title}
              description={sections.faq.description}
              items={sections.faq.items}
            />

            <TealCta
              subtitle={sections.tealCta.subtitle}
              title={sections.tealCta.title}
              description={sections.tealCta.description}
              primaryCtaText={sections.tealCta.primaryCtaText}
              primaryCtaHref={sections.tealCta.primaryCtaHref}
              secondaryCtaText={sections.tealCta.secondaryCtaText}
              secondaryCtaHref={sections.tealCta.secondaryCtaHref}
            />
          </>
        ) : (
          <TealCta
            subtitle="Ready to experience the difference?"
            title="Let's deliver exceptional healthcare together."
            description="Join thousands of families who trust Faithful Care for comprehensive, compassionate medical support at every stage of life."
            primaryCtaText="Schedule a Consultation"
            primaryCtaHref="/contact"
            secondaryCtaText="Call (239) 423-0205"
            secondaryCtaHref="tel:2394230205"
          />
        )}
      </main>
    </div>
  );
}
