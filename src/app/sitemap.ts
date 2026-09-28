import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogCategories, blogPosts } from "@/content/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/transport/`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...siteConfig.destinationMarkets.map((market) => ({
      url: `${siteConfig.url}/transport/${market.slug}/`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    {
      url: `${siteConfig.url}/transport-colete/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogCategories.map((category) => ({
      url: `${siteConfig.url}/blog/categorie/${category.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}/`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
