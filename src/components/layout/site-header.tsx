import Link from "next/link";
import { siteConfig } from "@/config/site";

type SiteHeaderProps = {
  currentPageLabel?: string;
};

export function SiteHeader({ currentPageLabel }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-col">
            <span
              className="text-xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              MARIVA
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
              Travel
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            <Link href="/" className="text-sm font-medium text-muted transition-colors hover:text-accent">
              Acasa
            </Link>
            <Link
              href="/transport/"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Rute
            </Link>
            <Link
              href="/blog/"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {currentPageLabel ? (
            <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-accent md:inline-flex">
              {currentPageLabel}
            </span>
          ) : null}
          <a
            href={`tel:${siteConfig.dispatchPhoneE164}`}
            className="hidden text-sm font-medium text-muted transition-colors hover:text-accent sm:inline-flex"
          >
            {siteConfig.dispatchPhoneDisplay}
          </a>
          <a
            href={`tel:${siteConfig.dispatchPhoneE164}`}
            className="inline-flex h-11 items-center justify-center border border-accent bg-accent px-5 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Rezerva
          </a>
        </div>
      </div>
    </header>
  );
}
