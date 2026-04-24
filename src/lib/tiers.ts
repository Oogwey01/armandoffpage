export type TierId = "presencia" | "autoridad" | "dominacion";

export type AdPlatform = "meta" | "instagram" | "google" | "tiktok";

export interface TierFeature {
  text: string;
  // Categoría — mapea el ícono a mostrar
  category: "image" | "video" | "strategy" | "raw" | "ads";
  // Plataformas — reemplaza el ícono por los logos correspondientes
  platforms?: AdPlatform[];
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
  ads: TierFeature[];
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
        text: "9 composiciones visuales avanzadas listas para ads o feed",
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
    ads: [
      {
        text: "Gestión de Meta Ads (Facebook + Instagram)",
        category: "ads",
        platforms: ["meta", "instagram"],
      },
      {
        text: "Setup de campañas, creativos y optimización semanal",
        category: "ads",
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
    imageCount: 21,
    videoCount: 8,
    images: [
      {
        text: "21 composiciones visuales avanzadas listas para ads o feed",
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
    ads: [
      {
        text: "Gestión de Meta Ads (Facebook + Instagram)",
        category: "ads",
        platforms: ["meta", "instagram"],
      },
      {
        text: "Gestión de Google Ads (Search + Performance Max)",
        category: "ads",
        platforms: ["google"],
      },
      {
        text: "Setup, creativos y optimización semanal en ambos canales",
        category: "ads",
      },
      {
        text: "Dirección de pauta integrada con el brief creativo",
        category: "ads",
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
    imageCount: 42,
    videoCount: 16,
    images: [
      {
        text: "42 composiciones visuales avanzadas listas para ads o feed",
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
    ads: [
      {
        text: "Gestión de Meta Ads (Facebook + Instagram)",
        category: "ads",
        platforms: ["meta", "instagram"],
      },
      {
        text: "Gestión de Google Ads (Search + Performance Max)",
        category: "ads",
        platforms: ["google"],
      },
      {
        text: "Gestión de TikTok Ads con creativos nativos",
        category: "ads",
        platforms: ["tiktok"],
      },
      {
        text: "Retargeting y display programático cross-canal",
        category: "ads",
      },
      {
        text: "Optimización semanal en todos los canales",
        category: "ads",
      },
      {
        text: "Dirección de pauta integrada con el brief creativo",
        category: "ads",
      },
      {
        text: "Reporte de performance mensual con acciones",
        category: "ads",
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
