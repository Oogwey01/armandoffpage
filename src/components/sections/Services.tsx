"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServicesProps {
  onOpenForm: () => void;
}

const services = [
  {
    title: "MENTORÍA PRIVADA 1A1",
    image: "/images/services/mentoria.jpg",
    description:
      "Acompañamiento estratégico personalizado para llevar tu negocio al siguiente nivel. Sesiones individuales enfocadas en tus metas específicas.",
    buttonLabel: "Ver Detalles",
    buttonStyle: "btn-primary" as const,
    action: "form" as const,
  },
  {
    title: "WEBINARS & MASTERCLASS",
    image: "/images/services/webinar.jpg",
    description:
      "Accede a sesiones grupales intensivas donde compartimos estrategias probadas de crecimiento, marketing digital y escalabilidad.",
    buttonLabel: "Próxima Fecha: 31/03/2026",
    buttonStyle: "btn-outline" as const,
    action: "link" as const,
    href: "#webinar",
  },
];

export default function Services({ onOpenForm }: ServicesProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="servicios" className="section-padding">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center">
          <h2 className="heading-lg text-white">NUESTROS SERVICIOS</h2>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4" />
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-brand-gray rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="heading-md text-white">{service.title}</h3>
                <p className="text-gray-300 mt-3">{service.description}</p>

                {service.action === "form" ? (
                  <button
                    onClick={onOpenForm}
                    className="btn-primary mt-6"
                  >
                    {service.buttonLabel}
                  </button>
                ) : (
                  <a href={service.href} className="btn-outline mt-6 inline-block">
                    {service.buttonLabel}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
