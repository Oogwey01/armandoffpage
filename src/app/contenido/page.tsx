"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/common/Header";
import QualificationForm from "@/components/form/QualificationForm";
import { HeroContent } from "@/components/sections/HeroContent";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { FloatingActions } from "@/components/ui/FloatingActions";
import {
  StatsSkeleton,
  BrandLogosSkeleton,
  CaseStudiesSkeleton,
  PricingSkeleton,
} from "@/components/ui/Skeletons";
import { useFormModal } from "@/hooks/useFormModal";

// ── Dynamic imports para below-fold — reduce JS inicial ──
const StatsSection = dynamic(
  () =>
    import("@/components/sections/StatsSection").then((m) => ({
      default: m.StatsSection,
    })),
  { loading: () => <StatsSkeleton />, ssr: false }
);
const BrandLogos = dynamic(
  () =>
    import("@/components/sections/BrandLogos").then((m) => ({
      default: m.BrandLogos,
    })),
  { loading: () => <BrandLogosSkeleton />, ssr: false }
);
const CaseStudies = dynamic(
  () =>
    import("@/components/sections/CaseStudies").then((m) => ({
      default: m.CaseStudies,
    })),
  { loading: () => <CaseStudiesSkeleton />, ssr: false }
);
const PricingComparison = dynamic(
  () =>
    import("@/components/sections/PricingComparison").then((m) => ({
      default: m.PricingComparison,
    })),
  { loading: () => <PricingSkeleton />, ssr: false }
);
const FooterContent = dynamic(
  () =>
    import("@/components/layout/FooterContent").then((m) => ({
      default: m.FooterContent,
    })),
  { ssr: false }
);
import { CloseIcon } from "@/components/common/Icons";

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
      <ScrollProgress />
      <Header onOpenForm={open} />
      <main className="bg-brand-black min-h-screen">
        {/* Hero section */}
        <HeroContent ctaHref="#paquetes" />
        <SectionDivider />
        {/* ── El problema real ── */}
        <section className="py-10 md:py-16 bg-black">
          <div className="container-custom px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="font-montserrat text-brand-beige text-xs md:text-sm uppercase tracking-[0.3em] mb-3 text-center"
            >
              El problema real
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-akira text-3xl md:text-5xl lg:text-6xl text-center mb-3 leading-tight max-w-5xl mx-auto"
            >
              <span className="text-white">&iquest;PRODUCTO EXITOSO?</span>
              <br />
              <span className="text-brand-beige">
                ESC&Aacute;LALO AL SIGUIENTE NIVEL:
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-montserrat text-zinc-400 text-center text-lg md:text-xl mb-8 md:mb-10 max-w-3xl mx-auto font-light"
            >
              Y eso te está costando clientes todos los días sin que te des cuenta
            </motion.p>

            <div className="grid md:grid-cols-2 gap-3 md:gap-5 max-w-5xl mx-auto">
              {[
                "Tu competencia se ve más profesional aunque su producto sea inferior al tuyo",
                "Estás invirtiendo en publicidad con material que no convierte",
                "Cada mes improvisas el contenido sin una estrategia clara detrás",
                "No tienes el equipo ni el criterio para producir contenido que realmente venda",
              ].map((problem, index) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-0.5 bg-zinc-800 mt-3 group-hover:bg-brand-beige/50 transition-colors duration-300" />
                    <p className="font-montserrat text-zinc-400 text-base md:text-lg leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                      {problem}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />
        <StatsSection />
        <SectionDivider />
        <BrandLogos />
        <SectionDivider />
        <CaseStudies />

        <SectionDivider />
        {/* ── Por qué tiene sentido ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
          <AnimateOnScroll className="container-custom">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4">
              POR QU&Eacute; TIENE SENTIDO
            </p>

            <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white text-center mb-3">
              LO QUE TE CUESTA{" "}
              <span className="text-brand-beige">RESOLVERLO SOLO</span>
            </h2>

            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center mb-10 md:mb-12 max-w-2xl mx-auto">
              Si hoy intentaras construir esto por tu cuenta, esto es lo que pagarías por pieza.
            </p>

            {/* Comparación simétrica 50/50 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {/* Por separado */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                  <span className="font-barlow font-bold text-[10px] tracking-[0.3em] uppercase bg-red-500/15 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full">
                    POR SEPARADO
                  </span>
                  <p className="font-barlow font-bold text-sm tracking-[0.2em] uppercase text-gray-400">
                    FREELANCERS
                  </p>
                </div>
                <ul className="divide-y divide-white/5">
                  {[
                    { service: "Fotógrafo de producto", price: "$3,500 – $8,000" },
                    { service: "Editor de video", price: "$1,500 – $4,000" },
                    { service: "Diseñador gráfico", price: "$800 – $2,500" },
                    { service: "Director creativo con criterio de ads", price: "Difícil de encontrar", highlight: true },
                  ].map(({ service, price, highlight }) => (
                    <li key={service} className="flex items-center gap-3 px-5 py-4">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 shrink-0">
                        <CloseIcon className="w-3 h-3" />
                      </span>
                      <p className="font-barlow font-bold text-sm text-gray-300 flex-1">{service}</p>
                      <span className={`font-barlow font-bold text-sm shrink-0 ${highlight ? "text-red-400/70 italic" : "text-red-400"}`}>
                        {price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Con nosotros */}
              <div className="bg-white/[0.02] border border-brand-beige/30 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-beige/20 bg-brand-beige/[0.04]">
                  <span className="font-barlow font-bold text-[10px] tracking-[0.3em] uppercase bg-brand-beige text-brand-black px-2.5 py-1 rounded-full">
                    CON NOSOTROS
                  </span>
                  <p className="font-barlow font-bold text-sm tracking-[0.2em] uppercase text-brand-beige">
                    TODO INCLUIDO
                  </p>
                </div>
                <div className="px-5 py-5 border-b border-white/5 flex items-baseline gap-3">
                  <p className="font-barlow font-black text-4xl sm:text-5xl text-brand-beige leading-none">
                    -$500
                  </p>
                  <p className="font-montserrat text-sm text-gray-400 font-light">
                    por pieza
                  </p>
                </div>
                <ul className="divide-y divide-white/5">
                  {[
                    "Dirección creativa estratégica",
                    "Producción y edición audiovisual",
                    "Diseño gráfico integrado",
                    "Criterio de paid media aplicado",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 px-5 py-4">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-beige/15 border border-brand-beige/40 text-brand-beige shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="font-barlow font-bold text-sm text-white flex-1">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        <SectionDivider />
        <PricingComparison onCta={open} />

        <SectionDivider />
        {/* ── ¿Es para ti? ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
          <AnimateOnScroll className="container-custom">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige text-center mb-4">
              &iquest;ES PARA TI?
            </p>

            <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white text-center mb-10 md:mb-12">
              TRABAJAMOS CON MARCAS QUE VAN EN{" "}
              <span className="text-brand-beige">SERIO.</span>
            </h2>

            {/* Comparación simétrica 50/50 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {/* Sí es para ti */}
              <div className="bg-white/[0.02] border border-brand-beige/30 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-beige/20 bg-brand-beige/[0.04]">
                  <span className="font-barlow font-bold text-[10px] tracking-[0.3em] uppercase bg-brand-beige text-brand-black px-2.5 py-1 rounded-full">
                    SÍ
                  </span>
                  <p className="font-barlow font-bold text-sm tracking-[0.2em] uppercase text-brand-beige">
                    ES PARA TI
                  </p>
                </div>
                <ul className="divide-y divide-white/5">
                  {[
                    { label: "Producto con tracción", desc: "Tienes un producto o servicio y quieres vender más" },
                    { label: "Inviertes en ads", desc: "Inviertes o quieres invertir en publicidad digital" },
                    { label: "Visión de inversión", desc: "Entiendes que el contenido es una inversión, no un gasto" },
                    { label: "Marca con ambición", desc: "Quieres que tu marca se vea como lo que realmente es" },
                  ].map(({ label, desc }) => (
                    <li key={label} className="flex items-start gap-3 px-5 py-4">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-beige/15 border border-brand-beige/40 text-brand-beige shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="font-barlow font-bold text-sm text-white mb-0.5">{label}</p>
                        <p className="font-montserrat text-sm text-gray-400 font-light leading-snug">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* No es para ti */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                  <span className="font-barlow font-bold text-[10px] tracking-[0.3em] uppercase bg-white/10 text-gray-400 px-2.5 py-1 rounded-full">
                    NO
                  </span>
                  <p className="font-barlow font-bold text-sm tracking-[0.2em] uppercase text-gray-400">
                    ES PARA TI
                  </p>
                </div>
                <ul className="divide-y divide-white/5">
                  {[
                    { label: "Buscas lo más barato", desc: "Quieres contenido sin criterio creativo detrás" },
                    { label: "Sin claridad de marca", desc: "No sabes qué ofreces ni a quién le vendes" },
                    { label: "Esperas resultados sin proceso", desc: "No te comprometes a un trabajo mensual sostenido" },
                  ].map(({ label, desc }) => (
                    <li key={label} className="flex items-start gap-3 px-5 py-4">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-gray-500 shrink-0 mt-0.5">
                        <CloseIcon className="w-3 h-3" />
                      </span>
                      <div className="flex-1">
                        <p className="font-barlow font-bold text-sm text-gray-300 mb-0.5">{label}</p>
                        <p className="font-montserrat text-sm text-gray-500 font-light leading-snug">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

      </main>
      <FooterContent />
      <FloatingActions />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
