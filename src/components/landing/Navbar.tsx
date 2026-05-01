import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const links = [
  { href: "#activities", label: "Активности" },
  { href: "#milestones", label: "Развој" },
  { href: "#gallery", label: "Галерија" },
  { href: "#about", label: "За нас" },
  { href: "#contact", label: "Контакт" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <nav className="container flex items-center justify-between h-18 py-3">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft animate-wiggle">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>Little<span className="text-primary">Sprouts</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8 font-semibold text-foreground/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-primary transition-smooth">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="hero" size="default" asChild>
          <a href="#contact">Запиши се</a>
        </Button>
      </nav>
    </header>
  );
};
