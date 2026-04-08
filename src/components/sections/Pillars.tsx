"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/constants";
import {
  StrategyIcon,
  MarketingIcon,
  ScaleIcon,
  MindsetIcon,
} from "@/components/common/Icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  strategy: StrategyIcon,
  marketing: MarketingIcon,
  scale: ScaleIcon,
  mindset: MindsetIcon,
};

interface PillarsProps {
  onOpenForm: () => void;
}

export default function Pillars({ onOpenForm }: PillarsProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pilares" className="section-padding bg-brand-black">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center">
          <h2 className="heading-lg text-center text-white">
            NUESTROS PILARES
          </h2>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4 mb-12" />
        </div>

        {/* Pillars grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-6 rounded-xl text-center transition-all duration-300 hover:bg-brand-beige/10"
              >
                {Icon && (
                  <Icon className="text-brand-beige w-12 h-12 mx-auto" />
                )}
                <h3 className="heading-md text-white mt-4 mb-3">
                  {pillar.title}
                </h3>
                <p className="body-text text-sm">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Para quién es y no es ── */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
            {/* Sí es para ti */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
              <p className="font-barlow font-bold text-lg text-green-400 mb-4">Sí es para ti si...</p>
              <ul className="font-montserrat text-sm text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>
                  Tienes producto físico con ventas
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>
                  Quieres vender en internet sin aprender cada plataforma
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>
                  Facturas +$50K/mes y quieres duplicar
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>
                  Tienes presupuesto para ads
                </li>
              </ul>
            </div>

            {/* VS */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="font-barlow font-bold text-sm text-white/50">vs</span>
              </div>
            </div>

            {/* No es para ti */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <p className="font-barlow font-bold text-lg text-red-400 mb-4">No es para ti si...</p>
              <ul className="font-montserrat text-sm text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                  Empiezas desde cero sin producto
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                  Quieres resultados en una semana
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                  No tienes presupuesto para ads
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                  Buscas solo reportes de números
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Formulario de calificación ── */}
        <div className="mt-10 md:mt-28 text-center max-w-3xl mx-auto">
          <p className="font-montserrat text-sm md:text-base text-gray-400 font-light leading-relaxed mb-8">
            El mismo sistema que generó $5M+ en Meta y $30M+ en ML ahora trabaja para tu negocio. Llena el formulario en 2 minutos.
          </p>
          <p className="font-montserrat text-xs text-gray-500 mb-6">
            &ldquo;Solo aceptamos negocios que califican. Si tu perfil encaja te contactamos en 24 horas.&rdquo;
          </p>
          <button
            onClick={onOpenForm}
            className="w-full sm:w-auto bg-brand-beige text-brand-black font-barlow font-bold text-lg px-10 py-4 rounded-xl hover:bg-brand-beige-light hover:scale-[1.01] transition-all"
          >
            Llenar formulario →
          </button>
        </div>
      </div>
    </section>
  );
}
