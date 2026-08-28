import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { PageHero, InsuranceLogos, TealCta, MeetYourDoctor, TestimonialsSection, FaqSection } from "@/components/sections";
import type { FaqItem } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/lib/navigation-data";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";
import { SocialVideoCarousel } from "@/components/social-video-carousel";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";

const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);

export interface HubService {
  title: string;
  description: string;
  href: string;
}

export interface HubInfoSection {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  bullets?: React.ReactNode[];
  tags?: string[];
  cta?: { text: string; href: string };
}

export interface CareHubPageProps {
  path: "/primary-care" | "/palliative-care";
  categoryId: "primary-care" | "palliative-care";
  servicesEyebrow: string;
  servicesTitle: React.ReactNode;
  servicesIntro?: string;
  services: HubService[];
  infoSections?: HubInfoSection[];
  faq?: { eyebrow?: string; title: string; description?: string; items: FaqItem[] };
  tealCta: {
    subtitle: string;
    title: string;
    description: string;
  };
}

function faqAnswerText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(faqAnswerText).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return faqAnswerText(node.props.children);
  }
  return "";
}

export function InfoSection({ section, categoryId }: { section: HubInfoSection; categoryId: string }) {
  return (
    <section className="section-gap bg-white" data-testid={`section-hub-${section.id}-${categoryId}`}>
      <div className="container-radical">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {section.eyebrow && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{section.eyebrow}</p>
            </div>
          )}
          <h2 className="h2 text-deep-navy mb-6">{section.title}</h2>
          {section.description && (
            <p className="body-lg text-deep-navy/70 leading-relaxed">{section.description}</p>
          )}
        </motion.div>

        {section.bullets && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto mt-10">
            {section.bullets.map((bullet, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 bg-white rounded-2xl border border-primary/30 p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                data-testid={`bullet-${section.id}-${i}`}
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" weight="fill" />
                <span className="text-deep-navy/80 text-lg leading-relaxed">{bullet}</span>
              </motion.div>
            ))}
          </div>
        )}

        {section.tags && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {section.tags.map((tag) => (
              <span
                key={tag}
                className="border border-primary/30 rounded-full font-medium text-deep-navy/80 px-5 py-2.5 text-base md:text-lg"
                data-testid={`tag-${section.id}-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {section.cta && (
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href={section.cta.href} aria-label={section.cta.text} className="block w-full max-w-sm sm:w-auto">
              <Button
                size="lg"
                className="h-auto w-full max-w-full whitespace-normal px-5 text-center sm:w-auto sm:px-8"
                data-testid={`button-${section.id}-cta`}
              >
                {section.cta.text}
                <ArrowRight weight="regular" size={20} className="ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function CareHubPage({
  path,
  categoryId,
  servicesEyebrow,
  servicesTitle,
  servicesIntro,
  services,
  infoSections,
  faq,
  tealCta,
}: CareHubPageProps) {
  const content = pageContentMap[path];
  const category = navigationData.find((cat) => cat.id === categoryId);

  if (!content || !category) return null;

  const faqSchema = faq
    ? faqPageSchema(faq.items.map((item) => ({
        question: item.question,
        answer: faqAnswerText(item.answer).replace(/\s+/g, " ").trim(),
      })))
    : null;

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqSchema]} />
      <main id="main">
        <PageHero
          title={content.title}
          subtitle={content.subtitle}
          subtitleBold={content.subtitleBold}
          marqueeItems={content.marqueeItems}
          heroImage={content.heroImage}
          heroImageMobile={content.heroImageMobile}
          heroImageAlt={content.heroImageAlt}
          heroBlurPlaceholder={content.heroBlurPlaceholder}
          primaryCtaText="Call Now"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Get Directions"
          secondaryCtaHref={CLINIC_GMAPS_DIRECTIONS_URL}
          showSearchCard={true}
        />

        <InsuranceLogos />

        <SocialVideoCarousel placement={path === "/primary-care" ? "primary-care" : "palliative-care"} />

        <section id="page-content" className="section-gap bg-white" data-testid={`section-hub-services-${categoryId}`}>
          <div className="container-radical">
            <motion.div
              className="text-center mb-10 md:mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">{servicesEyebrow}</p>
              </div>
              <h2 className="h2 text-deep-navy mb-6">{servicesTitle}</h2>
              {servicesIntro && (
                <p className="body-lg text-deep-navy/70 leading-relaxed">{servicesIntro}</p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <Link
                    href={service.href}
                    className="group bg-white rounded-2xl border border-primary/30 p-6 md:p-8 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col h-full"
                    data-testid={`card-hub-${service.href.split("/").pop()}`}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md border border-primary/10 mb-5">
                      <category.icon className="w-7 h-7 text-primary" weight="regular" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-deep-navy mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-deep-navy/70 leading-relaxed mb-4 flex-1">{service.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {infoSections?.map((section) => (
          <InfoSection key={section.id} section={section} categoryId={categoryId} />
        ))}

        <MeetYourDoctor />

        <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
          <InsuranceMembership />
        </React.Suspense>

        <TestimonialsSection />

        {faq && (
          <FaqSection
            eyebrow={faq.eyebrow}
            title={faq.title}
            description={faq.description}
            items={faq.items}
          />
        )}

        <TealCta
          subtitle={tealCta.subtitle}
          title={tealCta.title}
          description={tealCta.description}
          primaryCtaText="Call (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>
    </div>
  );
}
