"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScaleProgressProps {
  children: ReactNode;
  /** [inicio, pico, fin] — valores cuando el elemento entra, está centrado y sale del viewport */
  scaleRange?: [number, number, number];
  className?: string;
}

/**
 * Aplica una escala continua basada en la posición de scroll del elemento.
 * El elemento crece suavemente al acercarse al centro del viewport y mengua al alejarse.
 * Solo afecta scale (no opacity) para no interferir con animaciones de entrada.
 * Respeta prefers-reduced-motion.
 */
export function ScaleProgress({
  children,
  scaleRange = [0.93, 1.03, 0.93],
  className,
}: ScaleProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduce ? [1, 1, 1] : scaleRange
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
