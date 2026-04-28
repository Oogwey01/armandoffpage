import type { Metadata } from "next";
import Sistema360Client from "./Sistema360Client";

export const metadata: Metadata = {
  title: "Sistema 360 — La oferta completa | Armando FF",
  description:
    "Marketing & Marketplaces, Contenido & Ads, y CRM a la medida. Un solo sistema para escalar tu marca: arranca por la pieza más urgente, los tres ejes se potencian.",
};

export default function Sistema360Page() {
  return <Sistema360Client />;
}
