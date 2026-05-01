import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const SIGNUP_URL = "https://forms.gle/aeTHsyDrK9cwKq9N8";

export const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-warm text-primary-foreground p-10 md:p-16 shadow-pop">
          <div aria-hidden className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-sunshine/40 blur-2xl" />
          <div aria-hidden className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-lavender/40 blur-2xl" />
          <div aria-hidden className="absolute top-8 right-12 text-4xl animate-float-slow">🌟</div>
          <div aria-hidden className="absolute bottom-10 right-1/3 text-3xl animate-wiggle">✏️</div>

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/20 backdrop-blur px-4 py-1.5 text-sm font-bold mb-5">
              <Sparkles className="h-4 w-4" /> Предучилишна подготовка
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Запиши го твоето дете за идни првачиња
            </h2>
            <p className="text-lg opacity-95 mb-8 max-w-lg">
              Пополнете ја кратката пријава и ќе ве контактираме со информации за
              нашите работилници, термини и сите детали за програмата.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="sunshine" size="xl" asChild>
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Пополни пријава <ArrowRight />
                </a>
              </Button>
            </div>
            <p className="text-sm opacity-80 mt-4">
              Пријавата се отвора во нов таб и трае помалку од 2 минути.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
