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
        <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg mt-8 mb-4">
          <div className="flex h-20 items-center justify-between px-8">
            {/* Logo */}
            <a href="#inicio" className="flex-shrink-0">
              <Image
                src="/images/logos/logo_full.png"
                alt="Logo"
                height={40}
                width={160}
                className="object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-12 lg:flex">
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

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={onOpenForm}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C89D69] px-8 py-3.5 text-base font-bold text-white transition-colors duration-200 hover:bg-[#B08A55]"
              >
                Agendar Cita
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 lg:hidden"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-brand-black lg:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex h-20 items-center justify-between px-4 sm:px-6">
              <a href="#inicio" onClick={closeMobileMenu} className="flex-shrink-0">
                <Image
                  src="/images/logos/logo_full.png"
                  alt="Logo"
                  height={36}
                  width={144}
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

            {/* Mobile Menu Links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="font-akira text-2xl text-white transition-colors duration-200 hover:text-indigo-400"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  closeMobileMenu();
                  onOpenForm();
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.05 }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Agendar Cita
                <span aria-hidden="true">→</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
