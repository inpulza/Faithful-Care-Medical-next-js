import { motion } from "framer-motion";
import { CalendarCheck, PhoneCall, Siren } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type CareLevelTone = "emergency" | "today" | "routine";

export interface CareLevelItem {
  tone: CareLevelTone;
  label: string;
  title: string;
  description: string;
  action: string;
}

interface CareLevelGuideProps {
  eyebrow?: string;
  title: string;
  description: string;
  items: CareLevelItem[];
  note?: string;
}

const toneStyles: Record<CareLevelTone, {
  icon: typeof Siren;
  shell: string;
  iconShell: string;
  label: string;
}> = {
  emergency: {
    icon: Siren,
    shell: "border-red-200 bg-red-50/75",
    iconShell: "bg-red-600 text-white",
    label: "text-red-700",
  },
  today: {
    icon: PhoneCall,
    shell: "border-amber-200 bg-amber-50/75",
    iconShell: "bg-amber-500 text-deep-navy",
    label: "text-amber-800",
  },
  routine: {
    icon: CalendarCheck,
    shell: "border-primary/20 bg-primary/5",
    iconShell: "bg-primary text-white",
    label: "text-primary",
  },
};

export function CareLevelGuide({
  eyebrow = "Know the next step",
  title,
  description,
  items,
  note,
}: CareLevelGuideProps) {
  return (
    <section className="section-gap bg-[#f4f8fb]" data-testid="section-care-level-guide">
      <div className="container-radical">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
          </div>
          <h2 className="h2 text-deep-navy">{title}</h2>
          <p className="body-lg mx-auto mt-5 max-w-2xl text-deep-navy/65">{description}</p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => {
            const styles = toneStyles[item.tone];
            const Icon = styles.icon;
            return (
              <motion.article
                key={`${item.tone}-${item.title}`}
                className={cn("flex h-full flex-col rounded-3xl border p-6 md:p-8", styles.shell)}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                data-testid={`care-level-${item.tone}`}
              >
                <div className={cn("mb-6 flex h-12 w-12 items-center justify-center rounded-2xl", styles.iconShell)}>
                  <Icon className="h-6 w-6" weight="duotone" aria-hidden="true" />
                </div>
                <p className={cn("mb-2 text-xs font-bold uppercase tracking-[0.15em]", styles.label)}>{item.label}</p>
                <h3 className="mb-3 font-serif text-2xl leading-tight text-deep-navy">{item.title}</h3>
                <p className="mb-6 flex-1 text-base leading-relaxed text-deep-navy/65">{item.description}</p>
                <p className="border-t border-deep-navy/10 pt-4 text-sm font-semibold leading-relaxed text-deep-navy">{item.action}</p>
              </motion.article>
            );
          })}
        </div>

        {note && (
          <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-deep-navy/60" data-testid="care-level-note">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
