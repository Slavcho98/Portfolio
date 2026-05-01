import { motion } from "framer-motion";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Certifications", href: "#certifications" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1100px)]"
    >
      <nav className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight text-lg">
          <span className="text-gradient">Slavcho</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-sm bg-gradient-primary px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Hire me
        </a>
      </nav>
    </motion.header>
  );
};
