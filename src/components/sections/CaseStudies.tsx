"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/content/AnimatedSection";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  brand: string;
  logo: string;
  industry: string;
  beforeImage: string;
  afterImage: string;
  metrics: Metric[];
  quote: string;
  author: string;
}

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  thumbnail: string;
  videoSrc: string;
}

// Casos mock — estructura lista para reemplazar por reales
const CASE_STUDIES: CaseStudy[] = [
  {
    id: "fresa-fit",
    brand: "FRESA FIT",
    logo: "/images/logos/logo_dorado.png",
    industry: "Fitness & Nutrición",
    beforeImage: "/images/prove/1st image.png",
    afterImage: "/images/prove/2nd image.png",
    metrics: [
      { label: "ROAS", value: "5.2x" },
      { label: "Alcance", value: "3.8M+" },
      { label: "Conv.", value: "+312%" },
    ],
    quote:
      "El sistema creativo transformó por completo cómo comunicamos la marca. En 4 meses triplicamos ventas con el mismo presupuesto.",
    author: "Equipo FRESA FIT",
  },
  {
    id: "marca-local-hmo",
    brand: "Marca Local HMO",
    logo: "/images/logos/logo_full.png",
    industry: "E-commerce Moda",
    beforeImage: "/images/prove/2nd image.png",
    afterImage: "/images/prove/3rd image.png",
    metrics: [
      { label: "ROAS", value: "4.1x" },
      { label: "Alcance", value: "1.2M+" },
      { label: "Conv.", value: "+185%" },
    ],
    quote:
      "Por primera vez tengo contenido que realmente convierte. Antes producíamos sin dirección, ahora cada pieza tiene un propósito claro.",
    author: "Fundador — Moda HMO",
  },
  {
    id: "d2c-suplementos",
    brand: "D2C Suplementos",
    logo: "/images/logos/logo_dorado.png",
    industry: "Wellness D2C",
    beforeImage: "/images/prove/3rd image.png",
    afterImage: "/images/prove/1st image.png",
    metrics: [
      { label: "ROAS", value: "3.9x" },
      { label: "Alcance", value: "890K+" },
      { label: "Conv.", value: "+142%" },
    ],
    quote:
      "Escalar no era cuestión de presupuesto, era de calidad creativa. Ahora tenemos un pipeline constante de contenido probado.",
    author: "CMO — Suplementos D2C",
  },
];

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "v1",
    name: "Ana L.",
    role: "Fundadora, FRESA FIT",
    thumbnail: "/images/prove/1st image.png",
    videoSrc: "/videos/testimonial-1.mp4",
  },
  {
    id: "v2",
    name: "Carlos M.",
    role: "CEO, Moda HMO",
    thumbnail: "/images/prove/2nd image.png",
    videoSrc: "/videos/testimonial-2.mp4",
  },
  {
    id: "v3",
    name: "Paola R.",
    role: "CMO, Suplementos D2C",
    thumbnail: "/images/prove/3rd image.png",
    videoSrc: "/videos/testimonial-3.mp4",
  },
  {
    id: "v4",
    name: "Miguel H.",
    role: "Director, E-commerce",
    thumbnail: "/images/prove/1st image.png",
    videoSrc: "/videos/testimonial-4.mp4",
  },
];

// Duración del autoplay del carrusel en ms
const AUTOPLAY_MS = 3500;

// Card interna que muestra un caso
function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {/* Antes / Después */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10">
          <Image
            src={study.beforeImage}
            alt={`${study.brand} — antes`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <span className="absolute top-3 left-3 rounded-full bg-brand-black/80 backdrop-blur-sm px-3 py-1 font-barlow text-[10px] font-bold uppercase tracking-widest text-white/80">
            Antes
          </span>
        </div>
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-brand-beige/40">
          <Image
            src={study.afterImage}
            alt={`${study.brand} — después`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <span className="absolute top-3 left-3 rounded-full bg-brand-beige px-3 py-1 font-barlow text-[10px] font-bold uppercase tracking-widest text-brand-black">
            Después
          </span>
        </div>
      </div>

      {/* Métricas + Quote */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-black/60 border border-white/10 shrink-0">
            <Image
              src={study.logo}
              alt={`${study.brand} logo`}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>
          <div>
            <p className="font-barlow font-black uppercase tracking-tight text-white text-lg">
              {study.brand}
            </p>
            <p className="font-montserrat text-xs text-gray-400">
              {study.industry}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/10 bg-brand-black/40 p-3 text-center"
            >
              <p className="font-barlow font-black text-2xl md:text-3xl text-brand-beige leading-none">
                {m.value}
              </p>
              <p className="font-montserrat text-[10px] uppercase tracking-widest text-gray-400 mt-1.5">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="relative border-l-2 border-brand-beige pl-4">
          <p className="font-montserrat text-sm md:text-base text-white/90 italic leading-relaxed">
            &ldquo;{study.quote}&rdquo;
          </p>
          <footer className="mt-2 font-montserrat text-xs uppercase tracking-widest text-gray-400">
            — {study.author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

// Modal de video — se abre al hacer click en un thumbnail
function VideoModal({
  testimonial,
  onClose,
}: {
  testimonial: VideoTestimonial;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/90 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonial de ${testimonial.name}`}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: ANIMATION_EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-brand-beige/30"
      >
        <video
          src={testimonial.videoSrc}
          controls
          autoPlay
          playsInline
          poster={testimonial.thumbnail}
          className="w-full h-full bg-black"
        >
          <track kind="captions" />
        </video>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-brand-black/80 border border-white/20 text-white hover:bg-brand-beige hover:text-brand-black transition-colors flex items-center justify-center"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openVideo, setOpenVideo] = useState<VideoTestimonial | null>(null);
  const total = CASE_STUDIES.length;
  const progressKey = useRef(0);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  // Autoplay con pausa en hover/focus
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, next, activeIndex]);

  // Reinicia la animación de progreso al cambiar de slide
  useEffect(() => {
    progressKey.current += 1;
  }, [activeIndex]);

  return (
    <section
      aria-label="Casos de estudio y testimonios"
      className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black"
    >
      <div className="container-custom">
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-3">
            Casos reales
          </p>
          <h2 className="font-barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white">
            Marcas que escalaron con
            <br />
            <span className="text-brand-beige">el mismo sistema.</span>
          </h2>
        </AnimatedSection>

        {/* Carrusel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative rounded-2xl border border-white/10 bg-brand-gray/40 p-6 md:p-10 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={CASE_STUDIES[activeIndex].id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: ANIMATION_EASE }}
            >
              <CaseCard study={CASE_STUDIES[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Dots + progress bar */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {CASE_STUDIES.map((study, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ir al caso ${study.brand}`}
                  aria-current={isActive}
                  className={`relative h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-12 bg-white/20" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      key={`progress-${progressKey.current}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "0%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 left-0 rounded-full bg-brand-beige"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video testimonials — grid 2x2 */}
        <div className="mt-16">
          <AnimatedSection className="text-center mb-8">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-3">
              En sus palabras
            </p>
            <h3 className="font-barlow font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
              Videos de clientes
            </h3>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {VIDEO_TESTIMONIALS.map((t, i) => (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => setOpenVideo(t)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: ANIMATION_EASE,
                }}
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-brand-beige/50 transition-all [will-change:transform]"
                aria-label={`Reproducir testimonial de ${t.name}`}
              >
                <Image
                  src={t.thumbnail}
                  alt={`${t.name} — ${t.role}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />

                {/* Play button con glow */}
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-beige flex items-center justify-center shadow-[0_0_32px_rgba(200,157,105,0.5)] group-hover:shadow-[0_0_48px_rgba(200,157,105,0.8)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-brand-black ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                  </svg>
                </motion.span>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="font-barlow font-bold text-sm md:text-base text-white">
                    {t.name}
                  </p>
                  <p className="font-montserrat text-[10px] md:text-xs text-white/70 uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openVideo && (
          <VideoModal testimonial={openVideo} onClose={() => setOpenVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
