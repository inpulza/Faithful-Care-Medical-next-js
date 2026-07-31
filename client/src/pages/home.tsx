import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router";
import { ArrowRight, ShieldCheck, Clock, Stethoscope, HandHeart, ChatCircleDots, MapTrifold, FirstAid, Heartbeat, UsersThree, ClipboardText } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  TealCta,
  BentoGrid,
  PageHero,
  InsuranceLogos,
  marqueeDataMap,
  TestimonialsSection,
  MeetYourDoctor,
  FaqSection,
} from "@/components/sections";
const ServiceAreaMap = React.lazy(() => import("@/components/service-area-map"));
const ImageMarquee = React.lazy(() =>
  import("@/components/sections/image-marquee").then(m => ({ default: m.ImageMarquee }))
);
const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { homeFaqs } from "@/lib/home-faqs";
import { extractFaqText } from "@/lib/extract-faq-text";
import heroImage from "@/assets/images/hero-doctor-faithful-care.optimized.webp";
import heroImageMobile from "@/assets/images/hero-doctor-mobile.mobile.webp";
import heroSeniorWoman from "@/assets/images/hero-doctor-senior-woman.optimized.webp";
import heroSeniorWomanMobile from "@/assets/images/hero-doctor-senior-woman.mobile.webp";
import heroYoungWoman from "@/assets/images/hero-doctor-young-woman.optimized.webp";
import heroYoungWomanMobile from "@/assets/images/hero-doctor-young-woman.mobile.webp";
import heroYoungMan from "@/assets/images/hero-doctor-young-man.optimized.webp";
import heroYoungManMobile from "@/assets/images/hero-doctor-young-man.mobile.webp";
import heroWoman from "@/assets/images/hero-doctor-woman.optimized.webp";
import heroWomanMobile from "@/assets/images/hero-doctor-woman.mobile.webp";
import heroSeniorMan from "@/assets/images/hero-doctor-senior-man.optimized.webp";
import heroSeniorManMobile from "@/assets/images/hero-doctor-senior-man.mobile.webp";

const heroSlides = [heroImage, heroYoungWoman, heroSeniorWoman, heroYoungMan, heroWoman, heroSeniorMan];
const heroSlidesMobile = [heroImageMobile, heroYoungWomanMobile, heroSeniorWomanMobile, heroYoungManMobile, heroWomanMobile, heroSeniorManMobile];

const promiseCards = [
  {
    icon: Stethoscope,
    title: "One Doctor Who Knows You",
    description: "No revolving door of strangers. You see the same doctor who knows your history, your medications, and what matters to you."
  },
  {
    icon: Clock,
    title: "Same-Day Appointments",
    description: "When something feels wrong, you shouldn't wait weeks to be seen. Call us in the morning, visit us by afternoon."
  },
  {
    icon: ShieldCheck,
    title: "All Your Care in One Place",
    description: "Checkups, chronic conditions, labs, procedures, and palliative support. All coordinated under one roof so nothing falls through the cracks."
  },
  {
    icon: ChatCircleDots,
    title: "Time to Actually Listen",
    description: "No five-minute visits. We sit down, hear your concerns, answer every question, and make sure you leave feeling confident about your care."
  },
  {
    icon: HandHeart,
    title: "Your Family Is Part of the Team",
    description: "We talk to your family, explain treatment plans in plain language, and make sure everyone feels informed and at ease."
  },
  {
    icon: MapTrifold,
    title: "We Navigate the System for You",
    description: "Insurance questions, specialist referrals, medication management. We handle the complexity so you don't have to."
  },
];

function PromiseSection() {
  return (
    <section className="section-gap bg-white" data-testid="section-promise">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Our promise</p>
            </div>
            <h2 className="h2 text-deep-navy mb-6">
              Healthcare the way it should be.
            </h2>
            <p className="body-lg text-deep-navy/60 mb-10 max-w-md">
              At Faithful Care, we built a practice around one simple idea: treat every patient the way we'd treat our own family.
            </p>
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 py-6 border-t border-deep-navy/8">
                <span className="font-serif text-5xl font-light text-primary">6</span>
                <p className="text-deep-navy/50 text-sm leading-snug">commitments that guide<br />every patient interaction</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-deep-navy/6 rounded-2xl overflow-hidden border border-deep-navy/6">
              {promiseCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-7 md:p-8 bg-white cursor-default transition-colors duration-400 hover:bg-secondary"
                    style={{ transitionProperty: 'background-color' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    data-testid={`promise-card-${index}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary flex-shrink-0 transition-colors duration-400 promise-icon-box">
                        <Icon className="w-5 h-5 text-white/80 transition-colors duration-400 promise-icon" weight="regular" />
                      </div>
                      <span className="text-xs font-mono text-deep-navy/20 mt-2 transition-colors duration-400 promise-number">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-deep-navy mb-2 transition-colors duration-400 promise-title">
                      {card.title}
                    </h3>
                    <p className="text-sm text-deep-navy/50 leading-relaxed transition-colors duration-400 promise-desc">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const palliativeCareServices = [
  {
    id: 1,
    icon: FirstAid,
    title: "Pain & Comfort Management",
    description: "Personalized treatment plans to reduce chronic pain, shortness of breath, and discomfort. We coordinate with your specialists to adjust medications and therapies so you feel better, faster.",
    tags: ["Chronic Pain", "Medication Review", "Comfort Therapies", "Specialist Coordination"],
    href: "/palliative-care/symptom-relief",
    image: "/images/services/pain-comfort-management.webp",
  },
  {
    id: 2,
    icon: Heartbeat,
    title: "Symptom Relief",
    description: "Expert help with chronic pain, breathing difficulty, fatigue, nausea, anxiety, sleep problems, and appetite loss. So you can focus on living, not just managing symptoms.",
    tags: ["Pain Management", "Breathing Support", "Fatigue", "Nausea", "Anxiety", "Sleep"],
    href: "/palliative-care/symptom-relief",
    image: "/images/services/symptom-relief.webp",
  },
  {
    id: 3,
    icon: UsersThree,
    title: "Support for Patients & Families",
    description: "Guidance through serious illness for patients and their loved ones. Caregiver support, honest conversations about what to expect, emotional care, and help navigating difficult decisions.",
    tags: ["Caregiver Guidance", "Emotional Support", "Family Meetings", "Stress Management"],
    href: "/palliative-care/patient-family-support",
    image: "/images/services/patient-family-support.webp",
  },
  {
    id: 4,
    icon: ClipboardText,
    title: "Planning & Transitions",
    description: "Advance directives, living wills, goals of care discussions, and smooth coordination when the time is right. So your wishes are always honored.",
    tags: ["Advance Directives", "Living Wills", "Goals of Care", "Hospice Coordination"],
    href: "/palliative-care/planning-transitions",
    image: "/images/services/planning-transitions.webp",
  },
];

function PalliativeCareSection() {
  return (
    <section className="bg-[#00c2cc]" data-testid="section-palliative-care">
      <div className="container-radical py-12 md:py-20 lg:py-28">
        <motion.div
          className="text-center mb-10 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/80" />
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Palliative care in Naples, FL</p>
          </div>
          <h2 className="h2 text-white max-w-3xl mx-auto">
            Extra support when facing a<br className="hidden lg:block" /> serious illness.
          </h2>
          <p className="body-md text-white/80 leading-relaxed mt-6 max-w-2xl mx-auto">
            Not hospice. An extra layer of medical support available at any stage of a serious illness, alongside your regular treatment. The goal is to improve quality of life for both patients and families.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/palliative-care" aria-label="Explore palliative care in Naples">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" data-testid="button-palliative-care-hub">
                Explore Palliative Care
                <ArrowRight weight="regular" size={20} className="ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="lg:relative">
          {palliativeCareServices.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === palliativeCareServices.length - 1;
            return (
              <div
                key={service.id}
                className="lg:sticky flex items-center"
                style={{
                  top: `clamp(2vh, 10vh, calc(50vh - 280px))`,
                  zIndex: 10 + index,
                }}
                data-testid={`palliative-row-${index}`}
              >
                <motion.div
                  className={`bg-white rounded-3xl border border-primary/30 w-full ${isLast ? '' : 'mb-6 lg:mb-8'}`}
                  style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <div className="flex items-center gap-4 mb-5 md:hidden">
                    <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0" />
                    <h3 className="font-semibold text-2xl text-deep-navy">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr] items-center"
                    style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    <div className="order-2 md:order-1">
                      <div className="hidden md:flex items-center gap-3" style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
                        <motion.span
                          className="font-mono font-semibold text-primary/40 tracking-wider"
                          style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        >
                          {String(index + 1).padStart(2, "0")} / {String(palliativeCareServices.length).padStart(2, "0")}
                        </motion.span>
                        <div className="flex-1 h-px bg-primary/10" />
                      </div>

                      <div className="hidden md:flex items-center gap-4" style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)' }}>
                        <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0" />
                        <h3 className="font-semibold text-deep-navy" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.875rem)' }}>
                          {service.title}
                        </h3>
                      </div>

                      <p
                        className="text-deep-navy/60 leading-relaxed max-w-xl"
                        style={{
                          fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                          marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                        }}
                      >
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-3" style={{ marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
                        {service.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            className="border border-primary/30 rounded-full font-medium text-deep-navy/70 cursor-default"
                            style={{
                              padding: 'clamp(0.375rem, 0.8vh, 0.5rem) clamp(0.875rem, 1.5vw, 1.25rem)',
                              fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: "hsl(216, 100%, 50%)", color: "#fff", borderColor: "hsl(216, 100%, 50%)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      <Link href={service.href} aria-label={`Learn more about ${service.title}`}>
                        <Button size="lg" data-testid={`link-palliative-${index}`}>
                          <span aria-hidden="true">Learn More</span>
                          <span className="sr-only">Learn more about {service.title}</span>
                          <ArrowRight weight="regular" size={20} className="ml-2" aria-hidden="true" />
                        </Button>
                      </Link>

                      <div className="flex items-center gap-3" style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1.5rem)' }}>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-secondary"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-sm text-deep-navy/40 font-medium">
                          {index === 0 && "Coordinated with your specialists"}
                          {index === 1 && "Available alongside your current treatment"}
                          {index === 2 && "Support for patients and caregivers"}
                          {index === 3 && "Your wishes, always honored"}
                        </span>
                      </div>
                    </div>

                    <div
                      className="order-1 md:order-2 aspect-[3/2] md:aspect-[4/5] lg:aspect-square rounded-2xl bg-primary/5 border border-primary/30 overflow-hidden relative"
                      data-testid={`palliative-image-${index}`}
                    >
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-md border border-primary/10">
                        <Icon className="w-6 h-6 text-primary" weight="regular" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const plainHomeFaqs = homeFaqs.map((faq) => ({
    question: faq.question,
    answer: extractFaqText(faq.answer),
  }));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqPageSchema(plainHomeFaqs)]} />
      <main id="main">
        <PageHero
          title={<>Primary Care &amp; Palliative Care<br className="hidden lg:block" /> in Naples, Florida.</>}
          subtitle="Annual checkups, chronic disease management, same-day visits, and compassionate palliative support. All under one roof in Naples, Florida. We simplify your healthcare so you can focus on what matters most."
          subtitleBold="Primary Care & Palliative Care."
          primaryCtaText="Call Now"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Request a Visit"
          marqueeItems={["Accepting new patients", "Naples, FL", "Same-day appointments", "Medicare, Medicaid, Aetna, Cigna & Humana"]}
          heroImage={heroImage}
          heroImageMobile={heroImageMobile}
          heroImages={heroSlides}
          heroImagesMobile={heroSlidesMobile}
          heroImageAlt="Dr. Addys Reve, founder of Faithful Care Medical Services, providing compassionate primary and palliative care in Naples, Florida"
          heroBlurPlaceholder="data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwBACdASoUAAsAPu1orU2ppqSiMAgBMB2JaACxC8AJW1kgpoUTNzNZ+gAA/vforvEhALTYVpUo1d+4Smfo1ttD85s/YgUVhX2MxrlngUyzldYql84PMsNvr3peRFj50rgtGHJD3mE9OQAA"
          showSearchCard={true}
          variant="home"
          mobileGreeting
        />

        <InsuranceLogos />

        <BentoGrid
          id="page-content"
          subtitle="Everything your family needs"
          title="Six primary care services to keep you healthy, all year long."
        />

        <PalliativeCareSection />

        <PromiseSection />

        {marqueeDataMap["/"] && (
          <React.Suspense fallback={<div style={{ minHeight: "clamp(220px, 30vh, 360px)" }} aria-hidden="true" />}>
            <ImageMarquee items={marqueeDataMap["/"]} />
          </React.Suspense>
        )}

        <React.Suspense fallback={<div style={{ minHeight: "clamp(700px, 90vh, 1180px)" }} aria-hidden="true" />}>
          <ServiceAreaMap />
        </React.Suspense>

        <MeetYourDoctor />

        <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
          <InsuranceMembership />
        </React.Suspense>

        <TestimonialsSection />

        <FaqSection
          eyebrow="Frequently asked questions"
          title="Answers for new patients in Naples and Southwest Florida."
          items={homeFaqs}
        />

        <TealCta
          subtitle="Your health can't wait"
          title="Book your visit at Faithful Care today."
          description="Whether you need a routine checkup, help managing a chronic condition, or compassionate support through a difficult diagnosis, we're here for you and your family. One call is all it takes."
          primaryCtaText="Schedule a Visit"
          primaryCtaHref="/contact"
          secondaryCtaText="Call (239) 423-0205"
          secondaryCtaHref="tel:2394230205"
        />
      </main>
    </div>
  );
}
