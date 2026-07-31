import * as React from "react";
import { motion } from "framer-motion";
import {
  HandHeart,
  Heartbeat,
  UsersThree,
  ClipboardText,
  Wind,
  Bed,
  Brain,
  BowlFood,
  BatteryLow,
  PhoneCall,
  Notebook,
  ArrowsClockwise,
  Stethoscope,
  CheckCircle,
} from "@phosphor-icons/react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { TealCta } from "@/components/sections/teal-cta";
import { AlternatingBlock, DetailGrid, FaqSection, VisitSteps } from "@/components/sections";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { extractFaqText } from "@/lib/extract-faq-text";
import { esPaliativosFaqs } from "@/lib/es-paliativos-faqs";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";

const careAreas = [
  {
    icon: Heartbeat,
    title: "Alivio de síntomas",
    description: "Ayudamos a controlar el dolor, la falta de aire, el cansancio, las náuseas, el insomnio y la ansiedad.",
    color: "secondary" as const,
  },
  {
    icon: HandHeart,
    title: "Acompañamiento en enfermedades serias",
    description: "Apoyo para personas con cáncer, insuficiencia cardíaca, enfermedad renal avanzada, enfermedades del pulmón y enfermedades neurológicas como demencia o Parkinson. Trabajamos junto con sus especialistas, no en lugar de ellos.",
    color: "primary" as const,
  },
  {
    icon: UsersThree,
    title: "Apoyo para la familia y el cuidador",
    description: "Orientación para el cuidador y prevención del agotamiento, enseñanza para reconocer y vigilar síntomas en casa, y conversaciones sobre lo que es importante para usted y su familia.",
    color: "secondary" as const,
  },
  {
    icon: ClipboardText,
    title: "Planificación anticipada",
    description: "Le acompañamos a dejar por escrito sus decisiones de salud (voluntades anticipadas, representante de salud) con calma y sin presión.",
    color: "primary" as const,
  },
];

const symptomCards = [
  {
    icon: Heartbeat,
    title: "Dolor crónico",
    description:
      "Revisamos de dónde viene el dolor y armamos un plan con la dosis más baja que le funcione. La meta es que pueda moverse, dormir y estar con su familia, no que viva sedado.",
  },
  {
    icon: Wind,
    title: "Falta de aire",
    description:
      "La sensación de ahogo asusta tanto como incomoda. Ajustamos medicamentos, enseñamos técnicas de respiración y coordinamos con su neumólogo o cardiólogo cuando hace falta.",
  },
  {
    icon: BatteryLow,
    title: "Cansancio y debilidad",
    description:
      "El cansancio del cáncer o de un tratamiento largo tiene causas que se pueden buscar: anemia, medicamentos, sueño, ánimo. Las revisamos una por una y organizamos su energía del día.",
  },
  {
    icon: BowlFood,
    title: "Náuseas y falta de apetito",
    description:
      "Náuseas por medicamentos, sabor cambiado o pérdida del apetito. Ajustamos las recetas y damos indicaciones de alimentación para que volver a comer no sea una batalla.",
  },
  {
    icon: Brain,
    title: "Ansiedad y tristeza",
    description:
      "El peso emocional de una enfermedad seria es real y se trata. Atendemos la ansiedad, la tristeza profunda y el miedo que aparece después de un diagnóstico difícil.",
  },
  {
    icon: Bed,
    title: "Problemas para dormir",
    description:
      "El dolor, la preocupación y los efectos secundarios arruinan el sueño. Buscamos la causa antes de añadir otra pastilla y hacemos un plan para que descanse de noche.",
  },
];

const startSteps = [
  {
    icon: PhoneCall,
    title: "Llame para una consulta",
    description:
      "Puede llamar usted, un familiar o su médico actual. No necesita una referencia especial. Normalmente agendamos la primera consulta en pocos días.",
    duration: "Pocos días",
  },
  {
    icon: Notebook,
    title: "Revisamos toda su situación",
    description:
      "La Dra. Reve revisa su diagnóstico, sus tratamientos actuales, sus síntomas y lo que es importante para usted. Su familia es bienvenida en esta conversación.",
    duration: "45 a 60 minutos",
  },
  {
    icon: HandHeart,
    title: "Armamos un plan de confort",
    description:
      "Juntos definimos qué hacer con el dolor, los síntomas, los efectos secundarios y las preocupaciones emocionales. Cada plan se hace para su caso, no de un molde.",
  },
  {
    icon: Stethoscope,
    title: "Hablamos con sus especialistas",
    description:
      "Nos comunicamos con su oncólogo, su cardiólogo o el especialista que le atienda para que el control de sus síntomas acompañe su tratamiento y no lo contradiga.",
  },
  {
    icon: ArrowsClockwise,
    title: "Seguimiento y ajustes",
    description:
      "Los cuidados paliativos no son una sola visita. Programamos seguimientos regulares y ajustamos el plan según cambien sus síntomas o sus necesidades.",
  },
];

const conditions = [
  "Cáncer, durante o después del tratamiento",
  "Insuficiencia cardíaca",
  "Enfermedad renal avanzada",
  "EPOC y otras enfermedades del pulmón",
  "Demencia, Parkinson y otras enfermedades neurológicas",
  "Cualquier enfermedad seria que cause dolor, síntomas difíciles o mucho estrés",
];

export default function EsCuidadosPaliativos() {
  const heroContent = pageContentMap["/es/cuidados-paliativos-naples"];
  const plainFaqs = esPaliativosFaqs.map((faq) => ({
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
          secondaryCtaText="Cómo llegar"
          secondaryCtaHref={CLINIC_GMAPS_DIRECTIONS_URL}
          showSearchCard={false}
          showTrustLine={false}
        />

        <section id="page-content" className="section-gap bg-secondary/5" data-testid="section-es-no-hospicio">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-6">
                No es lo mismo<br className="hidden md:block" /> que hospicio
              </h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed mb-6">
                Los cuidados paliativos se pueden recibir mientras usted continúa con sus
                tratamientos. El objetivo es vivir con menos síntomas y más tranquilidad, para el
                paciente y para su familia.
              </p>
              <p className="text-deep-navy/75 leading-relaxed mb-4">
                Muchas familias en Naples y en el suroeste de Florida piensan que pedir cuidados
                paliativos es rendirse. No lo es. El hospicio es un beneficio para los últimos meses
                de vida, cuando ya se suspendió el tratamiento para curar la enfermedad. Los cuidados
                paliativos pueden empezar el mismo día del diagnóstico, sea cáncer, insuficiencia
                cardíaca, EPOC, enfermedad del riñón o cualquier condición que le esté quitando
                calidad de vida.
              </p>
              <p className="text-deep-navy/75 leading-relaxed">
                Usted puede seguir con la quimioterapia, con la diálisis o con el tratamiento que le
                haya indicado su especialista, y al mismo tiempo tener a alguien encargado de que el
                dolor, la falta de aire, las náuseas y el miedo no manden en su día. Eso es lo que
                hacemos aquí.
              </p>
            </motion.div>
          </div>
        </section>

        <DetailGrid
          id="sintomas"
          eyebrow="Síntomas que tratamos"
          eyebrowColor="secondary"
          title="Alivio para lo que le quita calidad de vida"
          description="Una enfermedad seria trae síntomas que van más allá de la enfermedad misma. Tratamos cada uno con un plan específico, para que pueda concentrarse en vivir y no solo en aguantar."
          statNumber="6"
          statLabel="síntomas que atendemos con un plan propio"
          cards={symptomCards}
        />

        <FeatureGrid
          title="Cómo ayudamos"
          subtitle="Cuidados paliativos"
          features={careAreas}
          columns={2}
        />

        <section className="section-gap bg-white" data-testid="section-es-enfermedades">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  A quiénes acompañamos
                </p>
              </div>
              <h2 className="h2 text-deep-navy mb-6">Enfermedades que atendemos</h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed">
                No hay una edad mínima ni un pronóstico mínimo para recibir cuidados paliativos.
                Cualquier adulto que viva con una enfermedad seria califica.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
              {conditions.map((condition, index) => (
                <motion.div
                  key={condition}
                  className="flex items-start gap-3 bg-white rounded-2xl border border-primary/30 p-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  data-testid={`item-es-enfermedad-${index}`}
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" weight="fill" />
                  <span className="text-deep-navy/80 leading-relaxed">{condition}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-gap bg-primary/5" data-testid="section-es-especialistas">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-6">
                Trabajamos junto a<br className="hidden md:block" /> sus especialistas
              </h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed mb-4">
                Los cuidados paliativos no reemplazan a su oncólogo ni a su cardiólogo: trabajan con
                ellos, enfocados en el confort, la claridad y la calidad de vida.
              </p>
              <p className="text-deep-navy/75 leading-relaxed">
                Revisamos todos los medicamentos que toma, incluidos los que le recetaron otros
                médicos, porque muchos síntomas nacen justamente de una interacción o de un efecto
                secundario que nadie ha revisado en conjunto. Cuando algo tiene que cambiar, hablamos
                con su especialista antes de cambiarlo. Y si en algún momento el hospicio es lo
                correcto para su familia, le acompañamos también en esa transición y coordinamos con
                la agencia.
              </p>
            </motion.div>
          </div>
        </section>

        <VisitSteps
          eyebrow="Cómo empezar"
          title="Cómo empiezan los cuidados paliativos"
          subtitle="Empezar es sencillo y no hace falta una referencia especial. Esto es lo que puede esperar."
          steps={startSteps}
          ctaText="Llamar (239) 423-0205"
          ctaHref="tel:2394230205"
        />

        <section className="section-gap bg-white" data-testid="section-es-familia">
          <div className="container-radical">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-8 text-center">
                También cuidamos<br className="hidden md:block" /> a quien cuida
              </h2>
              <div className="space-y-8">
                <div data-testid="block-es-cuidador">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Apoyo para el cuidador
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Cuando una persona se enferma, casi siempre hay un hijo, una esposa o una hermana
                    cargando con todo: los medicamentos, las citas, las llamadas al seguro y las
                    noches sin dormir. Le enseñamos a reconocer y vigilar síntomas en casa, le
                    decimos con claridad cuándo hay que llamar y cuándo se puede esperar, y le
                    ayudamos a cuidarse para no llegar al agotamiento.
                  </p>
                </div>
                <div data-testid="block-es-reuniones">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Conversaciones familiares, en español
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Nos sentamos con la familia a explicar qué está pasando, qué se puede esperar y
                    qué opciones hay, en un idioma que todos entiendan y sin apuro. Nadie de su
                    familia tiene que hacer de traductor en una conversación difícil.
                  </p>
                </div>
                <div data-testid="block-es-planificacion">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Planificación anticipada
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Le acompañamos a dejar por escrito sus decisiones de salud: voluntades
                    anticipadas, testamento vital y quién será su representante para decidir si usted
                    no puede hablar. Hacerlo con tiempo y con calma le quita a su familia el peso de
                    adivinar qué habría querido usted.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <AlternatingBlock
          subtitle="Conozca a su doctora"
          title="Una doctora que se sienta a explicarle todo."
          description="La Dra. Addys Reve atiende a pacientes con enfermedades serias en Naples con una idea muy simple: nadie debería enfrentar un diagnóstico difícil sin entender lo que está pasando. En cada consulta hay tiempo para preguntar, para repetir la pregunta y para hablar de lo que a usted y a su familia les preocupa de verdad. Certificada en medicina familiar, con la calidez del médico de toda la vida y la coordinación de un equipo que habla su idioma."
          ctaText="Conozca a la Dra. Addys Reve"
          ctaHref="/about"
          imageSrc="/images/dr-addys-reve.webp"
          imageAlt="Dra. Addys Reve, MD, de Faithful Care Medical Services, cuidados paliativos en español en Naples, Florida"
          variant="primary"
        />

        <FaqSection
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos preguntan las familias."
          items={esPaliativosFaqs}
        />

        <TealCta
          title="Si su familia está pasando por esto, llámenos"
          subtitle="Atendemos en español"
          description="Le explicamos con claridad cómo podemos ayudar."
          primaryCtaText="Llamar (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contacto y cómo llegar"
          secondaryCtaHref="/es/contacto"
        />
      </main>
    </div>
  );
}
