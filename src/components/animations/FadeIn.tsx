"use client";

import { motion } from "framer-motion";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  amount?: number;
  className?: string;
}

const OFFSETS = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  amount = 0.15,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: ANIMATION_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
