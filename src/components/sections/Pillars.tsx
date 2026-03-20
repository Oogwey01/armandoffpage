"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/constants";
import {
  StrategyIcon,
  MarketingIcon,
  ScaleIcon,
  MindsetIcon,
} from "@/components/common/Icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  strategy: StrategyIcon,
  marketing: MarketingIcon,
  scale: ScaleIcon,
  mindset: MindsetIcon,
};

export default function Pillars() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pilares" className="section-padding bg-brand-black">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center">
          <h2 className="heading-lg text-center text-white">
            NUESTROS PILARES
          </h2>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4 mb-12" />
        </div>

        {/* Pillars grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-6 rounded-xl text-center transition-all duration-300 hover:bg-brand-beige/10"
              >
                {Icon && (
                  <Icon className="text-brand-beige w-12 h-12 mx-auto" />
                )}
                <h3 className="heading-md text-white mt-4 mb-3">
                  {pillar.title}
                </h3>
                <p className="body-text text-sm">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
