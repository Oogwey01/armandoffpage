import { z } from "zod";

// ---------------------------------------------------------------------------
// Multiple-choice option strings (shared between form UI and Shopify mapping)
// ---------------------------------------------------------------------------

export const CANAL_VENTA_OPTIONS = [
  "Aún no he empezado a vender / apenas estoy lanzando",
  "Vendo solo por redes sociales o WhatsApp (sin tienda en línea)",
  "Tengo tienda en internet pero las ventas son inconsistentes",
  "Tengo tienda en internet y vendo bien, pero quiero vender más",
] as const;

export const PRESENCIA_MARCA_OPTIONS = [
  "Aún no tengo identidad visual definida",
  "Tengo logo y colores, pero siento que le falta más",
  "Mi marca se ve decente, aunque no destaca de la competencia",
  "Mi marca ya se ve profesional y la gente la reconoce",
] as const;

export const INVERSION_ADS_OPTIONS = [
  "Menos de $5,000/mes",
  "Entre $5,000 y $10,000/mes",
  "Entre $10,000 y $25,000/mes",
  "Más de $25,000/mes",
] as const;

export const URGENCIA_RESULTADOS_OPTIONS = [
  "Para ya, lo necesito este mes",
  "Me gustaría ver algo en 2 o 3 meses",
  "En los próximos 6 meses",
  "No tengo prisa, estoy explorando",
] as const;

// Qualifying threshold: C and D ($10K+/month in ads)
export const QUALIFIED_ADS_INVESTMENT = new Set<string>([
  INVERSION_ADS_OPTIONS[2],
  INVERSION_ADS_OPTIONS[3],
]);

// Ads investment → revenue tier label (reused legacy categories)
export const ADS_CATEGORY_MAP: Record<string, string> = {
  [INVERSION_ADS_OPTIONS[0]]: "Comunes",
  [INVERSION_ADS_OPTIONS[1]]: "Normales",
  [INVERSION_ADS_OPTIONS[2]]: "Arriba del promedio",
  [INVERSION_ADS_OPTIONS[3]]: "Leyendas",
};

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

export const formSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  nombreNegocio: z.string().min(2, "Mínimo 2 caracteres"),
  productoServicio: z.string().min(2, "Mínimo 2 caracteres"),
  canalVentaActual: z.string().min(1, "Selecciona una opción"),
  presenciaMarca: z.string().min(1, "Selecciona una opción"),
  inversionAds: z.string().min(1, "Selecciona una opción"),
  urgenciaResultados: z.string().min(1, "Selecciona una opción"),
  whatsapp: z
    .string()
    .min(8, "Teléfono inválido")
    .regex(/^[+]?[\d\s()-]+$/, "Formato de teléfono inválido"),
});

export type FormData = z.infer<typeof formSchema>;

// Field names per step for targeted validation
export const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
  1: ["nombre", "nombreNegocio"],
  2: ["productoServicio"],
  3: ["canalVentaActual"],
  4: ["presenciaMarca"],
  5: ["inversionAds"],
  6: ["urgenciaResultados"],
  7: ["whatsapp"],
};
