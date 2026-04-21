"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { StaggerContainer, StaggerItem } from "@/components/animations";

type Category = "VENTAS" | "DATOS" | "AUTOMATIZACIÓN" | "INTEGRACIÓN";

interface ShowcaseModule {
  src: string;
  label: string;
  category: Category;
  title: string;
  description: string;
}

const MODULES: readonly ShowcaseModule[] = [
  {
    src: "/images/crms/showcase/01-pipeline.webp",
    label: "Pipeline de Ventas",
    category: "VENTAS",
    title: "Pipeline de Ventas",
    description:
      "Tablero kanban por etapa con tiempos, responsables y alertas de estancamiento.",
  },
  {
    src: "/images/crms/showcase/02-dashboard.webp",
    label: "Dashboard Ejecutivo",
    category: "DATOS",
    title: "Dashboard Ejecutivo",
    description:
      "KPIs de ventas, retención y CAC en tiempo real, segmentados por canal.",
  },
  {
    src: "/images/crms/showcase/03-automation.webp",
    label: "Automatización de Flujos",
    category: "AUTOMATIZACIÓN",
    title: "Automatización de Flujos",
    description:
      "Follow-ups, recuperación de carrito y alertas internas sin intervención manual.",
  },
  {
    src: "/images/crms/showcase/04-leads.webp",
    label: "Captura y Segmentación",
    category: "VENTAS",
    title: "Captura y Segmentación",
    description:
      "Formularios, landing y scoring automático para priorizar los leads correctos.",
  },
  {
    src: "/images/crms/showcase/05-reports.webp",
    label: "Reportes Personalizados",
    category: "DATOS",
    title: "Reportes Personalizados",
    description:
      "Reportes que responden tus preguntas reales, no los que vienen de fábrica.",
  },
  {
    src: "/images/crms/showcase/06-integrations.webp",
    label: "Integraciones",
    category: "INTEGRACIÓN",
    title: "Integraciones Nativas",
    description:
      "Shopify, Meta, WhatsApp y pasarelas de pago hablando el mismo idioma.",
  },
] as const;

function CRMShowcaseImage({ src, label }: { src: string; label: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-gray border border-dashed border-white/10 rounded-2xl">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-brand-beige/40"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="11" r="1.5" />
          <path d="m21 16-5-5-9 9" />
        </svg>
        <p className="font-barlow font-bold text-sm text-brand-beige/60 tracking-wide text-center px-4">
          {label}
        </p>
        <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-white/30">
          Imagen pendiente
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={label}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover"
      onError={() => setErrored(true)}
    />
  );
}

export function CRMShowcase() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
      <div className="container-custom">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-[#8f0000] flex-none" />
          <p className="font-montserrat text-white text-xs uppercase tracking-[0.3em]">
            Capacidades
          </p>
          <span className="h-px w-8 bg-[#8f0000] flex-none" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white text-center mb-4"
        >
          LO QUE UN CRM{" "}
          <span className="text-brand-beige">A TU MEDIDA</span>{" "}
          PUEDE HACER.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-montserrat text-sm md:text-base text-gray-400 font-light text-center mb-12 md:mb-14 max-w-2xl mx-auto"
        >
          Cada módulo se construye sobre tu operación real.
          Sin pagar por funciones que nunca vas a usar.
        </motion.p>

        {/* Grid de módulos */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          staggerDelay={0.1}
          delayChildren={0.2}
        >
          {MODULES.map((module) => (
            <StaggerItem key={module.src}>
              <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:border-brand-beige/25 hover:bg-white/[0.06] transition-all duration-300 h-full flex flex-col">
                {/* Imagen 16:9 */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-gray">
                  <CRMShowcaseImage src={module.src} label={module.label} />

                  {/* Badge de categoría */}
                  <span className="absolute top-3 left-3 z-10 font-barlow font-bold text-[10px] tracking-[0.3em] uppercase bg-brand-black/70 backdrop-blur-sm text-brand-beige border border-brand-beige/30 px-2.5 py-1 rounded-full">
                    {module.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="font-barlow font-bold text-lg text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
