import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";

export interface StackedFeatureStory {
  icon: PhosphorIcon;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  note?: string;
  cta?: { label: string; href: string };
}

interface StackedFeatureStoriesProps {
  eyebrow: string;
  title: string;
  description?: string;
  stories: StackedFeatureStory[];
  className?: string;
  testId?: string;
}

export function StackedFeatureStories({
  eyebrow,
  title,
  description,
  stories,
  className = "bg-[#00c2cc]",
  testId = "section-stacked-feature-stories",
}: StackedFeatureStoriesProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className={className} data-testid={testId}>
      <div className="container-radical py-12 md:py-20 lg:py-28">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-16 lg:mb-20"
          data-testid={`${testId}-header`}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-deep-navy" />
            <p className="text-sm font-semibold uppercase tracking-widest text-deep-navy">{eyebrow}</p>
          </div>
          <h2 className="h2 text-deep-navy">{title}</h2>
          {description && <p className="body-md mx-auto mt-6 max-w-2xl leading-relaxed text-deep-navy">{description}</p>}
        </motion.div>

        <div className="lg:relative">
          {stories.map((story, index) => {
            const Icon = story.icon;
            const isLast = index === stories.length - 1;
            return (
              <div
                key={story.title}
                className="flex items-center lg:sticky"
                style={{ top: "clamp(2vh, 10vh, calc(50vh - 280px))", zIndex: 10 + index }}
              >
                <motion.article
                  className={`w-full rounded-3xl border border-primary/30 bg-white ${isLast ? "" : "mb-6 lg:mb-8"}`}
                  style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  data-testid={`${testId}-story-${index}`}
                >
                  <div className="mb-5 flex items-center gap-4 md:hidden">
                    <span className="h-3 w-3 flex-shrink-0 rounded-full bg-secondary" />
                    <h3 className="text-2xl font-semibold text-deep-navy">{story.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
                    <div className="order-2 md:order-1">
                      <div className="mb-4 hidden items-center gap-3 md:flex">
                        <span className="font-mono text-lg font-semibold tracking-wider text-primary">
                          {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-primary/10" />
                      </div>
                      <div className="mb-5 hidden items-center gap-4 md:flex">
                        <span className="h-3 w-3 flex-shrink-0 rounded-full bg-secondary" />
                        <h3 className="text-[clamp(1.25rem,2vw,1.875rem)] font-semibold text-deep-navy">{story.title}</h3>
                      </div>
                      <p className="mb-6 max-w-xl text-base leading-relaxed text-deep-navy/65 md:text-lg">{story.description}</p>
                      <div className="mb-6 flex flex-wrap gap-2.5">
                        {story.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-primary/25 px-4 py-2 text-sm font-medium text-deep-navy/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {story.cta && (
                        <Button asChild size="lg">
                          <Link href={story.cta.href}>
                            {story.cta.label}
                            <ArrowRight className="ml-2" size={20} aria-hidden="true" />
                          </Link>
                        </Button>
                      )}
                      {story.note && (
                        <div
                          className="mt-5 flex items-center gap-3 text-sm font-medium text-deep-navy"
                          data-testid={`${testId}-story-${index}-note`}
                        >
                          <span className="h-2 w-2 rounded-full bg-secondary" />
                          <span>{story.note}</span>
                        </div>
                      )}
                    </div>

                    <div className="relative order-1 aspect-[3/2] overflow-hidden rounded-2xl border border-primary/25 bg-primary/5 md:order-2 md:aspect-square">
                      <img
                        src={story.image}
                        alt={story.imageAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-white shadow-md">
                        <Icon className="h-6 w-6 text-primary" weight="regular" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
