import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type PageHeroProps = {
  breadcrumbs: ReadonlyArray<{ name: string; href?: string }>;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  meta?: React.ReactNode;
};

export function PageHero({ breadcrumbs, eyebrow, title, lead, children, aside, meta }: PageHeroProps) {
  return (
    <section className="bg-ink-gradient grain relative overflow-hidden pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-32 h-[20rem] w-[20rem] rounded-full border border-accent/10"
      />
      <div className="container-x relative">
        <div className={aside ? "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14" : ""}>
          <div className={aside ? "" : "max-w-4xl"}>
            <div className="hero-in">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            {eyebrow ? (
              <p className="eyebrow eyebrow-light hero-in mt-7" style={{ "--hero-delay": "60ms" } as React.CSSProperties}>
                {eyebrow}
              </p>
            ) : null}
            <h1
              className="heading-xl hero-in mt-5 text-balance"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            {lead ? (
              <div
                className="lead hero-in mt-6 max-w-2xl text-white/70"
                style={{ "--hero-delay": "180ms" } as React.CSSProperties}
              >
                {lead}
              </div>
            ) : null}
            {meta ? (
              <div className="hero-in mt-6" style={{ "--hero-delay": "220ms" } as React.CSSProperties}>
                {meta}
              </div>
            ) : null}
            {children ? (
              <div
                className="hero-in mt-8 flex flex-wrap gap-3"
                style={{ "--hero-delay": "240ms" } as React.CSSProperties}
              >
                {children}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="hero-in" style={{ "--hero-delay": "200ms" } as React.CSSProperties}>
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
