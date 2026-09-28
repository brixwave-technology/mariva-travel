"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { destinationMarkets, siteConfig } from "@/config/site";
import { blogCategories } from "@/content/blog/types";
import { getWhatsAppHref } from "@/lib/contact";
import {
  ArrowRightIcon,
  BookIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  PackageIcon,
  PhoneIcon,
  SearchIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { openSearch } from "@/components/layout/command-palette";

type LatestPost = { slug: string; title: string; readingMinutes: number };

type SiteHeaderProps = {
  latestPosts: LatestPost[];
};

type MenuKey = "rute" | "ghiduri";

const simpleLinks = [
  { label: "Colete", href: "/transport-colete/", match: "/transport-colete" },
  { label: "Despre noi", href: "/#incredere", match: null },
  { label: "Contact", href: "/#contact", match: null },
] as const;

function Logo({ inverted }: { inverted: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Mariva Travel - pagina principala"
      className="group flex items-center gap-3"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl border font-display text-lg transition-colors duration-300 ${
          inverted
            ? "border-white/25 bg-white/10 text-white"
            : "border-accent-ink/25 bg-[#f6ecd9] text-accent-ink"
        }`}
      >
        M
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.3rem] font-semibold tracking-tight transition-colors duration-300 ${
            inverted ? "text-white" : "text-foreground"
          }`}
        >
          Mariva
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] transition-colors duration-300 ${
            inverted ? "text-white/65" : "text-muted"
          }`}
        >
          Travel
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader({ latestPosts }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("rute");
  const closeTimer = useRef<number | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Inchide meniurile la schimbarea paginii.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setIsMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isMobileOpen) {
      root.dataset.lockScroll = "true";
    } else {
      delete root.dataset.lockScroll;
    }
    return () => {
      delete root.dataset.lockScroll;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setIsMobileOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  }, [cancelClose]);

  const overlay = isHome && !isScrolled && !isMobileOpen && openMenu === null;
  const isRoutesActive = pathname.startsWith("/transport/");
  const isGuidesActive = pathname.startsWith("/blog");

  const navText = overlay
    ? "text-white/85 hover:text-white"
    : "text-foreground/75 hover:text-foreground";

  const triggerClass = (active: boolean, open: boolean) =>
    `relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.92rem] font-medium transition-colors duration-200 ${navText} ${
      open ? (overlay ? "bg-white/10" : "bg-foreground/[0.05]") : ""
    } ${active ? (overlay ? "text-white" : "text-foreground") : ""}`;

  const whatsappHref = getWhatsAppHref();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          overlay
            ? "border-b border-transparent bg-transparent"
            : "glass border-b border-black/[0.06] shadow-[0_10px_40px_-20px_rgba(13,15,20,0.25)]"
        }`}
        onMouseLeave={scheduleClose}
      >
        <div className="container-x">
          <div className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
            <Logo inverted={overlay} />

            <nav aria-label="Navigatie principala" className="hidden items-center gap-1 lg:flex">
              <button
                type="button"
                className={triggerClass(isRoutesActive, openMenu === "rute")}
                aria-expanded={openMenu === "rute"}
                aria-controls="mega-rute"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu("rute");
                }}
                onClick={() => setOpenMenu((current) => (current === "rute" ? null : "rute"))}
              >
                Rute
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${openMenu === "rute" ? "rotate-180" : ""}`}
                />
                {isRoutesActive ? (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                ) : null}
              </button>

              <button
                type="button"
                className={triggerClass(isGuidesActive, openMenu === "ghiduri")}
                aria-expanded={openMenu === "ghiduri"}
                aria-controls="mega-ghiduri"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu("ghiduri");
                }}
                onClick={() =>
                  setOpenMenu((current) => (current === "ghiduri" ? null : "ghiduri"))
                }
              >
                Ghiduri
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${openMenu === "ghiduri" ? "rotate-180" : ""}`}
                />
                {isGuidesActive ? (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                ) : null}
              </button>

              {simpleLinks.map((link) => {
                const active = link.match ? pathname.startsWith(link.match) : false;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    className={triggerClass(active, false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openSearch()}
                className={`hidden h-10 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors md:inline-flex ${
                  overlay
                    ? "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                    : "border-border bg-white/70 text-muted hover:border-foreground/30 hover:text-foreground"
                }`}
                aria-label="Cauta pe site"
              >
                <SearchIcon className="h-4 w-4" />
                <span className="hidden 2xl:inline">Cauta ruta sau ghid</span>
                <kbd
                  className={`hidden rounded-md border px-1.5 py-0.5 font-sans text-[0.68rem] xl:inline ${
                    overlay ? "border-white/20" : "border-border"
                  }`}
                >
                  Ctrl K
                </kbd>
              </button>

              <a
                href={`tel:${siteConfig.dispatchPhoneE164}`}
                className={`hidden items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors xl:inline-flex ${
                  overlay ? "text-white" : "text-foreground"
                }`}
              >
                <PhoneIcon className="h-4 w-4 text-accent" />
                {siteConfig.dispatchPhoneDisplay}
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm hidden sm:inline-flex"
              >
                Cere oferta
              </a>

              <button
                type="button"
                onClick={() => openSearch()}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${
                  overlay
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-border bg-white text-foreground"
                }`}
                aria-label="Cauta pe site"
              >
                <SearchIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileOpen((open) => !open)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                  overlay
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-border bg-white text-foreground"
                }`}
                aria-expanded={isMobileOpen}
                aria-controls="meniu-mobil"
                aria-label={isMobileOpen ? "Inchide meniul" : "Deschide meniul"}
              >
                {isMobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega meniu: Rute */}
        {openMenu === "rute" ? (
          <div
            id="mega-rute"
            onMouseEnter={cancelClose}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="container-x pt-2">
              <div className="animate-pop grid grid-cols-[1fr_18rem] gap-6 rounded-3xl border border-border bg-white p-6 shadow-[0_40px_80px_-30px_rgba(13,15,20,0.35)]">
                <div>
                  <p className="eyebrow">Rute Romania - Europa</p>
                  <div className="mt-5 grid grid-cols-2 gap-1 xl:grid-cols-3">
                    {destinationMarkets.map((market) => {
                      const active = pathname === `/transport/${market.slug}/`;
                      return (
                        <Link
                          key={market.slug}
                          href={`/transport/${market.slug}/`}
                          className={`group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-background ${
                            active ? "bg-background" : ""
                          }`}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-[0.72rem] font-bold tracking-wider text-accent">
                            {market.code}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-foreground">
                              Romania - {market.country}
                            </span>
                            <span className="block truncate text-xs text-muted">
                              {market.popularCities.join(" · ")} · {market.durationHint}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-ink p-5 text-white">
                  <div>
                    <span className="icon-badge h-11 w-11">
                      <PackageIcon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-display text-xl">Transport colete</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      Colete, bagaje si pachete pe aceleasi rute, cu preluare si livrare la adresa.
                    </p>
                  </div>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link href="/transport-colete/" className="btn btn-gold btn-sm">
                      Detalii colete
                    </Link>
                    <Link
                      href="/transport/"
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/80 hover:text-white"
                    >
                      Toate rutele <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Mega meniu: Ghiduri */}
        {openMenu === "ghiduri" ? (
          <div
            id="mega-ghiduri"
            onMouseEnter={cancelClose}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="container-x pt-2">
              <div className="animate-pop grid grid-cols-2 gap-6 rounded-3xl border border-border bg-white p-6 shadow-[0_40px_80px_-30px_rgba(13,15,20,0.35)]">
                <div>
                  <p className="eyebrow">Categorii</p>
                  <div className="mt-5 flex flex-col gap-1">
                    {blogCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/blog/categorie/${category.slug}/`}
                        className="group rounded-2xl p-3 transition-colors hover:bg-background"
                      >
                        <span className="flex items-center justify-between text-sm font-semibold text-foreground">
                          {category.name}
                          <ArrowRightIcon className="h-4 w-4 -translate-x-1 text-accent-ink opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted">
                          {category.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-background p-5">
                  <p className="eyebrow">Cele mai noi ghiduri</p>
                  <div className="mt-4 flex flex-col gap-3">
                    {latestPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}/`}
                        className="group flex gap-3 rounded-2xl bg-white p-3 transition-shadow hover:shadow-md"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6ecd9] text-accent-ink">
                          <BookIcon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="line-clamp-2 text-sm font-medium leading-5 text-foreground group-hover:text-accent-ink">
                            {post.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted">
                            {post.readingMinutes} min de citit
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog/"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-ink"
                  >
                    Toate ghidurile <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Meniu mobil */}
      {isMobileOpen ? (
        <div
          id="meniu-mobil"
          role="dialog"
          aria-modal="true"
          aria-label="Meniu"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[55] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="animate-pop relative flex h-full flex-col overflow-y-auto overscroll-contain bg-background px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                openSearch();
              }}
              className="flex h-12 w-full shrink-0 items-center gap-3 rounded-2xl border border-border bg-white px-4 text-left text-sm text-muted"
            >
              <SearchIcon className="h-5 w-5" />
              Cauta o ruta, un oras sau un ghid...
            </button>

            <div className="mt-4 flex flex-col gap-2">
              <MobileAccordion
                title="Rute internationale"
                open={mobileSection === "rute"}
                onToggle={() =>
                  setMobileSection((current) => (current === "rute" ? null : "rute"))
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  {destinationMarkets.map((market) => (
                    <Link
                      key={market.slug}
                      href={`/transport/${market.slug}/`}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium ${
                        pathname === `/transport/${market.slug}/`
                          ? "border-accent bg-[#f6ecd9] text-foreground"
                          : "border-border bg-white text-foreground"
                      }`}
                    >
                      <span className="text-[0.65rem] font-bold text-accent-ink">{market.code}</span>
                      {market.country}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/transport/"
                  className="mt-3 inline-flex items-center gap-2 px-1 text-sm font-semibold text-accent-ink"
                >
                  Toate rutele <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </MobileAccordion>

              <MobileAccordion
                title="Ghiduri si sfaturi"
                open={mobileSection === "ghiduri"}
                onToggle={() =>
                  setMobileSection((current) => (current === "ghiduri" ? null : "ghiduri"))
                }
              >
                <div className="flex flex-col gap-1">
                  {blogCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/blog/categorie/${category.slug}/`}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-white"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/blog/"
                    className="mt-1 inline-flex items-center gap-2 px-3 text-sm font-semibold text-accent-ink"
                  >
                    Toate ghidurile <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </MobileAccordion>

              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-14 items-center justify-between rounded-2xl border border-border bg-white px-4 text-base font-semibold text-foreground"
                >
                  {link.label}
                  <ArrowRightIcon className="h-4 w-4 text-muted" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-3xl bg-ink p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Dispecerat 24/7
                </p>
                <p className="mt-2 font-display text-2xl">{siteConfig.dispatchPhoneDisplay}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a href={`tel:${siteConfig.dispatchPhoneE164}`} className="btn btn-gold btn-sm">
                    <PhoneIcon className="h-4 w-4" /> Suna
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MobileAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border ${open ? "border-accent/40 bg-surface/60" : "border-border bg-white"}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-14 w-full items-center justify-between px-4 text-base font-semibold text-foreground"
      >
        {title}
        <ChevronDownIcon
          className={`h-5 w-5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className="px-3 pb-4">{children}</div> : null}
    </div>
  );
}
