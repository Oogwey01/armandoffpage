"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QualificationForm from "@/components/form/QualificationForm";
import { useFormModal } from "@/hooks/useFormModal";
import { StarIcon } from "@/components/common/Icons";

export default function MetodoPage() {
  const { isOpen, open, close } = useFormModal();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <Header onOpenForm={open} />

      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
          {/* Subtle overlay pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.5) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40 pb-16 md:pb-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-brand-gray/60 border border-brand-beige/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-beige flex-shrink-0" />
              <span className="font-montserrat text-xs font-semibold text-brand-beige uppercase tracking-widest">
                PARA FUNDADORES DTC Y MARCAS EN SHOPIFY
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white mb-6 max-w-5xl mx-auto"
            >
              COPIA Y PEGA EL EMBUDO DE CRECIMIENTO ECOM DE $2 MIL MILLONES
              QUE ESTÁ REEMPLAZANDO AGENCIAS MIENTRAS REDUCE EL CAC EN 40% Y
              AUMENTA EL ROAS EN 221%
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="body-text max-w-2xl mx-auto text-gray-300 mb-10"
            >
              Este es el mismo sistema que tu agencia reza para que nunca
              descubras
            </motion.p>

            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl border border-white/10 bg-brand-gray overflow-hidden mb-12"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  {/* Play icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-brand-beige ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-montserrat text-sm text-gray-400">
                  VIDEO — Próximamente
                </p>
              </div>
            </motion.div>

            {/* Social Proof Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-brand-gray border-2 border-brand-black flex items-center justify-center"
                  >
                    <span className="font-montserrat text-[9px] text-gray-400">
                      {["MR", "AB", "CF", "DP"][i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    filled
                  />
                ))}
              </div>

              {/* Count label */}
              <p className="font-montserrat text-sm text-gray-300 font-medium">
                Únete a <span className="text-white font-bold">400+ marcas</span>
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 mb-4"
            >
              <button
                onClick={open}
                className="btn-primary w-full sm:w-auto sm:px-16 py-4 text-base lg:text-lg"
              >
                Acceder Al Método Rush
              </button>
            </motion.div>

            {/* Sub Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
              className="font-montserrat text-xs text-gray-500 text-center mb-16"
            >
              Probado en 250+ nichos diferentes en Shopify
            </motion.p>

            {/* "USADO POR" Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
              className="mt-4 mb-20"
            >
              <p className="font-montserrat text-xs text-gray-500 uppercase tracking-widest text-center mb-6">
                Utilizado Por:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                {/* Shopify Badge */}
                <Image
                  src="/images/logos/Shopify-badge.png"
                  alt="Shopify"
                  width={80}
                  height={28}
                  className="object-contain grayscale"
                />

                {/* Placeholder brand text logos */}
                {["Happy Aging", "Banger Station", "Jack Henry", "Spicy Cubes"].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="font-barlow font-bold text-xs sm:text-sm text-gray-500 uppercase tracking-wider"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
