"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Pillars from "@/components/sections/Pillars";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import QualificationForm from "@/components/form/QualificationForm";
import { useFormModal } from "@/hooks/useFormModal";

export default function Home() {
  const { isOpen, open, close } = useFormModal();

  return (
    <>
      <Header onOpenForm={open} />
      <main>
        <Hero onOpenForm={open} />
        <HowItWorks />
        <Services onOpenForm={open} />
        <About />
        <Pillars onOpenForm={open} />
        <Testimonials />
      </main>
      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
