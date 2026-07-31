import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router";
import { ArrowRight, ArrowLeft, ShieldCheck } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const dpcBenefits = [
  {
    title: "Unlimited Visits",
    subtitle: "No copays, no limits",
    description: "Visit your doctor as often as you need without worrying about copays or per-visit fees. Whether it's a quick follow-up or a comprehensive evaluation, every visit is included.",
    features: ["No copays or per-visit fees", "Follow-ups included at no extra cost", "Preventive and sick visits covered"],
  },
  {
    title: "Same-Day Access",
    subtitle: "Sick today, seen today",
    description: "When you're not feeling well, waiting weeks for an appointment isn't an option. Our members get priority scheduling with same-day and next-day availability.",
    features: ["Same-day and next-day appointments", "Minimal wait times in office", "Weekend availability for urgent needs"],
  },
  {
    title: "Direct Communication",
    subtitle: "Your doctor, one call away",
    description: "Reach your physician directly by phone, text, or video. No automated phone trees, no waiting for callbacks, no going through a front desk for simple questions.",
    features: ["Direct phone and text access", "Video consultations available", "Quick answers without an office visit"],
  },
  {
    title: "Transparent Pricing",
    subtitle: "One fee, everything included",
    description: "Pay one flat monthly membership fee that covers all your primary care needs. No surprise bills, no hidden charges, no complicated insurance claims to file.",
    features: ["Flat monthly membership fee", "No surprise bills or hidden costs", "HSA-eligible starting 2026"],
  },
  {
    title: "Longer Appointments",
    subtitle: "30 to 60 minutes, every time",
    description: "Your doctor spends 30 to 60 minutes with you at every visit. That means thorough exams, time to answer all your questions, and care plans you actually understand.",
    features: ["30 to 60 minutes per visit", "Thorough physical examinations", "Time for all your questions"],
  },
  {
    title: "Wholesale Medications",
    subtitle: "Prescriptions at cost",
    description: "Many common medications are dispensed directly from our office at wholesale prices. Save significantly compared to retail pharmacy costs for the prescriptions you take every day.",
    features: ["In-office medication dispensing", "Wholesale pricing on common drugs", "Savings vs. retail pharmacy prices"],
  },
];

interface DpcSectionProps {
  contextHeading: string;
  contextDescription: string;
}

function DpcCarousel() {
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
    const clamped = Math.max(0, Math.min(index, dpcBenefits.length - 1));
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
    setActiveIndex(Math.max(0, Math.min(newIndex, dpcBenefits.length - 1)));
  };

  return (
    <div className="relative" data-testid="dpc-cards-scroll">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto px-6 md:px-12 lg:px-16 pb-6 scrollbar-hide snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onScroll={handleScroll}
      >
        {dpcBenefits.map((benefit, index) => (
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
                <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4 md:mb-5">{benefit.subtitle}</p>
                <h4 className="font-serif text-2xl md:text-3xl text-deep-navy mb-3 md:mb-4 leading-tight">{benefit.title}</h4>
                <p className="text-deep-navy/50 text-base md:text-lg leading-relaxed mb-5 md:mb-6">{benefit.description}</p>
                <div className="border-t border-primary/15 pt-5 space-y-3.5 mt-auto">
                  {benefit.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" weight="fill" />
                      <span className="text-deep-navy/70 text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/5 transition-colors disabled:opacity-30"
          disabled={activeIndex === 0}
          aria-label="Previous card"
          data-testid="dpc-prev"
        >
          <ArrowLeft className="w-5 h-5 text-primary" weight="regular" />
        </button>

        <div className="flex gap-2">
          {dpcBenefits.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-primary w-8' : 'bg-primary/20'}`}
              aria-label={`Go to card ${i + 1}`}
              data-testid={`dpc-dot-${i}`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollToIndex(Math.min(dpcBenefits.length - 1, activeIndex + 1))}
          className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/5 transition-colors disabled:opacity-30"
          disabled={activeIndex === dpcBenefits.length - 1}
          aria-label="Next card"
          data-testid="dpc-next"
        >
          <ArrowRight className="w-5 h-5 text-primary" weight="regular" />
        </button>
      </div>
    </div>
  );
}

export function DpcSection({ contextHeading, contextDescription }: DpcSectionProps) {
  return (
    <section className="section-gap bg-white" data-testid="section-dpc">
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
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Direct Primary Care</p>
          </div>
          <h2 className="h2 text-deep-navy mb-6">
            {contextHeading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-deep-navy mb-4">
              What is Direct Primary Care?
            </h3>
            <p className="body-md text-deep-navy font-bold leading-relaxed mb-4">
              Membership Primary Care with Same-Day Access.
            </p>
            <p className="body-md text-deep-navy/60 leading-relaxed mb-6">
              This membership is a model where you pay one flat monthly fee directly to your doctor. In return, you get unlimited visits, same-day appointments, and direct access to your physician by phone or text.
            </p>
            <p className="body-md text-deep-navy/60 leading-relaxed">
              No insurance claims, no copays, no waiting weeks. Starting in 2026, DPC memberships are HSA-eligible. Pair it with a low-cost catastrophic plan for complete coverage.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="body-md text-deep-navy/60 leading-relaxed mb-6">
              {contextDescription}
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="group"
                data-testid="button-dpc-cta"
              >
                Ask About Membership
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" weight="regular" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <DpcCarousel />
    </section>
  );
}
