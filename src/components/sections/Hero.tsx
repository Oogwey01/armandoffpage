"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@/components/common/Icons";

interface HeroProps {
  onOpenForm: () => void;
}

// ── Marquee data ──────────────────────────────────────────────
type CardType = "phone" | "desktop";
interface MarqueeCardData { type: CardType; label: string; }

const MARQUEE_CARDS: MarqueeCardData[] = [
  { type: "phone",   label: "Email Campaign"  },
  { type: "desktop", label: "Landing Page"    },
  { type: "phone",   label: "SMS Flow"        },
  { type: "desktop", label: "Product Page"    },
  { type: "phone",   label: "Ad Creative"     },
  { type: "desktop", label: "Store Design"    },
  { type: "phone",   label: "Push Notif."     },
  { type: "desktop", label: "Funnel"          },
];

function MarqueeCard({ type, label }: MarqueeCardData) {
  if (type === "phone") {
    return (
      <div className="relative flex-none w-28 h-52 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
        {/* Speaker bar */}
        <div className="flex justify-center pt-2.5 pb-1.5">
          <div className="w-8 h-1 rounded-full bg-white/20" />
        </div>
        {/* Screen area */}
        <div className="flex-1 mx-1.5 rounded-lg bg-white/[0.04] flex items-center justify-center">
          <span className="font-montserrat text-[8px] text-white/20 text-center px-1 leading-snug">
            {label}
          </span>
        </div>
        {/* Home button */}
        <div className="flex justify-center py-2">
          <div className="w-5 h-5 rounded-full border border-white/15" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex-none w-52 h-36 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-500/40" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
        <div className="w-2 h-2 rounded-full bg-green-500/40" />
        <div className="flex-1 mx-2 h-2.5 rounded bg-white/10" />
      </div>
      {/* Content area */}
      <div className="flex-1 flex items-center justify-center">
        <span className="font-montserrat text-[8px] text-white/20 text-center px-2 leading-snug">
          {label}
        </span>
      </div>
    </div>
  );
}

// ── Brand cards data ───────────────────────────────────────────
const BRAND_CARDS = [
  { brand: "FRESA FIT", result: "8 años construyendo marca",       desc: "De Hermosillo para todo México. Desde los 19 años.",                          image: "/images/prove/1st image.png" },
  { brand: "FRESA FIT", result: "Negocio real, no teoría",         desc: "Todo lo que enseño lo opero todos los días en mi propia marca.",               image: "/images/prove/2nd image.png" },
  { brand: "FRESA FIT", result: "Equipo, producto y operación real", desc: "Así se ve por dentro una marca de 8 cifras funcionando desde Sonora.",       image: "/images/prove/3rd image.png" },
];

export default function Hero({ onOpenForm }: HeroProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40 pb-16 md:pb-20">
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
          MENTOREANDO LAS MEJORES{" "}
          <br className="hidden sm:block" />
          MARCAS ECOM DEL MUNDO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="body-text max-w-2xl mx-auto text-gray-300 mb-10"
        >
          Te brindamos la Educación, Mentoría, Herramientas y Recursos{" "}
          <br className="hidden sm:block" />
          para Escalar Grandes Marcas con Éxito — Todo en Un Solo Lugar
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-4 mb-16"
        >
          <button onClick={onOpenForm} className="btn-primary">
            Aplicar Ahora
          </button>
          <Link href="/metodo" className="btn-outline">
            Conocer Más
          </Link>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          {/* Stat + Image columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { pct: "226%", label: "Incremento promedio en Ventas", imgLabel: "SHOPIFY", img: "/images/statistics/aff.png"  },
              { pct: "207%", label: "Incremento promedio en ROAS",   imgLabel: "ROAS",    img: "/images/statistics/aff2.png" },
              { pct: "25%",  label: "Incremento promedio en AOV",    imgLabel: "AOVs",    img: "/images/statistics/aff3.png" },
              { pct: "72%",  label: "Incremento promedio en CVR",    imgLabel: "CRO",     img: "/images/statistics/aff4.png" },
            ].map(({ pct, label, imgLabel, img }) => (
              <div key={pct} className="flex flex-col">
                {/* Stat */}
                <div className="flex items-center gap-2 pb-3">
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                      <path d="M7 1L13 7H9V13H5V7H1L7 1Z" fill="#22c55e" />
                    </svg>
                    <span className="font-barlow font-extrabold text-5xl sm:text-6xl md:text-7xl text-white leading-none">{pct}</span>
                  </div>
                  <span className="font-montserrat text-[11px] sm:text-xs text-gray-300 leading-snug text-left max-w-[72px]">{label}</span>
                </div>
                {/* Image */}
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={img}
                    alt={imgLabel}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="w-full h-auto"
                  />
                </div>
                {/* Label */}
                <p className="font-barlow font-extrabold text-xs text-white/60 tracking-widest text-center pt-3 uppercase">
                  {imgLabel}
                </p>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="font-montserrat text-xs text-gray-500 text-center mt-4">
            Mentoreando 600+ marcas en Shopify. Promedios basados en clientes de Shopify.
          </p>
        </motion.div>

        {/* ── Por qué nos eligen ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="mt-24"
        >
          {/* Section title */}
          <h2 className="font-barlow font-black text-2xl md:text-4xl text-white text-center uppercase leading-tight tracking-tight mb-10">
            VE POR QUÉ 600+ MARCAS
            <br />
            NOS ELIGEN
          </h2>

          {/* Brand result cards */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {BRAND_CARDS.map(({ brand, result, desc, image }, index) => {
              const isHovered = hoveredCard === index;
              const anyHovered = hoveredCard !== null;
              const desktopFlex = isHovered ? 1.8 : anyHovered ? 0.6 : 1;

              return (
                <motion.div
                  key={brand}
                  className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[320px] lg:h-[360px] bg-white/5"
                  style={{ flexGrow: 1 }}
                  initial={false}
                  animate={isDesktop ? { flexGrow: desktopFlex } : {}}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Background image */}
                  <Image
                    src={image}
                    alt={brand}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                  {/* Badge — top-left */}
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-montserrat font-semibold px-3 py-1.5 rounded-xl">
                    {brand}
                  </div>
                  {/* Text — bottom-left */}
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="font-barlow font-black text-2xl sm:text-3xl text-white leading-tight mb-1">
                      {result}
                    </p>
                    <p className="font-montserrat text-sm text-gray-300">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-20">
            {[
              { num: "600+",   label: "Marcas en Mentoría" },
              { num: "40M+",   label: "Conversiones Generadas" },
              { num: "$200M+", label: "Inversión en Ads Gestionada" },
              { num: "$1B+",   label: "GMV generado" },
            ].map(({ num, label }) => (
              <div key={num} className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-xl px-1 sm:px-3 py-3 sm:py-4">
                <span className="font-barlow font-black text-base sm:text-xl text-white tracking-tight">{num}</span>
                <span className="font-montserrat text-[9px] sm:text-[10px] text-gray-400 mt-1 leading-snug">{label}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-6">
              Hard Working Gentlemen
            </p>
            <blockquote className="font-barlow font-black text-xl md:text-3xl text-white uppercase leading-tight tracking-tight mb-5">
              &ldquo;ARMANDO Y SU EQUIPO HAN MULTIPLICADO MI NEGOCIO 10X — DOS VECES.&rdquo;
            </blockquote>
            <p className="font-montserrat text-xs text-gray-400 italic mb-7">
              &ldquo;Ambas veces, nos quedamos sin inventario, que es lo único que nos ha frenado.
              <br />
              No puedo hablar lo suficientemente bien del valor de este programa.&rdquo;
            </p>
            <a
              href="/casos-de-estudio"
              className="inline-flex items-center gap-1 font-montserrat text-sm text-white border border-white/20 rounded-full px-5 py-2 hover:bg-white/10 transition-colors mb-10"
            >
              Caso de Estudio →
            </a>
            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <span className="font-montserrat text-xs text-gray-400">RR</span>
              </div>
              <div className="text-left">
                <p className="font-montserrat font-semibold text-sm text-white">Reid Ryan</p>
                <p className="font-montserrat text-xs text-gray-500">
                  Fundador, Hard Working Gentlemen
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Marquee Gallery ── */}
        <div
          className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8 space-y-3"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {(["right", "left", "right"] as const).map((dir, rowIdx) => (
            <div key={rowIdx} className="overflow-hidden">
              <div
                className="flex gap-3 w-max"
                style={{ animation: `marquee-${dir} 35s linear infinite` }}
              >
                {[...MARQUEE_CARDS, ...MARQUEE_CARDS].map((card, i) => (
                  <MarqueeCard key={i} {...card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
