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
  signature: "Certeza insólita creando hogares extraordinarios",
  // TODO(cliente): datos de contacto provisionales (lorem ipsum). Sustituir
  // por la persona, el correo y los teléfonos definitivos antes de publicar.
  /** Persona que atiende las visitas; da nombre y rostro al contacto. */
  contactPerson: "Ana Treviño",
  email: "atrevino@arquitectosasociados.mx",
  phone: "+52 81 2025 3696",
  phoneHref: "528120253696",
  whatsapp: "528120253696",
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
  // { id: "legado", label: "Legado" },
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
  years: "5",
  title: "Garantía y respaldo",
  body: "Nuestra garantía no es una promesa vacía; está respaldada por una trayectoria con más de 30 años de experiencia. Nuestro compromiso no termina al entregar las llaves, protegemos tu patrimonio para que tu residencia conserve su plusvalía y belleza a través del tiempo.",
} as const;

/** Mensaje de marca que abre la sección de compromiso en todas las fichas. */
export const PROMISE = {
  eyebrow: "Nuestro compromiso",
  title:
    "Tu hogar, el activo más importante de tu patrimonio y el espacio donde tu familia construirá sus mejores recuerdos.",
  lead: "Y el espacio donde tu familia construirá sus mejores recuerdos. Por eso trabajamos así:",
  body: "Transformamos la construcción residencial en una experiencia de certidumbre total: una metodología probada que blindará tu patrimonio, tu tiempo y la fidelidad a tu diseño.",
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
  const subject = propertyTitle
    ? `${propertyTitle} — Zerho`
    : `Residencias Zerho`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}
