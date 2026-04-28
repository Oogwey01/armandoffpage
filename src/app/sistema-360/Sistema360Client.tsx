"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/common/Header";
import QualificationForm from "@/components/form/QualificationForm";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { Sistema360Hub } from "@/components/sections/Sistema360Hub";
import { useFormModal } from "@/hooks/useFormModal";
import { CloseIcon } from "@/components/common/Icons";

const FooterContent = dynamic(
  () =>
    import("@/components/layout/FooterContent").then((m) => ({
      default: m.FooterContent,
    })),
  { ssr: false }
);

function AnimateOnScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(200,157,105,0.3) 30%, rgba(200,157,105,0.3) 70%, transparent)",
      }}
    />
  );
}

const PROOF_STATS = [
  { value: "$30M+", label: "Vendidos en Mercado Libre" },
  { value: "$5M+", label: "Invertidos en Meta Ads" },
  { value: "+4,000", label: "Ventas en TikTok Shop" },
  { value: "Platinum", label: "MercadoLíder" },
];

const FAQS = [
  {
    q: "¿Tomo los 3 o uno solo?",
    a: "Arrancas por la pieza más urgente. Cada eje funciona por separado, pero los tres se potencian cuando trabajan juntos.",
  },
  {
    q: "¿Hay paquetes combinados?",
    a: "Sí. En el diagnóstico armamos el tuyo según el momento y la urgencia de tu operación.",
  },
  {
    q: "¿Cómo se conectan entre sí?",
    a: "El CRM consume data de los ads, el contenido alimenta los ads, y los marketplaces son el canal de venta final. Es un solo flujo, no piezas sueltas.",
  },
  {
    q: "¿Cuánto tarda en verse resultados?",
    a: "Variable: contenido y ads se nota en 30–60 días, CRM en 2–4 semanas, marketplaces depende del catálogo. En el diagnóstico te damos un timeline realista.",
  },
];

export default function Sistema360Client() {
  const { isOpen, open, close } = useFormModal();

  return (
    <>
      <ScrollProgress />
      <Header
        onOpenForm={open}
        cta={{ label: "Ver ejes", href: "#ejes" }}
      />
      <main className="relative bg-brand-black min-h-screen">
        {/* ── HERO compacto ── */}
        <section className="relative pt-32 pb-16 sm:pt-36 md:pt-40 md:pb-24 overflow-hidden">
          {/* Fondo: orbs + dot pattern */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "600px",
                height: "600px",
                top: "-15%",
                left: "-10%",
                background:
                  "radial-gradient(ellipse, rgba(200,157,105,0.18) 0%, transparent 70%)",
                filter: "blur(70px)",
              }}
              animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "500px",
                height: "500px",
                bottom: "-10%",
                right: "-5%",
                background:
                  "radial-gradient(ellipse, rgba(200,157,105,0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
              animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.07) 1px, transparent 0)",
                backgroundSize: "36px 36px",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 70%)",
                maskImage:
                  "radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-brand-beige/30 bg-brand-beige/5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-beige animate-pulse" />
              <p className="font-montserrat text-brand-beige text-[11px] uppercase tracking-[0.3em] font-bold">
                Sistema 360
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white max-w-5xl mx-auto mb-6"
            >
              UN SISTEMA COMPLETO PARA{" "}
              <span className="text-brand-beige">ESCALAR TU MARCA.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-montserrat text-gray-300 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide"
            >
              Marketing & Marketplaces, Contenido & Ads, y CRM a la medida.
              Tres piezas que funcionan solas y se potencian juntas.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
            >
              {[
                "$30M+ en marketplaces",
                "$5M+ en Meta Ads",
                "CRM a la medida",
              ].map((pill) => (
                <span
                  key={pill}
                  className="font-montserrat text-xs sm:text-sm font-bold text-white/90 bg-white/5 border border-white/10 rounded-full px-4 py-2 tracking-wide"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <a
                href="#ejes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-beige px-8 py-4 font-barlow font-bold text-sm uppercase tracking-widest text-brand-black hover:bg-brand-beige-light hover:scale-[1.03] transition-all duration-200"
              >
                <span>Ver los 3 ejes</span>
                <span aria-hidden="true">↓</span>
              </a>
              <button
                type="button"
                onClick={open}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-beige px-8 py-4 font-barlow font-bold text-sm uppercase tracking-widest text-brand-beige hover:bg-brand-beige hover:text-brand-black transition-colors duration-200"
              >
                <span>Agendar diagnóstico</span>
              </button>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ── 3 EJES (corazón) ── */}
        <Sistema360Hub />

        <SectionDivider />

        {/* ── PROOF BAR ── */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-14 md:py-16 bg-brand-black overflow-hidden">
          <AnimateOnScroll className="container-custom">
            <p className="font-montserrat font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-3">
              Resultados reales
            </p>
            <h2 className="font-barlow font-black text-2xl sm:text-3xl md:text-4xl uppercase leading-tight tracking-tight text-white text-center mb-10 md:mb-12">
              OPERADORES, NO TEÓRICOS.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {PROOF_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 text-center hover:border-brand-beige/30 transition-colors duration-300"
                >
                  <p className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl text-brand-beige leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-light tracking-wide leading-snug">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />

        {/* ── CÓMO SE CONECTAN (FAQ corta) ── */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
          <AnimateOnScroll className="container-custom">
            <p className="font-montserrat font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4">
              Cómo se conectan
            </p>
            <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white text-center mb-3 max-w-3xl mx-auto">
              UN SOLO FLUJO,{" "}
              <span className="text-brand-beige">NO PIEZAS SUELTAS.</span>
            </h2>
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center mb-10 md:mb-12 max-w-2xl mx-auto tracking-wide">
              Las dudas más comunes antes de elegir por dónde arrancar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
              {FAQS.map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-brand-beige/25 transition-colors duration-300"
                >
                  <p className="font-barlow font-bold text-base sm:text-lg text-white mb-2 tracking-tight">
                    {faq.q}
                  </p>
                  <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed tracking-wide">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />

        {/* ── ¿Es para ti? unificado ── */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
          <AnimateOnScroll className="container-custom">
            <p className="font-montserrat font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4">
              &iquest;ES PARA TI?
            </p>
            <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white text-center mb-10 md:mb-12">
              TRABAJAMOS CON MARCAS QUE VAN EN{" "}
              <span className="text-brand-beige">SERIO.</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {/* Sí */}
              <div className="bg-white/[0.02] border border-brand-beige/30 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-beige/20 bg-brand-beige/[0.04]">
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase bg-brand-beige text-brand-black px-2.5 py-1 rounded-full">
                    SÍ
                  </span>
                  <p className="font-montserrat font-bold text-sm tracking-[0.2em] uppercase text-brand-beige">
                    ES PARA TI
                  </p>
                </div>
                <ul className="divide-y divide-white/5">
                  {[
                    {
                      label: "Producto validado",
                      desc: "Ya tienes ventas y quieres escalar con sistema, no con parches",
                    },
                    {
                      label: "Buscas operadores",
                      desc: "Quieres trabajar con quien ya invirtió su propio dinero, no con teóricos",
                    },
                    {
                      label: "Visión de inversión",
                      desc: "Entiendes que contenido, ads y CRM son inversión, no gasto",
                    },
                    {
                      label: "Marca con ambición",
                      desc: "Quieres que tu operación se vea como lo que realmente es",
                    },
                  ].map(({ label, desc }) => (
                    <li
                      key={label}
                      className="flex items-start gap-3 px-5 py-4"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-beige/15 border border-brand-beige/40 text-brand-beige shrink-0 mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M5 12l5 5L20 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="font-montserrat font-bold text-sm text-white mb-0.5 tracking-wide">
                          {label}
                        </p>
                        <p className="font-montserrat text-sm text-gray-400 font-light leading-snug tracking-wide">
                          {desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* No */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                  <span className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase bg-white/10 text-gray-400 px-2.5 py-1 rounded-full">
                    NO
                  </span>
                  <p className="font-montserrat font-bold text-sm tracking-[0.2em] uppercase text-gray-400">
                    ES PARA TI
                  </p>
                </div>
                <ul className="divide-y divide-white/5">
                  {[
                    {
                      label: "Buscas lo más barato",
                      desc: "Quieres ahorrar más que invertir en sistema",
                    },
                    {
                      label: "Sin claridad de marca",
                      desc: "No tienes clara tu propuesta de valor ni a quién le vendes",
                    },
                    {
                      label: "Esperas resultados sin proceso",
                      desc: "No estás dispuesto a un trabajo sostenido mes con mes",
                    },
                  ].map(({ label, desc }) => (
                    <li
                      key={label}
                      className="flex items-start gap-3 px-5 py-4"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-gray-500 shrink-0 mt-0.5">
                        <CloseIcon className="w-3 h-3" />
                      </span>
                      <div className="flex-1">
                        <p className="font-montserrat font-bold text-sm text-gray-300 mb-0.5 tracking-wide">
                          {label}
                        </p>
                        <p className="font-montserrat text-sm text-gray-500 font-light leading-snug tracking-wide">
                          {desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />

        {/* ── CTA cierre ── */}
        <section
          id="diagnostico"
          className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-brand-black overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "700px",
                height: "500px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(ellipse, rgba(200,157,105,0.18) 0%, transparent 70%)",
                filter: "blur(70px)",
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <AnimateOnScroll className="relative z-10 container-custom text-center">
            <p className="font-montserrat font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-4">
              Siguiente paso
            </p>
            <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-tight text-white mb-5 max-w-3xl mx-auto">
              ARRANQUEMOS POR LA{" "}
              <span className="text-brand-beige">PIEZA MÁS URGENTE.</span>
            </h2>
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light mb-10 max-w-xl mx-auto tracking-wide">
              En 30 minutos identificamos por dónde empezar — sin compromiso.
            </p>
            <motion.button
              type="button"
              onClick={open}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 36px 6px rgba(200,157,105,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full bg-brand-beige px-10 py-4 font-barlow text-sm font-bold uppercase tracking-widest text-brand-black [will-change:transform]"
            >
              <span>Agendar diagnóstico gratuito</span>
              <span aria-hidden="true">→</span>
            </motion.button>
          </AnimateOnScroll>
        </section>
      </main>

      <FooterContent
        leadMagnet={{
          eyebrow: "Lead magnet gratuito",
          title: "Diagnóstico Sistema 360",
          description:
            "Recibe el checklist con las 12 preguntas que usamos para identificar por qué eje del sistema te conviene arrancar — y qué métricas mover primero.",
          buttonLabel: "Recibir checklist Sistema 360",
        }}
      />
      <FloatingActions />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
