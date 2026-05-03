import { Scissors } from "lucide-react";

export const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: 14, padding: "p-2", title: "text-base", sub: "text-[9px]" },
    md: { icon: 24, padding: "p-2.5", title: "text-2xl", sub: "text-xs" },
    lg: {
      icon: 32,
      padding: "p-2.5",
      title: "text-4xl sm:text-6xl md:text-7xl",
      sub: "text-[10px] sm:text-sm md:text-base",
    },
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative flex h-fit w-fit items-center justify-center rounded-full border border-primary/40 bg-gradient-primary ${sizes.padding} shadow-glow`}
      >
        <Scissors
          size={sizes.icon}
          className="text-primary-foreground"
          strokeWidth={2.2}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display ${sizes.title} text-foreground`}>
          NORTH<span className="text-gradient">&</span>BLADE
        </span>
        <span
          className={`${sizes.sub} tracking-[0.3em] text-muted-foreground uppercase mt-1`}
        >
          Barbershop · Est. 2014
        </span>
      </div>
    </div>
  );
};
