import { motion } from "framer-motion";
import { CLINIC_GMAPS_SHARE_URL } from "@/lib/clinic-location";

const DOCTOR_PATIENT_DESKTOP = "/images/testimonials/doctor-patient.optimized.webp";
const DOCTOR_PATIENT_MOBILE = "/images/testimonials/doctor-patient.mobile.webp";
const DOCTOR_PATIENT_BLUR = "data:image/webp;base64,UklGRh4BAABXRUJQVlA4IBIBAACwBgCdASoYABgAPtFgqE+oJSOiKAgBABoJbACdMoMfuTASrFu6GzTWDy7j6xGT+XxTmnDK3lPxMjwWfWeYAAD+5zezM1GZFRB4ftNJEabsEgGeP6Z8YkBNlNfNfxyguRPeAyaqA/5EYxb7K4RZoiE/yg0p1c3O55kBvG7akgGbZv/6x2KAdNjvAnzjQOMrwd4my9e9iJKwyD0jYdRZ3qG9ypMuBCRwzFBeDyZvdiVaeXlfSJAocwev1cv8L7Dn4vMDiRGSCPcrelq7TjSvmDcXrtq4H0n2xHh9gbRVqRiR01qPBjSdL0XsXhiStxFX36Bex3qiag90y1niwQtUZWLBo/Q7dUXGk+ONAFcxXMb8IwAA";
import { TESTIMONIALS_FTC_DISCLAIMER, GOOGLE_RATING } from "@/lib/provider-info";

const GOOGLE_REVIEWS_URL = CLINIC_GMAPS_SHARE_URL;

const reviews = [
  {
    quote: "Brought my mom in for her yearly Medicare wellness check. She's 81 and has been nervous about doctors since my dad passed. Dr. Reve was incredibly patient with her, spoke slowly, made sure she understood everything. They checked her balance, asked about falls, reviewed all seven of her medications. My mom actually said she wants to go back, which is a first. That says a lot.",
    author: "Marbelis Tomás",
    role: "Google review · 5 stars",
    featured: true,
  },
  {
    quote: "I absolutely love this practice. I am originally from Cuba and cuban doctors in general are top notch! Dr. Reve gave me her full attention, the on-site labs made my visit so much smoother, and the office ambiance made me feel right at home.",
    author: "Rosario Abreu",
    role: "Local Guide · 5 stars",
    featured: false,
  },
  {
    quote: "Switched to Faithful Care after my old doctor's office stopped taking my insurance. Honestly should have moved years ago. Called Tuesday morning about a sinus thing that wouldn't go away and they got me in by 2pm the same day. Dr. Reve actually sat down, asked about my work and my family, didn't just hand me a prescription and rush out. The front desk being bilingual made things so much easier for my husband too. Worth the drive from East Naples.",
    author: "Yanet García",
    role: "Google review · 5 stars",
    featured: false,
  },
];

const stats = [
  { value: "98%", label: "of patients recommend us to family" },
  { value: GOOGLE_RATING.value, label: "star average rating on Google" },
  { value: "30+", label: "minutes average per appointment" },
];

export function StarRating({ size = "md" }: { size?: "sm" | "md" }) {
  const dimension = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-1" data-testid="star-rating">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${dimension} text-primary`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

interface TestimonialReview {
  quote: string;
  author: string;
  role: string;
  featured: boolean;
}

interface TestimonialStat {
  value: string;
  label: string;
}

interface TestimonialsSectionProps {
  showFtcDisclaimer?: boolean;
  eyebrow?: string;
  title?: string;
  statsNote?: string;
  statsOverride?: TestimonialStat[];
  reviewsOverride?: TestimonialReview[];
  featuredImageAlt?: string;
  googleEyebrow?: string;
  googleTitle?: string;
  googleCtaText?: string;
  disclaimerText?: string;
}

export function TestimonialsSection({
  showFtcDisclaimer = true,
  eyebrow = "Testimonials",
  title = "What our patients are saying",
  statsNote = "Some data about our patients",
  statsOverride,
  reviewsOverride,
  featuredImageAlt = "Dr. Reve with a smiling senior patient at Faithful Care Medical Services",
  googleEyebrow = "Google Business Profile",
  googleTitle = "Read more reviews from our patients",
  googleCtaText = "See on Google",
  disclaimerText,
}: TestimonialsSectionProps = {}) {
  const activeReviews = reviewsOverride ?? reviews;
  const activeStats = statsOverride ?? stats;
  const featured = activeReviews[0];
  const sideReviews = activeReviews.slice(1);

  return (
    <section className="section-gap bg-white" data-testid="section-testimonials">
      <div className="container-radical">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">

          <motion.div
            className="md:col-span-2 lg:col-span-3 flex flex-col justify-center"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
            </div>
            <h2 className="h2 text-deep-navy mb-8" style={{ fontSize: 'clamp(28px, 2.8vw, 40px)' }}>
              {title}
            </h2>

            <div className="border-t border-deep-navy/10 pt-6">
              <p className="text-sm text-deep-navy/50 mb-6">{statsNote}</p>
              <div className="space-y-5">
                {activeStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    data-testid={`stat-${index}`}
                  >
                    <p className="text-3xl font-bold text-deep-navy leading-none mb-1">{stat.value}</p>
                    <p className="text-sm text-deep-navy/50">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-1 lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden bg-white border border-deep-navy/8 h-full flex flex-col" data-testid="review-card-featured">
              <div className="relative w-full aspect-[16/10] md:aspect-[5/4] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10">
                <img
                  src={DOCTOR_PATIENT_BLUR}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-105 blur-lg"
                  style={{ objectPosition: 'center 18%' }}
                />
                <picture>
                  <source media="(max-width: 767px)" srcSet={DOCTOR_PATIENT_MOBILE} type="image/webp" />
                  <source srcSet={DOCTOR_PATIENT_DESKTOP} type="image/webp" />
                  <img
                    src={DOCTOR_PATIENT_DESKTOP}
                    alt={featuredImageAlt}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center 18%' }}
                    data-testid="img-featured-review"
                  />
                </picture>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <StarRating />
                <blockquote className="mt-4 text-deep-navy font-serif text-base md:text-lg lg:text-xl leading-relaxed flex-grow">
                  "{featured.quote}"
                </blockquote>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-deep-navy/8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{featured.author.charAt(0)}</span>
                  </div>
                  <div data-testid="review-author-0">
                    <p className="font-semibold text-deep-navy text-sm">{featured.author}</p>
                    <p className="text-deep-navy/50 text-xs">{featured.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-1 lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            {sideReviews.map((review, index) => (
              <motion.div
                key={index}
                className="rounded-2xl bg-white border border-deep-navy/8 p-6 md:p-8 flex flex-col flex-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.12 }}
                data-testid={`review-card-${index + 1}`}
              >
                <StarRating />
                <blockquote className="mt-4 text-deep-navy text-base leading-relaxed flex-grow">
                  "{review.quote}"
                </blockquote>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-deep-navy/8" data-testid={`review-author-${index + 1}`}>
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold text-sm">{review.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-deep-navy text-sm">{review.author}</p>
                    <p className="text-deep-navy/50 text-xs">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        <motion.a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 lg:mt-14 rounded-3xl bg-gradient-to-br from-primary/8 via-white to-secondary/10 border border-primary/20 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 group hover:border-primary/40 hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          data-testid="card-google-reviews"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white border border-deep-navy/8 flex items-center justify-center flex-shrink-0 shadow-sm">
              <GoogleIcon className="w-7 h-7 lg:w-8 lg:h-8" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-deep-navy/50 font-semibold mb-1">{googleEyebrow}</p>
              <p className="text-deep-navy font-semibold text-lg lg:text-xl">{googleTitle}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl lg:text-4xl font-bold text-deep-navy leading-none">{GOOGLE_RATING.value}</span>
              <div className="flex flex-col gap-1">
                <StarRating size="sm" />
                <span className="text-xs text-deep-navy/50">Faithful Care Medical Services</span>
              </div>
            </div>
            <span className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-sm font-semibold whitespace-nowrap group-hover:gap-3 transition-all">
              {googleCtaText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </motion.a>

        {showFtcDisclaimer && (
          <p
            className="mt-6 text-center text-sm text-deep-navy/60 leading-relaxed"
            data-testid="testimonials-ftc-disclaimer"
          >
            {disclaimerText ?? TESTIMONIALS_FTC_DISCLAIMER}
          </p>
        )}

      </div>
    </section>
  );
}
