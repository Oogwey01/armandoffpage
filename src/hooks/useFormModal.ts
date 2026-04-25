"use client";

import { useState, useCallback, useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";

export function useFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    // Sin PII todavía → solo browser pixel.
    trackEvent("InitiateCheckout", {
      content_name: "Qualification Form",
      content_category: "Lead",
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return { isOpen, open, close };
}
