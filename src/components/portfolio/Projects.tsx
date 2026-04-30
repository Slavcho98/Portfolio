import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import pDashboard from "@/assets/project-dashboard.png";
import pBrainarc from "@/assets/project-brainarc.png";
import pBankist from "@/assets/project-bankist.png";
import pPanovi from "@/assets/project-panovi.png";

const projects = [
  {
    title: "Panovi",
    tag: "Corporate Site",
    desc: "Workwear manufacturer site with bilingual support and rich brand storytelling.",
    img: pPanovi,
    stack: ["Next.js", "Tailwind"],
    href: "https://www.panovi.mk/",
  },
  {
    title: "BrainARC",
    tag: "React Website",
    desc: "Multilingual consulting website for child & adolescent psychiatry.",
    img: pBrainarc,
    stack: ["React", "Tailwind CSS"],
    href: "https://brainarc-skopje.mk/",
  },
  {
    title: "The Wild Oasis",
    tag: "SaaS Dashboard",
    desc: "Hotel management dashboard with bookings, sales analytics & occupancy tracking.",
    img: pDashboard,
    stack: ["React", "Styled Components", "Supabase"],
    href: "https://sk-the-wild-oasis.netlify.app/login",
  },
  {
    title: "Bankist",
    tag: "Banking Web App",
    desc: "Minimalist online banking experience with smooth interactions.",
    img: pBankist,
    stack: ["JavaScript", "HTML", "CSS"],
    href: "https://cosmic-biscuit-8a6736.netlify.app/",
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
          <p className="text-sm uppercase tracking-[0.2em] text-primary-glow mb-3">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">projects</span>.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-sm">
          A small selection of products I've designed, built and shipped.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
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
                  <p className="text-xs uppercase tracking-wider text-primary-glow mb-1">
                    {p.tag}
                  </p>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                </div>
                <ArrowUpRight className="size-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary/70 text-muted-foreground"
                  >
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
