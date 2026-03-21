import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinar: Publicidad en Facebook META con Poco Presupuesto | ArmandoFF",
  description:
    "Aprende a estructurar campañas rentables en Facebook (META) con poco presupuesto. Sesión interactiva de 80 minutos con casos reales. 31 de marzo, 2026 — $297 MXN.",
};

export default function WebinarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
