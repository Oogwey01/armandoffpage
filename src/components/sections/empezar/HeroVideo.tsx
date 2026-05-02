"use client";

import { motion } from "framer-motion";
import QualificationForm from "@/components/form/QualificationForm";

const VIDEO_SRC = "/videos/Emepezar/0502.mp4";

function VideoPlayer() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-brand-black shadow-2xl shadow-black/60">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls
        playsInline
        preload="metadata"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
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
