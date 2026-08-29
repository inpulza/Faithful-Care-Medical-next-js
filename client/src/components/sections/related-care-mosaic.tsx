import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";

export interface RelatedCareLink {
  title: string;
  description: string;
  href: string;
}

interface RelatedCareMosaicProps {
  eyebrow?: string;
  title: string;
  description: string;
  featured: RelatedCareLink & {
    image: string;
    imageAlt: string;
    imagePosition?: string;
  };
  links: RelatedCareLink[];
  dense?: boolean;
}

export function RelatedCareMosaic({
  eyebrow = "Connected care",
  title,
  description,
  featured,
  links,
  dense = false,
}: RelatedCareMosaicProps) {
  return (
    <section className="section-gap overflow-hidden bg-white" data-testid="section-related-care">
      <div className="container-radical">
        <motion.div
          className="mb-9 max-w-3xl md:mb-12"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
          </div>
          <h2 className="h2 text-deep-navy">{title}</h2>
          <p className="body-lg mt-5 max-w-2xl text-deep-navy/65">{description}</p>
        </motion.div>

        <div className="grid gap-4 lg:gap-5">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={featured.href}
              prefetch={false}
              className={cn(
                "group grid overflow-hidden rounded-3xl border border-primary/15 bg-deep-navy shadow-[0_24px_70px_-48px_rgba(0,40,82,0.7)]",
                "md:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] md:min-h-[420px]",
              )}
              data-testid="related-care-featured"
            >
              <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden bg-[#d9eef0] md:aspect-auto md:min-h-full">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1535px) 60vw, 960px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ objectPosition: featured.imagePosition ?? "center" }}
                />
              </div>
              <div className="flex min-h-[250px] flex-col justify-center p-7 text-white md:min-h-full md:p-9 lg:p-11">
                <span className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Featured guide
                </span>
                <h3 className="font-serif text-3xl leading-[1.08] md:text-[2.35rem]">{featured.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/[0.82] md:text-lg">{featured.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-semibold text-secondary">
                  Explore this care
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </motion.div>

          <div
            className={cn(
              "-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0",
              dense ? "xl:grid-cols-12" : "lg:grid-cols-2 xl:grid-cols-4",
            )}
          >
            {links.map((item, index) => (
              <motion.div
                key={item.href}
                className={cn(
                  "w-[82vw] max-w-sm flex-none snap-start sm:h-full sm:w-auto sm:max-w-none",
                  dense && links.length === 7 && (index < 4 ? "xl:col-span-3" : "xl:col-span-4"),
                )}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  prefetch={false}
                  className="group flex h-full min-h-48 flex-col rounded-3xl border border-primary/15 bg-[#f5f8fb] p-6 transition-colors hover:border-primary/35 hover:bg-primary/5 md:p-7"
                  data-testid={`related-care-link-${index}`}
                >
                  <span className="mb-4 font-mono text-xs text-primary" data-testid="related-care-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold leading-snug text-deep-navy transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-deep-navy/[0.72]">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
