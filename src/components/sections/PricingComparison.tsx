"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { TIERS, type Tier, type TierId } from "@/lib/tiers";
import { TierCard } from "@/components/contenido/TierCard";
import { ROICalculator } from "@/components/ui/ROICalculator";
import { ANIMATION_EASE } from "@/lib/animations/variants";

type ViewMode = "cards" | "table";

interface PricingComparisonProps {
  onCta: () => void;
}

// Feature destacada con tooltip
interface PopularFeature {
  title: string;
  description: string;
  tooltip: string;
  icon: ReactNode;
}

const POPULAR_FEATURES: PopularFeature[] = [
  {
    title: "Derechos totales",
    description: "Uso libre en todos los canales",
    tooltip:
      "Cesión completa de derechos de uso — puedes usar el contenido en Meta, TikTok, Google, email y cualquier otro canal sin costo adicional.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Brief estratégico",
    description: "Criterio de paid media incluido",
    tooltip:
      "Cada mes recibes un brief creativo con la estrategia detrás — para qué audiencia, qué dolor resuelve, qué métrica busca mover.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M4 4h12l4 4v12H4V4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M16 4v4h4M8 12h8M8 16h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Sin permanencia",
    description: "Cancela cuando quieras",
    tooltip:
      "Sin contratos anuales ni penalización por cancelar. Si no te funciona, no tienes por qué quedarte.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// Filas de la tabla agrupadas por categoría
const COMPARISON_ROWS: Array<{
  category: string;
  rows: Array<{ label: string; values: (string | boolean)[] }>;
}> = [
  {
    category: "Imágenes",
    rows: [
      { label: "Composiciones visuales avanzadas", values: ["6", "14", "28"] },
    ],
  },
  {
    category: "Videos",
    rows: [
      { label: "Videos UGC con dirección creativa", values: ["3", "6", "12"] },
      { label: "Videos de alta producción", values: ["1", "2", "4"] },
    ],
  },
  {
    category: "Estrategia & extras",
    rows: [
      { label: "Brief creativo mensual", values: [true, true, true] },
      { label: "Contenido en crudo entregable", values: [true, true, true] },
      { label: "Derechos de uso completos", values: [true, true, true] },
      { label: "Dirección creativa dedicada", values: [false, true, true] },
      { label: "Reporte de performance mensual", values: [false, false, true] },
    ],
  },
];

function FeatureCheck({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-beige/15 text-brand-beige">
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return <span className="text-white/20 text-lg">—</span>;
  }
  return (
    <span className="font-bebas font-black text-brand-beige text-xl">{value}</span>
  );
}

// Tooltip simple sobre hover/focus
function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label="Más información"
        className="w-4 h-4 rounded-full border border-white/30 text-[10px] text-white/60 hover:text-brand-beige hover:border-brand-beige flex items-center justify-center"
      >
        i
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-lg bg-brand-black border border-brand-beige/40 px-3 py-2 font-bebas text-[11px] text-white/90 leading-snug z-20 shadow-xl tracking-wide"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ComparisonTable({
  onCta,
  onOpenROI,
}: {
  onCta: () => void;
  onOpenROI: (tier: TierId) => void;
}) {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-brand-black/40">
      <table className="w-full min-w-[640px]">
        <thead className="sticky top-0 z-10 bg-brand-black/95 backdrop-blur-md">
          <tr>
            <th className="text-left p-4 md:p-6 font-bebas text-xs uppercase tracking-widest text-gray-400 font-bold">
              Característica
            </th>
            {TIERS.map((t, i) => {
              const isHovered = hoveredCol === i;
              return (
                <th
                  key={t.id}
                  onMouseEnter={() => setHoveredCol(i)}
                  onMouseLeave={() => setHoveredCol(null)}
                  className={`p-4 md:p-6 text-center transition-colors ${
                    t.highlight ? "bg-brand-beige/5" : ""
                  } ${isHovered ? "bg-brand-beige/10" : ""}`}
                >
                  <p className="font-bebas text-[10px] uppercase tracking-widest text-brand-beige mb-1">
                    Tier {t.number}
                  </p>
                  <p className="font-bebas font-black text-lg md:text-xl text-white tracking-wide">
                    {t.name}
                  </p>
                  <p className="font-bebas font-black text-2xl text-brand-beige mt-1">
                    {t.price}
                  </p>
                  <p className="font-bebas text-[10px] text-gray-400 tracking-wide">MXN/mes</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((group) => (
            <CategoryGroup
              key={group.category}
              category={group.category}
              rows={group.rows}
              hoveredCol={hoveredCol}
              setHoveredCol={setHoveredCol}
            />
          ))}
          {/* Fila CTA */}
          <tr>
            <td />
            {TIERS.map((t, i) => {
              const isHovered = hoveredCol === i;
              return (
                <td
                  key={t.id}
                  onMouseEnter={() => setHoveredCol(i)}
                  onMouseLeave={() => setHoveredCol(null)}
                  className={`p-4 md:p-6 text-center transition-colors ${
                    t.highlight ? "bg-brand-beige/5" : ""
                  } ${isHovered ? "bg-brand-beige/10" : ""}`}
                >
                  <button
                    type="button"
                    onClick={onCta}
                    className="w-full bg-brand-beige text-brand-black font-bebas font-bold text-xs uppercase tracking-wide py-2.5 rounded-full hover:bg-brand-beige-light hover:scale-[1.02] transition-all"
                  >
                    {t.ctaLabel} →
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenROI(t.id)}
                    className="mt-2 font-bebas text-[11px] text-brand-beige/80 hover:text-brand-beige underline-offset-4 hover:underline tracking-wide"
                  >
                    Ver ahorro →
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CategoryGroup({
  category,
  rows,
  hoveredCol,
  setHoveredCol,
}: {
  category: string;
  rows: Array<{ label: string; values: (string | boolean)[] }>;
  hoveredCol: number | null;
  setHoveredCol: (i: number | null) => void;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={TIERS.length + 1}
          className="px-4 md:px-6 pt-6 pb-2 font-bebas font-bold text-[11px] tracking-[0.3em] uppercase text-brand-beige"
        >
          {category}
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={row.label} className="border-t border-white/5">
          <td className="px-4 md:px-6 py-3 font-bebas text-sm text-gray-300 tracking-wide">
            {row.label}
          </td>
          {row.values.map((v, i) => {
            const isHovered = hoveredCol === i;
            const tier = TIERS[i];
            return (
              <td
                key={i}
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
                className={`px-4 md:px-6 py-3 text-center transition-colors ${
                  tier.highlight ? "bg-brand-beige/5" : ""
                } ${isHovered ? "bg-brand-beige/10" : ""}`}
              >
                <FeatureCheck value={v} />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export function PricingComparison({ onCta }: PricingComparisonProps) {
  const [view, setView] = useState<ViewMode>("cards");
  const [activeTier, setActiveTier] = useState<number>(1);
  const [roiOpen, setRoiOpen] = useState(false);
  const [roiTier, setRoiTier] = useState<TierId>("autoridad");

  const openROI = (tier: TierId) => {
    setRoiTier(tier);
    setRoiOpen(true);
  };

  return (
    <section
      id="paquetes"
      aria-label="Elige tu nivel"
      className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:py-24 bg-brand-gray overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url('/images/backgrounds/7.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-brand-black/30" />
      </div>
      <div className="relative z-10 container-custom">
        {/* Header */}
        <p className="font-bebas font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4 md:mb-6">
          Elige tu nivel
        </p>
        <p className="font-bebas text-sm md:text-base text-gray-400 font-light text-center max-w-2xl mx-auto mb-8 tracking-wide">
          Todo listo para paid media y orgánico. Derechos de uso incluidos en
          todos los paquetes.
        </p>

        {/* Popular features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10">
          {POPULAR_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: ANIMATION_EASE,
              }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-brand-black/40 p-3"
            >
              <span className="text-brand-beige shrink-0">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-dafoe text-2xl text-white leading-[1.05]">
                    {f.title}
                  </p>
                  <InfoTooltip text={f.tooltip} />
                </div>
                <p className="font-bebas text-xs text-gray-400 leading-snug tracking-wide">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toggle view */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Vista de precios"
            className="inline-flex gap-1 p-1 rounded-full bg-brand-black/60 border border-white/10"
          >
            {(["cards", "table"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={view === mode}
                onClick={() => setView(mode)}
                className={`px-5 py-2 rounded-full font-bebas font-bold text-[11px] tracking-widest uppercase transition-all ${
                  view === mode
                    ? "bg-brand-beige text-brand-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {mode === "cards" ? "Cards" : "Comparar tabla"}
              </button>
            ))}
          </div>
        </div>

        {/* View content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: ANIMATION_EASE }}
          >
            {view === "cards" ? (
              <CardsView
                activeTier={activeTier}
                setActiveTier={setActiveTier}
                onCta={onCta}
                onOpenROI={openROI}
              />
            ) : (
              <ComparisonTable onCta={onCta} onOpenROI={openROI} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* WhatsApp CTA */}
        <div className="flex justify-center mt-12 md:mt-16">
          <a
            href="https://wa.me/526621000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bebas font-bold text-base uppercase tracking-wide px-10 sm:px-16 py-4 rounded-xl hover:bg-[#20bd5a] hover:scale-[1.02] transition-all"
            style={{
              boxShadow:
                "0 0 20px rgba(37,211,102,0.3), 0 0 50px rgba(37,211,102,0.15)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <ROICalculator
        open={roiOpen}
        initialTier={roiTier}
        onClose={() => setRoiOpen(false)}
      />
    </section>
  );
}

function CardsView({
  activeTier,
  setActiveTier,
  onCta,
  onOpenROI,
}: {
  activeTier: number;
  setActiveTier: (i: number) => void;
  onCta: () => void;
  onOpenROI: (tier: TierId) => void;
}) {
  return (
    <>
      {/* Mobile: tabs + single card */}
      <div className="md:hidden max-w-md mx-auto">
        <div role="tablist" className="flex gap-px">
          {TIERS.map((t: Tier, i: number) => {
            const active = i === activeTier;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTier(i)}
                className={`flex-1 py-3 font-bebas font-bold text-[11px] uppercase tracking-wider transition-colors ${
                  active
                    ? "bg-brand-black text-white border-t-2 border-x border-brand-beige rounded-t-xl"
                    : "bg-brand-gray/60 text-white/40 border-t-2 border-transparent hover:text-white/70"
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
        <TierCard
          key={TIERS[activeTier].id}
          tier={TIERS[activeTier]}
          flatTop
          showRibbon={false}
          onCta={onCta}
          onOpenROI={onOpenROI}
        />
      </div>

      {/* Desktop: 3 cards side by side */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-6">
        {TIERS.map((t: Tier) => (
          <TierCard
            key={t.id}
            tier={t}
            onCta={onCta}
            onOpenROI={onOpenROI}
          />
        ))}
      </div>
    </>
  );
}
