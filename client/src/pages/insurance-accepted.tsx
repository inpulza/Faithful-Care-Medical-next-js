import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { FaqItem } from "@/components/sections/faq-section";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema, breadcrumbSchema, insuranceLpClinicSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = "(239) 423-0205";
const PHONE_HREF = "tel:+12394230205";

const ACCEPTED_NETWORKS = [
  "Humana Medicare Advantage",
  "Aetna Medicare Advantage",
  "Aetna Commercial",
  "Cigna Commercial",
  "Original Medicare (Parts A & B)",
  "Florida Medicaid (Sunshine Health)",
];

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

function trackCta(section: string, label: string, kind: "call" | "click" = "click") {
  pushEvent({
    event: kind === "call" ? "cta_call" : "cta_click",
    cta_section: section,
    cta_label: label,
  });
}

function usePageInit() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const campaign: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
      const v = params.get(k);
      if (v) campaign[k] = v;
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ campaign });
    pushEvent({
      event: "page_view",
      page_path: "/insurance-accepted",
      page_title: "Insurance Accepted | Faithful Care",
      campaign,
    });
  }, []);
}

interface ImageSlotProps {
  filename: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  rounded?: string;
  testId?: string;
  priority?: boolean;
}

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function ImageSlot({
  filename,
  alt,
  width,
  height,
  className,
  rounded = "rounded-3xl",
  testId,
  priority = false,
}: ImageSlotProps) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "missing">("loading");
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // Server-rendered pages can have the image already complete before
  // hydration, so `onLoad` never fires and the "Image slot" placeholder
  // would stay on screen. Reconcile against the element on mount.
  React.useEffect(() => {
    const img = imgRef.current;
    if (!img?.complete) return;
    setStatus(img.naturalWidth > 1 ? "loaded" : "missing");
  }, []);

  return (
    <div
      data-testid={testId ?? `image-slot-${filename}`}
      className={cn(
        "relative w-full overflow-hidden border border-primary/30",
        status === "loaded" ? "bg-transparent" : "bg-primary/5",
        rounded,
        className,
      )}
    >
      <img
        ref={imgRef}
        src={`/insurance-lp/${filename}`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className="block w-full h-auto"
        style={{ aspectRatio: `${width} / ${height}`, background: `url(${TRANSPARENT_PIXEL})` }}
        onLoad={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (img.naturalWidth > 1) setStatus("loaded");
        }}
        onError={() => setStatus("missing")}
      />
      {status !== "loaded" && (
        <div className="pointer-events-none absolute inset-3 border border-dashed border-primary/40 rounded-[inherit] flex flex-col items-center justify-center text-center px-4 py-6">
          <p className="text-xs font-mono uppercase tracking-widest text-primary/70 mb-2">
            Image slot
          </p>
          <p className="text-sm font-semibold text-deep-navy break-all">{filename}</p>
          <p className="text-xs text-deep-navy/60 mt-1">{width} x {height}</p>
          <p className="text-xs text-deep-navy/60 mt-2 italic">"{alt}"</p>
        </div>
      )}
    </div>
  );
}

const HUMANA_GREEN = "#6BB73E";
const HUMANA_GREEN_HOVER = "#5CA033";

function HumanaChip() {
  return (
    <span
      className="inline-flex items-center align-baseline rounded-[4px] px-2 py-0.5 font-semibold whitespace-nowrap"
      style={{ backgroundColor: HUMANA_GREEN, color: "#ffffff", letterSpacing: "0.01em" }}
      data-testid="chip-humana"
    >
      Humana
    </span>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-white pt-24 md:pt-32 pb-12 md:pb-20" data-testid="section-hero">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                In-Network Care in Naples, FL
              </p>
            </div>
            <h1
              className="font-serif text-deep-navy leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 5.2vw, 4rem)" }}
              data-testid="text-hero-title"
            >
              A Naples doctor that<br />takes your insurance.
            </h1>
            <p
              className="mt-6 text-deep-navy/70 leading-relaxed max-w-2xl"
              style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
              data-testid="text-hero-subhead"
            >
              Lost a doctor in the 2026 plan changes? Faithful Care is in-network for Aetna, Cigna,
              Original Medicare and Florida Medicaid. With <HumanaChip /> Medicare Advantage we are
              in-network for palliative care and provide out-of-network benefits for primary care.
              Same-week visits, in English and Spanish.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-base"
              >
                <a
                  href={PHONE_HREF}
                  onClick={() => trackCta("hero", "Call " + PHONE_DISPLAY, "call")}
                  data-testid="cta-call-hero"
                >
                  <Phone weight="fill" className="w-5 h-5 mr-1" />
                  Call {PHONE_DISPLAY}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base"
              >
                <a
                  href="#callback"
                  onClick={() => trackCta("hero", "Request a callback")}
                  data-testid="cta-callback-hero"
                >
                  Request a callback
                  <ArrowRight weight="regular" className="w-5 h-5 ml-1" />
                </a>
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl" data-testid="hero-trust-strip">
              {[
                "Most plans accepted, including Medicare",
                "Same-week appointments",
                "English and Spanish",
                "Naples office on Tamiami Trail N",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-deep-navy/80 text-base">
                  <CheckCircle weight="fill" className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="relative w-full overflow-hidden rounded-3xl border border-primary/30"
                style={{ aspectRatio: "3 / 4", backgroundColor: "#7BC142" }}
                data-testid="image-hero-portrait"
              >
                <img
                  src="/images/insurance-lp/humana-hero.webp"
                  srcSet="/images/insurance-lp/humana-hero.mobile.webp 720w, /images/insurance-lp/humana-hero.webp 1086w"
                  sizes="(max-width: 768px) 100vw, 480px"
                  alt="Dr. Addys Reve, MD, palliative care that accepts Humana insurance, same-day visits at Faithful Care in Naples, FL"
                  width={1086}
                  height={1448}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CarrierCardProps {
  id: "humana" | "aetna";
  eyebrow: string;
  title: string;
  bullets: string[];
  body: string;
  hospiceClarifier?: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  logoSrc: string;
  logoAlt: string;
  carrierName: string;
}

function CarrierCard({
  id,
  eyebrow,
  title,
  bullets,
  body,
  hospiceClarifier,
  ctaLabel,
  imageSrc,
  imageAlt,
  logoSrc,
  logoAlt,
  carrierName,
}: CarrierCardProps) {
  return (
    <motion.article
      id={id}
      className="bg-white border border-primary/30 rounded-3xl overflow-hidden flex flex-col scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      data-testid={`card-carrier-${id}`}
    >
      <div className="p-6 md:p-10 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div className="h-20 md:h-28 flex items-center" style={{ aspectRatio: "560 / 224" }}>
            <img
              src={logoSrc}
              alt={logoAlt}
              width={560}
              height={224}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-auto object-contain"
              style={{ aspectRatio: "560 / 224" }}
              data-testid={`logo-carrier-${id}`}
            />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        </div>

        <h2
          className="font-serif text-deep-navy leading-[1.1] mb-5"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          data-testid={`text-carrier-${id}-title`}
        >
          {title}
        </h2>

        <div
          className="relative w-full overflow-hidden rounded-2xl border border-primary/30 mb-6"
          style={{ aspectRatio: "4 / 3" }}
          data-testid={`image-carrier-${id}`}
        >
          <img
            src={imageSrc}
            srcSet={`${imageSrc.replace(/\.webp$/, ".mobile.webp")} 800w, ${imageSrc} 1600w`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            alt={imageAlt}
            width={1600}
            height={1200}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p className="text-deep-navy/70 text-base md:text-lg leading-relaxed mb-6">
          {body}
        </p>

        <ul className="space-y-3 mb-6">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-deep-navy/85 text-base">
              <CheckCircle weight="fill" className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {hospiceClarifier && (
          <div className="mb-6 p-4 rounded-2xl bg-secondary/10 border border-secondary/30">
            <p className="text-sm md:text-base text-deep-navy">
              <strong className="text-primary">Important.</strong> {hospiceClarifier}
            </p>
          </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1"
            style={id === "humana" ? { backgroundColor: HUMANA_GREEN, borderColor: HUMANA_GREEN } : undefined}
            onMouseEnter={
              id === "humana"
                ? (e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = HUMANA_GREEN_HOVER)
                : undefined
            }
            onMouseLeave={
              id === "humana"
                ? (e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = HUMANA_GREEN)
                : undefined
            }
          >
            <a
              href={PHONE_HREF}
              onClick={() => trackCta("carrier_" + id, ctaLabel, "call")}
              data-testid={`cta-call-carrier-${id}`}
            >
              <Phone weight="fill" className="w-5 h-5 mr-1" />
              {ctaLabel}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1">
            <a
              href="#callback"
              onClick={() => trackCta("carrier_" + id, "Request a callback")}
              data-testid={`cta-callback-carrier-${id}`}
            >
              Request a callback
            </a>
          </Button>
        </div>

        <p
          className="mt-5 text-xs text-deep-navy/55 leading-relaxed"
          data-testid={`text-carrier-${id}-affiliation`}
        >
          Independent practice. Faithful Care Medical Services is not affiliated with,
          endorsed by, or sponsored by {carrierName}.
        </p>
      </div>
    </motion.article>
  );
}

function PrimaryCarriers() {
  return (
    <section className="section-gap bg-white" data-testid="section-primary-carriers">
      <div className="container-radical">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Plans we accept
            </p>
          </div>
          <h2
            className="font-serif text-deep-navy leading-[1.1]"
            style={{ fontSize: "clamp(1.85rem, 3.5vw, 3rem)" }}
            data-testid="text-primary-carriers-title"
          >
            Two ways Faithful Care<br />can step in this year.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <CarrierCard
            id="humana"
            eyebrow="Humana Medicare Advantage"
            title="Palliative care that stays with you."
            body="If your Humana plan dropped your palliative or primary care team, Dr. Addys Reve and the Faithful Care team can pick up your care this month. We coordinate with your specialists, manage symptoms, and support your family at home or in our Naples office."
            bullets={[
              "Pain, breathing, fatigue, nausea, and sleep relief",
              "Care at home, in our office, or by telehealth",
              "Help with goals-of-care conversations and advance directives",
              "Bilingual care team, English and Spanish",
            ]}
            hospiceClarifier="Palliative care is not hospice. You can keep your current treatments and specialists. Hospice is a separate service for the final months of life."
            ctaLabel={`Call ${PHONE_DISPLAY}`}
            imageSrc="/images/insurance-lp/humana-palliative.webp"
            imageAlt="Faithful Care nurse holding the hand of a Humana palliative patient at home in Naples"
            logoSrc="/images/logos/humana.webp"
            logoAlt="Humana logo"
            carrierName="Humana"
          />
          <CarrierCard
            id="aetna"
            eyebrow="Aetna Primary Care"
            title="A primary care doctor who knows you."
            body="If your Aetna plan left you without a primary care provider, Faithful Care is accepting new Aetna patients. Annual checkups, chronic disease management, same-week sick visits, and Medicare Wellness Visits, all from one Naples office."
            bullets={[
              "Annual physicals and Medicare Wellness Visits",
              "Diabetes, blood pressure, COPD, and heart disease management",
              "Same-week sick visits, telehealth available",
              "Bilingual care team, English and Spanish",
            ]}
            ctaLabel={`Call ${PHONE_DISPLAY}`}
            imageSrc="/images/insurance-lp/aetna-primary.webp"
            imageAlt="Faithful Care primary care doctor talking with an Aetna patient in a Naples office"
            logoSrc="/images/logos/aetna-health-insurance.webp"
            logoAlt="Aetna logo"
            carrierName="Aetna"
          />
        </div>
      </div>
    </section>
  );
}



const insuranceFaqs: FaqItem[] = [
  {
    question: "Is Faithful Care in-network for Humana and Aetna in 2026?",
    answer:
      "Faithful Care Medical Services is a contracted, in-network provider for Aetna Medicare Advantage and Aetna commercial plans serving Naples and Southwest Florida. With Humana Medicare Advantage we are in-network for palliative care and see primary care patients with out-of-network benefits. Call (239) 423-0205 and we will verify your specific plan and what it covers before you book.",
  },
  {
    question: "What other insurance do you accept?",
    answer:
      "We are also in-network with Cigna commercial plans, Original Medicare (Parts A and B), and Florida Medicaid through Sunshine Health. Call (239) 423-0205 and we will check your specific plan in a couple of minutes before you book.",
  },
  {
    question: "I lost my doctor in the 2026 plan changes. How fast can you see me?",
    answer:
      "New patients are usually seen within one week. Established patients can often be seen the same day. Call (239) 423-0205 in the morning and we will do our best to get you in that day.",
  },
  {
    question: "What is the difference between palliative care and hospice?",
    answer:
      "Palliative care is extra support for people living with a serious illness. You can receive it at any stage of the illness while continuing your regular treatments and specialists. Hospice care is a separate service for the final months of life when treatments are no longer helping. Faithful Care provides palliative care, not hospice, and we coordinate with hospice agencies when the time is right.",
  },
  {
    question: "Do you speak Spanish?",
    answer:
      "Sí. Our care team and front desk are bilingual. Visits, paperwork, and follow-up calls are available in English or Spanish.",
  },
  {
    question: "Will I see Dr. Reve, or a different provider every time?",
    answer:
      "You will see Dr. Addys Reve, MD. Faithful Care is built around continuity of care, which means one physician who knows your history, your medications, and your goals.",
  },
  {
    question: "Where is the office and is parking easy?",
    answer:
      "Our office is at 9955 Tamiami Trail N, Suite 2, Naples, FL 34108. Free parking is available directly in front of the building. The entrance is wheelchair accessible.",
  },
  {
    question: "What if my insurance changes mid-year?",
    answer:
      "Let us know as soon as your card changes. We will re-verify your coverage and confirm your visits are still in-network before your next appointment, so there are no billing surprises.",
  },
];


const LP_MARQUEE_LOGOS: { name: string; src: string; width: number; height: number }[] = [
  { name: "Humana", src: "/images/logos/humana.webp", width: 560, height: 224 },
  { name: "Aetna", src: "/images/logos/aetna-health-insurance.webp", width: 560, height: 224 },
  { name: "Cigna", src: "/images/logos/cigna-healthcare.webp", width: 560, height: 224 },
  { name: "Original Medicare", src: "/images/logos/medicare.webp", width: 560, height: 224 },
  { name: "Florida Medicaid (Sunshine Health)", src: "/images/logos/sunshine-health.webp", width: 398, height: 224 },
];

function LpLogoMarquee() {
  const doubled = [...LP_MARQUEE_LOGOS, ...LP_MARQUEE_LOGOS];
  return (
    <section className="py-10 md:py-14 bg-white" data-testid="section-lp-logo-marquee">
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />
        <div
          className="lp-marquee-track items-center gap-12 md:gap-16"
          data-testid="lp-insurance-marquee"
          aria-hidden="true"
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 h-20 md:h-28 flex items-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto object-contain"
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const InsuranceBelowFold = React.lazy(() => import("./insurance-accepted-below"));

export default function InsuranceAccepted() {
  usePageInit();

  const faqsForSchema = insuranceFaqs.map((f) => ({
    question: f.question,
    answer: typeof f.answer === "string" ? f.answer : "",
  }));

  const faqsWithLinks: FaqItem[] = insuranceFaqs.map((f) => {
    if (f.question === "What other insurance do you accept?") {
      return {
        ...f,
        answer: (
          <>
            {f.answer} Read more about <a href="/medicare">Medicare at Faithful Care</a>.
          </>
        ),
      };
    }
    if (f.question === "I lost my doctor in the 2026 plan changes. How fast can you see me?") {
      return {
        ...f,
        answer: (
          <>
            {f.answer} See <a href="/new-patients">how to become a new patient</a>.
          </>
        ),
      };
    }
    return f;
  });

  return (
    <div className="bg-white text-deep-navy">
      <JsonLdArray
        schemas={[
          insuranceLpClinicSchema({ acceptedNetworks: ACCEPTED_NETWORKS }),
          faqPageSchema(faqsForSchema),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insurance Accepted", path: "/insurance-accepted" },
          ]),
        ]}
      />
      <main id="main">
        <HeroSection />
        <LpLogoMarquee />
        <PrimaryCarriers />
        <React.Suspense fallback={null}>
          <InsuranceBelowFold faqs={faqsWithLinks} />
        </React.Suspense>
      </main>
    </div>
  );
}
