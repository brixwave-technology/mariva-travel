"use client";

import { useEffect, useState } from "react";

type ArticleTocProps = {
  items: { id: string; label: string }[];
};

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Cuprins articol">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Cuprins</p>
      <ol className="mt-4 flex flex-col gap-1 border-l border-border">
        {items.map((item, index) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-6 transition-colors ${
                  active
                    ? "border-accent-ink font-semibold text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                <span className="mr-1.5 text-xs text-muted">{index + 1}.</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
