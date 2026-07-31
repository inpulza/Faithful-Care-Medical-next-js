import { PageHero, InsuranceLogos, TealCta, TestimonialsSection, VisitSteps } from "@/components/sections";
import { InfoSection, type HubInfoSection } from "@/components/care-hub-page";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";
import { Phone, ShieldCheck, Stethoscope } from "@phosphor-icons/react";

const infoSections: HubInfoSection[] = [
  {
    id: "what-to-bring",
    eyebrow: "First Visit Checklist",
    title: (
      <>
        What to bring<br className="md:hidden" /> to your first visit
      </>
    ),
    bullets: [
      "Photo ID",
      "Insurance card",
      "A list of your current medications (or the bottles)",
      "Any recent lab results or records from your previous doctor",
      "Your questions: bring them written down if that helps",
    ],
  },
  {
    id: "what-to-expect",
    eyebrow: "Your First Visit",
    title: (
      <>
        What to expect<br className="md:hidden" /> when you come in
      </>
    ),
    bullets: [
      "A full review of your health history",
      "Time to talk about what's worrying you, without rushing",
      "On-site lab work and EKG if needed, so you don't have to go elsewhere",
      "A clear plan you understand before you leave",
    ],
  },
  {
    id: "insurance",
    eyebrow: "Insurance Accepted",
    title: (
      <>
        We work with<br className="md:hidden" /> your insurance
      </>
    ),
    description:
      "Tell us your plan when you call and we'll verify your coverage before your visit.",
    tags: ["Humana", "Aetna", "Cigna", "Original Medicare", "Florida Medicaid"],
    cta: { text: "See all insurance we accept", href: "/insurance-accepted" },
  },
  {
    id: "medicare",
    eyebrow: "Medicare",
    title: (
      <>
        On Medicare?<br className="md:hidden" /> You're in good hands
      </>
    ),
    description:
      "We accept Medicare and Medicare Advantage: Annual Wellness Visits, geriatric-focused care and medication review for older adults.",
    cta: { text: "Medicare at Faithful Care", href: "/medicare" },
  },
  {
    id: "spanish",
    eyebrow: "Se Habla Español",
    title: (
      <>
        We speak Spanish,<br className="md:hidden" /> at every step
      </>
    ),
    description:
      "Care in English and Spanish, from the first phone call to follow-up.",
    cta: { text: "Ver la página en español", href: "/es/medico-de-familia-naples" },
  },
];

export default function NewPatients() {
  const content = pageContentMap["/new-patients"];

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
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
          primaryCtaText={content.primaryCtaText}
          primaryCtaHref="tel:2394230205"
          secondaryCtaText={content.secondaryCtaText}
          secondaryCtaHref={CLINIC_GMAPS_DIRECTIONS_URL}
          showSearchCard={true}
        />

        <InsuranceLogos />

        <div id="page-content">
          <VisitSteps
            eyebrow="Becoming a patient"
            title="How to become a patient."
            subtitle="Three simple steps, and we handle the details with you."
            steps={[
              {
                icon: Phone,
                title: "Call us",
                description:
                  "Call us and we'll find a time that works. Same-day appointments are often available.",
              },
              {
                icon: ShieldCheck,
                title: "Tell us your insurance",
                description:
                  "Tell us your insurance and we'll verify your coverage before your visit.",
              },
              {
                icon: Stethoscope,
                title: "Come in",
                description:
                  "Your first visit is a full conversation, not a five-minute check.",
              },
            ]}
            ctaText="Call (239) 423-0205"
            ctaHref="tel:2394230205"
          />
        </div>

        {infoSections.map((section) => (
          <InfoSection key={section.id} section={section} categoryId="new-patients" />
        ))}

        <TestimonialsSection />

        <TealCta
          subtitle="Accepting New Patients"
          title={"Ready for a doctor who actually\u00A0listens?"}
          description="Call today. We're accepting new patients and can often see you the same week."
          primaryCtaText="Call (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>
    </div>
  );
}
