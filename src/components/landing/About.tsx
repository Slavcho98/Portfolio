import { Hand, Footprints, Users, ListChecks } from "lucide-react";

const values = [
  { icon: Hand, color: "bg-primary/15 text-primary", title: "Фина моторика", text: "Активности што ги јакнат прстињата и раката за уверено држење молив." },
  { icon: Footprints, color: "bg-sunshine/30 text-sunshine-foreground", title: "Координација", text: "Игри што ја развиваат рамнотежата и координацијата око–рака." },
  { icon: Users, color: "bg-secondary/40 text-secondary-foreground", title: "Соработка", text: "Групни предизвици што учат споделување, слушање и тимска работа." },
  { icon: ListChecks, color: "bg-lavender/40 text-lavender-foreground", title: "Следење инструкции", text: "Чекор-по-чекор задачи што градат концентрација и самостојност." },
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container grid lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-5">
          <span className="inline-block rounded-full bg-secondary/40 text-secondary-foreground px-4 py-1.5 text-sm font-bold">
            За нас
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Спремни за <span className="text-primary">прво одделение</span> со насмевка
          </h2>
          <p className="text-lg text-muted-foreground">
            Преку внимателно осмислени активности, децата на возраст од 5 до 7 години
            ги развиваат сите клучни вештини за успешен почеток во училиште —
            од фина моторика и координација до соработка и следење инструкции.
          </p>
          <p className="text-muted-foreground">
            Веруваме дека учењето треба да биде радост. Затоа секое наше задача е
            смислена како игра — лесна за следење, забавна за повторување и моќна
            во развивањето на самодовербата.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="bg-card rounded-3xl p-6 shadow-card border border-border/40 hover:-translate-y-1 transition-bounce"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`h-12 w-12 rounded-2xl ${v.color} flex items-center justify-center mb-4`}>
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-1">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
