import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  imageSrc?: string;
  variant?: "light" | "bordered";
  className?: string;
}

export function Testimonial({
  quote,
  author,
  role,
  company,
  imageSrc,
  variant = "light",
  className
}: TestimonialProps) {
  const isBordered = variant === "bordered";

  return (
    <section 
      className={cn("section-gap bg-white", className)}
      data-testid="section-testimonial"
    >
      <div className="container-radical">
        <motion.div 
          className={cn(
            "max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl",
            isBordered && "border border-primary/30 inner-glow-primary"
          )}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Quotes className="w-8 h-8 text-primary" weight="regular" />
          </div>

          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-deep-navy leading-relaxed mb-10">
            "{quote}"
          </blockquote>

          <div className="flex items-center justify-center gap-4" data-testid="testimonial-author-block">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={author}
                className="w-14 h-14 rounded-full object-cover border border-primary/30"
                data-testid="img-testimonial-author"
              />
            ) : (
              <div 
                className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center"
                data-testid="avatar-testimonial-author"
              >
                <span className="text-secondary font-bold text-xl">
                  {author.charAt(0)}
                </span>
              </div>
            )}
            <div className="text-left" data-testid="testimonial-author-info">
              <p className="font-semibold text-deep-navy" data-testid="text-testimonial-name">{author}</p>
              {(role || company) && (
                <p className="text-deep-navy/60" data-testid="text-testimonial-role">
                  {role}{role && company && ", "}{company}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
