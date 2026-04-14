"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  // Intensidad del glow — strong aplica sombra más amplia
  intensity?: "soft" | "strong";
  // Desactiva la elevación al hacer hover
  disableLift?: boolean;
}

const GLOW_INTENSITY = {
  // Glow sutil apto para grids densos
  soft: "0 0 32px 0 rgba(200, 157, 105, 0.25)",
  // Glow marcado para CTAs o cards destacadas
  strong: "0 0 48px 4px rgba(200, 157, 105, 0.45)",
} as const;

// Card con efecto glow dorado en hover — will-change solo mientras se anima
export function GlowCard({
  children,
  className = "",
  intensity = "soft",
  disableLift = false,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ boxShadow: "0 0 0px 0 rgba(200, 157, 105, 0)" }}
      whileHover={{
        boxShadow: GLOW_INTENSITY[intensity],
        y: disableLift ? 0 : -4,
      }}
      transition={{ duration: 0.4, ease: ANIMATION_EASE }}
      className={`relative rounded-xl border border-white/10 bg-brand-gray p-6 [will-change:transform,box-shadow] ${className}`}
    >
      {children}
    </motion.div>
  );
}
