import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Built our multilingual site with great attention to detail and clear communication throughout. The end result exceeded our expectations.",
    name: "BrainARC Team",
    role: "Mental Health & Neurodiagnostic Practice",
  },
  {
    quote:
      "Professional, reliable, and creative. Delivered our corporate website with bilingual support and a clean modern design that perfectly represents our brand.",
    name: "Panovi Team",
    role: "Panovi, Workwear Manufacturer",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-28 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-14"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-3">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">
          What <span className="text-gradient">clients say</span>.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass rounded-3xl p-8 relative"
          >
            <Quote className="size-8 text-primary mb-6 opacity-70" />
            <blockquote className="text-lg leading-relaxed text-foreground/90 mb-6">
              "{t.quote}"
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <div className="size-10 aspect-square rounded-full bg-gradient-primary flex items-center justify-center font-semibold shrink-0">
                {t.name[0]}
              </div>
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};
