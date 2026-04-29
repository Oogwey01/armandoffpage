import type { Metadata } from "next";
import ReactDOM from "react-dom";

export const metadata: Metadata = {
  title: "Empieza ahora | Armando FF",
  description:
    "Mira el video y completa el formulario para revisar tu caso. Si tu perfil encaja, te agendamos una llamada de diagnóstico gratuita.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Empieza ahora | Armando FF",
    description:
      "Mira el video y completa el formulario para revisar tu caso.",
    type: "website",
    locale: "es_MX",
  },
};

export default function EmpezarLayout({ children }: { children: React.ReactNode }) {
  ReactDOM.preload("/images/backgrounds/backgroundFULL.webp", {
    as: "image",
    fetchPriority: "high",
  });
  return <>{children}</>;
}
