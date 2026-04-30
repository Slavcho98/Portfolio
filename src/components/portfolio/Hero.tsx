import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import profile from "@/assets/profile.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden noise">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="container mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-6"
          >
            <span className="size-2 rounded-full bg-primary-glow animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
          >
            Full‑stack developer<br />
            crafting <span className="text-gradient">digital products</span> that ship.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-muted-foreground max-w-xl mb-10"
          >
            I build fast, beautiful web apps and e‑commerce experiences with
            React, Next.js, Node.js, MongoDB, Shopify and WordPress / Elementor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-gradient-primary px-6 py-3.5 rounded-full font-medium hover:opacity-90 transition-all glow"
            >
              View Projects
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 glass px-6 py-3.5 rounded-full font-medium hover:bg-secondary/60 transition-colors"
            >
              <Mail className="size-4" />
              Contact me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground"
          >
            {["React", "Next.js", "Node.js", "MongoDB", "Shopify", "WordPress"].map((t) => (
              <span key={t} className="opacity-80">{t}</span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square rounded-[2rem] overflow-hidden glow bg-gradient-to-br from-primary/40 via-primary-glow/20 to-secondary"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 60%, hsl(250 90% 70% / 0.45), transparent 65%)" }}
            />
            <img
              src={profile}
              alt="Portrait of the developer"
              width={1024}
              height={1024}
              className="relative w-full h-full object-cover object-top"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
