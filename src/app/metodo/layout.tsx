import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Método Rush | ArmandoFF",
  description:
    "Copia y pega el embudo de crecimiento ecom de $2 mil millones que está reemplazando agencias mientras reduce el CAC en 40% y aumenta el ROAS en 221%.",
};

export default function MetodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
