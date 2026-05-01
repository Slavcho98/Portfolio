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
      className="fixed top-4 inset-x-0 mx-auto z-50 w-2/3"
    >
      <nav className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight text-lg flex-1">
          <span className="text-gradient">Slavcho</span>
        </a>
        <ul className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
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
        <div className="flex-1 flex justify-end">
          <a
            href="#contact"
            className="text-sm bg-gradient-primary px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Hire me
          </a>
        </div>
      </nav>
    </motion.header>
  );
};
