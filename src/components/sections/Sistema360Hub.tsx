"use client";

import { motion } from "framer-motion";
import { SISTEMA_360_AXES } from "@/lib/constants";
import {
  MarketingIcon,
  StrategyIcon,
  ScaleIcon,
} from "@/components/common/Icons";
import type { Sistema360Axis } from "@/lib/types";

const ICON_MAP: Record<Sistema360Axis["icon"], React.ComponentType<{ className?: string }>> = {
  marketing: MarketingIcon,
  strategy: StrategyIcon,
  scale: ScaleIcon,
};

export function Sistema360Hub() {
  return (
    <section
      id="ejes"
      className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      {/* Fondo: orb sutil + dot pattern */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "700px",
            height: "500px",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse, rgba(200,157,105,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.05) 1px, transparent 0)",
            backgroundSize: "36px 36px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 container-custom">
        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-brand-beige flex-none" />
          <p className="font-montserrat text-white text-xs uppercase tracking-[0.3em]">
            Los 3 ejes del sistema
          </p>
          <span className="h-px w-8 bg-brand-beige flex-none" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-tight text-white text-center max-w-4xl mx-auto mb-4"
        >
          UN SISTEMA, <span className="text-brand-beige">TRES PIEZAS</span> QUE
          SE POTENCIAN.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-montserrat text-gray-400 text-center text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto font-light tracking-wide"
        >
          Arranca por la pieza más urgente. Cada eje funciona solo, pero juntos
          te dan un escalado real y sostenible.
        </motion.p>

        {/* Grid de 3 ejes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {SISTEMA_360_AXES.map((axis, index) => {
            const Icon = ICON_MAP[axis.icon];
            return (
              <motion.div
                key={axis.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col bg-brand-black/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-7 hover:border-brand-beige/40 transition-colors duration-300 overflow-hidden"
              >
                {/* Numerito de fondo */}
                <span
                  aria-hidden="true"
                  className="font-akira absolute -top-3 -right-2 text-[120px] sm:text-[140px] text-brand-beige/[0.05] leading-none select-none pointer-events-none"
                >
                  {axis.number}
                </span>

                {/* Icono + número badge */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-beige/10 border border-brand-beige/20 text-brand-beige">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase text-brand-beige/70">
                    {axis.number}
                  </span>
                </div>

                {/* Eyebrow + título */}
                <p className="relative z-10 font-montserrat font-bold text-[11px] tracking-[0.25em] uppercase text-brand-beige mb-3">
                  {axis.eyebrow}
                </p>
                <h3 className="relative z-10 font-barlow font-black text-2xl sm:text-3xl uppercase leading-tight tracking-tight text-white mb-5">
                  {axis.title}
                </h3>

                {/* Bullets */}
                <ul className="relative z-10 space-y-3 mb-6 flex-1">
                  {axis.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 font-montserrat text-sm text-gray-300 font-light leading-relaxed"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-beige/15 border border-brand-beige/30 text-brand-beige shrink-0 mt-0.5">
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
                      <span className="flex-1">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Stat */}
                <div className="relative z-10 border-t border-white/10 pt-5 mb-5">
                  <p className="font-barlow font-black text-3xl sm:text-4xl text-brand-beige leading-none mb-1">
                    {axis.stat.value}
                  </p>
                  <p className="font-montserrat text-xs text-gray-400 font-light tracking-wide">
                    {axis.stat.label}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={axis.cta.href}
                  className="relative z-10 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-beige text-brand-beige font-bold uppercase text-xs sm:text-sm tracking-widest px-5 py-3 hover:bg-brand-beige hover:text-brand-black transition-colors duration-200"
                >
                  <span>{axis.cta.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
