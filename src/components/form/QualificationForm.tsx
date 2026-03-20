"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  FullFormData,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
} from "@/lib/schemas";
import { COUNTRIES } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/components/common/Icons";

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

const STORAGE_KEY = "armandoff-form-data";

const BUSINESS_STAGES = [
  "No tengo negocio aún",
  "Negocio muy nuevo (<3 meses)",
  "Etapa inicial ($0-$2k/mes)",
  "En crecimiento ($2k-$10k/mes)",
  "Escalado ($10k-$50k/mes)",
  "Maduro ($50k+/mes)",
] as const;

const BUSINESS_TYPES = [
  "E-commerce",
  "Servicios/Consulting",
  "Producto digital/Cursos",
  "SaaS",
  "Dropshipping",
  "Afiliados",
  "Marca personal/Coaching",
  "Otro",
] as const;

const CHALLENGES = [
  "No tengo estrategia clara",
  "Bajo ROAS en publicidad",
  "Bajo porcentaje de conversión",
  "No sé cómo escalar",
  "Contratación/Team building",
  "Posicionamiento/Branding",
  "No sé hacer marketing",
  "Falta de sistemas",
] as const;

const MARKETING_BUDGETS = [
  "Menos de $500",
  "$500-$2k",
  "$2k-$5k",
  "$5k-$10k",
  "$10k-$25k",
  "$25k-$50k",
  "$50k+",
  "No he invertido",
] as const;

const ROAS_OPTIONS = [
  "Negativo",
  "Break-even",
  "1-2",
  "2-4",
  "4-8",
  "8+",
  "No sé",
] as const;

const AVAILABILITY_OPTIONS = [
  "Esta semana",
  "Próxima semana",
  "En 2-3 semanas",
  "Flexible",
  "Solo quiero información",
] as const;

const COMMITTED_OPTIONS = [
  "Sí, estoy listo",
  "Necesito pensarlo",
  "Depende del precio",
] as const;

const REFERRAL_SOURCES = [
  "Google",
  "Instagram",
  "TikTok",
  "YouTube",
  "Recomendación",
  "Ads",
  "Otro",
] as const;

// ---------------------------------------------------------------------------
// Style constants
// ---------------------------------------------------------------------------

const inputClasses =
  "w-full bg-brand-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-beige focus:ring-1 focus:ring-brand-beige outline-none transition-colors font-montserrat text-sm";

const labelClasses = "block text-sm font-barlow font-semibold text-white mb-2";

const errorClasses = "text-red-400 text-xs mt-1";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSavedData(): Partial<FullFormData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveData(partial: Partial<FullFormData>) {
  try {
    const existing = getSavedData();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existing, ...partial })
    );
  } catch {
    // Silently fail – localStorage may be unavailable
  }
}

function clearSavedData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

// ---------------------------------------------------------------------------
// Reusable sub-components
// ---------------------------------------------------------------------------

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className={errorClasses} role="alert">
      {message}
    </p>
  );
}

function RadioOption({
  name,
  value,
  label,
  selected,
  register,
}: {
  name: string;
  value: string;
  label: string;
  selected: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}) {
  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
        selected
          ? "border-brand-beige bg-brand-beige/10"
          : "border-white/10 hover:border-brand-beige/50"
      }`}
    >
      <input
        type="radio"
        value={value}
        {...register(name)}
        className="sr-only"
        aria-label={label}
      />
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-brand-beige" : "border-white/30"
        }`}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-brand-beige" />
        )}
      </span>
      <span className="text-sm text-white font-montserrat">{label}</span>
    </label>
  );
}

function CheckboxOption({
  value,
  label,
  checked,
  disabled,
  onChange,
}: {
  value: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (val: string, checked: boolean) => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
        checked
          ? "border-brand-beige bg-brand-beige/10"
          : disabled && !checked
          ? "border-white/5 opacity-50 cursor-not-allowed"
          : "border-white/10 hover:border-brand-beige/50"
      }`}
    >
      <input
        type="checkbox"
        value={value}
        checked={checked}
        disabled={disabled && !checked}
        onChange={(e) => onChange(value, e.target.checked)}
        className="sr-only"
        aria-label={label}
      />
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
          checked ? "border-brand-beige bg-brand-beige" : "border-white/30"
        }`}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-brand-black"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>
      <span className="text-sm text-white font-montserrat">{label}</span>
    </label>
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
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------

function Step1({
  form,
}: {
  form: UseFormReturn<Step1Data>;
}) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-barlow font-bold text-brand-beige">
        Información Personal
      </h3>

      {/* First name */}
      <div>
        <label htmlFor="firstName" className={labelClasses}>
          Nombre <span className="text-red-400">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="Tu nombre"
          autoComplete="given-name"
          className={inputClasses}
          {...register("firstName")}
        />
        <FieldError message={errors.firstName?.message} />
      </div>

      {/* Last name */}
      <div>
        <label htmlFor="lastName" className={labelClasses}>
          Apellido <span className="text-red-400">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Tu apellido"
          autoComplete="family-name"
          className={inputClasses}
          {...register("lastName")}
        />
        <FieldError message={errors.lastName?.message} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          className={inputClasses}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClasses}>
          Teléfono <span className="text-red-400">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+52 XXX XXX XXXX"
          autoComplete="tel"
          className={inputClasses}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className={labelClasses}>
          País <span className="text-red-400">*</span>
        </label>
        <select
          id="country"
          className={`${inputClasses} appearance-none`}
          {...register("country")}
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona tu país
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FieldError message={errors.country?.message} />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className={labelClasses}>
          Ciudad <span className="text-red-400">*</span>
        </label>
        <input
          id="city"
          type="text"
          placeholder="Tu ciudad"
          autoComplete="address-level2"
          className={inputClasses}
          {...register("city")}
        />
        <FieldError message={errors.city?.message} />
      </div>
    </div>
  );
}

function Step2({
  form,
}: {
  form: UseFormReturn<Step2Data>;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const selectedStage = watch("businessStage");
  const selectedType = watch("businessType");

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-barlow font-bold text-brand-beige">
        Situación Actual
      </h3>

      {/* Business stage */}
      <fieldset>
        <legend className={labelClasses}>
          Etapa de negocio <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {BUSINESS_STAGES.map((stage) => (
            <RadioOption
              key={stage}
              name="businessStage"
              value={stage}
              label={stage}
              selected={selectedStage === stage}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.businessStage?.message} />
      </fieldset>

      {/* Industry */}
      <div>
        <label htmlFor="industry" className={labelClasses}>
          Industria / Nicho <span className="text-red-400">*</span>
        </label>
        <input
          id="industry"
          type="text"
          placeholder="Ej: Fitness, E-commerce, SaaS..."
          className={inputClasses}
          {...register("industry")}
        />
        <FieldError message={errors.industry?.message} />
      </div>

      {/* Business type */}
      <fieldset>
        <legend className={labelClasses}>
          Tipo de negocio <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {BUSINESS_TYPES.map((type) => (
            <RadioOption
              key={type}
              name="businessType"
              value={type}
              label={type}
              selected={selectedType === type}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.businessType?.message} />
      </fieldset>
    </div>
  );
}

function Step3({
  form,
}: {
  form: UseFormReturn<Step3Data>;
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedBudget = watch("marketingBudget");
  const selectedRoas = watch("roas");
  const challenges = watch("challenges") || [];

  const handleChallengeChange = useCallback(
    (value: string, checked: boolean) => {
      const current = [...challenges];
      if (checked) {
        if (current.length < 3) {
          setValue("challenges", [...current, value], {
            shouldValidate: true,
          });
        }
      } else {
        setValue(
          "challenges",
          current.filter((c) => c !== value),
          { shouldValidate: true }
        );
      }
    },
    [challenges, setValue]
  );

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-barlow font-bold text-brand-beige">
        Desafíos & Presupuesto
      </h3>

      {/* Challenges */}
      <fieldset>
        <legend className={labelClasses}>
          Principales desafíos (máx. 3){" "}
          <span className="text-red-400">*</span>
        </legend>
        <p className="text-xs text-gray-400 mb-2">
          Seleccionados: {challenges.length}/3
        </p>
        <div className="space-y-2">
          {CHALLENGES.map((challenge) => (
            <CheckboxOption
              key={challenge}
              value={challenge}
              label={challenge}
              checked={challenges.includes(challenge)}
              disabled={challenges.length >= 3}
              onChange={handleChallengeChange}
            />
          ))}
        </div>
        <FieldError message={errors.challenges?.message} />
      </fieldset>

      {/* Marketing budget */}
      <fieldset>
        <legend className={labelClasses}>
          Presupuesto de marketing mensual{" "}
          <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {MARKETING_BUDGETS.map((budget) => (
            <RadioOption
              key={budget}
              name="marketingBudget"
              value={budget}
              label={budget}
              selected={selectedBudget === budget}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.marketingBudget?.message} />
      </fieldset>

      {/* ROAS */}
      <fieldset>
        <legend className={labelClasses}>
          ROAS actual <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {ROAS_OPTIONS.map((option) => (
            <RadioOption
              key={option}
              name="roas"
              value={option}
              label={option}
              selected={selectedRoas === option}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.roas?.message} />
      </fieldset>

      {/* Conversion rate */}
      <div>
        <label htmlFor="conversionRate" className={labelClasses}>
          Tasa de conversión (opcional)
        </label>
        <input
          id="conversionRate"
          type="text"
          placeholder="Ej: 2.5%"
          className={inputClasses}
          {...register("conversionRate")}
        />
        <FieldError message={errors.conversionRate?.message} />
      </div>
    </div>
  );
}

function Step4({
  form,
}: {
  form: UseFormReturn<Step4Data>;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const selectedAvailability = watch("availability");
  const selectedHasMentor = watch("hasMentor");
  const selectedCommitted = watch("committed");
  const selectedReferral = watch("referralSource");

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-barlow font-bold text-brand-beige">
        Disponibilidad & Intención
      </h3>

      {/* Availability */}
      <fieldset>
        <legend className={labelClasses}>
          Disponibilidad <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((option) => (
            <RadioOption
              key={option}
              name="availability"
              value={option}
              label={option}
              selected={selectedAvailability === option}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.availability?.message} />
      </fieldset>

      {/* Goals */}
      <div>
        <label htmlFor="goals" className={labelClasses}>
          Objetivos <span className="text-red-400">*</span>
        </label>
        <textarea
          id="goals"
          rows={4}
          placeholder="Describe qué quieres lograr con la mentoría..."
          className={`${inputClasses} resize-none`}
          {...register("goals")}
        />
        <FieldError message={errors.goals?.message} />
      </div>

      {/* Has mentor */}
      <fieldset>
        <legend className={labelClasses}>
          ¿Tienes o has tenido un mentor? <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {["Sí", "No"].map((option) => (
            <RadioOption
              key={option}
              name="hasMentor"
              value={option}
              label={option}
              selected={selectedHasMentor === option}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.hasMentor?.message} />
      </fieldset>

      {/* Committed */}
      <fieldset>
        <legend className={labelClasses}>
          Nivel de compromiso <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {COMMITTED_OPTIONS.map((option) => (
            <RadioOption
              key={option}
              name="committed"
              value={option}
              label={option}
              selected={selectedCommitted === option}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.committed?.message} />
      </fieldset>

      {/* Referral source */}
      <fieldset>
        <legend className={labelClasses}>
          ¿Cómo nos encontraste? <span className="text-red-400">*</span>
        </legend>
        <div className="space-y-2">
          {REFERRAL_SOURCES.map((source) => (
            <RadioOption
              key={source}
              name="referralSource"
              value={source}
              label={source}
              selected={selectedReferral === source}
              register={register}
            />
          ))}
        </div>
        <FieldError message={errors.referralSource?.message} />
      </fieldset>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function QualificationForm({
  isOpen,
  onClose,
}: QualificationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Form instances (one per step, each with its own Zod resolver) ------

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      businessStage: "",
      industry: "",
      businessType: "",
    },
  });

  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      challenges: [],
      marketingBudget: "",
      roas: "",
      conversionRate: "",
    },
  });

  const form4 = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      availability: "",
      goals: "",
      hasMentor: "",
      committed: "",
      referralSource: "",
    },
  });

  // ---- Restore saved data from localStorage on mount ---------------------

  useEffect(() => {
    const saved = getSavedData();
    if (!saved || Object.keys(saved).length === 0) return;

    // Step 1 fields
    if (saved.firstName) form1.setValue("firstName", saved.firstName);
    if (saved.lastName) form1.setValue("lastName", saved.lastName);
    if (saved.email) form1.setValue("email", saved.email);
    if (saved.phone) form1.setValue("phone", saved.phone);
    if (saved.country) form1.setValue("country", saved.country);
    if (saved.city) form1.setValue("city", saved.city);

    // Step 2 fields
    if (saved.businessStage) form2.setValue("businessStage", saved.businessStage);
    if (saved.industry) form2.setValue("industry", saved.industry);
    if (saved.businessType) form2.setValue("businessType", saved.businessType);

    // Step 3 fields
    if (saved.challenges) form3.setValue("challenges", saved.challenges);
    if (saved.marketingBudget) form3.setValue("marketingBudget", saved.marketingBudget);
    if (saved.roas) form3.setValue("roas", saved.roas);
    if (saved.conversionRate) form3.setValue("conversionRate", saved.conversionRate);

    // Step 4 fields
    if (saved.availability) form4.setValue("availability", saved.availability);
    if (saved.goals) form4.setValue("goals", saved.goals);
    if (saved.hasMentor) form4.setValue("hasMentor", saved.hasMentor);
    if (saved.committed) form4.setValue("committed", saved.committed);
    if (saved.referralSource) form4.setValue("referralSource", saved.referralSource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Navigation helpers ------------------------------------------------

  const handleNext = useCallback(async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await form1.trigger();
        if (isValid) saveData(form1.getValues());
        break;
      case 2:
        isValid = await form2.trigger();
        if (isValid) saveData(form2.getValues());
        break;
      case 3:
        isValid = await form3.trigger();
        if (isValid) saveData(form3.getValues());
        break;
      default:
        return;
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  }, [currentStep, form1, form2, form3]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // ---- Submit handler ----------------------------------------------------

  const handleSubmit = useCallback(async () => {
    const isValid = await form4.trigger();
    if (!isValid) return;

    // Persist step 4 data
    saveData(form4.getValues());

    setIsSubmitting(true);

    try {
      const allData: FullFormData = {
        ...form1.getValues(),
        ...form2.getValues(),
        ...form3.getValues(),
        ...form4.getValues(),
      };

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.message || `Error del servidor (${response.status})`
        );
      }

      // Success – clear saved form data
      clearSavedData();

      // Open Calendly with pre-filled params
      const { firstName, lastName, email } = allData;
      const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
      if (calendlyUrl) {
        window.open(
          `${calendlyUrl}?name=${encodeURIComponent(
            firstName + " " + lastName
          )}&email=${encodeURIComponent(email)}`,
          "_blank"
        );
      }

      // Close the modal
      onClose();

      // Reset forms and step
      form1.reset();
      form2.reset();
      form3.reset();
      form4.reset();
      setCurrentStep(1);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado. Inténtalo de nuevo.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [form1, form2, form3, form4, onClose]);

  // ---- Overlay click handler ---------------------------------------------

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // ---- Step transition animation -----------------------------------------

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  // ---- Render current step content ---------------------------------------

  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key={1}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Step1 form={form1} />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key={2}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Step2 form={form2} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key={3}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Step3 form={form3} />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key={4}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Step4 form={form4} />
          </motion.div>
        );
      default:
        return null;
    }
  }

  // ---- Render buttons per step -------------------------------------------

  function renderButtons() {
    const backButton = (
      <button
        type="button"
        onClick={handleBack}
        className="btn-outline flex-1"
        aria-label="Paso anterior"
      >
        &larr; Atrás
      </button>
    );

    if (currentStep === 1) {
      return (
        <button
          type="button"
          onClick={handleNext}
          className="btn-primary w-full"
          aria-label="Siguiente paso"
        >
          Siguiente &rarr;
        </button>
      );
    }

    if (currentStep < 4) {
      return (
        <div className="flex gap-3">
          {backButton}
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary flex-1"
            aria-label="Siguiente paso"
          >
            Siguiente &rarr;
          </button>
        </div>
      );
    }

    // Step 4 – final submit
    return (
      <div className="flex gap-3">
        {backButton}
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
            "\u2728 AGENDAR CITA"
          )}
        </button>
      </div>
    );
  }

  // ---- Main render -------------------------------------------------------

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
                aria-valuemax={4}
                aria-label={`Paso ${currentStep} de 4`}
              >
                <div
                  className="bg-brand-beige h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>

              {/* Step indicator */}
              <p className="text-sm text-gray-400 mt-2 font-montserrat">
                Paso {currentStep} de 4
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Buttons */}
              <div className="mt-8">{renderButtons()}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
