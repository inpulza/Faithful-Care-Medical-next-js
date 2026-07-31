import { CareHubPage } from "@/components/care-hub-page";
import { homeFaqs } from "@/lib/home-faqs";

const services = [
  {
    title: "Annual Checkups & Preventive Care",
    description: "Annual physicals, Medicare Wellness Visits, cancer screening coordination, immunizations and heart-health checks.",
    href: "/primary-care/checkups-prevention",
  },
  {
    title: "Chronic Disease Management",
    description: "Ongoing care for diabetes, high blood pressure, heart failure, COPD, kidney disease and thyroid disorders.",
    href: "/primary-care/chronic-disease",
  },
  {
    title: "Same-Day & Urgent Visits",
    description: "Sick today? Get seen today. Infections, dizziness, headaches and minor injuries, without the ER.",
    href: "/primary-care/same-day-visits",
  },
  {
    title: "Senior & Geriatric Care",
    description: "Geriatric assessments, fall prevention, memory screening, medication review and caregiver support.",
    href: "/primary-care/senior-care",
  },
  {
    title: "Women's Health",
    description: "Pap smears, breast exams, contraceptive counseling and menopause support.",
    href: "/primary-care/womens-health",
  },
  {
    title: "In-Office Procedures, EKG & Labs",
    description: "Joint injections, skin biopsies, wound care, EKG testing and rapid lab results.",
    href: "/primary-care/procedures-diagnostics",
  },
];

export default function PrimaryCareIndex() {
  return (
    <CareHubPage
      path="/primary-care"
      categoryId="primary-care"
      servicesEyebrow="Primary Care Services"
      servicesTitle={<>Complete primary care,<br className="hidden md:block" /> all in one place</>}
      services={services}
      infoSections={[
        {
          id: "why-choose",
          eyebrow: "Why Faithful Care",
          title: "Why patients choose Faithful Care",
          bullets: [
            <><strong>Unhurried visits</strong> with a doctor who knows you</>,
            <><strong>Bilingual care</strong> in English and Spanish</>,
            <><strong>On-site lab and EKG:</strong> fewer trips, faster answers</>,
            <><strong>Same-day appointments</strong> when you're unwell</>,
            <><strong>Most major insurances and Medicare</strong> accepted</>,
            <><strong>Accepting new patients:</strong> <a href="/new-patients">see how to become a patient</a></>,
          ],
        },
        {
          id: "insurance",
          eyebrow: "Coverage",
          title: "Insurance & Medicare",
          description: "We accept Humana, Aetna, Cigna, Medicare and Medicaid. Not sure about your plan? Call us and we'll check your coverage for you.",
          cta: { text: "See Insurance We Accept", href: "/insurance-accepted" },
        },
        {
          id: "medicare",
          eyebrow: "Medicare",
          title: "On Medicare? You're in good hands",
          description: "We accept Medicare and Medicare Advantage: Annual Wellness Visits, geriatric-focused care and medication review for older adults.",
          cta: { text: "Medicare at Faithful Care", href: "/medicare" },
        },
      ]}
      faq={{
        eyebrow: "Frequently asked questions",
        title: "Answers for new primary care patients",
        items: [homeFaqs[0], homeFaqs[1], homeFaqs[4], homeFaqs[6]],
      }}
      tealCta={{
        subtitle: "Accepting new patients",
        title: "Looking for a primary care doctor in Naples?",
        description: "Call today: we're accepting new patients. Same-day appointments are available when you need them, and we accept most major insurances and Medicare.",
      }}
    />
  );
}
