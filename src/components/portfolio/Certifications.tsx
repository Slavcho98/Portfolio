import { motion } from "framer-motion";
import { Award, Download, ExternalLink } from "lucide-react";

export const Certifications = () => {
  return (
    <section id="certifications" className="py-16 md:py-28 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-12"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-3">
          Credentials
        </p>
        <h2 className="text-3xl md:text-5xl font-bold">
          Certified <span className="text-gradient">Front‑end Developer</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative glass rounded-[2rem] p-8 md:p-10 overflow-hidden noise"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        />

        <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start">
          <div
            className="size-16 rounded-2xl flex items-center justify-center glow shrink-0"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Award className="size-8" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-1">
              Front‑end Programming Academy
            </h3>
            <p className="text-muted-foreground mb-1">
              Brainster · Issued Oct 28, 2024
            </p>
            <p className="text-xs text-muted-foreground/70 mb-5 font-mono">
              ID: d439a766-a666-4096-828b-ac2fb4ec22ed
            </p>

            <p className="text-muted-foreground max-w-xl">
              Successfully completed the Front‑end Programming Academy with a
              high degree of competence and excellent usage of relevant theory,
              methodology, tools and technology.
            </p>
          </div>

          <div className="flex md:flex-col gap-3 md:items-stretch">
            <a
              href="/certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-primary px-5 py-3 rounded-full font-medium text-sm hover:opacity-90 transition-all glow whitespace-nowrap"
            >
              <ExternalLink className="size-4" />
              View
            </a>
            <a
              href="/certificate.pdf"
              download="Slavcho-Karamfiloski-Certificate.pdf"
              className="inline-flex items-center justify-center gap-2 glass px-5 py-3 rounded-full font-medium text-sm hover:bg-secondary/60 transition-colors whitespace-nowrap"
            >
              <Download className="size-4" />
              Download
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
