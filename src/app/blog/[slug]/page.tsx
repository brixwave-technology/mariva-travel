import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { FaqSection } from "@/components/sections/faq-section";
import { getDestinationMarketBySlug, siteConfig } from "@/config/site";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
  getBlogWordCount,
  getCategoryBySlug,
  getRelatedPosts,
} from "@/content/blog";
import { createPageMetadata } from "@/lib/seo";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getOrganizationJsonLd,
} from "@/lib/structured-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Articol indisponibil",
      description: siteConfig.description,
      path: "/blog/",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryBySlug(post.category);
  const relatedPosts = getRelatedPosts(post);
  const relatedMarkets = post.relatedRouteSlugs
    .map((routeSlug) => getDestinationMarketBySlug(routeSlug))
    .filter((market) => market !== undefined);

  const organizationJsonLd = getOrganizationJsonLd();
  const articleJsonLd = getArticleJsonLd({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    keywords: post.keywords,
    sectionName: category?.name ?? "Transport international",
    wordCount: getBlogWordCount(post),
  });
  const faqJsonLd = getFaqJsonLd(post.faq);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Acasa", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ]);

  return (
    <>
      <SiteHeader currentPageLabel={category?.name ?? "Blog"} />

      <main className="pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <section className="bg-foreground py-16 text-white lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <nav className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              <Link href="/" className="transition-colors hover:text-accent">
                Acasa
              </Link>
              {" / "}
              <Link href="/blog/" className="transition-colors hover:text-accent">
                Blog
              </Link>
              {" / "}
              <span className="text-accent">{category?.name}</span>
            </nav>

            <h1
              className="mt-6 text-4xl font-light leading-tight tracking-tight lg:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {post.excerpt}
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
              Publicat {formatBlogDate(post.publishedAt)} · Actualizat{" "}
              {formatBlogDate(post.updatedAt)} · {post.readingMinutes} min de
              citit
            </p>
          </div>
        </section>

        <article className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <nav
              aria-label="Cuprins"
              className="border border-border bg-card p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Cuprins
              </p>
              <ol className="mt-4 flex flex-col gap-2">
                {post.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#sectiunea-${index + 1}`}
                      className="text-sm leading-6 text-muted transition-colors hover:text-accent"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {post.sections.map((section, index) => (
              <section
                key={section.heading}
                id={`sectiunea-${index + 1}`}
                className="mt-14 scroll-mt-24"
              >
                <h2
                  className="text-2xl font-medium tracking-tight text-foreground lg:text-3xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-5 leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-6 flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 border border-border bg-card p-4"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="leading-7 text-foreground">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="article-takeaway mt-14 border-l-2 border-accent bg-card p-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Pe scurt
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground">
                {post.takeaway}
              </p>
            </aside>

            {relatedMarkets.length > 0 ? (
              <section className="mt-14">
                <h2 className="text-xl font-medium text-foreground">
                  Rute mentionate in articol
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {relatedMarkets.map((market) => (
                    <Link
                      key={market.slug}
                      href={`/transport/${market.slug}/`}
                      className="inline-flex border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      Transport Romania - {market.country}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </article>

        <FaqSection
          title="Intrebari frecvente pe acest subiect"
          intro="Raspunsuri scurte la cele mai frecvente intrebari primite in dispecerat pe aceasta tema."
          items={post.faq}
        />

        {relatedPosts.length > 0 ? (
          <section className="bg-background pb-24 lg:pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2
                className="text-3xl font-light tracking-tight text-foreground lg:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Continua cu aceste articole
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="card-premium flex flex-col p-6 hover-lift"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                      {related.readingMinutes} min de citit
                    </span>
                    <h3 className="mt-4 text-lg font-medium leading-7 text-foreground">
                      <Link
                        href={`/blog/${related.slug}/`}
                        className="transition-colors hover:text-accent"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <p className="mt-4 flex-1 leading-7 text-muted">
                      {related.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
                  Cere oferta pentru ruta ta
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                  Trimite ruta, data si numarul de persoane sau detaliile
                  coletului. Revenim rapid cu disponibilitatea si tariful.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={`tel:${siteConfig.dispatchPhoneE164}`}
                  className="inline-flex h-12 items-center justify-center bg-accent px-6 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-white"
                >
                  {siteConfig.dispatchPhoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappPhoneE164.replace("+", "")}?text=${encodeURIComponent(
                    "Buna ziua! Am citit un articol pe blogul Mariva Travel si doresc o oferta de transport.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Scrie pe WhatsApp
                </a>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
