/**
 * Información extraída del proyecto residencial "Encinos 8"
 * San Pedro Garza García, Nuevo León
 * Firma: Arquitectos Asociados / Jorge Antonio López
 */

export interface Compromiso {
  id: string;
  titulo: string;
  descripcion: string;
}

export interface CaracterísticasPrincipales {
  ubicacionYFachada: string;
  frenteMetros: number;
  terrenoM2: number;
  construccionM2: number;
  niveles: number;
  recamaras: number;
  detallesRecamaras: string;
  banosCompletos: number;
  mediosBanos: number;
  albercaM2: number;
  jardinM2: number;
  estacionamientoLugares: number;
}

export interface EspecificacionConstructiva {
  categoria: string;
  items: {
    titulo: string;
    descripcion: string;
  }[];
}

export interface Contacto {
  firma: string;
  director: string;
  slogan: string;
  telefono: string;
  website: string;
  emailContacto: string;
  agenteContacto: string;
}

export interface PropiedadResidencial {
  nombre: string;
  ubicacion: string;
  precioMXN: number;
  website: string;
  compromiso: Compromiso[];
  caracteristicasPrincipales: CaracterísticasPrincipales;
  caracteristicasConstructivas: EspecificacionConstructiva[];
  garantia: {
    duracionAnos: number;
    descripcion: string;
  };
  mensajeBienvenida: string;
  contacto: Contacto;
  planos: {
    plantaBaja: string[];
    plantaAlta: string[];
  };
}

export const encinos8: PropiedadResidencial = {
  nombre: "Encinos 8",
  ubicacion: "San Pedro Garza García, Nuevo León, México",
  precioMXN: 67000000,
  website: "ARQUITECTOSASOCIADOS.MX",

  compromiso: [
    {
      id: "01",
      titulo: "Contratos a Precio Alzado",
      descripcion: "Certeza total de costos sin sorpresas financieras, costos ocultos ni incrementos."
    },
    {
      id: "02",
      titulo: "Aportaciones Programadas",
      descripcion: "Calendario de pagos transparente vinculado directamente al avance real de la obra."
    },
    {
      id: "03",
      titulo: "Comunicación Directa",
      descripcion: "Atención personal y transparente con el equipo directivo y técnico, sin triangulaciones."
    },
    {
      id: "04",
      titulo: "Diseñamos con visión a futuro",
      descripcion: "Espacios multifuncionales y centros de comando familiares que evolucionan con cada etapa de tu vida."
    },
    {
      id: "05",
      titulo: "Tu Tranquilidad como Prioridad",
      descripcion: "Asumimos la responsabilidad operativa completa para que disfrutes el proceso sin el estrés de la obra."
    }
  ],

  caracteristicasPrincipales: {
    ubicacionYFachada: "Fraccionamiento de máxima seguridad y prestigio en San Pedro, con imponente frente de 19.82 metros.",
    frenteMetros: 19.82,
    terrenoM2: 1067.37,
    construccionM2: 382.07,
    niveles: 2,
    recamaras: 4,
    detallesRecamaras: "4 amplias recámaras, todas con baño completo y vestidor.",
    banosCompletos: 5,
    mediosBanos: 3,
    albercaM2: 59.36,
    jardinM2: 387.74,
    estacionamientoLugares: 4
  },

  caracteristicasConstructivas: [
    {
      categoria: "Estructura y Acabados Exteriores",
      items: [
        {
          titulo: "Aislamiento térmico de alta eficiencia en losa",
          descripcion: "Losa de azotea integradas con poliestireno de alta densidad (3\"), garantizando un excelente confort de temperatura y ahorro energético todo el año."
        },
        {
          titulo: "Ventanería de alta gama y aislamiento acústico",
          descripcion: "Sistema de aluminio Eurovent de 3\" con cristales Duo-Vent, que brindan aislamiento térmico, control de ruido exterior y mayor seguridad."
        },
        {
          titulo: "Pisos de mármol elegante",
          descripcion: "Interiores revestidos con selecto mármol Santo Tomás o alguno nacional similar en precio, otorgando distinción, amplitud y durabilidad a cada área."
        }
      ]
    },
    {
      categoria: "Carpintería y Detalles Interiores",
      items: [
        {
          titulo: "Baños con acabados boutique",
          descripcion: "Regaderas terminadas en mármol Santo Tomás o similar nacional creando un ambiente sofisticado y de fácil mantenimiento."
        },
        {
          titulo: "Carpintería fina a la medida",
          descripcion: "Puertas monumentales de madera de Banack de 2.40 m de altura con elegante acabado en poliéster."
        },
        {
          titulo: "Roperías y vestidores de diseñador",
          descripcion: "Walk-in closets en madera de Banack hechos a la medida, organizados con cajoneras anchas (90 cm) y herrajes Blum con sistema de cierre perfecto."
        }
      ]
    }
  ],

  garantia: {
    duracionAnos: 10,
    descripcion: "Largo plazo para proteger tu patrimonio y asegurar plusvalía. Nuestro compromiso no termina al entregar las llaves."
  },

  mensajeBienvenida: "Entendemos que tu hogar es el activo más importante de tu patrimonio y el espacio donde tu familia construirá sus mejores recuerdos. Te ofrecemos residencias en preventa exclusiva respaldados por una absoluta certeza constructiva y financiera, acompañándote paso a paso para garantizar que el resultado final sea, sin excepciones, la casa que siempre soñaste.",

  contacto: {
    firma: "JORGE ANTONIO LÓPEZ - ARQUITECTOS ASOCIADOS",
    director: "Jorge Antonio López",
    slogan: "Construímos su legado, ustedes las historias",
    telefono: "+52 (81) 1965 8330",
    website: "arquitectosasociados.mx",
    emailContacto: "atrevino@arquitectosasociados.mx",
    agenteContacto: "Arq. Ana Treviño Gaona"
  },

  planos: {
    plantaBaja: [
      "Cochera (4 vehículos)",
      "Acceso / Recibidor",
      "1/2 Baño de visitas",
      "Biblioteca",
      "Sala Formal Doble Altura",
      "Área de Piano",
      "Comedor Formal",
      "Bar",
      "Antecomedor / Estancia Familiar",
      "Cocina y Alacena",
      "Lavandería",
      "Patio de Servicio",
      "Cuarto de Servicio con baño",
      "Terraza cubierta",
      "Jardín (387.74 m²)",
      "Alberca (59.36 m²)",
      "Jacuzzi",
      "Asoleadero",
      "Carril de Nado"
    ],
    plantaAlta: [
      "Recámara Principal con Baño Principal y doble Vestidor (Vestidor A / Vestidor B)",
      "Recámara #1 con Baño #1, Vestidor #1 y Balcón",
      "Recámara #2 con Baño #2 y Vestidor #2",
      "Recámara #3 con Baño #3, Vestidor #3 y Balcón",
      "Estancia",
      "Gaming Room",
      "Terraza exterior superior",
      "Vacío / Doble Altura sobre Sala Formal"
    ]
  }
};

export default encinos8;