import Link from "next/link";
import { formatBlogDate } from "@/content/blog/format";
import { getCategoryBySlug, type BlogPost } from "@/content/blog/types";
import { ArrowRightIcon } from "@/components/ui/icons";

type PostCardProps = {
  post: Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "readingMinutes" | "publishedAt">;
  headingLevel?: "h2" | "h3";
};

export function PostCard({ post, headingLevel = "h3" }: PostCardProps) {
  const Heading = headingLevel;
  const category = getCategoryBySlug(post.category);

  return (
    <article className="card card-hover group relative flex h-full flex-col p-6">
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-surface px-2.5 py-1 font-semibold text-accent-ink">
          {category?.name}
        </span>
        <span className="text-muted">{post.readingMinutes} min</span>
      </div>
      <Heading className="mt-4 text-lg font-semibold leading-snug text-foreground">
        <Link
          href={`/blog/${post.slug}/`}
          className="after:absolute after:inset-0 after:rounded-[1.25rem] group-hover:text-accent-ink"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-7 text-muted">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
          Citeste
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
