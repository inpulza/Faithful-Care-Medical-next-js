import * as React from "react";
import {
  DetailGrid,
  FaqSection,
  ImageMarquee,
  MeetYourDoctor,
  PageHero,
  SplitFeaturePanel,
  StackedFeatureStories,
  TealCta,
} from "@/components/sections";
import type { FaqItem } from "@/components/sections";
import { JsonLdArray } from "@/components/json-ld";
import { pageContentMap } from "@/lib/page-content";
import { faqPageSchema } from "@/lib/schemas";
import {
  CalendarCheck,
  ChatCircleText,
  ClipboardText,
  CurrencyDollar,
  FileText,
  Hospital,
  Prescription,
  ShieldCheck,
  Stethoscope,
  UserFocus,
  WarningCircle,
} from "@phosphor-icons/react";

const membershipDetails = [
  {
    icon: FileText,
    title: "Written terms first",
    description:
      "You receive the membership agreement before enrollment so you can review the fee, included services, exclusions, communication options, and cancellation terms.",
  },
  {
    icon: Stethoscope,
    title: "Defined primary care",
    description:
      "The agreement identifies which primary care services belong to the membership. Care and follow-up remain based on your clinical needs.",
  },
  {
    icon: CalendarCheck,
    title: "Scheduling explained",
    description:
      "Available scheduling options and their limits are explained before you join. Appointment timing still depends on clinical need and availability.",
  },
  {
    icon: ChatCircleText,
    title: "Communication boundaries",
    description:
      "The agreement explains which channels may be used between visits, what they are for, and when an office evaluation or urgent care is more appropriate.",
  },
  {
    icon: CurrencyDollar,
    title: "Fee disclosed before enrollment",
    description:
      "Faithful Care provides the fee currently offered and identifies services that may involve a separate charge before you decide.",
  },
  {
    icon: ShieldCheck,
    title: "Outside coverage stays important",
    description:
      "The membership is not health insurance and does not replace coverage for hospital care, specialists, emergencies, imaging, prescriptions, or other outside services.",
  },
];

const enrollmentStories = [
  {
    icon: ChatCircleText,
    title: "Start with a conversation",
    description:
      "Tell Faithful Care what you need from primary care and ask whether membership enrollment is currently available. This first step is informational and does not obligate you to join.",
    tags: ["Your care needs", "Current availability", "Questions welcome"],
    image: "/images/services/checkups-prevention.webp",
    imageAlt: "Patient discussing primary care needs with a clinician",
    note: "No enrollment decision is required during the first conversation.",
    cta: { label: "Request information", href: "/contact" },
  },
  {
    icon: ClipboardText,
    title: "Read the membership agreement",
    description:
      "Review the fee, included services, exclusions, scheduling, communication, renewal, and cancellation terms in the version offered to you. Ask about anything that is unclear.",
    tags: ["Fee", "Included care", "Exclusions", "Cancellation"],
    image: "/images/services/planning-transitions.webp",
    imageAlt: "Patient holding a document while discussing care options with a clinician",
    note: "The signed agreement, not an older webpage or promotion, controls the membership.",
  },
  {
    icon: ShieldCheck,
    title: "Plan for care outside the membership",
    description:
      "Decide how you will cover hospitals, specialists, emergency care, imaging, prescriptions, and other services outside the agreement. Direct Primary Care is not a substitute for health insurance.",
    tags: ["Hospital care", "Specialists", "Prescriptions", "Emergencies"],
    image: "/images/services/senior-care.webp",
    imageAlt: "Adult patient planning coordinated medical care with a clinician",
    note: "Keep health coverage appropriate to your needs.",
  },
  {
    icon: UserFocus,
    title: "Enroll only when the fit is clear",
    description:
      "If the available membership fits your needs, complete the agreement and follow the enrollment instructions provided by Faithful Care. Your care begins according to those written terms.",
    tags: ["Informed decision", "Written enrollment", "Clear next steps"],
    image: "/images/services/chronic-disease.webp",
    imageAlt: "Doctor and patient discussing a personalized primary care plan",
    note: "Contact the practice whenever you need clarification before signing.",
    cta: { label: "Contact Faithful Care", href: "/contact" },
  },
];

const includedItems = [
  { icon: Stethoscope, title: "Primary care services", description: "Only the primary care services specifically listed in the agreement offered at enrollment are included." },
  { icon: CalendarCheck, title: "Scheduling options", description: "The agreement explains available appointment options, subject to clinical need and practice availability." },
  { icon: ChatCircleText, title: "Communication options", description: "Permitted between-visit channels and their appropriate use are described in writing." },
  { icon: ClipboardText, title: "Terms you can review", description: "The fee, exclusions, separate charges, renewal, and cancellation terms are available before you sign." },
];

const outsideItems = [
  { icon: Hospital, title: "Hospital and emergency care", description: "Hospitalization, emergency departments, and emergency response are outside a primary care membership." },
  { icon: UserFocus, title: "Specialist care", description: "Visits and treatment provided by outside specialists are not automatically part of the membership." },
  { icon: Prescription, title: "Prescriptions, imaging, and outside labs", description: "Medication, imaging, and third-party testing may involve separate coverage or charges." },
  { icon: WarningCircle, title: "Urgent and emergency situations", description: "The membership does not guarantee an immediate response. Call 911 for a medical emergency." },
];

const dpcMarquee = [
  { type: "image" as const, src: "/images/services/checkups-prevention.webp", alt: "Primary care planning" },
  { type: "text" as const, label: "Written Terms" },
  { type: "image" as const, src: "/images/services/chronic-disease.webp", alt: "Ongoing primary care" },
  { type: "text" as const, label: "Defined Services" },
  { type: "image" as const, src: "/images/services/senior-care.webp", alt: "Personalized adult primary care" },
  { type: "text" as const, label: "Naples, FL" },
  { type: "image" as const, src: "/images/services/in-office-procedures.webp", alt: "Reviewing primary care options" },
  { type: "text" as const, label: "Clear Exclusions" },
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
    question: "Is Direct Primary Care the same as concierge medicine?",
    answer:
      "Not necessarily. The terms are sometimes used loosely, but Direct Primary Care and concierge arrangements can differ in fees, insurance billing, included services, and access. Review the written agreement offered by Faithful Care rather than assuming another practice's model applies here.",
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
  const faqSchema = faqPageSchema(faqItems.map((item) => ({
    question: item.question,
    answer: typeof item.answer === "string" ? item.answer : "",
  })));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqSchema]} />
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
          trustLineText={
            <>
              Membership, not health insurance <span className="opacity-60">·</span> Se habla espa&ntilde;ol
            </>
          }
          showSearchCard={true}
        />

        <div id="page-content">
          <DetailGrid
            eyebrow="Direct Primary Care, clearly explained"
            eyebrowColor="primary"
            title="Know what you are joining before you sign."
            description="Use these six details to compare the membership with the primary care, outside services, and health coverage you may need."
            statNumber="6"
            statLabel="membership details to review before enrollment"
            cards={membershipDetails}
          />

          <StackedFeatureStories
            eyebrow="How enrollment works"
            title="Four steps from first question to informed decision."
            description="The process is designed to give you the information you need before you commit. The written agreement controls the membership."
            stories={enrollmentStories}
            testId="section-dpc-enrollment"
          />

          <SplitFeaturePanel
            eyebrow="Inside the agreement"
            title="The membership is defined in writing."
            description="Faithful Care explains the version currently offered before enrollment. These categories show what to look for without replacing the actual agreement."
            items={includedItems}
            testId="section-dpc-included"
          />

          <SplitFeaturePanel
            eyebrow="Outside the membership"
            title="Keep a plan for the care DPC does not replace."
            description="Direct Primary Care is not health insurance. Appropriate outside coverage remains important for services beyond the membership agreement."
            items={outsideItems}
            tone="navy"
            testId="section-dpc-outside"
            className="pt-0"
          />

          <ImageMarquee items={dpcMarquee} speed={42} />
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
