"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/content/AnimatedSection";

interface FloatingLogo {
  src: string;
  alt: string;
  // Posición en el canvas (%)
  top: string;
  left: string;
  // Tamaño responsivo: clases Tailwind para width/height
  sizeClass: string;
  // Duración de la animación flotante (s)
  duration: number;
  // Delay para desincronizar
  delay: number;
  // Amplitud de movimiento flotante (px)
  yRange: number;
  xRange: number;
}

// Layout: 3 logos arriba + 3 abajo distribuidos uniformemente
// Todos dentro del rango seguro 14%-86% horizontal para no salirse en mobile
// Todos los SVGs usan viewBox 24x24 y mismas clases de tamaño para consistencia visual
const LOGOS: FloatingLogo[] = [
  {
    src: "/images/logos/meta.svg",
    alt: "Meta",
    top: "20%",
    left: "14%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    duration: 7,
    delay: 0,
    yRange: 10,
    xRange: 6,
  },
  {
    src: "/images/logos/facebook.svg",
    alt: "Facebook",
    top: "20%",
    left: "50%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    duration: 7.5,
    delay: 1.6,
    yRange: 10,
    xRange: 5,
  },
  {
    src: "/images/logos/google-ads.svg",
    alt: "Google Ads",
    top: "20%",
    left: "86%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    duration: 6.5,
    delay: 1.2,
    yRange: 8,
    xRange: 6,
  },
  {
    src: "/images/logos/instagram.svg",
    alt: "Instagram",
    top: "82%",
    left: "14%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    duration: 8,
    delay: 0.8,
    yRange: 12,
    xRange: 4,
  },
  {
    src: "/images/logos/whatsapp.svg",
    alt: "WhatsApp",
    top: "82%",
    left: "50%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    duration: 6,
    delay: 0.4,
    yRange: 10,
    xRange: 5,
  },
  {
    src: "/images/logos/tiktok.svg",
    alt: "TikTok",
    top: "82%",
    left: "86%",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    duration: 5.5,
    delay: 2,
    yRange: 8,
    xRange: 6,
  },
];

export function BrandLogos() {
  return (
    <section
      aria-label="Gestión de pauta publicitaria"
      className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-y border-white/5 overflow-hidden"
    >
      {/* Dot pattern de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
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

      {/* Orb dorado sutil de fondo */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "460px",
          height: "360px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(200,157,105,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: ["-50%", "-45%", "-50%"], y: ["-50%", "-52%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container-custom">
        {/* Canvas de logos flotantes — detrás del texto */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.alt}
              className="absolute -translate-x-1/2 -translate-y-1/2 opacity-50 md:opacity-60"
              style={{ top: logo.top, left: logo.left }}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className={`relative flex items-center justify-center ${logo.sizeClass}`}
                animate={{
                  y: [0, -logo.yRange, 0, logo.yRange * 0.5, 0],
                  x: [0, logo.xRange * 0.5, 0, -logo.xRange * 0.5, 0],
                }}
                transition={{
                  duration: logo.duration,
                  delay: logo.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  className="object-contain drop-shadow-[0_6px_20px_rgba(200,157,105,0.15)]"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Texto encima de los logos */}
        <AnimatedSection className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="font-bebas font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-4">
            También hacemos pauta
          </p>
          <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-tight text-white mb-5">
            NOSOTROS ACTIVAMOS{" "}
            <span className="text-brand-beige">TUS CREATIVOS.</span>
          </h2>
          <p className="font-bebas text-sm md:text-base text-gray-400 font-light max-w-xl mx-auto tracking-wide">
            Producimos el creativo y ejecutamos la pauta. Gestión directa en las
            plataformas donde tu cliente está.
          </p>
        </AnimatedSection>

        {/* Lista textual accesible — visible solo para lectores de pantalla */}
        <p className="sr-only">
          Plataformas que gestionamos: Meta, Facebook, Instagram, WhatsApp,
          TikTok y Google Ads.
        </p>
      </div>
    </section>
  );
}
