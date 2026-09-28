"use client";

import { useState } from "react";
import { CheckIcon, FacebookIcon, LinkIcon, WhatsAppIcon } from "@/components/ui/icons";

type ShareButtonsProps = {
  url: string;
  title: string;
};

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copiaza linkul:", url);
    }
  };

  const buttonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-foreground/40";

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Trimite ghidul</p>
      <div className="mt-3 flex gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Trimite pe WhatsApp"
          className={`${buttonClass} hover:bg-whatsapp hover:text-white`}
        >
          <WhatsAppIcon className="h-4 w-4" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Distribuie pe Facebook"
          className={`${buttonClass} hover:bg-[#1877f2] hover:text-white`}
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
        <button type="button" onClick={copy} aria-label="Copiaza linkul" className={buttonClass}>
          {copied ? <CheckIcon className="h-4 w-4 text-success" /> : <LinkIcon className="h-4 w-4" />}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Link copiat" : ""}
        </span>
      </div>
    </div>
  );
}
