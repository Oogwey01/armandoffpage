"use client";

import { motion } from "framer-motion";
import { ANIMATION_EASE } from "@/lib/animations/variants";

/* ── StaggerContainer ──────────────────────────────────────────────────
   Wrapper that orchestrates cascading entrance of its StaggerItem children.
   Use `amount` to tune when the trigger fires (0 = any pixel, 1 = fully in view).
────────────────────────────────────────────────────────────────────────── */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  amount?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0.05,
  amount = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerItem ───────────────────────────────────────────────────────
   Direct child of StaggerContainer. Slides up and fades in.
────────────────────────────────────────────────────────────────────────── */
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: ANIMATION_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
