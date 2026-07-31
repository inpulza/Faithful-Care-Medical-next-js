import { CareHubPage } from "@/components/care-hub-page";
import { homeFaqs } from "@/lib/home-faqs";

const services = [
  {
    title: "What Is Palliative Care",
    description: "What it is, who it's for, and how it differs from hospice.",
    href: "/palliative-care/about-palliative-care",
  },
  {
    title: "Symptom Relief",
    description: "Managing pain, shortness of breath, fatigue, nausea, insomnia and anxiety.",
    href: "/palliative-care/symptom-relief",
  },
  {
    title: "Patient & Family Support",
    description: "Caregiver guidance, burnout prevention and training to monitor symptoms at home.",
    href: "/palliative-care/patient-family-support",
  },
  {
    title: "Planning & Transitions",
    description: "Advance care planning, living wills, healthcare surrogate, hospice coordination and post-hospital follow-up.",
    href: "/palliative-care/planning-transitions",
  },
];

export default function PalliativeCareIndex() {
  return (
    <CareHubPage
      path="/palliative-care"
      categoryId="palliative-care"
      servicesEyebrow="Palliative Care Services"
      servicesTitle="How we help"
      servicesIntro="Extra support when facing a serious illness. Relief from pain and symptoms, available at any stage, alongside your regular treatment."
      services={services}
      infoSections={[
        {
          id: "conditions",
          eyebrow: "Who we care for",
          title: "Conditions we support",
          tags: [
            "Cancer",
            "Heart failure",
            "Advanced kidney disease",
            "COPD and interstitial lung disease",
            "Dementia, Parkinson's and other neurological conditions",
          ],
        },
        {
          id: "specialists",
          eyebrow: "Coordinated care",
          title: <>We work alongside<br className="md:hidden" /> your specialists</>,
          description: "Palliative care does not replace your oncologist or cardiologist: it works with them, focused on comfort, clarity and quality of life.",
        },
      ]}
      faq={{
        eyebrow: "Frequently asked questions",
        title: "Questions families ask us",
        items: [homeFaqs[5], homeFaqs[1], homeFaqs[0]],
      }}
      tealCta={{
        subtitle: "We're here to help",
        title: "If your family is facing a serious illness, call us",
        description: "We'll explain clearly how we can help, alongside your current treatment. It is not hospice, and you can start at any stage.",
      }}
    />
  );
}
