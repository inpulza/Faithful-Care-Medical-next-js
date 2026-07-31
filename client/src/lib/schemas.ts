import { PROVIDER_NPI, PROVIDER_FL_LICENSE } from "./provider-info";

const DOMAIN = "https://faithfulcaremedical.com";
const BUSINESS_NAME = "Faithful Care Medical Services";
const PHONE = "+1-239-423-0205";
const ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "9955 Tamiami Trail N. Suite 2",
  addressLocality: "Naples",
  addressRegion: "FL",
  postalCode: "34108",
  addressCountry: "US",
};
const GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 26.2617577,
  longitude: -81.8017368,
};
const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Faithful+Care+Medical+Services/@26.2617577,-81.8017368,17z/data=!3m1!4b1!4m6!3m5!1s0x88db1ff2a8a2eaa7:0x842c66a33d23b65d!8m2!3d26.2617577!4d-81.8017368!16s%2Fg%2F11n9pz9k2v";
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: ["Saturday"],
    opens: "08:30",
    closes: "12:00",
  },
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}/#organization`,
    name: BUSINESS_NAME,
    url: DOMAIN,
    logo: `${DOMAIN}/images/faithful-care-logo.webp`,
    image: `${DOMAIN}/og-image.png`,
    telephone: PHONE,
    address: ADDRESS,
    contactPoint: {
      "@type": "ContactPoint",
      "@id": `${DOMAIN}/#appointments`,
      telephone: PHONE,
      contactType: "appointments",
      areaServed: "US",
      availableLanguage: [
        { "@type": "Language", name: "English", alternateName: "en" },
        { "@type": "Language", name: "Spanish", alternateName: "es" },
      ],
    },
    sameAs: [
      GOOGLE_MAPS_PLACE_URL,
    ],
    founder: {
      "@type": "Person",
      "@id": `${DOMAIN}/#physician`,
      name: "Dr. Addys Reve",
    },
  };
}

export function medicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${DOMAIN}/#clinic`,
    name: BUSINESS_NAME,
    url: DOMAIN,
    logo: `${DOMAIN}/images/faithful-care-logo.webp`,
    image: `${DOMAIN}/og-image.png`,
    description:
      "Primary care and palliative care clinic in Naples, FL serving adults and seniors across Collier and Lee counties. Same-day appointments, chronic disease management, and compassionate support.",
    telephone: PHONE,
    address: ADDRESS,
    geo: GEO,
    areaServed: [
      { "@type": "City", name: "Naples" },
      { "@type": "City", name: "Marco Island" },
      { "@type": "City", name: "Golden Gate" },
      { "@type": "City", name: "Immokalee" },
      { "@type": "City", name: "Bonita Springs" },
      { "@type": "City", name: "Estero" },
      { "@type": "City", name: "Fort Myers" },
      { "@type": "City", name: "Cape Coral" },
    ],
    medicalSpecialty: ["PrimaryCare", "Geriatric", "Gynecologic"],
    availableService: [
      { "@type": "MedicalTherapy", name: "Primary Care Services", url: `${DOMAIN}/primary-care/checkups-prevention` },
      { "@type": "MedicalTherapy", name: "Palliative Care Services", url: `${DOMAIN}/palliative-care/about-palliative-care` },
      { "@type": "MedicalTherapy", name: "Annual Medicare Wellness Visits & Physicals", url: `${DOMAIN}/primary-care/checkups-prevention` },
      { "@type": "MedicalTherapy", name: "Chronic Disease Management", url: `${DOMAIN}/primary-care/chronic-disease` },
      { "@type": "MedicalTherapy", name: "Same-Day Sick Visits & Urgent Care", url: `${DOMAIN}/primary-care/same-day-visits` },
      { "@type": "MedicalTherapy", name: "Medicare Wellness & Senior Care", url: `${DOMAIN}/primary-care/senior-care` },
      { "@type": "MedicalTherapy", name: "Women's Health & Preventive Care", url: `${DOMAIN}/primary-care/womens-health` },
      { "@type": "MedicalTherapy", name: "Pain Management & Comfort Care", url: `${DOMAIN}/palliative-care/symptom-relief` },
      { "@type": "MedicalProcedure", name: "In-Office Procedures & Diagnostics", url: `${DOMAIN}/primary-care/procedures-diagnostics` },
    ],
    hasMap: GOOGLE_MAPS_PLACE_URL,
    openingHoursSpecification: OPENING_HOURS,
    paymentAccepted: ["Cash", "Credit Card", "Health Insurance", "HSA"],
    currenciesAccepted: "USD",
    priceRange: "$$",
    contactPoint: { "@id": `${DOMAIN}/#appointments` },
    isAcceptingNewPatients: true,
    parentOrganization: { "@id": `${DOMAIN}/#organization` },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DOMAIN}/#website`,
    name: BUSINESS_NAME,
    url: DOMAIN,
    publisher: { "@id": `${DOMAIN}/#organization` },
    inLanguage: "en-US",
  };
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${DOMAIN}/#physician`,
    name: "Dr. Addys Reve",
    givenName: "Addys",
    familyName: "Reve",
    honorificPrefix: "Dr.",
    honorificSuffix: "MD",
    jobTitle: "Founder and Primary Care Physician",
    description:
      "Board-certified primary care physician specializing in adult and geriatric medicine. Founder of Faithful Care Medical Services in Naples, FL.",
    image: `${DOMAIN}/images/dr-addys-reve.webp`,
    telephone: PHONE,
    medicalSpecialty: ["PrimaryCare", "Geriatric", "Gynecologic"],
    availableService: [
      { "@type": "MedicalTherapy", name: "Primary Care Services", url: `${DOMAIN}/primary-care/checkups-prevention` },
      { "@type": "MedicalTherapy", name: "Palliative Care Services", url: `${DOMAIN}/palliative-care/about-palliative-care` },
      { "@type": "MedicalTherapy", name: "Chronic Disease Management", url: `${DOMAIN}/primary-care/chronic-disease` },
    ],
    worksFor: { "@id": `${DOMAIN}/#organization` },
    address: ADDRESS,
    geo: GEO,
    contactPoint: { "@id": `${DOMAIN}/#appointments` },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "NPI",
        name: "National Provider Identifier",
        identifier: PROVIDER_NPI.value,
        recognizedBy: {
          "@type": "Organization",
          name: "Centers for Medicare & Medicaid Services",
          url: PROVIDER_NPI.verifyUrl,
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Florida Medical License",
        identifier: PROVIDER_FL_LICENSE.value,
        recognizedBy: {
          "@type": "Organization",
          name: "Florida Department of Health, Medical Quality Assurance",
          url: PROVIDER_FL_LICENSE.verifyUrl,
        },
      },
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${DOMAIN}${item.path}`,
    })),
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function medicalServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  category: "Primary Care" | "Palliative Care";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${DOMAIN}${opts.url}`,
    serviceType: opts.serviceType,
    provider: { "@id": `${DOMAIN}/#clinic` },
    areaServed: {
      "@type": "State",
      name: "Florida",
    },
    category: opts.category,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${DOMAIN}/contact`,
      servicePhone: { "@type": "ContactPoint", telephone: PHONE },
      serviceSmsNumber: { "@type": "ContactPoint", telephone: PHONE },
    },
  };
}

export function insuranceLpClinicSchema(opts: {
  acceptedNetworks: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${DOMAIN}/insurance-accepted#insurance-verification`,
    name: "Insurance coverage and benefits verification",
    description:
      "Insurance coverage verification for patients of Faithful Care Medical Services in Naples, Florida.",
    url: `${DOMAIN}/insurance-accepted`,
    serviceType: "Insurance coverage verification",
    category: "Health insurance",
    provider: { "@id": `${DOMAIN}/#clinic` },
    areaServed: { "@type": "State", name: "Florida" },
    keywords: opts.acceptedNetworks,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${DOMAIN}/contact`,
      servicePhone: { "@type": "ContactPoint", telephone: PHONE },
    },
  };
}

export function locationPageSchema(opts: {
  cityName: string;
  description: string;
  url: string;
}) {
  const slug = opts.url.replace("/locations/", "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${DOMAIN}/#service-area-${slug}`,
    name: `${BUSINESS_NAME} service area - ${opts.cityName}`,
    description: opts.description,
    url: `${DOMAIN}${opts.url}`,
    serviceType: "Primary and palliative care",
    category: "Medical care service area",
    provider: { "@id": `${DOMAIN}/#clinic` },
    areaServed: {
      "@type": "City",
      name: opts.cityName,
    },
    image: `${DOMAIN}/images/dr-addys-reve.webp`,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${DOMAIN}/contact`,
      servicePhone: { "@type": "ContactPoint", telephone: PHONE },
    },
  };
}
