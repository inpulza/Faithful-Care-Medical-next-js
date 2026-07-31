import * as React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Flask,
  UserFocus,
  Translate,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import {
  PageHero,
  BentoGrid,
  InsuranceLogos,
  marqueeDataMap,
  TestimonialsSection,
  AlternatingBlock,
  FaqSection,
  TealCta,
} from "@/components/sections";
import { FeatureGrid } from "@/components/sections/feature-grid";
const ImageMarquee = React.lazy(() =>
  import("@/components/sections/image-marquee").then(m => ({ default: m.ImageMarquee }))
);
const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { extractFaqText } from "@/lib/extract-faq-text";
import { esMedicoFaqs } from "@/lib/es-medico-faqs";
import {
  esBentoServices,
  esInsuranceNote,
  esTestimonialsProps,
  esInsuranceMembershipProps,
} from "@/lib/es-content";
import { pageContentMap } from "@/lib/page-content";

const whyStayFeatures = [
  {
    icon: UserFocus,
    title: "Le atiende una doctora, no un número",
    description: "Consultas sin prisa, con tiempo para escucharle y responder sus preguntas.",
    color: "primary" as const,
  },
  {
    icon: Translate,
    title: "Todo en español",
    description: "Desde que llama hasta el seguimiento, le atendemos en su idioma.",
    color: "secondary" as const,
  },
  {
    icon: CalendarCheck,
    title: "Citas el mismo día",
    description: "Cuando se siente mal, le atendemos hoy.",
    color: "primary" as const,
  },
  {
    icon: Flask,
    title: "Laboratorio en la clínica",
    description: "Menos vueltas y resultados más rápido.",
    color: "secondary" as const,
  },
  {
    icon: ShieldCheck,
    title: "Seguros y Medicare",
    description: "Aceptamos Medicare, Medicaid y la mayoría de seguros.",
    color: "primary" as const,
  },
  {
    icon: CheckCircle,
    title: "Aceptamos pacientes nuevos",
    description: "Llame hoy y le damos cita.",
    color: "secondary" as const,
  },
];

export default function EsMedicoDeFamilia() {
  const heroContent = pageContentMap["/es/medico-de-familia-naples"];
  const plainFaqs = esMedicoFaqs.map((faq) => ({
    question: faq.question,
    answer: extractFaqText(faq.answer),
  }));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqPageSchema(plainFaqs)]} />
      <main id="main">
        <PageHero
          title={heroContent.title}
          subtitle={heroContent.subtitle}
          subtitleBold={heroContent.subtitleBold}
          marqueeItems={heroContent.marqueeItems}
          heroImage={heroContent.heroImage}
          heroImageMobile={heroContent.heroImageMobile}
          heroImageAlt={heroContent.heroImageAlt}
          heroBlurPlaceholder={heroContent.heroBlurPlaceholder}
          primaryCtaText="Llamar ahora"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Pedir una cita"
          secondaryCtaHref="/es/contacto"
          showSearchCard={true}
          formLang="es"
          showTrustLine={true}
          trustLineText={<>Medicare, Medicaid, Aetna, Cigna y Humana <span className="opacity-60">·</span> Atención en español</>}
        />

        <InsuranceLogos
          eyebrow="Planes de seguro aceptados"
          note={esInsuranceNote}
        />

        <section className="section-gap bg-primary/5" data-testid="section-es-idioma">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-6">
                Atención médica completa,<br className="hidden md:block" /> en su idioma
              </h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed">
                No tiene que traer a nadie a traducir ni quedarse con dudas. Aquí puede explicar
                lo que siente en su propio idioma y entender su tratamiento.
              </p>
            </motion.div>
          </div>
        </section>

        <BentoGrid
          subtitle="Atención primaria"
          title="Qué atendemos en nuestra clínica de Naples"
          services={esBentoServices.map((service) => ({
            ...service,
            href: "/es/contacto",
          }))}
          primaryCta={{ text: "Pedir una cita", href: "/es/contacto" }}
          secondaryCta={{ text: "Ver cuidados paliativos", href: "/es/cuidados-paliativos-naples" }}
          cardCtaText="Pedir cita"
        />

        {marqueeDataMap["/es"] && (
          <React.Suspense fallback={<div style={{ minHeight: "clamp(220px, 30vh, 360px)" }} aria-hidden="true" />}>
            <ImageMarquee items={marqueeDataMap["/es"]} />
          </React.Suspense>
        )}

        <FeatureGrid
          title="Por qué nuestros pacientes se quedan"
          subtitle="La diferencia Faithful Care"
          features={whyStayFeatures}
          columns={3}
        />

        <AlternatingBlock
          subtitle="Conozca a su doctora"
          title="Atención certificada, con tiempo para escucharle."
          description="Fundé Faithful Care porque creo que cada paciente merece más que una consulta apurada y una receta. Cuando entra por nuestra puerta, encuentra a una doctora que sabe su nombre, entiende su historia y se toma el tiempo de explicarle todo con claridad. Combino la precisión clínica del hospital con la calidez del médico de familia de toda la vida. Su salud, y su tranquilidad, son algo personal para mí."
          ctaText="Conozca a la Dra. Addys Reve"
          ctaHref="/about"
          imageSrc="/images/dr-addys-reve.webp"
          imageAlt="Dra. Addys Reve, MD, fundadora de Faithful Care Medical Services, médico de familia que atiende en español en Naples, Florida"
          variant="primary"
        />

        <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
          <InsuranceMembership
            {...esInsuranceMembershipProps}
            title={<>Humana, Aetna, Cigna, Medicare y Medicaid.<br className="hidden lg:block" /> ¿Sin seguro? No hay problema.</>}
          />
        </React.Suspense>

        <TestimonialsSection {...esTestimonialsProps} />

        <FaqSection
          eyebrow="Preguntas frecuentes"
          title="Respuestas para pacientes que buscan médico de familia en español."
          items={esMedicoFaqs}
        />

        <TealCta
          title="¿Necesita un médico de familia que le hable en español?"
          subtitle="Naples, Florida"
          description="Llámenos hoy y le damos cita. Aceptamos pacientes nuevos y la mayoría de los seguros."
          primaryCtaText="Llamar (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contacto y cómo llegar"
          secondaryCtaHref="/es/contacto"
        />
      </main>
    </div>
  );
}
