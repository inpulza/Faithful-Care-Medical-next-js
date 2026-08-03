export const CONSENT_STORAGE_KEY = "fcms_consent_v2";
export const CONSENT_VERSION = 2;

// Public browser identifiers verified against the historical production site.
export const GA4_MEASUREMENT_ID = "G-VZGPSTBKE2";
export const CLARITY_PROJECT_ID = "vypd4irtq1";

export interface ConsentCategories {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
}

export interface StoredConsent {
  version: number;
  decidedAt: string;
  state: ConsentCategories;
}

export const DEFAULT_DENIED: ConsentCategories = {
  necessary: true,
  analytics: false,
  advertising: false,
  personalization: false,
};

export const ALL_GRANTED: ConsentCategories = {
  necessary: true,
  analytics: true,
  advertising: true,
  personalization: true,
};
