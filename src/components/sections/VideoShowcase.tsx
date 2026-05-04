"use client";

import { useRef, useEffect, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { asset } from "@/lib/assets";

// ── Data ─────────────────────────────────────────────────────────────────────
const UGC_ITEMS = [
  { src: asset("videos/UGC/ugc-01-berserk-munequeras.mp4"), badge: "UGC", label: "Berserk muñequeras" },
  { src: asset("videos/UGC/ugc-03.mp4"),                    badge: "UGC", label: "Contenido UGC" },
  { src: asset("videos/UGC/ugc-05-mochila-gara.mp4"),       badge: "UGC", label: "Mochila Gara" },
  { src: asset("videos/UGC/ugc-06-whatsapp.mp4"),           badge: "UGC", label: "Contenido UGC" },
  { src: asset("videos/UGC/ugc-07-akatsuki-mochila.mp4"),   badge: "UGC", label: "Akatsuki mochila" },
] as const;

const STATIC_ITEMS = [
  { src: asset("videos/ESTATICOS/static-01-h1a.webp"),    badge: "ESTÁTICO", label: "Diseño H1" },
  { src: asset("videos/ESTATICOS/static-04-h2.webp"),     badge: "ESTÁTICO", label: "Diseño H2" },
  { src: asset("videos/ESTATICOS/static-07-h4a.webp"),    badge: "ESTÁTICO", label: "Diseño H4" },
  { src: asset("videos/ESTATICOS/static-10-promo.webp"),  badge: "PROMO",    label: "Promoción" },
  { src: asset("videos/ESTATICOS/static-11-review.webp"), badge: "RESEÑA",   label: "Review" },
] as const;

const PROD_ITEMS = [
  { src: asset("videos/PRODUCCIONES/prod-02-cinto-gamuza.mp4"),      badge: "PRODUCTO",   label: "Cinto de gamuza" },
  { src: asset("videos/PRODUCCIONES/prod-04.mp4"),                   badge: "PRODUCCIÓN", label: "Producción" },
  { src: asset("videos/PRODUCCIONES/prod-05-powerlifts.mp4"),        badge: "FITNESS",    label: "Powerlifts" },
  { src: asset("videos/PRODUCCIONES/prod-08-santa.mp4"),             badge: "EDICIÓN",    label: "Edición especial" },
  { src: asset("videos/PRODUCCIONES/prod-13-mochila-fresafit.mp4"),  badge: "PRODUCTO",   label: "Mochila Fresafit" },
] as const;

type DeckItem = { src: string; badge: string; label: string };
type ExitDir  = "left" | "right" | "down";

const N = Math.max(UGC_ITEMS.length, STATIC_ITEMS.length, PROD_ITEMS.length);
const EXITS = N - 1;
const MAX_DEPTH = 4;
const PRELOAD_INITIAL = 1;    // cards que cargan de inmediato
const PRELOAD_AHEAD = 2;      // posiciones anticipadas para disparar el lazy load
const PROGRESS_H = 3;
const FOOTER_H = 44;
const SECTION_HEIGHT = `${EXITS * 65 + 100}vh`;

// ── Desktop deck card ────────────────────────────────────────────────────────
function StickyDeckCard({
  item,
  index,
  total,
  scrollYProgress,
  slideDistanceX,
  slideDistanceY,
  exitDirection,
  mediaType,
}: {
  item: DeckItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  slideDistanceX: number;
  slideDistanceY: number;
  exitDirection: ExitDir;
  mediaType: "video" | "image";
}) {
  const mediaRef = useRef<HTMLVideoElement & HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(index < PRELOAD_INITIAL);
  const exits = Math.max(1, total - 1);

  useEffect(() => {
    if (loaded) return;
    const trigger = Math.max(0, (index - PRELOAD_AHEAD) / exits);
    return scrollYProgress.on("change", (v) => {
      if (v >= trigger) setLoaded(true);
    });
  }, [scrollYProgress, index, exits, loaded]);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el || !loaded) return;
    if (mediaType === "video") {
      el.src = item.src;
      el.load();
    }
  }, [loaded, item.src, mediaType]);

  const depth = Math.min(index, MAX_DEPTH);
  const waitingScale = 1 - depth * 0.045;
  const waitingY = depth * 12;

  const norm = useTransform(
    scrollYProgress,
    [(index - 1) / exits, (index + 1) / exits],
    [-1, 1],
    { clamp: true }
  );

  // Dirección de salida
  const exitX =
    exitDirection === "left"  ? -slideDistanceX :
    exitDirection === "right" ?  slideDistanceX : 0;
  const exitY = exitDirection === "down" ? slideDistanceY : 0;

  const scale   = useTransform(norm, [-1, 0,   1], [waitingScale, 1,  0.95]);
  const y       = useTransform(norm, [-1, 0,   1], [waitingY,     0,  exitY]);
  const x       = useTransform(norm, [-1, 0,   1], [0,            0,  exitX]);
  const opacity = useTransform(norm, [-1, 0, 0.5, 1], [1, 1, 1, 0]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        style={{
          x, y, scale, opacity,
          willChange: "transform, opacity",
          height: "100%",
          maxHeight: "88%",
          aspectRatio: "9 / 16",
        }}
        className="relative overflow-hidden rounded-2xl border border-white/10"
      >
        {mediaType === "video" ? (
          <video
            ref={mediaRef}
            autoPlay muted loop playsInline
            preload={loaded ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={mediaRef as React.RefObject<HTMLImageElement>}
            src={loaded ? item.src : undefined}
            alt={item.label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 z-10">
          <span className="font-montserrat font-bold text-[9px] tracking-[0.2em] uppercase bg-brand-beige text-brand-black px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        </div>

        <div className="absolute bottom-4 left-3 right-3 z-10">
          <p className="font-montserrat font-bold text-xs text-white drop-shadow-lg tracking-wide">
            {item.label}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Mobile card ──────────────────────────────────────────────────────────────
function MobileCard({ item, mediaType }: { item: DeckItem; mediaType: "video" | "image" }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLoaded(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded || mediaType !== "video") return;
    const el = videoRef.current;
    if (!el) return;
    el.src = item.src;
    el.load();
  }, [loaded, item.src, mediaType]);

  return (
    <div ref={wrapperRef} className="snap-center shrink-0 w-[72vw] max-w-[260px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-brand-black">
        {mediaType === "video" ? (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            preload={loaded ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={loaded ? item.src : undefined}
            alt={item.label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 z-10">
          <span className="font-montserrat font-bold text-[10px] tracking-[0.25em] uppercase bg-brand-beige text-brand-black px-2.5 py-1 rounded-full">
            {item.badge}
          </span>
        </div>
        <div className="absolute bottom-4 left-3 right-3 z-10">
          <p className="font-montserrat font-bold text-sm text-white drop-shadow-md tracking-wide">{item.label}</p>
        </div>
      </div>
    </div>
  );
}

// ── Título reutilizable ──────────────────────────────────────────────────────
function DeckTitle({ eyebrow, heading, accent }: { eyebrow: string; heading: string; accent: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="h-px w-6 bg-[#8f0000] flex-none" />
        <p className="font-montserrat text-white text-[10px] lg:text-xs uppercase tracking-[0.3em]">
          {eyebrow}
        </p>
        <span className="h-px w-6 bg-[#8f0000] flex-none" />
      </div>
      <h3 className="font-barlow font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase leading-[0.95] tracking-tight text-white">
        {heading}{" "}
        <span className="text-brand-beige">{accent}</span>
      </h3>
    </div>
  );
}

// ── Deck wrapper para renderizar un stack ─────────────────────────────────────
function DeckStack({
  items,
  scrollYProgress,
  slideDistanceX,
  slideDistanceY,
  exitDirection,
  mediaType,
  shouldReduce,
}: {
  items: readonly DeckItem[];
  scrollYProgress: MotionValue<number>;
  slideDistanceX: number;
  slideDistanceY: number;
  exitDirection: ExitDir;
  mediaType: "video" | "image";
  shouldReduce: boolean | null;
}) {
  const reversed = [...items].reverse();
  return (
    <div className="w-1/3 relative">
      {reversed.map((item, ri) => {
        const index = items.length - 1 - ri;
        return (
          <StickyDeckCard
            key={item.src}
            item={item}
            index={index}
            total={items.length}
            scrollYProgress={scrollYProgress}
            slideDistanceX={shouldReduce ? 0 : slideDistanceX}
            slideDistanceY={shouldReduce ? 0 : slideDistanceY}
            exitDirection={exitDirection}
            mediaType={mediaType}
          />
        );
      })}
    </div>
  );
}

// ── Mobile carousel wrapper ──────────────────────────────────────────────────
function MobileDeck({
  items,
  mediaType,
  eyebrow,
  heading,
  accent,
}: {
  items: readonly DeckItem[];
  mediaType: "video" | "image";
  eyebrow: string;
  heading: string;
  accent: string;
}) {
  return (
    <div>
      <div className="mb-6 px-5">
        <DeckTitle eyebrow={eyebrow} heading={heading} accent={accent} />
      </div>
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
      >
        {items.map((item) => (
          <MobileCard key={item.src} item={item} mediaType={mediaType} />
        ))}
      </div>
      <p className="text-center font-montserrat text-xs text-gray-500 mt-2 tracking-wide">
        Desliza para ver más →
      </p>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [slideDistanceX, setSlideDistanceX] = useState(400);
  const [slideDistanceY, setSlideDistanceY] = useState(500);
  const [activeIndex,    setActiveIndex]    = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    function recalc() {
      const vW = window.innerWidth;
      const vH = window.innerHeight;
      const cardH = (vH - 160) * 0.88;
      const cardW = (cardH * 9) / 16;
      // Cada deck ocupa 1/3 del viewport
      setSlideDistanceX(vW / 6 + cardW / 2 + 20);
      setSlideDistanceY(vH / 2 + cardH / 2 + 20);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * EXITS), N - 1);
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    });
  }, [scrollYProgress]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;

  return (
    <>
      {/* ── MOBILE ──────────────────────────────────────────────────────── */}
      <section className="relative md:hidden py-12 overflow-hidden space-y-12">
        <div className="relative z-10 space-y-12">
          <MobileDeck items={UGC_ITEMS}    mediaType="video" eyebrow="Contenido UGC"  heading="TU MARCA CON CONTENIDO" accent="PREMIUM" />
          <MobileDeck items={STATIC_ITEMS} mediaType="image" eyebrow="Diseño estático" heading="PUBLICIDAD QUE"        accent="CONVIERTE" />
          <MobileDeck items={PROD_ITEMS}   mediaType="video" eyebrow="Producciones"    heading="CONTENIDO QUE"         accent="VENDE" />
        </div>
      </section>

      {/* ── DESKTOP: triple deck sticky ─────────────────────────────────── */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: SECTION_HEIGHT }}
      >
        <div className="relative sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Barra de progreso */}
          <div className="relative z-10 flex-none" style={{ height: PROGRESS_H }}>
            <motion.div
              style={{ width: progressWidth, willChange: "width" }}
              className="absolute inset-y-0 left-0 bg-brand-beige"
            />
          </div>

          {/* Títulos — tres columnas */}
          <div className="flex-none pt-24 pb-2 px-6 relative z-10 flex">
            <div className="w-1/3">
              <DeckTitle eyebrow="Contenido UGC" heading="TU MARCA CON CONTENIDO" accent="PREMIUM" />
            </div>
            <div className="w-1/3">
              <DeckTitle eyebrow="Diseño estático" heading="PUBLICIDAD QUE" accent="CONVIERTE" />
            </div>
            <div className="w-1/3">
              <DeckTitle eyebrow="Producciones" heading="CONTENIDO QUE" accent="VENDE" />
            </div>
          </div>

          {/* Triple deck */}
          <div className="relative z-10 flex-1 flex overflow-hidden">
            <DeckStack
              items={UGC_ITEMS}
              scrollYProgress={scrollYProgress}
              slideDistanceX={slideDistanceX}
              slideDistanceY={slideDistanceY}
              exitDirection="left"
              mediaType="video"
              shouldReduce={shouldReduce}
            />
            <DeckStack
              items={STATIC_ITEMS}
              scrollYProgress={scrollYProgress}
              slideDistanceX={slideDistanceX}
              slideDistanceY={slideDistanceY}
              exitDirection="down"
              mediaType="image"
              shouldReduce={shouldReduce}
            />
            <DeckStack
              items={PROD_ITEMS}
              scrollYProgress={scrollYProgress}
              slideDistanceX={slideDistanceX}
              slideDistanceY={slideDistanceY}
              exitDirection="right"
              mediaType="video"
              shouldReduce={shouldReduce}
            />
          </div>

          {/* Footer — contadores */}
          <div className="relative z-10 flex-none flex px-6" style={{ height: FOOTER_H }}>
            <div className="w-1/3 flex items-center justify-between px-2">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.25em] text-brand-beige/60">UGC</span>
              <span className="font-montserrat font-bold text-xs text-gray-500 tabular-nums tracking-widest">
                <span className="text-brand-beige">{counter}</span>
              </span>
            </div>
            <div className="w-1/3 flex items-center justify-between px-2">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.25em] text-brand-beige/60">Estáticos</span>
              <span className="font-montserrat font-bold text-xs text-gray-500 tabular-nums tracking-widest">
                <span className="text-brand-beige">{counter}</span>
              </span>
            </div>
            <div className="w-1/3 flex items-center justify-between px-2">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.25em] text-brand-beige/60">Producciones</span>
              <span className="font-montserrat font-bold text-xs text-gray-500 tabular-nums tracking-widest">
                <span className="text-brand-beige">{counter}</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
