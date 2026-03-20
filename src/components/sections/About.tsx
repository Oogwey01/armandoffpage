"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="quien-soy" className="section-padding bg-brand-gray">
      <div
        ref={ref}
        className="container-custom flex items-center flex-col md:flex-row gap-12"
      >
        {/* Left side - Profile image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="w-[200px] h-[200px] border-4 border-brand-beige rounded-full overflow-hidden shadow-2xl">
            <Image
              src="/images/hero/placeholder.jpg"
              alt="Armando FF"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Right side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-brand-beige uppercase tracking-widest text-sm font-barlow font-bold mb-4 block">
            QUIÉN SOY
          </span>
          <h2 className="heading-lg text-white mb-6">
            Un emprendedor formado en la práctica
          </h2>
          <p className="body-text mb-8">
            Con más de 5 años de experiencia en el mundo empresarial, he
            construido, fracasado y vuelto a levantar múltiples negocios. Cada
            error fue una lección que hoy comparto con cientos de emprendedores
            que buscan crecer con estrategia, no con suerte. Mi enfoque es
            simple: resultados medibles, estrategias reales y acompañamiento
            genuino.
          </p>
          <a href="#" className="btn-outline">
            Conocer mi Historia
          </a>
        </motion.div>
      </div>
    </section>
  );
}
