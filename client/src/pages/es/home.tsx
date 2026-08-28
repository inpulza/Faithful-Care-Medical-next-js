import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Stethoscope,
  HandHeart,
  ChatCircleDots,
  MapTrifold,
  FirstAid,
  Heartbeat,
  UsersThree,
  ClipboardText,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  TealCta,
  BentoGrid,
  PageHero,
  InsuranceLogos,
  marqueeDataMap,
  TestimonialsSection,
  AlternatingBlock,
  FaqSection,
} from "@/components/sections";
const ServiceAreaMap = React.lazy(() => import("@/components/service-area-map"));
const ImageMarquee = React.lazy(() =>
  import("@/components/sections/image-marquee").then(m => ({ default: m.ImageMarquee }))
);
const InsuranceMembership = React.lazy(() =>
  import("@/components/sections/insurance-membership").then(m => ({ default: m.InsuranceMembership }))
);
import { JsonLdArray } from "@/components/json-ld";
import { faqPageSchema } from "@/lib/schemas";
import { esHomeFaqs } from "@/lib/es-home-faqs";
import { esBentoServices, esInsuranceNote, esDpcBenefits, esReviews, esStats } from "@/lib/es-content";
import { extractFaqText } from "@/lib/extract-faq-text";
import heroImage from "@/assets/images/hero-doctor-faithful-care.optimized.webp";
import heroImageMobile from "@/assets/images/hero-doctor-mobile.mobile.webp";
import heroSeniorWoman from "@/assets/images/hero-doctor-senior-woman.optimized.webp";
import heroSeniorWomanMobile from "@/assets/images/hero-doctor-senior-woman.mobile.webp";
import heroYoungWoman from "@/assets/images/hero-doctor-young-woman.optimized.webp";
import heroYoungWomanMobile from "@/assets/images/hero-doctor-young-woman.mobile.webp";
import heroYoungMan from "@/assets/images/hero-doctor-young-man.optimized.webp";
import heroYoungManMobile from "@/assets/images/hero-doctor-young-man.mobile.webp";
import heroWoman from "@/assets/images/hero-doctor-woman.optimized.webp";
import heroWomanMobile from "@/assets/images/hero-doctor-woman.mobile.webp";
import heroSeniorMan from "@/assets/images/hero-doctor-senior-man.optimized.webp";
import heroSeniorManMobile from "@/assets/images/hero-doctor-senior-man.mobile.webp";

const heroSlides = [heroImage, heroYoungWoman, heroSeniorWoman, heroYoungMan, heroWoman, heroSeniorMan];
const heroSlidesMobile = [heroImageMobile, heroYoungWomanMobile, heroSeniorWomanMobile, heroYoungManMobile, heroWomanMobile, heroSeniorManMobile];

const promiseCards = [
  {
    icon: Stethoscope,
    title: "Una doctora que le conoce",
    description: "Sin desfile de caras nuevas. Le atiende siempre la misma doctora, que conoce su historia, sus medicamentos y lo que es importante para usted."
  },
  {
    icon: Clock,
    title: "Citas el mismo día",
    description: "Cuando algo no anda bien, no debería esperar semanas para que le vean. Llame por la mañana y le atendemos por la tarde."
  },
  {
    icon: ShieldCheck,
    title: "Toda su atención en un solo lugar",
    description: "Chequeos, enfermedades crónicas, laboratorio, procedimientos y apoyo paliativo. Todo coordinado bajo un mismo techo para que nada se quede sin atender."
  },
  {
    icon: ChatCircleDots,
    title: "Tiempo para escucharle de verdad",
    description: "Nada de consultas de cinco minutos. Nos sentamos, escuchamos sus preocupaciones, respondemos todas sus preguntas y nos aseguramos de que salga tranquilo con su plan de cuidado."
  },
  {
    icon: HandHeart,
    title: "Su familia es parte del equipo",
    description: "Hablamos con su familia, explicamos los planes de tratamiento en lenguaje claro y nos aseguramos de que todos se sientan informados y tranquilos."
  },
  {
    icon: MapTrifold,
    title: "Navegamos el sistema por usted",
    description: "Preguntas del seguro, referencias a especialistas, manejo de medicamentos. Nos encargamos de lo complicado para que usted no tenga que hacerlo."
  },
];

function EsPromiseSection() {
  return (
    <section className="section-gap bg-white" data-testid="section-promise">
      <div className="container-radical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Nuestra promesa</p>
            </div>
            <h2 className="h2 text-deep-navy mb-6">
              La atención médica como debe ser.
            </h2>
            <p className="body-lg text-deep-navy/60 mb-10 max-w-md">
              En Faithful Care construimos la clínica alrededor de una idea simple: tratar a cada paciente como tratamos a nuestra propia familia.
            </p>
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 py-6 border-t border-deep-navy/8">
                <span className="font-serif text-5xl font-light text-primary">6</span>
                <p className="text-deep-navy/50 text-sm leading-snug">compromisos que guían<br />cada visita</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-deep-navy/6 rounded-2xl overflow-hidden border border-deep-navy/6">
              {promiseCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-7 md:p-8 bg-white cursor-default transition-colors duration-400 hover:bg-secondary"
                    style={{ transitionProperty: 'background-color' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    data-testid={`promise-card-${index}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary flex-shrink-0 transition-colors duration-400 promise-icon-box">
                        <Icon className="w-5 h-5 text-white/80 transition-colors duration-400 promise-icon" weight="regular" />
                      </div>
                      <span className="text-xs font-mono text-deep-navy/20 mt-2 transition-colors duration-400 promise-number">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-deep-navy mb-2 transition-colors duration-400 promise-title">
                      {card.title}
                    </h3>
                    <p className="text-sm text-deep-navy/50 leading-relaxed transition-colors duration-400 promise-desc">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const palliativeCareServices = [
  {
    id: 1,
    icon: FirstAid,
    title: "Manejo del dolor y confort",
    description: "Planes de tratamiento personalizados para reducir el dolor crónico, la falta de aire y el malestar. Coordinamos con sus especialistas para ajustar medicamentos y terapias, para que se sienta mejor lo antes posible.",
    tags: ["Dolor crónico", "Revisión de medicamentos", "Terapias de confort", "Coordinación con especialistas"],
    href: "/es/cuidados-paliativos-naples",
    image: "/images/services/pain-comfort-management.webp",
  },
  {
    id: 2,
    icon: Heartbeat,
    title: "Alivio de síntomas",
    description: "Ayuda experta con el dolor crónico, la dificultad para respirar, la fatiga, las náuseas, la ansiedad, los problemas de sueño y la falta de apetito. Para que pueda concentrarse en vivir, no solo en manejar síntomas.",
    tags: ["Manejo del dolor", "Apoyo respiratorio", "Fatiga", "Náuseas", "Ansiedad", "Sueño"],
    href: "/es/cuidados-paliativos-naples",
    image: "/images/services/symptom-relief.webp",
  },
  {
    id: 3,
    icon: UsersThree,
    title: "Apoyo para pacientes y familias",
    description: "Acompañamiento durante una enfermedad seria, para el paciente y sus seres queridos. Apoyo al cuidador, conversaciones honestas sobre qué esperar, cuidado emocional y ayuda para tomar decisiones difíciles.",
    tags: ["Guía para cuidadores", "Apoyo emocional", "Reuniones familiares", "Manejo del estrés"],
    href: "/es/cuidados-paliativos-naples",
    image: "/images/services/patient-family-support.webp",
  },
  {
    id: 4,
    icon: ClipboardText,
    title: "Planificación y transiciones",
    description: "Directivas anticipadas, testamento vital, conversaciones sobre los objetivos del cuidado y una coordinación sin sobresaltos cuando llega el momento. Para que sus deseos siempre se respeten.",
    tags: ["Directivas anticipadas", "Testamento vital", "Objetivos del cuidado", "Coordinación con hospicio"],
    href: "/es/cuidados-paliativos-naples",
    image: "/images/services/planning-transitions.webp",
  },
];

function EsPalliativeCareSection() {
  return (
    <section className="bg-[#00c2cc]" data-testid="section-palliative-care">
      <div className="container-radical py-12 md:py-20 lg:py-28">
        <motion.div
          className="text-center mb-10 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/80" />
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Cuidados paliativos en Naples, FL</p>
          </div>
          <h2 className="h2 text-white max-w-3xl mx-auto">
            Un apoyo adicional frente a<br className="hidden lg:block" /> una enfermedad seria.
          </h2>
          <p className="body-md text-white/80 leading-relaxed mt-6 max-w-2xl mx-auto">
            No es hospicio. Es una capa adicional de apoyo médico disponible en cualquier etapa de una enfermedad seria, junto con su tratamiento habitual. El objetivo es mejorar la calidad de vida del paciente y de su familia.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/es/cuidados-paliativos-naples" aria-label="Ver cuidados paliativos en Naples">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" data-testid="button-palliative-care-hub">
                Ver cuidados paliativos
                <ArrowRight weight="regular" size={20} className="ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="lg:relative">
          {palliativeCareServices.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === palliativeCareServices.length - 1;
            return (
              <div
                key={service.id}
                className="lg:sticky flex items-center"
                style={{
                  top: `clamp(2vh, 10vh, calc(50vh - 280px))`,
                  zIndex: 10 + index,
                }}
                data-testid={`palliative-row-${index}`}
              >
                <motion.div
                  className={`bg-white rounded-3xl border border-primary/30 w-full ${isLast ? '' : 'mb-6 lg:mb-8'}`}
                  style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <div className="flex items-center gap-4 mb-5 md:hidden">
                    <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0" />
                    <h3 className="font-semibold text-2xl text-deep-navy">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr] items-center"
                    style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    <div className="order-2 md:order-1">
                      <div className="hidden md:flex items-center gap-3" style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
                        <motion.span
                          className="font-mono font-semibold text-primary/40 tracking-wider"
                          style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        >
                          {String(index + 1).padStart(2, "0")} / {String(palliativeCareServices.length).padStart(2, "0")}
                        </motion.span>
                        <div className="flex-1 h-px bg-primary/10" />
                      </div>

                      <div className="hidden md:flex items-center gap-4" style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)' }}>
                        <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0" />
                        <h3 className="font-semibold text-deep-navy" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.875rem)' }}>
                          {service.title}
                        </h3>
                      </div>

                      <p
                        className="text-deep-navy/60 leading-relaxed max-w-xl"
                        style={{
                          fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                          marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                        }}
                      >
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-3" style={{ marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
                        {service.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            className="border border-primary/30 rounded-full font-medium text-deep-navy/70 cursor-default"
                            style={{
                              padding: 'clamp(0.375rem, 0.8vh, 0.5rem) clamp(0.875rem, 1.5vw, 1.25rem)',
                              fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: "hsl(216, 100%, 50%)", color: "#fff", borderColor: "hsl(216, 100%, 50%)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      <Link href={service.href} aria-label={`Más información sobre ${service.title}`}>
                        <Button size="lg" data-testid={`link-palliative-${index}`}>
                          <span aria-hidden="true">Más información</span>
                          <span className="sr-only">Más información sobre {service.title}</span>
                          <ArrowRight weight="regular" size={20} className="ml-2" aria-hidden="true" />
                        </Button>
                      </Link>

                      <div className="flex items-center gap-3" style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1.5rem)' }}>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-secondary"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-sm text-deep-navy/40 font-medium">
                          {index === 0 && "En coordinación con sus especialistas"}
                          {index === 1 && "Disponible junto con su tratamiento actual"}
                          {index === 2 && "Apoyo para pacientes y cuidadores"}
                          {index === 3 && "Sus deseos, siempre respetados"}
                        </span>
                      </div>
                    </div>

                    <div
                      className="order-1 md:order-2 aspect-[3/2] md:aspect-[4/5] lg:aspect-square rounded-2xl bg-primary/5 border border-primary/30 overflow-hidden relative"
                      data-testid={`palliative-image-${index}`}
                    >
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-md border border-primary/10">
                        <Icon className="w-6 h-6 text-primary" weight="regular" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function EsHome() {
  const plainEsFaqs = esHomeFaqs.map((faq) => ({
    question: faq.question,
    answer: extractFaqText(faq.answer),
  }));

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <JsonLdArray schemas={[faqPageSchema(plainEsFaqs)]} />
      <main id="main">
        <PageHero
          title={<>Atención Primaria y Cuidados<br className="hidden lg:block" /> Paliativos en Naples, Florida.</>}
          subtitle="Chequeos anuales, control de enfermedades crónicas, citas el mismo día y apoyo paliativo compasivo. Todo bajo un mismo techo en Naples, Florida. Simplificamos su atención médica para que usted se concentre en lo que más importa."
          subtitleBold="Atendemos en español y en inglés."
          primaryCtaText="Llamar ahora"
          primaryCtaHref="tel:2394230205"
          secondaryCtaText="Pedir una cita"
          secondaryCtaHref="/es/contacto"
          marqueeItems={["Aceptamos pacientes nuevos", "Naples, FL", "Citas el mismo día", "Medicare, Medicaid, Aetna, Cigna y Humana"]}
          heroImage={heroImage}
          heroImageMobile={heroImageMobile}
          heroImages={heroSlides}
          heroImagesMobile={heroSlidesMobile}
          heroImageAlt="La Dra. Addys Reve, fundadora de Faithful Care Medical Services, brindando atención primaria y paliativa compasiva en Naples, Florida"
          heroBlurPlaceholder="data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwBACdASoUAAsAPu1orU2ppqSiMAgBMB2JaACxC8AJW1kgpoUTNzNZ+gAA/vforvEhALTYVpUo1d+4Smfo1ttD85s/YgUVhX2MxrlngUyzldYql84PMsNvr3peRFj50rgtGHJD3mE9OQAA"
          showSearchCard={false}
          showTrustLine={true}
          trustLineText={<>Medicare, Medicaid, Aetna, Cigna y Humana <span className="opacity-60">·</span> Atención en español</>}
          variant="home"
          mobileGreeting
        />

        <InsuranceLogos
          eyebrow="Planes de seguro aceptados"
          note={esInsuranceNote}
        />

        <BentoGrid
          id="page-content"
          subtitle="Todo lo que su familia necesita"
          title="Seis servicios de atención primaria para cuidar su salud todo el año."
          services={esBentoServices}
          primaryCta={{ text: "Pedir una cita", href: "/es/contacto" }}
          secondaryCta={{ text: "Ver atención primaria", href: "/es/medico-de-familia-naples" }}
          cardCtaText="Ver más"
        />

        <EsPalliativeCareSection />

        <EsPromiseSection />

        {marqueeDataMap["/es"] && (
          <React.Suspense fallback={<div style={{ minHeight: "clamp(220px, 30vh, 360px)" }} aria-hidden="true" />}>
            <ImageMarquee items={marqueeDataMap["/es"]} />
          </React.Suspense>
        )}

        <React.Suspense fallback={<div style={{ minHeight: "clamp(700px, 90vh, 1180px)" }} aria-hidden="true" />}>
          <ServiceAreaMap
            eyebrow="Nuestra área de servicio"
            title={<>Con sede en Naples, atendemos<br className="hidden lg:block" /> todo el suroeste de Florida.</>}
            description="Nuestra clínica está en Naples, pero atendemos con la misma calidad y calidez a pacientes de los condados de Collier, Lee, Charlotte, Hendry y Glades."
            disclaimer="Áreas de servicio, no sedes físicas"
            mapAriaLabel="Mapa del área de servicio de Faithful Care en el suroeste de Florida"
            locationLinks={[
              { name: "Naples" },
              { name: "Marco Island" },
              { name: "Golden Gate" },
              { name: "Immokalee" },
              { name: "Bonita Springs" },
              { name: "Estero" },
              { name: "Fort Myers" },
              { name: "Cape Coral" },
            ]}
          />
        </React.Suspense>

        <AlternatingBlock
          subtitle="Conozca a su doctora"
          title="Atención certificada, con tiempo para escucharle."
          description="Fundé Faithful Care porque creo que cada paciente merece más que una consulta apurada y una receta. Cuando entra por nuestra puerta, encuentra a una doctora que sabe su nombre, entiende su historia y se toma el tiempo de explicarle todo con claridad. Combino la precisión clínica del hospital con la calidez del médico de familia de toda la vida. Su salud, y su tranquilidad, son algo personal para mí."
          ctaText="Conozca a la Dra. Addys Reve"
          ctaHref="/about"
          imageSrc="/images/dr-addys-reve.webp"
          imageAlt="Dra. Addys Reve, MD, fundadora de Faithful Care Medical Services, brindando atención primaria y paliativa en Naples, Florida"
          variant="primary"
        />

        <React.Suspense fallback={<div style={{ minHeight: "clamp(900px, 120vh, 1500px)" }} aria-hidden="true" />}>
          <InsuranceMembership
            eyebrow="Seguros y membresía"
            title={<>Humana, Aetna, Cigna, Medicare y Medicaid.<br className="hidden lg:block" /> ¿Sin seguro? No hay problema.</>}
            dpcHeading="¿Qué es Direct Primary Care?"
            dpcBold="Atención primaria por membresía con continuidad y prioridad de agenda."
            dpcParagraph1="Es un modelo en el que usted paga una cuota mensual directamente a la clínica. El acuerdo vigente explica las visitas, las formas de comunicación y los servicios incluidos."
            dpcParagraph2="La membresía DPC no es un seguro médico y no sustituye la cobertura para hospitalización, especialistas o emergencias. Pida el precio y el acuerdo actual, y consulte a un profesional fiscal sobre la elegibilidad de cuentas HSA."
            ctaText="Pregunte por la membresía"
            ctaHref="/es/contacto"
            benefits={esDpcBenefits}
            carouselPrevLabel="Tarjeta anterior"
            carouselNextLabel="Tarjeta siguiente"
            carouselDotLabel={(n) => `Ir a la tarjeta ${n}`}
          />
        </React.Suspense>

        <TestimonialsSection
          eyebrow="Testimonios"
          title="Lo que dicen nuestros pacientes"
          statsNote="Algunos datos sobre nuestros pacientes"
          statsOverride={esStats}
          reviewsOverride={esReviews}
          featuredImageAlt="La Dra. Reve con una paciente mayor sonriente en Faithful Care Medical Services"
          googleEyebrow="Perfil de Google Business"
          googleTitle="Lea más reseñas de nuestros pacientes"
          googleCtaText="Ver en Google"
          disclaimerText="Las reseñas reflejan experiencias individuales y se muestran traducidas del inglés. Los resultados pueden variar."
        />

        <FaqSection
          eyebrow="Preguntas frecuentes"
          title="Respuestas para pacientes nuevos en Naples y el suroeste de Florida."
          items={esHomeFaqs}
        />

        <TealCta
          subtitle="Su salud no puede esperar"
          title="Reserve hoy su cita en Faithful Care."
          description="Ya sea un chequeo de rutina, ayuda con una enfermedad crónica o apoyo compasivo ante un diagnóstico difícil, aquí estamos para usted y su familia. Una llamada es suficiente."
          primaryCtaText="Pedir una cita"
          primaryCtaHref="/es/contacto"
          secondaryCtaText="Llamar (239) 423-0205"
          secondaryCtaHref="tel:2394230205"
        />
      </main>
    </div>
  );
}
