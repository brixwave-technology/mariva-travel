import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  PackageIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServiceHighlightsSection() {
  return (
    <section id="servicii" className="section-y bg-background">
      <div className="container-x">
        <SectionHeading
          eyebrow="Servicii door-to-door"
          title="Un singur contact, de la usa ta pana la destinatie"
          text="Transport international pentru persoane si colete, gandit pentru drum lung: preluare de la adresa, comunicare directa cu dispeceratul si trasee planificate pe adresele reale."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article data-reveal className="card card-hover relative overflow-hidden p-7 lg:p-9">
            <span className="icon-badge">
              <UsersIcon className="h-5 w-5" />
            </span>
            <h3 className="heading-md mt-6">Transport persoane door-to-door</h3>
            <p className="mt-4 max-w-lg leading-7 text-muted">
              Preluare din fata casei si lasare la adresa, fara schimbari de tren, autocar sau
              curse complicate. Potrivit pentru munca, vizite in familie, mutari si reveniri acasa.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {siteConfig.serviceBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[0.95rem] text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-ink">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              href="/transport/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-ink"
            >
              Vezi toate rutele <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </article>

          <div className="flex flex-col gap-5">
            <article
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="bg-ink-gradient relative flex-1 overflow-hidden rounded-[1.25rem] p-7 text-white"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="icon-badge">
                  <PackageIcon className="h-5 w-5" />
                </span>
                <Link
                  href="/transport-colete/"
                  aria-label="Detalii transport colete"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <h3 className="mt-5 font-display text-2xl">Transport colete Romania - Europa</h3>
              <p className="mt-3 leading-7 text-white/65">
                Colete, bagaje si pachete pentru familie sau business, preluate si livrate la adresa
                pe aceleasi rute internationale.
              </p>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              <article
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                className="card card-hover p-7"
              >
                <span className="icon-badge h-11 w-11">
                  <CalendarIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">Plecari regulate</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Program flexibil, adaptat rutei tale, cu confirmare rapida a zilei de plecare.
                </p>
              </article>

              <article
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
                className="card card-hover p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-whatsapp/15 text-whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">Rezervare pe telefon sau WhatsApp</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Raspuns direct din dispecerat, fara cont si fara formulare complicate.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
