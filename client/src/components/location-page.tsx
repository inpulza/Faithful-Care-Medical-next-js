import * as React from "react";
import { useLocation } from "@/lib/router";
import { PageHero, InsuranceLogos, TestimonialsSection, FaqSection, MeetYourDoctor, TealCta, marqueeDataMap, LocationServices } from "@/components/sections";
const ImageMarquee = React.lazy(() =>
  import("@/components/sections/image-marquee").then(m => ({ default: m.ImageMarquee }))
);
const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);
import type { FaqItem, LocationService } from "@/components/sections";
const ServiceAreaMap = React.lazy(() => import("@/components/service-area-map"));
import { pageContentMap } from "@/lib/page-content";
import { JsonLdArray } from "@/components/json-ld";
import { locationPageSchema, faqPageSchema } from "@/lib/schemas";
import { SocialVideoCarousel } from "@/components/social-video-carousel";

export interface LocationData {
  name: string;
  county: "Collier County" | "Lee County";
  tagline: string;
  description: string;
  driveTime: string;
  driveDistance: string;
  population?: string;
  highlights: string[];
  localNote: string;
  faqs: FaqItem[];
  primaryCareDescription: string;
  primaryCareServices: LocationService[];
  palliativeCareDescription: string;
  palliativeCareServices: LocationService[];
  neighborhoods: string[];
  directionsText: string;
  localHealthContext: string;
}

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

export function LocationPage({ data }: { data: LocationData }) {
  const [location] = useLocation();
  const heroContent = pageContentMap[location];

  const plainFaqs = data.faqs.map((faq) => ({
    question: faq.question,
    answer: extractFaqText(faq.answer),
  }));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[
        locationPageSchema({ cityName: data.name, description: data.description, url: location }),
        faqPageSchema(plainFaqs),
      ]} />
      <main id="main">
        {heroContent && (
          <>
            <PageHero
              title={heroContent.title}
              subtitle={heroContent.subtitle}
              subtitleBold={heroContent.subtitleBold}
              marqueeItems={heroContent.marqueeItems}
              heroImage={heroContent.heroImage}
              heroImageMobile={heroContent.heroImageMobile}
              heroImageAlt={heroContent.heroImageAlt}
              heroBlurPlaceholder={heroContent.heroBlurPlaceholder}
              primaryCtaText={heroContent.primaryCtaText || "Call Now"}
              primaryCtaHref="tel:2394230205"
              secondaryCtaText={heroContent.secondaryCtaText || "Request a Visit"}
              showSearchCard={true}
              heroTextTheme={heroContent.heroTextTheme}
              mapConfig={heroContent.mapConfig}
            />
            <InsuranceLogos />
          </>
        )}

        {location === "/locations/naples" && <SocialVideoCarousel placement="naples" />}

        {marqueeDataMap[location] && (
          <React.Suspense fallback={<div style={{ minHeight: "clamp(220px, 30vh, 360px)" }} aria-hidden="true" />}>
            <ImageMarquee items={marqueeDataMap[location]} />
          </React.Suspense>
        )}

        <LocationServices
          id="page-content"
          cityName={data.name}
          primaryCareDescription={data.primaryCareDescription}
          palliativeCareDescription={data.palliativeCareDescription}
          primaryCareServices={data.primaryCareServices}
          palliativeCareServices={data.palliativeCareServices}
        />

        <MeetYourDoctor />

        <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
          <InsuranceMembership />
        </React.Suspense>

        <TestimonialsSection />

        <React.Suspense fallback={<div style={{ minHeight: "clamp(700px, 90vh, 1180px)" }} aria-hidden="true" />}>
          <ServiceAreaMap />
        </React.Suspense>

        <FaqSection
          eyebrow={`${data.name} patients ask`}
          title={`Common questions from ${data.name} residents.`}
          items={data.faqs}
        />

        <TealCta
          subtitle={`${data.name} residents`}
          title={`${data.name} patients: we're accepting new patients.`}
          description={`Just ${data.driveTime} away. Call today to schedule your first visit or ask about insurance.`}
          primaryCtaText="Schedule a Visit"
          primaryCtaHref="/contact"
          secondaryCtaText="Call (239) 423-0205"
          secondaryCtaHref="tel:2394230205"
        />
      </main>
    </div>
  );
}
