import Link from "next/link";

type BreadcrumbsProps = {
  items: ReadonlyArray<{ name: string; href?: string }>;
  tone?: "dark" | "light";
};

export function Breadcrumbs({ items, tone = "dark" }: BreadcrumbsProps) {
  const isDark = tone === "dark";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isDark ? "text-white/55 hover:text-white" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`line-clamp-1 ${isDark ? "text-accent" : "text-accent-ink"}`}
                >
                  {item.name}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className={isDark ? "text-white/25" : "text-border"}>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
