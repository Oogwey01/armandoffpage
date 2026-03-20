"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { COMING_SOON_SERVICES } from "@/lib/constants";

export default function ComingSoonServices() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="proximos-servicios" className="section-padding bg-brand-black">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center">
          <h2 className="heading-lg text-center text-white">
            SERVICIOS PR&Oacute;XIMAMENTE
          </h2>
          <p className="body-text text-center max-w-2xl mx-auto mt-4">
            Estamos preparando una suite completa de servicios para impulsar tu
            negocio
          </p>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4 mb-12" />
        </div>

        {/* Services grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {COMING_SOON_SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-brand-gray rounded-xl overflow-hidden group group-hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Image area */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
                {/* Badge */}
                <span className="absolute top-3 right-3 bg-brand-beige text-brand-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Pr&oacute;ximamente
                </span>
              </div>

              {/* Content area */}
              <div className="p-5">
                <h3 className="font-barlow font-bold text-lg text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 font-montserrat">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
