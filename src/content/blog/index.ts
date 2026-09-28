import { coletePosts } from "./posts-colete";
import { diasporaPosts } from "./posts-diaspora";
import { rezervariPosts } from "./posts-rezervari";
import { rutePosts } from "./posts-rute";
import { sfaturiPosts } from "./posts-sfaturi";
import type { BlogCategorySlug, BlogPost } from "./types";

export { blogCategories, getCategoryBySlug } from "./types";
export { formatBlogDate } from "./format";
export type { BlogCategorySlug, BlogPost, BlogSection } from "./types";

const allPosts: BlogPost[] = [
  ...rutePosts,
  ...coletePosts,
  ...sfaturiPosts,
  ...rezervariPosts,
  ...diasporaPosts,
];

/** Articole ordonate descrescator dupa data publicarii. */
export const blogPosts: BlogPost[] = [...allPosts].sort((first, second) =>
  second.publishedAt.localeCompare(first.publishedAt),
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategorySlug): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

/**
 * Articole recomandate pentru link-uri interne: intai din aceeasi categorie,
 * completate cu cele mai recente din restul blogului.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = blogPosts.filter(
    (candidate) =>
      candidate.slug !== post.slug && candidate.category === post.category,
  );

  const others = blogPosts.filter(
    (candidate) =>
      candidate.slug !== post.slug && candidate.category !== post.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getLatestPosts(limit = 6): BlogPost[] {
  return blogPosts.slice(0, limit);
}

export function getBlogWordCount(post: BlogPost): number {
  return post.sections.reduce((total, section) => {
    const sectionText = [
      section.heading,
      ...section.body,
      ...(section.bullets ?? []),
    ].join(" ");

    return total + sectionText.split(/\s+/).filter(Boolean).length;
  }, 0);
}
