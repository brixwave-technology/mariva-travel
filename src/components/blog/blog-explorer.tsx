"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import { SearchIcon } from "@/components/ui/icons";
import { blogCategories, type BlogCategorySlug, type BlogPost } from "@/content/blog/types";

type ExplorerPost = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "readingMinutes" | "publishedAt"
> & { keywords: string };

type BlogExplorerProps = {
  posts: ExplorerPost[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [category, setCategory] = useState<BlogCategorySlug | "toate">("toate");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) map.set(post.category, (map.get(post.category) ?? 0) + 1);
    return map;
  }, [posts]);

  const visible = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (category !== "toate" && post.category !== category) return false;
      if (terms.length === 0) return true;
      const haystack = normalize(`${post.title} ${post.excerpt} ${post.keywords}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [posts, category, query]);

  const filters = [
    { slug: "toate" as const, name: "Toate", count: posts.length },
    ...blogCategories.map((item) => ({
      slug: item.slug,
      name: item.name,
      count: counts.get(item.slug) ?? 0,
    })),
  ];

  return (
    <div>
      <div className="sticky top-[4.5rem] z-30 -mx-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-20 lg:mx-0 lg:rounded-3xl lg:border lg:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filtreaza dupa categorie"
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1"
          >
            {filters.map((filter) => {
              const active = category === filter.slug;
              return (
                <button
                  key={filter.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(filter.slug)}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-border bg-white text-foreground/80 hover:border-foreground/30"
                  }`}
                >
                  {filter.name}
                  <span
                    className={`rounded-full px-1.5 text-[0.7rem] ${
                      active ? "bg-white/15 text-accent" : "bg-surface text-muted"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Cauta in ghiduri</span>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cauta: acte, bagaje, Italia..."
              className="h-11 w-full rounded-full border border-border bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent-ink"
            />
          </label>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {visible.length === posts.length
          ? `${posts.length} ghiduri`
          : `${visible.length} din ${posts.length} ghiduri`}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-5 p-10 text-center">
          <p className="font-semibold text-foreground">Niciun ghid gasit</p>
          <p className="mt-2 text-sm text-muted">
            Incearca alt cuvant sau alege categoria &bdquo;Toate&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("toate");
            }}
            className="btn btn-dark btn-sm mt-5"
          >
            Reseteaza filtrele
          </button>
        </div>
      )}
    </div>
  );
}
