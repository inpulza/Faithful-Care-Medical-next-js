import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  HeartStraight,
  Clock,
  MapPin,
  ChatCircleText,
  CalendarCheck,
  CircleNotch,
  PaperPlaneTilt,
  Translate,
  IdentificationBadge,
  CaretDown,
  Info,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { TestimonialsSection, FaqSection } from "@/components/sections";
import type { FaqItem } from "@/components/sections/faq-section";
import {
  CLINIC_FULL_ADDRESS,
  CLINIC_GMAPS_DIRECTIONS_URL,
} from "@/lib/clinic-location";
import { cn } from "@/lib/utils";
import { trackEvent, trackLead } from "@/lib/analytics";
import { PrivacySafeGoogleMap } from "@/components/privacy-safe-google-map";

const PHONE_DISPLAY = "(239) 423-0205";
const PHONE_HREF = "tel:+12394230205";

function trackCta(section: string, label: string, kind: "call" | "click" = "click") {
  trackEvent(kind === "call" ? "cta_call" : "cta_click", {
    cta_section: section,
    cta_label: label,
  });
}

interface SecondaryCardData {
  id: string;
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
}

const SECONDARY_CARDS: SecondaryCardData[] = [
  {
    id: "cigna",
    title: "Cigna",
    body: "In-network for Cigna commercial plans. Annual checkups, chronic disease care, and same-week sick visits from one Naples physician.",
    logoSrc: "/images/logos/cigna-healthcare.webp",
    logoAlt: "Cigna logo",
  },
  {
    id: "medicare",
    title: "Original Medicare",
    body: "We accept Original Medicare (Parts A and B). Welcome to Medicare visits, Annual Wellness Visits, and ongoing primary care for adults 65 and over.",
    logoSrc: "/images/logos/medicare.webp",
    logoAlt: "Original Medicare logo",
  },
  {
    id: "medicaid",
    title: "Florida Medicaid",
    body: "Faithful Care accepts Florida Medicaid through Sunshine Health. Bilingual care for adults across Collier and Lee counties.",
    logoSrc: "/images/logos/sunshine-health.webp",
    logoAlt: "Florida Medicaid via Sunshine Health logo",
  },
];

function SecondaryCard({ c, index }: { c: SecondaryCardData; index: number }) {
  return (
    <motion.div
      key={c.id}
      id={c.id}
      className="bg-white border border-primary/30 rounded-3xl p-6 md:p-8 flex flex-col scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-testid={`card-secondary-${c.id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <h3
          className="font-serif text-deep-navy leading-[1.1] flex-1"
          style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)" }}
        >
          {c.title}
        </h3>
        <div
          className="h-[4.8rem] md:h-24 flex-shrink-0 flex items-center justify-end"
          style={{ aspectRatio: "560 / 224" }}
        >
          <img
            src={c.logoSrc}
            alt={c.logoAlt}
            width={560}
            height={224}
            className="h-full w-auto object-contain"
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: "560 / 224" }}
            data-testid={`logo-secondary-${c.id}`}
          />
        </div>
      </div>
      <p className="text-deep-navy/75 text-base leading-relaxed flex-1">{c.body}</p>
      <a
        href={PHONE_HREF}
        onClick={() => trackCta("secondary_" + c.id, "Call to verify your plan", "call")}
        className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary text-white px-5 py-3 font-semibold text-base hover:bg-primary/90 transition-colors min-h-[48px]"
        data-testid={`cta-call-secondary-${c.id}`}
      >
        <Phone weight="fill" className="w-5 h-5" />
        Call to verify your plan
      </a>
    </motion.div>
  );
}

function SecondaryCarriers() {
  return (
    <section className="section-gap bg-primary/5" data-testid="section-secondary-carriers">
      <div className="container-radical">
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <h2
            className="font-serif text-deep-navy leading-[1.1]"
            style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}
            data-testid="text-secondary-carriers-title"
          >
            Other plans we accept.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {SECONDARY_CARDS.map((c, i) => (
            <SecondaryCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyFaithfulCare() {
  const points = [
    {
      icon: HeartStraight,
      title: "One physician who knows you",
      body: "Dr. Addys Reve, MD personally manages your care. No rotating providers, no rushed visits.",
    },
    {
      icon: Clock,
      title: "Same-week appointments",
      body: "New patients seen within seven days. Established patients can usually be seen the same day.",
    },
    {
      icon: Translate,
      title: "Bilingual care team",
      body: "Visits, paperwork, and follow-up in English or Spanish. Atendemos en español.",
    },
    {
      icon: ShieldCheck,
      title: "In-network and transparent",
      body: "We verify your coverage before your first visit. No surprise bills, no balance billing.",
    },
  ];

  return (
    <section className="section-gap bg-white" data-testid="section-why-fc">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative w-full overflow-hidden rounded-3xl border border-primary/30 bg-primary/5"
              style={{ aspectRatio: "4 / 5" }}
              data-testid="image-dr-reve-portrait"
            >
              <img
                src="/images/dr-addys-reve.webp"
                alt="Dr. Addys Reve, MD, founder of Faithful Care Medical Services"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 18%" }}
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Meet your doctor
              </p>
            </div>
            <h2
              className="font-serif text-deep-navy leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.85rem, 3.5vw, 3rem)" }}
              data-testid="text-why-fc-title"
            >
              Why patients choose<br />Faithful Care in Naples.
            </h2>
            <p className="text-deep-navy/75 text-base md:text-lg leading-relaxed mb-8">
              Dr. Addys Reve, MD founded Faithful Care to give Southwest Florida patients an
              unhurried, in-network primary and palliative care experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {points.map((p) => (
                <div key={p.title} className="flex flex-col gap-3" data-testid={`why-point-${p.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-primary/30 flex items-center justify-center">
                    <p.icon weight="regular" className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-deep-navy text-lg">{p.title}</h3>
                  <p className="text-deep-navy/75 text-base leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CallbackForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    insurance: "",
    language: "English",
    consent: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const inputClass =
    "w-full px-4 py-3 bg-primary/5 rounded-xl border border-primary/20 text-base text-deep-navy placeholder:text-deep-navy/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.consent) {
      setError("Please confirm you agree to be contacted at the phone number you provided.");
      return;
    }
    setSubmitting(true);
    const insurance = formData.insurance.trim();
    const insuranceLower = insurance.toLowerCase();
    const isMembership =
      insuranceLower === "" ||
      insuranceLower.includes("membership") ||
      insuranceLower.includes("self-pay") ||
      insuranceLower.includes("none") ||
      insuranceLower.includes("uninsured") ||
      insuranceLower.includes("dpc");
    const service = isMembership ? "Membership info" : "Schedule a visit";
    const message = `Insurance: ${insurance || "Not specified"} | Preferred language: ${formData.language} | Submitted from /insurance-accepted landing page.`;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service,
          message,
          sourcePage: "/insurance-accepted",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || `Something went wrong. Please call us at ${PHONE_DISPLAY}.`);
        return;
      }
      trackLead("insurance_lp_callback", "/insurance-accepted");
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", insurance: "", language: "English", consent: false });
    } catch {
      setError(`Could not send your request. Please call us at ${PHONE_DISPLAY}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-primary/30 rounded-3xl p-6 md:p-10" data-testid="card-callback-form">
      <h3
        className="font-serif text-deep-navy mb-2"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
      >
        Prefer we call you?
      </h3>
      <p className="text-deep-navy/75 mb-6 text-base">
        Share a few details and a care coordinator will reach out within one business day.
      </p>

      {submitted ? (
        <div className="flex items-center gap-3 py-6" data-testid="text-callback-success">
          <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
            <PaperPlaneTilt weight="fill" className="w-5 h-5 text-secondary" aria-hidden="true" />
          </div>
          <p className="text-lg font-semibold text-deep-navy">
            Thank you. A care coordinator will call you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-testid="form-callback" data-clarity-mask="true">
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-1.5" htmlFor="lp-name">
              Full name
            </label>
            <input
              id="lp-name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              data-testid="input-callback-name"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-1.5" htmlFor="lp-phone">
                Phone
              </label>
              <input
                id="lp-phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(239) 555-0123"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
                data-testid="input-callback-phone"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-1.5" htmlFor="lp-email">
                Email
              </label>
              <input
                id="lp-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
                data-testid="input-callback-email"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-1.5" htmlFor="lp-insurance">
              Your insurance
            </label>
            <select
              id="lp-insurance"
              required
              value={formData.insurance}
              onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
              className={inputClass + " appearance-none pr-10"}
              data-testid="select-callback-insurance"
            >
              <option value="">Choose your plan...</option>
              <option value="Humana Medicare Advantage">Humana Medicare Advantage</option>
              <option value="Aetna Medicare Advantage">Aetna Medicare Advantage</option>
              <option value="Aetna Commercial">Aetna Commercial</option>
              <option value="Cigna">Cigna</option>
              <option value="Original Medicare">Original Medicare (Parts A & B)</option>
              <option value="Florida Medicaid">Florida Medicaid (Sunshine Health)</option>
              <option value="Not sure">Not sure / Other</option>
            </select>
          </div>
          <fieldset>
            <legend className="block text-sm font-semibold text-deep-navy mb-2">
              Preferred language
            </legend>
            <div className="flex flex-wrap gap-3">
              {["English", "Spanish"].map((lang) => (
                <label
                  key={lang}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border cursor-pointer text-base transition-colors",
                    formData.language === lang
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-deep-navy border-primary/30 hover:border-primary/60",
                  )}
                  data-testid={`radio-callback-lang-${lang.toLowerCase()}`}
                >
                  <input
                    type="radio"
                    name="lp-language"
                    value={lang}
                    checked={formData.language === lang}
                    onChange={() => setFormData({ ...formData, language: lang })}
                    className="sr-only"
                  />
                  {lang}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-start gap-3 text-sm text-deep-navy/80 leading-relaxed">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-primary/40 text-primary focus:ring-primary/30"
              data-testid="checkbox-callback-consent"
            />
            <span>
              I agree to be contacted at the phone number provided. Standard message and data
              rates may apply. This form is not for protected health information. For urgent
              medical questions, please call {PHONE_DISPLAY}.
            </span>
          </label>
          {error && (
            <p className="text-sm text-red-700 bg-red-50 rounded-lg px-4 py-3" data-testid="text-callback-error">
              {error}
            </p>
          )}
          <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto sm:self-start" data-testid="cta-callback-submit">
            {submitting ? (
              <>
                <CircleNotch weight="bold" className="w-5 h-5 mr-1 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <CalendarCheck weight="regular" className="w-5 h-5 mr-1" aria-hidden="true" />
                Request my callback
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

function MapCallback() {
  return (
    <PrivacySafeGoogleMap
      className="aspect-[4/3] rounded-3xl overflow-hidden border border-primary/20 flex-1 relative bg-primary/5"
      iframeTestId="map-callback-embed"
      loadButtonTestId="cta-load-map"
      title="Faithful Care Medical Services map, 9955 Tamiami Trail N, Suite 2, Naples, FL"
      wrapperTestId="map-callback-wrapper"
    />
  );
}

function CallbackAndMap() {
  return (
    <section id="callback" className="pt-8 md:pt-12 pb-16 md:pb-24 bg-white scroll-mt-24" data-testid="section-callback">
      <div className="container-radical">
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Get started
            </p>
          </div>
          <h2
            className="font-serif text-deep-navy leading-[1.1]"
            style={{ fontSize: "clamp(1.85rem, 3.5vw, 3rem)" }}
            data-testid="text-callback-title"
          >
            Call us, or let us<br />call you back.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:items-stretch">
          <CallbackForm />

          <div className="flex flex-col gap-6 h-full">
            <div className="bg-primary text-white rounded-3xl p-6 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-3">
                Visit us in Naples
              </p>
              <a
                href={PHONE_HREF}
                onClick={() => trackCta("callback_card", PHONE_DISPLAY, "call")}
                className="block font-serif text-3xl md:text-4xl mb-4 hover:opacity-90 transition-opacity"
                data-testid="cta-call-callback-card"
                aria-label={`Call Faithful Care at ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
              <div className="space-y-3 text-white/90 text-base">
                <p className="flex items-start gap-3">
                  <MapPin weight="fill" className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{CLINIC_FULL_ADDRESS}</span>
                </p>
                <p className="flex items-start gap-3">
                  <Clock weight="fill" className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>Mon-Fri 8:30 AM - 5 PM, Sat 8:30 AM - 12 PM</span>
                </p>
                <p className="flex items-start gap-3">
                  <ChatCircleText weight="fill" className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>English and Spanish</span>
                </p>
              </div>
              <a
                href={CLINIC_GMAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("directions_click", { cta_section: "callback_card", cta_label: "Get directions" })}
                className="mt-6 inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-full font-semibold text-base hover:bg-white/90 transition-colors"
                data-testid="cta-directions-callback"
              >
                Get directions
                <ArrowRight weight="bold" className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            <MapCallback />
          </div>
        </div>
      </div>
    </section>
  );
}

function DisclosureItem({
  carrier,
  text,
  defaultOpen,
}: {
  carrier: string;
  text: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const slug = carrier.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const panelId = `disclosure-panel-${slug}`;
  return (
    <div data-testid={`disclosure-${slug}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 md:px-7 py-5 md:py-6 text-left hover:bg-primary/5 transition-colors min-h-[64px]"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-white border border-primary/15 flex items-center justify-center shadow-sm flex-shrink-0">
            <IdentificationBadge weight="regular" className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <p className="font-semibold text-deep-navy text-base md:text-lg truncate">
            {carrier}
          </p>
        </div>
        <CaretDown
          weight="bold"
          className={cn(
            "w-4 h-4 text-primary flex-shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={panelId} className="px-5 md:px-7 pb-6 md:pb-7 -mt-1">
          <div className="ml-14 border-l-2 border-primary/20 pl-4 md:pl-5">
            <p className="text-sm md:text-base leading-relaxed text-deep-navy/80">
              {text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function CarrierDisclosuresSection() {
  const carrierDisclaimers: { carrier: string; text: string }[] = [
    {
      carrier: "Humana",
      text: "Humana is a registered trademark of Humana Inc. Humana Medicare Advantage plans are offered by Humana Inc. and its subsidiaries. Faithful Care Medical Services is a contracted in-network provider for palliative care and provides out-of-network benefits for primary care; we are not employed by, sponsored by, or endorsed by Humana. Plan benefits, copays, and provider directories are determined by Humana and may change.",
    },
    {
      carrier: "Aetna",
      text: "Aetna and the Aetna logo are trademarks of Aetna Inc., a CVS Health company. Aetna Medicare Advantage and commercial plans are administered by Aetna. Faithful Care is a contracted in-network provider; we are not employed by, sponsored by, or endorsed by Aetna. Coverage and provider participation depend on your specific Aetna plan and group.",
    },
    {
      carrier: "Cigna and Cigna-HealthSpring",
      text: "Cigna and Cigna-HealthSpring are registered service marks of Cigna Intellectual Property, Inc. Faithful Care is contracted with Cigna for commercial PPO and HMO products available in Collier County, FL. We are not employed by, sponsored by, or endorsed by Cigna or Cigna-HealthSpring. Network participation can change; please verify when scheduling.",
    },
    {
      carrier: "Original Medicare",
      text: "Original Medicare (Parts A and B) is a federal program administered by the U.S. Centers for Medicare & Medicaid Services (CMS). Faithful Care accepts Medicare assignment. We are not affiliated with or endorsed by CMS or the U.S. government. Beneficiary cost-share and covered services are determined by Medicare.",
    },
    {
      carrier: "Florida Medicaid",
      text: "Florida Medicaid managed care for Collier County is administered by Sunshine Health (a Centene company) under contract with the Florida Agency for Health Care Administration (AHCA). Faithful Care is a contracted Sunshine Health provider. We are not employed by, sponsored by, or endorsed by AHCA, Sunshine Health, or the State of Florida.",
    },
  ];
  return (
    <section className="section-gap bg-primary/5" data-testid="section-compliance">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Important disclosures
              </p>
            </div>
            <h2
              className="font-serif text-deep-navy leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              data-testid="text-disclosures-title"
            >
              Independent practice.<br />Transparent network status.
            </h2>
            <p className="text-deep-navy/75 text-base md:text-lg leading-relaxed mb-6">
              Faithful Care Medical Services is an independent medical practice. Plan acceptance
              is verified at the time of scheduling and may change. Coverage and benefits depend
              on your specific plan and benefit year.
            </p>

            <div className="bg-white border border-primary/30 rounded-3xl p-6 md:p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center shadow-sm flex-shrink-0">
                <ShieldCheck weight="regular" className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                  Privacy and HIPAA
                </p>
                <p className="text-sm md:text-base leading-relaxed text-deep-navy/80">
                  This page is informational and not medical advice. Forms here are not for
                  protected health information. For urgent medical questions, please call{" "}
                  <a
                    href={PHONE_HREF}
                    className="text-primary font-semibold hover:text-primary/80"
                    data-testid="link-compliance-phone"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  . See our{" "}
                  <a
                    href="/notice-of-privacy-practices"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                    data-testid="link-compliance-privacy"
                  >
                    Notice of Privacy Practices
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="flex items-center gap-2 mb-5 text-deep-navy/75"
              data-testid="disclosures-helper"
            >
              <Info weight="regular" className="w-4 h-4 text-primary" aria-hidden="true" />
              <p className="text-xs md:text-sm">
                Tap a carrier to read its full network and trademark disclosure.
              </p>
            </div>
            <div
              className="bg-white border border-primary/30 rounded-3xl divide-y divide-primary/15 overflow-hidden"
              data-testid="per-carrier-disclaimers"
            >
              {carrierDisclaimers.map((d, i) => (
                <DisclosureItem key={d.carrier} carrier={d.carrier} text={d.text} defaultOpen={i === 0} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface BelowFoldProps {
  faqs: FaqItem[];
}

export default function InsuranceBelowFold({ faqs }: BelowFoldProps) {
  const faqRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const root = faqRef.current;
    if (!root) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest('[data-testid^="faq-trigger-"]');
      if (trigger) {
        const idx = trigger.getAttribute("data-testid")?.split("-").pop();
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        if (!isOpen) {
          trackEvent("faq_open", { cta_section: "faq", cta_label: "faq_" + idx, index: idx });
        }
      }
    };
    root.addEventListener("click", handler);
    return () => root.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <SecondaryCarriers />
      <WhyFaithfulCare />
      <div ref={faqRef}>
        <FaqSection
          eyebrow="Insurance questions"
          title="Coverage, scheduling, and what to expect."
          items={faqs}
        />
      </div>
      <TestimonialsSection />
      <CarrierDisclosuresSection />
      <CallbackAndMap />
    </>
  );
}
