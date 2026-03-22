"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QualificationForm from "@/components/form/QualificationForm";
import { useFormModal } from "@/hooks/useFormModal";
import TabNavigation from "@/components/casos-de-estudio/TabNavigation";
import InterviewCard from "@/components/casos-de-estudio/InterviewCard";
import WrittenReviewCard from "@/components/casos-de-estudio/WrittenReviewCard";
import CaseStudyCard from "@/components/casos-de-estudio/CaseStudyCard";
import {
  STUDENT_INTERVIEWS,
  WRITTEN_REVIEWS,
  CASE_STUDIES,
} from "@/lib/constants";
import type { TabId } from "@/lib/types";

const TABS: { id: TabId; label: string; subtitle: string }[] = [
  {
    id: "entrevistas",
    label: "Entrevistas de Estudiantes",
    subtitle:
      "Escucha directamente a los emprendedores que aplicaron el Método Rush. Sus experiencias, desafíos y resultados, sin filtros.",
  },
  {
    id: "resenas",
    label: "Reseñas Escritas",
    subtitle:
      "Testimonios escritos de fundadores y marketers que han escalado sus marcas. Resultados reales, palabras reales.",
  },
  {
    id: "casos",
    label: "Casos de Estudio",
    subtitle:
      "Análisis detallados de marcas que transformaron su negocio con el Método Rush. Métricas concretas, estrategias probadas.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function CasosDeEstudioPage() {
  const { isOpen, open, close } = useFormModal();
  const [activeTab, setActiveTab] = useState<TabId>("entrevistas");

  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  return (
    <>
      <Header onOpenForm={open} />

      <main className="bg-brand-black min-h-screen">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden">
          {/* Dot overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.5) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40 pb-12 md:pb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-brand-gray/60 border border-brand-beige/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-beige flex-shrink-0" />
              <span className="font-montserrat text-xs font-semibold text-brand-beige uppercase tracking-widest">
                ArmandoFF Resultados
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-none tracking-tight mb-6"
            >
              Hub de Resultados
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-montserrat text-base text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Resultados reales de emprendedores reales. Aquí encontrarás
              entrevistas, reseñas escritas y casos de estudio de personas que
              aplicaron el Método Rush y transformaron sus negocios.
            </motion.p>

            {/* Disclaimer */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="border border-dashed border-brand-beige/40 rounded-xl p-4 sm:p-5 max-w-2xl mx-auto text-left"
            >
              <p className="font-montserrat text-xs sm:text-sm text-gray-400 leading-relaxed">
                <span className="text-brand-beige font-semibold">Aviso legal: </span>
                Los resultados mostrados representan casos excepcionales. Los
                resultados individuales varían según el esfuerzo, la experiencia
                y las condiciones del mercado de cada persona. No garantizamos
                resultados financieros.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Tabs + Content ── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={TABS}
              />
            </motion.div>

            {/* Animated content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {/* Sub-header */}
                <div className="mt-10 mb-8">
                  <h2 className="font-barlow font-black text-2xl sm:text-3xl text-white mb-3 uppercase">
                    {activeTabData.label}
                  </h2>
                  <div className="w-14 h-1 bg-brand-beige rounded-full mb-4" />
                  <p className="font-montserrat text-sm text-gray-400 max-w-xl leading-relaxed">
                    {activeTabData.subtitle}
                  </p>
                </div>

                {/* Cards Grid */}
                {activeTab === "entrevistas" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {STUDENT_INTERVIEWS.map((item) => (
                      <InterviewCard key={item.id} data={item} />
                    ))}
                  </div>
                )}
                {activeTab === "resenas" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {WRITTEN_REVIEWS.map((item) => (
                      <WrittenReviewCard key={item.id} data={item} />
                    ))}
                  </div>
                )}
                {activeTab === "casos" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {CASE_STUDIES.map((item) => (
                      <CaseStudyCard key={item.id} data={item} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <p className="font-montserrat text-sm text-gray-400 mb-6">
                ¿Listo para ser el próximo caso de éxito?
              </p>
              <button onClick={open} className="btn-primary">
                Aplicar al Programa
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
