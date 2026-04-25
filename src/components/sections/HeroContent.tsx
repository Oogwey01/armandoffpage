"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useState, type MouseEvent } from "react";
import {
  ANIMATION_EASE,
  staggerContainer,
  staggerItem,
} from "@/lib/animations/variants";

interface HeroContentProps {
  onCtaClick?: () => void;
  ctaHref?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const STAT_PILLS = [
  { num: "500+", label: "Piezas entregadas" },
  { num: "4.5×",   label: "ROAS promedio" },
  { num: "12+",  label: "Formatos" },
] as const;

export function HeroContent({
  onCtaClick,
  ctaHref = "#paquetes",
}: HeroContentProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  const handleCtaClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple: Ripple = {
        id: Date.now(),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 700);
      onCtaClick?.();
    },
    [onCtaClick]
  );

  return (
    <section
      aria-label="Hero — Sistema creativo para vender más"
      className="relative pt-28 sm:pt-36 md:pt-36 pb-14 md:pb-20 overflow-hidden flex items-center justify-center"
    >
      {/* ── Overlays ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "700px",
            height: "500px",
            top: "-15%",
            left: "-10%",
            background: "radial-gradient(ellipse, rgba(200,157,105,0.20) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "500px",
            height: "400px",
            bottom: "0%",
            right: "-5%",
            background: "radial-gradient(ellipse, rgba(176,138,85,0.15) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.07) 1px, transparent 0)",
            backgroundSize: "36px 36px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
          }}
        />
      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 w-full container-custom px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: ANIMATION_EASE }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-[#8f0000] flex-none" />
          <p className="font-montserrat text-white text-sm uppercase tracking-[0.3em]">
            Sistema Creativo Probado
          </p>
          <span className="h-px w-10 bg-[#8f0000] flex-none" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="font-barlow font-black uppercase tracking-tight leading-[0.95] mb-8"
        >
          <motion.span
            variants={staggerItem}
            className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            El contenido que
          </motion.span>
          <motion.span
            variants={staggerItem}
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-brand-beige via-brand-beige-light to-brand-beige bg-clip-text text-transparent"
          >
            vende más.
          </motion.span>
        </motion.h1>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: ANIMATION_EASE }}
          className="flex flex-wrap items-center justify-center gap-3 mb-7"
        >
          {STAT_PILLS.map(({ num, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2.5"
            >
              <span className="font-montserrat text-xl sm:text-2xl text-brand-beige leading-none">
                {num}
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="font-montserrat text-xs uppercase tracking-widest text-gray-400 leading-none">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: ANIMATION_EASE }}
          className="font-montserrat text-base sm:text-lg text-gray-300 max-w-lg mx-auto mb-8 tracking-wide"
        >
          El mismo sistema creativo con el que construimos FRESA FIT,
          aplicado a tu marca.
        </motion.p>

        {/* CTA + scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: ANIMATION_EASE }}
          className="flex flex-col items-center gap-5"
        >
          <motion.a
            href={ctaHref}
            onClick={handleCtaClick}
            aria-label="Ver paquetes de contenido disponibles"
            whileHover={{ scale: 1.04, boxShadow: "0 0 36px 6px rgba(200,157,105,0.45)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: ANIMATION_EASE }}
            className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-beige px-10 py-4 font-montserrat text-sm font-bold uppercase tracking-widest text-brand-black [will-change:transform]"
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full bg-white/40 animate-[ripple_0.7s_ease-out]"
                style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
              />
            ))}
            <span className="relative z-10">Ver paquetes</span>
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              ↓
            </motion.span>
          </motion.a>

          {/* Scroll indicator */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="flex flex-col items-center gap-1.5"
            aria-hidden="true"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-brand-beige/50 text-base"
            >
              ↓
            </motion.span>
            <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-white/25">
              Seguir leyendo
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Ripple keyframes */}
      <style jsx>{`
        @keyframes ripple {
          from { transform: scale(0); opacity: 0.6; }
          to   { transform: scale(1); opacity: 0;   }
        }
      `}</style>
    </section>
  );
}
