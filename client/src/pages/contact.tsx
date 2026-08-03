import * as React from "react";
import { motion } from "framer-motion";
import { Phone, Envelope, MapPin, NavigationArrow } from "@phosphor-icons/react";
import { PageHero, InsuranceLogos, MeetYourDoctor, TestimonialsSection, FaqSection } from "@/components/sections";
const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);
import { pageContentMap } from "@/lib/page-content";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { contactFaqs } from "@/lib/contact-faqs";
import { CLINIC_GMAPS_SHARE_URL, CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";
import { PrivacySafeGoogleMap } from "@/components/privacy-safe-google-map";

function extractFaqText(answer: React.ReactNode): string {
  if (typeof answer === "string") return answer;
  if (answer === null || answer === undefined) return "";
  if (typeof answer === "object" && "props" in (answer as any)) {
    const el = answer as React.ReactElement<{ children?: React.ReactNode }>;
    const children = el.props.children;
    if (Array.isArray(children)) {
      return children
        .map((child: React.ReactNode) => {
          if (typeof child === "string") return child;
          if (child && typeof child === "object" && "props" in (child as any)) {
            const c = (child as React.ReactElement<{ children?: React.ReactNode }>).props.children;
            return typeof c === "string" ? c : "";
          }
          return "";
        })
        .join("");
    }
    return typeof children === "string" ? children : "";
  }
  return String(answer);
}

export default function Contact() {
  const heroContent = pageContentMap["/contact"];

  const plainContactFaqs = contactFaqs.map((faq) => ({
    question: faq.question,
    answer: extractFaqText(faq.answer),
  }));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqPageSchema(plainContactFaqs)]} />
      <main id="main">
        {heroContent && (
          <>
            <PageHero
              title={heroContent.title}
              subtitle={heroContent.subtitle}
              subtitleBold={heroContent.subtitleBold}
              marqueeItems={heroContent.marqueeItems}
              heroImage={heroContent.heroImage}
              heroImageMobile={heroContent.heroImageMobile}
              heroImageAlt={heroContent.heroImageAlt}
              heroBlurPlaceholder={heroContent.heroBlurPlaceholder}
              primaryCtaText={heroContent.primaryCtaText || "Call Now"}
              primaryCtaHref="tel:2394230205"
              secondaryCtaText={heroContent.secondaryCtaText || "Request a Visit"}
              showSearchCard={true}
              expandedContactForm={true}
              mobileGreeting={heroContent.mobileGreeting}
            />
            <InsuranceLogos />
          </>
        )}

      <section id="page-content" className="section-gap">
        <div className="container-radical">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-16">
            <ContactCard
              icon={Phone}
              title="Call Us"
              detail="(239) 423-0205"
              description="Mon–Fri 8:30 AM – 5 PM · Sat 8:30 AM – 12 PM"
              href="tel:+1-239-423-0205"
              index={0}
            />
            <ContactCard
              icon={Envelope}
              title="Email Us"
              detail="info@faithfulcaremedical.com"
              description="We respond within one business day"
              href="mailto:info@faithfulcaremedical.com"
              index={1}
            />
            <ContactCard
              icon={MapPin}
              title="Visit Us"
              detail="9955 Tamiami Trail N. Suite 2"
              description="Naples, Florida 34108"
              href={CLINIC_GMAPS_SHARE_URL}
              index={2}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="bg-white rounded-2xl border border-primary/30 p-6 md:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-deep-navy mb-6" data-testid="text-office-hours-title">
                Office Hours
              </h2>
              <div className="space-y-4">
                <HoursRow day="Monday – Friday" hours="8:30 AM – 5:00 PM" />
                <HoursRow day="Saturday" hours="8:30 AM – 12:00 PM" />
                <HoursRow day="Sunday" hours="Closed" />
              </div>
              <div className="mt-8 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                <p className="text-deep-navy font-medium" data-testid="text-urgent-note">
                  Need urgent same-day care?
                </p>
                <p className="text-deep-navy/70 text-sm mt-1">
                  Call us first thing in the morning and we'll get you in the same day whenever possible.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl border border-primary/30 overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PrivacySafeGoogleMap
                className="flex-1 min-h-[300px] lg:min-h-[400px]"
                iframeTestId="map-google-embed-contact"
                loadButtonTestId="cta-load-map-contact"
                title="Faithful Care Medical Services - 9955 Tamiami Trail N. Suite 2, Naples, FL 34108"
                wrapperTestId="map-google-wrapper-contact"
              />
              <div className="p-4 flex items-center justify-between border-t border-primary/10">
                <p className="text-deep-navy/60 text-sm">9955 Tamiami Trail N. Suite 2, Naples, FL 34108</p>
                <a
                  href={CLINIC_GMAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline flex-shrink-0"
                  data-testid="link-directions"
                >
                  Get directions
                  <NavigationArrow className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <MeetYourDoctor />

      <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
        <InsuranceMembership />
      </React.Suspense>

      <TestimonialsSection />

      <FaqSection
        eyebrow="Before you call"
        title="Quick answers about visiting our Naples office."
        items={contactFaqs}
      />

      <section className="section-gap bg-primary/5">
        <div className="container-radical">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-navy mb-6" data-testid="text-new-patients-title">
              New Patients Welcome
            </h2>
            <p className="text-lg text-deep-navy/70 leading-relaxed mb-8">
              We accept most insurance plans including Medicare, Medicare Advantage, and commercial plans.
              Call us to verify your coverage and schedule your first visit.
            </p>
            <a
              href="tel:+1-239-423-0205"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
              data-testid="button-call-now"
            >
              <Phone className="w-5 h-5" />
              Call (239) 423-0205
            </a>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  detail,
  description,
  href,
  index,
}: {
  icon: typeof Phone;
  title: string;
  detail: string;
  description: string;
  href: string;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group bg-white rounded-2xl border border-primary/30 p-6 md:p-8 hover:border-primary/50 hover:shadow-lg transition-all block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`card-contact-${index}`}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md border border-primary/10 mb-5">
        <Icon className="w-7 h-7 text-primary" weight="regular" />
      </div>
      <h3 className="font-serif text-xl font-bold text-deep-navy mb-2 group-hover:text-primary transition-colors" data-testid={`text-contact-card-title-${index}`}>
        {title}
      </h3>
      <p className="text-primary font-semibold text-lg mb-1" data-testid={`text-contact-card-detail-${index}`}>
        {detail}
      </p>
      <p className="text-deep-navy/60 text-sm" data-testid={`text-contact-card-desc-${index}`}>
        {description}
      </p>
    </motion.a>
  );
}

function HoursRow({ day, hours }: { day: string; hours: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-primary/5 last:border-0">
      <span className="text-deep-navy font-medium">{day}</span>
      <span className="text-deep-navy/70">{hours}</span>
    </div>
  );
}
