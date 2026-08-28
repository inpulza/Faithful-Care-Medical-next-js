import * as React from "react";
import {
  ShieldCheck,
  Heartbeat,
  FirstAidKit,
  FlowerLotus,
  UserCircle,
  Stethoscope,
} from "@phosphor-icons/react";
import { GOOGLE_RATING } from "@/lib/provider-info";

export const esBentoServices = [
  {
    icon: ShieldCheck,
    title: "Chequeos y prevención",
    description: "Exámenes anuales, pruebas de detección y vacunas.",
    href: "/es/medico-de-familia-naples",
    image: "/images/services/checkups-prevention.webp",
  },
  {
    icon: Heartbeat,
    title: "Enfermedades crónicas",
    description: "Diabetes, presión alta, EPOC y enfermedades del corazón.",
    href: "/es/medico-de-familia-naples",
    image: "/images/services/chronic-disease.webp",
  },
  {
    icon: FirstAidKit,
    title: "Citas urgentes el mismo día",
    description: "¿Se siente mal hoy? Le atendemos hoy.",
    href: "/es/medico-de-familia-naples",
    image: "/images/services/same-day-visits.webp",
  },
  {
    icon: FlowerLotus,
    title: "Salud de la mujer",
    description: "Exámenes anuales, salud hormonal y pruebas de detección.",
    href: "/es/medico-de-familia-naples",
    image: "/images/services/womens-health.webp",
  },
  {
    icon: UserCircle,
    title: "Adultos mayores",
    description: "Prevención de caídas, memoria y control de medicamentos.",
    href: "/es/medico-de-familia-naples",
    image: "/images/services/senior-care.webp",
  },
  {
    icon: Stethoscope,
    title: "Procedimientos en la clínica",
    description: "Electrocardiogramas, laboratorio, inyecciones y curaciones.",
    href: "/es/medico-de-familia-naples",
    image: "/images/services/in-office-procedures.webp",
  },
];

export const esInsuranceNote = (
  <>
    Humana está dentro de la red para cuidados paliativos y ofrece beneficios fuera de la red para atención primaria. ¿No ve su plan? Llame al <a href="tel:2394230205" className="underline font-medium text-deep-navy hover:text-primary">(239) 423-0205</a> y verificamos su cobertura por usted.
  </>
);

export const esNetworkStatusText =
  "Somos proveedores contratados de Aetna, tanto en Medicare Advantage como en sus planes comerciales. Con Humana Medicare Advantage estamos dentro de la red para cuidados paliativos y ofrecemos beneficios fuera de la red para atención primaria.";

export const esNetworkStatusNote = (
  <>
    {esNetworkStatusText} ¿No ve su plan? Llame al <a href="tel:2394230205" className="underline font-medium text-deep-navy hover:text-primary">(239) 423-0205</a> y verificamos su cobertura por usted.
  </>
);

export const esDpcBenefits = [
  {
    title: "Visitas incluidas",
    subtitle: "Según el acuerdo vigente",
    description: "La membresía cubre las visitas de atención primaria descritas en su acuerdo escrito. Revise los servicios incluidos, las exclusiones y cualquier costo externo antes de inscribirse.",
    features: ["Servicios definidos por escrito", "Seguimientos según el acuerdo", "Costos externos explicados con claridad"],
  },
  {
    title: "Acceso el mismo día",
    subtitle: "Prioridad cuando hay disponibilidad",
    description: "Los miembros pueden solicitar prioridad en la agenda para asuntos de atención primaria que requieren pronta evaluación.",
    features: ["Opciones el mismo día cuando estén disponibles", "Solicitudes prioritarias", "Orientación clara para asuntos urgentes"],
  },
  {
    title: "Comunicación directa",
    subtitle: "Su doctora, a una llamada",
    description: "El acuerdo vigente explica las opciones disponibles para comunicarse con la clínica entre visitas y cuándo se necesita una evaluación presencial.",
    features: ["Canales definidos por la clínica", "Consultas por video cuando correspondan", "Orientación sobre cuándo acudir en persona"],
  },
  {
    title: "Precios transparentes",
    subtitle: "Condiciones por escrito",
    description: "La membresía tiene una cuota mensual y un acuerdo escrito que explica los servicios incluidos y las posibles tarifas externas.",
    features: ["Cuota mensual", "Servicios incluidos y excluidos por escrito", "Consulte las reglas vigentes de cuentas HSA"],
  },
  {
    title: "Citas más largas",
    subtitle: "Tiempo enfocado en sus necesidades",
    description: "Su tiempo con la doctora no se corta a los cinco minutos. Cada visita dura lo que su salud necesite.",
    features: ["Citas centradas en el paciente", "Exámenes físicos completos", "Tiempo para sus preguntas"],
  },
  {
    title: "Apoyo con medicamentos",
    subtitle: "Opciones explicadas con claridad",
    description: "Pregunte qué medicamentos o servicios de dispensación están disponibles, cuáles tienen un costo aparte y qué alternativa le conviene.",
    features: ["Disponibilidad confirmada por la clínica", "Precios comunicados antes de aceptar", "Coordinación con su farmacia cuando corresponda"],
  },
];

export const esReviews = [
  {
    quote: "Llevé a mi mamá a su chequeo anual de bienestar de Medicare. Tiene 81 años y les tenía nervios a los médicos desde que falleció mi papá. La Dra. Reve fue increíblemente paciente con ella, le habló despacio y se aseguró de que entendiera todo. Le revisaron el equilibrio, le preguntaron por caídas y repasaron sus siete medicamentos. Mi mamá dijo que quiere volver, y eso nunca había pasado. Eso dice mucho.",
    author: "Marbelis Tomás",
    role: "Reseña de Google · 5 estrellas · Traducida del inglés",
    featured: true,
  },
  {
    quote: "Me encanta esta clínica. Soy de Cuba y los médicos cubanos en general son de primera. La Dra. Reve me dio toda su atención, el laboratorio en la misma clínica hizo mi visita mucho más fácil y el ambiente de la oficina me hizo sentir como en casa.",
    author: "Rosario Abreu",
    role: "Local Guide · 5 estrellas · Traducida del inglés",
    featured: false,
  },
  {
    quote: "Me cambié a Faithful Care cuando la oficina de mi médico anterior dejó de aceptar mi seguro. La verdad, debí cambiarme hace años. Llamé un martes por la mañana por una sinusitis que no se me quitaba y me atendieron a las 2 de la tarde ese mismo día. La Dra. Reve se sentó de verdad, me preguntó por mi trabajo y mi familia, no solo me entregó una receta a la carrera. Que la recepción sea bilingüe también le facilitó todo a mi esposo. Vale la pena el viaje desde East Naples.",
    author: "Yanet García",
    role: "Reseña de Google · 5 estrellas · Traducida del inglés",
    featured: false,
  },
];

export const esStats = [
  { value: "98%", label: "de los pacientes nos recomiendan a su familia" },
  { value: GOOGLE_RATING.value, label: "estrellas de promedio en Google" },
  { value: "30+", label: "minutos de promedio por cita" },
];

export const esTestimonialsProps = {
  eyebrow: "Testimonios",
  title: "Lo que dicen nuestros pacientes",
  statsNote: "Algunos datos sobre nuestros pacientes",
  statsOverride: esStats,
  reviewsOverride: esReviews,
  featuredImageAlt: "La Dra. Reve con una paciente mayor sonriente en Faithful Care Medical Services",
  googleEyebrow: "Perfil de Google Business",
  googleTitle: "Lea más reseñas de nuestros pacientes",
  googleCtaText: "Ver en Google",
  disclaimerText: "Las reseñas reflejan experiencias individuales y se muestran traducidas del inglés. Los resultados pueden variar.",
};

export const esInsuranceMembershipProps = {
  eyebrow: "Seguros y membresía",
  dpcHeading: "¿Qué es Direct Primary Care?",
  dpcBold: "Atención primaria por membresía con continuidad y prioridad de agenda.",
  dpcParagraph1: "Es un modelo en el que usted paga una cuota mensual directamente a la clínica. El acuerdo vigente explica las visitas, las formas de comunicación y los servicios incluidos.",
  dpcParagraph2: "La membresía DPC no es un seguro médico y no sustituye la cobertura para hospitalización, especialistas o emergencias. Pida el precio y el acuerdo actual, y consulte a un profesional fiscal sobre la elegibilidad de cuentas HSA.",
  ctaText: "Pregunte por la membresía",
  ctaHref: "/es/contacto",
  benefits: esDpcBenefits,
  carouselPrevLabel: "Tarjeta anterior",
  carouselNextLabel: "Tarjeta siguiente",
  carouselDotLabel: (n: number) => `Ir a la tarjeta ${n}`,
};
