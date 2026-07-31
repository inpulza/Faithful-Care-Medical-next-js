import assert from "node:assert/strict";
import { test } from "node:test";

const schemasUrl = new URL("../client/src/lib/schemas.ts", import.meta.url);
const {
  organizationSchema,
  medicalClinicSchema,
  physicianSchema,
  medicalServiceSchema,
  insuranceLpClinicSchema,
  locationPageSchema,
} = await import(schemasUrl.href);

test("base organization and clinic schemas publish stable, valid identity signals", () => {
  const organization = organizationSchema();
  const clinic = medicalClinicSchema();
  const physician = physicianSchema();

  assert.equal(organization["@id"], "https://faithfulcaremedical.com/#organization");
  assert.equal(organization.logo, "https://faithfulcaremedical.com/images/faithful-care-logo.webp");
  assert.equal(clinic["@id"], "https://faithfulcaremedical.com/#clinic");
  assert.equal(clinic.logo, "https://faithfulcaremedical.com/images/faithful-care-logo.webp");
  assert.deepEqual(clinic.parentOrganization, { "@id": organization["@id"] });
  assert.equal(clinic.currenciesAccepted, "USD");
  assert.equal("acceptsInsurance" in clinic, false);
  assert.equal(clinic.medicalSpecialty.includes("PalliativeCare"), false);
  assert.equal("availableLanguage" in clinic, false);
  assert.equal("availableLanguage" in physician, false);
  assert.deepEqual(clinic.contactPoint, { "@id": "https://faithfulcaremedical.com/#appointments" });
  assert.deepEqual(physician.contactPoint, { "@id": "https://faithfulcaremedical.com/#appointments" });
  assert.ok(
    clinic.availableService.every((service) =>
      ["MedicalProcedure", "MedicalTest", "MedicalTherapy"].includes(service["@type"]),
    ),
  );
  assert.ok(
    physician.availableService.every((service) =>
      ["MedicalProcedure", "MedicalTest", "MedicalTherapy"].includes(service["@type"]),
    ),
  );
});

test("service schemas use Service properties rather than invalid MedicalTherapy properties", () => {
  const service = medicalServiceSchema({
    name: "Checkups & Prevention",
    description: "Annual physicals and preventive care.",
    url: "/primary-care/checkups-prevention",
    serviceType: "Preventive primary care",
    category: "Primary Care",
  });

  assert.equal(service["@type"], "Service");
  assert.deepEqual(service.provider, { "@id": "https://faithfulcaremedical.com/#clinic" });
  assert.deepEqual(service.availableChannel.servicePhone, {
    "@type": "ContactPoint",
    telephone: "+1-239-423-0205",
  });
  assert.deepEqual(service.availableChannel.serviceSmsNumber, {
    "@type": "ContactPoint",
    telephone: "+1-239-423-0205",
  });
});

test("location pages describe service areas, not fictional physical branches", () => {
  const serviceArea = locationPageSchema({
    cityName: "Marco Island",
    description: "Primary care serving Marco Island from the Naples clinic.",
    url: "/locations/marco-island",
  });

  assert.equal(serviceArea["@type"], "Service");
  assert.match(serviceArea["@id"], /#service-area-marco-island$/);
  assert.deepEqual(serviceArea.provider, { "@id": "https://faithfulcaremedical.com/#clinic" });
  assert.equal("address" in serviceArea, false);
  assert.equal("geo" in serviceArea, false);
  assert.equal("openingHoursSpecification" in serviceArea, false);
  assert.equal(serviceArea.availableChannel.servicePhone["@type"], "ContactPoint");
});

test("insurance page schema is a coverage-verification service without unsupported clinic properties", () => {
  const insurance = insuranceLpClinicSchema({
    acceptedNetworks: ["Medicare", "Aetna"],
  });

  assert.equal(insurance["@type"], "Service");
  assert.deepEqual(insurance.provider, { "@id": "https://faithfulcaremedical.com/#clinic" });
  assert.equal("acceptsInsurance" in insurance, false);
  assert.equal("medicalSpecialty" in insurance, false);
  assert.equal(insurance.availableChannel.servicePhone["@type"], "ContactPoint");
});
