import type { ReactNode } from "react";

type BadgeVariant = "primary" | "accent" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

// Estilos por variante — alineados con la paleta brand-beige
const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  // Fondo sólido dorado sobre negro — máxima jerarquía
  primary: "bg-brand-beige text-brand-black",
  // Tono dorado translúcido — jerarquía media
  accent: "bg-brand-beige/15 text-brand-beige border border-brand-beige/30",
  // Solo borde — jerarquía mínima
  outline: "bg-transparent text-white border border-white/20",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-1.5",
};

// Badge premium reutilizable con tipografía en caps y tracking amplio
export function Badge({
  children,
  variant = "accent",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-barlow font-bold uppercase tracking-wider ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </span>
  );
}
