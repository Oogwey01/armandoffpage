"use client";

// Ejemplo de uso del sistema de animaciones y componentes base
// Este archivo es solo de referencia — se puede eliminar o usar como plantilla

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Badge } from "./Badge";
import { CountUp } from "./CountUp";
import { GlowCard } from "./GlowCard";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations/variants";

const STATS = [
  { value: 120, suffix: "+", label: "Clientes activos" },
  { value: 98, suffix: "%", label: "Satisfacción" },
  { value: 3.5, decimals: 1, suffix: "M", prefix: "$", label: "Ventas generadas" },
];

export function ExampleUsage() {
  return (
    <section className="section-padding bg-brand-black">
      <div className="container-custom space-y-20">
        {/* 1. AnimatedSection envuelve un bloque con slideUp por defecto */}
        <AnimatedSection className="text-center space-y-4">
          <Badge variant="accent">Nuevo contenido</Badge>
          <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Sistema de animaciones en acción
          </h2>
          <p className="font-barlow text-base font-light text-gray-300 max-w-2xl mx-auto">
            Componentes reutilizables con scroll-triggered animations y efectos premium.
          </p>
        </AnimatedSection>

        {/* 2. CountUp dentro de un grid con staggerContainer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center space-y-2"
            >
              <CountUp
                end={stat.value}
                decimals={stat.decimals ?? 0}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-akira text-4xl md:text-5xl text-brand-beige"
              />
              <p className="font-barlow text-sm text-gray-300 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. GlowCards con direcciones alternadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection variants={slideInLeft}>
            <GlowCard intensity="soft">
              <Badge variant="primary" className="mb-4">
                Estrategia
              </Badge>
              <h3 className="font-montserrat text-xl font-extrabold text-white mb-2">
                Roadmap personalizado
              </h3>
              <p className="font-barlow text-base font-light text-gray-300">
                Plan de acción adaptado a tu etapa y objetivos.
              </p>
            </GlowCard>
          </AnimatedSection>

          <AnimatedSection variants={slideInRight} delay={0.15}>
            <GlowCard intensity="strong">
              <Badge variant="outline" className="mb-4">
                Mentoría
              </Badge>
              <h3 className="font-montserrat text-xl font-extrabold text-white mb-2">
                Acompañamiento 1:1
              </h3>
              <p className="font-barlow text-base font-light text-gray-300">
                Sesiones semanales con seguimiento de KPIs.
              </p>
            </GlowCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
