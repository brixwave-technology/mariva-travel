import { siteConfig } from "@/config/site";
import { blogPosts, getCategoryBySlug } from "@/content/blog";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = blogPosts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(getCategoryBySlug(post.category)?.name ?? "Ghiduri")}</category>
      <pubDate>${new Date(`${post.publishedAt}T08:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ghiduri ${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}/blog/</link>
    <description>Ghiduri despre transport persoane si colete intre Romania si Europa.</description>
    <language>ro</language>
    <lastBuildDate>${new Date(`${blogPosts[0]?.updatedAt ?? "2025-01-01"}T08:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
