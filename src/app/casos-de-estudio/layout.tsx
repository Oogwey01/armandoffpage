import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hub de Resultados | ArmandoFF",
  description:
    "Entrevistas, reseñas escritas y casos de estudio reales de los clientes del Método Rush. Más de 600 marcas han escalado con nosotros.",
};

export default function CasosDeEstudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
