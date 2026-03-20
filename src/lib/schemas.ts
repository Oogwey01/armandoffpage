import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string().min(2, "Mínimo 2 caracteres"),
  lastName: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .min(8, "Teléfono inválido")
    .regex(/^[+]?[\d\s()-]+$/, "Formato de teléfono inválido"),
  country: z.string().min(1, "Selecciona un país"),
  city: z.string().min(2, "Mínimo 2 caracteres"),
});

export const step2Schema = z.object({
  businessStage: z.string().min(1, "Selecciona una opción"),
  industry: z.string().min(5, "Mínimo 5 caracteres"),
  businessType: z.string().min(1, "Selecciona una opción"),
});

export const step3Schema = z.object({
  challenges: z
    .array(z.string())
    .min(1, "Selecciona al menos un desafío")
    .max(3, "Máximo 3 desafíos"),
  marketingBudget: z.string().min(1, "Selecciona una opción"),
  roas: z.string().min(1, "Selecciona una opción"),
  conversionRate: z.string().optional(),
});

export const step4Schema = z.object({
  availability: z.string().min(1, "Selecciona una opción"),
  goals: z.string().min(10, "Mínimo 10 caracteres"),
  hasMentor: z.string().min(1, "Selecciona una opción"),
  committed: z.string().min(1, "Selecciona una opción"),
  referralSource: z.string().min(1, "Selecciona una opción"),
});

export const fullFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type FullFormData = z.infer<typeof fullFormSchema>;
