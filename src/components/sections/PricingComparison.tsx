"use client";

import { motion } from "framer-motion";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface PricingComparisonProps {
  onOpenForm: () => void;
}

const INCLUDED_SERVICES: string[] = [
  "Dirección creativa estratégica",
  "UGC con dirección creativa",
  "Producciones con modelo y locación",
  "Imágenes profesionales para feed y ads",
  "Videos editados con criterio de pauta",
  "Diseño gráfico integrado",
  "Gestión de pauta (Meta · Google · TikTok)",
  "Brief estratégico mensual",
  "Reporte de performance",
  "Derechos totales del contenido",
];

export function PricingComparison({ onOpenForm }: PricingComparisonProps) {
  return (
    <section
      id="paquetes"
      aria-label="Plan a la medida"
      className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:py-24 overflow-hidden"
    >
      <div className="relative z-10 container-custom">
        {/* Header */}
        <p className="font-montserrat font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4 md:mb-6">
          El plan
        </p>

        <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-tight text-white text-center max-w-4xl mx-auto mb-5">
          UN SOLO PLAN, HECHO{" "}
          <span className="text-brand-beige">A TU MEDIDA.</span>
        </h2>

        <p className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center max-w-2xl mx-auto mb-12 md:mb-14 tracking-wide">
          Cada propuesta se diseña según el momento, los objetivos y el
          presupuesto de tu marca. Sin paquetes enlatados.
        </p>

        {/* Card unificada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ANIMATION_EASE }}
          className="relative max-w-4xl mx-auto bg-brand-black/50 backdrop-blur-sm rounded-2xl border border-brand-beige/30 p-6 sm:p-10 md:p-12 overflow-hidden"
        >
          {/* Glow decorativo */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(200,157,105,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Badge */}
          <div className="relative z-10 flex justify-center mb-6">
            <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase bg-brand-beige text-brand-black px-4 py-2 rounded-full">
              Plan a la medida
            </span>
          </div>

          {/* Pitch */}
          <p className="relative z-10 font-montserrat text-base md:text-lg text-gray-300 font-light text-center max-w-xl mx-auto mb-10 tracking-wide leading-relaxed">
            No vendemos paquetes pre-armados. Después de un diagnóstico
            corto, armamos la propuesta exacta que tu marca necesita para
            crecer este trimestre.
          </p>

          {/* Lista de servicios — 2 columnas en desktop */}
          <div className="relative z-10 mb-10">
            <p className="font-montserrat font-bold text-[11px] tracking-[0.3em] uppercase text-brand-beige text-center mb-6">
              Lo que se puede incluir
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl mx-auto">
              {INCLUDED_SERVICES.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: ANIMATION_EASE,
                  }}
                  className="flex items-start gap-3 font-montserrat text-sm text-gray-200 font-light tracking-wide"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-beige/15 border border-brand-beige/40 text-brand-beige shrink-0 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3 h-3"
                    >
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="flex-1 leading-snug">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <motion.button
              type="button"
              onClick={onOpenForm}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 36px 6px rgba(200,157,105,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: ANIMATION_EASE }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-beige px-10 sm:px-14 py-4 font-barlow text-sm font-bold uppercase tracking-widest text-brand-black [will-change:transform]"
            >
              <span>Agendar diagnóstico</span>
              <span aria-hidden="true">→</span>
            </motion.button>
            <p className="font-montserrat text-[11px] text-gray-500 font-light tracking-[0.2em] uppercase">
              Sin permanencia · Cancela cuando quieras
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
