/**
 * Datos de estudio: lo que no pertenece a ninguna propiedad en concreto.
 *
 * El compromiso y la garantía son de Zerho, no de una casa: viven aquí y no
 * duplicados en los tres .md. Si algún día una ficha necesita su propia
 * variante, se añade el campo opcional al esquema y se sobreescribe allí.
 */

export const SITE = {
  name: "Zerho",
  slogan: "Arquitectura Extraordinaria",
  legalName: "Zerho Arquitectos",
  description:
    "Residencias de autor en San Pedro Garza García, con certeza total de costos, aportaciones programadas y diez años de garantía.",
  director: "Jorge Antonio López",
  directorRole: "Dirección de proyecto",
  /** Firma de marca: cierra el pie de todas las fichas. */
  signature: "Construimos su legado, ustedes las historias",
  /** Persona que atiende las visitas; da nombre y rostro al contacto. */
  contactPerson: "Arq. Ana Treviño Gaona",
  email: "atrevino@arquitectosasociados.mx",
  phone: "+52 (81) 1965 8330",
  phoneHref: "+528119658330",
  whatsapp: "528119658330",
  city: "San Pedro Garza García, Nuevo León",
  instagram: "https://www.instagram.com/",
} as const;

/**
 * Navegación del sitio: es una sola página larga por propiedad.
 *
 * El orden sigue la decisión del comprador: qué es la casa, quién la respalda,
 * cómo se ve, cómo se vive y, al final, el detalle para comparar.
 */
export const SECTIONS = [
  { id: "residencia", label: "Residencia" },
  { id: "compromiso", label: "Compromiso" },
  { id: "galeria", label: "Galería" },
  { id: "planos", label: "Planos" },
  { id: "caracteristicas", label: "Características" },
  { id: "contacto", label: "Visita" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Los cinco compromisos que Zerho firma con cada cliente. */
export const COMMITMENTS = [
  {
    title: "Contratos a precio alzado",
    body: "Certeza total de costos: sin sorpresas financieras, sin costos ocultos y sin incrementos durante la obra.",
  },
  {
    title: "Aportaciones programadas",
    body: "Un calendario de pagos transparente, vinculado directamente al avance real verificable de la construcción.",
  },
  {
    title: "Comunicación directa",
    body: "Atención personal con el equipo directivo y técnico. Sin intermediarios ni triangulaciones.",
  },
  {
    title: "Diseño con visión a futuro",
    body: "Espacios multifuncionales y centros de comando familiares que evolucionan con cada etapa de tu vida.",
  },
  {
    title: "Tu tranquilidad como prioridad",
    body: "Asumimos la responsabilidad operativa completa para que disfrutes el proceso sin el estrés de la obra.",
  },
] as const;

export const WARRANTY = {
  years: "10",
  title: "Garantía y respaldo por diez años",
  body: "Un horizonte largo para proteger tu patrimonio y asegurar su plusvalía. Nuestro compromiso no termina al entregar las llaves.",
} as const;

/** Mensaje de marca que abre la sección de compromiso en todas las fichas. */
export const PROMISE = {
  eyebrow: "Nuestro compromiso",
  title: "Tu hogar es el activo más importante de tu patrimonio",
  lead: "Y el espacio donde tu familia construirá sus mejores recuerdos. Por eso trabajamos así:",
  body: "Entendemos que es también el espacio donde tu familia construirá sus mejores recuerdos. Por eso ofrecemos residencias en preventa exclusiva respaldadas por una absoluta certeza constructiva y financiera, acompañándote paso a paso para garantizar que el resultado final sea, sin excepciones, la casa que siempre soñaste.",
} as const;

/**
 * Interiorismo. Los renders muestran casas amuebladas y ambientadas: quien se
 * enamora de un interior debe saber que también lo podemos hacer realidad.
 */
export const INTERIORS = {
  eyebrow: "Interiorismo",
  title: "Lo que ves también lo diseñamos",
  lead: "Cada ambiente de estas imágenes nace del mismo estudio que proyecta la casa.",
  body: [
    "Mobiliario, materiales, iluminación y carpintería se piensan junto con la arquitectura, no después. Por eso los espacios se sienten completos desde el primer día.",
    "Si te gusta la atmósfera que ves, podemos llevarla a tu residencia: a la medida de tu familia, de tus piezas y de tu forma de vivir.",
  ],
  cta: "Conversemos sobre tus interiores",
} as const;

type WhatsappTopic = "visita" | "interiores";

/** Enlace de WhatsApp prellenado con la propiedad y el motivo. */
export function whatsappHref(
  propertyTitle?: string,
  topic: WhatsappTopic = "visita",
) {
  const text =
    topic === "interiores"
      ? `Hola Zerho, me gustaría platicar sobre el interiorismo${propertyTitle ? ` de ${propertyTitle}` : ""}.`
      : propertyTitle
        ? `Hola Zerho, me gustaría agendar una visita a ${propertyTitle}.`
        : `Hola Zerho, me gustaría conocer sus residencias disponibles.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Asunto prellenado para el correo. */
export function mailHref(propertyTitle?: string) {
  const subject = propertyTitle ? `${propertyTitle} — Zerho` : `Residencias Zerho`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}
