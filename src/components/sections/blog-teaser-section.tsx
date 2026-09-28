import Link from "next/link";
import { blogPosts, getLatestPosts } from "@/content/blog";

export function BlogTeaserSection() {
  const posts = getLatestPosts(3);

  return (
    <section id="ghiduri" className="scroll-mt-24 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Ghiduri si Resurse
            </span>
            <h2
              className="mt-4 text-4xl font-light leading-tight tracking-tight text-foreground lg:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Informatii utile inainte de plecare
            </h2>
            <div className="mt-6 h-px w-20 bg-accent" />
            <p className="mt-8 text-lg leading-relaxed text-muted">
              {blogPosts.length} articole despre rute, acte necesare, bagaje,
              colete, tarife si rezervari, scrise pentru cei care calatoresc
              intre Romania si Europa.
            </p>
            <Link
              href="/blog/"
              className="mt-8 inline-flex h-12 items-center justify-center border border-foreground px-6 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-foreground hover:text-white"
            >
              Vezi toate ghidurile
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <article key={post.slug} className="border border-border bg-card p-6">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {post.readingMinutes} min de citit
                </span>
                <h3 className="mt-3 text-xl font-medium leading-7 text-foreground">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-muted">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
