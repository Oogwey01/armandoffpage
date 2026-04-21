import type { Metadata } from "next";
import { Barlow, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const bebasNeue = localFont({
  src: "../../public/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armando FresaFit | Mentoría Empresarial & Estrategia de Negocios",
  description:
    "5 años convirtiendo errores en aprendizaje. Mentoría empresarial, webinars y consultoría estratégica para emprendedores que buscan escalar sus negocios con resultados reales.",
  keywords: [
    "mentoría empresarial",
    "consultoría de negocios",
    "webinars",
    "estrategia de negocios",
    "Armando FresaFit",
    "emprendimiento",
    "marketing digital",
    "escalar negocio",
  ],
  openGraph: {
    title: "Armando FresaFit | Mentoría Empresarial",
    description:
      "Estrategia real de un joven empresario mexicano. Mentoría, webinars y consultoría para escalar tu negocio.",
    type: "website",
    locale: "es_MX",
    siteName: "Armando FresaFit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Armando FresaFit | Mentoría Empresarial",
    description:
      "5 años convirtiendo errores en aprendizaje. Estrategia real para emprendedores.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${barlow.variable} ${montserrat.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}
