"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StickyScrollProps {
  children: ReactNode;
  /** Altura total del contenedor (define cuánto scroll consume la sección sticky) */
  height?: string;
  className?: string;
}

/**
 * Crea una sección sticky que se adhiere al viewport mientras se scrollea.
 * El contenido hace fade-out y se encoge progresivamente conforme sale del viewport.
 * Respeta prefers-reduced-motion.
 */
export function StickyScroll({
  children,
  height = "200vh",
  className,
}: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9, 1],
    shouldReduce ? [1, 1, 1, 1] : [1, 1, 0.5, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [1, 1] : [1, 0.88]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [0, -40]
  );

  return (
    <div ref={ref} style={{ height }} className="relative">
      <motion.div
        style={{ opacity, scale, y, willChange: "transform, opacity" }}
        className={`sticky top-0 h-screen flex items-center justify-center overflow-hidden ${className ?? ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
