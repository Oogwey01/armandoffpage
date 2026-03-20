"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StarIcon } from "@/components/common/Icons";

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gray to-brand-black" />

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/placeholder.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>

      {/* Subtle overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-40 pb-20">
        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-black/60 border border-white/20 rounded-full px-4 py-2 mb-8"
        >
          {/* Shopify logo */}
          <Image
            src="/images/logos/Shopify-badge.png"
            alt="Shopify"
            width={28}
            height={28}
            className="object-contain"
          />
          {/* Whop icon */}
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold leading-none">
            W
          </span>
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5 text-yellow-400" filled />
            ))}
          </div>
          <span className="font-montserrat text-sm text-white font-medium">
            4.9/5 – #1 en Whop
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="heading-xl text-white mb-6"
        >
          MENTOREANDO LAS MEJORES
          <br />
          MARCAS ECOM DEL MUNDO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="body-text max-w-2xl mx-auto text-gray-300 mb-10"
        >
          Te brindamos la Educación, Mentoría, Herramientas y Recursos
          <br />
          para Escalar Grandes Marcas con Éxito — Todo en Un Solo Lugar
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button onClick={onOpenForm} className="btn-primary">
            Aplicar Ahora
          </button>
          <a href="#servicios" className="btn-outline">
            Conocer Más
          </a>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-white/10"
        >
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {[
              { pct: "226%", label: "Incremento promedio en Ventas" },
              { pct: "207%", label: "Incremento promedio en ROAS" },
              { pct: "25%",  label: "Incremento promedio en AOV" },
              { pct: "72%",  label: "Incremento promedio en CVR" },
            ].map(({ pct, label }) => (
              <div key={pct} className="flex items-center gap-2 px-6 py-4 bg-transparent">
                {/* Green arrow */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M7 1L13 7H9V13H5V7H1L7 1Z" fill="#22c55e" />
                </svg>
                <span className="font-barlow font-extrabold text-5xl text-white">{pct}</span>
                <span className="font-montserrat text-xs text-gray-400 leading-tight text-left">{label}</span>
              </div>
            ))}
          </div>

          {/* Image cards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {[
              { label: "SHOPIFY" },
              { label: "ROAS" },
              { label: "AOVs" },
              { label: "CRO" },
            ].map(({ label }) => (
              <div key={label} className="bg-transparent flex flex-col">
                {/* Placeholder card */}
                <div className="aspect-[3/4] bg-white/5 border border-white/10 m-3 rounded-lg flex items-center justify-center">
                  <span className="font-montserrat text-xs text-white/20 uppercase tracking-widest">
                    Imagen próximamente
                  </span>
                </div>
                {/* Label */}
                <p className="font-barlow font-extrabold text-xs text-white/60 tracking-widest text-center pb-4 uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="bg-transparent border-t border-white/5 py-3 px-6 text-center">
            <p className="font-montserrat text-xs text-gray-500">
              Mentoreando 600+ marcas en Shopify. Promedios basados en clientes de Shopify.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
