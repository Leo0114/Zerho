export interface SeoMetadata {
  title: string;
  metaDescription: string;
  keywords: string[];
}

export interface ServiceDetail {
  title: string;
  description: string;
  features: string[];
}

export interface CommercialPhrase {
  title: string;
  copy: string;
}

export interface ContactInfo {
  sectionTitle: string;
  closingMessage: string;
  phone: string;
  email: string;
  contactPerson: string;
}

export interface HomeData {
  seo: SeoMetadata;
  hero: {
    preTitle: string;
    title: string;
    valueProposition: string;
    ctaPrimary: string;
    specialties: string[];
  };
  commercialPhrases: CommercialPhrase[];
  services: ServiceDetail[];
  warrantyAndValue: {
    title: string;
    description: string;
    years: number;
    benefits: string[];
  };
  contact: ContactInfo;
}

export const homeData: HomeData = {
  seo: {
    title:
      "Zerho | Arquitectura, Construcción e Interiorismo Residencial de Lujo | Cero Sorpresas",
    metaDescription:
      "Creamos residencias extraordinarias mediante diseño, construcción e interiorismo integral. Precio cerrado por contrato, garantía de 5 años y cero sorpresas.",
    keywords: [
      "Arquitectos residenciales de lujo",
      "Diseño, construcción e interiorismo",
      "Construcción a precio alzado",
      "Casas de lujo México",
      "Arquitectura e interiorismo personalizado",
      "Constructora con garantía estructural",
    ],
  },
  hero: {
    preTitle: "Arquitectura, Construcción e Interiorismo de Vanguardia",
    title: "Certeza absoluta creando hogares extraordinarios",
    valueProposition:
      "Creemos que un hogar no se habita, se sueña y se construye alrededor de tus anhelos más profundos; por eso transformamos tu estilo de vida, momentos e historias en arquitectura, construcción e interiorismo que inspiran todos los días, protegiendo tu patrimonio y dándote la tranquilidad de ver crecer a tu familia en el espacio perfecto para su vida.",
    ctaPrimary: "Iniciar mi proyecto",
    specialties: [
      "Fidelidad al diseño",
      "Certeza en nuestros procesos",
      "Plusvalía garantizada",
    ],
  },
  commercialPhrases: [
    {
      title: "Nuestra promesa, tu garantía",
      copy: "Te garantizamos la residencia que soñaste al Precio Pactado o te regalamos el diseño de interiorismo gratis.",
    },
    {
      title: "Paz Mental en la Inversión",
      copy: "Olvídate de presupuestos interminables y retrasos: entregamos tu residencia a precio cerrado por contrato y en la fecha exacta de mudanza.",
    },
    {
      title: "Cero Sorpresas en Obra",
      copy: "Un proyecto residencial no debe quitarte el sueño ni tu tiempo; nos encargamos de todo el proceso con transparencia absoluta y 0 sobrecostos.",
    },
    {
      title: "La Certeza que Tu Patrimonio Merece",
      copy: "Diseñamos espacios que evolucionan con tu familia, blindados con un contrato a precio alzado y respaldados por 5 años de garantía estructural.",
    },
    {
      title: "Del Render a la Realidad",
      copy: "Eliminamos la incertidumbre del diseño: garantizamos por contrato que la calidad y los acabados que apruebas en pantalla son los que recibes.",
    },
    {
      title: "Construcción en Piloto Automático",
      copy: "Vive la emoción de edificar el hogar de tus sueños sin sufrir el caos operativo; gestionamos cada detalle para que solo disfrutes el avance.",
    },
    {
      title: "Control Financiero Total",
      copy: "Di adiós a los anticipos a fondo perdido: aportas capital únicamente contra avances de obra reales, auditados y comprobados.",
    },
    {
      title: "Valor Patrimonial Garantizado",
      copy: "Protegemos tu inversión frente a la inflación y la mala ejecución con una garantía extendida y acabados de lujo que aseguran tu plusvalía.",
    },
  ],
  services: [
    {
      title: "01. Diseño + Construcción",
      description:
        "Servicio integral que abarca desde la conceptualización creativa hasta el último detalle de acabado.",
      features: [
        "Concepción Creativa: Arquitectura, diseño e interiorismo personalizados adaptados a las dinámicas de tu familia.",
        "Gestión Integral: Desde la conceptualización y permisos hasta el último detalle de acabado.",
        "Coordinación Única: Un solo punto de contacto responsable de todo el proyecto.",
      ],
    },
    {
      title: "02. Construcción",
      description:
        "Materialización de proyectos con control financiero total y máxima calidad.",
      features: [
        "Fidelidad al Proyecto: Materializamos los planos respetando al 100% la visión estética.",
        "Ingeniería de Valor: Optimización de procesos para garantizar la más alta calidad en acabados.",
        "Control Financiero Total: Presupuesto definitivo sin variaciones o flexible según volumen de obra.",
      ],
    },
    {
      title: "03. Interiorismo",
      description:
        "Transformamos espacios en experiencias sensoriales 100% personalizadas que reflejan tu estilo de vida. Nos involucramos con el alcance que tú decidas: desde el diseño integral de la estructura de muros hasta el último detalle decorativo, o solo en la etapa específica que tu proyecto requiera.",
      features: [
        "Diseño a tu Medida: Conceptualización integral y personalizada, adaptándonos al nivel de intervención que elijas.",
        "Selección Curada: Mobiliario, arte y accesorios de diseño exclusivo adaptados a cada rincón.",
        "Iluminación y Materialidad: Creación de atmósferas envolventes con texturas y acabados que elevan la percepción del lujo.",
      ],
    },
    {
      title: "04. Preventas",
      description:
        "Invierte con certeza en proyectos arquitectónicos de alta plusvalía antes de su conclusión.",
      features: [
        "Precios Especiales: Oportunidad de inversión con rendimientos superiores a la entrega.",
        "Personalización Temprana: Adapta detalles a tus preferencias en las etapas iniciales.",
        "Transparencia Financiera: Reportes de avance y esquemas de pago sumamente claros.",
      ],
    },
  ],
  warrantyAndValue: {
    title: "Inversión Protegida y Plusvalía",
    description:
      "Tu patrimonio exige resultados impecables. Operamos bajo procesos que te brindan absoluta certidumbre de costos y tiempos de entrega. Maximizamos la plusvalía de tu terreno y aseguramos que cada peso invertido se refleje en calidad superior, estatus y seguridad para los tuyos.",
    years: 5,
    benefits: [
      "Compromiso continuo: Nuestro compromiso no termina al entregarte las llaves. Seguiremos a tu lado con un servicio de mantenimiento dedicado, asegurándonos de que tu hogar se mantenga siempre impecable y disfrutes de total tranquilidad.",
    ],
  },
  contact: {
    sectionTitle: "Atención personalizada enfocada en superar tus expectativas",
    closingMessage:
      "Trato directo y ejecutivo: sin intermediarios ni desinformación, comunicación clara y resolutiva para tomar decisiones ágiles que respetan tu agenda.",
    phone: "+52 (81) 2025 3696",
    email: "atrevino@zerho.mx",
    contactPerson: "Arquitecta Ana | Gerente Comercial",
  },
};
