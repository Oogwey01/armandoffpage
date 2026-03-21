"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useFormModal } from "@/hooks/useFormModal";
import QualificationForm from "@/components/form/QualificationForm";
import {
  StrategyIcon,
  MarketingIcon,
  ScaleIcon,
  MindsetIcon,
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  StarIcon,
} from "@/components/common/Icons";

const PURCHASE_URL =
  "https://armandofresafit.com/products/como-hacer-publicidad-en-facebook-meta-con-poco-presupuesto";

const TOTAL_SEATS = 50;
const TAKEN_SEATS = 41;
const REMAINING_SEATS = TOTAL_SEATS - TAKEN_SEATS;
const OCCUPANCY_PCT = Math.round((TAKEN_SEATS / TOTAL_SEATS) * 100);

const LEARNINGS = [
  {
    icon: <StrategyIcon className="w-7 h-7 text-brand-beige" />,
    title: "Estructura de campaña rentable",
    desc: "Cómo armar una campaña ganadora en META con presupuesto limitado, desde la segmentación hasta la estructura de conjuntos de anuncios.",
  },
  {
    icon: <MarketingIcon className="w-7 h-7 text-brand-beige" />,
    title: "Métricas y optimización sin desperdiciar",
    desc: "Las métricas clave que debes vigilar y cómo optimizar tus campañas para maximizar el ROAS sin quemar dinero.",
  },
  {
    icon: <ScaleIcon className="w-7 h-7 text-brand-beige" />,
    title: "Creativos que convierten y generan ventas",
    desc: "Estrategias para crear anuncios que realmente vendan: formatos, copies y creativos probados en e-commerce hispano.",
  },
  {
    icon: <MindsetIcon className="w-7 h-7 text-brand-beige" />,
    title: "Casos reales de FresaFit",
    desc: "Ejemplos y casos prácticos directamente de campañas activas de FresaFit — sin teoría, solo lo que funciona.",
  },
];

const AGENDA = [
  {
    num: "01",
    title: "Estructura de campañas y fundamentos",
    desc: "Bases de cómo funciona el algoritmo de META y cómo estructurar correctamente tu cuenta publicitaria.",
  },
  {
    num: "02",
    title: "Estrategias de creación de creativos",
    desc: "Cómo producir anuncios efectivos con poco presupuesto: hooks, formatos y copywriting que convierte.",
  },
  {
    num: "03",
    title: "Casos reales de campañas de FresaFit",
    desc: "Análisis en vivo de campañas reales: qué funcionó, qué no, y cómo lo ajustamos para escalar.",
  },
  {
    num: "04",
    title: "Sesión de preguntas y respuestas en vivo",
    desc: "Resuelve tus dudas directamente con Armando. Espacio abierto para preguntas sobre tu negocio específico.",
  },
];

const FOR_YOU = [
  "Dueños de negocio y emprendedores de e-commerce",
  "Quienes ya invierten en publicidad pero buscan mejores resultados y ROI",
  "Prestadores de servicios que quieren escalar con META Ads",
  "Emprendedores nuevos listos para ejecutar desde el día uno",
];

const NOT_FOR_YOU = [
  "Personas que buscan resultados sin implementar ni ejecutar",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const dotPattern = {
  backgroundImage:
    "radial-gradient(circle at 1px 1px, rgba(200,157,105,0.5) 1px, transparent 0)",
  backgroundSize: "40px 40px",
};

export default function WebinarsPage() {
  const { isOpen, open, close } = useFormModal();

  return (
    <>
      <Header onOpenForm={open} />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={dotPattern}
          />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40 pb-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-brand-gray/60 border border-brand-beige/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-beige flex-shrink-0 animate-pulse" />
              <span className="font-montserrat text-xs font-semibold text-brand-beige uppercase tracking-widest">
                WEBINAR EN VIVO &bull; 31 DE MARZO, 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white mb-6 max-w-4xl mx-auto leading-tight"
            >
              CÓMO HACER PUBLICIDAD EN{" "}
              <span className="text-brand-beige">FACEBOOK (META)</span> CON POCO
              PRESUPUESTO
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="body-text max-w-2xl mx-auto text-gray-300 mb-10"
            >
              Sesión interactiva de 80 minutos con estrategias probadas, casos
              reales de FresaFit y Q&amp;A en vivo.
            </motion.p>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {[
                { icon: <CalendarIcon className="w-4 h-4" />, text: "31 Mar 2026" },
                { icon: <ClockIcon className="w-4 h-4" />, text: "6:00 PM CDMX" },
                { icon: <GlobeIcon className="w-4 h-4" />, text: "Google Meet" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 bg-brand-gray/60 border border-white/10 rounded-full px-4 py-2 font-montserrat text-sm text-gray-300"
                >
                  <span className="text-brand-beige">{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div>

            {/* Urgency bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="max-w-sm mx-auto mb-8"
            >
              <div className="flex justify-between font-montserrat text-xs text-gray-400 mb-2">
                <span>{TAKEN_SEATS} de {TOTAL_SEATS} lugares tomados</span>
                <span className="text-brand-beige font-semibold">
                  Solo {REMAINING_SEATS} disponibles
                </span>
              </div>
              <div className="w-full h-2 bg-brand-gray rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-beige rounded-full"
                  style={{ width: `${OCCUPANCY_PCT}%` }}
                />
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 mb-4"
            >
              <a
                href={PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto sm:px-14 py-4 text-base lg:text-lg inline-block text-center"
              >
                Asegurar mi lugar — $297 MXN
              </a>
              <p className="font-montserrat text-xs text-gray-500">
                Etapa 1 &bull; Acceso vinculado al email de compra
              </p>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
            >
              <div className="flex -space-x-2">
                {["MR", "AB", "CF", "DP"].map((initials) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full bg-brand-gray border-2 border-brand-black flex items-center justify-center"
                  >
                    <span className="font-montserrat text-[9px] text-gray-400">
                      {initials}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" filled />
                ))}
              </div>
              <p className="font-montserrat text-sm text-gray-300 font-medium">
                Únete a{" "}
                <span className="text-white font-bold">400+ emprendedores</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── LO QUE DOMINARÁS ─── */}
        <section className="bg-brand-gray section-padding">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="font-montserrat text-xs text-brand-beige uppercase tracking-widest mb-3">
                Contenido
              </p>
              <h2 className="heading-lg font-extrabold uppercase text-white">
                Lo que dominarás después
                <br className="hidden sm:block" /> de esta sesión
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LEARNINGS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={i * 0.15}
                  variants={fadeUp}
                  className="bg-brand-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-beige/10 border border-brand-beige/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-barlow font-bold text-white text-base sm:text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AGENDA ─── */}
        <section className="relative bg-brand-black section-padding overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={dotPattern}
          />
          <div className="container-custom relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
              variants={fadeUp}
              className="text-center mb-4"
            >
              <p className="font-montserrat text-xs text-brand-beige uppercase tracking-widest mb-3">
                Programa
              </p>
              <h2 className="heading-lg font-extrabold uppercase text-white mb-2">
                Agenda del Webinar
              </h2>
              <p className="font-montserrat text-sm text-gray-500">
                Sesión interactiva de ~80 minutos
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto mt-12 space-y-0">
              {AGENDA.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={i * 0.15}
                  variants={fadeUp}
                  className="flex gap-5 relative"
                >
                  {/* Vertical line */}
                  {i < AGENDA.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-px bg-brand-beige/20" />
                  )}

                  {/* Number bubble */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center z-10">
                    <span className="font-barlow font-black text-xs text-brand-black">
                      {item.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pb-10">
                    <h3 className="font-barlow font-bold text-white text-base sm:text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-sm text-gray-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PARA QUIÉN ─── */}
        <section className="bg-brand-gray section-padding">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="font-montserrat text-xs text-brand-beige uppercase tracking-widest mb-3">
                Audiencia
              </p>
              <h2 className="heading-lg font-extrabold uppercase text-white">
                ¿Para quién es este webinar?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* SÍ es para ti */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={0.1}
                variants={fadeUp}
                className="bg-brand-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="font-barlow font-bold text-white text-lg mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-xs">
                    ✓
                  </span>
                  Sí es para ti
                </h3>
                <ul className="space-y-3">
                  {FOR_YOU.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-montserrat text-sm text-gray-300 font-light"
                    >
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* NO es para ti */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={0.25}
                variants={fadeUp}
                className="bg-brand-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="font-barlow font-bold text-white text-lg mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs">
                    ✕
                  </span>
                  No es para ti
                </h3>
                <ul className="space-y-3">
                  {NOT_FOR_YOU.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-montserrat text-sm text-gray-300 font-light"
                    >
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="relative bg-brand-black section-padding overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={dotPattern}
          />
          <div className="container-custom relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="font-montserrat text-xs text-brand-beige uppercase tracking-widest mb-4">
                Etapa 1 — Precio especial
              </p>
              <h2 className="heading-lg font-extrabold uppercase text-white mb-10">
                Asegura tu lugar ahora
              </h2>
            </motion.div>

            {/* Price card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0.15}
              variants={fadeUp}
              className="bg-brand-gray border border-white/10 rounded-2xl p-8 w-full max-w-sm mb-8"
            >
              <p
                className="font-akira text-5xl text-brand-beige mb-1"
              >
                $297
              </p>
              <p className="font-montserrat text-sm text-gray-400 mb-6">MXN — Pago único</p>

              <div className="space-y-3 mb-8 text-left">
                {[
                  { icon: <CalendarIcon className="w-4 h-4" />, text: "31 de marzo, 2026" },
                  { icon: <ClockIcon className="w-4 h-4" />, text: "6:00 PM CDMX (18:00 HMO)" },
                  { icon: <GlobeIcon className="w-4 h-4" />, text: "Google Meet — Online" },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 font-montserrat text-sm text-gray-300"
                  >
                    <span className="text-brand-beige flex-shrink-0">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Urgency */}
              <div className="mb-6">
                <div className="flex justify-between font-montserrat text-xs text-gray-400 mb-1.5">
                  <span>{TAKEN_SEATS}/{TOTAL_SEATS} lugares tomados</span>
                  <span className="text-brand-beige font-semibold">
                    {REMAINING_SEATS} restantes
                  </span>
                </div>
                <div className="w-full h-1.5 bg-brand-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-beige rounded-full"
                    style={{ width: `${OCCUPANCY_PCT}%` }}
                  />
                </div>
              </div>

              <a
                href={PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-4 text-base inline-block text-center"
              >
                Asegurar mi lugar
              </a>

              <p className="font-montserrat text-xs text-gray-500 mt-4 text-center">
                El acceso se vincula al email de compra
              </p>
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0.3}
              variants={fadeUp}
              className="font-montserrat text-xs text-gray-600 max-w-xs"
            >
              Múltiples entradas con el mismo email cuentan como un solo acceso.
            </motion.p>
          </div>
        </section>
      </main>

      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
