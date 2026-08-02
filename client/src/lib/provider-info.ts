export interface ProviderCredential {
  type: "NPI" | "FL_MEDICAL_LICENSE";
  label: string;
  value: string;
  verifyUrl?: string;
}

export const PROVIDER_NAME = "Dr. Addys Reve, MD";
export const PROVIDER_LEGAL_NAME = "Addys Del Carmen Reve Urgelles, MD";

export const PROVIDER_NPI: ProviderCredential = {
  type: "NPI",
  label: "NPI",
  value: "1205414729",
  verifyUrl: "https://npiregistry.cms.hhs.gov/provider-view/1205414729",
};

export const PROVIDER_FL_LICENSE: ProviderCredential = {
  type: "FL_MEDICAL_LICENSE",
  label: "FL Medical License",
  value: "ME163785",
  verifyUrl: "https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders",
};

export const PROVIDER_CREDENTIALS: ProviderCredential[] = [
  PROVIDER_NPI,
  PROVIDER_FL_LICENSE,
];

export const ACCEPTED_INSURANCE_PLANS: string[] = [
  "Medicare",
  "Medicaid",
  "Aetna",
  "Cigna",
  "Humana",
];

export const TESTIMONIALS_FTC_DISCLAIMER =
  "Reviews represent individual experiences. Individual results may vary.";

export const GOOGLE_RATING = {
  value: "4.9",
  source: "Google",
} as const;
