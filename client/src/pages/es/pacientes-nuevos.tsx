import * as React from "react";
import {
  IdentificationCard,
  Pill,
  Files,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "@phosphor-icons/react";
import {
  DetailGrid,
  FaqSection,
  InsuranceLogos,
  PageHero,
  TealCta,
  VisitSteps,
  type FaqItem,
} from "@/components/sections";
import { InfoSection, type HubInfoSection } from "@/components/care-hub-page";
import { JsonLdArray } from "@/components/json-ld";
import { pageContentMap } from "@/lib/page-content";
import { faqPageSchema } from "@/lib/schemas";
import { extractFaqText } from "@/lib/extract-faq-text";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";
import { esInsuranceNote } from "@/lib/es-content";

const firstVisitCards = [
  {
    icon: IdentificationCard,
    title: "Identificación con foto",
    description: "Traiga una identificación vigente para completar su registro como paciente.",
  },
  {
    icon: ShieldCheck,
    title: "Tarjeta del seguro",
    description: "Comparta los datos de su plan para que podamos verificar la cobertura antes de la visita.",
  },
  {
    icon: Pill,
    title: "Medicamentos actuales",
    description: "Prepare una lista de sus medicamentos o traiga los frascos para revisarlos con la doctora.",
  },
  {
    icon: Files,
    title: "Registros y preguntas",
    description: "Traiga resultados recientes, registros de su médico anterior y las preguntas que quiera conversar.",
  },
];

const infoSections: HubInfoSection[] = [
  {
    id: "primera-consulta",
    eyebrow: "Su primera consulta",
    title: (
      <>
        Una conversación completa,<br className="hidden md:block" /> con un plan claro
      </>
    ),
    bullets: [
      "Revisamos su historia de salud completa.",
      "Conversamos con calma sobre lo que le preocupa.",
      "Podemos realizar laboratorios y EKG en la clínica cuando sean necesarios.",
      "Antes de irse, recibe un plan que puede entender.",
    ],
  },
  {
    id: "seguro",
    eyebrow: "Seguro médico",
    title: "Verificamos su cobertura antes de la visita",
    description:
      "Díganos qué plan tiene cuando llame. Nuestro equipo revisará la información antes de su cita.",
    cta: { text: "Ver seguros y Medicare", href: "/es/seguros-y-medicare" },
  },
  {
    id: "atencion-bilingue",
    eyebrow: "Atención bilingüe",
    title: "Puede atenderse en español en cada paso",
    description:
      "Le atendemos en español o en inglés, desde la primera llamada hasta el seguimiento de su cuidado.",
    cta: { text: "Conocer nuestra atención primaria", href: "/es/medico-de-familia-naples" },
  },
];

const faqs: FaqItem[] = [
  {
    question: "¿Faithful Care acepta pacientes nuevos?",
    answer:
      "Sí. Faithful Care Medical Services recibe pacientes adultos y adultos mayores nuevos en Naples.",
  },
  {
    question: "¿Cómo puedo comenzar el proceso para hacerme paciente?",
    answer:
      "Llame al (239) 423-0205. Buscaremos un horario que le sirva, le pediremos la información de su seguro y coordinaremos su primera consulta.",
  },
  {
    question: "¿Qué debo llevar a mi primera visita?",
    answer:
      "Traiga una identificación con foto, su tarjeta del seguro, una lista de sus medicamentos o los frascos, resultados o registros médicos recientes y las preguntas que quiera conversar.",
  },
  {
    question: "¿Qué ocurre durante la primera consulta?",
    answer:
      "Revisamos su historia de salud, sus medicamentos y lo que le preocupa. Cuando es necesario, podemos realizar laboratorios o un EKG en la clínica. Antes de irse, conversamos con usted sobre los próximos pasos.",
  },
  {
    question: "¿Cómo sé si aceptan mi seguro?",
    answer: (
      <>
        Díganos el nombre de su plan cuando llame y verificaremos la cobertura antes de la visita. También puede consultar la página de <a href="/es/seguros-y-medicare">seguros y Medicare</a>.
      </>
    ),
  },
  {
    question: "¿Puedo completar el proceso en español?",
    answer:
      "Sí. Ofrecemos atención en español y en inglés, desde la primera llamada hasta el seguimiento.",
  },
  {
    question: "¿Qué debo hacer si tengo una emergencia médica?",
    answer:
      "Faithful Care no sustituye a los servicios de emergencia. Llame al 911 o vaya a la sala de emergencias más cercana si tiene una emergencia médica; no espere una respuesta del consultorio.",
  },
];

export default function EsPacientesNuevos() {
  const heroContent = pageContentMap["/new-patients"];
  const plainFaqs = faqs.map((faq) => ({
    question: faq.question,
    answer: extractFaqText(faq.answer),
  }));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqPageSchema(plainFaqs)]} />
      <main id="main">
        <PageHero
          title={
            <>
              Aceptamos pacientes nuevos<br className="hidden md:block" /> en Naples, Florida
            </>
          }
          subtitle="Faithful Care Medical Services recibe pacientes adultos y adultos mayores nuevos en Naples. Si busca una doctora de atención primaria que se tome el tiempo de escucharle, estamos aquí para ayudarle."
          subtitleBold="Atención disponible en español y en inglés."
          marqueeItems={[
            "Aceptamos pacientes nuevos",
            "Naples, Florida",
            "Atención primaria",
            "Español e inglés",
          ]}
          heroImage={heroContent.heroImage}
          heroImageMobile={heroContent.heroImageMobile}
          heroImageAlt="Doctora de Faithful Care recibiendo a un paciente nuevo en la clínica de Naples, Florida"
          heroBlurPlaceholder={heroContent.heroBlurPlaceholder}
          primaryCtaText="Llamar para una cita"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Cómo llegar"
          secondaryCtaHref={CLINIC_GMAPS_DIRECTIONS_URL}
          trustLineText={
            <>
              Verificamos su plan antes de la cita <span className="opacity-60">·</span> Atención en español
            </>
          }
          showSearchCard={true}
          formLang="es"
        />

        <InsuranceLogos eyebrow="Planes de seguro aceptados" note={esInsuranceNote} />

        <div id="page-content">
          <DetailGrid
            eyebrow="Lista para su primera visita"
            eyebrowColor="primary"
            title="Qué debe traer a su primera consulta"
            description="Preparar estos cuatro elementos nos ayuda a conocer mejor su historia y aprovechar el tiempo de la consulta."
            statNumber="4"
            statLabel="elementos útiles para preparar antes de venir"
            cards={firstVisitCards}
          />

          <VisitSteps
            eyebrow="Hacerse paciente"
            title="Empezar es sencillo"
            subtitle="Tres pasos para coordinar su primera visita con Faithful Care."
            steps={[
              {
                icon: Phone,
                title: "Llámenos",
                description: "Llame al (239) 423-0205 y buscaremos un horario que le sirva.",
              },
              {
                icon: ShieldCheck,
                title: "Díganos qué seguro tiene",
                description: "Comparta los datos de su plan y verificaremos la cobertura antes de la visita.",
              },
              {
                icon: Stethoscope,
                title: "Venga a su primera consulta",
                description: "Revisaremos su historia y sus medicamentos, escucharemos sus preguntas y prepararemos un plan con usted.",
              },
            ]}
            ctaText="Llamar (239) 423-0205"
            ctaHref="tel:2394230205"
            className="bg-primary/5"
          />
        </div>

        {infoSections.map((section) => (
          <InfoSection key={section.id} section={section} categoryId="es-pacientes-nuevos" />
        ))}

        <FaqSection
          eyebrow="Preguntas frecuentes"
          title="Respuestas antes de su primera visita"
          description="Información práctica para preparar su llegada a Faithful Care."
          items={faqs}
          className="bg-primary/5"
        />

        <TealCta
          subtitle="Aceptamos pacientes nuevos"
          title="¿Quiere comenzar su cuidado con Faithful Care?"
          description="Llámenos para coordinar su primera consulta en Naples. Podemos atenderle en español o en inglés."
          primaryCtaText="Llamar (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contacto y cómo llegar"
          secondaryCtaHref="/es/contacto"
        />
      </main>
    </div>
  );
}
