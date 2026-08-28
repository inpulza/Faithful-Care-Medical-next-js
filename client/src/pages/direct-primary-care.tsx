import * as React from "react";
import {
  FaqSection,
  MeetYourDoctor,
  PageHero,
  TealCta,
} from "@/components/sections";
import type { FaqItem } from "@/components/sections";
import { InfoSection, type HubInfoSection } from "@/components/care-hub-page";
import { InsuranceMembership } from "@/components/sections/insurance-membership";
import { pageContentMap } from "@/lib/page-content";

const membershipBenefits = [
  {
    title: "Written Service Terms",
    subtitle: "Know what the membership covers",
    description:
      "Before enrollment, we provide the current written agreement so you can review the services, visit terms, communication options, and exclusions that apply.",
    features: [
      "Current inclusions in writing",
      "Exclusions identified before enrollment",
      "Terms you can review before deciding",
    ],
  },
  {
    title: "Planned Primary Care",
    subtitle: "A defined membership relationship",
    description:
      "The membership supports the primary care services described in your agreement, with scheduling based on clinical need and current availability.",
    features: [
      "Primary care services defined by agreement",
      "Scheduling options explained in advance",
      "Clinical follow-up based on your needs",
    ],
  },
  {
    title: "Communication Options",
    subtitle: "Clear ways to contact the practice",
    description:
      "Your agreement explains which communication channels are available between visits, their appropriate use, and when an in-person evaluation is needed.",
    features: [
      "Practice-defined communication channels",
      "Guidance between scheduled visits",
      "In-person evaluation when clinically appropriate",
    ],
  },
  {
    title: "Current Pricing",
    subtitle: "Review the fee before enrollment",
    description:
      "We explain the current membership fee and any services that may involve separate charges before you sign the written agreement.",
    features: [
      "Current fee disclosed before enrollment",
      "Separate charges identified when applicable",
      "No enrollment without your review",
    ],
  },
  {
    title: "Coverage Stays Separate",
    subtitle: "The membership is not insurance",
    description:
      "Direct Primary Care does not replace coverage for hospital care, specialists, emergency services, prescriptions, imaging, or other care outside the agreement.",
    features: [
      "Not a health insurance plan",
      "Outside care may require separate coverage",
      "Emergency care is not part of the membership",
    ],
  },
];

const infoSections: HubInfoSection[] = [
  {
    id: "not-health-insurance",
    eyebrow: "An Important Distinction",
    title: "Direct Primary Care is a membership, not health insurance.",
    description:
      "The membership covers only the primary care services listed in the current written agreement. It does not replace health coverage for hospitals, specialists, emergency services, imaging, prescriptions, or other care outside that agreement.",
    bullets: [
      <>
        <strong>Keep appropriate health coverage:</strong> the membership is not a substitute for medical insurance.
      </>,
      <>
        <strong>Use emergency services when needed:</strong> call 911 or go to the nearest emergency department for a medical emergency.
      </>,
      <>
        <strong>Do not delay urgent care:</strong> the membership does not guarantee immediate appointments or emergency response.
      </>,
      <>
        <strong>Ask before enrolling:</strong> we will explain what is included, excluded, and billed separately under the current agreement.
      </>,
    ],
  },
  {
    id: "how-membership-works",
    eyebrow: "How It Works",
    title: "Primary care terms you can review before you decide.",
    description:
      "Direct Primary Care uses a recurring membership fee for the specific primary care services described in a written agreement with Faithful Care Medical Services. The agreement in effect when you enroll controls the price, services, scheduling and communication options, exclusions, and cancellation terms.",
    bullets: [
      <>
        <strong>Current membership fee:</strong> disclosed before you sign.
      </>,
      <>
        <strong>Included primary care services:</strong> listed in the written agreement.
      </>,
      <>
        <strong>Scheduling and communication:</strong> subject to clinical need, practice availability, and the agreement.
      </>,
      <>
        <strong>Outside services:</strong> labs, imaging, medications, specialists, hospital care, and other services may involve separate charges.
      </>,
    ],
  },
  {
    id: "before-enrollment",
    eyebrow: "Before You Enroll",
    title: "Review the current agreement, not an old offer or assumption.",
    description:
      "Membership details can change. Ask Faithful Care Medical Services for the agreement currently offered, read it in full, and make sure the model fits alongside the health coverage and outside care you may need.",
    bullets: [
      "Confirm the current fee, effective date, and payment terms.",
      "Review every included and excluded service.",
      "Understand scheduling, communication, renewal, and cancellation terms.",
      "Ask which services or third-party costs are billed separately.",
    ],
    cta: { text: "Request Current Membership Terms", href: "/contact" },
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is Direct Primary Care?",
    answer:
      "Direct Primary Care is a membership arrangement for the specific primary care services described in a written agreement with the practice. The current agreement controls the fee, included services, exclusions, scheduling and communication options, and cancellation terms.",
  },
  {
    question: "Is Direct Primary Care health insurance?",
    answer:
      "No. Direct Primary Care is not health insurance and does not replace coverage for hospital care, specialists, emergency services, imaging, prescriptions, or other services outside the membership agreement. Patients should maintain health coverage appropriate to their needs.",
  },
  {
    question: "How much does the membership cost?",
    answer:
      "Contact Faithful Care Medical Services for the current membership fee and written agreement. We do not rely on an old online price because the agreement offered at enrollment is the source of truth for current pricing and terms.",
  },
  {
    question: "Which services are included?",
    answer:
      "Only the services identified in the current written membership agreement are included. Labs, imaging, medications, specialist care, hospital care, and other outside services may have separate charges or require separate coverage.",
  },
  {
    question: "Can I use the membership if I already have insurance or Medicare?",
    answer:
      "A membership does not replace insurance or Medicare. Before enrolling, ask the practice how the membership is administered and consult your health plan or qualified benefits adviser about how it fits with your existing coverage and obligations.",
  },
  {
    question: "Can I use Direct Primary Care for an emergency?",
    answer:
      "No. Direct Primary Care is not an emergency service and does not guarantee an immediate response or appointment. Call 911 or go to the nearest emergency department for a medical emergency, and do not delay urgent care while waiting to hear from the practice.",
  },
  {
    question: "How do I enroll?",
    answer:
      "Contact Faithful Care Medical Services to request the current written agreement. Review the fee, included and excluded services, separate charges, scheduling and communication options, and cancellation terms before deciding whether to enroll.",
  },
];

export default function DirectPrimaryCare() {
  const primaryCareContent = pageContentMap["/primary-care"];

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <main id="main">
        <PageHero
          title={
            <>
              Direct Primary Care Membership
              <br className="hidden md:block" /> in Naples, FL
            </>
          }
          subtitleBold="A clearer way to plan your primary care."
          subtitle="Review a current written membership agreement that explains the primary care services, communication and scheduling options, exclusions, and separate charges before you enroll."
          marqueeItems={[
            "Written membership terms",
            "Naples, FL",
            "Primary care membership",
            "Ask about current availability",
          ]}
          heroImage={primaryCareContent.heroImage}
          heroImageMobile={primaryCareContent.heroImageMobile}
          heroImageAlt="Dr. Addys Reve welcoming an adult patient interested in Direct Primary Care in Naples, Florida"
          heroBlurPlaceholder={primaryCareContent.heroBlurPlaceholder}
          primaryCtaText="Call (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Request Membership Terms"
          secondaryCtaHref="/contact"
          showSearchCard={true}
        />

        <div id="page-content">
          <InfoSection section={infoSections[0]} categoryId="direct-primary-care" />

          <InfoSection section={infoSections[1]} categoryId="direct-primary-care" />

          <InsuranceMembership
            eyebrow="Direct Primary Care"
            title="Know the terms before you enroll."
            dpcHeading="A membership for defined primary care services"
            dpcBold="One current written agreement. Clear inclusions and exclusions."
            dpcParagraph1="Before enrollment, Faithful Care Medical Services explains the current fee, covered primary care services, scheduling and communication options, exclusions, and any separately charged services described in the agreement."
            dpcParagraph2="Direct Primary Care is not health insurance and does not replace coverage for hospitals, specialists, emergency services, imaging, prescriptions, or other care outside the agreement."
            ctaText="Request Current Membership Terms"
            ctaHref="/contact"
            benefits={membershipBenefits}
          />

          <InfoSection section={infoSections[2]} categoryId="direct-primary-care" />
        </div>

        <MeetYourDoctor />

        <FaqSection
          eyebrow="Direct Primary Care FAQ"
          title="Understand the membership before you decide."
          description="These answers explain the model generally. The written agreement currently offered by Faithful Care Medical Services controls your actual membership terms."
          items={faqItems}
        />

        <TealCta
          subtitle="Current Membership Information"
          title="Review the written agreement before you enroll."
          description="Call or contact Faithful Care Medical Services for the current fee, inclusions, exclusions, and membership terms."
          primaryCtaText="Request Membership Terms"
          primaryCtaHref="/contact"
          secondaryCtaText="Call (239) 423-0205"
          secondaryCtaHref="tel:2394230205"
        />
      </main>
    </div>
  );
}
