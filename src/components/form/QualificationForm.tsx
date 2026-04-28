"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { formSchema, FormData, STEP_FIELDS } from "@/lib/schemas";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/components/common/Icons";
import { generateEventId, getFbp, getFbc, trackEvent } from "@/lib/meta-pixel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QualificationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "armandoff-form-data-v2";
const TOTAL_STEPS = 10;

const MARKETING_CHANNELS_WITH_LOGO = [
  { value: "Meta Ads", label: "Meta Ads", logo: "/images/logos/meta-ads.png" },
  { value: "TikTok Ads", label: "TikTok Ads", logo: "/images/logos/tiktokADS.png" },
  { value: "TikTok Shop", label: "TikTok Shop", logo: "/images/logos/tikTOKSHOP.png" },
  { value: "Shopify", label: "Shopify", logo: "/images/logos/Shopify-badge.png" },
  { value: "Mercado Libre", label: "Mercado Libre", logo: "/images/logos/mercado-libre.png" },
  { value: "Instagram orgánico", label: "Instagram orgánico", logo: "/images/logos/instagram.png" },
  { value: "WhatsApp", label: "WhatsApp", logo: "/images/logos/whatsapp.webp" },
  { value: "Google Ads", label: "Google Ads", logo: "/images/logos/Google_Ads_logo.png" },
] as const;

const MARKETING_CHANNELS_TEXT_ONLY = [
  "Marketing Contenido UGC",
  "Boca a boca",
  "No hago marketing",
] as const;

const ADS_INVESTMENT_OPTIONS = [
  "$0",
  "$1-$5K MXN",
  "$5K-$15K MXN",
  "$15K-$50K MXN",
  "$50K-$150K MXN",
  "$150K+ MXN",
  "Prefiero no decirlo",
] as const;

const QUALIFIED_ADS_TIERS = new Set<string>([
  "$15K-$50K MXN",
  "$50K-$150K MXN",
  "$150K+ MXN",
]);

const WHATSAPP_NUMBER = "526623160125";

const MONTHLY_REVENUE_OPTIONS = [
  "$0",
  "$1-$15K MXN",
  "$15K-$50K MXN",
  "$50K-$150K MXN",
  "$150K-$500K MXN",
  "$500K+ MXN",
  "Prefiero no decirlo",
] as const;

const START_WHEN_OPTIONS = [
  "Inmediatamente",
  "En 2 semanas",
  "2-4 semanas",
  "4-6 semanas",
  "6+ semanas",
  "Solo estoy explorando",
] as const;

// ---------------------------------------------------------------------------
// Style constants
// ---------------------------------------------------------------------------

const inputClasses =
  "w-full bg-brand-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-beige focus:ring-1 focus:ring-brand-beige outline-none transition-colors font-montserrat text-sm min-h-[48px]";

const labelClasses =
  "block text-xl sm:text-2xl font-barlow font-bold text-white mb-6 leading-snug";

const errorClasses = "text-red-400 text-xs mt-1";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSavedData(): Partial<FormData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveData(partial: Partial<FormData>) {
  try {
    const existing = getSavedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...partial }));
  } catch {
    // Silently fail
  }
}

function clearSavedData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

function buildWhatsAppUrl(d: FormData): string {
  const lines = [
    "Hola Armando, acabo de enviar mi formulario de calificación.",
    "",
    "*Mis datos:*",
    `• Nombre: ${d.nombre}`,
    `• Email: ${d.email}`,
    `• WhatsApp: ${d.whatsapp}`,
    d.businessUrl ? `• Negocio: ${d.businessUrl}` : null,
    `• Canales de marketing: ${d.marketingChannels.join(", ")}`,
    `• Inversión en ads: ${d.adsInvestment}`,
    `• Ingresos mensuales: ${d.monthlyRevenue}`,
    `• Meta 90 días: ${d.goal90Days}`,
    `• Cuándo empezar: ${d.startWhen}`,
    d.mainObstacle ? `• Principal obstáculo: ${d.mainObstacle}` : null,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
}

function buildCalendlyUrl(d: FormData): string | null {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL;
  if (!base) return null;
  const params = new URLSearchParams({ name: d.nombre, email: d.email });
  return `${base}?${params.toString()}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className={errorClasses} role="alert">
      {message}
    </p>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function QualificationForm({ isOpen, onClose }: QualificationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      whatsapp: "+52",
      businessUrl: "",
      marketingChannels: [],
      adsInvestment: "",
      monthlyRevenue: "",
      goal90Days: "",
      startWhen: "",
      mainObstacle: "",
    },
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = form;

  // ---- Restore saved data on mount ----------------------------------------

  useEffect(() => {
    const saved = getSavedData();
    if (!saved || Object.keys(saved).length === 0) return;
    if (saved.nombre) setValue("nombre", saved.nombre);
    if (saved.email) setValue("email", saved.email);
    if (saved.whatsapp) setValue("whatsapp", saved.whatsapp);
    if (saved.businessUrl) setValue("businessUrl", saved.businessUrl);
    if (saved.marketingChannels) setValue("marketingChannels", saved.marketingChannels);
    if (saved.adsInvestment) setValue("adsInvestment", saved.adsInvestment);
    if (saved.monthlyRevenue) setValue("monthlyRevenue", saved.monthlyRevenue);
    if (saved.goal90Days) setValue("goal90Days", saved.goal90Days);
    if (saved.startWhen) setValue("startWhen", saved.startWhen);
    if (saved.mainObstacle) setValue("mainObstacle", saved.mainObstacle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Checkpoint ---------------------------------------------------------

  const sendCheckpoint = useCallback(
    (step: number) => {
      const values = getValues();
      if (!values.nombre || !values.email || !values.whatsapp) return;

      fetch("/api/form-checkpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre,
          email: values.email,
          whatsapp: values.whatsapp,
          step,
        }),
      }).catch(() => {
        // Silent fail — don't block the form
      });
    },
    [getValues]
  );

  // ---- Navigation ---------------------------------------------------------

  const goNext = useCallback(async () => {
    const fields = STEP_FIELDS[currentStep];
    if (fields && fields.length > 0) {
      const isValid = await trigger(fields);
      if (!isValid) return;
    }
    saveData(getValues());
    const nextStep = Math.min(currentStep + 1, TOTAL_STEPS);
    if (currentStep >= 3) sendCheckpoint(currentStep);
    setDirection(1);
    setCurrentStep(nextStep);
  }, [currentStep, trigger, getValues, sendCheckpoint]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Auto-advance for radio steps (6, 7, 9)
  const autoAdvance = useCallback(() => {
    saveData(getValues());
    sendCheckpoint(currentStep);
    setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }, 120);
  }, [getValues, sendCheckpoint, currentStep]);

  // ---- Submit -------------------------------------------------------------

  const handleSubmit = useCallback(async () => {
    const fields = STEP_FIELDS[10];
    const isValid = await trigger(fields);
    if (!isValid) return;

    setIsSubmitting(true);
    saveData(getValues());

    try {
      const allData = getValues();

      // Mismo eventId para browser y CAPI → Meta deduplica el Lead.
      const leadEventId = generateEventId();
      const fbp = getFbp();
      const fbc = getFbc();

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...allData,
          _meta: { eventId: leadEventId, fbp, fbc },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || `Error del servidor (${response.status})`);
      }

      // Browser pixel — usa el mismo eventId que el servidor enviará por CAPI.
      trackEvent(
        "Lead",
        {
          content_name: "Qualification Form",
          content_category: "Lead",
          currency: "MXN",
        },
        { eventId: leadEventId }
      );

      setSubmittedData(allData);
      clearSavedData();
      setShowSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error inesperado. Inténtalo de nuevo.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [trigger, getValues, onClose, reset]);

  // ---- Close (limpia estado + cierra modal) -------------------------------

  const handleClose = useCallback(() => {
    onClose();
    if (showSuccess) {
      reset();
      setCurrentStep(1);
      setShowSuccess(false);
      setSubmittedData(null);
    }
  }, [onClose, reset, showSuccess]);

  // ---- Overlay click ------------------------------------------------------

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  // ---- Marketing channels helpers -----------------------------------------

  const marketingChannels = watch("marketingChannels") || [];

  const toggleChannel = useCallback(
    (value: string) => {
      const noMarketing = "No hago marketing";
      if (value === noMarketing) {
        setValue("marketingChannels", [noMarketing], { shouldValidate: true });
        return;
      }
      const current = marketingChannels.filter((c) => c !== noMarketing);
      if (current.includes(value)) {
        setValue("marketingChannels", current.filter((c) => c !== value), { shouldValidate: true });
      } else {
        setValue("marketingChannels", [...current, value], { shouldValidate: true });
      }
    },
    [marketingChannels, setValue]
  );

  // ---- Watched values -----------------------------------------------------

  const adsInvestment = watch("adsInvestment");
  const monthlyRevenue = watch("monthlyRevenue");
  const startWhen = watch("startWhen");

  // ---- Step animations ----------------------------------------------------

  const stepVariants = {
    initial: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  // ---- Render step content ------------------------------------------------

  function renderStep() {
    switch (currentStep) {
      // Step 1 — Nombre
      case 1:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuál es tu nombre?</label>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              autoComplete="given-name"
              autoFocus
              className={inputClasses}
              {...register("nombre")}
            />
            <FieldError message={errors.nombre?.message} />
          </div>
        );

      // Step 2 — Email
      case 2:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuál es tu email?</label>
            <input
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              autoFocus
              className={inputClasses}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>
        );

      // Step 3 — WhatsApp
      case 3:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuál es tu WhatsApp?</label>
            <input
              type="tel"
              placeholder="+52 XXX XXX XXXX"
              autoComplete="tel"
              autoFocus
              className={inputClasses}
              {...register("whatsapp")}
            />
            <FieldError message={errors.whatsapp?.message} />
          </div>
        );

      // Step 4 — URL negocio (opcional)
      case 4:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuál es la URL de tu negocio?</label>
            <p className="text-sm text-gray-400 -mt-4 mb-2">Opcional</p>
            <input
              type="text"
              placeholder="https://tunegocio.com"
              autoFocus
              className={inputClasses}
              {...register("businessUrl")}
            />
          </div>
        );

      // Step 5 — Canales de marketing
      case 5:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cómo haces marketing ahorita?</label>
            <p className="text-sm text-gray-400 -mt-4 mb-2">Puedes seleccionar varios</p>

            {/* Options with logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MARKETING_CHANNELS_WITH_LOGO.map(({ value, label, logo }) => {
                const isSelected = marketingChannels.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleChannel(value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? "border-brand-beige bg-brand-beige/10"
                        : "border-white/10 hover:border-brand-beige/50"
                    }`}
                  >
                    <div className={`relative shrink-0 ${value === "TikTok Ads" ? "w-28 h-14" : value === "TikTok Shop" ? "w-28 h-12" : value === "WhatsApp" || value === "Instagram orgánico" || value === "Meta Ads" ? "w-12 h-12" : "w-8 h-8"}`}>
                      <Image
                        src={logo}
                        alt={label}
                        fill
                        className="object-contain"
                        sizes={value === "TikTok Ads" ? "112px" : value === "TikTok Shop" ? "112px" : value === "WhatsApp" || value === "Instagram orgánico" || value === "Meta Ads" ? "48px" : "32px"}
                      />
                    </div>
                    <span className="text-xs text-white font-montserrat text-center leading-tight">
                      {label}
                    </span>
                  </button>
                );
              })}

              {/* Text-only options */}
              {MARKETING_CHANNELS_TEXT_ONLY.map((value) => {
                const isSelected = marketingChannels.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleChannel(value)}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-colors cursor-pointer min-h-[72px] ${
                      isSelected
                        ? "border-brand-beige bg-brand-beige/10"
                        : "border-white/10 hover:border-brand-beige/50"
                    }`}
                  >
                    <span className="text-xs text-white font-montserrat text-center leading-tight">
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>

            <FieldError message={errors.marketingChannels?.message} />
          </div>
        );

      // Step 6 — Inversión en ads (auto-avance)
      case 6:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuánto inviertes en ads al mes?</label>
            <div className="space-y-2">
              {ADS_INVESTMENT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue("adsInvestment", option, { shouldValidate: true });
                    autoAdvance();
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                    adsInvestment === option
                      ? "border-brand-beige bg-brand-beige/10"
                      : "border-white/10 hover:border-brand-beige/50"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      adsInvestment === option ? "border-brand-beige" : "border-white/30"
                    }`}
                  >
                    {adsInvestment === option && (
                      <span className="h-2 w-2 rounded-full bg-brand-beige" />
                    )}
                  </span>
                  <span className="text-sm text-white font-montserrat">{option}</span>
                </button>
              ))}
            </div>
            <FieldError message={errors.adsInvestment?.message} />
          </div>
        );

      // Step 7 — Facturación mensual (auto-avance)
      case 7:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuánto factura tu negocio al mes?</label>
            <div className="space-y-2">
              {MONTHLY_REVENUE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue("monthlyRevenue", option, { shouldValidate: true });
                    autoAdvance();
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                    monthlyRevenue === option
                      ? "border-brand-beige bg-brand-beige/10"
                      : "border-white/10 hover:border-brand-beige/50"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      monthlyRevenue === option ? "border-brand-beige" : "border-white/30"
                    }`}
                  >
                    {monthlyRevenue === option && (
                      <span className="h-2 w-2 rounded-full bg-brand-beige" />
                    )}
                  </span>
                  <span className="text-sm text-white font-montserrat">{option}</span>
                </button>
              ))}
            </div>
            <FieldError message={errors.monthlyRevenue?.message} />
          </div>
        );

      // Step 8 — Meta 90 días
      case 8:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿A cuánto quieres llegar en 90 días?</label>
            <input
              type="text"
              placeholder="Ej: $150K MXN al mes, 500 clientes..."
              autoFocus
              className={inputClasses}
              {...register("goal90Days")}
            />
            <FieldError message={errors.goal90Days?.message} />
          </div>
        );

      // Step 9 — Cuándo empezar (auto-avance)
      case 9:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>¿Cuándo quieres empezar?</label>
            <div className="space-y-2">
              {START_WHEN_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue("startWhen", option, { shouldValidate: true });
                    autoAdvance();
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                    startWhen === option
                      ? "border-brand-beige bg-brand-beige/10"
                      : "border-white/10 hover:border-brand-beige/50"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      startWhen === option ? "border-brand-beige" : "border-white/30"
                    }`}
                  >
                    {startWhen === option && (
                      <span className="h-2 w-2 rounded-full bg-brand-beige" />
                    )}
                  </span>
                  <span className="text-sm text-white font-montserrat">{option}</span>
                </button>
              ))}
            </div>
            <FieldError message={errors.startWhen?.message} />
          </div>
        );

      // Step 10 — Obstáculo #1 (opcional)
      case 10:
        return (
          <div className="space-y-4">
            <label className={labelClasses}>
              ¿Cuál es el obstáculo #1 que te frena?{" "}
              <span className="text-gray-500 font-light normal-case">(opcional)</span>
            </label>
            <textarea
              rows={5}
              placeholder="Cuéntanos qué te impide crecer..."
              autoFocus
              className={`${inputClasses} resize-none`}
              {...register("mainObstacle")}
            />
            <FieldError message={errors.mainObstacle?.message} />
          </div>
        );

      default:
        return null;
    }
  }

  // ---- Render buttons per step --------------------------------------------

  function renderButtons() {
    const isAutoStep = [6, 7, 9].includes(currentStep);

    const backBtn = (
      <button
        type="button"
        onClick={goBack}
        className="btn-outline flex-1"
        aria-label="Paso anterior"
      >
        &larr; Atrás
      </button>
    );

    // Auto-advance steps: show back only (no next, selection triggers advance)
    if (isAutoStep) {
      return currentStep > 1 ? (
        <div className="flex gap-3">{backBtn}</div>
      ) : null;
    }

    // Step 10 — Submit
    if (currentStep === TOTAL_STEPS) {
      return (
        <div className="flex gap-3">
          {backBtn}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary flex-1 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Agendar cita"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Enviando...
              </>
            ) : (
              "✨ AGENDAR CITA"
            )}
          </button>
        </div>
      );
    }

    // First step — only next
    if (currentStep === 1) {
      return (
        <button
          type="button"
          onClick={goNext}
          className="btn-primary w-full"
          aria-label="Siguiente paso"
        >
          Siguiente &rarr;
        </button>
      );
    }

    // Steps 2–9 (non-auto)
    return (
      <div className="flex gap-3">
        {backBtn}
        <button
          type="button"
          onClick={goNext}
          className="btn-primary flex-1"
          aria-label="Siguiente paso"
        >
          Siguiente &rarr;
        </button>
      </div>
    );
  }

  // ---- Main render --------------------------------------------------------

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Formulario de calificación para agendar cita"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="relative bg-brand-gray rounded-2xl w-[90vw] max-w-[500px] max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {showSuccess ? (
              (() => {
                const isQualified =
                  submittedData != null &&
                  QUALIFIED_ADS_TIERS.has(submittedData.adsInvestment);
                const whatsappUrl = submittedData ? buildWhatsAppUrl(submittedData) : null;
                const calendlyUrl = submittedData ? buildCalendlyUrl(submittedData) : null;
                const showCtas = isQualified && (whatsappUrl || calendlyUrl);

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative p-8 sm:p-10 text-center"
                  >
                    <button
                      type="button"
                      onClick={handleClose}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                      aria-label="Cerrar"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </button>

                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1.2, 0.36, 1] }}
                      className="relative mx-auto mb-6 w-20 h-20 rounded-full bg-brand-beige/15 flex items-center justify-center"
                    >
                      <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-brand-beige/40 animate-ping" />
                      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-brand-beige" aria-hidden="true">
                        <motion.path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                        />
                      </svg>
                    </motion.div>

                    <h2 className="font-barlow font-black text-2xl sm:text-3xl uppercase text-white leading-tight mb-3">
                      ¡Datos enviados <span className="text-brand-beige">correctamente</span>!
                    </h2>
                    <p className="font-montserrat text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-sm mx-auto mb-8">
                      {showCtas
                        ? "Tu perfil encaja con lo que trabajamos. Agenda una llamada o contáctanos directo por WhatsApp."
                        : "Gracias por considerarnos. En breve nos pondremos en contacto contigo."}
                    </p>

                    {showCtas ? (
                      <div className="flex flex-col gap-3">
                        {calendlyUrl && (
                          <a
                            href={calendlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("Schedule", {
                                content_name: "Qualification Form - Calendly",
                                content_category: "Lead Qualified",
                              })
                            }
                            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-brand-beige text-brand-black font-barlow font-bold text-sm uppercase tracking-widest hover:bg-brand-beige-light transition-colors"
                          >
                            Agendar llamada
                          </a>
                        )}
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("Contact", {
                                content_name: "Qualification Form - WhatsApp",
                                content_category: "Lead Qualified",
                                method: "whatsapp",
                              })
                            }
                            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-[#25D366] text-white font-barlow font-bold text-sm uppercase tracking-widest hover:bg-[#1FB855] transition-colors"
                          >
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Enviar mis datos por WhatsApp
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={handleClose}
                          className="mt-1 text-sm font-montserrat text-gray-400 hover:text-white transition-colors py-2"
                        >
                          Cerrar
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-full h-12 rounded-xl bg-brand-beige text-brand-black font-barlow font-bold text-sm uppercase tracking-widest hover:bg-brand-beige-light transition-colors"
                      >
                        Cerrar
                      </button>
                    )}
                  </motion.div>
                );
              })()
            ) : (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-brand-gray z-10 p-6 pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="heading-md text-white">Agendar Cita</h2>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                      aria-label="Cerrar formulario"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div
                    className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-4"
                    role="progressbar"
                    aria-valuenow={currentStep}
                    aria-valuemin={1}
                    aria-valuemax={TOTAL_STEPS}
                    aria-label={`Paso ${currentStep} de ${TOTAL_STEPS}`}
                  >
                    <div
                      className="bg-brand-beige h-full transition-all duration-500 rounded-full"
                      style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                    />
                  </div>

                  {/* Step indicator */}
                  <p className="text-sm text-gray-400 mt-2 font-montserrat">
                    Paso {currentStep} de {TOTAL_STEPS}
                  </p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className="mt-8">{renderButtons()}</div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
