import type { Metadata } from "next";
import { Barlow, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { MetaPixel } from "@/components/common/MetaPixel";

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

const mrDafoe = localFont({
  src: "../../public/fonts/MrDafoe-Regular.ttf",
  variable: "--font-dafoe",
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
  icons: {
    icon: [
      { url: "/images/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/images/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/images/favicon/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/favicon/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${barlow.variable} ${montserrat.variable} ${mrDafoe.variable}`}>
      <body>
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
