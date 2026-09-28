import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { FaqSection } from "@/components/sections/faq-section";
import { QuoteWidget } from "@/components/sections/quote-widget";
import { CtaBand } from "@/components/ui/cta-band";
import {
  CheckIcon,
  CloseIcon,
  MapPinIcon,
  PackageIcon,
  ShieldIcon,
} from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { destinationMarkets } from "@/config/site";
import { getPostsByCategory } from "@/content/blog";
import { createPageMetadata } from "@/lib/seo";
import {
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getOrganizationJsonLd,
  getParcelServiceJsonLd,
} from "@/lib/structured-data";

export const dynamic = "force-static";

const faqItems = [
  {
    question: "Cum trimit un colet din Romania in Europa?",
    answer:
      "Ne scrii pe WhatsApp sau ne suni cu adresa de preluare, adresa destinatarului, continutul general, greutatea si dimensiunile aproximative. Confirmam cursa si tariful, apoi preluam coletul de la adresa.",
  },
  {
    question: "Cat dureaza livrarea unui colet?",
    answer:
      "Durata este apropiata de cea a cursei de persoane pe ruta respectiva: de la o zi pe rutele scurte, precum Ungaria sau Austria, pana la cateva zile pentru destinatii indepartate.",
  },
  {
    question: "Ce nu pot trimite prin colet?",
    answer:
      "Substante inflamabile sau periculoase, arme, bunuri ilegale, animale vii, bani in numerar si acte originale. Alimentele perisabile nu sunt recomandate.",
  },
  {
    question: "Trimiteti colete si din Europa catre Romania?",
    answer:
      "Da, coletele circula in ambele sensuri pe rutele regulate, in limita spatiului disponibil pe cursa.",
  },
  {
    question: "Cum se calculeaza tariful pentru un colet?",
    answer:
      "In functie de dimensiuni, greutate si ruta. Pentru colete voluminoase sau mai multe cutii, trimiterea cu microbuzul este de regula mai avantajoasa decat grilele de greutate ale curierilor.",
  },
];

const steps = [
  { title: "Trimiti detaliile", text: "Adresa de preluare, destinatarul, greutatea si dimensiunile." },
  { title: "Confirmam cursa", text: "Primesti tariful si ziua in care preluam coletul." },
  { title: "Preluam de la adresa", text: "Coletul urca pe cursa regulata catre destinatie." },
  { title: "Livram la destinatar", text: "Destinatarul este sunat inainte de livrare." },
];

const allowed = [
  "Imbracaminte, incaltaminte, obiecte personale",
  "Alimente neperisabile, ambalate etans",
  "Cadouri, jucarii, carti",
  "Obiecte de uz casnic si electronice, ambalate corect",
  "Bagaje si cutii pentru mutari",
];

const notAllowed = [
  "Substante inflamabile, explozive sau periculoase",
  "Bani in numerar, bijuterii de valoare, acte originale",
  "Alimente perisabile, carne si lactate proaspete",
  "Arme, bunuri ilegale sau contrafacute",
  "Animale vii",
];

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Transport colete Romania - Europa, door-to-door",
    description:
      "Transport colete si pachete din Romania in Germania, Italia, Belgia, Franta si alte 6 tari. Preluare de la adresa, livrare la destinatar, colete voluminoase.",
    path: "/transport-colete/",
    image: "/og/colete.png",
    keywords: [
      "transport colete Romania Europa",
      "trimitere colete Germania",
      "colete Romania Italia",
      "transport pachete international",
      "colete door to door Europa",
    ],
  });
}

export default function ParcelPage() {
  const guides = getPostsByCategory("colete").slice(0, 3);

  return (
    <main>
      <PageHero
        breadcrumbs={[{ name: "Acasa", href: "/" }, { name: "Transport colete" }]}
        eyebrow="Transport colete"
        title="Transport colete Romania - Europa, de la usa la usa"
        lead="Trimite colete, bagaje si pachete catre familie sau parteneri din 10 tari europene. Preluam de la adresa din Romania si livram direct la destinatar, pe cursele noastre regulate."
        meta={
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
            {["Preluare de la adresa", "Colete voluminoase", "In ambele sensuri"].map((label) => (
              <li key={label} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-accent" strokeWidth={2.5} />
                {label}
              </li>
            ))}
          </ul>
        }
        aside={<QuoteWidget defaultMode="colete" title="Oferta pentru colet" />}
      />

      <section className="section-y bg-background">
        <div className="container-x">
          <SectionHeading
            eyebrow="Cum functioneaza"
            title="Coletul tau, in 4 pasi simpli"
            text="Nu ai nevoie de cont, eticheta tiparita sau drum pana la un depozit. Totul se stabileste direct cu dispeceratul."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="card p-6"
              >
                <span className="font-display text-4xl text-accent-ink/60">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 leading-7 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <div data-reveal className="card p-6 sm:p-8">
              <span className="icon-badge">
                <PackageIcon className="h-5 w-5" />
              </span>
              <h2 className="heading-md mt-5">Ce poti trimite</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {allowed.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-reveal
              style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
              className="card p-6 sm:p-8"
            >
              <span className="icon-badge">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <h2 className="heading-md mt-5">Ce nu transportam</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {notAllowed.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                      <CloseIcon className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/blog/ce-nu-poti-trimite-prin-colet-international/"
                className="mt-6 inline-flex text-sm font-semibold text-accent-ink hover:underline"
              >
                Lista completa si explicatii
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface/60">
        <div className="container-x">
          <SectionHeading
            eyebrow="Destinatii colete"
            title="Colete catre 10 tari din Europa"
            text="Coletele circula pe aceleasi rute ca pasagerii, cu preluare si livrare la adresa."
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {destinationMarkets.map((market) => (
              <li key={market.slug} data-reveal>
                <Link
                  href={`/transport/${market.slug}/`}
                  className="card card-hover flex items-center gap-3 p-4"
                >
                  <MapPinIcon className="h-4 w-4 shrink-0 text-accent-ink" />
                  <span className="text-sm font-semibold text-foreground">
                    Colete {market.country}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {guides.length > 0 ? (
            <div className="mt-16">
              <h2 data-reveal className="heading-md">
                Ghiduri pentru expeditori
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {guides.map((post, index) => (
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
          ) : null}
        </div>
      </section>

      <FaqSection
        title="Intrebari frecvente despre colete"
        intro="Cele mai dese intrebari primite in dispecerat despre trimiterea coletelor intre Romania si Europa."
        items={faqItems}
      />

      <CtaBand
        title="Ai un colet de trimis? Scrie-ne acum."
        text="Trimite adresa de preluare, destinatarul, greutatea si dimensiunile aproximative. Primesti rapid tariful si ziua preluarii."
        whatsappMessage="Buna ziua! Doresc o oferta pentru transport colet din Romania in Europa."
      />

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          getParcelServiceJsonLd(),
          getFaqJsonLd(faqItems),
          getBreadcrumbJsonLd([
            { name: "Acasa", path: "/" },
            { name: "Transport colete", path: "/transport-colete/" },
          ]),
        ]}
      />
    </main>
  );
}
