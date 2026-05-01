import heroImg from "@/assets/hero-kids.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-sky pt-12 pb-24 md:pt-20 md:pb-32">
      {/* floating decor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-6 h-16 w-16 rounded-full bg-sunshine/70 blur-xl animate-float-slow" />
        <div className="absolute top-40 right-10 h-24 w-24 rounded-full bg-primary/30 blur-2xl animate-float-fast" />
        <div className="absolute bottom-20 left-1/3 h-20 w-20 rounded-full bg-secondary/40 blur-xl animate-float-slow" />
        <div className="absolute top-24 right-1/4 text-4xl animate-float-slow">⭐</div>
        <div className="absolute bottom-32 left-12 text-4xl animate-float-fast">🎨</div>
        <div className="absolute top-10 right-1/2 text-3xl animate-wiggle">✨</div>
      </div>

      <div className="container relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-soft">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Програма за деца од 5 до 7 години
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Предучилишна подготовка за <span className="text-primary">идни првачиња</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Дозволете му на вашето дете да започне во училиште со самодоверба и радост.
            Преку игра и внимателно осмислени активности, децата ги развиваат вештините
            потребни за успешен старт во прво одделение.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="hero" size="xl" asChild>
              <a href="https://forms.gle/aeTHsyDrK9cwKq9N8" target="_blank" rel="noopener noreferrer">
                Запиши го твоето дете <ArrowRight />
              </a>
            </Button>
            <Button variant="play" size="xl" asChild>
              <a href="#activities"><Play /> Истражи активности</a>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["bg-primary", "bg-secondary", "bg-sunshine", "bg-lavender"].map((c) => (
                <span key={c} className={`h-8 w-8 rounded-full ring-2 ring-background ${c}`} />
              ))}
            </div>
            <span><strong className="text-foreground">Стотици</strong> деца спремни за прво одделение</span>
          </div>
        </div>

        <div className="relative animate-pop-in">
          <div className="absolute -inset-4 bg-gradient-rainbow opacity-30 blur-3xl rounded-[3rem]" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-pop border-4 border-card rotate-1 hover:rotate-0 transition-bounce">
            <img
              src={heroImg}
              alt="Деца кои играат, цртаат и учат заедно подготвувајќи се за училиште"
              width={1536}
              height={1152}
              className="w-full h-auto block"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card rounded-3xl shadow-card px-5 py-4 flex items-center gap-3 animate-float-slow">
            <span className="text-3xl">✏️</span>
            <div>
              <div className="font-display font-bold">Возраст 5–7</div>
              <div className="text-xs text-muted-foreground">Подготовка за училиште</div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-sunshine text-sunshine-foreground rounded-2xl shadow-card px-4 py-3 font-display font-bold animate-wiggle">
            Учи преку игра!
          </div>
        </div>
      </div>
    </section>
  );
};
