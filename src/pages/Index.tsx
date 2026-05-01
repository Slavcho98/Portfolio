import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Activities } from "@/components/landing/Activities";
import { Milestones } from "@/components/landing/Milestones";
import { Gallery } from "@/components/landing/Gallery";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Предучилишна подготовка за идни првачиња — LittleSprouts";
    const desc = "Развој на фина моторика, координација, соработка и следење инструкции — чекор по чекор до почетно пишување за деца од 5 до 7 години.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <Milestones />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
