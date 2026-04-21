"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/content/AnimatedSection";

interface BrandLogo {
  src: string;
  alt: string;
}

// Logos de plataformas/partners — ampliar según necesidad
const LOGOS: BrandLogo[] = [
  { src: "/images/logos/meta-ads.png", alt: "Meta Ads" },
  { src: "/images/logos/tiktokADS.png", alt: "TikTok Ads" },
  { src: "/images/logos/Shopify-badge.png", alt: "Shopify" },
  { src: "/images/logos/Google_Ads_logo.png", alt: "Google Ads" },
  { src: "/images/logos/mercado-libre.png", alt: "Mercado Libre" },
  { src: "/images/logos/tiendanube.svg", alt: "Tiendanube" },
  { src: "/images/logos/tiktokshop.webp", alt: "TikTok Shop" },
  { src: "/images/logos/whatsapp.webp", alt: "WhatsApp" },
];

export function BrandLogos() {
  // Duplicamos el array para crear un loop sin costuras con translateX -50%
  const track = [...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Plataformas y partners"
      className="px-4 sm:px-6 lg:px-8 py-6 md:py-16 bg-brand-gray border-y border-white/5"
    >
      <AnimatedSection className="container-custom text-center mb-4 md:mb-8">
        <p className="font-bebas font-bold text-xs tracking-[0.3em] uppercase text-brand-beige/70">
          Plataformas en las que producimos
        </p>
      </AnimatedSection>

      {/* Wrapper con fade lateral para disimular bordes del loop */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee-left gap-12 md:gap-16 py-2">
          {track.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="relative flex items-center justify-center h-12 md:h-16 w-28 md:w-36 shrink-0"
              aria-hidden={i >= LOGOS.length ? true : undefined}
            >
              <Image
                src={logo.src}
                alt={i >= LOGOS.length ? "" : logo.alt}
                fill
                sizes="(max-width: 768px) 112px, 144px"
                className="object-contain animate-logo-pulse"
                style={{ animationDelay: `${(i % LOGOS.length) * 0.5}s` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
