"use client";

import { motion } from "framer-motion";
import QualificationForm from "@/components/form/QualificationForm";

// Cambiar a `true` cuando el MP4 final esté disponible en /public/videos/
const HAS_VIDEO = false;

const VIDEO_SRC = "/videos/empezar-hero.mp4";
const VIDEO_POSTER = "/videos/empezar-hero-poster.webp";

function VideoPlayer() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-brand-black shadow-2xl shadow-black/60">
      {HAS_VIDEO ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={VIDEO_POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-gray to-brand-black">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.6) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-brand-beige/20 border-2 border-brand-beige/50">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-brand-beige/40 animate-ping"
            />
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 sm:w-9 sm:h-9 text-brand-beige ml-1"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="relative mt-4 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-beige/80">
            Video próximamente
          </p>
        </div>
      )}
    </div>
  );
}

export default function HeroVideo() {
  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-20 pb-10 lg:pb-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="container-custom w-full">
        {/* Encabezado compacto */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-5 sm:mb-7 lg:mb-8 px-4"
        >
          <h1 className="font-barlow font-black uppercase text-white leading-[0.95] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
            La forma más rápida de{" "}
            <span className="text-brand-beige">escalar tu negocio</span>
          </h1>

          {/* Subtexto: oculto en mobile, visible desde sm+ */}
          <p className="hidden sm:block body-text mt-4 max-w-2xl mx-auto text-sm md:text-base">
            En este video te explico cómo trabajamos y cómo dar el primer paso.
            Mira hasta el final.
          </p>
        </motion.div>

        {/* Layout 2 columnas: video + form */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-start max-w-7xl mx-auto px-4">
          {/* Video — izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-2 sm:-inset-3 bg-brand-beige/20 blur-3xl rounded-3xl pointer-events-none" />
            <div className="relative">
              <VideoPlayer />
            </div>
          </motion.div>

          {/* Formulario — derecha */}
          <motion.div
            id="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="scroll-mt-24"
          >
            <QualificationForm variant="inline" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
