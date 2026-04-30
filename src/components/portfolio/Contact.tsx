import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-28 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative glass rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden noise"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-80"
          style={{ background: "var(--gradient-glow)" }}
        />
        <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-4">Let's talk</p>
        <h2 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto mb-6">
          Have a project in mind? <span className="text-gradient">Let's build it.</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Drop me a line and I'll get back within 24 hours. Free 30-minute discovery call included.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-2 bg-gradient-primary px-7 py-4 rounded-full font-medium hover:opacity-90 transition-all glow"
          >
            <Mail className="size-4" />
            hello@example.com
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      <footer className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} dev.folio — Full-stack developer.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
        </div>
      </footer>
    </section>
  );
};
