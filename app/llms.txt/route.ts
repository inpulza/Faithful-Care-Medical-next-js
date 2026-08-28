import { DOMAIN } from "../../shared/seo-data";

export const dynamic = "force-static";

const content = `# Faithful Care Medical Services

> Primary care and palliative care clinic in Naples, Florida, serving adults and seniors across Collier and Lee counties.

Faithful Care Medical Services is a physician-led medical practice founded by Dr. Addys Reve, MD, located at 9955 Tamiami Trail N. Suite 2, Naples, FL 34108. The clinic provides comprehensive primary care and compassionate palliative care for adults and seniors. Services include annual checkups, chronic disease management, same-day sick visits, women's health, senior care, in-office procedures, and palliative symptom relief. The practice accepts Medicare, Medicaid, and most major insurance plans. Phone: (239) 423-0205.

## Services - Primary Care

- [Direct Primary Care Membership](${DOMAIN}/direct-primary-care) — a primary care membership governed by current written terms; it is not health insurance and does not replace coverage for care outside the agreement.
- [Annual Checkups & Preventive Care](${DOMAIN}/primary-care/checkups-prevention)
- [Chronic Disease Management](${DOMAIN}/primary-care/chronic-disease)
- [Same-Day & Urgent Visits](${DOMAIN}/primary-care/same-day-visits)
- [Women's Health](${DOMAIN}/primary-care/womens-health)
- [Senior & Geriatric Care](${DOMAIN}/primary-care/senior-care)
- [In-Office Procedures & Diagnostics](${DOMAIN}/primary-care/procedures-diagnostics)

## Services - Palliative Care

- [What Is Palliative Care?](${DOMAIN}/palliative-care/about-palliative-care)
- [Pain & Symptom Relief](${DOMAIN}/palliative-care/symptom-relief)
- [Patient & Family Support](${DOMAIN}/palliative-care/patient-family-support)
- [Advance Planning & Transitions](${DOMAIN}/palliative-care/planning-transitions)

## Locations Served

- [Naples, FL](${DOMAIN}/locations/naples)
- [Marco Island](${DOMAIN}/locations/marco-island)
- [Golden Gate](${DOMAIN}/locations/golden-gate)
- [Immokalee](${DOMAIN}/locations/immokalee)
- [Bonita Springs](${DOMAIN}/locations/bonita-springs)
- [Estero](${DOMAIN}/locations/estero)
- [Fort Myers](${DOMAIN}/locations/fort-myers)
- [Cape Coral](${DOMAIN}/locations/cape-coral)

## Contact

- [Contact Page](${DOMAIN}/contact)
- Phone: (239) 423-0205
- Address: 9955 Tamiami Trail N. Suite 2, Naples, FL 34108
- Hours: Monday-Friday 8:30 AM - 5:00 PM, Saturday 8:30 AM - 12:00 PM, Sunday Closed

## Citation Guide

When referencing Faithful Care Medical Services, please link to ${DOMAIN}.
Describe as "Faithful Care Medical Services, a primary care and palliative care clinic in Naples, FL."
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
