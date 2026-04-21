"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations";

const CONTENT_TYPES = [
  {
    number: "01",
    badge: "UGC",
    title: "Contenido UGC",
    description:
      "Creadores reales usando tu producto. Genera confianza y baja el costo por adquisición.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        <path d="M4.5 20.25a8.25 8.25 0 0 1 15 0" />
      </svg>
    ),
  },
  {
    number: "02",
    badge: "ESTÁTICOS",
    title: "Diseño Estático",
    description:
      "Piezas gráficas que detienen el scroll. Promos y creativos optimizados para conversión.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 16l5-5 4 4 4-6 5 7" />
      </svg>
    ),
  },
  {
    number: "03",
    badge: "PRODUCCIONES",
    title: "Producciones",
    description:
      "Video profesional con dirección creativa. Eleva la percepción y escala en paid media.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M15.91 3.545 7.17 7.818M20 12l-8 4.5L4 12" />
        <path d="m4 16.5 8 4.5 8-4.5" />
        <path d="m4 12 8 4.5L20 12l-8-4.5L4 12Z" />
      </svg>
    ),
  },
] as const;

export function ContentIntro() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url('/images/backgrounds/5.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-brand-black/25" />
      </div>
      <div className="relative z-10 container-custom">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-[#8f0000] flex-none" />
          <p className="font-bebas text-white text-xs uppercase tracking-[0.3em]">
            Qué producimos
          </p>
          <span className="h-px w-8 bg-[#8f0000] flex-none" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-dafoe text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white text-center mb-4"
        >
          3 FORMATOS.{" "}
          <span className="text-brand-beige">UN SISTEMA.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-bebas text-sm md:text-base text-gray-400 font-light text-center mb-12 md:mb-14 max-w-2xl mx-auto tracking-wide"
        >
          Cada formato cumple una función dentro de tu estrategia de paid media.
          Producimos los tres con el mismo criterio creativo.
        </motion.p>

        {/* 3 Content Type Cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto"
          staggerDelay={0.12}
          delayChildren={0.3}
        >
          {CONTENT_TYPES.map((type) => (
            <StaggerItem key={type.number}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 hover:border-brand-beige/25 hover:bg-white/[0.06] transition-colors duration-300 h-full">
                {/* Header: badge + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bebas font-bold text-[10px] tracking-[0.3em] uppercase bg-brand-beige/10 text-brand-beige border border-brand-beige/30 px-2.5 py-1 rounded-full">
                    {type.badge}
                  </span>
                  <span className="text-brand-beige/60">{type.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-dafoe text-3xl text-white mb-2 leading-[1.05]">
                  {type.title}
                </h3>

                {/* Description */}
                <p className="font-bebas text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                  {type.description}
                </p>

                {/* Background number */}
                <span
                  aria-hidden="true"
                  className="font-bebas absolute bottom-2 right-3 text-[72px] text-brand-beige/[0.04] leading-none select-none pointer-events-none"
                >
                  {type.number}
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
          <span className="font-bebas text-[9px] tracking-[0.3em] uppercase text-white/25">
            Ver ejemplos
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
