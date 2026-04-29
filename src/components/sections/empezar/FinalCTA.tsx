"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";

export default function FinalCTA() {
  const scrollToForm = useCallback(() => {
    const el = document.getElementById("form");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-brand-beige/30 bg-gradient-to-br from-brand-gray via-brand-black to-brand-gray p-8 sm:p-12 lg:p-16 text-center"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.6) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-2xl mx-auto">
            <p className="font-montserrat text-[11px] uppercase tracking-[0.3em] text-brand-beige mb-4">
              ¿Listo para empezar?
            </p>
            <h2 className="heading-lg font-barlow font-black uppercase text-white leading-[0.95] tracking-tight mb-5">
              Da el primer paso{" "}
              <span className="text-brand-beige">hoy mismo</span>
            </h2>
            <p className="body-text mb-8">
              Completa el formulario y revisaremos tu caso. Si tu perfil encaja,
              te agendamos una llamada de diagnóstico gratuita.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-primary inline-flex items-center gap-2 text-base sm:text-lg"
              aria-label="Ir al formulario"
            >
              Llenar formulario
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
