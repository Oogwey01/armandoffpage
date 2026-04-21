"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations";

const PILLARS = [
  {
    number: "01",
    badge: "PIPELINE",
    title: "Gestión de Ventas",
    description:
      "Visualiza cada lead desde el primer contacto hasta el cierre. Sin perder seguimientos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="5" height="16" rx="1" />
        <rect x="10" y="4" width="5" height="10" rx="1" />
        <rect x="17" y="4" width="4" height="6" rx="1" />
      </svg>
    ),
  },
  {
    number: "02",
    badge: "AUTOMATIZACIÓN",
    title: "Flujos que Trabajan Solos",
    description:
      "Recuperación de carritos, follow-ups y alertas sin intervención manual.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    number: "03",
    badge: "DASHBOARDS",
    title: "Datos que Accionas",
    description:
      "KPIs en tiempo real para saber exactamente dónde invertir el siguiente esfuerzo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 6-7" />
      </svg>
    ),
  },
] as const;

export function CRMIntro() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
      <div className="container-custom">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-[#8f0000] flex-none" />
          <p className="font-montserrat text-white text-xs uppercase tracking-[0.3em]">
            Qué construimos
          </p>
          <span className="h-px w-8 bg-[#8f0000] flex-none" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white text-center mb-4"
        >
          3 PILARES.{" "}
          <span className="text-brand-beige">UN SISTEMA A TU MEDIDA.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center mb-12 md:mb-14 max-w-2xl mx-auto"
        >
          Cada CRM que construimos se arma sobre los tres pilares que aseguran
          que la herramienta realmente se use en tu operación diaria.
        </motion.p>

        {/* 3 Pillar Cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto"
          staggerDelay={0.12}
          delayChildren={0.3}
        >
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.number}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 hover:border-brand-beige/25 hover:bg-white/[0.06] transition-colors duration-300 h-full">
                {/* Header: badge + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-barlow font-bold text-[10px] tracking-[0.3em] uppercase bg-[#8f0000]/10 text-[#8f0000] border border-[#8f0000]/30 px-2.5 py-1 rounded-full">
                    {pillar.badge}
                  </span>
                  <span className="text-brand-beige/60">{pillar.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-barlow font-bold text-lg text-white mb-2">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed">
                  {pillar.description}
                </p>

                {/* Background number */}
                <span
                  aria-hidden="true"
                  className="font-akira absolute bottom-2 right-3 text-[72px] text-brand-beige/[0.04] leading-none select-none pointer-events-none"
                >
                  {pillar.number}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-1.5 mt-10"
        >
          <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-white/25">
            Ver capacidades
          </span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-brand-beige/50 text-base"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
