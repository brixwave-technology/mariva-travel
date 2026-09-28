import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
import {
  blogCategories,
  getCategoryBySlug,
  getPostsByCategory,
  type BlogCategorySlug,
} from "@/content/blog";
import { createPageMetadata } from "@/lib/seo";
import {
  getBreadcrumbJsonLd,
  getItemListJsonLd,
  getOrganizationJsonLd,
} from "@/lib/structured-data";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

function findCategory(slug: string) {
  return getCategoryBySlug(slug as BlogCategorySlug);
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);

  if (!category) {
    return createPageMetadata({
      title: "Categorie indisponibila",
      description: siteConfig.description,
      path: "/blog/",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${category.name}: ghiduri Romania - Europa`,
    description: category.description,
    path: `/blog/categorie/${category.slug}/`,
    image: `/og/categorie-${category.slug}.png`,
  });
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = findCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category.slug);

  return (
    <main>
      <PageHero
        breadcrumbs={[
          { name: "Acasa", href: "/" },
          { name: "Ghiduri", href: "/blog/" },
          { name: category.name },
        ]}
        eyebrow={`${posts.length} ghiduri`}
        title={category.name}
        lead={category.description}
      />

      <section className="bg-background pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="container-x">
          <nav aria-label="Categorii" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            <Link
              href="/blog/"
              className="inline-flex h-10 shrink-0 items-center rounded-full border border-border bg-white px-4 text-sm font-medium text-foreground/80 hover:border-foreground/30"
            >
              Toate
            </Link>
            {blogCategories.map((item) => {
              const active = item.slug === category.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/blog/categorie/${item.slug}/`}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-border bg-white text-foreground/80 hover:border-foreground/30"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <li
                key={post.slug}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
              >
                <PostCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: category.description,
            url: `${siteConfig.url}/blog/categorie/${category.slug}/`,
            inLanguage: "ro",
          },
          getItemListJsonLd(
            posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}/` as const })),
          ),
          getBreadcrumbJsonLd([
            { name: "Acasa", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: category.name, path: `/blog/categorie/${category.slug}/` },
          ]),
        ]}
      />
    </main>
  );
}
