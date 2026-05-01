import { motion } from "framer-motion";
import { ArrowRight, Mail, Briefcase, BadgeCheck } from "lucide-react";
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
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <Briefcase className="size-3" />
              Available for new projects
            </span>
            <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-medium">
              <BadgeCheck className="size-3.5 text-primary-glow" />
              <span className="text-gradient">Certified Developer</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold leading-[1.05] mb-6"
          >
            Full‑stack developer
            <br />
            crafting <span className="text-gradient">
              digital products
            </span>{" "}
            that ship.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-muted-foreground max-w-xl mb-6"
          >
            I build fast, beautiful web apps that help brands grow and stand out
            online. I help e‑commerce businesses increase conversions, fix slow
            websites and turn visitors into customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-8 mb-10"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gradient">2+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Years Experience
              </span>
            </div>
            <div className="w-px bg-border/50" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gradient">5+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Projects
              </span>
            </div>
          </motion.div>

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
            {[
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "Supabase",
              "Firebase",
              "Tailwind",
              "Shopify",
              "WordPress",
            ].map((t) => (
              <span key={t} className="opacity-80">
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-center mt-10 lg:mt-0"
        >
          {/* Decorative orbiting ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute size-[300px] md:size-[420px] rounded-full border border-primary/20"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, hsl(243 75% 59% / 0.6) 90deg, transparent 180deg, hsl(260 85% 65% / 0.4) 270deg, transparent 360deg)",
              maskImage:
                "radial-gradient(circle, transparent 58%, black 59%, black 60%, transparent 61%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 58%, black 59%, black 60%, transparent 61%)",
            }}
          />
          {/* Soft glow halo */}
          <div
            aria-hidden
            className="absolute size-[260px] md:size-[380px] rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, hsl(243 75% 59% / 0.5), transparent 70%)",
            }}
          />

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[240px] h-[300px] md:w-[340px] md:h-[400px] rounded-[2rem] overflow-hidden glow"
            style={{
              background:
                "linear-gradient(160deg, hsl(243 75% 59%) 0%, hsl(260 85% 50%) 50%, hsl(235 50% 14%) 100%)",
              boxShadow:
                "0 30px 80px -20px hsl(243 75% 30% / 0.6), inset 0 0 0 1px hsl(230 30% 96% / 0.08)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 90%, hsl(250 90% 70% / 0.55), transparent 60%)",
              }}
            />
            <img
              src={profile}
              alt="Portrait of the developer"
              width={1024}
              height={1024}
              className="relative w-full h-full object-cover object-top"
            />
            {/* Subtle bottom gradient for depth */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "linear-gradient(to top, hsl(240 60% 6% / 0.5), transparent)",
              }}
            />
          </motion.div>

          {/* Floating tag badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-16 glass rounded-2xl px-4 py-2.5 text-sm font-medium shadow-lg"
          >
            <span className="text-gradient">⚡ React</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -right-2 bottom-20 glass rounded-2xl px-4 py-2.5 text-sm font-medium shadow-lg"
          >
            <span className="text-gradient">🛍 Shopify</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
