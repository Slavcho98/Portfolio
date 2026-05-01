import { PenTool, Scissors, Shapes, Puzzle, Users, ListChecks } from "lucide-react";

const activities = [
  { icon: PenTool, title: "Почетно пишување", desc: "Линии, форми и букви — чекор по чекор до уверено пишување.", tone: "bg-primary text-primary-foreground", count: "Фина моторика" },
  { icon: Scissors, title: "Сечење и лепење", desc: "Вежби за сила и контрола на прстите преку креативни проекти.", tone: "bg-accent text-accent-foreground", count: "Прецизност" },
  { icon: Shapes, title: "Координација око–рака", desc: "Активности што ги поврзуваат погледот и движењето.", tone: "bg-sunshine text-sunshine-foreground", count: "Координација" },
  { icon: Puzzle, title: "Логичко размислување", desc: "Сложувалки, низи и модели за побрзо мислење.", tone: "bg-lavender text-lavender-foreground", count: "Концентрација" },
  { icon: Users, title: "Игри за соработка", desc: "Групни задачи што учат слушање, чекање ред и тимска работа.", tone: "bg-secondary text-secondary-foreground", count: "Социјални вештини" },
  { icon: ListChecks, title: "Следење инструкции", desc: "Чекор-по-чекор предизвици што градат самостојност.", tone: "bg-primary/90 text-primary-foreground", count: "Самостојност" },
];

export const Activities = () => {
  return (
    <section id="activities" className="py-24 bg-muted/40 relative overflow-hidden">
      <div aria-hidden className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block rounded-full bg-primary/15 text-primary px-4 py-1.5 text-sm font-bold mb-4">
            Активности и ресурси
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Вештини што ги градиме заедно
          </h2>
          <p className="text-lg text-muted-foreground">
            Внимателно осмислени активности кои чекор по чекор го подготвуваат вашето
            дете за успешен старт во прво одделение.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a) => (
            <article
              key={a.title}
              className="group bg-card rounded-3xl p-7 shadow-card border border-border/40 hover:-translate-y-2 hover:shadow-pop transition-bounce cursor-pointer"
            >
              <div className={`h-14 w-14 rounded-2xl ${a.tone} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-bounce shadow-soft`}>
                <a.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{a.title}</h3>
              <p className="text-muted-foreground mb-5">{a.desc}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground/70">{a.count}</span>
                <span className="font-bold text-primary group-hover:translate-x-1 transition-smooth">
                  Дознај повеќе →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
