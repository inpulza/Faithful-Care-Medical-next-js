import { motion } from "framer-motion";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { PageHero, InsuranceLogos, TealCta, TestimonialsSection } from "@/components/sections";
import { StarRating, GoogleIcon } from "@/components/sections/testimonials-section";
import { Button } from "@/components/ui/button";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL, CLINIC_GMAPS_SHARE_URL } from "@/lib/clinic-location";
import { GOOGLE_RATING, GOOGLE_REVIEW_LINK_MARKER } from "@/lib/provider-info";

const REVIEWS_EMBED_PLACEHOLDER =
  "[COMPLETAR: insertar aquí el bloque de reseñas reales de Google (widget o listado). No escribir reseñas a mano; mostrar solo las reales de Google.]";

const REVIEW_COUNT_PLACEHOLDER = "[COMPLETAR: número de reseñas del perfil de Google]";

function GoogleRatingSection() {
  return (
    <section id="page-content" className="section-gap bg-white" data-testid="section-google-rating">
      <div className="container-radical">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Rating</p>
          </div>
          <h2 className="h2 text-deep-navy mb-6">Our Google rating</h2>
          <p className="body-lg text-deep-navy/70 leading-relaxed">
            Real ratings from real patients on our Google Business Profile.
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto mt-10 rounded-3xl border border-primary/30 bg-white p-8 md:p-10 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          data-testid="card-google-rating"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border border-primary/10 shadow-md flex items-center justify-center">
            <GoogleIcon className="w-7 h-7" />
          </div>
          <span className="text-6xl font-bold text-deep-navy leading-none" data-testid="text-google-rating">
            {GOOGLE_RATING.value}
          </span>
          <StarRating />
          <p className="text-deep-navy/70 text-lg">stars on {GOOGLE_RATING.source}</p>
          <p className="text-deep-navy/60 text-sm" data-testid="text-review-count-marker">
            {REVIEW_COUNT_PLACEHOLDER}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ReviewsEmbedPlaceholder() {
  return (
    <section className="section-gap bg-white" data-testid="section-reviews-embed-placeholder">
      <div className="container-radical">
        <div className="max-w-3xl mx-auto rounded-3xl border border-dashed border-secondary/50 bg-secondary/5 p-8 md:p-10 text-center">
          <p className="text-deep-navy/70 text-lg leading-relaxed" data-testid="text-reviews-embed-marker">
            {REVIEWS_EMBED_PLACEHOLDER}
          </p>
        </div>
      </div>
    </section>
  );
}

function LeaveReviewCard({
  lang,
  heading,
  supportText,
  buttonText,
  testId,
}: {
  lang?: string;
  heading: React.ReactNode;
  supportText: string;
  buttonText: string;
  testId: string;
}) {
  return (
    <motion.div
      lang={lang}
      className="rounded-3xl border border-primary/30 bg-white p-8 md:p-10 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      data-testid={`card-${testId}`}
    >
      <h2 className="h2 text-deep-navy mb-6" style={{ fontSize: "clamp(26px, 2.6vw, 36px)" }}>
        {heading}
      </h2>
      <p className="body-lg text-deep-navy/70 leading-relaxed mb-8 flex-grow">{supportText}</p>
      <Button asChild size="lg" data-testid={`button-${testId}`}>
        <a href={CLINIC_GMAPS_SHARE_URL} target="_blank" rel="noopener noreferrer">
          {buttonText}
          <ArrowSquareOut className="ml-2 w-5 h-5" aria-hidden="true" />
        </a>
      </Button>
    </motion.div>
  );
}

function LeaveReviewSection() {
  return (
    <section className="section-gap bg-white" data-testid="section-leave-review">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <LeaveReviewCard
            heading={
              <>
                Are you a patient?
                <br />
                Leave us a review
              </>
            }
            supportText="Your review helps other Naples families find us. It takes less than a minute and it means a lot to us."
            buttonText="Leave a review on Google"
            testId="leave-review-en"
          />
          <LeaveReviewCard
            lang="es"
            heading={
              <>
                ¿Es usted paciente?
                <br />
                Déjenos su reseña
              </>
            }
            supportText="Su opinión ayuda a que otras familias de Naples nos encuentren. Le toma menos de un minuto y para nosotros significa mucho."
            buttonText="Dejar mi reseña en Google"
            testId="leave-review-es"
          />
        </div>
        <p
          className="mt-8 max-w-3xl mx-auto text-center text-deep-navy/60 text-sm leading-relaxed rounded-2xl border border-dashed border-secondary/50 bg-secondary/5 p-4"
          data-testid="text-review-link-marker"
        >
          {GOOGLE_REVIEW_LINK_MARKER}
        </p>
      </div>
    </section>
  );
}

export default function Reviews() {
  const content = pageContentMap["/reviews"];

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
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

        <GoogleRatingSection />

        <TestimonialsSection />

        <ReviewsEmbedPlaceholder />

        <LeaveReviewSection />

        <TealCta
          subtitle="New Patients Welcome"
          title="Call and request your appointment."
          description="New patients are welcome at our Naples office. Same-day visits when you are sick, in English and in Spanish."
          primaryCtaText="Call (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>
    </div>
  );
}
