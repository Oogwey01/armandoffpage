"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { Testimonial } from "@/lib/types";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/common/Icons";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setIsPaused(true);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setIsPaused(true);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
    setIsPaused(true);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) {
      const resumeTimer = setTimeout(() => setIsPaused(false), 5000);
      return () => clearTimeout(resumeTimer);
    }

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current: Testimonial = TESTIMONIALS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonios" className="section-padding relative">
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#8f0000] flex-none" />
            <p className="font-montserrat text-white text-sm uppercase tracking-[0.3em]">
              Resultados reales
            </p>
            <span className="h-px w-10 bg-[#8f0000] flex-none" />
          </div>
          <h2 className="heading-lg text-center text-white">
            LO QUE DICEN NUESTROS <span className="text-brand-beige">CLIENTES</span>
          </h2>
          <div className="w-20 h-1 bg-brand-beige mx-auto mt-4 mb-12" />
        </motion.div>

        {/* Desktop view */}
        <div className="hidden md:flex flex-col items-center relative">
          <div className="relative w-full max-w-3xl mx-auto">
            {/* Left arrow */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full bg-brand-black/50 hover:bg-brand-beige/20 flex items-center justify-center transition-colors"
              aria-label="Testimonio anterior"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>

            {/* Right arrow */}
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full bg-brand-black/50 hover:bg-brand-beige/20 flex items-center justify-center transition-colors"
              aria-label="Siguiente testimonio"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>

            {/* Testimonial card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-brand-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
              >
                {/* Stars */}
                <div className="flex gap-1 text-brand-beige mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-white font-montserrat font-light italic leading-relaxed mb-8">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-beige flex-shrink-0 bg-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white/50">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-barlow font-bold text-white">
                      {current.name}
                    </p>
                    <p className="text-sm text-gray-400">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[85vw] snap-center bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6"
              >
                {/* Stars */}
                <div className="flex gap-1 text-brand-beige mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg text-white font-montserrat font-light italic leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-beige flex-shrink-0 bg-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white/50">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-barlow font-bold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-brand-beige scale-110"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar styles for mobile carousel */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
