const stages = [
  {
    age: "5",
    label: "Подготвителна",
    emoji: "✏️",
    color: "bg-primary",
    items: ["Држи молив правилно", "Препознава букви и бројки", "Сече по линија со ножички", "Следи едноставни инструкции"],
  },
  {
    age: "6",
    label: "Пред училиште",
    emoji: "📓",
    color: "bg-sunshine",
    items: ["Пишува свое име", "Брои и пишува до 20", "Споделува и чека ред", "Завршува започната задача"],
  },
  {
    age: "7",
    label: "Прво одделение",
    emoji: "🎒",
    color: "bg-secondary",
    items: ["Пишува уредно реченици", "Чита кратки текстови", "Соработува во група", "Следи инструкции во повеќе чекори"],
  },
];

export const Milestones = () => {
  return (
    <section id="milestones" className="py-24 bg-background relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block rounded-full bg-lavender/30 text-lavender-foreground px-4 py-1.5 text-sm font-bold mb-4">
            Развој по возраст
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Чекор по чекор до училиште
          </h2>
          <p className="text-lg text-muted-foreground">
            Пријателска мапа на развојот од 5 до 7 години — секое дете расте на свој начин,
            и тоа е сосема во ред.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stages.map((s, i) => (
            <div
              key={s.age}
              className="relative bg-card rounded-3xl p-7 shadow-card border border-border/40 hover:-translate-y-2 transition-bounce"
              style={{ transform: `rotate(${i % 2 === 0 ? "-1deg" : "1deg"})` }}
            >
              <div className={`absolute -top-5 left-6 ${s.color} text-foreground font-display font-bold rounded-full px-4 py-1.5 shadow-soft`}>
                {s.age} години
              </div>
              <div className="text-5xl mb-3 mt-2">{s.emoji}</div>
              <h3 className="font-display text-xl font-bold mb-3">{s.label}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
