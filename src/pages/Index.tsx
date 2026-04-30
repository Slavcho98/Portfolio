import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Projects } from "@/components/portfolio/Projects";
import { Services } from "@/components/portfolio/Services";
import { Contact } from "@/components/portfolio/Contact";
import { ChatWidget } from "@/components/portfolio/ChatWidget";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Testimonials />
      <Projects />
      <Services />
      <Contact />
      <ChatWidget />
    </main>
  );
};

export default Index;
