import * as React from "react";
import type { FaqItem } from "@/components/sections";

export const esMedicoFaqs: FaqItem[] = [
  {
    question: "¿Toda la atención es en español, desde la llamada hasta la consulta?",
    answer: "Sí. La Dra. Addys Reve habla español y la recepción es bilingüe. Puede llamar, pedir su cita, explicar lo que siente y entender su tratamiento completamente en español, sin traer a nadie a traducir.",
  },
  {
    question: "¿Aceptan Medicare, Medicaid y seguros comerciales?",
    answer: <>Sí. Aceptamos Original Medicare, Humana Medicare Advantage, Aetna, Cigna y Florida Medicaid a través de Sunshine Health. Puede revisar los beneficios de su plan en <a href="https://es.medicare.gov" target="_blank" rel="noopener noreferrer">es.medicare.gov</a>, o llamarnos y nosotros verificamos su cobertura. Vea más detalles en nuestra página de <a href="/es/seguros-y-medicare">seguros y Medicare</a>.</>,
  },
  {
    question: "¿Puedo conseguir una cita el mismo día si me siento mal?",
    answer: "Sí. Todos los días reservamos espacios para casos urgentes: fiebre, infecciones, mareos, lesiones menores y síntomas repentinos. Llame por la mañana al (239) 423-0205 y haremos todo lo posible por atenderle ese mismo día.",
  },
  {
    question: "¿Cómo pido mi cita y qué llevo a la primera visita?",
    answer: <>Puede llamar al (239) 423-0205 o enviar el formulario de esta página y le llamamos para confirmar. A su primera visita traiga su identificación, su tarjeta del seguro y la lista de los medicamentos que toma. Si tiene resultados de laboratorio recientes, tráigalos también. Vea la dirección y el horario en nuestra <a href="/es/contacto">página de contacto</a>.</>,
  },
  {
    question: "¿Hacen laboratorio y electrocardiograma en la misma clínica?",
    answer: "Sí. Tomamos las muestras de laboratorio en la misma clínica y muchos resultados llegan rápido. También hacemos electrocardiogramas (EKG) y procedimientos menores como inyecciones para las articulaciones y cuidado de heridas, sin mandarle a otro lugar.",
  },
  {
    question: "¿Qué pasa si no tengo seguro médico?",
    answer: <>Puede atenderse con nuestra membresía de Direct Primary Care: una cuota mensual fija que cubre visitas ilimitadas, citas el mismo día y acceso directo a su doctora por teléfono o texto. No necesita seguro para ser miembro. Puede leer más sobre este modelo en la <a href="https://www.dpcare.org" target="_blank" rel="noopener noreferrer">Direct Primary Care Coalition</a> (en inglés), o llamarnos para conocer los precios.</>,
  },
];
