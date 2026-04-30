import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

const projects = [
  {
    title: "Nova Analytics",
    tag: "SaaS Dashboard",
    desc: "Real-time analytics platform built with Next.js, Node.js & MongoDB.",
    img: p1,
    stack: ["Next.js", "Node", "MongoDB"],
  },
  {
    title: "Lumen Apparel",
    tag: "Shopify Store",
    desc: "Custom Shopify theme + headless storefront. +38% conversion lift.",
    img: p2,
    stack: ["Shopify", "Liquid", "React"],
  },
  {
    title: "Vault Finance",
    tag: "Mobile Web App",
    desc: "Personal finance PWA with secure auth and beautiful motion design.",
    img: p3,
    stack: ["React", "Node", "Stripe"],
  },
  {
    title: "Soverage Studio",
    tag: "Agency Site",
    desc: "Marketing site built in WordPress + Elementor with custom blocks.",
    img: p4,
    stack: ["WordPress", "Elementor"],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-28 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
      >
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-3">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Recent <span className="text-gradient">projects</span>.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-sm">
          A small selection of products I've designed, built and shipped recently.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            whileHover={{ y: -6 }}
            className="group glass rounded-3xl overflow-hidden block"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                width={1280}
                height={896}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary-glow mb-1">{p.tag}</p>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                </div>
                <ArrowUpRight className="size-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary/70 text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
