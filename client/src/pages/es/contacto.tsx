import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Envelope,
  MapPin,
  NavigationArrow,
  IdentificationCard,
  Pill,
  Files,
  Stethoscope,
  Car,
  Wheelchair,
  Translate,
  ShieldCheck,
} from "@phosphor-icons/react";
import { PageHero } from "@/components/sections/page-hero";
import { TealCta } from "@/components/sections/teal-cta";
import { AlternatingBlock, InsuranceLogos, FaqSection, VisitSteps } from "@/components/sections";
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { extractFaqText } from "@/lib/extract-faq-text";
import { esContactoFaqs } from "@/lib/es-contacto-faqs";
import { esNetworkStatusNote } from "@/lib/es-content";
import { pageContentMap } from "@/lib/page-content";
import {
  CLINIC_GMAPS_SHARE_URL,
  CLINIC_GMAPS_DIRECTIONS_URL,
  CLINIC_GMAPS_EMBED_URL,
} from "@/lib/clinic-location";

const firstVisitItems = [
  {
    icon: IdentificationCard,
    title: "Su identificación y su tarjeta del seguro",
    description:
      "Una identificación con foto y la tarjeta de su plan. Con eso confirmamos su cobertura el mismo día de la visita, aunque ya la hayamos verificado por teléfono.",
  },
  {
    icon: Pill,
    title: "La lista de sus medicamentos",
    description:
      "Todos los que toma, con la dosis, incluidos los suplementos y las vitaminas. Si le resulta más fácil, traiga los frascos en una bolsa: los revisamos uno por uno con usted.",
  },
  {
    icon: Stethoscope,
    title: "Los datos de sus especialistas",
    description:
      "El nombre y el teléfono de los médicos que le atienden. Así podemos pedir sus registros y coordinar su cuidado sin que usted tenga que ir de una oficina a otra.",
  },
  {
    icon: Files,
    title: "Sus resultados recientes",
    description:
      "Si tiene copias de laboratorios, radiografías u otros estudios de los últimos meses, tráigalas. Nos ahorran repetir pruebas y nos dan una mejor idea de su historia.",
  },
];

export default function EsContacto() {
  const heroContent = pageContentMap["/es/contacto"];
  const plainFaqs = esContactoFaqs.map((faq) => ({
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
          showSearchCard={true}
          expandedContactForm={true}
          formLang="es"
        />

        <InsuranceLogos
          eyebrow="Planes de seguro aceptados"
          note={
            <>
              Aceptamos Original Medicare, planes comerciales de Cigna y Florida Medicaid a través de
              Sunshine Health. {esNetworkStatusNote}
            </>
          }
        />

        <section id="page-content" className="section-gap">
          <div className="container-radical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-16">
              <EsContactCard
                icon={Phone}
                title="Llámenos"
                detail="(239) 423-0205"
                description="Lun a Vie 8:30 AM a 5 PM · Sáb 8:30 AM a 12 PM"
                href="tel:+1-239-423-0205"
                index={0}
              />
              <EsContactCard
                icon={Envelope}
                title="Escríbanos"
                detail="info@faithfulcaremedical.com"
                description="Respondemos en un día hábil"
                href="mailto:info@faithfulcaremedical.com"
                index={1}
              />
              <EsContactCard
                icon={MapPin}
                title="Visítenos"
                detail="9955 Tamiami Trail N. Suite 2"
                description="Naples, Florida 34108"
                href={CLINIC_GMAPS_SHARE_URL}
                index={2}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                className="bg-white rounded-2xl border border-primary/30 p-6 md:p-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-deep-navy mb-6" data-testid="text-es-horario-title">
                  Horario
                </h2>
                <div className="space-y-4">
                  <EsHoursRow day="Lunes a Viernes" hours="8:30 AM a 5:00 PM" />
                  <EsHoursRow day="Sábado" hours="8:30 AM a 12:00 PM" />
                  <EsHoursRow day="Domingo" hours="Cerrado" />
                </div>
                <div className="mt-8 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                  <p className="text-deep-navy font-medium" data-testid="text-es-urgente">
                    ¿Necesita una cita urgente el mismo día?
                  </p>
                  <p className="text-deep-navy/70 text-sm mt-1">
                    Llámenos a primera hora de la mañana y haremos lo posible por atenderle hoy mismo.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl border border-primary/30 overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex-1">
                  <iframe
                    src={CLINIC_GMAPS_EMBED_URL}
                    className="w-full min-h-[300px] lg:min-h-[400px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Faithful Care Medical Services - 9955 Tamiami Trail N. Suite 2, Naples, FL 34108"
                    data-testid="map-google-embed-es-contacto"
                  />
                </div>
                <div className="p-4 flex items-center justify-between border-t border-primary/10">
                  <p className="text-deep-navy/60 text-sm">9955 Tamiami Trail N. Suite 2, Naples, FL 34108</p>
                  <a
                    href={CLINIC_GMAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline flex-shrink-0"
                    data-testid="link-es-directions"
                  >
                    Cómo llegar
                    <NavigationArrow className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <VisitSteps
          eyebrow="Hacerse paciente"
          title="Cómo hacerse paciente"
          subtitle="Tres pasos sencillos, y los detalles los resolvemos nosotros con usted."
          steps={[
            {
              icon: Phone,
              title: "Llámenos",
              description:
                "Llame al (239) 423-0205 y buscamos un horario que le sirva. Muchas veces tenemos citas disponibles el mismo día.",
            },
            {
              icon: ShieldCheck,
              title: "Díganos su seguro",
              description:
                "Con el nombre de su plan y su número de miembro verificamos su cobertura antes de la visita y le decimos si habrá algún copago.",
            },
            {
              icon: Stethoscope,
              title: "Venga a la consulta",
              description:
                "Su primera visita es una conversación completa de 45 a 60 minutos, no un chequeo de cinco minutos. Su doctora revisa su historia, sus medicamentos y sus preocupaciones.",
            },
          ]}
          ctaText="Llamar (239) 423-0205"
          ctaHref="tel:2394230205"
        />

        <section className="section-gap bg-white" data-testid="section-es-primera-visita">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Su primera visita
                </p>
              </div>
              <h2 className="h2 text-deep-navy mb-6">Qué llevar el primer día</h2>
              <p className="body-lg text-deep-navy/70 leading-relaxed">
                La primera consulta dura entre 45 y 60 minutos, porque queremos conocer su historia
                completa y no solo el motivo de hoy. Si se le olvida algo, no se preocupe: en
                recepción le ayudamos a completarlo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {firstVisitItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="bg-white rounded-2xl border border-primary/30 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    data-testid={`card-es-primera-visita-${index}`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 mb-5">
                      <Icon className="w-6 h-6 text-primary" weight="regular" />
                    </div>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-deep-navy mb-2">
                      {item.title}
                    </h3>
                    <p className="text-deep-navy/70 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-gap bg-primary/5" data-testid="section-es-como-llegar">
          <div className="container-radical">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 text-deep-navy mb-8 text-center">
                Cómo llegar a<br className="hidden md:block" /> nuestra oficina
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4" data-testid="block-es-ubicacion">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-primary/20 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" weight="regular" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-deep-navy mb-2">
                      En North Naples, sobre Tamiami Trail
                    </h3>
                    <p className="text-deep-navy/75 leading-relaxed">
                      Estamos en 9955 Tamiami Trail N. Suite 2, Naples, FL 34108, en North Naples,
                      justo al lado de la US-41. Es fácil llegar desde Vanderbilt Beach, Pelican Bay,
                      Golden Gate y East Naples, y muchos pacientes vienen también desde Bonita
                      Springs y Estero.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4" data-testid="block-es-estacionamiento">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-primary/20 flex-shrink-0">
                    <Car className="w-6 h-6 text-primary" weight="regular" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-deep-navy mb-2">
                      Estacionamiento gratis en la puerta
                    </h3>
                    <p className="text-deep-navy/75 leading-relaxed">
                      El estacionamiento es gratuito y está frente al edificio, así que no tiene que
                      caminar cuadras ni buscar parquímetro. Si viene con un familiar mayor, puede
                      dejarlo en la entrada antes de estacionar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4" data-testid="block-es-accesibilidad">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-primary/20 flex-shrink-0">
                    <Wheelchair className="w-6 h-6 text-primary" weight="regular" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-deep-navy mb-2">
                      Entrada accesible
                    </h3>
                    <p className="text-deep-navy/75 leading-relaxed">
                      La entrada es accesible para silla de ruedas. Si necesita ayuda para entrar
                      desde su carro, avise en recepción al llegar y alguien del equipo sale a
                      recibirle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4" data-testid="block-es-idioma">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-primary/20 flex-shrink-0">
                    <Translate className="w-6 h-6 text-primary" weight="regular" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-deep-navy mb-2">
                      Le atendemos en español desde la primera llamada
                    </h3>
                    <p className="text-deep-navy/75 leading-relaxed">
                      La recepción, la consulta, los formularios y las llamadas de seguimiento se
                      hacen en español. No necesita traer a nadie a traducir ni salir de la clínica
                      con dudas sobre su tratamiento.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <AlternatingBlock
          subtitle="Conozca a su doctora"
          title="Quién le va a atender."
          description="En Faithful Care no va a encontrar una cara nueva en cada visita. La Dra. Addys Reve atiende personalmente a sus pacientes, conoce su historia y sus medicamentos, y se toma el tiempo de explicarle cada decisión en su idioma. Si viene por un chequeo, por una enfermedad crónica o buscando apoyo ante un diagnóstico serio, va a hablar con la misma doctora cada vez."
          ctaText="Conozca a la Dra. Addys Reve"
          ctaHref="/about"
          imageSrc="/images/dr-addys-reve.webp"
          imageAlt="Dra. Addys Reve, MD, de Faithful Care Medical Services, atiende en español en Naples, Florida"
          variant="primary"
        />

        <section className="section-gap bg-primary/5" data-testid="section-es-pedir-cita">
          <div className="container-radical">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-navy mb-6" data-testid="text-es-cita-title">
                Pedir una cita
              </h2>
              <p className="text-lg text-deep-navy/70 leading-relaxed mb-4">
                Puede llamarnos al (239) 423-0205 y le damos cita en la misma llamada, o llenar el
                formulario de esta página y nosotros le llamamos para confirmar. Atendemos en español.
              </p>
              <p className="text-lg text-deep-navy/70 leading-relaxed mb-8">
                Si es su primera visita, verificamos su seguro antes de que venga y le decimos qué
                necesita traer. La mayoría de los pacientes nuevos reciben cita a los pocos días.
              </p>
              <a
                href="tel:+1-239-423-0205"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
                data-testid="button-es-llamar"
              >
                <Phone className="w-5 h-5" />
                Llamar (239) 423-0205
              </a>
            </motion.div>
          </div>
        </section>

        <FaqSection
          eyebrow="Antes de llamar"
          title="Respuestas rápidas sobre su visita a nuestra clínica de Naples."
          items={esContactoFaqs}
        />

        <TealCta
          title="Aceptamos pacientes nuevos"
          subtitle="Atendemos en español"
          description="Aceptamos la mayoría de los seguros principales y Medicare. Llámenos para verificar su cobertura y pedir su primera cita."
          primaryCtaText="Llamar (239) 423-0205"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Ver seguros aceptados"
          secondaryCtaHref="/es/seguros-y-medicare"
        />
      </main>
    </div>
  );
}

function EsContactCard({
  icon: Icon,
  title,
  detail,
  description,
  href,
  index,
}: {
  icon: typeof Phone;
  title: string;
  detail: string;
  description: string;
  href: string;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group bg-white rounded-2xl border border-primary/30 p-6 md:p-8 hover:border-primary/50 hover:shadow-lg transition-all block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`card-es-contacto-${index}`}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md border border-primary/10 mb-5">
        <Icon className="w-7 h-7 text-primary" weight="regular" />
      </div>
      <h3 className="font-serif text-xl font-bold text-deep-navy mb-2 group-hover:text-primary transition-colors" data-testid={`text-es-contacto-card-title-${index}`}>
        {title}
      </h3>
      <p className="text-primary font-semibold text-lg mb-1" data-testid={`text-es-contacto-card-detail-${index}`}>
        {detail}
      </p>
      <p className="text-deep-navy/60 text-sm" data-testid={`text-es-contacto-card-desc-${index}`}>
        {description}
      </p>
    </motion.a>
  );
}

function EsHoursRow({ day, hours }: { day: string; hours: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-primary/5 last:border-0">
      <span className="text-deep-navy font-medium">{day}</span>
      <span className="text-deep-navy/70">{hours}</span>
    </div>
  );
}
