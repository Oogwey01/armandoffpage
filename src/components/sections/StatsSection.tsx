"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CountUp } from "@/components/ui/content/CountUp";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface StatItem {
  label: string;
  // Valor numérico para el CountUp
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  desc: string;
  // Datos de la micro gráfica (4-7 puntos, valores relativos 0-100)
  chart: number[];
  // Texto comparativo vs promedio del sector
  comparison: string;
  highlight?: boolean;
}

const STATS: StatItem[] = [
  {
    label: "ROAS promedio",
    end: 5.2,
    decimals: 1,
    suffix: "x",
    desc: "Retorno sobre inversión publicitaria",
    chart: [20, 35, 30, 55, 60, 75, 90],
    comparison: "vs 2.1x promedio del sector",
    highlight: true,
  },
  {
    label: "Alcance total",
    end: 3.8,
    decimals: 1,
    suffix: "M+",
    desc: "Personas alcanzadas en Meta y TikTok",
    chart: [15, 25, 40, 38, 55, 70, 85],
    comparison: "vs 800K promedio",
  },
  {
    label: "Impresiones",
    end: 12,
    suffix: "M+",
    desc: "Views acumulados del contenido",
    chart: [10, 20, 30, 50, 65, 80, 95],
    comparison: "vs 2M promedio",
  },
  {
    label: "CTR promedio",
    end: 4.8,
    decimals: 1,
    suffix: "%",
    desc: "Sobre el benchmark del sector",
    chart: [30, 40, 35, 55, 65, 70, 82],
    comparison: "vs 1.2% promedio",
  },
];

// Crecimiento mensual para la timeline — valores relativos (0-100)
const TIMELINE = [
  { month: "Ene", value: 18, detail: "Inicio de campañas" },
  { month: "Feb", value: 32, detail: "+78% alcance" },
  { month: "Mar", value: 45, detail: "Optimización creativos" },
  { month: "Abr", value: 58, detail: "ROAS 4.1x" },
  { month: "May", value: 72, detail: "+155% impresiones" },
  { month: "Jun", value: 88, detail: "ROAS 5.2x" },
  { month: "Jul", value: 96, detail: "Pico histórico" },
];

// Mini SVG line chart con animación de trazo
function MicroChart({ data }: { data: number[] }) {
  const { ref, isVisible } = useScrollAnimation<SVGSVGElement>({
    threshold: 0.3,
  });

  const width = 100;
  const height = 40;
  const step = width / (data.length - 1);
  const max = Math.max(...data);
  const points = data.map((v, i) => [i * step, height - (v / max) * height] as const);

  const path = points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");

  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-16 opacity-40 pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`chart-gradient-${data.join("-")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C89D69" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C89D69" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Área bajo la línea */}
      <motion.path
        d={areaPath}
        fill={`url(#chart-gradient-${data.join("-")})`}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {/* Línea animada */}
      <motion.path
        d={path}
        fill="none"
        stroke="#C89D69"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isVisible ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, ease: ANIMATION_EASE }}
      />
    </svg>
  );
}

// Timeline horizontal con dots + tooltip
function Timeline() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.4,
  });

  return (
    <div ref={ref} className="mt-10">
      <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige/70 mb-4">
        Crecimiento mensual
      </p>
      <div className="relative px-2">
        {/* Línea base */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
        {/* Línea animada dorada */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.6, ease: ANIMATION_EASE }}
          style={{ transformOrigin: "left" }}
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-brand-beige via-brand-beige-light to-brand-beige -translate-y-1/2"
        />
        <div className="relative flex justify-between items-center">
          {TIMELINE.map((item, i) => (
            <motion.button
              key={item.month}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.2 + i * 0.08,
                ease: ANIMATION_EASE,
              }}
              className="group relative flex flex-col items-center gap-2"
              aria-label={`${item.month}: ${item.detail}`}
            >
              <span className="font-montserrat text-[10px] uppercase tracking-widest text-white/40 group-hover:text-brand-beige transition-colors">
                {item.month}
              </span>
              <span className="relative block w-3 h-3 rounded-full bg-brand-beige ring-4 ring-brand-beige/20 group-hover:ring-brand-beige/40 group-hover:scale-125 transition-all">
                {hovered === i && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap rounded-md bg-brand-black border border-brand-beige/30 px-3 py-1.5 font-montserrat text-[10px] text-white/90 z-10"
                  >
                    {item.detail}
                  </motion.span>
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sección completa de estadísticas — reemplaza el bloque inline "PRUEBA REAL"
export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax sutil sobre la imagen mientras se hace scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      aria-label="Prueba real — estadísticas de FRESA FIT"
      className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-brand-gray"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
          {/* Columna izquierda — título + stats */}
          <div className="lg:col-span-3 flex flex-col">
            <p className="font-barlow font-bold text-xs tracking-[0.3em] uppercase text-brand-beige mb-3">
              Prueba real
            </p>
            <h2 className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white/15 mb-3">
              ESTO ES LO QUE
              <br />
              PRODUCIMOS PARA NUESTRA
              <br />
              PROPIA MARCA.
            </h2>
            <p className="font-montserrat text-sm md:text-base text-gray-400 font-light max-w-2xl mb-6">
              Estadísticas de alcances y ROAS reales de FRESA FIT — probado con
              presupuesto propio en Meta Ads y TikTok.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: ANIMATION_EASE,
                  }}
                  className={`group relative bg-brand-black/60 backdrop-blur-sm border rounded-2xl p-5 md:p-6 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                    stat.highlight
                      ? "border-brand-beige/40 hover:border-brand-beige/70"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Micro gráfica de fondo */}
                  <MicroChart data={stat.chart} />

                  <div className="relative z-10">
                    <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium mb-2">
                      {stat.label}
                    </p>
                    <CountUp
                      end={stat.end}
                      decimals={stat.decimals ?? 0}
                      prefix={stat.prefix ?? ""}
                      suffix={stat.suffix ?? ""}
                      duration={2000}
                      className={`font-barlow font-black text-4xl sm:text-5xl md:text-6xl leading-none block ${
                        stat.highlight ? "text-brand-beige" : "text-white"
                      }`}
                    />
                    {/* Badge comparativo */}
                    <p className="mt-2 font-montserrat text-[11px] font-medium text-green-400/80">
                      ↑ {stat.comparison}
                    </p>
                  </div>
                  <p className="relative z-10 font-montserrat text-xs text-gray-400 font-light leading-relaxed mt-3">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <Timeline />
          </div>

          {/* Columna derecha — imagen con parallax y glow en hover */}
          <div className="lg:col-span-2 hidden lg:block">
            <motion.div
              style={{ y: imageY }}
              whileHover={{
                boxShadow: "0 0 48px 0 rgba(200,157,105,0.35)",
                borderColor: "rgba(200,157,105,0.5)",
              }}
              transition={{ duration: 0.4, ease: ANIMATION_EASE }}
              className="relative w-full h-full min-h-[480px] bg-brand-black/60 border border-white/10 rounded-2xl overflow-hidden [will-change:transform]"
            >
              <Image
                src="/images/statistics/SCREEN.jpg"
                alt="Estadísticas reales de alcances y ROAS de FRESA FIT"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </motion.div>
          </div>
        </div>

        <p className="font-montserrat text-xs text-gray-500 italic mt-4">
          * Métricas reales acumuladas de campañas activas de FRESA FIT
        </p>
      </div>
    </section>
  );
}
