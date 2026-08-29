import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "@phosphor-icons/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

function FaqAccordionItem({
  item,
  index,
  value,
  forceMountContent,
}: {
  item: FaqItem;
  index: number;
  value: string;
  forceMountContent: boolean;
}) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className="group"
      data-testid={`faq-item-${index}`}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className="flex w-full items-center justify-between gap-6 py-7 md:py-8 text-left transition-colors"
          data-testid={`faq-trigger-${index}`}
        >
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            <span className="text-sm font-mono text-primary/40 flex-shrink-0 w-6 md:w-8 hidden md:block">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-serif text-lg md:text-2xl lg:text-[26px] text-deep-navy leading-snug group-hover:text-primary transition-colors duration-300"
              data-testid={`faq-question-${index}`}
            >
              {item.question}
            </span>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300">
            <Plus
              className="w-5 h-5 text-primary transition-all duration-300 group-data-[state=open]:hidden"
              weight="regular"
            />
            <Minus
              className="w-5 h-5 text-primary transition-all duration-300 hidden group-data-[state=open]:block"
              weight="regular"
            />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent ? true : undefined}
        // Radix treats a force-mounted panel as open and therefore drops its
        // own `hidden`, which would leave every answer expanded until
        // hydration. Set it explicitly (this overrides Radix's, which is
        // spread before incoming props) so the text is in the HTML but never
        // painted, focusable, or announced.
        hidden={forceMountContent ? true : undefined}
        className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      >
        <div className="pb-5 md:pb-8 pl-4 md:pl-14 pr-4 md:pr-20">
          <div
            className="text-deep-navy/55 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary/80 [&_a]:transition-colors"
            data-testid={`faq-answer-${index}`}
          >
            {item.answer}
          </div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

export function FaqSection({
  eyebrow = "Frequently asked questions",
  title,
  description,
  items,
  className,
}: FaqSectionProps) {
  // Answers must exist in the server-rendered HTML so crawlers read the
  // full Q&A (featured snippets) without executing JavaScript. Radix
  // unmounts closed content, so force-mount it for the first paint —
  // identical on server and client, so hydration matches exactly — then
  // release it right after mount to restore the normal open/close
  // animation. While force-mounted the content carries `hidden`, so it is
  // never visible, focusable, or exposed to assistive tech.
  const [forceMountContent, setForceMountContent] = React.useState(true);
  React.useEffect(() => {
    setForceMountContent(false);
  }, []);

  return (
    <section
      className={cn("section-gap bg-white", className)}
      data-testid="section-faq"
    >
      <div className="container-radical">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          </div>
          <h2 className="h2 text-deep-navy max-w-3xl mx-auto">{title}</h2>
          {description && (
            <p className="body-lg text-deep-navy/60 mt-6 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="divide-y divide-primary/15"
            data-testid="faq-accordion"
          >
            {items.map((item, index) => (
              <FaqAccordionItem
                key={index}
                item={item}
                index={index}
                value={`faq-${index}`}
                forceMountContent={forceMountContent}
              />
            ))}
          </AccordionPrimitive.Root>
        </motion.div>
      </div>
    </section>
  );
}
