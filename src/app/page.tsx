"use client";

import dynamic from "next/dynamic";
import Header from "@/components/common/Header";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Pillars from "@/components/sections/Pillars";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import QualificationForm from "@/components/form/QualificationForm";
import { useFormModal } from "@/hooks/useFormModal";

const FooterContent = dynamic(
  () =>
    import("@/components/layout/FooterContent").then((m) => ({
      default: m.FooterContent,
    })),
  { ssr: false }
);

export default function Home() {
  const { isOpen, open, close } = useFormModal();

  return (
    <>
      <ScrollProgress />
      <Header onOpenForm={open} />
      <main className="relative bg-brand-black min-h-screen">
        {/* ── Fondo único continuo ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/backgrounds/backgroundFULL.webp')",
            backgroundSize: "100% 100%",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-brand-black/30 pointer-events-none" />
        <div className="relative z-10">
          <Hero onOpenForm={open} />
          <HowItWorks />
          <About />
          <Pillars onOpenForm={open} />
          <Testimonials />
        </div>
      </main>
      <FooterContent
        onOpenForm={open}
        leadMagnet={{
          eyebrow: "Siguiente paso",
          title: "Agenda tu diagnóstico gratuito",
          description:
            "En 30 minutos identificamos por dónde arrancar y armamos una propuesta a tu medida. Sin compromiso.",
          buttonLabel: "Agendar diagnóstico",
        }}
      />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
