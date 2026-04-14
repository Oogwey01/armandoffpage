"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QualificationForm from "@/components/form/QualificationForm";
import { useFormModal } from "@/hooks/useFormModal";

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(200,157,105,0.3) 30%, rgba(200,157,105,0.3) 70%, transparent)" }} />
  );
}

type Tier = {
  number: "01" | "02" | "03";
  name: string;
  price: string;
  totalPieces: string;
  images: string[];
  videos: string[];
  extras: string[];
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    number: "01",
    name: "PRESENCIA",
    price: "$9,900",
    totalPieces: "10 piezas de contenido profesional al mes",
    images: ["6 composiciones visuales avanzadas listas para ads o feed"],
    videos: [
      "3 videos UGC con dirección creativa listos para publicar",
      "1 video de alta producción con modelo y locación",
    ],
    extras: [
      "Brief creativo mensual con la estrategia detrás incluido",
      "Contenido en crudo",
    ],
  },
  {
    number: "02",
    name: "AUTORIDAD",
    price: "$18,900",
    totalPieces: "22 piezas de contenido profesional al mes",
    images: ["14 composiciones visuales avanzadas listas para ads o feed"],
    videos: [
      "6 videos UGC con dirección creativa listos para publicar",
      "2 videos de alta producción con modelo y locación",
    ],
    extras: [
      "Brief creativo mensual con la estrategia detrás incluido",
      "Contenido en crudo",
    ],
    highlight: true,
  },
  {
    number: "03",
    name: "DOMINACIÓN",
    price: "$34,900",
    totalPieces: "44 piezas de contenido profesional al mes",
    images: ["28 composiciones visuales avanzadas listas para ads o feed"],
    videos: [
      "12 videos UGC con dirección creativa listos para publicar",
      "4 videos de alta producción con modelo y locación",
    ],
    extras: [
      "Brief creativo mensual con la estrategia detrás incluido",
      "Contenido en crudo",
    ],
  },
];

function TierCard({
  tier,
  showPromoBanner,
  showFloatingBadge,
  flatTop = false,
  onCta,
}: {
  tier: Tier;
  showPromoBanner: boolean;
  showFloatingBadge: boolean;
  flatTop?: boolean;
  onCta: () => void;
}) {
  const isHighlighted = !!tier.highlight;
  const radiusClasses = flatTop ? "rounded-b-2xl" : "rounded-2xl";
  const borderClasses = flatTop
    ? isHighlighted
      ? "border-x-2 border-b-2 border-brand-beige"
      : "border-x border-b border-white/10"
    : isHighlighted
    ? "border-2 border-brand-beige"
    : "border border-white/10 hover:border-white/25 transition-all duration-300";

  return (
    <div
      className={`relative bg-brand-black ${radiusClasses} overflow-hidden flex flex-col h-full ${borderClasses}`}
      style={
        isHighlighted
          ? {
              boxShadow:
                "0 0 15px rgba(200,157,105,0.15), 0 0 40px rgba(200,157,105,0.08), inset 0 0 20px rgba(200,157,105,0.03)",
            }
          : undefined
      }
    >
      {isHighlighted && showPromoBanner && (
        <div className="bg-brand-beige text-brand-black text-center py-2.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.2em]">
          EL MÁS ELEGIDO
        </div>
      )}

      {isHighlighted && showFloatingBadge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase bg-brand-beige text-brand-black font-bold px-4 py-1.5 rounded-full">
            EL MÁS ELEGIDO
          </span>
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-2">
          TIER {tier.number}
        </p>
        <h3 className="font-barlow font-black text-3xl md:text-4xl text-white uppercase mb-4">
          {tier.name}
        </h3>

        <p className="font-montserrat text-xs uppercase tracking-wider text-gray-500 mb-1">
          Desde
        </p>
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="font-barlow font-black text-4xl md:text-5xl text-white">
            {tier.price}
          </span>
          <span className="font-montserrat text-sm text-gray-400">MXN/mes</span>
        </div>

        <p className="font-montserrat text-sm text-brand-beige font-medium mb-6 leading-snug">
          {tier.totalPieces}
        </p>

        <div className="h-px bg-white/10 mb-5" />

        <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
          Imágenes
        </p>
        <ul className="flex flex-col gap-2 mb-5">
          {tier.images.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="text-brand-beige mt-0.5 shrink-0 text-sm">✓</span>
              <span className="font-montserrat text-sm text-gray-300 leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
          Videos
        </p>
        <ul className="flex flex-col gap-2 mb-5">
          {tier.videos.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="text-brand-beige mt-0.5 shrink-0 text-sm">✓</span>
              <span className="font-montserrat text-sm text-gray-300 leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-white/10 mb-5" />

        <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
          Incluido
        </p>
        <ul className="flex flex-col gap-2 mb-8">
          {tier.extras.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="text-brand-beige mt-0.5 shrink-0 text-sm">✓</span>
              <span className="font-montserrat text-sm text-gray-300 leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onCta}
          className="mt-auto w-full bg-brand-beige text-brand-black font-barlow font-bold text-sm uppercase tracking-wide py-3.5 rounded-full hover:bg-brand-beige-light hover:scale-[1.01] transition-all"
        >
          Quiero este →
        </button>
      </div>
    </div>
  );
}

export default function ContenidoPage() {
  const { isOpen, open, close } = useFormModal();
  const [activeTier, setActiveTier] = useState<number>(1);

  return (
    <>
      <Header onOpenForm={open} />
      <main className="bg-brand-black min-h-screen">
        {/* Hero section */}
        <section className="relative pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-brand-black" />

          {/* Subtle orb */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "600px",
              height: "400px",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse, rgba(200,157,105,0.1) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 container-custom text-center">
            {/* Big title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight">
                <span className="text-white">EL CONTENIDO QUE NECESITAS</span>
                <br />
                <span className="text-brand-beige">PARA VENDER MÁS.</span>
              </h1>
              <p className="font-montserrat text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto mt-2">
                El mismo sistema creativo que usamos para construir FRESA FIT, aplicado a tu marca en Hermosillo.
              </p>
            </motion.div>

            {/* Video placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="relative aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                {/* Play button */}
                <button className="w-16 h-16 rounded-full bg-brand-beige flex items-center justify-center hover:bg-brand-beige-light hover:scale-105 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-brand-black ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                  </svg>
                </button>
                {/* Caption */}
                <p className="absolute bottom-4 left-0 right-0 text-center font-montserrat text-xs tracking-widest uppercase text-white/40">
                  ARMANDO FRESAFIT — VER PRESENTACI&Oacute;N
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <a
                href="#paquetes"
                className="btn-outline uppercase tracking-widest text-center px-10"
              >
                Ver paquetes &darr;
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-white/30 text-lg">&darr;</span>
              <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-white/30">
                SEGUIR LEYENDO
              </span>
            </motion.div>
          </div>
        </section>
        <SectionDivider />
        {/* ── El problema real ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-brand-black">
          <AnimateOnScroll className="container-custom text-center">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-4">
              EL PROBLEMA REAL
            </p>
            <h2 className="font-barlow font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight mb-4">
              <span className="text-white">TIENES UN PRODUCTO QUE FUNCIONA,</span>
              <br />
              <span className="text-brand-beige">&iquest;PERO QUIERES LLEVARLO AL SIGUIENTE NIVEL?</span>
            </h2>
            <p className="font-montserrat text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto mt-2 mb-8">
               Y eso te está costando clientes todos los días sin que te des cuenta
            </p>
            <div className="max-w-4xl mx-auto text-left grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {[
                "Y eso te está costando clientes todos los días sin que te des cuenta",
                "Tu competencia se ve más profesional aunque su producto sea inferior al tuyo",
                "Estás invirtiendo en publicidad con material que no convierte",
                "Cada mes improvisas el contenido sin una estrategia clara detrás",
                "No tienes el equipo ni el criterio para producir contenido que realmente venda",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/10">
                  <span className="text-brand-beige/60 font-montserrat text-sm mt-0.5 shrink-0">—</span>
                  <p className="font-montserrat text-sm md:text-base text-gray-400 font-light">{point}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── Prueba real ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-brand-gray">
          <AnimateOnScroll className="container-custom">
            {/* Stats + Image grid — imagen alineada al título */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
              {/* Left: Label + Title + Subtitle + Stats */}
              <div className="lg:col-span-3 flex flex-col">
                <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-3">
                  PRUEBA REAL
                </p>
                <h2 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white/15 mb-3">
                  ESTO ES LO QUE
                  <br />
                  PRODUCIMOS PARA NUESTRA
                  <br />
                  PROPIA MARCA.
                </h2>
                <p className="font-montserrat text-sm md:text-base text-gray-400 font-light max-w-2xl mb-6">
                  Estadísticas de alcances y ROAS reales de FRESA FIT — probado con presupuesto propio en Meta Ads y TikTok.
                </p>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {[
                    { label: "ROAS promedio", value: "5.2x", desc: "Retorno sobre inversión publicitaria", highlight: true },
                    { label: "Alcance total", value: "3.8M+", desc: "Personas alcanzadas en Meta y TikTok" },
                    { label: "Impresiones", value: "12M+", desc: "Views acumulados del contenido" },
                    { label: "CTR promedio", value: "4.8%", desc: "Sobre el benchmark del sector" },
                  ].map(({ label, value, desc, highlight }) => (
                    <div key={label} className="group relative bg-brand-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                      {highlight && (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-beige/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      )}
                      <div className="relative z-10">
                        <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium mb-2">{label}</p>
                        <p className={`font-barlow font-black text-4xl sm:text-5xl md:text-6xl leading-none ${highlight ? "text-brand-beige" : "text-white"}`}>{value}</p>
                      </div>
                      <p className="relative z-10 font-montserrat text-xs text-gray-400 font-light leading-relaxed mt-3">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Vertical image — alineada al tope del título */}
              <div className="lg:col-span-2 hidden lg:block">
                <div className="relative w-full h-full min-h-[480px] bg-brand-black/60 border border-white/10 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/statistics/SCREEN.jpg"
                    alt="Estadísticas reales de alcances y ROAS de FRESA FIT"
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                </div>
              </div>
              {/* Mobile: imagen debajo */}
              <div className="lg:hidden">
                <div className="relative w-full aspect-[3/4] bg-brand-black/60 border border-white/10 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/statistics/SCREEN.jpg"
                    alt="Estadísticas reales de alcances y ROAS de FRESA FIT"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="font-montserrat text-xs text-gray-500 italic mt-4">
              * Métricas reales acumuladas de campañas activas de FRESA FIT
            </p>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── Por qué tiene sentido ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-brand-black">
          <AnimateOnScroll className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

              {/* Left: Label + Title + Subtitle + Price rows */}
              <div className="lg:col-span-3">
                <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-4">
                  POR QU&Eacute; TIENE SENTIDO
                </p>
                <h2 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white/15 mb-3">
                  LO QUE TE CUESTA
                  <br />
                  RESOLVERLO SOLO
                </h2>
                <p className="font-montserrat text-sm md:text-base text-gray-400 font-light mb-8">
                  Si hoy intentaras construir esto por tu cuenta, esto es lo que pagarías por pieza:
                </p>
                <div className="flex flex-col">
                  {[
                    { service: "Fotógrafo de producto por sesión", price: "$3,500 – $8,000", icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg> },
                    { service: "Editor de video por pieza", price: "$1,500 – $4,000", icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
                    { service: "Diseñador gráfico por pieza", price: "$800 – $2,500", icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg> },
                    { service: "Director creativo con criterio de paid media", price: "No lo encuentras fácil", highlight: true, icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> },
                  ].map(({ service, price, highlight, icon }, i) => (
                    <div key={service} className={`group flex items-center gap-4 py-4 px-4 border-b border-white/10 ${i === 0 ? "border-t" : ""} hover:bg-white/[0.02] transition-colors`}>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/40 group-hover:text-brand-beige group-hover:border-brand-beige/30 transition-colors">
                        {icon}
                      </div>
                      <span className="font-montserrat text-sm md:text-base text-gray-300 flex-1">{service}</span>
                      <span className={`font-barlow font-bold text-sm md:text-base shrink-0 ${highlight ? "text-red-400/70 italic" : "text-red-400"}`}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: -$500 card (cuadrado) */}
              <div className="lg:col-span-2 flex items-start justify-center">
                <div className="w-full sm:aspect-square border border-brand-beige/30 rounded-2xl flex flex-col items-center justify-center text-center bg-white/[0.02] px-5 py-8 sm:p-8 max-w-sm lg:max-w-none">
                  <p className="font-barlow font-black text-5xl sm:text-7xl md:text-8xl text-brand-beige leading-none mb-3 sm:mb-5">
                    -$500
                  </p>
                  <p className="font-montserrat text-sm md:text-base text-gray-400 font-light leading-relaxed">
                    Con nosotros, menos de $500 por pieza.
                    <br />
                    Con dirección creativa, estrategia y criterio de ads incluidos.
                  </p>
                </div>
              </div>

            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── Elige tu nivel ── */}
        <section id="paquetes" className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:py-24 bg-brand-gray">
          <AnimateOnScroll className="container-custom">
            {/* Label */}
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4 md:mb-6">
              ELIGE TU NIVEL
            </p>

            {/* Subtitle */}
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center max-w-2xl mx-auto mb-8 md:mb-12">
              Todo listo para paid media y orgánico. Derechos de uso incluidos en todos los paquetes.
            </p>

            {/* Mobile: tabs + single card */}
            <div className="md:hidden max-w-md mx-auto">
              <div role="tablist" className="flex gap-px">
                {TIERS.map((t, i) => {
                  const active = i === activeTier;
                  return (
                    <button
                      key={t.number}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTier(i)}
                      className={`flex-1 py-3 font-barlow font-bold text-[11px] uppercase tracking-wider transition-colors ${
                        active
                          ? "bg-brand-black text-white border-t-2 border-x border-brand-beige rounded-t-xl"
                          : "bg-brand-gray/60 text-white/40 border-t-2 border-transparent hover:text-white/70"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
              <TierCard
                key={activeTier}
                tier={TIERS[activeTier]}
                showPromoBanner
                showFloatingBadge={false}
                flatTop
                onCta={open}
              />
            </div>

            {/* Desktop: 3 cards side by side */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {TIERS.map((t) => (
                <TierCard
                  key={t.number}
                  tier={t}
                  showPromoBanner={false}
                  showFloatingBadge
                  onCta={open}
                />
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="flex justify-center mt-12 md:mt-16">
              <a
                href="https://wa.me/526621000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-barlow font-bold text-base uppercase tracking-wide px-10 sm:px-16 py-4 rounded-xl hover:bg-[#20bd5a] hover:scale-[1.02] transition-all animate-pulse-subtle"
                style={{ boxShadow: "0 0 20px rgba(37,211,102,0.3), 0 0 50px rgba(37,211,102,0.15)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                ESCRIBIR POR WHATSAPP
              </a>
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── ¿Es para ti? ── */}
        <section className="section-padding bg-brand-black">
          <AnimateOnScroll className="container-custom">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-6">
              &iquest;ES PARA TI?
            </p>

            {/* Title */}
            <h2 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white/15 text-center mb-16">
              TRABAJAMOS CON
              <br />
              MARCAS QUE VAN EN
              <br />
              <span className="text-brand-beige">SERIO.</span>
            </h2>

            {/* Comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Sí es para ti */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="font-barlow font-bold text-xs tracking-[0.2em] uppercase text-brand-beige mb-6">
                  S&Iacute; ES PARA TI
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    "Tienes un producto o servicio en Hermosillo y quieres vender más",
                    "Inviertes o quieres invertir en publicidad digital",
                    "Entiendes que el contenido es una inversión, no un gasto",
                    "Quieres que tu marca se vea como lo que realmente es",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-brand-beige mt-0.5 shrink-0">✓</span>
                      <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* No es para ti */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-6">
                  NO ES PARA TI
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    "Buscas contenido barato sin criterio creativo",
                    "No tienes claridad sobre lo que ofreces o a quién le vendes",
                    "Esperas resultados sin comprometerte a un proceso mensual",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-gray-600 mt-0.5 shrink-0">✕</span>
                      <p className="font-montserrat text-sm text-gray-500 font-light leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

      </main>
      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
