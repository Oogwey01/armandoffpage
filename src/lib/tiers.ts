export type TierId = "presencia" | "autoridad" | "dominacion";

export interface TierFeature {
  text: string;
  // Categoría — mapea el ícono a mostrar
  category: "image" | "video" | "strategy" | "raw";
}

export interface Tier {
  id: TierId;
  number: "01" | "02" | "03";
  name: string;
  price: string;
  // Precio numérico para cálculos del ROI calculator
  priceValue: number;
  // Costo DIY estimado mensual para el ROI calculator
  diyCost: number;
  totalPieces: string;
  imageCount: number;
  videoCount: number;
  images: TierFeature[];
  videos: TierFeature[];
  extras: TierFeature[];
  highlight?: boolean;
  // Texto del CTA diferenciado por tier
  ctaLabel: string;
}

export const TIERS: Tier[] = [
  {
    id: "presencia",
    number: "01",
    name: "PRESENCIA",
    price: "$9,900",
    priceValue: 9900,
    diyCost: 15000,
    totalPieces: "10 piezas de contenido profesional al mes",
    imageCount: 6,
    videoCount: 4,
    images: [
      {
        text: "6 composiciones visuales avanzadas listas para ads o feed",
        category: "image",
      },
    ],
    videos: [
      {
        text: "3 videos UGC con dirección creativa listos para publicar",
        category: "video",
      },
      {
        text: "1 video de alta producción con modelo y locación",
        category: "video",
      },
    ],
    extras: [
      {
        text: "Brief creativo mensual con la estrategia detrás incluido",
        category: "strategy",
      },
      { text: "Contenido en crudo", category: "raw" },
    ],
    ctaLabel: "Comenzar con Presencia",
  },
  {
    id: "autoridad",
    number: "02",
    name: "AUTORIDAD",
    price: "$18,900",
    priceValue: 18900,
    diyCost: 33000,
    totalPieces: "22 piezas de contenido profesional al mes",
    imageCount: 14,
    videoCount: 8,
    images: [
      {
        text: "14 composiciones visuales avanzadas listas para ads o feed",
        category: "image",
      },
    ],
    videos: [
      {
        text: "6 videos UGC con dirección creativa listos para publicar",
        category: "video",
      },
      {
        text: "2 videos de alta producción con modelo y locación",
        category: "video",
      },
    ],
    extras: [
      {
        text: "Brief creativo mensual con la estrategia detrás incluido",
        category: "strategy",
      },
      { text: "Contenido en crudo", category: "raw" },
    ],
    highlight: true,
    ctaLabel: "Elevar mi Marca",
  },
  {
    id: "dominacion",
    number: "03",
    name: "DOMINACIÓN",
    price: "$34,900",
    priceValue: 34900,
    diyCost: 66000,
    totalPieces: "44 piezas de contenido profesional al mes",
    imageCount: 28,
    videoCount: 16,
    images: [
      {
        text: "28 composiciones visuales avanzadas listas para ads o feed",
        category: "image",
      },
    ],
    videos: [
      {
        text: "12 videos UGC con dirección creativa listos para publicar",
        category: "video",
      },
      {
        text: "4 videos de alta producción con modelo y locación",
        category: "video",
      },
    ],
    extras: [
      {
        text: "Brief creativo mensual con la estrategia detrás incluido",
        category: "strategy",
      },
      { text: "Contenido en crudo", category: "raw" },
    ],
    ctaLabel: "Dominar mi Mercado",
  },
];

// Cálculo de ahorro vs producir internamente
export interface SavingsResult {
  monthlySavings: number;
  annualSavings: number;
  roi: number;
  projectedRevenue: number;
}

export function calculateSavings(adsSpend: number, tier: TierId): SavingsResult {
  const selected = TIERS.find((t) => t.id === tier);
  if (!selected) {
    return { monthlySavings: 0, annualSavings: 0, roi: 0, projectedRevenue: 0 };
  }

  const monthlySavings = selected.diyCost - selected.priceValue;
  const annualSavings = monthlySavings * 12;
  const roi = (monthlySavings / selected.priceValue) * 100;
  // Proyección conservadora: ROAS 3x sobre el ad spend
  const projectedRevenue = adsSpend * 3;

  return { monthlySavings, annualSavings, roi, projectedRevenue };
}
