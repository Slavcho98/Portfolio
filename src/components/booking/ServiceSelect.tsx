import { ArrowRight, Clock } from "lucide-react";
import { services } from "@/data/barbers";
import { Barber, Service } from "@/types/booking";
import banner from "@/assets/barbershop-banner.jpg";

type Props = {
  barber: Barber;
  onSelect: (s: Service) => void;
};

export const ServiceSelect = ({ barber, onSelect }: Props) => {
  return (
    <section>
      <div className="relative h-[36vh] min-h-[240px] w-full overflow-hidden sm:h-[44vh] sm:min-h-[320px]">
        <img
          src={banner}
          alt="Barbershop interior"
          width={1920}
          height={1024}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="container absolute inset-x-0 bottom-0 pb-6 sm:pb-10 animate-fade-up">
          <p className="font-display text-[10px] tracking-[0.4em] text-primary-glow sm:text-sm sm:tracking-[0.5em]">
            BOOKING WITH
          </p>
          <h1 className="mt-1.5 font-display text-4xl leading-none sm:text-5xl md:text-7xl">
            {barber.name}
          </h1>
          <p className="mt-2 max-w-xl text-xs text-muted-foreground sm:text-base">
            {barber.specialty}
          </p>
        </div>
      </div>

      <div className="container py-8 sm:py-14">
        <div className="mb-6 sm:mb-10">
          <p className="font-display text-xs tracking-[0.4em] text-primary sm:text-sm sm:tracking-[0.5em]">
            CHAPTER TWO
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">Pick a Service</h2>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-5 text-left transition-smooth hover:border-primary/60 hover:shadow-glow active:scale-[0.99] animate-fade-up sm:p-6 md:p-8"
            >
              <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-primary opacity-0 transition-smooth group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl leading-tight text-foreground sm:text-2xl md:text-3xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{s.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground sm:mt-4 sm:text-xs">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {s.duration}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl text-gradient sm:text-3xl md:text-4xl">
                    {s.price}
                  </p>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 text-muted-foreground transition-smooth group-hover:translate-x-1 group-hover:text-primary-glow sm:mt-3 sm:h-5 sm:w-5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
