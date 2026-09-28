"use client";

import { useEffect, useState } from "react";
import { getWhatsAppHref } from "@/lib/contact";
import { ArrowUpIcon, WhatsAppIcon } from "@/components/ui/icons";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-[calc(6.25rem+env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Inapoi sus"
        tabIndex={showTop ? 0 : -1}
        className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/90 text-foreground shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>

      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrie-ne pe WhatsApp"
        className="group pointer-events-auto hidden items-center gap-3 md:flex"
      >
        <span className="translate-x-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Oferta rapida pe WhatsApp
        </span>
        <span className="pulse-soft flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_15px_35px_-10px_rgba(31,174,87,0.7)] transition-transform duration-300 group-hover:scale-105">
          <WhatsAppIcon className="relative z-10 h-7 w-7" />
        </span>
      </a>
    </div>
  );
}
