"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MenuIcon, CloseIcon } from "@/components/common/Icons";
import { NAV_LINKS } from "@/lib/constants";

interface HeaderProps {
  onOpenForm: () => void;
}

export default function Header({ onOpenForm }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6">
        <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg mt-6 mb-4">
            <div className="flex h-16 sm:h-20 items-center px-4 sm:px-8 gap-3">

            {/* LEFT: Hamburger (mobile only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 lg:hidden flex-shrink-0"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <div className="flex justify-center lg:justify-start flex-1 lg:flex-initial">
              <a href="#inicio" className="flex-shrink-0">
                <Image
                  src="/images/logos/logo_full.png"
                  alt="Logo"
                  height={40}
                  width={160}
                  className="object-contain w-[110px] sm:w-[160px]"
                />
              </a>
            </div>

            {/* Desktop Navigation — centered via flex-1 */}
            <nav className="hidden items-center justify-center gap-12 lg:flex lg:flex-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-gray-700 transition-colors duration-200 hover:text-[#C89D69]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* RIGHT: CTA — compact on mobile, full on desktop */}
            <button
              onClick={onOpenForm}
              className="flex-shrink-0 flex flex-col items-center rounded-xl bg-[#C89D69] text-black font-bold transition-colors duration-200 hover:bg-[#B08A55]
                         px-3 py-1.5 text-xs lg:px-8 lg:py-2.5 lg:text-base"
            >
              <span className="flex items-center">
                <span className="hidden lg:inline">Agendar Cita</span>
              </span>
              <span className="text-[9px] lg:text-[10px] font-normal opacity-75 leading-tight tracking-widest">GRATIS</span>
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
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
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
