import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/60 border-t border-border/60 pt-14 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold mb-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft">
                <Sparkles className="h-5 w-5" />
              </span>
              Little<span className="text-primary">Sprouts</span>
            </a>
            <p className="text-muted-foreground max-w-sm">
              Развој на фина моторика, координација, соработка и следење инструкции —
              чекор по чекор до почетно пишување.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-3">Истражи</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#activities" className="hover:text-primary transition-smooth">Активности</a></li>
              <li><a href="#milestones" className="hover:text-primary transition-smooth">Развој</a></li>
              <li><a href="#about" className="hover:text-primary transition-smooth">За нас</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-3">Контакт</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>здраво@littlesprouts.mk</li>
              <li>Создадено со 💛 за семејствата</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 pt-6 text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} LittleSprouts. Со љубов и грижа.
        </div>
      </div>
    </footer>
  );
};
