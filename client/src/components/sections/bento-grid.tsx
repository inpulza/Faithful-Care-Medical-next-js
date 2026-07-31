import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/router";
import { 
  ArrowRight, 
  ShieldCheck, 
  Heartbeat, 
  FirstAidKit, 
  FlowerLotus, 
  UserCircle, 
  Stethoscope,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";

interface BentoService {
  icon: Icon;
  title: string;
  description: string;
  href: string;
  image: string;
}

interface BentoCta {
  text: string;
  href: string;
}

interface BentoGridProps {
  id?: string;
  subtitle?: string;
  title?: string;
  className?: string;
  services?: BentoService[];
  primaryCta?: BentoCta;
  secondaryCta?: BentoCta;
  cardCtaText?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const primaryServices = [
  {
    icon: ShieldCheck,
    title: "Checkups & Prevention",
    description: "Annual physicals, screenings, and immunizations.",
    href: "/primary-care/checkups-prevention",
    image: "/images/services/checkups-prevention.webp",
  },
  {
    icon: Heartbeat,
    title: "Chronic Disease Management",
    description: "Diabetes, blood pressure, COPD, and heart disease.",
    href: "/primary-care/chronic-disease",
    image: "/images/services/chronic-disease.webp",
  },
  {
    icon: FirstAidKit,
    title: "Same-Day & Urgent Visits",
    description: "Sick today? We see you today.",
    href: "/primary-care/same-day-visits",
    image: "/images/services/same-day-visits.webp",
  },
  {
    icon: FlowerLotus,
    title: "Women's Health",
    description: "Annual exams, hormonal health, and screenings.",
    href: "/primary-care/womens-health",
    image: "/images/services/womens-health.webp",
  },
  {
    icon: UserCircle,
    title: "Senior Care",
    description: "Fall prevention, memory care, and medications.",
    href: "/primary-care/senior-care",
    image: "/images/services/senior-care.webp",
  },
  {
    icon: Stethoscope,
    title: "In-Office Procedures",
    description: "EKGs, labs, injections, and wound care.",
    href: "/primary-care/procedures-diagnostics",
    image: "/images/services/in-office-procedures.webp",
  },
];


export function BentoGrid({
  id,
  subtitle,
  title,
  className,
  services = primaryServices,
  primaryCta = { text: "Schedule a Visit", href: "/contact" },
  secondaryCta = { text: "Explore Primary Care", href: "/primary-care" },
  cardCtaText,
}: BentoGridProps) {
  return (
    <section 
      id={id}
      className={cn("section-gap bg-white", className)}
      data-testid="section-bento-grid"
    >
      <div className="container-radical">
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-8 md:mb-16"
            {...fadeInUp}
          >
            {subtitle && (
              <div className="flex items-center justify-center gap-2 mb-6" data-testid="bento-subtitle">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                  {subtitle}
                </p>
              </div>
            )}
            {title && (
              <h2 className="h2 text-deep-navy max-w-3xl mx-auto" data-testid="bento-title">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          data-testid="bento-primary-services"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              href={service.href}
              image={service.image}
              delay={0.05 + index * 0.06}
              index={index}
              ctaText={cardCtaText}
              data-testid={`bento-service-primary-${index}`}
            />
          ))}
        </div>

        <motion.div 
          className="mt-8 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href={primaryCta.href}>
            <Button size="lg" data-testid="button-bento-cta">
              {primaryCta.text}
              <ArrowRight weight="regular" size={20} className="ml-2" />
            </Button>
          </Link>
          <Link href={secondaryCta.href}>
            <Button size="lg" variant="outline" data-testid="button-bento-primary-care-hub">
              {secondaryCta.text}
              <ArrowRight weight="regular" size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
