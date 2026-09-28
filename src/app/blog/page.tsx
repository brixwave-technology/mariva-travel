import type { Metadata } from "next";
import Link from "next/link";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { CtaBand } from "@/components/ui/cta-band";
import { ArrowRightIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { blogCategories, blogPosts, getPostsByCategory } from "@/content/blog";
import { createPageMetadata } from "@/lib/seo";
import {
  getBlogJsonLd,
  getBreadcrumbJsonLd,
  getItemListJsonLd,
  getOrganizationJsonLd,
} from "@/lib/structured-data";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Ghiduri transport Romania - Europa | Mariva Travel",
    absoluteTitle: true,
    description:
      "Ghiduri practice pentru drumul Romania - Europa: rute, acte necesare, bagaje, colete, tarife, rezervari si sfaturi pentru diaspora. Actualizate periodic.",
    path: "/blog/",
    image: "/og/blog.png",
    keywords: [
      "ghid transport persoane Romania Europa",
      "sfaturi calatorie microbuz Europa",
      "ghid colete Romania Europa",
      "acte calatorie Europa",
      "ghid diaspora",
    ],
  });
}

export default function BlogHubPage() {
  const explorerPosts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readingMinutes: post.readingMinutes,
    publishedAt: post.publishedAt,
    keywords: post.keywords.join(" "),
  }));

  return (
    <main>
      <PageHero
        breadcrumbs={[{ name: "Acasa", href: "/" }, { name: "Ghiduri" }]}
        eyebrow="Ghiduri si sfaturi"
        title="Tot ce trebuie sa stii inainte de drum"
        lead={`${blogPosts.length} ghiduri scrise pentru cei care calatoresc sau trimit colete intre Romania si Europa: rute, acte, bagaje, tarife, rezervari si viata in diaspora.`}
      />

      <section className="bg-background pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="container-x">
          <BlogExplorer posts={explorerPosts} />
        </div>
      </section>

      <section className="section-y bg-surface/60">
        <div className="container-x">
          <div data-reveal>
            <p className="eyebrow">Categorii</p>
            <h2 className="heading-lg mt-4">Exploreaza pe teme</h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {blogCategories.map((category, index) => (
              <li
                key={category.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
              >
                <Link
                  href={`/blog/categorie/${category.slug}/`}
                  className="card card-hover group flex h-full flex-col p-5"
                >
                  <span className="font-display text-3xl text-accent-ink/70">
                    {getPostsByCategory(category.slug).length}
                  </span>
                  <span className="mt-3 font-semibold text-foreground">{category.name}</span>
                  <span className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">
                    {category.description}
                  </span>
                  <ArrowRightIcon className="mt-4 h-4 w-4 text-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-background pt-20 lg:pt-28">
        <CtaBand title="Ai o intrebare care nu are inca raspuns aici?" />
      </div>

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          getBlogJsonLd(blogPosts),
          getItemListJsonLd(
            blogPosts.map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}/` as const,
            })),
          ),
          getBreadcrumbJsonLd([
            { name: "Acasa", path: "/" },
            { name: "Blog", path: "/blog/" },
          ]),
        ]}
      />
    </main>
  );
}
