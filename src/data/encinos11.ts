export interface PropertyFeature {
  category: string;
  items: string[];
}

export interface FinancialData {
  currency: string;
  totalPrice: number;
  deliveryTimeMonths: number;
  downPayment: number;
  downPaymentNote: string;
  balancePaymentTerms: string;
  conditions: string;
}

export interface PropertyData {
  title: string;
  architect: string;
  location: {
    fractionment: string;
    zone: string;
    city: string;
    lotNumber: string;
  };
  metrics: {
    landAreaSquareMeters: number;
    constructionAreaSquareMeters: number;
    floors: number;
    bedrooms: number;
    fullBathrooms: number;
    halfBathrooms: number;
    poolAreaSquareMeters: number;
    coveredParkingSpaces: number;
    frontageMeters: number;
    flatBackyardSquareMeters: number;
  };
  features: PropertyFeature[];
  constructionSpecs: string[];
  notes: {
    solarPanels: string;
    interiorDesign: string;
  };
  financials: FinancialData;
}

export const encinos11: PropertyData = {
  title: "Residencia Los Encinos de San Agustín 2",
  architect: "Jorge Antonio López Arquitectos Asociados (JAL)",
  location: {
    fractionment: "Los Encinos de San Agustín 2",
    zone: "Sierra de Arteaga",
    city: "San Pedro Garza García",
    lotNumber: "Lote 39"
  },
  metrics: {
    landAreaSquareMeters: 1308.762,
    constructionAreaSquareMeters: 1117.8072,
    floors: 2,
    bedrooms: 4,
    fullBathrooms: 7,
    halfBathrooms: 1,
    poolAreaSquareMeters: 87.26,
    coveredParkingSpaces: 6,
    frontageMeters: 19.242,
    flatBackyardSquareMeters: 455.83
  },
  features: [
    {
      category: "Ubicación y Entorno",
      items: [
        "Ubicado dentro de uno de los fraccionamientos más exclusivos y con mejor seguridad en San Pedro."
      ]
    },
    {
      category: "Distribución y Espacios",
      items: [
        "Residencia distribuida en 2 plantas con la máxima comodidad.",
        "4 recámaras con baño vestidor cada una.",
        "7 baños completos y 1 medio baño.",
        "Alberca de 87.26 m².",
        "Cochera techada para 6 autos.",
        "Patio posterior totalmente plano de 455.83 m² con 19.242 m de frente."
      ]
    },
    {
      category: "Climatización y Tecnología",
      items: [
        "Sistema central de climas marca Trane de alta eficiencia dividido por áreas.",
        "Sistema minisplit en áreas de poco uso.",
        "Preparación para paneles solares."
      ]
    }
  ],
  constructionSpecs: [
    "Losas de azotea aisladas con poliestireno de alta densidad de 3\"",
    "Ventanería con aluminio de la línea Eurovent 3\" con cristales duo-vent.",
    "Piso interior con mármol Santo Tomás o alguno nacional similar en precio y calidad.",
    "Regaderas con mármol Santo Tomás en muros y pisos o alguno nacional similar en precio y calidad.",
    "Puertas de madera de banack hechas a medida de 2.40 m de alto con acabado poliéster.",
    "Roperías de madera de banack con cajoneras hechas a medida de 90 cm de ancho y herrajes Blum cierre perfecto.",
    "Acabados de lujo en toda la casa.",
    "Terraza con asador y piscina adosadas al área social."
  ],
  notes: {
    solarPanels: "Los equipos de paneles solares no se incluyen en el presupuesto, serán cotizados por separado.",
    interiorDesign: "Proyecto de interiorismo no incluido, se cotizará por separado."
  },
  financials: {
    currency: "MXN",
    totalPrice: 78500000, // 78.5 millones de pesos
    deliveryTimeMonths: 20,
    downPayment: 43500000, // 43.5 millones de pesos
    downPaymentNote: "En este acto se escritura el terreno a nombre del comprador y se firma contrato para la construcción.",
    balancePaymentTerms: "El saldo se pagará en forma mensual el día 1º de cada mes sobre avance de obra.",
    conditions: "El tiempo y costo del proyecto es fijo, pero está sujeto a no realizar modificaciones al mismo, en caso de requerir cambios se fijará el tiempo y costo adicional."
  }
};