import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/ui/cta-band";
import { ArrowRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { destinationMarkets, siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import {
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getItemListJsonLd,
  getOrganizationJsonLd,
  getTransportServiceJsonLd,
} from "@/lib/structured-data";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Rute transport persoane si colete Romania - Europa",
    description:
      "Transport persoane si colete door-to-door intre Romania si Germania, Belgia, Franta, Italia, Olanda, Austria, Elvetia, Danemarca, Luxemburg si Ungaria.",
    path: "/transport/",
    image: "/og/transport.png",
    keywords: [
      "rute transport persoane Romania Europa",
      "transport colete Romania Europa",
      "transport persoane Germania Belgia Italia",
      "transport international door to door",
    ],
  });
}

export default function TransportHubPage() {
  return (
    <main>
      <PageHero
        breadcrumbs={[{ name: "Acasa", href: "/" }, { name: "Rute" }]}
        eyebrow="Rute internationale"
        title="Transport persoane si colete Romania - Europa"
        lead={`${destinationMarkets.length} destinatii, un singur dispecerat. Alege tara ca sa vezi orasele deservite, durata orientativa si detaliile de rezervare.`}
      >
        <a href={`tel:${siteConfig.dispatchPhoneE164}`} className="btn btn-gold">
          <PhoneIcon className="h-4 w-4" /> {siteConfig.dispatchPhoneDisplay}
        </a>
        <Link href="/transport-colete/" className="btn btn-ghost-light">
          Transport colete
        </Link>
      </PageHero>

      <section className="section-y bg-background">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {destinationMarkets.map((market, index) => (
              <li
                key={market.slug}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
              >
                <article className="card card-hover group relative flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sm font-bold tracking-wider text-accent">
                      {market.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-accent-ink">
                      <ClockIcon className="h-3.5 w-3.5" />~ {market.durationHint}
                    </span>
                  </div>
                  <h2 className="mt-6 text-xl font-semibold text-foreground">
                    <Link
                      href={`/transport/${market.slug}/`}
                      className="after:absolute after:inset-0 after:rounded-[1.25rem] group-hover:text-accent-ink"
                    >
                      Transport Romania - {market.country}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 leading-7 text-muted">{market.intro}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {market.popularCities.map((city) => (
                      <li
                        key={city}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-foreground/80"
                      >
                        <MapPinIcon className="h-3 w-3 text-accent-ink" />
                        {city}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    Detalii ruta
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection
        className="bg-surface/60"
        title="Intrebari frecvente despre rute"
        intro="Cum rezervi rapid, daca poti trimite colete sau cum functioneaza preluarea de la adresa: raspunsurile de baza."
        items={siteConfig.faqItems}
      />

      <div className="pt-20 lg:pt-28">
        <CtaBand />
      </div>

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          getTransportServiceJsonLd(),
          getItemListJsonLd(
            destinationMarkets.map((market) => ({
              name: `Transport Romania - ${market.country}`,
              path: `/transport/${market.slug}/` as const,
            })),
          ),
          getFaqJsonLd(siteConfig.faqItems),
          getBreadcrumbJsonLd([
            { name: "Acasa", path: "/" },
            { name: "Transport", path: "/transport/" },
          ]),
        ]}
      />
    </main>
  );
}
