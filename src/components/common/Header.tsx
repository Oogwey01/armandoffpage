"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CloseIcon } from "@/components/common/Icons";
import { NAV_LINKS } from "@/lib/constants";

interface HeaderProps {
  onOpenForm: () => void;
}

export default function Header({ onOpenForm }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Detecta scroll para reducir altura del header y elevar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6">
        <div
          className={`mx-auto max-w-6xl backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
            isScrolled
              ? "bg-brand-black/70 border-white/15 shadow-2xl shadow-black/40 mt-3 mb-2"
              : "bg-white/10 border-white/20 shadow-lg shadow-black/10 mt-6 mb-4"
          }`}
        >
            <div
              className={`flex items-center px-4 sm:px-8 gap-3 transition-[height] duration-300 ${
                isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
              }`}
            >

            {/* LEFT: Hamburger animado (mobile only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white lg:hidden flex-shrink-0 relative w-6 h-6"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[7px] w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 top-[11px]" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[11px] w-6 h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[15px] w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 top-[11px]" : ""
                }`}
              />
            </button>

            {/* Logo */}
            <div className="flex justify-center lg:justify-start flex-1 lg:flex-initial">
              <a href="/" className="flex-shrink-0">
                <Image
                  src="/images/logos/logo_dorado.png"
                  alt="Logo"
                  height={40}
                  width={160}
                  className={`object-contain transition-all duration-300 ${
                    isScrolled ? "w-[95px] sm:w-[140px] opacity-90" : "w-[110px] sm:w-[160px] opacity-100"
                  }`}
                />
              </a>
            </div>

            {/* Desktop Navigation — centered via flex-1 */}
            <nav className="hidden items-center justify-center gap-12 lg:flex lg:flex-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-white/90 transition-colors duration-200 hover:text-brand-beige"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* RIGHT: CTA — compact on mobile, full on desktop */}
            <button
              onClick={onOpenForm}
              className="flex-shrink-0 flex items-center gap-1.5 rounded-xl bg-[#C89D69] text-black font-bold uppercase transition-colors duration-200 hover:bg-[#B08A55]
                         px-3 py-2 text-xs lg:px-8 lg:py-2.5 lg:text-base"
            >
              <span>Agendar Cita</span>
              <span className="text-[9px] lg:text-[10px] font-bold opacity-75 tracking-widest">GRATIS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — Left Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col bg-brand-black lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
                <a href="#inicio" onClick={closeMobileMenu} className="flex-shrink-0">
                  <Image
                    src="/images/logos/logo_dorado.png"
                    alt="Logo"
                    height={32}
                    width={120}
                    className="object-contain"
                  />
                </a>
                <button
                  onClick={closeMobileMenu}
                  className="text-white"
                  aria-label="Cerrar menú"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col gap-1 px-4 pt-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="font-barlow font-bold text-lg text-white py-3 px-2 rounded-lg hover:bg-white/10 hover:text-brand-beige transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="px-6 mt-auto pb-10">
                <motion.button
                  onClick={() => {
                    closeMobileMenu();
                    onOpenForm();
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.05 }}
                  className="w-full flex flex-col items-center rounded-xl bg-brand-beige px-6 py-3 text-sm font-bold text-brand-black hover:bg-brand-beige-light transition-colors duration-200"
                >
                  <span>Agendar Cita</span>
                  <span className="text-[10px] font-normal opacity-60 leading-tight tracking-widest">GRATIS</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
