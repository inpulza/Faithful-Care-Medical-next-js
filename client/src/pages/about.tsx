import { PageHero, InsuranceLogos, TealCta, TestimonialsSection, AlternatingBlock } from "@/components/sections";
import { InfoSection, type HubInfoSection } from "@/components/care-hub-page";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";

const DOCTOR_BIO =
  "Dr. Addys Reve, MD, founded Faithful Care Medical Services to provide unhurried, bilingual primary and palliative care for adults and older adults in Naples. She holds Florida Medical License ME163785 and National Provider Identifier 1205414729. Her published clinical focus includes preventive care, chronic disease management, geriatric care, women’s health, and symptom support during serious illness.";

const infoSections: HubInfoSection[] = [
  {
    id: "languages",
    eyebrow: "Languages",
    title: (
      <>
        Care in English<br className="md:hidden" /> and in Spanish
      </>
    ),
    description:
      "English and Spanish. All of your care, from the first phone call to every follow-up visit, can be in Spanish.",
  },
  {
    id: "philosophy",
    eyebrow: "Care Philosophy",
    title: (
      <>
        How Dr. Reve<br className="md:hidden" /> cares for patients
      </>
    ),
    bullets: [
      "Unhurried visits: listening comes before deciding",
      "Explanations in words you can understand, not medical jargon",
      "Continuity: the same doctor who knows you, visit after visit",
      "Support for the family too, especially during serious illness",
    ],
  },
  {
    id: "focus-areas",
    eyebrow: "Areas of Focus",
    title: (
      <>
        What Dr. Reve<br className="md:hidden" /> focuses on
      </>
    ),
    bullets: [
      "Primary care for adults and older adults",
      "Chronic disease management: diabetes, blood pressure, heart disease, COPD, kidney disease, thyroid",
      "Geriatric care: memory, falls, medication review",
      "Women's health",
      "Palliative care and support through serious illness",
    ],
  },
  {
    id: "where-she-practices",
    eyebrow: "Where She Sees Patients",
    title: (
      <>
        North Naples,<br className="md:hidden" /> Tamiami Trail N.
      </>
    ),
    description:
      "Faithful Care Medical Services is located at 9955 Tamiami Trail N. Suite 2, Naples, FL 34108, in North Naples.",
    cta: { text: "See our Naples location", href: "/locations/naples" },
  },
];

export default function About() {
  const content = pageContentMap["/about"];

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
          primaryCtaText="Call Now"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Get Directions"
          secondaryCtaHref={CLINIC_GMAPS_DIRECTIONS_URL}
          showSearchCard={true}
        />

        <InsuranceLogos />

        <div id="page-content">
          <AlternatingBlock
            subtitle="About the Doctor"
            title={"About Dr. Addys Reve,\u00A0MD"}
            description={DOCTOR_BIO}
            imageSrc="/images/dr-addys-reve.webp"
            imageAlt="Dr. Addys Reve, MD, founder of Faithful Care Medical Services in Naples, Florida"
            ctaText="Read patient reviews"
            ctaHref="/reviews"
            variant="primary"
          />
        </div>

        {infoSections.map((section) => (
          <InfoSection key={section.id} section={section} categoryId="about" />
        ))}

        <TestimonialsSection />

        <TealCta
          subtitle="Your Doctor in Naples"
          title={"Looking for a doctor who truly\u00A0listens?"}
          description="Call and request your appointment. Dr. Reve sees adults and older adults in Naples, in English and in Spanish."
          primaryCtaText="Call (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>
    </div>
  );
}
