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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="heading-xl text-white mb-6"
        >
          5 AÑOS CONVIRTIENDO
          <br />
          <span className="text-brand-beige">ERRORES</span> EN{" "}
          <span className="text-brand-beige">APRENDIZAJE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="body-text max-w-2xl mx-auto text-gray-300 mb-10"
        >
          Estrategia real de un joven empresario mexicano que ha vivido cada
          etapa del negocio. Sin atajos, sin humo — solo resultados.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button onClick={onOpenForm} className="btn-primary">
            Agendar Consulta
          </button>
          <a href="#servicios" className="btn-outline">
            Conocer Servicios
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-400"
        >
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className="w-4 h-4 text-brand-beige"
                filled
              />
            ))}
          </div>
          <span className="font-montserrat font-light">
            4.9/5 &bull; 500+ clientes &bull; 8 cifras experiencia
          </span>
        </motion.div>
      </div>
    </section>
  );
}
