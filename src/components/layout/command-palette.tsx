"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRightIcon,
  BookIcon,
  MapPinIcon,
  SearchIcon,
  SparkIcon,
} from "@/components/ui/icons";

export type SearchItem = {
  /** titlu */
  t: string;
  /** url */
  u: string;
  /** grup */
  g: "Rute" | "Ghiduri" | "Categorii" | "Pagini";
  /** descriere scurta */
  d: string;
  /** cuvinte cheie suplimentare */
  k: string;
};

const OPEN_EVENT = "mariva:open-search";

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

const groupIcon = {
  Rute: MapPinIcon,
  Ghiduri: BookIcon,
  Categorii: SparkIcon,
  Pagini: ArrowRightIcon,
} as const;

let indexPromise: Promise<SearchItem[]> | null = null;

function loadIndex(): Promise<SearchItem[]> {
  if (!indexPromise) {
    indexPromise = fetch("/search-index.json")
      .then((response) => response.json() as Promise<SearchItem[]>)
      .catch(() => {
        indexPromise = null;
        return [];
      });
  }
  return indexPromise;
}

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
    loadIndex().then(setItems);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onOpen = () => open();
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.dataset.lockScroll = "true";
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      delete root.dataset.lockScroll;
    };
  }, [isOpen]);

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);

    if (terms.length === 0) {
      const routes = items.filter((item) => item.g === "Rute").slice(0, 6);
      const pages = items.filter((item) => item.g === "Pagini");
      return [...pages, ...routes];
    }

    return items
      .map((item) => {
        const title = normalize(item.t);
        const haystack = `${title} ${normalize(item.d)} ${normalize(item.k)}`;
        if (!terms.every((term) => haystack.includes(term))) return null;
        let score = 0;
        for (const term of terms) {
          if (title.startsWith(term)) score += 6;
          else if (title.includes(term)) score += 3;
          else score += 1;
        }
        if (item.g === "Rute") score += 2;
        return { item, score };
      })
      .filter((entry): entry is { item: SearchItem; score: number } => entry !== null)
      .sort((first, second) => second.score - first.score)
      .slice(0, 12)
      .map((entry) => entry.item);
  }, [items, query]);

  const safeActiveIndex = Math.min(activeIndex, Math.max(results.length - 1, 0));

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${safeActiveIndex}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [safeActiveIndex]);

  const go = (item: SearchItem | undefined) => {
    if (!item) return;
    close();
    router.push(item.u);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[10vh] sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Cautare pe site"
    >
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={close} aria-hidden="true" />
      <div className="animate-pop relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-white shadow-[0_50px_120px_-30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 border-b border-border px-5">
          <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((index) => Math.min(index + 1, results.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((index) => Math.max(index - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                go(results[safeActiveIndex]);
              } else if (event.key === "Escape") {
                close();
              }
            }}
            placeholder="Cauta: Germania, colete, acte copii, bagaje..."
            className="h-16 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none"
            aria-label="Termen de cautare"
            role="combobox"
            aria-expanded="true"
            aria-controls="rezultate-cautare"
            aria-activedescendant={results[safeActiveIndex] ? `rezultat-${safeActiveIndex}` : undefined}
          />
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-border px-2 py-1 text-xs text-muted hover:text-foreground"
          >
            Esc
          </button>
        </div>

        <div
          ref={listRef}
          id="rezultate-cautare"
          role="listbox"
          className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain p-2"
        >
          {items.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted">Se incarca...</p>
          ) : results.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-medium text-foreground">
                Niciun rezultat pentru &bdquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-sm text-muted">
                Incearca numele unei tari, al unui oras sau un subiect precum &bdquo;colete&rdquo;.
              </p>
            </div>
          ) : (
            results.map((item, index) => {
              const Icon = groupIcon[item.g];
              const active = index === safeActiveIndex;
              const showGroup = index === 0 || results[index - 1]?.g !== item.g;
              return (
                <div key={item.u}>
                  {showGroup ? (
                    <p className="px-3 pb-1 pt-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                      {query ? item.g : item.g === "Pagini" ? "Acces rapid" : "Rute populare"}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    id={`rezultat-${index}`}
                    role="option"
                    aria-selected={active}
                    data-index={index}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => go(item)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                      active ? "bg-background" : ""
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-ink text-accent" : "bg-surface text-accent-ink"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {item.t}
                      </span>
                      <span className="block truncate text-xs text-muted">{item.d}</span>
                    </span>
                    <ArrowRightIcon
                      className={`h-4 w-4 shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                    />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="hidden items-center gap-4 border-t border-border px-5 py-3 text-xs text-muted sm:flex">
          <span>
            <kbd className="rounded border border-border px-1">↑</kbd>{" "}
            <kbd className="rounded border border-border px-1">↓</kbd> navigare
          </span>
          <span>
            <kbd className="rounded border border-border px-1">Enter</kbd> deschide
          </span>
          <span>
            <kbd className="rounded border border-border px-1">Esc</kbd> inchide
          </span>
        </div>
      </div>
    </div>
  );
}
