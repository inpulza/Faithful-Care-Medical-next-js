import * as React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Phone,
  ArrowRight,
  IdentificationCard,
  ClipboardText,
  CalendarCheck,
  Receipt,
} from "@phosphor-icons/react";
import { Link } from "@/lib/router";
import { PageHero } from "@/components/sections/page-hero";
import { TealCta } from "@/components/sections/teal-cta";
import { InsuranceLogos, FaqSection, VisitSteps } from "@/components/sections";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { extractFaqText } from "@/lib/extract-faq-text";
import { esSegurosFaqs } from "@/lib/es-seguros-faqs";
import { esNetworkStatusNote } from "@/lib/es-content";
import { pageContentMap } from "@/lib/page-content";
import { CLINIC_GMAPS_DIRECTIONS_URL } from "@/lib/clinic-location";

const acceptedPlans = [
  { name: "Humana", logo: "/images/logos/humana.webp" },
  { name: "Aetna", logo: "/images/logos/aetna-health-insurance.webp" },
  { name: "Cigna", logo: "/images/logos/cigna-healthcare.webp" },
  { name: "Original Medicare", logo: "/images/logos/medicare.webp" },
  { name: "Florida Medicaid", logo: "/images/logos/sunshine-health.webp" },
];

const medicareItems = [
  "Aceptamos Medicare",
  "Hacemos la visita anual de bienestar de Medicare",
  "Le ayudamos si desea cambiar de médico primario dentro de su plan",
];

const carrierCards = [
  {
    id: "humana",
    eyebrow: "Humana Medicare Advantage",
    logo: "/images/logos/humana.webp",
    logoAlt: "Logo de Humana",
    title: "Cuidados paliativos que no se interrumpen",
    body: "Si su plan de Humana dejó fuera al equipo que atendía a su familiar, la Dra. Addys Reve y el equipo de Faithful Care pueden retomar ese cuidado este mismo mes. Coordinamos con sus especialistas, controlamos los síntomas y acompañamos a la familia en cada decisión.",
    bullets: [
      "Alivio del dolor, la falta de aire, el cansancio, las náuseas y el insomnio",
      "Consultas en nuestra clínica de Naples, con seguimiento por teléfono o video",
      "Ayuda con las voluntades anticipadas y las conversaciones difíciles",
      "Equipo bilingüe: le atendemos en español o en inglés",
    ],
    note: "Los cuidados paliativos no son hospicio. Usted puede continuar con sus tratamientos y con los especialistas que ya le atienden.",
    disclaimer:
      "Práctica independiente. Faithful Care Medical Services no está afiliada, avalada ni patrocinada por Humana.",
  },
  {
    id: "aetna",
    eyebrow: "Aetna, atención primaria",
    logo: "/images/logos/aetna-health-insurance.webp",
    logoAlt: "Logo de Aetna",
    title: "Un médico primario que le conoce por su nombre",
    body: "Si su plan de Aetna le dejó sin médico primario, estamos aceptando pacientes nuevos. Chequeos anuales, control de enfermedades crónicas, citas por enfermedad en la misma semana y la visita anual de bienestar de Medicare, todo en una sola clínica de Naples.",
    bullets: [
      "Exámenes físicos anuales y visita anual de bienestar de Medicare",
      "Diabetes, presión alta, EPOC y enfermedades del corazón",
      "Citas por enfermedad en la misma semana, con opción de consulta por video",
      "Equipo bilingüe: le atendemos en español o en inglés",
    ],
    disclaimer:
      "Práctica independiente. Faithful Care Medical Services no está afiliada, avalada ni patrocinada por Aetna.",
  },
];

const verificationSteps = [
  {
    icon: Phone,
    title: "Llámenos con su tarjeta a mano",
    description:
      "Marque al (239) 423-0205 y tenga cerca su tarjeta del seguro. Necesitamos el nombre del plan y su número de miembro, nada más.",
    duration: "2 minutos",
  },
  {
    icon: IdentificationCard,
    title: "Revisamos su plan",
    description:
      "Confirmamos si su plan está dentro de la red y qué cubre para atención primaria o para cuidados paliativos. Casi siempre le damos la respuesta en la misma llamada.",
    duration: "Mismo día",
  },
  {
    icon: Receipt,
    title: "Le decimos qué va a pagar",
    description:
      "Si su plan deja un copago, un deducible o algún cargo por la visita, se lo explicamos antes de que venga. Preferimos que lo sepa por teléfono, con calma, y no en la recepción.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamos su cita",
    description:
      "Los pacientes nuevos suelen tener cita en menos de una semana. Si se siente mal hoy, llame por la mañana y buscamos un espacio urgente para hoy mismo.",
    duration: "Menos de una semana",
  },
  {
    icon: ClipboardText,
    title: "Si su seguro cambia, lo revisamos otra vez",
    description:
      "Avísenos en cuanto reciba una tarjeta nueva. Volvemos a verificar su cobertura antes de la próxima visita para que no le llegue una factura sorpresa.",
  },
];

export default function EsSegurosYMedicare() {
  const heroContent = pageContentMap["/es/seguros-y-medicare"];
  const plainFaqs = esSegurosFaqs.map((faq) => ({
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

        <InsuranceLogos eyebrow="Planes de seguro aceptados" note={esNetworkStatusNote} />

        <section id="page-content" className="section-gap bg-white" data-testid="section-es-planes">
          <div className="container-radical">
            <motion.div
              className="text-center mb-10 md:mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Su cobertura</p>
              </div>
              <h2 className="h2 text-deep-navy">Seguros aceptados</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {acceptedPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className="bg-white rounded-2xl border border-primary/30 p-6 flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  data-testid={`card-es-plan-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-full aspect-[3/2] flex items-center justify-center">
                    <img
                      src={plan.logo}
                      alt={`Logo de ${plan.name}`}
                      className="max-h-16 md:max-h-20 w-auto object-contain"
                      loading="lazy"
                      width={168}
                      height={112}
                    />
                  </div>
                  <p className="font-semibold text-deep-navy text-center">{plan.name}</p>
                </motion.div>
              ))}
            </div>
            <p
              className="text-center text-deep-navy/75 mt-8 max-w-2xl mx-auto"
              data-testid="text-es-planes-nota"
            >
              Aceptamos Aetna (Medicare Advantage y planes comerciales), Humana Medicare Advantage,
              Original Medicare, planes comerciales de Cigna y Florida Medicaid a través de Sunshine
              Health. Cada plan tiene sus propias reglas, así que verificamos el suyo antes de la
              cita y le confirmamos qué cubre.
            </p>
          </div>
        </section>

        <section className="section-gap bg-white" data-testid="section-es-aseguradoras">
          <div className="container-radical">
            <motion.div
              className="text-center mb-10 md:mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Si cambió su plan
                </p>
              </div>
              <h2 className="h2 text-deep-navy">
                Dos formas en las que podemos<br className="hidden md:block" /> ayudarle este año
              </h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed mt-6">
                Cada año, los cambios de plan dejan a familias de Naples sin el médico al que ya le
                tenían confianza. Si le pasó a usted, esto es lo que podemos hacer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {carrierCards.map((carrier, index) => (
                <motion.article
                  key={carrier.id}
                  className="bg-white border border-primary/30 rounded-3xl p-6 md:p-10 flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  data-testid={`card-es-carrier-${carrier.id}`}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div className="h-16 md:h-20 flex items-center">
                      <img
                        src={carrier.logo}
                        alt={carrier.logoAlt}
                        width={560}
                        height={224}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-auto object-contain"
                        style={{ aspectRatio: "560 / 224" }}
                      />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                      {carrier.eyebrow}
                    </p>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-deep-navy leading-tight mb-5">
                    {carrier.title}
                  </h3>

                  <p className="text-deep-navy/70 text-base md:text-lg leading-relaxed mb-6">
                    {carrier.body}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {carrier.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-deep-navy/85">
                        <CheckCircle
                          className="w-5 h-5 text-secondary mt-1 flex-shrink-0"
                          weight="fill"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {carrier.note && (
                    <div className="mb-6 p-4 rounded-2xl bg-secondary/10 border border-secondary/30">
                      <p className="text-sm md:text-base text-deep-navy">
                        <strong className="text-primary">Importante.</strong> {carrier.note}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto">
                    <a
                      href="tel:2394230205"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                      data-testid={`button-es-carrier-${carrier.id}`}
                    >
                      <Phone className="w-5 h-5" weight="fill" />
                      Llamar (239) 423-0205
                    </a>
                    <p className="mt-5 text-xs text-deep-navy/55 leading-relaxed">
                      {carrier.disclaimer}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-gap bg-primary/5" data-testid="section-es-medicare">
          <div className="container-radical">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-8 text-center">
                Medicare y<br className="hidden md:block" /> Medicare Advantage
              </h2>
              <ul className="space-y-4 mb-12">
                {medicareItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-white rounded-xl border border-primary/30 p-5"
                    data-testid={`item-es-medicare-${index}`}
                  >
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" weight="fill" />
                    <span className="text-lg text-deep-navy">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-8">
                <div data-testid="block-es-original-medicare">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Original Medicare (Partes A y B)
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Aceptamos Original Medicare para atención primaria y para cuidados paliativos. La
                    Parte B cubre sus consultas médicas, incluidas las consultas de cuidados
                    paliativos y sus seguimientos. Si tiene Original Medicare no necesita pedir
                    permiso a una red para venir a vernos: llámenos y le damos cita.
                  </p>
                </div>

                <div data-testid="block-es-medicare-advantage">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Medicare Advantage (Parte C)
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Los planes Medicare Advantage los administra una compañía privada, como Aetna o
                    Humana, y casi siempre le piden elegir un médico primario dentro de su red.
                    Somos proveedores contratados de Aetna Medicare Advantage, y con Humana Medicare
                    Advantage estamos dentro de la red para cuidados paliativos. Antes de que agende,
                    revisamos su plan y le confirmamos exactamente qué cubre.
                  </p>
                </div>

                <div data-testid="block-es-visita-bienestar">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Su visita anual de bienestar
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Medicare cubre una visita de bienestar cada año y nosotros la usamos como debe
                    ser: una revisión completa de su salud, de todos sus medicamentos, de su memoria
                    y de su riesgo de caídas, con tiempo para sus preguntas y las de su familia. No
                    es un trámite de cinco minutos ni una firma en un papel.
                  </p>
                </div>

                <div data-testid="block-es-cambiar-medico">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-navy mb-3">
                    Cómo cambiar de médico primario
                  </h3>
                  <p className="text-deep-navy/75 leading-relaxed">
                    Si tiene un plan Medicare Advantage y quiere que la Dra. Reve sea su médico
                    primario, llámenos antes de hacer cualquier trámite. Le decimos a qué número de
                    su plan llamar, qué información dar y cómo confirmar que el cambio quedó
                    registrado. Después agendamos su primera cita con calma.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/insurance-accepted"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline"
                  data-testid="link-es-insurance-en"
                >
                  Ver la lista completa de seguros (en inglés)
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <VisitSteps
          eyebrow="Antes de su cita"
          title="Cómo verificamos su cobertura"
          subtitle="Nadie debería descubrir en la recepción que su visita no estaba cubierta. Así lo revisamos nosotros, paso a paso."
          steps={verificationSteps}
          ctaText="Llamar (239) 423-0205"
          ctaHref="tel:2394230205"
        />

        <section className="section-gap bg-white" data-testid="section-es-sin-seguro">
          <div className="container-radical">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-6 text-center">
                ¿No tiene seguro?<br className="hidden md:block" /> También puede atenderse
              </h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed mb-6">
                No hace falta tener seguro para tener médico. Con nuestra membresía de Direct Primary
                Care usted paga una cuota mensual directamente a la clínica. El acuerdo vigente
                explica las visitas, las formas de comunicación, los servicios incluidos y cualquier
                costo que pueda quedar fuera de la membresía.
              </p>
              <p className="text-deep-navy/75 leading-relaxed mb-6">
                La membresía no es un seguro médico y no sustituye la cobertura para hospitalización,
                especialistas o emergencias. Pida a la clínica el precio y el acuerdo actual antes de
                inscribirse, y consulte a un profesional fiscal sobre las reglas vigentes de las
                cuentas HSA.
              </p>
              <div className="text-center">
                <Link
                  href="/es/contacto"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
                  data-testid="button-es-membresia"
                >
                  Pregunte por la membresía
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-gap bg-primary/5" data-testid="section-es-no-ve-plan">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-6">¿No ve su plan?</h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed mb-8">
                Llámenos. Verificamos su cobertura antes de la cita para que no se lleve sorpresas, y
                si su plan no nos cubre, le decimos con franqueza qué otras opciones tiene, incluida
                la membresía mensual. Preferimos una llamada honesta de cinco minutos antes que una
                factura inesperada después.
              </p>
              <a
                href="tel:2394230205"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
                data-testid="button-es-verificar"
              >
                <Phone className="w-5 h-5" />
                Llamar (239) 423-0205
              </a>
            </motion.div>
          </div>
        </section>

        <FaqSection
          eyebrow="Preguntas frecuentes"
          title="Dudas sobre seguros, Medicare y cobertura."
          items={esSegurosFaqs}
        />

        <TealCta
          title="Verificamos su seguro por usted"
          subtitle="Sin sorpresas"
          description="Llámenos antes de su cita y confirmamos su cobertura. Atendemos en español."
          primaryCtaText="Llamar (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Contacto y cómo llegar"
          secondaryCtaHref="/es/contacto"
        />
      </main>
    </div>
  );
}
