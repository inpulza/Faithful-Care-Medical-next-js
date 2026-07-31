import * as React from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";

function FadeInImage({ src, alt, title, testId, compact, index }: { src: string; alt: string; title: string; testId: string; compact?: boolean; index: number }) {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // Server-rendered pages can have the image already complete before
  // hydration, so `onLoad` never fires. Check the element directly.
  React.useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <motion.div 
      className={`${compact ? 'h-12 sm:h-14 md:h-[80px]' : 'h-12 sm:h-14 md:h-16 lg:h-[88px] xl:h-[104px]'} flex items-center justify-center shrink-0`}
      data-testid={testId}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      <img 
        ref={imgRef}
        src={src}
        alt={alt}
        title={title}
        width={1920}
        height={1080}
        className={`h-full w-auto object-contain grayscale transition-opacity duration-300 ease-out ${loaded ? 'opacity-70 hover:opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </motion.div>
  );
}

const insuranceProviders = [
  { name: "Humana", src: "/images/logos/humana.webp", alt: "Humana accepted in-network for palliative care, out-of-network benefits for primary care" },
  { name: "Aetna", src: "/images/logos/aetna-health-insurance.webp", alt: "Aetna Medicare Advantage and commercial plans accepted at Faithful Care Naples" },
  { name: "Cigna", src: "/images/logos/cigna-healthcare.webp", alt: "Cigna commercial plans accepted at Faithful Care Naples" },
  { name: "Original Medicare", src: "/images/logos/medicare.webp", alt: "Original Medicare Parts A and B accepted at Faithful Care Naples" },
  { name: "Florida Medicaid (Sunshine Health)", src: "/images/logos/sunshine-health.webp", alt: "Florida Medicaid via Sunshine Health accepted at Faithful Care Naples" },
];

interface InsuranceLogosProps {
  className?: string;
  compact?: boolean;
  eyebrow?: string;
  note?: React.ReactNode;
  providers?: { name: string; src: string; alt: string }[];
}

export function InsuranceLogos({
  className,
  compact = false,
  eyebrow = "Accepted insurance plans",
  note,
  providers = insuranceProviders,
}: InsuranceLogosProps) {
  return (
    <section 
      className={`bg-white ${compact ? 'pt-8 md:pt-20 pb-8 md:pb-12' : 'pt-10 sm:pt-16 md:pt-28 lg:pt-44 pb-10 md:pb-16'} ${className || ""}`} 
      data-testid="section-insurance"
    >
      <div className="container-radical">
        <motion.div 
          className={`flex justify-center ${compact ? 'mb-6 md:mb-8' : 'mb-10'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </motion.div>
        
        <div 
          className={`flex flex-wrap md:flex-nowrap justify-center items-center ${compact ? 'gap-x-6 gap-y-5 md:gap-x-8 lg:gap-x-10' : 'gap-x-6 gap-y-5 sm:gap-x-8 md:gap-x-8 lg:gap-x-10 xl:gap-x-14'}`}
        >
          {providers.map((insurance, index) => (
            <FadeInImage
              key={insurance.name}
              src={insurance.src}
              alt={insurance.alt}
              title={insurance.name}
              testId={`logo-insurance-${insurance.name.toLowerCase().replace(/\s+/g, '-')}`}
              compact={compact}
              index={index}
            />
          ))}
        </div>

        <p
          className={`text-center text-sm text-deep-navy/65 max-w-2xl mx-auto ${compact ? 'mt-6' : 'mt-8 md:mt-10'}`}
          data-testid="text-insurance-note"
        >
          {note ?? (
            <>
              Humana is in-network for Palliative Care and provides out-of-network benefits for Primary Care. Don&rsquo;t see your plan? Call <a href="tel:2394230205" className="underline font-medium text-deep-navy hover:text-primary">(239) 423-0205</a> and we&rsquo;ll verify coverage for you.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
