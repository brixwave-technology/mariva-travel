import Link from "next/link";
import { destinationMarkets, siteConfig } from "@/config/site";
import { blogCategories, blogPosts } from "@/content/blog";
import { getWhatsAppHref } from "@/lib/contact";
import { ClockIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

const popularGuides = [
  "cat-costa-transportul-de-persoane-romania-europa",
  "cum-trimiti-un-colet-din-romania-in-europa",
  "ce-acte-iti-trebuie-pentru-transport-international",
  "bagaje-permise-in-microbuz-transport-international",
  "microbuz-avion-sau-tren-comparatie-romania-europa",
];

export function SiteFooter() {
  const guides = popularGuides
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post) => post !== undefined);

  return (
    <footer className="bg-ink-gradient grain relative overflow-hidden text-white">
      <div className="container-x relative pb-[calc(7rem+env(safe-area-inset-bottom))] pt-16 md:pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Mariva Travel">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 font-display text-xl text-accent">
                M
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl font-semibold">Mariva</span>
                <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/60">
                  Travel
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Transport international de persoane si colete door-to-door intre Romania si 10
              tari europene. Preluare de la adresa, plecari regulate si rezervari rapide.
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.dispatchPhoneE164}`}
                  className="group inline-flex items-center gap-3 text-white/85 hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-accent">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-white/45">Dispecerat</span>
                    <span className="font-semibold">{siteConfig.dispatchPhoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-white/85 hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#3ddc84]">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-white/45">WhatsApp</span>
                    <span className="font-semibold">{siteConfig.whatsappPhoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-white/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-accent">
                  <ClockIcon className="h-4 w-4" />
                </span>
                Disponibil 24/7, inclusiv weekend
              </li>
            </ul>
          </div>

          <nav aria-label="Rute">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Rute</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm lg:grid-cols-1">
              {destinationMarkets.map((market) => (
                <li key={market.slug}>
                  <Link
                    href={`/transport/${market.slug}/`}
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    Romania - {market.country}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Servicii si ghiduri">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Servicii</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/transport/" className="text-white/65 hover:text-white">
                  Transport persoane
                </Link>
              </li>
              <li>
                <Link href="/transport-colete/" className="text-white/65 hover:text-white">
                  Transport colete
                </Link>
              </li>
              <li>
                <Link href="/#flota" className="text-white/65 hover:text-white">
                  Flota
                </Link>
              </li>
              <li>
                <Link href="/#intrebari-frecvente" className="text-white/65 hover:text-white">
                  Intrebari frecvente
                </Link>
              </li>
            </ul>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Ghiduri
            </p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {blogCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog/categorie/${category.slug}/`}
                    className="text-white/65 hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ghiduri populare">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Cele mai citite
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {guides.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/80 transition-colors hover:border-accent/50 hover:text-white"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. Toate drepturile rezervate.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/transport/" className="hover:text-white">
              Rute
            </Link>
            <Link href="/transport-colete/" className="hover:text-white">
              Colete
            </Link>
            <Link href="/blog/" className="hover:text-white">
              Blog
            </Link>
            <a href="/blog/rss.xml" className="hover:text-white">
              RSS
            </a>
            <a href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
