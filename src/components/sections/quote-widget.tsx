"use client";

import { useId, useMemo, useState } from "react";
import { destinationMarkets, siteConfig } from "@/config/site";
import { getWhatsAppHref } from "@/lib/contact";
import {
  CalendarIcon,
  MapPinIcon,
  MinusIcon,
  PackageIcon,
  PhoneIcon,
  PlusIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

type QuoteWidgetProps = {
  defaultDestination?: string;
  defaultMode?: Mode;
  tone?: "dark" | "light";
  title?: string;
};

type Mode = "persoane" | "colete";

const parcelSizes = [
  { value: "mic", label: "Mic, sub 10 kg" },
  { value: "mediu", label: "Mediu, 10-30 kg" },
  { value: "mare", label: "Mare, peste 30 kg" },
  { value: "multe", label: "Mai multe cutii / mutare" },
] as const;

function formatDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

export function QuoteWidget({
  defaultDestination = "germania",
  defaultMode = "persoane",
  tone = "dark",
  title = "Cere o oferta in 30 de secunde",
}: QuoteWidgetProps) {
  const id = useId();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [destination, setDestination] = useState(defaultDestination);
  const [from, setFrom] = useState("");
  const [toCity, setToCity] = useState("");
  const [people, setPeople] = useState(1);
  const [parcel, setParcel] = useState<(typeof parcelSizes)[number]["value"]>("mediu");
  const [date, setDate] = useState("");

  const market = destinationMarkets.find((item) => item.slug === destination) ?? destinationMarkets[0];
  const isDark = tone === "dark";

  const message = useMemo(() => {
    const lines = [
      `Buna ziua! Doresc o oferta pentru transport ${mode === "persoane" ? "persoane" : "colete"}.`,
      `Ruta: ${from.trim() || "[localitatea din Romania]"} (Romania) -> ${toCity.trim() || market.popularCities[0]} (${market.country})`,
      mode === "persoane"
        ? `Persoane: ${people}`
        : `Colet: ${parcelSizes.find((size) => size.value === parcel)?.label}`,
    ];
    if (date) lines.push(`Data aproximativa: ${formatDate(date)}`);
    lines.push("Multumesc!");
    return lines.join("\n");
  }, [mode, from, toCity, market, people, parcel, date]);

  const fieldClass = isDark
    ? "h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] pl-10 pr-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/40 focus:border-accent focus:bg-white/10"
    : "h-12 w-full rounded-xl border border-border bg-white pl-10 pr-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent-ink";
  const labelClass = `mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${
    isDark ? "text-white/60" : "text-muted"
  }`;
  const iconClass = `pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${
    isDark ? "text-accent" : "text-accent-ink"
  }`;

  return (
    <div
      id="oferta"
      className={`rounded-[1.75rem] p-5 sm:p-7 ${
        isDark
          ? "glass-dark border border-white/15 text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
          : "border border-border bg-white shadow-[0_30px_80px_-40px_rgba(13,15,20,0.35)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`font-display text-2xl leading-tight ${isDark ? "text-white" : "text-foreground"}`}>
            {title}
          </p>
          <p className={`mt-1.5 text-sm ${isDark ? "text-white/60" : "text-muted"}`}>
            Completezi, apesi, iar cererea ajunge direct la dispecerat.
          </p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-whatsapp/15 px-2.5 py-1 text-[0.7rem] font-semibold text-[#3ddc84]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#3ddc84]" />
          Online
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Tip transport"
        className={`mt-5 grid grid-cols-2 gap-1 rounded-2xl p-1 ${isDark ? "bg-white/[0.06]" : "bg-surface"}`}
      >
        {(["persoane", "colete"] as const).map((option) => {
          const active = mode === option;
          const Icon = option === "persoane" ? UsersIcon : PackageIcon;
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(option)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-accent text-ink shadow-md"
                  : isDark
                    ? "text-white/70 hover:text-white"
                    : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {option === "persoane" ? "Persoane" : "Colete"}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-from`} className={labelClass}>
            Plecare din Romania
          </label>
          <div className="relative">
            <MapPinIcon className={iconClass} />
            <input
              id={`${id}-from`}
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              placeholder="ex. Pitesti, Suceava"
              autoComplete="address-level2"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-country`} className={labelClass}>
            Tara destinatie
          </label>
          <div className="relative">
            <MapPinIcon className={iconClass} />
            <select
              id={`${id}-country`}
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className={`${fieldClass} appearance-none ${isDark ? "[&>option]:text-foreground" : ""}`}
            >
              {destinationMarkets.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-to`} className={labelClass}>
            Oras destinatie
          </label>
          <div className="relative">
            <MapPinIcon className={iconClass} />
            <input
              id={`${id}-to`}
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
              placeholder={`ex. ${market.popularCities.join(", ")}`}
              list={`${id}-cities`}
              className={fieldClass}
            />
            <datalist id={`${id}-cities`}>
              {market.cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-date`} className={labelClass}>
            Data aproximativa
          </label>
          <div className="relative">
            <CalendarIcon className={iconClass} />
            <input
              id={`${id}-date`}
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={`${fieldClass} ${isDark ? "[color-scheme:dark]" : ""}`}
            />
          </div>
        </div>

        {mode === "persoane" ? (
          <div className="sm:col-span-2">
            <span className={labelClass}>Numar de persoane</span>
            <div
              className={`flex h-12 items-center justify-between rounded-xl border px-2 ${
                isDark ? "border-white/15 bg-white/[0.07]" : "border-border bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => setPeople((count) => Math.max(1, count - 1))}
                aria-label="Mai putine persoane"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  isDark ? "hover:bg-white/10" : "hover:bg-surface"
                }`}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="text-base font-semibold" aria-live="polite">
                {people} {people === 1 ? "persoana" : "persoane"}
              </span>
              <button
                type="button"
                onClick={() => setPeople((count) => Math.min(8, count + 1))}
                aria-label="Mai multe persoane"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  isDark ? "hover:bg-white/10" : "hover:bg-surface"
                }`}
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="sm:col-span-2">
            <span className={labelClass}>Dimensiune colet</span>
            <div className="grid grid-cols-2 gap-2">
              {parcelSizes.map((size) => {
                const active = parcel === size.value;
                return (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setParcel(size.value)}
                    aria-pressed={active}
                    className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[0.82rem] font-medium transition-colors ${
                      active
                        ? "border-accent bg-accent/15"
                        : isDark
                          ? "border-white/15 text-white/75 hover:border-white/35"
                          : "border-border text-foreground/80 hover:border-foreground/30"
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <a
          href={getWhatsAppHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp h-14 px-4 text-[0.95rem] sm:px-6"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          <span className="truncate">Trimite pe WhatsApp</span>
        </a>
        <a
          href={`tel:${siteConfig.dispatchPhoneE164}`}
          aria-label={`Suna la ${siteConfig.dispatchPhoneDisplay}`}
          className={`btn h-14 px-4 sm:px-5 ${isDark ? "btn-ghost-light" : "btn-outline"}`}
        >
          <PhoneIcon className="h-4 w-4" />
          Suna
        </a>
      </div>
      <p className={`mt-3 text-center text-xs ${isDark ? "text-white/50" : "text-muted"}`}>
        Fara cont si fara formulare lungi. Raspuns rapid, 7 zile din 7.
      </p>
    </div>
  );
}
