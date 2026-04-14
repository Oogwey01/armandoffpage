"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

interface CountUpProps {
  // Valor final al que debe llegar el contador
  end: number;
  // Valor inicial — por defecto 0
  start?: number;
  // Duración total de la animación en ms
  duration?: number;
  // Decimales a mostrar
  decimals?: number;
  // Prefijo (ej: "$")
  prefix?: string;
  // Sufijo (ej: "%", "+", "K")
  suffix?: string;
  // Separador de miles
  thousandsSeparator?: string;
  className?: string;
}

// Easing de salida — arranca rápido y desacelera al final
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(
  value: number,
  decimals: number,
  thousandsSeparator: string
): string {
  const fixed = value.toFixed(decimals);
  const [integer, decimal] = fixed.split(".");
  const withSeparators = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  return decimal ? `${withSeparators}.${decimal}` : withSeparators;
}

// Contador animado que se dispara al entrar al viewport
export function CountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  thousandsSeparator = ",",
  className,
}: CountUpProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>({ threshold: 0.3 });
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const delta = end - start;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(start + delta * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(value, decimals, thousandsSeparator)}
      {suffix}
    </span>
  );
}
