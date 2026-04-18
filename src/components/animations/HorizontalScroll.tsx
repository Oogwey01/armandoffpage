"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
  /** Distancia en px que se mueve horizontalmente (negativo = izquierda) */
  scrollDistance?: number;
  className?: string;
}

/**
 * Gallery que se desplaza horizontalmente mientras el usuario scrollea verticalmente.
 * El contenedor ocupa 3x la altura del viewport para dar suficiente recorrido al scroll.
 * Respeta prefers-reduced-motion (muestra el contenido sin movimiento horizontal).
 */
export function HorizontalScroll({
  children,
  scrollDistance = -2000,
  className,
}: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [0, scrollDistance]
  );

  return (
    <div ref={ref} className="h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x, willChange: "transform" }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
