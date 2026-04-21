import type { Metadata } from "next";
import ContenidoClient from "./ContenidoClient";

export const metadata: Metadata = {
  title: "Contenido premium para e-commerce | Armando FF",
  description:
    "Dirección creativa, UGC, producciones y diseño estático para marcas que quieren escalar con contenido que vende. Tiers mensuales todo incluido.",
};

export default function ContenidoPage() {
  return <ContenidoClient />;
}
