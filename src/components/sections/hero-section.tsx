import Image from "next/image";
import Link from "next/link";
import { destinationMarkets, siteConfig } from "@/config/site";
import { ClockIcon, MapPinIcon, ShieldIcon } from "@/components/ui/icons";
import { QuoteWidget } from "@/components/sections/quote-widget";

const heroPoints = [
  { icon: MapPinIcon, label: "Preluare de la adresa" },
  { icon: ClockIcon, label: "Dispecerat 24/7" },
  { icon: ShieldIcon, label: "Tarif confirmat inainte" },
] as const;

export function HeroSection() {
  return (
    <section id="acasa" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-coach.jpg"
          alt="Autocar Mariva Travel pe o autostrada europeana"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,13,18,0.94)_0%,rgba(11,13,18,0.82)_42%,rgba(11,13,18,0.45)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
          <div>
            <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[0.78rem] font-medium text-white/85 backdrop-blur">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[#3ddc84]" />
              Plecari regulate catre {destinationMarkets.length} tari europene
            </p>

            <h1
              className="heading-xl hero-in mt-6 text-balance lg:text-[3.35rem] xl:text-[4.1rem]"
              style={{ "--hero-delay": "80ms" } as React.CSSProperties}
            >
              Transport persoane si colete{" "}
              <span className="bg-gradient-to-r sm:whitespace-nowrap from-[#f1dcaf] via-accent to-[#b8914e] bg-clip-text text-transparent">
                Romania - Europa
              </span>
              , direct la usa ta
            </h1>

            <p
              className="lead hero-in mt-6 max-w-xl text-white/72"
              style={{ "--hero-delay": "160ms" } as React.CSSProperties}
            >
              Te preluam de acasa si te lasam la adresa din Germania, Belgia, Italia, Franta si
              inca 6 tari. Fara gari, fara transferuri, fara griji pentru bagaje.
            </p>

            <ul
              className="hero-in mt-8 flex flex-wrap gap-x-5 gap-y-3"
              style={{ "--hero-delay": "220ms" } as React.CSSProperties}
            >
              {heroPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2.5 text-sm text-white/80">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <point.icon className="h-4 w-4" />
                  </span>
                  {point.label}
                </li>
              ))}
            </ul>

            <div
              className="hero-in mt-9 flex flex-wrap gap-2"
              style={{ "--hero-delay": "280ms" } as React.CSSProperties}
            >
              {destinationMarkets.map((market) => (
                <Link
                  key={market.slug}
                  href={`/transport/${market.slug}/`}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[0.8rem] font-medium text-white/75 transition-colors hover:border-accent hover:text-white"
                >
                  {market.country}
                </Link>
              ))}
            </div>

            <p
              className="hero-in mt-8 text-sm text-white/55"
              style={{ "--hero-delay": "320ms" } as React.CSSProperties}
            >
              Preferi sa vorbesti direct? Suna la{" "}
              <a
                href={`tel:${siteConfig.dispatchPhoneE164}`}
                className="font-semibold text-white underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
              >
                {siteConfig.dispatchPhoneDisplay}
              </a>
            </p>
          </div>

          <div className="hero-in" style={{ "--hero-delay": "200ms" } as React.CSSProperties}>
            <QuoteWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
