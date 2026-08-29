import { CONDITION_ROUTE_DATA } from "./condition-routes";

export const DOMAIN = "https://faithfulcaremedical.com";
export const BRAND = "Faithful Care Medical Services";
export const DEFAULT_OG_IMAGE = `${DOMAIN}/og-image.png`;

export interface PageSeo {
  title: string;
  description: string;
  dateModified?: string;
}

const conditionSeoMap = Object.fromEntries(
  Object.entries(CONDITION_ROUTE_DATA).map(([path, route]) => [
    path,
    { title: route.title, description: route.description },
  ]),
) as Record<keyof typeof CONDITION_ROUTE_DATA, PageSeo>;

export const seoMap = {
  "/": {
    title: "Primary & Palliative Care in Naples, FL | Faithful Care",
    description: "Primary and palliative care in Naples, FL. Same-day visits, chronic disease management, and compassionate support for adults and seniors. New patients welcome.",
  },
  "/contact": {
    title: "Contact Us | Faithful Care Medical Services | Naples, FL",
    description: "Schedule an appointment at Faithful Care in Naples, FL. Call, email, or visit us on Tamiami Trail N. New patients welcome. Same-day visits available.",
  },
  "/insurance-accepted": {
    title: "Doctor That Accepts Humana, Aetna & More | Naples FL",
    description: "Lost your 2026 Humana or Aetna plan? In-network for Aetna primary care and Humana palliative care in Naples FL. Same-week visits. Call (239) 423-0205.",
  },
  "/direct-primary-care": {
    title: "Direct Primary Care in Naples, FL",
    description: "Explore Faithful Care's Direct Primary Care membership in Naples, including written terms, included primary care services, exclusions, and how to ask about enrollment.",
  },
  "/about": {
    title: "Dr. Addys Reve, MD | Primary Care Naples, FL",
    description: "Meet Dr. Addys Reve, MD. Unhurried, bilingual primary care for adults and seniors in Naples, Florida.",
  },
  "/reviews": {
    title: "Patient Reviews | Faithful Care Naples",
    description: "See what patients say about Faithful Care Medical Services in Naples, FL. Rated 4.9 stars on Google.",
  },
  "/new-patients": {
    title: "Accepting New Patients | Naples Primary Care",
    description: "Now accepting new adult and senior patients in Naples, FL. See what to bring and what to expect. Same-week appointments.",
  },
  "/medicare": {
    title: "Medicare Primary Care Doctor in Naples, FL",
    description: "Medicare and Medicare Advantage primary care in Naples. Annual Wellness Visits, geriatric care and medication review.",
  },
  "/primary-care": {
    title: "Primary Care Doctor in Naples, FL: New Patients",
    description: "Primary care for adults and seniors in Naples. Same-day visits, on-site labs, most insurances and Medicare. Accepting new patients.",
  },
  "/palliative-care": {
    title: "Palliative Care in Naples, FL",
    description: "Comfort-focused care for serious illness in Naples. Symptom relief and family support, alongside your specialists. Not hospice.",
  },
  "/primary-care/checkups-prevention": {
    title: "Annual Checkups & Preventive Care | Naples, FL",
    description: "Annual physicals, Medicare Wellness Visits, cancer screenings, immunizations, and heart health checks in Naples, FL. Catch problems early at Faithful Care.",
  },
  "/primary-care/chronic-disease": {
    title: "Chronic Disease Management: Diabetes & Heart | Naples, FL",
    description: "Ongoing care for diabetes, high blood pressure, heart disease, COPD, kidney disease, and thyroid issues in Naples, FL. No endless specialist referrals.",
  },
  "/primary-care/same-day-visits": {
    title: "Same-Day & Urgent Visits | Walk-In Doctor Naples, FL",
    description: "Sick today? Get seen today. Same-day visits for infections, dizziness, headaches, and minor injuries in Naples, FL. No ER needed at Faithful Care.",
  },
  "/primary-care/womens-health": {
    title: "Women's Health: Pap Smears & Menopause | Naples, FL",
    description: "Pap smears, breast exams, contraceptive counseling, menopause support, and STI evaluation in Naples, FL. Private women's healthcare at Faithful Care.",
  },
  "/primary-care/senior-care": {
    title: "Senior & Geriatric Care for Older Adults | Naples, FL",
    description: "Geriatric assessments, fall prevention, memory screening, medication review, and caregiver support for seniors in Naples, FL. Stay independent longer.",
  },
  "/primary-care/procedures-diagnostics": {
    title: "In-Office Procedures, EKG & Lab Tests | Naples, FL",
    description: "Joint injections, skin biopsies, wound care, EKG testing, and rapid lab results in Naples, FL. Advanced care without a hospital visit at Faithful Care.",
  },
  "/palliative-care/about-palliative-care": {
    title: "What Is Palliative Care? Not Hospice | Naples, FL",
    description: "Palliative care is extra support for people with serious illnesses. It relieves symptoms and stress at any stage, alongside your treatment. Naples, FL.",
  },
  "/palliative-care/symptom-relief": {
    title: "Pain & Symptom Relief | Palliative Care | Naples, FL",
    description: "Help with chronic pain, breathing difficulty, fatigue, nausea, anxiety, and sleep problems. Palliative symptom relief at Faithful Care, Naples, FL.",
  },
  "/palliative-care/patient-family-support": {
    title: "Patient & Family Support | Caregiver Help | Naples, FL",
    description: "Guidance through serious illness for patients and families. Caregiver support, honest conversations, and help with difficult decisions in Naples, FL.",
  },
  "/palliative-care/planning-transitions": {
    title: "Advance Care Planning & Hospice Transitions | Naples, FL",
    description: "Advance directives, living wills, goals of care discussions, and hospice coordination. Plan with confidence at Faithful Care, Naples, FL.",
  },
  ...conditionSeoMap,
  "/locations/naples": {
    title: "Naples, FL Primary Care & Palliative Care | Faithful Care",
    description: "Your medical home on Tamiami Trail N. in Naples, FL. Complete primary care and palliative care for adults and seniors. Same-day visits available.",
  },
  "/locations/marco-island": {
    title: "Primary Care Doctor Near Marco Island, FL | Faithful Care",
    description: "Marco Island: Faithful Care in Naples, 25 min via Collier Blvd. Geriatric care, chronic disease management, and palliative support. Snowbirds welcome.",
  },
  "/locations/golden-gate": {
    title: "Doctor in Golden Gate & Golden Gate Estates | Faithful Care",
    description: "Affordable primary care, chronic disease management, and palliative care for Golden Gate families. 15 min via Golden Gate Pkwy. Se habla espa\u00f1ol.",
  },
  "/locations/immokalee": {
    title: "Doctor for Immokalee Families, FL | Faithful Care",
    description: "Primary care and palliative care for Immokalee and eastern Collier County. Affordable, accessible, and respectful. Medicare and Medicaid accepted.",
  },
  "/locations/bonita-springs": {
    title: "Primary Care in Bonita Springs, FL | Faithful Care",
    description: "Primary and palliative care for Bonita Springs adults and seniors. 15 min south on US-41. Bonita Bay, Pelican Landing. Same-day visits available.",
  },
  "/locations/estero": {
    title: "Primary Care Doctor Near Estero, FL | Faithful Care",
    description: "Primary care and palliative care for Estero residents. The Brooks, Grandezza, Miromar Lakes, Coconut Point. 20 min south on US-41. Medicare accepted.",
  },
  "/locations/fort-myers": {
    title: "Primary Care Doctor Near Fort Myers, FL | Faithful Care",
    description: "Fort Myers: Faithful Care in Naples, 35 min south on I-75. Primary care and palliative care with personal attention. Same-day visits. Medicare accepted.",
  },
  "/locations/cape-coral": {
    title: "Doctor for Cape Coral Patients, FL | Faithful Care",
    description: "Cape Coral families: unhurried visits and same-day sick care when available at Faithful Care in Naples, about 45 min via I-75. Call to verify your insurance plan.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Faithful Care Medical Services",
    description: "How Faithful Care collects, uses, and protects your personal information online. Your rights under HIPAA, FDBR, CCPA and other US privacy laws.",
    dateModified: "2026-08-03",
  },
  "/notice-of-privacy-practices": {
    title: "HIPAA Notice of Privacy Practices | Faithful Care",
    description: "How protected health information is used and disclosed at Faithful Care Medical Services in Naples, FL, and your rights under federal HIPAA law.",
    dateModified: "2026-01-01",
  },
  "/terms-of-use": {
    title: "Terms of Use | Faithful Care Medical Services",
    description: "Terms governing your use of the Faithful Care Medical Services website. Acceptable use, disclaimers, limitation of liability, and Florida governing law.",
    dateModified: "2026-01-01",
  },
  "/medical-disclaimer": {
    title: "Medical Disclaimer | Faithful Care Medical Services",
    description: "Information on the Faithful Care website is educational and not a substitute for professional medical advice. In a medical emergency, call 911 immediately.",
  },
  "/accessibility-statement": {
    title: "Accessibility Statement | Faithful Care Medical Services",
    description: "Our commitment to WCAG 2.1 Level AA accessibility on faithfulcaremedical.com, alternative ways to reach us, and how to report accessibility issues.",
    dateModified: "2026-01-01",
  },
  "/es": {
    title: "Atención Primaria y Cuidados Paliativos en Naples",
    description: "Consultorio médico en Naples para adultos y mayores. Atención en español, citas el mismo día y laboratorio en la clínica. Llame hoy.",
  },
  "/es/medico-de-familia-naples": {
    title: "Médico de Familia en Naples que Habla Español",
    description: "Médico de familia en Naples que le atiende en español. Citas el mismo día, laboratorio en la clínica, aceptamos Medicare y seguros. Pacientes nuevos.",
  },
  "/es/cuidados-paliativos-naples": {
    title: "Cuidados Paliativos en Naples, FL",
    description: "Alivio de síntomas y acompañamiento en enfermedades serias, en español. No es hospicio: puede seguir con sus tratamientos.",
  },
  "/es/seguros-y-medicare": {
    title: "Seguros que Aceptamos y Medicare",
    description: "Aceptamos Humana, Aetna, Cigna, Medicare y Medicaid en Naples. Verificamos su cobertura antes de la cita.",
  },
  "/es/contacto": {
    title: "Contacto: Faithful Care Naples",
    description: "Dirección, teléfono y horario de Faithful Care en North Naples. Atendemos en español. Llame para pedir su cita.",
  },
  "/es/pacientes-nuevos": {
    title: "Pacientes Nuevos en Naples | Faithful Care",
    description: "Faithful Care acepta pacientes adultos y mayores nuevos en Naples. Sepa qué traer, cómo verificar su seguro y qué esperar en su primera consulta.",
  },
} satisfies Record<string, PageSeo>;

export interface HreflangPair {
  en: string;
  es: string;
}

export const HREFLANG_PAIRS: HreflangPair[] = [
  { en: "/", es: "/es" },
  { en: "/primary-care", es: "/es/medico-de-familia-naples" },
  { en: "/palliative-care", es: "/es/cuidados-paliativos-naples" },
  { en: "/insurance-accepted", es: "/es/seguros-y-medicare" },
  { en: "/contact", es: "/es/contacto" },
  { en: "/new-patients", es: "/es/pacientes-nuevos" },
];

export function hreflangPairForPath(path: string): HreflangPair | null {
  const pair = HREFLANG_PAIRS.find((p) => p.en === path || p.es === path);
  if (!pair) return null;
  if (!(pair.en in seoMap) || !(pair.es in seoMap)) return null;
  return pair;
}

export function isSpanishPath(path: string): boolean {
  return path === "/es" || path.startsWith("/es/");
}

export const LEGAL_PAGES = new Set<string>([
  "/privacy-policy",
  "/notice-of-privacy-practices",
  "/terms-of-use",
  "/medical-disclaimer",
  "/accessibility-statement",
]);
