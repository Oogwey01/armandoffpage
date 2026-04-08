"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  onOpenForm: () => void;
}

// ── Marquee data ──────────────────────────────────────────────
type CardType = "phone" | "desktop";
interface MarqueeCardData { type: CardType; label: string; img: string; }

const MARQUEE_CARDS: MarqueeCardData[] = [
  { type: "phone",   label: "Ad Creative",    img: "/images/statistics/aff.png" },
  { type: "desktop", label: "Store Design",   img: "/images/statistics/aff2.png" },
  { type: "phone",   label: "TikTok Shop",    img: "/images/statistics/SCREEN.jpg" },
  { type: "desktop", label: "Landing Page",   img: "/images/statistics/aff3.png" },
  { type: "phone",   label: "Marca",          img: "/images/prove/1st image.png" },
  { type: "desktop", label: "Funnel",         img: "/images/prove/2nd image.png" },
  { type: "phone",   label: "Resultados",     img: "/images/statistics/aff4.png" },
  { type: "desktop", label: "Operación",      img: "/images/prove/3rd image.png" },
];

function MarqueeCard({ type, label, img }: MarqueeCardData) {
  if (type === "phone") {
    return (
      <div className="relative flex-none w-28 h-52 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
        {/* Speaker bar */}
        <div className="flex justify-center pt-2.5 pb-1.5">
          <div className="w-8 h-1 rounded-full bg-white/20" />
        </div>
        {/* Screen area */}
        <div className="flex-1 mx-1.5 rounded-lg overflow-hidden relative">
          <Image src={img} alt={label} fill className="object-cover" sizes="112px" />
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
      <div className="flex-1 relative overflow-hidden">
        <Image src={img} alt={label} fill className="object-cover" sizes="208px" />
      </div>
    </div>
  );
}

// ── Brand cards data ───────────────────────────────────────────
const BRAND_CARDS = [
  { brand: "FRESA FIT", result: "$5M+ en Meta Ads",       desc: "Con dinero propio. El mismo sistema que aplicamos a tu negocio.",                          image: "/images/prove/1st image.png" },
  { brand: "FRESA FIT", result: "Negocio real, no teoría",         desc: "Todo lo que ejecutamos lo operamos primero en nuestra marca.",               image: "/images/prove/2nd image.png" },
  { brand: "FRESA FIT", result: "30M+ · MercadoLíder Platinum", desc: "8 cifras desde Hermosillo. Sin inversores. Sin agencia.",       image: "/images/prove/3rd image.png" },
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
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-brand-black" />

      {/* Orb 1 — top-left, oro principal */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "700px",
          height: "500px",
          top: "-15%",
          left: "-10%",
          background: "radial-gradient(ellipse, rgba(200,157,105,0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — bottom-right, cobre oscuro */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "450px",
          bottom: "-10%",
          right: "-8%",
          background: "radial-gradient(ellipse, rgba(176,138,85,0.18) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 3 — center, muy sutil para profundidad */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "300px",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(200,157,105,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.08) 1px, transparent 0)",
          backgroundSize: "36px 36px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left lg:text-center pt-32 md:pt-40 pb-16 md:pb-20">
        {/* Hero top */}
        <div className="mb-16 max-w-4xl mx-auto lg:mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-barlow font-black text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Tu producto <span className="text-brand-beige">ya existe.</span>
            <br className="hidden sm:block" />
            {" "}El mundo debe <span className="text-brand-beige">encontrarlo</span>
          </motion.h1>

          {/* Platform logos */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="inline-flex items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 sm:px-5 sm:py-3 mb-8"
          >
            {[
              { logo: "/images/logos/meta-ads.png", alt: "Meta Ads", w: 28, h: 20 },
              { logo: "/images/logos/Shopify-badge.png", alt: "Shopify", w: 22, h: 22 },
              { logo: "/images/logos/tiendanube.svg", alt: "Tiendanube", w: 24, h: 22 },
              { logo: "/images/logos/tiktokshop.webp", alt: "TikTok Shop", w: 28, h: 20 },
              { logo: "/images/logos/mercado-libre.png", alt: "Mercado Libre", w: 22, h: 22 },
            ].map(({ logo, alt, w, h }, i) => (
              <div key={alt} className="contents">
                <Image src={logo} alt={alt} width={w} height={h} className="object-contain h-5 sm:h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                {i < 4 && <span className="text-white/30 text-xs">→</span>}
              </div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-montserrat text-sm sm:text-base font-light text-gray-300 max-w-xl mb-8 lg:mx-auto"
          >
            Hacemos que tu negocio venda en todos los canales — Meta Ads, TikTok Shop,
            Mercado Libre y página web - gestionados por el equipo que construyó FRESA FIT.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none lg:justify-center"
          >
            <button onClick={onOpenForm} className="btn-primary uppercase tracking-wide text-center">
              Quiero vender en línea
            </button>
            <Link href="/metodo" className="btn-outline uppercase tracking-wide text-center">
              Ver cómo funciona
            </Link>
          </motion.div>
        </div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          {/* Metric cards with text overlay on images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {[
              { num: "$5M+",     desc: "Invertidos en Meta Ads con dinero propio",  img: "/images/statistics/aff.png" },
              { num: "$30M+",    desc: "Facturados en Mercado Libre en 2 años",     img: "/images/statistics/aff2.png" },
              { num: "+4,000",   desc: "Ventas generadas en TikTok Shop",           img: "/images/statistics/SCREEN.jpg" },
              { num: "Platinum", desc: "MercadoLíder — nivel más alto en ML",       img: "/images/statistics/aff4.png" },
            ].map(({ num, desc, img }) => (
              <div key={num} className="relative rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={img}
                  alt={num}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-center">
                  <span className="font-barlow font-black text-2xl sm:text-3xl md:text-4xl text-white leading-none">
                    <span className="bg-brand-beige/20 px-1.5 py-0.5 rounded">{num}</span>
                  </span>
                  <p className="font-montserrat text-[10px] sm:text-sm text-gray-200 mt-1.5 leading-tight">
                    <span className="bg-brand-beige/20 px-1 py-0.5 rounded">{desc}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="font-montserrat text-sm text-gray-400 text-center mt-6">
            Nadie más en México puede mostrar estos 4 números con dinero propio
          </p>
        </motion.div>

        {/* ── Por qué nos eligen ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="mt-10 md:mt-24"
        >
          {/* Section title */}
          <h2 className="font-barlow font-black text-2xl sm:text-3xl md:text-5xl text-white mb-10">
            VE POR QUÉ 600+ MARCAS
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
                  key={index}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  {/* Badge — top-left */}
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

          {/* Stats row — hidden */}

          {/* ── Escalado 360 ── */}
          <div className="text-left mb-24">
            {/* Label */}
            <p className="font-barlow font-bold text-sm tracking-widest uppercase text-brand-beige mb-3">
              ESCALADO 360
            </p>

            {/* Title */}
            <h3 className="font-barlow font-black text-3xl md:text-5xl text-white leading-tight mb-8">
              No dejes dinero en un solo canal
            </h3>

            {/* Subtitle */}
            <p className="font-montserrat text-base md:text-lg text-gray-400 font-light leading-relaxed mb-2">
              El 80% de negocios que fracasan en internet apostaron todo a un solo canal.
            </p>
            <p className="font-montserrat text-sm md:text-base text-gray-500 font-light leading-relaxed mb-12">
              Los que escalan tienen un sistema completo. Un canal trae el tráfico. Otro convierte. Otro captura. Otro retiene.
            </p>

            {/* Flow diagram — Desktop (horizontal) */}
            <div className="hidden md:flex items-center justify-between gap-3 mb-12">
              {[
                { name: "Meta Ads",      action: "Atrae",           cardBg: "bg-blue-200/10",   borderColor: "border-blue-300/30",  textColor: "text-blue-300",   logos: ["/images/logos/meta-ads.png"] },
                { name: "Página web",    action: "Convierte",       cardBg: "bg-purple-200/10",  borderColor: "border-purple-300/30", textColor: "text-purple-300", logos: ["/images/logos/Shopify-badge.png", "/images/logos/tiendanube.svg"] },
                { name: "TikTok Shop",   action: "Vende directo",   cardBg: "bg-rose-200/10",    borderColor: "border-rose-300/30",   textColor: "text-rose-300",   logos: ["/images/logos/tiktokshop.webp"] },
                { name: "Mercado Libre", action: "Captura demanda", cardBg: "bg-amber-200/10",   borderColor: "border-amber-300/30",  textColor: "text-amber-300",  logos: ["/images/logos/mercado-libre.png"] },
              ].map(({ name, action, cardBg, borderColor, textColor, logos }, i) => (
                <div key={name} className="contents">
                  <div className={`${cardBg} ${borderColor} border rounded-2xl py-6 px-5 text-center flex-1`}>
                    <div className="flex items-center justify-center gap-2 mx-auto mb-3">
                      {logos.map((logo) => (
                        <div key={logo} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Image src={logo} alt={name} width={24} height={24} className="object-contain" />
                        </div>
                      ))}
                    </div>
                    <p className={`font-barlow font-bold text-base ${textColor}`}>{name}</p>
                    <p className="font-montserrat text-xs text-gray-400 mt-1">{action}</p>
                  </div>
                  {i < 3 && (
                    <span className="text-white/30 text-2xl shrink-0">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Flow diagram — Mobile (vertical) */}
            <div className="flex md:hidden flex-col gap-3 mb-12">
              {[
                { name: "Meta Ads",      action: "Atrae",           cardBg: "bg-blue-200/10",   borderColor: "border-blue-300/30",  textColor: "text-blue-300",   logos: ["/images/logos/meta-ads.png"] },
                { name: "Página web",    action: "Convierte",       cardBg: "bg-purple-200/10",  borderColor: "border-purple-300/30", textColor: "text-purple-300", logos: ["/images/logos/Shopify-badge.png", "/images/logos/tiendanube.svg"] },
                { name: "TikTok Shop",   action: "Vende directo",   cardBg: "bg-rose-200/10",    borderColor: "border-rose-300/30",   textColor: "text-rose-300",   logos: ["/images/logos/tiktokshop.webp"] },
                { name: "Mercado Libre", action: "Captura demanda", cardBg: "bg-amber-200/10",   borderColor: "border-amber-300/30",  textColor: "text-amber-300",  logos: ["/images/logos/mercado-libre.png"] },
              ].map(({ name, action, cardBg, borderColor, textColor, logos }, i) => (
                <div key={name}>
                  <div className={`${cardBg} ${borderColor} border rounded-xl py-4 px-4 flex items-center gap-4`}>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {logos.map((logo) => (
                        <div key={logo} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Image src={logo} alt={name} width={20} height={20} className="object-contain" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className={`font-barlow font-bold text-sm ${textColor}`}>{name}</p>
                      <p className="font-montserrat text-xs text-gray-400">{action}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="flex justify-center py-1">
                      <span className="text-white/30 text-xl">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Comparison — Desktop */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 items-stretch mb-12">
              {/* Sin sistema */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                <p className="font-barlow font-bold text-base text-red-400 mb-4">Sin sistema completo</p>
                <ul className="font-montserrat text-sm text-gray-300 space-y-3">
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>Tráfico perdido</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>Nadie llega</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>Sin retención</li>
                </ul>
              </div>

              {/* VS */}
              <div className="flex items-center justify-center self-center">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="font-barlow font-bold text-sm text-white/50">vs</span>
                </div>
              </div>

              {/* Con Escalado 360 */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                <ul className="font-montserrat text-sm text-gray-300 space-y-3">
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>Tráfico que convierte</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>Página que vende sola</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>TikTok que escala</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>ML que captura el resto</li>
                </ul>
              </div>
            </div>

            {/* Comparison — Mobile */}
            <div className="flex md:hidden flex-col gap-4 mb-12">
              {/* Sin sistema */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <p className="font-barlow font-bold text-base text-red-400 mb-3">Sin sistema completo</p>
                <ul className="font-montserrat text-sm text-gray-300 space-y-3">
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>Tráfico perdido</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>Nadie llega</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-red-400"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>Sin retención</li>
                </ul>
              </div>

              {/* Con Escalado 360 */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                <ul className="font-montserrat text-sm text-gray-300 space-y-3">
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>Tráfico que convierte</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>Página que vende sola</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>TikTok que escala</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg viewBox="0 0 12 12" className="w-3 h-3 text-green-400"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg></span>ML que captura el resto</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenForm}
              className="w-full bg-brand-beige text-brand-black font-barlow font-bold text-lg py-4 rounded-xl hover:bg-brand-beige-light hover:scale-[1.01] transition-all"
            >
              Quiero el sistema completo →
            </button>
          </div>

          {/* Testimonial — hidden */}
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
