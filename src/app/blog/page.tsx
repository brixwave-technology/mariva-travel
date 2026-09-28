import type { Metadata } from "next";
import Link from "next/link";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import {
  blogCategories,
  blogPosts,
  formatBlogDate,
  getPostsByCategory,
} from "@/content/blog";
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
    title: "Blog: ghiduri de transport persoane si colete Romania - Europa",
    description:
      "Ghiduri practice despre transport persoane si colete intre Romania si Europa: rute, acte necesare, bagaje, tarife, rezervari si sfaturi pentru diaspora.",
    path: "/blog/",
    keywords: [
      "blog transport persoane Romania Europa",
      "ghid transport international",
      "sfaturi calatorie Europa microbuz",
      "ghid colete Romania Europa",
      "informatii transport diaspora",
    ],
  });
}

export default function BlogHubPage() {
  const [featuredPost] = blogPosts;

  const organizationJsonLd = getOrganizationJsonLd();
  const blogJsonLd = getBlogJsonLd(blogPosts);
  const itemListJsonLd = getItemListJsonLd(
    blogPosts.map((post) => ({
      name: post.title,
      path: `/blog/${post.slug}/` as const,
    })),
  );
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Acasa", path: "/" },
    { name: "Blog", path: "/blog/" },
  ]);

  return (
    <>
      <SiteHeader currentPageLabel="Blog" />

      <main className="pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <section className="bg-foreground py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              <Link href="/" className="transition-colors hover:text-accent">
                Acasa
              </Link>
              {" / "}
              <span className="text-accent">Blog</span>
            </nav>

            <h1
              className="mt-6 max-w-4xl text-5xl font-light leading-tight tracking-tight lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ghiduri de transport persoane si colete Romania - Europa
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
              {blogPosts.length} articole scrise pentru oamenii care calatoresc
              sau trimit colete intre Romania si Europa: rute explicate pas cu
              pas, acte necesare, bagaje, tarife, rezervari si sfaturi practice
              pentru diaspora.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="inline-flex items-center border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-accent hover:text-accent"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {featuredPost ? (
          <section className="bg-background py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Cel mai recent articol
              </span>
              <article className="card-premium mt-6 p-8">
                <h2
                  className="text-3xl font-light tracking-tight text-foreground lg:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <Link
                    href={`/blog/${featuredPost.slug}/`}
                    className="transition-colors hover:text-accent"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-6 max-w-3xl leading-7 text-muted">
                  {featuredPost.excerpt}
                </p>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  {formatBlogDate(featuredPost.publishedAt)} ·{" "}
                  {featuredPost.readingMinutes} min de citit
                </p>
              </article>
            </div>
          </section>
        ) : null}

        {blogCategories.map((category) => {
          const posts = getPostsByCategory(category.slug);

          if (posts.length === 0) {
            return null;
          }

          return (
            <section
              key={category.slug}
              id={category.slug}
              className="scroll-mt-24 bg-background pb-16 lg:pb-20"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="border-t border-border pt-12">
                  <h2
                    className="text-3xl font-light tracking-tight text-foreground lg:text-4xl"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {category.name}
                  </h2>
                  <p className="mt-4 max-w-3xl leading-7 text-muted">
                    {category.description}
                  </p>

                  <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                      <article
                        key={post.slug}
                        className="card-premium flex flex-col p-6 hover-lift"
                      >
                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                          {post.readingMinutes} min de citit
                        </span>
                        <h3 className="mt-4 text-xl font-medium leading-7 text-foreground">
                          <Link
                            href={`/blog/${post.slug}/`}
                            className="transition-colors hover:text-accent"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-4 flex-1 leading-7 text-muted">
                          {post.excerpt}
                        </p>
                        <Link
                          href={`/blog/${post.slug}/`}
                          className="mt-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-accent"
                        >
                          <span>Citeste articolul</span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-foreground py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Rezervare rapida
                </span>
                <h2
                  className="mt-4 text-4xl font-light tracking-tight lg:text-5xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Ai o intrebare care nu are inca raspuns pe blog?
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                  Suna la dispecerat sau scrie pe WhatsApp cu ruta, data si
                  numarul de persoane. Primesti raspuns direct, fara formulare.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={`tel:${siteConfig.dispatchPhoneE164}`}
                  className="inline-flex h-12 items-center justify-center bg-accent px-6 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-white"
                >
                  {siteConfig.dispatchPhoneDisplay}
                </a>
                <Link
                  href="/transport/"
                  className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Vezi toate rutele
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileCallBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
