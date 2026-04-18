"use client";

import { motion } from "framer-motion";
import { ANIMATION_EASE } from "@/lib/animations/variants";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  amount = 0.15,
  className,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: ANIMATION_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
