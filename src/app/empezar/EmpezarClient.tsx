"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { FloatingActions } from "@/components/ui/FloatingActions";
import HeroVideo from "@/components/sections/empezar/HeroVideo";
import FinalCTA from "@/components/sections/empezar/FinalCTA";
import { BrandLogos } from "@/components/sections/BrandLogos";
import { StatsSection } from "@/components/sections/StatsSection";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import Testimonials from "@/components/sections/Testimonials";

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Cookies", href: "/cookies" },
] as const;

export default function EmpezarClient() {
  const [isFormSpotlight, setIsFormSpotlight] = useState(false);

  const closeSpotlight = useCallback(() => setIsFormSpotlight(false), []);

  const handleSpotlightForm = useCallback(() => {
    setIsFormSpotlight(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  useEffect(() => {
    if (!isFormSpotlight) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSpotlight();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFormSpotlight, closeSpotlight]);

  return (
    <>
      <ScrollProgress />

      {/* Header minimalista — solo logo, sin nav */}
      <header className="absolute top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 pt-4">
        <div className="container-custom flex items-center justify-center">
          <a href="/" aria-label="Armando FF — Inicio" className="flex-shrink-0">
            <Image
              src="/images/logos/logo_dorado.png"
              alt="Armando FF"
              height={40}
              width={160}
              priority
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </a>
        </div>
      </header>

      <main className="relative bg-brand-black min-h-screen">
        {/* Fondo único continuo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/backgrounds/backgroundFULL.webp')",
            backgroundSize: "100% 100%",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand-black/40 pointer-events-none"
        />

        <div className="relative z-10">
          {/* 1. Hero: video + formulario en 2 columnas (desktop) */}
          <HeroVideo highlight={isFormSpotlight} />

          {/* 2. Logos de plataformas */}
          <BrandLogos />

          {/* 3. Stats */}
          <StatsSection />

          {/* 4. Casos / qué hacemos en video */}
          <VideoShowcase />

          {/* 5. Testimonios */}
          <Testimonials />

          {/* 6. CTA final → scroll al form */}
          <FinalCTA />
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="relative bg-brand-black border-t border-white/10 py-8 px-4 sm:px-6">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-montserrat text-xs text-white/50">
            © {new Date().getFullYear()} Armando FF. Todos los derechos
            reservados.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-montserrat text-xs text-white/50 hover:text-brand-beige transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <AnimatePresence>
        {isFormSpotlight && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeSpotlight}
            aria-label="Cerrar resaltado del formulario"
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm cursor-pointer"
          />
        )}
      </AnimatePresence>

      <FloatingActions onAction={handleSpotlightForm} />
    </>
  );
}
