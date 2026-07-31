import { PageHero, InsuranceLogos, TealCta, TestimonialsSection } from "@/components/sections";
import { InfoSection, type HubInfoSection } from "@/components/care-hub-page";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";

const infoSections: HubInfoSection[] = [
  {
    id: "annual-wellness-visit",
    eyebrow: "Annual Wellness Visit",
    title: (
      <>
        Your Medicare Annual<br className="md:hidden" /> Wellness Visit
      </>
    ),
    description:
      "Medicare covers a yearly wellness visit. We use it properly: a full review of your health, your medications, your memory and your fall risk. Not a rushed formality.",
    cta: { text: "Explore checkups & prevention", href: "/primary-care/checkups-prevention" },
  },
  {
    id: "senior-care",
    eyebrow: "Senior-Focused Care",
    title: (
      <>
        Care built around<br className="md:hidden" /> older adults
      </>
    ),
    bullets: [
      <><strong>Comprehensive geriatric assessment:</strong> function, memory and cognition screening</>,
      <><strong>Medication review and deprescribing:</strong> fewer pills when fewer are better</>,
      <><strong>Fall-risk evaluation</strong> and home-safety guidance</>,
      <><strong>Chronic condition management:</strong> diabetes, blood pressure, heart failure, COPD, kidney and thyroid</>,
      <><strong>Coordination</strong> of hearing and vision needs</>,
    ],
    cta: { text: "See senior & geriatric care", href: "/primary-care/senior-care" },
  },
  {
    id: "changing-doctor",
    eyebrow: "Switching Doctors",
    title: (
      <>
        Changing your primary care<br className="md:hidden" /> doctor with Medicare
      </>
    ),
    description:
      "If you have Medicare Advantage and want Faithful Care as your primary care physician, we'll walk you through the change. Call us and we'll explain exactly what to do.",
    cta: { text: "How to become a patient", href: "/new-patients" },
  },
  {
    id: "plans-we-accept",
    eyebrow: "Coverage",
    title: (
      <>
        Plans we accept<br className="md:hidden" /> at Faithful Care
      </>
    ),
    description:
      "We verify your coverage before your visit. We are a contracted, in-network provider for Aetna Medicare Advantage plans, and with Humana Medicare Advantage we are in-network for palliative care and provide out-of-network benefits for primary care. We also welcome patients with Original Medicare, Cigna and Florida Medicaid (Sunshine Health).",
    tags: ["Original Medicare", "Humana Medicare Advantage", "Aetna Medicare Advantage", "Cigna", "Florida Medicaid"],
    cta: { text: "See all insurance we accept", href: "/insurance-accepted" },
  },
  {
    id: "serious-illness",
    eyebrow: "Serious Illness Support",
    title: (
      <>
        Extra support through<br className="md:hidden" /> serious illness
      </>
    ),
    description:
      "For patients living with a serious illness, we also offer palliative care: comfort-focused support alongside your specialists.",
    cta: { text: "Learn about palliative care", href: "/palliative-care" },
  },
];

export default function Medicare() {
  const content = pageContentMap["/medicare"];

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
          {infoSections.map((section) => (
            <InfoSection key={section.id} section={section} categoryId="medicare" />
          ))}
        </div>

        <TestimonialsSection />

        <TealCta
          subtitle="Medicare Patients Welcome"
          title={"We're accepting new Medicare patients in\u00A0Naples."}
          description="Call today. If you have Medicare Advantage and want Faithful Care as your primary care physician, we'll walk you through the change."
          primaryCtaText="Call (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>
    </div>
  );
}
