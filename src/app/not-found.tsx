import type { Metadata } from "next";
import Link from "next/link";
import { destinationMarkets } from "@/config/site";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Pagina nu a fost gasita",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="bg-ink-gradient grain relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-32 text-white">
      <div className="container-x relative">
        <p className="eyebrow eyebrow-light">Eroare 404</p>
        <h1 className="heading-xl mt-5 max-w-3xl">Pagina cautata nu mai exista pe aceasta ruta</h1>
        <p className="lead mt-6 max-w-2xl text-white/65">
          Poate linkul s-a schimbat. Alege una dintre destinatiile de mai jos sau intoarce-te la
          pagina principala.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-gold">
            Pagina principala
          </Link>
          <Link href="/blog/" className="btn btn-ghost-light">
            Ghiduri <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-12 flex flex-wrap gap-2">
          {destinationMarkets.map((market) => (
            <li key={market.slug}>
              <Link
                href={`/transport/${market.slug}/`}
                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-accent hover:text-white"
              >
                Romania - {market.country}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
