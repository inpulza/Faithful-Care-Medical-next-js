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
  const expectedSpecialties = [
    { "@id": "https://schema.org/PrimaryCare" },
    { "@id": "https://schema.org/Geriatric" },
    { "@id": "https://schema.org/Gynecologic" },
  ];
  assert.deepEqual(clinic.medicalSpecialty, expectedSpecialties);
  assert.deepEqual(physician.medicalSpecialty, expectedSpecialties);
  assert.equal(physician["@type"], "IndividualPhysician");
  assert.deepEqual(physician.practicesAt, { "@id": clinic["@id"] });
  assert.equal(physician.usNPI, "1205414729");
  assert.equal("worksFor" in physician, false);
  assert.equal("givenName" in physician, false);
  assert.deepEqual(organization.founder, { "@id": physician["@id"] });
  assert.doesNotMatch(physician.description, /board-certified/i);
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
  assert.equal(service["@id"], "https://faithfulcaremedical.com/primary-care/checkups-prevention#service");
  assert.equal("inLanguage" in service, false);
  assert.deepEqual(service.provider, { "@id": "https://faithfulcaremedical.com/#clinic" });
  assert.deepEqual(service.areaServed, medicalClinicSchema().areaServed);
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
  const insurance = insuranceLpClinicSchema();

  assert.equal(insurance["@type"], "Service");
  assert.deepEqual(insurance.provider, { "@id": "https://faithfulcaremedical.com/#clinic" });
  assert.deepEqual(insurance.areaServed, medicalClinicSchema().areaServed);
  assert.equal("acceptsInsurance" in insurance, false);
  assert.equal("medicalSpecialty" in insurance, false);
  assert.equal("keywords" in insurance, false);
  assert.equal(insurance.availableChannel.servicePhone["@type"], "ContactPoint");
});
