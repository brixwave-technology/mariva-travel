import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { FaqSection } from "@/components/sections/faq-section";
import { QuoteWidget } from "@/components/sections/quote-widget";
import { CtaBand } from "@/components/ui/cta-band";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PackageIcon,
  RouteIcon,
} from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import {
  destinationMarkets,
  getDestinationMarketBySlug,
  getRouteFaqItems,
  siteConfig,
} from "@/config/site";
import { blogPosts } from "@/content/blog";
import { createPageMetadata } from "@/lib/seo";
import {
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getOrganizationJsonLd,
  getRouteServiceJsonLd,
} from "@/lib/structured-data";

type RoutePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return destinationMarkets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getDestinationMarketBySlug(slug);

  if (!market) {
    return createPageMetadata({
      title: "Ruta indisponibila",
      description: siteConfig.description,
      path: "/transport/",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `Transport persoane si colete Romania - ${market.country}`,
    description: `Transport persoane si colete Romania - ${market.country}, door-to-door: ${market.popularCities.join(", ")}. Durata ~${market.durationHint}, preluare de la adresa, oferta pe WhatsApp.`,
    path: `/transport/${market.slug}/`,
    image: `/og/ruta-${market.slug}.png`,
    keywords: [
      `transport persoane Romania ${market.country}`,
      `transport colete Romania ${market.country}`,
      `microbuz Romania ${market.country}`,
      `curse Romania ${market.country}`,
      ...market.popularCities.map((city) => `transport Romania ${city}`),
    ],
  });
}

export default async function TransportRoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const market = getDestinationMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  const faqItems = getRouteFaqItems(market);
  const relatedPosts = [
    ...blogPosts.filter((post) => post.category === "rute" && post.relatedRouteSlugs[0] === market.slug),
    ...blogPosts.filter(
      (post) =>
        !(post.category === "rute" && post.relatedRouteSlugs[0] === market.slug) &&
        post.relatedRouteSlugs.includes(market.slug),
    ),
  ].slice(0, 3);
  const otherMarkets = destinationMarkets.filter((item) => item.slug !== market.slug);
  const whatsappMessage = `Buna ziua! Doresc o oferta pentru transport pe ruta Romania - ${market.country}.`;

  const facts = [
    { icon: ClockIcon, label: "Durata orientativa", value: market.durationHint },
    {
      icon: RouteIcon,
      label: "Traseu prin",
      value: market.transit === "direct" ? "Granita directa" : market.transit,
    },
    { icon: MapPinIcon, label: "Preluare", value: "De la adresa ta" },
    { icon: PackageIcon, label: "Colete", value: "Pe aceeasi cursa" },
  ];

  return (
    <main>
      <PageHero
        breadcrumbs={[
          { name: "Acasa", href: "/" },
          { name: "Rute", href: "/transport/" },
          { name: market.country },
        ]}
        eyebrow={`Ruta Romania - ${market.country}`}
        title={<>Transport persoane si colete Romania - {market.country}</>}
        lead={market.intro}
        meta={
          <div className="flex flex-wrap gap-2">
            {[`~ ${market.durationHint}`, "Door-to-door", "Dispecerat 24/7"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-sm text-white/80"
              >
                {label}
              </span>
            ))}
          </div>
        }
        aside={
          <QuoteWidget
            defaultDestination={market.slug}
            title={`Oferta pentru ${market.country}`}
          />
        }
      />

      <section className="section-y bg-background">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                className="card flex flex-col gap-3 p-5"
              >
                <span className="icon-badge h-10 w-10 rounded-xl">
                  <fact.icon className="h-4 w-4" />
                </span>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {fact.label}
                </dt>
                <dd className="-mt-1 font-semibold text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div data-reveal>
              <p className="eyebrow">Ce include ruta</p>
              <h2 className="heading-lg mt-4 text-balance">
                Drum lung, fara complicatii, pana in {market.country}
              </h2>
              <p className="lead mt-6 text-muted">
                Daca ai nevoie de transport persoane Romania - {market.country}, serviciul Mariva
                Travel este orientat pe confort, traseu clar si comunicare rapida. Calatoresti fara
                schimbari de mijloace de transport si fara drumuri suplimentare cu bagajele.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {market.highlights.map((highlight) => (
                  <li key={highlight} className="card flex items-start gap-4 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-accent">
                      <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="leading-7 text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
              <div className="card p-6 sm:p-7 lg:sticky lg:top-28">
                <p className="eyebrow">Orase deservite</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Destinatii frecvente in {market.country}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {market.cities.map((city) => (
                    <li key={city} className="chip">
                      <MapPinIcon className="h-3.5 w-3.5 text-accent-ink" />
                      {city}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-6 text-muted">
                  Localitatea ta nu e in lista? Trimite adresa completa: daca se afla pe traseul
                  cursei, o includem.
                </p>
                <div className="hairline my-6" />
                <ul className="flex flex-col gap-2.5 text-sm">
                  {siteConfig.serviceBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5 text-foreground/85">
                      <CheckIcon className="h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2.5} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="section-y bg-surface/60">
          <div className="container-x">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Ghiduri pentru aceasta ruta</p>
                <h2 className="heading-lg mt-4">Citeste inainte de plecare</h2>
              </div>
              <Link href="/blog/" className="btn btn-outline btn-sm">
                Toate ghidurile <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((post, index) => (
                <div
                  key={post.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection
        title={`Intrebari frecvente: Romania - ${market.country}`}
        intro={`Raspunsuri pentru cei care cauta transport persoane sau colete pe ruta Romania - ${market.country}.`}
        items={faqItems}
      />

      <section className="bg-background pb-16 lg:pb-20">
        <div className="container-x">
          <h2 data-reveal className="text-lg font-semibold text-foreground">
            Alte rute Mariva Travel
          </h2>
          <ul data-reveal className="mt-5 flex flex-wrap gap-2">
            {otherMarkets.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/transport/${item.slug}/`}
                  className="chip transition-colors hover:border-foreground/40"
                >
                  <span className="text-[0.68rem] font-bold text-accent-ink">{item.code}</span>
                  Romania - {item.country}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Cere acum oferta pentru Romania - ${market.country}`}
        whatsappMessage={whatsappMessage}
      />

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          getRouteServiceJsonLd(market),
          getFaqJsonLd(faqItems),
          getBreadcrumbJsonLd([
            { name: "Acasa", path: "/" },
            { name: "Transport", path: "/transport/" },
            { name: market.country, path: `/transport/${market.slug}/` },
          ]),
        ]}
      />
    </main>
  );
}
