"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  ANIMATION_EASE,
  staggerContainer,
  staggerItem,
} from "@/lib/animations/variants";

interface HeroContentProps {
  // Ruta al video de fondo (opcional — si no existe se usa el fallback)
  videoSrc?: string;
  // Imagen de fallback mientras carga el video o si falla
  posterSrc?: string;
  // Handler del CTA principal
  onCtaClick?: () => void;
  // Destino del scroll interno — por defecto #paquetes
  ctaHref?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

// Líneas del título — se animan con stagger
const TITLE_LINES = [
  { text: "EL CONTENIDO QUE NECESITAS", accent: false },
  { text: "PARA VENDER MÁS.", accent: true },
] as const;

export function HeroContent({
  videoSrc = "/videos/hero-content.mp4",
  posterSrc = "/images/hero-content-poster.jpg",
  onCtaClick,
  ctaHref = "#paquetes",
}: HeroContentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Observer para pausar el video cuando no está visible y solo cargarlo en viewport
  const { ref: videoObserverRef, isVisible: videoInView } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.1,
      triggerOnce: false,
    });

  // Fade del scroll indicator conforme el usuario baja
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Lazy load: solo asignamos el src cuando el hero entra al viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoInView) return;

    if (!video.src && videoSrc) {
      video.src = videoSrc;
      video.load();
    }

    video.play().catch(() => {
      // Autoplay bloqueado — el poster se mantiene visible
    });

    return () => {
      video.pause();
    };
  }, [videoInView, videoSrc]);

  // Ripple effect en el CTA
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
      ref={sectionRef}
      aria-label="Hero — Sistema creativo para vender más"
      className="relative pt-24 md:pt-32 pb-8 md:pb-16 overflow-hidden min-h-[auto] md:min-h-[85vh] flex items-center"
    >
      {/* ── Background video con fallback a imagen ── */}
      <div
        ref={videoObserverRef}
        aria-hidden="true"
        className="absolute inset-0 z-0"
      >
        {/* Poster fallback — visible hasta que el video pueda reproducir */}
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          onCanPlay={() => setVideoReady(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
        {/* Overlay oscuro — garantiza legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/60 to-brand-black/90" />
        {/* Orb dorado sutil centrado */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "600px",
            height: "400px",
            top: "10%",
            left: "50%",
            x: "-50%",
            background:
              "radial-gradient(ellipse, rgba(200,157,105,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Contenido principal ── */}
      <div className="relative z-10 container-custom text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: ANIMATION_EASE }}
          className="flex justify-center mb-3 md:mb-5"
        >
          <span className="relative inline-block font-montserrat uppercase tracking-[0.3em] text-xs sm:text-sm text-brand-beige px-4 py-1.5">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-sm bg-gradient-to-r from-brand-beige/0 via-brand-beige/25 to-brand-beige/0 backdrop-blur-[2px]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-brand-beige/50 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-beige/50 to-transparent"
            />
            Sistema Creativo Probado
          </span>
        </motion.div>

        {/* Título con stagger por línea */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight mb-4 md:mb-5"
        >
          {TITLE_LINES.map((line, index) => (
            <motion.span
              key={line.text}
              variants={staggerItem}
              className="block"
            >
              {line.accent ? (
                <span className="bg-gradient-to-r from-brand-beige via-brand-beige-light to-brand-beige bg-clip-text text-transparent">
                  {/* Keyword en Akira para reforzar jerarquía */}
                  PARA <span className="font-akira">VENDER</span> MÁS.
                </span>
              ) : (
                <span className="text-white">
                  EL <span className="font-akira text-white">CONTENIDO</span>{" "}
                  QUE NECESITAS
                </span>
              )}
              {/* Solo por accesibilidad — lectores de pantalla leen el texto original */}
              <span className="sr-only">{line.text}</span>
              {index === 0 ? " " : null}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: ANIMATION_EASE }}
          className="font-montserrat text-base md:text-lg text-gray-300 font-light max-w-xl mx-auto mb-6 md:mb-10"
        >
          El mismo sistema creativo que usamos para construir FRESA FIT,
          aplicado a tu marca en Hermosillo.
        </motion.p>

        {/* CTA premium con ripple + glow + arrow animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: ANIMATION_EASE }}
          className="flex justify-center mb-8 md:mb-12"
        >
          <motion.a
            href={ctaHref}
            onClick={handleCtaClick}
            aria-label="Ver paquetes de contenido disponibles"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 32px 4px rgba(200,157,105,0.55)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: ANIMATION_EASE }}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-beige px-6 py-2.5 font-barlow text-xs md:text-sm font-bold uppercase tracking-widest text-brand-black border-2 border-brand-beige hover:border-brand-beige-light [will-change:transform]"
          >
            {/* Ripples renderizados dinámicamente */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full bg-white/40 animate-[ripple_0.7s_ease-out]"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
            <span className="relative z-10">Ver paquetes</span>
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 text-sm"
            >
              ↓
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Scroll indicator con fade según scroll */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-brand-beige/60 text-xl"
          >
            ↓
          </motion.span>
          <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-white/40">
            Seguir leyendo
          </span>
        </motion.div>
      </div>

      {/* Keyframes del ripple — inyectados inline para no tocar tailwind.config */}
      <style jsx>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 0.6;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
