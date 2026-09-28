import { PlusIcon } from "@/components/ui/icons";

type FaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro: string;
  items: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
  tone?: "light" | "dark";
  className?: string;
};

export function FaqSection({
  id = "intrebari-frecvente",
  eyebrow = "Intrebari frecvente",
  title,
  intro,
  items,
  className = "bg-background",
}: FaqSectionProps) {
  return (
    <section id={id} className={`section-y ${className}`}>
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="heading-lg mt-4 text-balance">{title}</h2>
            <p className="lead mt-6 text-muted">{intro}</p>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <details
                key={item.question}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index, 5) * 50}ms` } as React.CSSProperties}
                className="card group p-0 open:border-accent-ink/30 open:shadow-[0_20px_50px_-30px_rgba(13,15,20,0.3)]"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left sm:p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold leading-7 text-foreground sm:text-lg">
                    {item.question}
                  </h3>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-accent">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="-mt-1 px-5 pb-6 leading-7 text-muted sm:px-6">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
