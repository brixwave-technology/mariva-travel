import Link from "next/link";
import { blogPosts, getLatestPosts } from "@/content/blog";
import { PostCard } from "@/components/blog/post-card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function BlogTeaserSection() {
  const posts = getLatestPosts(3);

  return (
    <section id="ghiduri" className="section-y bg-surface/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Ghiduri si sfaturi"
          title="Informatii utile inainte de plecare"
          text={`${blogPosts.length} ghiduri despre rute, acte necesare, bagaje, colete, tarife si rezervari, scrise pentru cei care calatoresc intre Romania si Europa.`}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
        <div data-reveal className="mt-10 flex justify-center">
          <Link href="/blog/" className="btn btn-dark">
            Toate cele {blogPosts.length} de ghiduri <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
