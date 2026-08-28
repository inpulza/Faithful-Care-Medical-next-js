import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router";
import { ArrowRight, ArrowLeft, ShieldCheck } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const insuranceLogosMarquee = [
  { name: "Humana", src: "/images/logos/humana.webp" },
  { name: "Aetna", src: "/images/logos/aetna-health-insurance.webp" },
  { name: "Cigna", src: "/images/logos/cigna-healthcare.webp" },
  { name: "Original Medicare", src: "/images/logos/medicare.webp" },
  { name: "Florida Medicaid (Sunshine Health)", src: "/images/logos/sunshine-health.webp" },
];

const dpcBenefits = [
  {
    title: "Visits Included",
    subtitle: "Membership-based primary care",
    description: "Covered primary care visits are included in the membership rather than billed with a copay each time. Scheduling remains based on availability and clinical need.",
    features: ["Covered visits included", "Follow-up care without per-visit copays", "Preventive and sick care options"],
  },
  {
    title: "Priority Scheduling",
    subtitle: "Faster access when availability allows",
    description: "Members receive priority scheduling for time-sensitive primary care concerns, including same-day or next-day options when appointments are available.",
    features: ["Priority appointment requests", "Same-day options when available", "Clear guidance for urgent concerns"],
  },
  {
    title: "Direct Communication",
    subtitle: "Channels defined by your agreement",
    description: "The current membership agreement explains which communication channels are available between visits and when an in-person assessment is needed.",
    features: ["Practice-defined communication channels", "Video visits when appropriate", "Guidance on in-person care"],
  },
  {
    title: "Transparent Pricing",
    subtitle: "Written terms before enrollment",
    description: "Pay a monthly membership fee for the primary care services listed in your membership agreement. We explain current pricing, included care, and exclusions before enrollment.",
    features: ["Monthly membership fee", "Written inclusions and exclusions", "Ask us about current HSA rules"],
  },
  {
    title: "Longer Appointments",
    subtitle: "Time for a thorough conversation",
    description: "Appointments are designed to give your doctor time to listen, examine you, answer questions, and explain the next steps without promising a fixed visit length.",
    features: ["Unhurried conversations", "Thorough examinations", "Time to discuss your care plan"],
  },
  {
    title: "Medication Support",
    subtitle: "Ask about available options",
    description: "When in-office dispensing is available and appropriate, we explain the medication and price before you decide. Availability and savings vary by prescription.",
    features: ["Options explained before dispensing", "Availability varies by medication", "Retail alternatives remain available"],
  },
];

interface DpcBenefit {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

function DpcCarousel({
  benefits = dpcBenefits,
  prevLabel = "Previous card",
  nextLabel = "Next card",
  dotLabel = (n: number) => `Go to card ${n}`,
}: {
  benefits?: DpcBenefit[];
  prevLabel?: string;
  nextLabel?: string;
  dotLabel?: (n: number) => string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const getCardWidth = () => {
    const container = scrollRef.current;
    if (!container || !container.children[0]) return 0;
    const card = container.children[0] as HTMLElement;
    const gap = 32;
    return card.offsetWidth + gap;
  };

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, benefits.length - 1));
    const cardStep = getCardWidth();
    container.scrollTo({ left: clamped * cardStep, behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardStep = getCardWidth();
    if (cardStep === 0) return;
    const newIndex = Math.round(container.scrollLeft / cardStep);
    setActiveIndex(Math.max(0, Math.min(newIndex, benefits.length - 1)));
  };

  return (
    <div className="relative" data-testid="dpc-cards-scroll">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto px-6 md:px-12 lg:px-16 pb-6 scrollbar-hide snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onScroll={handleScroll}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[480px] snap-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            data-testid={`dpc-benefit-${index}`}
          >
            <div className="rounded-3xl border border-primary/30 bg-white h-full flex flex-col">
              <div className="p-6 md:p-10 flex flex-col flex-grow">
                <p className="text-secondary text-xs font-semibold uppercase tracking-widest mb-4 md:mb-5">{benefit.subtitle}</p>
                <h4 className="font-serif text-2xl md:text-3xl text-deep-navy mb-3 md:mb-4 leading-tight">{benefit.title}</h4>
                <p className="text-deep-navy/50 text-sm md:text-base leading-relaxed mb-5 md:mb-6">{benefit.description}</p>
                <div className="border-t border-primary/15 pt-5 space-y-3 mt-auto">
                  {benefit.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" weight="fill" />
                      <span className="text-deep-navy/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-6 mt-6">
        <button
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/5 transition-colors disabled:opacity-30"
          disabled={activeIndex === 0}
          aria-label={prevLabel}
          data-testid="dpc-prev"
        >
          <ArrowLeft className="w-5 h-5 text-primary" weight="regular" />
        </button>

        <div className="flex gap-2">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center"
              aria-label={dotLabel(i + 1)}
              data-testid={`dpc-dot-${i}`}
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-primary w-8' : 'bg-primary/20 w-2.5'}`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToIndex(Math.min(benefits.length - 1, activeIndex + 1))}
          className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/5 transition-colors disabled:opacity-30"
          disabled={activeIndex === benefits.length - 1}
          aria-label={nextLabel}
          data-testid="dpc-next"
        >
          <ArrowRight className="w-5 h-5 text-primary" weight="regular" />
        </button>
      </div>
    </div>
  );
}

interface InsuranceMembershipProps {
  eyebrow?: string;
  title?: React.ReactNode;
  dpcHeading?: string;
  dpcBold?: string;
  dpcParagraph1?: string;
  dpcParagraph2?: string;
  ctaText?: string;
  ctaHref?: string;
  benefits?: DpcBenefit[];
  carouselPrevLabel?: string;
  carouselNextLabel?: string;
  carouselDotLabel?: (n: number) => string;
}

export function InsuranceMembership({
  eyebrow = "Insurance & Membership",
  title = (
    <>
      Humana, Aetna, Cigna, Medicare and Medicaid.<br className="hidden lg:block" />{" "}No insurance? No&nbsp;problem.
    </>
  ),
  dpcHeading = "What is Direct Primary Care?",
  dpcBold = "Membership Primary Care with Priority Scheduling.",
  dpcParagraph1 = "This membership is a model where you pay one monthly fee directly to the practice for the covered primary care services listed in your agreement. Members can request priority appointments and contact the care team between visits.",
  dpcParagraph2 = "DPC is not health insurance and does not replace coverage for hospital care, specialists, or emergencies. Ask us for current pricing and inclusions, and consult a qualified tax adviser about HSA eligibility.",
  ctaText = "Ask About Membership",
  ctaHref = "/direct-primary-care",
  benefits,
  carouselPrevLabel,
  carouselNextLabel,
  carouselDotLabel,
}: InsuranceMembershipProps = {}) {
  const doubledLogos = [...insuranceLogosMarquee, ...insuranceLogosMarquee];

  return (
    <section className="section-gap bg-white" data-testid="section-insurance-highlight">
      <div className="container-radical">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">{eyebrow}</p>
          </div>
          <h2 className="h2 text-deep-navy">
            {title}
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden mb-10 md:mb-20">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />
        <div className="inline-flex w-max" data-testid="insurance-marquee">
          <motion.div
            className="flex items-center gap-12 md:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {doubledLogos.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="flex-shrink-0 h-20 md:h-28">
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={1920}
                  height={1080}
                  className="h-full w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-radical mb-8 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-deep-navy mb-4">
              {dpcHeading}
            </h3>
            <p className="body-md text-deep-navy font-bold leading-relaxed mb-4">
              {dpcBold}
            </p>
            <p className="body-md text-deep-navy/60 leading-relaxed mb-6">
              {dpcParagraph1}
            </p>
            <p className="body-md text-deep-navy/60 leading-relaxed">
              {dpcParagraph2}
            </p>
          </motion.div>
          <motion.div
            className="flex justify-start lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link href={ctaHref}>
              <Button
                size="lg"
                className="group"
                data-testid="button-insurance-cta"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" weight="regular" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <DpcCarousel
        benefits={benefits}
        prevLabel={carouselPrevLabel}
        nextLabel={carouselNextLabel}
        dotLabel={carouselDotLabel}
      />
    </section>
  );
}
