import { Heart, Stethoscope, Shield, Users, FirstAid, HandHeart, MapPin, Phone, UserCircle } from "@phosphor-icons/react";

export interface SubPage {
  title: string;
  description: string;
  href: string;
  details?: string[];
  detailNote?: string;
}

export interface NavCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Heart;
  color: "primary" | "secondary";
  hubHref?: string;
  subPages: SubPage[];
}

export interface NavLink {
  id: string;
  title: string;
  href: string;
  icon: typeof Heart;
}

export const navigationData: NavCategory[] = [
  {
    id: "primary-care",
    title: "Primary Care",
    subtitle: "Your Health Partner",
    description: "Complete medical care for adults and seniors, from annual checkups to same-day sick visits, all under one roof in Naples.",
    icon: Stethoscope,
    color: "primary",
    hubHref: "/primary-care",
    subPages: [
      {
        title: "Checkups & Prevention",
        description: "Annual physicals, Medicare Wellness Visits, cancer screenings, immunizations & risk assessments",
        href: "/primary-care/checkups-prevention",
        details: ["Annual physicals", "Medicare Wellness Visits", "Cancer screenings", "Immunizations", "Risk assessments", "Heart health checks"]
      },
      {
        title: "Chronic Disease Management",
        description: "Diabetes, high blood pressure, heart disease, COPD, kidney disease & thyroid conditions",
        href: "/primary-care/chronic-disease",
        details: ["Diabetes", "High blood pressure", "Heart disease", "COPD", "Kidney disease", "Thyroid conditions"]
      },
      {
        title: "Same-Day & Urgent Visits",
        description: "Infections, dizziness, headaches, minor injuries & medication side effects, seen today",
        href: "/primary-care/same-day-visits",
        details: ["Infections & flu", "Dizziness", "Headaches", "Minor injuries", "Medication side effects", "Allergic reactions"]
      },
      {
        title: "Women's Health",
        description: "Pap smears, breast exams, contraceptive counseling, menopause care & STI evaluation",
        href: "/primary-care/womens-health",
        details: ["Pap smears", "Breast exams", "Contraceptive counseling", "Menopause care", "STI evaluation", "Hormone health"]
      },
      {
        title: "Senior Care",
        description: "Geriatric assessments, fall prevention, memory screening, medication review & caregiver coordination",
        href: "/primary-care/senior-care",
        details: ["Geriatric assessments", "Fall prevention", "Memory screening", "Medication review", "Caregiver coordination", "Mobility support"]
      },
      {
        title: "In-Office Procedures & Diagnostics",
        description: "Joint injections, skin biopsies, wound care, EKG testing & rapid lab results",
        href: "/primary-care/procedures-diagnostics",
        details: ["Joint injections", "Skin biopsies", "Wound care", "EKG testing", "Rapid lab results", "Minor surgical procedures"]
      }
    ]
  },
  {
    id: "palliative-care",
    title: "Palliative Care",
    subtitle: "Comfort & Quality of Life",
    description: "Extra support when facing a serious illness. Relief from pain and symptoms, available at any stage, alongside your regular treatment.",
    icon: HandHeart,
    color: "secondary",
    hubHref: "/palliative-care",
    subPages: [
      {
        title: "What Is Palliative Care?",
        description: "Not hospice. An extra layer of support for serious illness, available from diagnosis, alongside treatment",
        href: "/palliative-care/about-palliative-care",
        detailNote: "Palliative care is not hospice. It's an extra layer of medical support available at any stage of a serious illness, alongside your regular treatment. The goal is to improve quality of life for both patients and families."
      },
      {
        title: "Symptom Relief",
        description: "Help with pain, breathing difficulty, fatigue, nausea, anxiety, sleep problems & appetite loss",
        href: "/palliative-care/symptom-relief",
        details: ["Chronic pain", "Breathing difficulty", "Fatigue", "Nausea", "Anxiety & depression", "Sleep problems", "Appetite loss", "Medication side effects"]
      },
      {
        title: "Support for Patients & Families",
        description: "Guidance through serious illness, caregiver support, what to expect conversations & emotional care",
        href: "/palliative-care/patient-family-support",
        details: ["Caregiver guidance", "Emotional support", "What to expect conversations", "Family meetings", "Stress management", "Community resources"]
      },
      {
        title: "Planning & Transitions",
        description: "Advance directives, living wills, goals of care discussions & hospice coordination when appropriate",
        href: "/palliative-care/planning-transitions",
        details: ["Advance directives", "Living wills", "Goals of care discussions", "Hospice coordination", "Care transitions", "Insurance navigation"]
      }
    ]
  },
  {
    id: "locations",
    title: "Locations",
    subtitle: "Serving Southwest Florida",
    description: "Providing primary care and palliative care across Collier County and Lee County, close to home, wherever you live.",
    icon: MapPin,
    color: "primary",
    subPages: [
      {
        title: "Naples",
        description: "Our home base: primary care & palliative care on Tamiami Trail North",
        href: "/locations/naples",
        detailNote: "Our home base on Tamiami Trail North. Full primary care and palliative care services for the Naples community."
      },
      {
        title: "Marco Island",
        description: "Convenient care for Marco Island residents, just minutes away",
        href: "/locations/marco-island",
        detailNote: "Just 25 minutes from Marco Island via Collier Blvd. Specialized care for the island's active senior community."
      },
      {
        title: "Golden Gate",
        description: "Serving the Golden Gate and Golden Gate Estates communities",
        href: "/locations/golden-gate",
        detailNote: "15 minutes away via Golden Gate Parkway. Affordable, personal healthcare for Golden Gate families."
      },
      {
        title: "Immokalee",
        description: "Quality healthcare accessible to the Immokalee community",
        href: "/locations/immokalee",
        detailNote: "35 minutes via Immokalee Road. Quality care with dignity and respect for every patient."
      },
      {
        title: "Bonita Springs",
        description: "Primary care & palliative care for Bonita Springs families",
        href: "/locations/bonita-springs",
        detailNote: "Just 15 minutes south on US-41. Your next-door neighbor for comprehensive medical care."
      },
      {
        title: "Estero",
        description: "Serving the growing Estero community with comprehensive care",
        href: "/locations/estero",
        detailNote: "20 minutes south on US-41. Expert care for Estero's growing community of families and retirees."
      },
      {
        title: "Fort Myers",
        description: "Expert medical care within easy reach of Fort Myers",
        href: "/locations/fort-myers",
        detailNote: "30 minutes via I-75 South. Worth the drive for unhurried, personal medical care."
      },
      {
        title: "Cape Coral",
        description: "Trusted primary care & palliative care for Cape Coral residents",
        href: "/locations/cape-coral",
        detailNote: "40 minutes via I-75 South. A refreshing alternative to overcrowded Cape Coral practices."
      }
    ]
  },
  {
    id: "insurance",
    title: "Insurance",
    subtitle: "Coverage & Medicare",
    description: "We accept most major insurance plans and Medicare, and we verify your coverage before your visit.",
    icon: Shield,
    color: "primary",
    hubHref: "/insurance-accepted",
    subPages: [
      {
        title: "Insurance Plans We Accept",
        description: "Humana, Aetna, Cigna, Medicare & Medicaid, verified before your visit",
        href: "/insurance-accepted",
        detailNote: "In-network for Aetna, Cigna, Original Medicare and Florida Medicaid. With Humana Medicare Advantage we are in-network for palliative care and out-of-network for primary care. Call and we'll verify your specific plan before you book."
      },
      {
        title: "Medicare & Medicare Advantage",
        description: "Annual Wellness Visits, geriatric-focused care and medication review for Medicare patients",
        href: "/medicare",
        detailNote: "We accept Medicare and Medicare Advantage. Annual Wellness Visits, geriatric assessments and medication review, with the time older patients deserve."
      }
    ]
  }
];

export const standaloneLinks: NavLink[] = [
  {
    id: "about",
    title: "About",
    href: "/about",
    icon: UserCircle,
  },
  {
    id: "new-patients",
    title: "New Patients",
    href: "/new-patients",
    icon: FirstAid,
  },
  {
    id: "family-support",
    title: "Family Support",
    href: "/palliative-care/patient-family-support",
    icon: Users,
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
    icon: Phone,
  },
];
