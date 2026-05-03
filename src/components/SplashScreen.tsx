import { useEffect } from "react";
import { Logo } from "./Logo";

export const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_50%_50%,hsl(var(--primary-glow)/0.25),transparent_60%)]" />
      <div className="relative animate-logo-reveal">
        <Logo size="lg" />
      </div>
    </div>
  );
};
