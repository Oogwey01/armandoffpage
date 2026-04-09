"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

export default function ContenidoPage() {
  const { isOpen, open, close } = useFormModal();

  return (
    <>
      <Header onOpenForm={open} />
      <main className="bg-brand-black min-h-screen">
        {/* Hero section */}
        <section className="relative pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden">
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
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-6"
            >
              PRODUCCION DE CONTENIDO &middot; HERMOSILLO, SONORA
            </motion.p>

            {/* Video placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
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

            {/* Big title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="font-barlow font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tight">
                <span className="text-white/15">CONTENIDO</span>
                <br />
                <span className="text-white/15">QUE </span>
                <span className="text-brand-beige">VENDE.</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-montserrat text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto mb-10"
            >
              El mismo sistema creativo que usamos para construir
              FRESA FIT, aplicado a tu marca en Hermosillo.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
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
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col items-center gap-2"
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
        <section className="section-padding bg-brand-black">
          <AnimateOnScroll className="container-custom text-center">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-8">
              EL PROBLEMA REAL
            </p>
            <h2 className="font-barlow font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight mb-8">
              <span className="text-white/15">TU PRODUCTO ES</span>
              <br />
              <span className="text-white/15">BUENO.</span>
              <br />
              <span className="text-white/15">TU CONTENIDO </span>
              <span className="text-white font-black">NO</span>
              <br />
              <span className="text-brand-beige">LO REFLEJA.</span>
            </h2>
            <p className="font-montserrat text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto mb-14">
              Y eso te está costando clientes todos los días sin que te des cuenta.
            </p>
            <div className="max-w-2xl mx-auto text-left">
              {[
                "Tu competencia se ve más profesional aunque su producto sea inferior al tuyo",
                "Estás invirtiendo en publicidad con material que no convierte",
                "Cada mes improvisas el contenido sin una estrategia clara detrás",
                "No tienes el equipo ni el criterio para producir contenido que realmente venda",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-4 py-5 border-b border-white/10 last:border-b-0">
                  <span className="text-brand-beige/60 font-montserrat text-sm mt-0.5">—</span>
                  <p className="font-montserrat text-sm md:text-base text-gray-400 font-light">{point}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── Prueba real ── */}
        <section className="section-padding bg-brand-gray">
          <AnimateOnScroll className="container-custom">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-6">
              PRUEBA REAL
            </p>

            {/* Title */}
            <h2 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white/15 mb-6">
              ESTO ES LO QUE
              <br />
              PRODUCIMOS PARA NUESTRA
              <br />
              PROPIA MARCA.
            </h2>

            {/* Subtitle */}
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light max-w-2xl mb-14">
              FRESA FIT genera ventas todos los días con este contenido — probado con presupuesto real en Meta Ads y TikTok.
            </p>

            {/* Service cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg>, title: "Fotografía de estudio", desc: "Producto o marca en entorno controlado, resultado limpio y profesional", accent: "from-blue-500/20 to-purple-500/20", iconColor: "text-blue-400" },
                { icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>, title: "Composición visual avanzada", desc: "Piezas digitales de alto impacto visual para ads y feed", accent: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
                { icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>, title: "Video UGC dirigido", desc: "Creador hablando del producto con dirección creativa real detrás", accent: "from-rose-500/20 to-pink-500/20", iconColor: "text-rose-400" },
                { icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>, title: "Video ad respuesta directa", desc: "Estructura gancho–problema–solución–CTA probada en campañas", accent: "from-red-500/20 to-orange-500/20", iconColor: "text-red-400" },
                { icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16l5-5 4 4 4-6 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>, title: "Lifestyle editado", desc: "Producto o servicio en contexto real, aspiracional y de marca", accent: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-400" },
                { icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M10 9l5 3-5 3V9z" fill="currentColor" /></svg>, title: "Alta producción", desc: "Video cinematográfico con dirección, edición y criterio de nivel agencia", accent: "from-purple-500/20 to-indigo-500/20", iconColor: "text-purple-400" },
              ].map(({ icon, title, desc, accent, iconColor }) => (
                <div key={title} className="group relative bg-brand-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 ${iconColor} group-hover:border-white/20 transition-colors`}>
                      {icon}
                    </div>
                    <h3 className="font-barlow font-bold text-base text-white mb-2">{title}</h3>
                    <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="font-montserrat text-xs text-gray-500 italic">
              * Aquí van ejemplos reales del contenido de FRESA FIT
            </p>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── Por qué tiene sentido ── */}
        <section className="section-padding bg-brand-black">
          <AnimateOnScroll className="container-custom">
            {/* Label */}
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-6">
              POR QU&Eacute; TIENE SENTIDO
            </p>

            {/* Title */}
            <h2 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white/15 mb-4">
              LO QUE TE CUESTA
              <br />
              RESOLVERLO SOLO
            </h2>

            {/* Subtitle */}
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light max-w-2xl mb-12">
              Si hoy intentaras construir esto por tu cuenta, esto es lo que pagarías por pieza:
            </p>

            {/* Price comparison rows */}
            <div className="max-w-3xl flex flex-col gap-0 mb-10">
              {[
                { service: "Fotógrafo de producto por sesión", price: "$3,500 – $8,000", icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg> },
                { service: "Editor de video por pieza", price: "$1,500 – $4,000", icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
                { service: "Diseñador gráfico por pieza", price: "$800 – $2,500", icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg> },
                { service: "Director creativo con criterio de paid media", price: "No lo encuentras fácil", highlight: true, icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> },
              ].map(({ service, price, highlight, icon }, i) => (
                <div key={service} className={`group flex items-center gap-4 py-5 px-5 border-b border-white/10 ${i === 0 ? "border-t" : ""} hover:bg-white/[0.02] transition-colors`}>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/40 group-hover:text-brand-beige group-hover:border-brand-beige/30 transition-colors">
                    {icon}
                  </div>
                  <span className="font-montserrat text-sm md:text-base text-gray-300 flex-1">{service}</span>
                  <span className={`font-barlow font-bold text-sm md:text-base shrink-0 ${highlight ? "text-red-400/70 italic" : "text-red-400"}`}>{price}</span>
                </div>
              ))}
            </div>

            {/* Our price card */}
            <div className="max-w-3xl border border-brand-beige/30 rounded-2xl p-8 md:p-12 text-center bg-white/[0.02]">
              <p className="font-barlow font-black text-5xl sm:text-6xl md:text-7xl text-brand-beige leading-none mb-4">
                -$500
              </p>
              <p className="font-montserrat text-sm md:text-base text-gray-400 font-light">
                Con nosotros, menos de $500 por pieza.
              </p>
              <p className="font-montserrat text-sm md:text-base text-gray-400 font-light">
                Con dirección creativa, estrategia y criterio de ads incluidos.
              </p>
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        {/* ── Elige tu nivel ── */}
        <section id="paquetes" className="section-padding bg-brand-gray">
          <AnimateOnScroll className="container-custom">
            {/* Label */}
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-16">
              ELIGE TU NIVEL
            </p>

            {/* Subtitle */}
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center max-w-2xl mx-auto mb-14">
              Todo listo para paid media y orgánico. Derechos de uso incluidos en todos los paquetes.
            </p>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Tier 01 — Presencia */}
              <div className="relative bg-brand-black border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col hover:border-white/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-2">TIER 01</p>
                <h3 className="font-barlow font-black text-3xl md:text-4xl text-white uppercase mb-4">PRESENCIA</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-barlow font-black text-4xl md:text-5xl text-white">$4,900</span>
                  <span className="font-montserrat text-sm text-gray-500">/mes</span>
                </div>
                <p className="font-montserrat text-xs text-gray-500 line-through mb-1">Valor por separado: $8,200</p>
                <p className="font-montserrat text-xs text-brand-beige mb-6">8 piezas · $612 por pieza</p>

                <div className="h-px bg-white/10 mb-6" />

                {/* Imágenes */}
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-4">— IM&Aacute;GENES —</p>
                <div className="flex flex-col gap-2.5 mb-6">
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Fotografía profesional de marca</span><span className="font-montserrat text-sm text-white/50">×3</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Composición visual avanzada</span><span className="font-montserrat text-sm text-white/50">×2</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Imagen lifestyle editada</span><span className="font-montserrat text-sm text-white/50">×1</span></div>
                </div>

                {/* Videos */}
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-4">— VIDEOS —</p>
                <div className="flex flex-col gap-2.5 mb-8">
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Video UGC con dirección creativa</span><span className="font-montserrat text-sm text-white/50">×2</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Video ad de respuesta directa</span><span className="font-montserrat text-sm text-white/50">×1</span></div>
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-2 mb-8">
                  <p className="font-montserrat text-xs text-gray-400">✓ Brief creativo mensual</p>
                  <p className="font-montserrat text-xs text-gray-400">✓ Derechos para ads y orgánico</p>
                </div>

                <button onClick={open} className="mt-auto w-full bg-brand-beige text-brand-black font-barlow font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl hover:bg-brand-beige-light hover:scale-[1.01] transition-all">
                  Quiero este →
                </button>
              </div>

              {/* Tier 02 — Autoridad (highlighted) */}
              <div
                className="relative bg-brand-black border-2 border-brand-beige rounded-2xl p-6 md:p-8 flex flex-col"
                style={{
                  boxShadow: "0 0 15px rgba(200,157,105,0.15), 0 0 40px rgba(200,157,105,0.08), inset 0 0 20px rgba(200,157,105,0.03)",
                }}
              >
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase bg-brand-beige text-brand-black font-bold px-4 py-1.5 rounded-full">
                    EL M&Aacute;S ELEGIDO
                  </span>
                </div>

                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-2">TIER 02</p>
                <h3 className="font-barlow font-black text-3xl md:text-4xl text-white uppercase mb-4">AUTORIDAD</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-barlow font-black text-4xl md:text-5xl text-white">$9,900</span>
                  <span className="font-montserrat text-sm text-gray-500">/mes</span>
                </div>
                <p className="font-montserrat text-xs text-gray-500 line-through mb-1">Valor por separado: $19,400</p>
                <p className="font-montserrat text-xs text-brand-beige mb-6">18 piezas · $550 por pieza</p>

                <div className="h-px bg-white/10 mb-6" />

                {/* Imágenes */}
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-4">— IM&Aacute;GENES —</p>
                <div className="flex flex-col gap-2.5 mb-6">
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Fotografía profesional de marca</span><span className="font-montserrat text-sm text-white/50">×4</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Fotografía lifestyle editada</span><span className="font-montserrat text-sm text-white/50">×2</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Composición visual avanzada</span><span className="font-montserrat text-sm text-white/50">×4</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Gráfica de marca para campañas</span><span className="font-montserrat text-sm text-white/50">×2</span></div>
                </div>

                {/* Videos */}
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-4">— VIDEOS —</p>
                <div className="flex flex-col gap-2.5 mb-8">
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Video UGC con dirección creativa</span><span className="font-montserrat text-sm text-white/50">×3</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Video ad de respuesta directa</span><span className="font-montserrat text-sm text-white/50">×2</span></div>
                  <div className="flex justify-between"><span className="font-montserrat text-sm text-gray-300">Video testimonial o demo producido</span><span className="font-montserrat text-sm text-white/50">×1</span></div>
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-2 mb-8">
                  <p className="font-montserrat text-xs text-gray-400">✓ Estrategia de contenido mensual</p>
                  <p className="font-montserrat text-xs text-gray-400">✓ Revisiones hasta aprobación</p>
                  <p className="font-montserrat text-xs text-gray-400">✓ Derechos ilimitados</p>
                </div>

                <button onClick={open} className="mt-auto w-full bg-brand-beige text-brand-black font-barlow font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl hover:bg-brand-beige-light hover:scale-[1.01] transition-all">
                  Quiero este →
                </button>
              </div>

              {/* Tier 03 — Dominación */}
              <div className="relative bg-brand-black border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col hover:border-white/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-2">TIER 03</p>
                <h3 className="font-barlow font-black text-3xl md:text-4xl text-white uppercase mb-4">DOMINACI&Oacute;N</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-barlow font-black text-4xl md:text-5xl text-white">$18,900</span>
                  <span className="font-montserrat text-sm text-gray-500">/mes</span>
                </div>
                <p className="font-montserrat text-xs text-gray-500 line-through mb-1">Valor por separado: $38,000+</p>
                <p className="font-montserrat text-xs text-brand-beige mb-6">30 piezas · $630 por pieza</p>

                <div className="h-px bg-white/10 mb-6" />

                {/* Imágenes */}
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-4">— IM&Aacute;GENES —</p>
                <div className="flex flex-col gap-2.5 mb-6">
                  <span className="font-montserrat text-sm text-gray-300">Fotografía profesional de marca</span>
                  <span className="font-montserrat text-sm text-gray-300">Fotografía lifestyle editada</span>
                  <span className="font-montserrat text-sm text-gray-300">Composición visual avanzada</span>
                  <span className="font-montserrat text-sm text-gray-300">Gráfica de marca para campañas</span>
                </div>

                {/* Videos */}
                <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-4">— VIDEOS —</p>
                <div className="flex flex-col gap-2.5 mb-8">
                  <span className="font-montserrat text-sm text-gray-300">Video UGC con dirección creativa</span>
                  <span className="font-montserrat text-sm text-gray-300">Video ad de respuesta directa</span>
                  <span className="font-montserrat text-sm text-gray-300">Video testimonial o demo producido</span>
                  <span className="font-montserrat text-sm text-gray-300">Video lifestyle cinematográfico</span>
                  <span className="font-montserrat text-sm text-gray-300">Video de alta producción</span>
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-2 mb-8">
                  <p className="font-montserrat text-xs text-gray-400">✓ Estrategia + calendario editorial</p>
                  <p className="font-montserrat text-xs text-gray-400">✓ Sesiones de alineación mensual</p>
                  <p className="font-montserrat text-xs text-gray-400">✓ Revisiones ilimitadas por fases</p>
                  <p className="font-montserrat text-xs text-gray-400">✓ Derechos totales y exclusivos</p>
                </div>

                <button onClick={open} className="mt-auto w-full bg-brand-beige text-brand-black font-barlow font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl hover:bg-brand-beige-light hover:scale-[1.01] transition-all">
                  Quiero este →
                </button>
              </div>
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

        <SectionDivider />
        {/* ── Siguiente paso ── */}
        <section className="section-padding bg-brand-black">
          <AnimateOnScroll className="container-custom text-center">
            {/* Label */}
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-8">
              SIGUIENTE PASO
            </p>

            {/* Title */}
            <h2 className="font-barlow font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight mb-10">
              <span className="text-white/10">TU MARCA NO</span>
              <br />
              <span className="text-white/10">TIENE CONTENIDO</span>
              <br />
              <span className="text-white/10">QUE </span>
              <span className="text-brand-beige">VENDE</span>
              <span className="text-white/10"> — O</span>
              <br />
              <span className="text-white/10">NO LO TIENE.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-montserrat text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto mb-10">
              Un mensaje y arrancamos. Sin formularios, sin procesos largos.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/526621000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-barlow font-bold text-base uppercase tracking-wide px-10 py-4 rounded-xl hover:bg-[#20bd5a] hover:scale-[1.02] transition-all animate-pulse-subtle"
              style={{ boxShadow: "0 0 20px rgba(37,211,102,0.3), 0 0 50px rgba(37,211,102,0.15)" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              ESCRIBIR POR WHATSAPP
            </a>
          </AnimateOnScroll>
        </section>
      </main>
      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
