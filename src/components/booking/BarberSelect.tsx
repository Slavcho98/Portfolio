import { ArrowRight } from "lucide-react";
import { barbers } from "@/data/barbers";
import { Barber } from "@/types/booking";

export const BarberSelect = ({ onSelect }: { onSelect: (b: Barber) => void }) => {
  return (
    <section className="container py-8 sm:py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center animate-fade-up">
        <p className="font-display text-xs tracking-[0.4em] text-primary sm:text-sm sm:tracking-[0.5em]">
          CHAPTER ONE
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
          Choose Your <span className="text-gradient">Barber</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground sm:max-w-xl sm:text-base md:text-lg">
          Two craftsmen. One ritual. Pick the hands you trust with your edge.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:mt-14 sm:gap-8 md:grid-cols-2">
        {barbers.map((b, i) => (
          <button
            key={b.id}
            onClick={() => onSelect(b)}
            style={{ animationDelay: `${i * 120}ms`, opacity: 0 }}
            className="group relative overflow-hidden rounded-sm border border-border bg-card text-left shadow-card transition-smooth hover:border-primary/60 hover:shadow-glow active:scale-[0.99] animate-fade-up"
          >
            <div className="aspect-[16/10] overflow-hidden sm:aspect-[3/4]">
              <img
                src={b.image}
                alt={`${b.name}, ${b.title}`}
                width={768}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover transition-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-overlay" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
              <p className="font-display text-[10px] tracking-[0.3em] text-primary-glow sm:text-xs sm:tracking-[0.4em]">
                {b.title.toUpperCase()}
              </p>
              <h2 className="mt-1.5 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
                {b.name}
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{b.specialty}</p>
              <div className="mt-4 inline-flex items-center gap-2 font-display text-xs tracking-widest text-foreground transition-smooth group-hover:text-primary-glow sm:text-sm">
                BOOK WITH {b.name.split(" ")[0].toUpperCase()}
                <ArrowRight className="h-3.5 w-3.5 transition-smooth group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
