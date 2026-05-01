import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const photos = [
  { src: g1, caption: "Координација со два молива ✏️", tilt: "-rotate-3", tone: "bg-primary" },
  { src: g2, caption: "Вежби за почетно пишување ✍️", tilt: "rotate-2", tone: "bg-sunshine" },
  { src: g3, caption: "Геометриски форми од тесто 🔺", tilt: "-rotate-1", tone: "bg-secondary" },
  { src: g4, caption: "Следење насоки и форми 🎯", tilt: "rotate-3", tone: "bg-accent" },
  { src: g5, caption: "Сечење по линија со ножички ✂️", tilt: "-rotate-2", tone: "bg-lavender" },
  { src: g6, caption: "Правилен фат на молив 🖍️", tilt: "rotate-1", tone: "bg-primary" },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-gradient-sky relative overflow-hidden">
      <div aria-hidden className="absolute top-10 left-10 text-4xl animate-float-slow">📸</div>
      <div aria-hidden className="absolute bottom-16 right-12 text-4xl animate-float-fast">💖</div>

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block rounded-full bg-card text-primary px-4 py-1.5 text-sm font-bold mb-4 shadow-soft">
            Нашите мали ѕвезди
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Моменти од нашите работилници
          </h2>
          <p className="text-lg text-muted-foreground">
            Вистински мигови на учење, играње и растење со LittleSprouts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((p, i) => (
            <figure
              key={i}
              className={`group bg-card p-3 pb-5 rounded-3xl shadow-card hover:shadow-pop hover:rotate-0 hover:-translate-y-2 transition-bounce ${p.tilt}`}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={p.src}
                  alt={p.caption}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-bounce"
                />
                <span className={`absolute top-3 left-3 ${p.tone} text-foreground text-xs font-display font-bold rounded-full px-3 py-1 shadow-soft`}>
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="font-display font-semibold text-center mt-4 px-2">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
