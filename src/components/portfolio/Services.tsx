import { motion } from "framer-motion";
import {
  Code2,
  ShoppingBag,
  Layout,
  Server,
  TrendingUp,
  Bot,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web App Development",
    desc: "Full-stack web apps, admin dashboards and analytics with React, Next.js, Node.js, MongoDB and Supabase. Google Tag Manager included where needed.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify & E-commerce",
    desc: "Custom Shopify themes, headless storefronts and conversion-tuned product experiences.",
  },
  {
    icon: Layout,
    title: "WordPress & Elementor",
    desc: "Marketing sites, landing pages and custom blocks with a focus on speed and SEO.",
  },
  {
    icon: Server,
    title: "APIs & Backend",
    desc: "REST APIs, auth, Stripe and Solidgate integrations, payments and database modeling done right.",
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Google Ads, Meta and LinkedIn Ads, conversion tracking and analytics to grow and measure what matters.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Custom AI chatbots, workflow automation with GPT APIs, intelligent lead capture and automated content generation to save time and scale faster.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-28 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-14"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-3">
          Services
        </p>
        <h2 className="text-3xl md:text-5xl font-bold">
          What I can <span className="text-gradient">build for you</span>.
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass rounded-3xl p-6 group"
          >
            <div className="size-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <s.icon className="size-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
