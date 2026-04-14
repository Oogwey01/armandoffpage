"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { TIERS, calculateSavings, type TierId } from "@/lib/tiers";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface ROICalculatorProps {
  open: boolean;
  initialTier?: TierId;
  onClose: () => void;
}

// Formato MXN sin decimales
function formatMXN(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ROICalculator({
  open,
  initialTier = "autoridad",
  onClose,
}: ROICalculatorProps) {
  const [tier, setTier] = useState<TierId>(initialTier);
  const [adsSpend, setAdsSpend] = useState<number>(30000);

  // Sincroniza el tier si el modal se reabre con otro tier inicial
  useEffect(() => {
    if (open) setTier(initialTier);
  }, [open, initialTier]);

  // Bloqueo de scroll + ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const selected = TIERS.find((t) => t.id === tier)!;
  const result = useMemo(() => calculateSavings(adsSpend, tier), [adsSpend, tier]);

  // Barras de comparación — normalizadas al valor más grande
  const maxBar = Math.max(selected.diyCost, selected.priceValue);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Calculadora de ROI"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-brand-black/85 backdrop-blur-md p-0 md:p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: ANIMATION_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto bg-brand-gray border border-brand-beige/30 rounded-t-2xl md:rounded-2xl p-6 md:p-8"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar calculadora"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-black/60 border border-white/10 text-white/70 hover:text-white hover:border-brand-beige/50 transition-colors flex items-center justify-center"
            >
              ✕
            </button>

            {/* Header */}
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-2">
              Calculadora de ROI
            </p>
            <h3 className="font-barlow font-black text-2xl md:text-3xl uppercase text-white leading-tight mb-6">
              Cuánto ahorras vs producir solo
            </h3>

            {/* Selector de tier */}
            <div className="flex gap-2 mb-6">
              {TIERS.map((t) => {
                const active = t.id === tier;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id)}
                    className={`flex-1 py-2.5 rounded-lg font-barlow font-bold text-[11px] tracking-widest uppercase transition-all ${
                      active
                        ? "bg-brand-beige text-brand-black"
                        : "bg-brand-black/50 text-white/60 border border-white/10 hover:border-brand-beige/40 hover:text-white"
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>

            {/* Slider */}
            <label className="block mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-montserrat text-xs uppercase tracking-widest text-gray-400">
                  Inversión mensual en ads
                </span>
                <span className="font-barlow font-black text-lg text-brand-beige">
                  {formatMXN(adsSpend)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={150000}
                step={1000}
                value={adsSpend}
                onChange={(e) => setAdsSpend(Number(e.target.value))}
                aria-label="Inversión mensual en ads"
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-brand-black/60 accent-brand-beige [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-beige [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(200,157,105,0.25)] [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-1 font-montserrat text-[10px] text-gray-500">
                <span>$5K</span>
                <span>$150K</span>
              </div>
            </label>

            {/* Gráfica de comparación */}
            <div className="space-y-3 mb-6">
              <div>
                <div className="flex justify-between font-montserrat text-xs text-gray-300 mb-1.5">
                  <span>Producirlo solo</span>
                  <span className="font-bold text-red-400">
                    {formatMXN(selected.diyCost)}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-brand-black/60 overflow-hidden">
                  <motion.div
                    key={`diy-${tier}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(selected.diyCost / maxBar) * 100}%` }}
                    transition={{ duration: 0.8, ease: ANIMATION_EASE }}
                    className="h-full bg-gradient-to-r from-red-500/60 to-red-400"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-montserrat text-xs text-gray-300 mb-1.5">
                  <span>Con ArmandoFF ({selected.name})</span>
                  <span className="font-bold text-brand-beige">
                    {formatMXN(selected.priceValue)}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-brand-black/60 overflow-hidden">
                  <motion.div
                    key={`us-${tier}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(selected.priceValue / maxBar) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: ANIMATION_EASE }}
                    className="h-full bg-gradient-to-r from-brand-beige-dark to-brand-beige"
                  />
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-brand-black/40 p-4 text-center">
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                  Ahorro mensual
                </p>
                <p className="font-barlow font-black text-xl md:text-2xl text-green-400 leading-none">
                  {formatMXN(result.monthlySavings)}
                </p>
              </div>
              <div className="rounded-xl border border-brand-beige/40 bg-brand-beige/5 p-4 text-center">
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-brand-beige mb-1">
                  Ahorro anual
                </p>
                <p className="font-barlow font-black text-xl md:text-2xl text-brand-beige leading-none">
                  {formatMXN(result.annualSavings)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-brand-black/40 p-4 text-center">
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                  ROI
                </p>
                <p className="font-barlow font-black text-xl md:text-2xl text-white leading-none">
                  {Math.round(result.roi)}%
                </p>
              </div>
            </div>

            <p className="mt-4 font-montserrat text-[11px] text-gray-500 italic text-center">
              * Estimación conservadora. Proyección basada en costos de mercado
              en Hermosillo y benchmarks de ROAS 3x.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
