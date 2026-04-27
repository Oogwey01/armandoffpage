"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Types ─────────────────────────────────────────────────────────── */

interface PlatformColumn {
  label: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface PlatformTab {
  id: string;
  label: string;
  logoSrc?: string;
  logoSrcs?: string[];
  logoAlt: string;
  badge: string;
  heading: string;
  description: string;
  color: string; // platform brand hex color
  columns: [PlatformColumn, PlatformColumn, PlatformColumn];
}

/* ── Data ───────────────────────────────────────────────────────────── */

const PLATFORM_TABS: PlatformTab[] = [
  {
    id: "meta-ads",
    label: "Meta Ads",
    logoSrc: "/images/logos/meta-ads.png",
    logoAlt: "Meta Ads",
    badge: "$5M+ invertidos",
    heading: "Publicidad que genera ventas reales",
    description:
      "Creamos y gestionamos tus campañas de Meta Ads con el mismo sistema que usamos para invertir más de $5M en nuestra propia marca. Estructura, optimización semanal y escalado rentable.",
    color: "#1877F2",
    columns: [
      { label: "Estructura" },
      { label: "Optimización semanal" },
      { label: "Escalado ROAS" },
    ],
  },
  {
    id: "pagina-web",
    label: "Página web",
    logoSrc: "/images/logos/Shopify-badge.png",
    logoSrcs: ["/images/logos/Shopify-badge.png", "/images/logos/tiendanube.svg"],
    logoAlt: "Página web",
    badge: "Embudo completo",
    heading: "Una página que convierte visitas en clientes",
    description:
      "Diseñamos tu página web optimizada para conversión, con embudo completo desde Meta Ads hasta la compra. Plataforma incluida.",
    color: "#95BF47",
    columns: [
      {
        label: "Diseño",
        imageSrc: "/images/Como_funciona/shopify01.png",
        imageAlt: "Diseño de tienda Shopify",
      },
      {
        label: "Embudo Meta→Web",
        imageSrc: "/images/Como_funciona/shopify02.png",
        imageAlt: "Embudo de Meta Ads a la tienda",
      },
      {
        label: "Plataforma incluida",
        imageSrc: "/images/Como_funciona/shopify03.png",
        imageAlt: "Panel de Shopify incluido",
      },
    ],
  },
  {
    id: "tiktok-shop",
    label: "TikTok Shop",
    logoSrc: "/images/logos/tiktok.webp",
    logoAlt: "TikTok Shop",
    badge: "+4,000 ventas generadas",
    heading: "Vende directo en TikTok Shop",
    description:
      "Configuramos y gestionamos tu tienda en TikTok Shop para generar ventas con GMV Max y afiliados. +4,000 ventas generadas con nuestra marca.",
    color: "#FE2C55",
    columns: [
      { label: "Configuración" },
      { label: "GMV Max" },
      { label: "Afiliados" },
    ],
  },
  {
    id: "mercado-libre",
    label: "Mercado Libre",
    logoSrc: "/images/logos/mercado-libre.png",
    logoAlt: "Mercado Libre",
    badge: "$30M+ facturados · Platinum",
    heading: "Captura la demanda en Mercado Libre",
    description:
      "Gestionamos tu cuenta de Mercado Libre con el sistema que nos llevó a MercadoLíder Platinum y $30M+ facturados. Publicaciones, Mercado Ads y reputación.",
    color: "#FFE600",
    columns: [
      { label: "Publicaciones" },
      { label: "Mercado Ads" },
      { label: "Reputación" },
    ],
  },
];

/* ── PlaceholderCard ────────────────────────────────────────────────── */

function PlaceholderCard({
  label,
  imageSrc,
  imageAlt,
}: {
  label: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Column label */}
      <span className="font-montserrat text-xs font-semibold text-white/50 uppercase tracking-widest text-center">
        {label}
      </span>
      {/* Card */}
      <div
        className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.07) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? label}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="font-montserrat text-xs text-white/20 select-none">
            Screenshot
          </span>
        )}
      </div>
    </div>
  );
}

/* ── EmailIcon ──────────────────────────────────────────────────────── */

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/70 shrink-0"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ── HowItWorks ─────────────────────────────────────────────────────── */

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<string>(PLATFORM_TABS[0].id);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);

  const activeTabData = PLATFORM_TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="como-funciona" className="section-padding relative">
      <div ref={sectionRef} className="container-custom">

        {/* ── Header ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#8f0000] flex-none" />
            <p className="font-montserrat text-white text-sm uppercase tracking-[0.3em]">
              Metodología probada
            </p>
            <span className="h-px w-10 bg-[#8f0000] flex-none" />
          </div>
          <h2 className="heading-lg text-white">COMO <span className="text-brand-beige">FUNCIONA</span></h2>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4" />
          <p className="body-text max-w-2xl mx-auto mt-6">
            Te ayudaremos a implementar un sistema de crecimiento completo basado en anuncios de Facebook, anuncios de TikTok, tienda de TikTok, optimización de la tasa de conversión de Shopify, correo electrónico/SMS y mucho más.
          </p>
        </motion.div>

        {/* ── Tab Bar ── */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          {PLATFORM_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 rounded-full px-4 py-2 font-montserrat text-sm min-h-[44px] transition-all duration-300 border font-medium"
                style={
                  isActive
                    ? {
                        backgroundColor: `${tab.color}1F`,
                        borderColor: tab.color,
                        color: tab.color,
                      }
                    : {
                        backgroundColor: "transparent",
                        borderColor: "rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.55)",
                      }
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: tab.color,
                    opacity: isActive ? 1 : 0.45,
                  }}
                />
                {tab.logoSrcs ? (
                  tab.logoSrcs.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt={tab.logoAlt}
                      width={16}
                      height={16}
                      className="object-contain shrink-0"
                    />
                  ))
                ) : tab.logoSrc ? (
                  <Image
                    src={tab.logoSrc}
                    alt={tab.logoAlt}
                    width={16}
                    height={16}
                    className="object-contain shrink-0"
                  />
                ) : (
                  <EmailIcon />
                )}
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mt-12 sm:mt-16"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="flex items-center gap-2 rounded-full px-4 py-1.5 font-montserrat text-sm border"
                style={{
                  backgroundColor: `${activeTabData.color}15`,
                  borderColor: `${activeTabData.color}50`,
                  color: activeTabData.color,
                }}
              >
                {activeTabData.logoSrc ? (
                  <Image
                    src={activeTabData.logoSrc}
                    alt={activeTabData.logoAlt}
                    width={16}
                    height={16}
                    className="object-contain shrink-0"
                  />
                ) : (
                  <EmailIcon />
                )}
                {activeTabData.badge}
              </span>
            </div>

            {/* Heading */}
            <h3 className="font-barlow font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight mb-4">
              {activeTabData.heading}
            </h3>

            {/* Description */}
            <p className="body-text max-w-xl mb-10">
              {activeTabData.description}
            </p>

            {/* 3-column card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {activeTabData.columns.map((col, i) => (
                <PlaceholderCard
                  key={i}
                  label={col.label}
                  imageSrc={col.imageSrc}
                  imageAlt={col.imageAlt}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
