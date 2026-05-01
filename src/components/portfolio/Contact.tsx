import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-28 container mx-auto">
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
        <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-4">
          Let's talk
        </p>
        <h2 className="text-3xl md:text-6xl font-bold max-w-3xl mx-auto mb-6">
          Have a project in mind?{" "}
          <span className="text-gradient">Let's talk.</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Send me a message via the chat widget or drop me an email. I'll get
          back within 24 hours.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:slavcho.karamfiloski@gmail.com"
            className="group inline-flex items-center gap-2 bg-gradient-primary px-7 py-4 rounded-full font-medium hover:opacity-90 transition-all glow"
          >
            <Mail className="size-4" />
            Email me
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            className="group inline-flex items-center gap-2 border border-border px-7 py-4 rounded-full font-medium hover:bg-secondary/50 transition-all"
          >
            <MessageCircle className="size-4" />
            Chat with me
          </button>
        </div>
      </motion.div>

      <footer className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Slavcho. Full-stack developer.</p>
        <div className="flex gap-6">
          <a
            href="https://github.com/Slavcho98"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <FaGithub className="size-4" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/slavcho-karamfiloski-b5bbb3201"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <FaLinkedin className="size-4" /> LinkedIn
          </a>
        </div>
      </footer>
    </section>
  );
};
