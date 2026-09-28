import Image from "next/image";
import Link from "next/link";
import { destinationMarkets } from "@/config/site";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

const processSteps = [
  {
    title: "Trimiti ruta",
    description:
      "Suni sau scrii pe WhatsApp cu localitatea de plecare, destinatia, data si numarul de persoane sau detaliile coletului.",
  },
  {
    title: "Primesti confirmarea",
    description:
      "Dispeceratul revine rapid cu disponibilitatea, intervalul de preluare si tariful pentru ruta exacta.",
  },
  {
    title: "Te preluam de acasa",
    description:
      "Soferul vine la adresa ta si te lasa cat mai aproape de destinatia finala. La fel si pentru colete.",
  },
] as const;

export function RoutesSection() {
  return (
    <section id="rute" className="section-y bg-surface/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Rute internationale"
          title={`Romania conectata cu ${destinationMarkets.length} tari din Europa`}
          text="Alege destinatia ca sa vezi orasele deservite, durata orientativa a cursei si raspunsurile la cele mai frecvente intrebari pentru ruta respectiva."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {destinationMarkets.map((market, index) => (
            <Link
              key={market.slug}
              href={`/transport/${market.slug}/`}
              data-reveal
              style={{ "--reveal-delay": `${(index % 5) * 60}ms` } as React.CSSProperties}
              className="card card-hover group flex flex-col p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-xs font-bold tracking-wider text-accent transition-transform duration-300 group-hover:scale-105">
                  {market.code}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                Romania - {market.country}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{market.popularCities.join(", ")}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-ink">
                <ClockIcon className="h-3.5 w-3.5" />~ {market.durationHint}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="relative overflow-hidden rounded-[1.75rem]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <Image
                src="/images/europe-routes.jpg"
                alt="Harta rutelor Mariva Travel intre Romania si Europa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            </div>
            <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
              <p className="eyebrow eyebrow-light">Door-to-door</p>
              <p className="mt-3 font-display text-2xl sm:text-3xl">
                De la usa ta din Romania, pana la adresa din Europa
              </p>
            </div>
          </div>

          <div id="cum-functioneaza" className="flex flex-col justify-center">
            <div data-reveal>
              <p className="eyebrow">Cum functioneaza</p>
              <h3 className="heading-lg mt-4">Rezervare simpla, in 3 pasi</h3>
            </div>
            <ol className="relative mt-10 flex flex-col gap-4">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                  className="card group flex gap-5 p-5 sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink font-display text-lg text-accent transition-transform duration-300 group-hover:-rotate-6">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                    <p className="mt-1.5 leading-7 text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
