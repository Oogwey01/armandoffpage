"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ScaleProgress } from "@/components/animations";

interface ServicesProps {
  onOpenForm: () => void;
}

const SERVICES = [
  {
    name: "Meta Ads",
    credential: "$5M+ invertidos — dinero propio",
    price: "$6,000",
  },
  {
    name: "Página web",
    credential: "Embudo completo Meta → venta",
    price: "$6,000",
  },
  {
    name: "TikTok Shop",
    credential: "+4,000 ventas en FRESA FIT",
    price: "$6,000",
  },
  {
    name: "Mercado Libre",
    credential: "$30M+ · MercadoLíder Platinum",
    price: "$6,000",
  },
];

export default function Services({ onOpenForm }: ServicesProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="servicios" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="heading-lg text-white">ELIGE TU PUNTO DE ENTRADA AL ECOMMERCE</h2>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4" />
        </motion.div>

        {/* Service cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {SERVICES.map((service, index) => (
            <ScaleProgress key={service.name} scaleRange={[0.94, 1.03, 0.94]}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-gray border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <h3 className="font-barlow font-bold text-xl text-white">{service.name}</h3>
                  <p className="font-montserrat text-sm text-gray-400 mt-1">{service.credential}</p>
                </div>
                <div className="mt-4">
                  <span className="font-barlow font-black text-2xl sm:text-3xl text-white">{service.price}</span>
                  <span className="font-montserrat text-sm text-gray-400">/mes</span>
                </div>
              </motion.div>
            </ScaleProgress>
          ))}
        </div>

        {/* Combo card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 bg-green-500/5 border border-green-500/30 rounded-xl p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="font-barlow font-bold text-lg sm:text-xl text-white">
              Combo Escala Total — los 4 servicios
            </h3>
            <span className="font-montserrat text-xs font-semibold bg-green-500 text-white px-3 py-1 rounded-full">
              Recomendado
            </span>
          </div>
          <p className="font-barlow font-black text-3xl sm:text-4xl text-white mb-2">
            $19,500 <span className="font-montserrat text-base font-medium text-gray-400">MXN/mes</span>
          </p>
          <p className="font-montserrat text-sm text-gray-400">
            Ahorras $4,500 vs contratar por separado · Sistema completo activo
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={onOpenForm}
            className="w-full bg-brand-beige text-brand-black font-barlow font-bold text-lg py-4 rounded-xl hover:bg-brand-beige-light hover:scale-[1.01] transition-all"
          >
            Aplicar ahora →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
