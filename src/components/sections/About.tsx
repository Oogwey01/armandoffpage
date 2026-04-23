"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PILLARS = [
  {
    icon: "/images/logos/meta-ads.png",
    title: "Meta Ads",
    desc: "$5M+ invertidos con dinero propio en campañas propias",
  },
  {
    icon: "/images/logos/Shopify-badge.png",
    title: "Página web",
    desc: "Embudo completo desde el anuncio hasta la compra",
  },
  {
    icon: "/images/logos/tiktok.webp",
    title: "TikTok Shop",
    desc: "+4,000 ventas operando el canal directamente",
  },
  {
    icon: "/images/logos/mercado-libre.png",
    title: "Mercado Libre",
    desc: "$30M+ facturados · MercadoLíder Platinum",
  },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="quien-soy"
      className="section-padding relative overflow-hidden"
    >
      {/* Radial glow — top right (beige) */}
      <div
        className="absolute -top-32 -right-32 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(200,157,105,0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      {/* Radial glow — bottom left (gray) */}
      <div
        className="absolute -bottom-32 -left-32 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(80,80,80,0.5) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      {/* Center accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(200,157,105,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div ref={ref} className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/statistics/aff.png"
              alt="Armando FF"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-start gap-3 mb-6">
              <span className="h-px w-10 bg-[#8f0000] flex-none" />
              <p className="font-bebas text-white text-sm uppercase tracking-[0.3em]">
                Operadores, no teóricos
              </p>
              <span className="h-px w-10 bg-[#8f0000] flex-none" />
            </div>
            <h2 className="font-barlow font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4">
              &ldquo;No gestionamos tu negocio desde una oficina teórica&rdquo;
            </h2>
            <p className="font-montserrat text-sm sm:text-base text-gray-400 font-light leading-relaxed mb-10">
              Todo lo que aplicamos en tu marca lo operamos primero en la nuestra. Estos son los datos reales de FRESA FIT:
            </p>

            {/* Pillar items */}
            <div className="flex flex-col gap-0">
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 py-5 border-b border-white/10 last:border-b-0"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-beige/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Image src={pillar.icon} alt={pillar.title} width={22} height={22} className="object-contain" />
                  </div>
                  <div>
                    <p className="font-barlow font-bold text-base text-white">
                      {pillar.title}
                    </p>
                    <p className="font-montserrat text-sm text-gray-400 mt-0.5">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
