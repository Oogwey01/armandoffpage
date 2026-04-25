"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { AdPlatform, Tier, TierFeature } from "@/lib/tiers";
import { ANIMATION_EASE } from "@/lib/animations/variants";
import { trackEvent } from "@/lib/meta-pixel";

const PLATFORM_LOGOS: Record<AdPlatform, { src: string; alt: string }> = {
  meta: { src: "/images/logos/meta-ads.png", alt: "Meta Ads" },
  instagram: { src: "/images/logos/instagram.png", alt: "Instagram" },
  google: { src: "/images/logos/Google_Ads_logo.png", alt: "Google Ads" },
  tiktok: { src: "/images/logos/tiktok.webp", alt: "TikTok" },
};

// ── Iconografía custom por categoría de feature ──
function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8a2 2 0 012-2h2.5l1.5-2h6l1.5 2H19a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function VideoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="2"
        y="6"
        width="14"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M16 10l5-3v10l-5-3v-4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StrategyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 19l4-4 4 2 8-10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RawContentIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M8 14h8M8 17h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l2.9 6.6L22 10l-5.4 4.7L18.3 22 12 18.3 5.7 22l1.7-7.3L2 10l7.1-1.4L12 2z" />
    </svg>
  );
}

function MegaphoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 10v4a1 1 0 001 1h2l7 4V5L6 9H4a1 1 0 00-1 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M17 8a5 5 0 010 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 5a9 9 0 010 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICON_MAP = {
  image: CameraIcon,
  video: VideoIcon,
  strategy: StrategyIcon,
  raw: RawContentIcon,
  ads: MegaphoneIcon,
} as const;

// Variante de draw-in escalonado para cada item
const featureVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: ANIMATION_EASE },
  }),
};

// Item de feature con hover highlight individual
function FeatureItem({
  feature,
  index,
  highlighted,
}: {
  feature: TierFeature;
  index: number;
  highlighted: boolean;
}) {
  const Icon = ICON_MAP[feature.category];
  const platforms = feature.platforms;

  const hasPlatforms = platforms && platforms.length > 0;

  return (
    <motion.li
      custom={index}
      variants={featureVariants}
      className="group/item flex items-center gap-3 rounded-lg px-2 py-1.5 -mx-2 hover:bg-brand-beige/5 transition-colors"
    >
      {!hasPlatforms && (
        <span
          className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-md transition-all ${
            highlighted
              ? "text-brand-beige bg-brand-beige/10 group-hover/item:bg-brand-beige/20 group-hover/item:rotate-6"
              : "text-brand-beige/70 group-hover/item:text-brand-beige group-hover/item:rotate-6"
          }`}
        >
          <Icon className="w-4 h-4" />
        </span>
      )}
      <span className="flex-1 font-montserrat text-sm text-gray-300 leading-snug uppercase group-hover/item:text-white transition-colors tracking-wide">
        {feature.text}
      </span>
      {hasPlatforms && (
        <span className="shrink-0 flex items-center gap-2 transition-transform group-hover/item:scale-110">
          {platforms!.map((p) => {
            const logo = PLATFORM_LOGOS[p];
            return (
              <Image
                key={p}
                src={logo.src}
                alt={logo.alt}
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
              />
            );
          })}
        </span>
      )}
    </motion.li>
  );
}

// Corner ribbon para el tier destacado
function HighlightRibbon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: ANIMATION_EASE }}
      className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px 0 rgba(200,157,105,0)",
            "0 0 20px 2px rgba(200,157,105,0.55)",
            "0 0 0px 0 rgba(200,157,105,0)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-gradient-to-r from-brand-beige-dark via-brand-beige to-brand-beige-light"
      >
        <StarIcon className="w-3 h-3 text-brand-black" />
        <span className="font-montserrat font-bold text-[10px] tracking-[0.25em] uppercase text-brand-black whitespace-nowrap">
          El más elegido
        </span>
      </motion.div>
    </motion.div>
  );
}

interface TierCardProps {
  tier: Tier;
  flatTop?: boolean;
  showRibbon?: boolean;
  onOpenROI?: (tierId: Tier["id"]) => void;
}

// Construye URL de WhatsApp con mensaje pre-cargado pidiendo empresa y necesidad
export function buildWhatsAppUrl(tierName: string): string {
  const message = `Hola, me interesa el plan ${tierName}. Quisiera más información.\n\nMi empresa: \nMi necesidad: `;
  return `https://wa.me/526623160125?text=${encodeURIComponent(message)}`;
}

export function TierCard({
  tier,
  flatTop = false,
  showRibbon = true,
  onOpenROI,
}: TierCardProps) {
  const isHighlighted = !!tier.highlight;
  const [hovered, setHovered] = useState(false);

  const radiusClasses = flatTop ? "rounded-b-2xl" : "rounded-2xl";
  const whatsappUrl = buildWhatsAppUrl(tier.name);

  return (
    <div className="relative h-full">
      {isHighlighted && showRibbon && <HighlightRibbon />}

      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: ANIMATION_EASE }}
        className={`relative ${radiusClasses} overflow-hidden flex flex-col h-full [will-change:transform] ${
          isHighlighted
            ? "bg-gradient-to-b from-brand-black via-brand-black to-[#0a0a0a]"
            : "bg-gradient-to-b from-brand-black to-[#0a0a0a]"
        }`}
        style={{
          // Border gradient sutil — más fuerte en el highlighted
          border: isHighlighted ? "2px solid transparent" : "1px solid rgba(255,255,255,0.1)",
          backgroundClip: "padding-box",
          backgroundOrigin: "border-box",
          backgroundImage: isHighlighted
            ? `linear-gradient(#000, #000) padding-box, linear-gradient(135deg, rgba(200,157,105,0.6), rgba(200,157,105,0.1), rgba(200,157,105,0.6)) border-box`
            : undefined,
          boxShadow: isHighlighted
            ? hovered
              ? "0 25px 60px -15px rgba(200,157,105,0.45), 0 0 80px rgba(200,157,105,0.2)"
              : "0 0 30px rgba(200,157,105,0.18), inset 0 0 30px rgba(200,157,105,0.04)"
            : hovered
            ? "0 25px 50px -12px rgba(0,0,0,0.6)"
            : undefined,
        }}
      >
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-2">
            Tier {tier.number}
          </p>
          <h3 className="font-barlow font-black text-3xl md:text-4xl text-white uppercase mb-4">
            {tier.name}
          </h3>

          <p className="font-montserrat text-xs uppercase tracking-wider text-gray-500 mb-1">
            Desde
          </p>
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="font-montserrat font-black text-4xl md:text-5xl text-white">
              {tier.price}
            </span>
            <span className="font-montserrat text-sm text-gray-400 uppercase tracking-wide">
              MXN/mes
            </span>
          </div>

          <p className="font-montserrat text-sm text-brand-beige font-medium mb-6 leading-snug uppercase tracking-wide">
            {tier.totalPieces}
          </p>

          <div className="h-px bg-white/10 mb-5" />

          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
            Imágenes
          </p>
          <motion.ul
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-col gap-1 mb-5"
          >
            {tier.images.map((f, i) => (
              <FeatureItem key={f.text} feature={f} index={i} highlighted={isHighlighted} />
            ))}
          </motion.ul>

          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
            Videos
          </p>
          <motion.ul
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-col gap-1 mb-5"
          >
            {tier.videos.map((f, i) => (
              <FeatureItem key={f.text} feature={f} index={i} highlighted={isHighlighted} />
            ))}
          </motion.ul>

          <div className="h-px bg-white/10 mb-5" />

          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
            Gestión de publicidad
          </p>
          <motion.ul
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-col gap-1 mb-5"
          >
            {tier.ads.map((f, i) => (
              <FeatureItem key={f.text} feature={f} index={i} highlighted={isHighlighted} />
            ))}
          </motion.ul>

          <div className="h-px bg-white/10 mb-5" />

          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-brand-beige mb-3">
            Incluido
          </p>
          <motion.ul
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-col gap-1 mb-8"
          >
            {tier.extras.map((f, i) => (
              <FeatureItem key={f.text} feature={f} index={i} highlighted={isHighlighted} />
            ))}
          </motion.ul>

          {/* CTA diferenciado por tier — abre WhatsApp con mensaje pre-cargado */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent(
                "Lead",
                {
                  content_name: tier.name,
                  content_ids: [tier.id],
                  content_category: "Plan de contenido",
                  content_type: "product",
                  currency: "MXN",
                },
                { sendToCapi: true }
              )
            }
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 28px 0 rgba(200,157,105,0.55)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: ANIMATION_EASE }}
            className="mt-auto relative w-full bg-brand-beige text-brand-black font-montserrat font-bold text-sm uppercase tracking-normal py-3.5 rounded-full hover:bg-brand-beige-light transition-colors [will-change:transform] inline-flex items-center justify-center"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              {tier.ctaLabel}
              <motion.span
                animate={hovered ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </span>
          </motion.a>

          {/* Micro-copy + link al ROI calculator */}
          <p className="mt-3 text-center font-montserrat text-[11px] text-gray-400 tracking-wide">
            Sin permanencia · Cancela cuando quieras
          </p>
          {onOpenROI && (
            <button
              type="button"
              onClick={() => onOpenROI(tier.id)}
              className="mt-2 font-montserrat text-xs text-brand-beige/80 hover:text-brand-beige underline-offset-4 hover:underline transition-colors tracking-wide"
            >
              Ver ahorro estimado →
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
