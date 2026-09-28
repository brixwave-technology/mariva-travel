import { StarIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  { value: "85%", label: "Clienti recurenti" },
  { value: "10 min", label: "Timp mediu de raspuns" },
  { value: "24/7", label: "Dispecerat disponibil" },
  { value: "10", label: "Tari europene" },
] as const;

const testimonials = [
  {
    quote:
      "Am calatorit de nenumarate ori cu Mariva Travel. Serviciu impecabil, punctualitate si confort de fiecare data.",
    author: "Raluca M.",
    location: "Cluj-Napoca",
    route: "Romania - Belgia",
  },
  {
    quote:
      "Trimit colete lunar in Germania. Comunicare excelenta si livrare la timp. Recomand cu incredere.",
    author: "Cosmin P.",
    location: "Arad",
    route: "Colete Romania - Germania",
  },
  {
    quote:
      "Personal profesionist si vehicule curate. Cea mai buna experienta de transport international pe care am avut-o.",
    author: "Elena D.",
    location: "Bucuresti",
    route: "Romania - Italia",
  },
] as const;

const values = [
  {
    title: "Door-to-door real",
    description:
      "Preluam din Romania si lasam la destinatie, reducand drumurile suplimentare si timpii pierduti.",
  },
  {
    title: "Comunicare rapida",
    description:
      "Raspundem rapid la cereri de pret, disponibilitate, rezervare si status pentru colete sau bagaje.",
  },
  {
    title: "Tarife transparente",
    description:
      "Discuti direct cu dispeceratul si primesti o oferta clara, adaptata traseului si nevoii tale.",
  },
] as const;

export function TrustSection() {
  return (
    <section id="incredere" className="section-y bg-background">
      <div className="container-x">
        <dl
          data-reveal
          className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-border bg-white lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse p-6 text-center sm:p-8 ${index % 2 === 0 ? "border-r" : ""} ${
                index < 2 ? "border-b lg:border-b-0" : ""
              } border-border lg:border-r lg:last:border-r-0`}
            >
              <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-4xl text-foreground lg:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="De ce Mariva Travel"
              title="Ales de clienti care vor drum fara stres"
              text="Punem accent pe trasee clare, raspuns rapid si confort pe intreaga ruta, fara schimbari multiple si fara comunicare greoaie."
            />
            <ol className="mt-10 flex flex-col gap-6">
              {values.map((value, index) => (
                <li
                  key={value.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  className="flex gap-5"
                >
                  <span className="w-10 shrink-0 font-display text-3xl leading-none text-accent-ink/70">
                    0{index + 1}
                  </span>
                  <div className="border-l border-border pl-5">
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-1.5 leading-7 text-muted">{value.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <figure
                key={testimonial.author}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className={`card card-hover flex flex-col p-6 ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="flex gap-0.5 text-accent" aria-label="5 din 5 stele">
                  {Array.from({ length: 5 }, (_, star) => (
                    <StarIcon key={star} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote
                  className={`mt-4 flex-1 leading-relaxed text-foreground ${
                    index === 0 ? "font-display text-xl sm:text-2xl" : ""
                  }`}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-accent">
                      {testimonial.author.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-xs text-muted">{testimonial.location}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-surface px-2.5 py-1 text-[0.7rem] font-semibold text-accent-ink">
                    {testimonial.route}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
