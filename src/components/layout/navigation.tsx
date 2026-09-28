"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Acasa", href: "#acasa", eyebrow: "Introducere" },
  { label: "Rute", href: "#rute", eyebrow: "Destinatii" },
  { label: "Flota", href: "#flota", eyebrow: "Confort" },
  { label: "Despre Noi", href: "#incredere", eyebrow: "Incredere" },
  { label: "Ghiduri", href: "#ghiduri", eyebrow: "Blog" },
  { label: "Contact", href: "#contact", eyebrow: "Rezervari" },
] as const;

const mobileHighlights = [
  "Confirmare in 10 minute",
  "Preluare de la adresa",
  "Disponibil 24/7",
] as const;

type NavHref = (typeof navLinks)[number]["href"];

function getActiveHash(): NavHref {
  if (typeof window === "undefined") {
    return "#acasa";
  }

  const activationOffset = 160;
  let currentHash: NavHref = "#acasa";

  for (const link of navLinks) {
    const section = document.querySelector<HTMLElement>(link.href);

    if (!section) {
      continue;
    }

    if (section.getBoundingClientRect().top <= activationOffset) {
      currentHash = link.href;
    }
  }

  return currentHash;
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<NavHref>("#acasa");

  useEffect(() => {
    const syncNavigationState = () => {
      setIsScrolled(window.scrollY > 24);
      setActiveHash(getActiveHash());
    };

    syncNavigationState();

    window.addEventListener("scroll", syncNavigationState, { passive: true });
    window.addEventListener("hashchange", syncNavigationState);

    return () => {
      window.removeEventListener("scroll", syncNavigationState);
      window.removeEventListener("hashchange", syncNavigationState);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const mobileNavState = isMobileMenuOpen ? "true" : "false";

    document.body.dataset.mobileNavOpen = mobileNavState;
    document.documentElement.dataset.mobileNavOpen = mobileNavState;

    return () => {
      delete document.body.dataset.mobileNavOpen;
      delete document.documentElement.dataset.mobileNavOpen;
    };
  }, [isMobileMenuOpen]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkSelect = (href: NavHref) => {
    setActiveHash(href);
    setIsMobileMenuOpen(false);
  };

  const hasSolidHeader = isScrolled || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${
          hasSolidHeader
            ? "border-b border-border/70 bg-background/90 shadow-[0_12px_32px_rgba(15,15,15,0.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="#acasa" onClick={handleMenuClose} className="flex flex-col">
              <span
                className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  hasSolidHeader ? "text-foreground" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                MARIVA
              </span>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-300 ${
                  hasSolidHeader ? "text-muted" : "text-white/70"
                }`}
              >
                Travel
              </span>
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative text-sm font-medium transition-colors duration-300 ${
                      hasSolidHeader ? "text-foreground" : "text-white"
                    } ${isActive ? "text-accent" : "hover:text-accent"}`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-0 -bottom-2 h-px origin-left bg-accent transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={`tel:${siteConfig.dispatchPhoneE164}`}
                className={`text-sm font-medium transition-colors duration-300 ${
                  hasSolidHeader ? "text-muted" : "text-white/80"
                }`}
              >
                {siteConfig.dispatchPhoneDisplay}
              </a>
              <a
                href={`tel:${siteConfig.dispatchPhoneE164}`}
                className="inline-flex h-10 items-center justify-center border border-accent bg-accent px-6 text-sm font-medium text-foreground transition-all duration-300 hover:bg-transparent hover:text-accent"
              >
                Rezerva Acum
              </a>
            </div>

            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-dialog"
              aria-label={isMobileMenuOpen ? "Inchide meniul principal" : "Deschide meniul principal"}
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
                hasSolidHeader
                  ? "border-border/80 bg-white/80 text-foreground shadow-sm"
                  : "border-white/20 bg-white/10 text-white backdrop-blur-sm"
              }`}
            >
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        aria-hidden="true"
        onClick={handleMenuClose}
        className={`fixed inset-0 z-[55] bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.16),transparent_42%),linear-gradient(180deg,rgba(8,10,12,0.76),rgba(8,10,12,0.56))] backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-navigation-dialog"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-x-0 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] top-[5.5rem] z-[60] px-4 pb-4 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,249,247,0.99)_100%)] shadow-[0_32px_80px_rgba(15,15,15,0.28)] ring-1 ring-black/5 transition-all duration-300 ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto px-5 pb-5 pt-5">
            <div className="rounded-[1.5rem] border border-border/70 bg-white/75 p-5 shadow-[0_16px_40px_rgba(15,15,15,0.06)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                Mariva Travel Dispatch
              </p>
              <h2
                className="mt-3 text-[1.9rem] font-light leading-tight text-foreground"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Navigatie rapida pentru rezervari internationale
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Romania - {siteConfig.destinationCountries.length} destinatii europene, confirmare rapida si suport direct din dispecerat.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mobileHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center rounded-full border border-border/70 bg-background px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {navLinks.map((link, index) => {
                const isActive = activeHash === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => handleLinkSelect(link.href)}
                    className={`group flex items-center justify-between rounded-[1.4rem] border px-4 py-4 transition-all duration-300 ${
                      isActive
                        ? "border-accent/70 bg-accent/10 text-foreground shadow-[0_12px_30px_rgba(201,169,110,0.16)]"
                        : "border-border/70 bg-white/70 text-foreground hover:border-accent/40 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-base font-semibold">{link.label}</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                          {link.eyebrow}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-accent/70 bg-accent text-foreground"
                          : "border-border/70 text-muted group-hover:border-accent/40 group-hover:text-accent"
                      }`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 5l8 7-8 7" />
                      </svg>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-auto pt-5">
              <div className="rounded-[1.5rem] border border-border/70 bg-[#111318] p-5 text-white shadow-[0_18px_48px_rgba(15,15,15,0.24)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                      Contact Direct
                    </p>
                    <p className="mt-2 text-xl font-medium">{siteConfig.dispatchPhoneDisplay}</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                    24/7
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${siteConfig.dispatchPhoneE164}`}
                    onClick={handleMenuClose}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-transform duration-300 active:scale-[0.98]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Suna</span>
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappPhoneE164.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleMenuClose}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-white/10"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
