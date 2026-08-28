import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Info } from "@phosphor-icons/react";

export interface ComparisonRow {
  label: string;
  left: string;
  right: string;
}

interface ComparisonTableSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  leftHeading: string;
  rightHeading: string;
  rows: ComparisonRow[];
  note?: string;
  sources?: { label: string; href: string }[];
}

export function ComparisonTableSection({
  eyebrow,
  title,
  description,
  leftHeading,
  rightHeading,
  rows,
  note,
  sources = [],
}: ComparisonTableSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-gap bg-white" data-testid="section-comparison-table">
      <div className="container-radical">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">{eyebrow}</p>
          </div>
          <h2 className="h2 text-deep-navy">{title}</h2>
          <p className="body-lg mx-auto mt-5 max-w-2xl text-deep-navy/65">{description}</p>
        </motion.div>

        <div className="overflow-hidden rounded-3xl border border-deep-navy/10 bg-[#f5f8fb] shadow-[0_24px_70px_rgba(9,39,75,0.08)]">
          <div className="hidden grid-cols-[0.7fr_1fr_1fr] border-b border-deep-navy/10 bg-deep-navy px-8 py-6 text-white md:grid">
            <span className="text-sm font-semibold uppercase tracking-wider text-white/45">Compare</span>
            <span className="text-lg font-semibold">{leftHeading}</span>
            <span className="text-lg font-semibold">{rightHeading}</span>
          </div>

          {rows.map((row, index) => (
            <motion.article
              key={row.label}
              className="grid grid-cols-1 gap-4 border-b border-deep-navy/8 p-5 last:border-b-0 md:grid-cols-[0.7fr_1fr_1fr] md:gap-8 md:px-8 md:py-7"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <h3 className="font-semibold text-deep-navy">{row.label}</h3>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary md:hidden">{leftHeading}</p>
                <p className="flex gap-3 leading-relaxed text-deep-navy/70">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-primary" weight="fill" aria-hidden="true" />
                  <span>{row.left}</span>
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary md:hidden">{rightHeading}</p>
                <p className="flex gap-3 leading-relaxed text-deep-navy/70">
                  <Info className="mt-0.5 h-5 w-5 flex-none text-secondary" weight="fill" aria-hidden="true" />
                  <span>{row.right}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {(note || sources.length > 0) && (
          <div className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-deep-navy/55 md:flex-row md:items-start md:justify-between">
            {note && <p className="max-w-3xl">{note}</p>}
            {sources.length > 0 && (
              <p className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                <span>Sources:</span>
                {sources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">
                    {source.label}
                  </a>
                ))}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
