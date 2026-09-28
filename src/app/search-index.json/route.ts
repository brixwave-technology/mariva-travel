import type { SearchItem } from "@/components/layout/command-palette";
import { destinationMarkets } from "@/config/site";
import { blogCategories, blogPosts, getCategoryBySlug } from "@/content/blog";

export const dynamic = "force-static";

export function GET() {
  const pages: SearchItem[] = [
    {
      t: "Toate rutele Romania - Europa",
      u: "/transport/",
      g: "Pagini",
      d: "Transport persoane si colete in 10 tari europene",
      k: "rute destinatii tari europa",
    },
    {
      t: "Transport colete Romania - Europa",
      u: "/transport-colete/",
      g: "Pagini",
      d: "Colete, bagaje si pachete door-to-door",
      k: "colet pachet bagaj trimitere expediere",
    },
    {
      t: "Ghiduri si sfaturi de calatorie",
      u: "/blog/",
      g: "Pagini",
      d: `${blogPosts.length} articole despre rute, acte, bagaje si tarife`,
      k: "blog articole ghid sfaturi",
    },
    {
      t: "Contact si rezervari",
      u: "/#contact",
      g: "Pagini",
      d: "Telefon, WhatsApp, dispecerat 24/7",
      k: "contact telefon whatsapp rezervare oferta pret",
    },
  ];

  const routes: SearchItem[] = destinationMarkets.map((market) => ({
    t: `Transport Romania - ${market.country}`,
    u: `/transport/${market.slug}/`,
    g: "Rute",
    d: `${market.popularCities.join(", ")} · ${market.durationHint}`,
    k: `${market.country} ${market.cities.join(" ")} persoane colete microbuz`,
  }));

  const categories: SearchItem[] = blogCategories.map((category) => ({
    t: category.name,
    u: `/blog/categorie/${category.slug}/`,
    g: "Categorii",
    d: category.description,
    k: "categorie ghiduri",
  }));

  const posts: SearchItem[] = blogPosts.map((post) => ({
    t: post.title,
    u: `/blog/${post.slug}/`,
    g: "Ghiduri",
    d: getCategoryBySlug(post.category)?.name ?? "Ghid",
    k: `${post.keywords.join(" ")} ${post.excerpt}`,
  }));

  return Response.json([...pages, ...routes, ...categories, ...posts]);
}
