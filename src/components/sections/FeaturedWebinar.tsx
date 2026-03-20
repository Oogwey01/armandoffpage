"use client";

import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, GlobeIcon } from "@/components/common/Icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FeaturedWebinarProps {
  onOpenForm: () => void;
}

export default function FeaturedWebinar({ onOpenForm }: FeaturedWebinarProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="webinar"
      className="section-padding bg-gradient-to-b from-brand-gray to-brand-black"
    >
      <div ref={ref} className="container-custom text-center">
        {/* Small label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-brand-beige uppercase tracking-widest text-sm font-bold mb-4 block"
        >
          PRÓXIMO EVENTO
        </motion.span>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="heading-lg text-white mb-4"
        >
          PUBLICIDAD EN META CON POCO PRESUPUESTO
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="body-text max-w-2xl mx-auto mb-8"
        >
          Forma parte de nuestro webinar exclusivo y aprende estrategias reales
          para maximizar tu presupuesto publicitario
        </motion.p>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center gap-6 md:gap-10 flex-wrap mb-10"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <CalendarIcon />
            <span>31/03/2026</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <ClockIcon />
            <span>6:00 PM (CST)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <GlobeIcon />
            <span>Google Meet</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <button
            onClick={onOpenForm}
            className="btn-primary text-lg w-full sm:w-auto px-8 sm:px-12 py-4"
          >
            RESERVA TU LUGAR
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Cupo limitado — No te quedes fuera
          </p>
        </motion.div>
      </div>
    </section>
  );
}
