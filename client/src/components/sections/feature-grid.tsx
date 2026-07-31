import { motion } from "framer-motion";
import { 
  Heart, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle, 
  DeviceMobile,
  type Icon as PhosphorIcon 
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: PhosphorIcon;
  title: string;
  description: string;
  color?: "primary" | "secondary";
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "Every interaction is guided by empathy and understanding for you and your loved ones.",
    color: "primary"
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Round-the-clock availability ensures support whenever you need it most.",
    color: "secondary"
  },
  {
    icon: Users,
    title: "Family-Centered",
    description: "We treat the whole family, coordinating care across generations.",
    color: "primary"
  },
  {
    icon: Shield,
    title: "Evidence-Based",
    description: "Our protocols are grounded in the latest clinical research and best practices.",
    color: "secondary"
  },
  {
    icon: CheckCircle,
    title: "Personalized Plans",
    description: "Care tailored to your unique health profile, goals, and preferences.",
    color: "primary"
  },
  {
    icon: DeviceMobile,
    title: "Digital-First",
    description: "Modern technology enhances your care experience at every touchpoint.",
    color: "secondary"
  }
];

export function FeatureGrid({ 
  title = "How we deliver better care",
  subtitle,
  features = defaultFeatures,
  columns = 3,
  className 
}: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <section 
      className={cn("section-gap bg-white", className)}
      data-testid="section-feature-grid"
    >
      <div className="container-radical">
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-10 md:mb-16 lg:mb-24 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">{subtitle}</p>
              </div>
            )}
            {title && (
              <h2 className="h2 text-deep-navy">{title}</h2>
            )}
          </motion.div>
        )}

        <div className={cn("grid grid-cols-1 gap-8", gridCols[columns])}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isPrimary = feature.color === "primary";

            return (
              <motion.div
                key={index}
                className={cn(
                  "p-5 md:p-8 rounded-2xl bg-white border",
                  isPrimary ? "border-primary/30 hover:border-primary/50" : "border-secondary/30 hover:border-secondary/50",
                  isPrimary ? "inner-glow-primary" : "inner-glow-teal",
                  "transition-colors group"
                )}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`feature-card-${index}`}
              >
                <div 
                  className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6",
                    isPrimary ? "bg-primary/10" : "bg-secondary/10"
                  )}
                >
                  <Icon className={cn(
                    "w-7 h-7",
                    isPrimary ? "text-primary" : "text-secondary"
                  )} weight="regular" />
                </div>
                <h3 className="font-semibold text-lg md:text-xl lg:text-2xl text-deep-navy mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="body-lg text-deep-navy/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
