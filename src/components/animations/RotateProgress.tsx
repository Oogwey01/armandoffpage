"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RotateProgressProps {
  children: ReactNode;
  /** Grados de rotación total (puede ser negativo para contra-reloj) */
  degrees?: number;
  className?: string;
}

/**
 * Aplica una rotación continua basada en scroll.
 * Útil para íconos decorativos o elementos de acento.
 * Respeta prefers-reduced-motion.
 */
export function RotateProgress({
  children,
  degrees = 12,
  className,
}: RotateProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [-(degrees / 2), degrees / 2]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
