import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleToc } from "@/components/blog/article-toc";
import { PostCard } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/ui/cta-band";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { getDestinationMarketBySlug, siteConfig } from "@/config/site";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
  getBlogWordCount,
  getCategoryBySlug,
  getRelatedPosts,
} from "@/content/blog";
import { getWhatsAppHref } from "@/lib/contact";
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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
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

  const pageTitle = post.seoTitle ?? post.title;

  return createPageMetadata({
    title: pageTitle,
    // Titlurile lungi nu mai primesc sufixul de brand, ca sa nu fie trunchiate in Google.
    absoluteTitle: pageTitle.length > 48,
    description: post.description,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
    image: `/og/ghid-${post.slug}.png`,
    imageAlt: post.title,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: getCategoryBySlug(post.category)?.name ?? "Ghiduri",
      tags: post.keywords,
    },
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
  const tocItems = post.sections.map((section, index) => ({
    id: `sectiunea-${index + 1}`,
    label: section.heading,
  }));
  const articleUrl = `${siteConfig.url}/blog/${post.slug}/`;

  return (
    <main>
      <ReadingProgress targetId="articol" />

      <PageHero
        breadcrumbs={[
          { name: "Acasa", href: "/" },
          { name: "Ghiduri", href: "/blog/" },
          { name: category?.name ?? "Ghid", href: `/blog/categorie/${post.category}/` },
        ]}
        eyebrow={category?.name}
        title={post.title}
        lead={post.excerpt}
        meta={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-accent" />
              Actualizat{" "}
              <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-accent" />
              {post.readingMinutes} minute de citit
            </span>
          </div>
        }
      />

      <div className="bg-background py-12 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <article id="articol" className="min-w-0 max-w-3xl">
            <details className="card group mb-10 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold [&::-webkit-details-marker]:hidden">
                Cuprins ({tocItems.length} sectiuni)
                <ChevronDownIcon className="h-5 w-5 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <ol className="flex flex-col gap-1 px-5 pb-5">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="block py-1.5 text-sm text-muted hover:text-foreground">
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="prose-article">
              {post.sections.map((section, index) => (
                <section key={section.heading} id={tocItems[index].id} className="scroll-mt-28 pb-4">
                  <h2 className={`heading-md text-foreground ${index === 0 ? "" : "mt-10"}`}>
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 rounded-2xl border border-border bg-white px-4 py-3.5"
                        >
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-accent">
                            <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                          <span className="leading-7 text-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <aside className="article-takeaway bg-ink-gradient relative mt-12 overflow-hidden rounded-3xl p-7 text-white sm:p-8">
              <p className="eyebrow eyebrow-light">Pe scurt</p>
              <p className="mt-4 font-display text-xl leading-relaxed sm:text-2xl">{post.takeaway}</p>
            </aside>

            {relatedMarkets.length > 0 ? (
              <div className="mt-12">
                <h2 className="text-lg font-semibold text-foreground">Rute mentionate in ghid</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {relatedMarkets.map((market) => (
                    <li key={market.slug}>
                      <Link
                        href={`/transport/${market.slug}/`}
                        className="card card-hover group flex items-center justify-between gap-3 p-4"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-[0.68rem] font-bold text-accent">
                            {market.code}
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            Romania - {market.country}
                          </span>
                        </span>
                        <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10 border-t border-border pt-8 lg:hidden">
              <ShareButtons url={articleUrl} title={post.title} />
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <ArticleToc items={tocItems} />

              <div className="rounded-3xl bg-ink p-6 text-white">
                <p className="font-display text-xl leading-snug">Ai nevoie de transport?</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Trimite ruta si data, iar dispeceratul revine rapid cu oferta.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={getWhatsAppHref(
                      `Buna ziua! Am citit ghidul "${post.title}" si doresc o oferta de transport.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={`tel:${siteConfig.dispatchPhoneE164}`} className="btn btn-gold btn-sm">
                    <PhoneIcon className="h-4 w-4" /> {siteConfig.dispatchPhoneDisplay}
                  </a>
                </div>
              </div>

              <ShareButtons url={articleUrl} title={post.title} />
            </div>
          </aside>
        </div>
      </div>

      <FaqSection
        className="bg-surface/60"
        title="Intrebari frecvente pe acest subiect"
        intro="Raspunsuri scurte la intrebarile primite cel mai des in dispecerat pe aceasta tema."
        items={post.faq}
      />

      {relatedPosts.length > 0 ? (
        <section className="section-y bg-background">
          <div className="container-x">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Citeste in continuare</p>
                <h2 className="heading-lg mt-4">Ghiduri similare</h2>
              </div>
              <Link href="/blog/" className="btn btn-outline btn-sm">
                Toate ghidurile <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <div
                  key={related.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <PostCard post={related} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Cere oferta pentru ruta ta"
        whatsappMessage={`Buna ziua! Am citit ghidul "${post.title}" si doresc o oferta de transport.`}
      />

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          getArticleJsonLd({
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}/`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            keywords: post.keywords,
            sectionName: category?.name ?? "Transport international",
            wordCount: getBlogWordCount(post),
            imageKey: `ghid-${post.slug}`,
          }),
          getFaqJsonLd(post.faq),
          getBreadcrumbJsonLd([
            { name: "Acasa", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: category?.name ?? "Ghiduri", path: `/blog/categorie/${post.category}/` },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />
    </main>
  );
}
