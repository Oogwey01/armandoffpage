"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxTextProps {
  children: ReactNode;
  /** -1 a 1. Negativo: sube más rápido que el scroll. Positivo: baja más lento. */
  speed?: number;
  className?: string;
}

/**
 * Envuelve contenido con parallax continuo basado en scroll.
 * El contenedor externo mantiene el layout; el interno se desplaza en Y.
 * Respeta prefers-reduced-motion.
 */
export function ParallaxText({
  children,
  speed = 0.3,
  className,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = shouldReduce
    ? ([0, 0] as [number, number])
    : ([-80 * speed, 80 * speed] as [number, number]);

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
