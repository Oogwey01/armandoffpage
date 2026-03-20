"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";
import Statistics from "@/components/sections/Statistics";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Pillars from "@/components/sections/Pillars";
import FeaturedWebinar from "@/components/sections/FeaturedWebinar";
import ComingSoonServices from "@/components/sections/ComingSoonServices";
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
        <Statistics />
        <Services onOpenForm={open} />
        <About />
        <Pillars />
        <FeaturedWebinar onOpenForm={open} />
        <ComingSoonServices />
        <Testimonials />
      </main>
      <Footer />
      <QualificationForm isOpen={isOpen} onClose={close} />
    </>
  );
}
