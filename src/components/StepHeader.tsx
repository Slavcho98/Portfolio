import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

type Props = {
  step: number;
  total: number;
  onBack?: () => void;
};

export const StepHeader = ({ step, total, onBack }: Props) => {
  return (
    <header
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container flex items-center justify-between py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-9 w-9 shrink-0 rounded-full hover:bg-secondary"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-5 rounded-full transition-smooth sm:w-8 ${
                i < step ? "bg-gradient-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
