"use client";

import { motion, type Variants, type MotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { slideUp } from "@/lib/animations/variants";

interface AnimatedSectionProps extends Omit<MotionProps, "variants"> {
  children: ReactNode;
  // Variante de entrada — por defecto slideUp
  variants?: Variants;
  // Porcentaje visible para disparar la animación (0-1)
  amount?: number;
  // Si debe animarse solo la primera vez
  once?: boolean;
  // Delay antes de que inicie la animación (segundos)
  delay?: number;
  className?: string;
  // Etiqueta HTML a renderizar — permite usar section, article, div, etc.
  as?: ElementType;
}

// Wrapper que dispara animaciones al entrar al viewport usando whileInView de Framer
export function AnimatedSection({
  children,
  variants = slideUp,
  amount = 0.2,
  once = true,
  delay = 0,
  className,
  as = "div",
  ...motionProps
}: AnimatedSectionProps) {
  const Component = motion(as as ElementType);

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
