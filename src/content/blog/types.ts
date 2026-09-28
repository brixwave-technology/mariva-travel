export type BlogCategorySlug =
  | "rute"
  | "colete"
  | "sfaturi-calatorie"
  | "rezervari-tarife"
  | "ghiduri-diaspora";

export type BlogSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type BlogPost = {
  /** Slug folosit in URL: /blog/<slug>/ */
  slug: string;
  /** H1 al articolului */
  title: string;
  /** Titlu scurt pentru Google (sub 60 caractere), cand H1 este prea lung */
  seoTitle?: string;
  /** Meta description, ideal 140-165 caractere */
  description: string;
  /** Propozitie de intro afisata sub H1 si in listing */
  excerpt: string;
  category: BlogCategorySlug;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  /** Slug-uri din destinationMarkets pentru link-uri interne catre paginile de ruta */
  relatedRouteSlugs: string[];
  sections: BlogSection[];
  faq: { question: string; answer: string }[];
  /** Concluzie scurta, folosita si ca speakable summary */
  takeaway: string;
};

export const blogCategories: {
  slug: BlogCategorySlug;
  name: string;
  description: string;
}[] = [
  {
    slug: "rute",
    name: "Rute internationale",
    description:
      "Ghiduri pe fiecare ruta Romania - Europa: orase deservite, durata orientativa a cursei si ce trebuie sa stii inainte de plecare.",
  },
  {
    slug: "colete",
    name: "Transport colete",
    description:
      "Tot despre trimiterea coletelor, bagajelor si pachetelor intre Romania si tarile europene deservite de Mariva Travel.",
  },
  {
    slug: "sfaturi-calatorie",
    name: "Sfaturi de calatorie",
    description:
      "Acte, bagaje, confort la drum lung, calatorii cu copii sau cu varstnici si pregatirea unei curse internationale.",
  },
  {
    slug: "rezervari-tarife",
    name: "Rezervari si tarife",
    description:
      "Cum rezervi, cum se stabileste tariful, ce inseamna door-to-door si cum functioneaza reprogramarile.",
  },
  {
    slug: "ghiduri-diaspora",
    name: "Ghiduri pentru diaspora",
    description:
      "Resurse pentru romanii plecati la munca sau stabiliti in Europa: mutari, reveniri in tara si sezoane aglomerate.",
  },
];

export function getCategoryBySlug(slug: BlogCategorySlug) {
  return blogCategories.find((category) => category.slug === slug);
}
