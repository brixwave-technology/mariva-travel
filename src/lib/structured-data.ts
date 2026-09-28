import { type DestinationMarket, siteConfig } from "@/config/site";
import { getWhatsAppBaseHref } from "@/lib/contact";

type JsonLdValue =
  | string
  | number
  | boolean
  | JsonLdObject
  | JsonLdValue[];

type JsonLdObject = {
  [key: string]: JsonLdValue;
};

function getOpeningHoursSpecification(): JsonLdObject[] {
  return [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ].map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    opens: "00:00",
    closes: "23:59",
  }));
}

export function getOrganizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: "Transport persoane si colete door-to-door Romania - Europa",
    telephone: siteConfig.dispatchPhoneE164,
    sameAs: [getWhatsAppBaseHref()],
    availableLanguage: ["ro", "en"],
    areaServed: siteConfig.areaServedCountries.map((country) => ({
      "@type": "Country",
      name: country,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.dispatchPhoneE164,
        availableLanguage: "ro",
      },
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp support",
        telephone: siteConfig.whatsappPhoneE164,
        availableLanguage: "ro",
      },
    ],
    openingHoursSpecification: getOpeningHoursSpecification(),
    knowsAbout: [
      "transport persoane international",
      "transport colete Romania Europa",
      "transport door-to-door",
      "curse Romania Germania",
      "curse Romania Belgia",
    ],
  };
}

export function getWebsiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ro",
    description: siteConfig.description,
  };
}

export function getTransportServiceJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Transport persoane si colete Romania - Europa",
    serviceType: "Transport international persoane si colete door-to-door",
    category: "Passenger transport and parcel delivery",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.dispatchPhoneE164,
      sameAs: [getWhatsAppBaseHref()],
    },
    areaServed: siteConfig.areaServedCountries.map((country) => ({
      "@type": "Country",
      name: country,
    })),
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceUrl: siteConfig.url,
        availableLanguage: ["ro"],
        servicePhone: siteConfig.dispatchPhoneE164,
      },
    ],
    hoursAvailable: getOpeningHoursSpecification(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Rute internationale Mariva Travel",
      itemListElement: siteConfig.destinationMarkets.map((market, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: `Transport Romania - ${market.country}`,
          areaServed: {
            "@type": "Country",
            name: market.country,
          },
        },
      })),
    },
  };
}

export function getRouteServiceJsonLd(market: DestinationMarket): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Transport persoane si colete Romania - ${market.country}`,
    serviceType: `Transport international door-to-door Romania - ${market.country}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.dispatchPhoneE164,
    },
    areaServed: [
      {
        "@type": "Country",
        name: siteConfig.departureCountry,
      },
      {
        "@type": "Country",
        name: market.country,
      },
    ],
    description: `${siteConfig.name} ofera transport persoane si colete door-to-door pe ruta Romania - ${market.country}, cu rezervari rapide si preluare de la adresa.`,
    audience: {
      "@type": "Audience",
      audienceType: "pasageri, familii, muncitori sezonieri, expati, clienti care trimit colete",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/transport/${market.slug}/`,
    },
  };
}

export function getFaqJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: `/${string}` | "/" }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: `/${string}`;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  sectionName: string;
  wordCount: number;
};

export function getArticleJsonLd(article: ArticleJsonLdInput): JsonLdObject {
  const url = new URL(article.path, siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: article.title,
    description: article.description,
    url,
    inLanguage: "ro",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: article.sectionName,
    keywords: article.keywords.join(", "),
    wordCount: article.wordCount,
    image: new URL(siteConfig.socialImage, siteConfig.url).toString(),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Service",
      name: "Transport persoane si colete Romania - Europa",
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-takeaway"],
    },
  };
}

export function getBlogJsonLd(
  posts: ReadonlyArray<{ slug: string; title: string; description: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${siteConfig.name}`,
    url: `${siteConfig.url}/blog/`,
    inLanguage: "ro",
    description:
      "Ghiduri despre transport persoane si colete intre Romania si Europa: rute, acte, bagaje, tarife si sfaturi pentru diaspora.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}/`,
    })),
  };
}

export function getItemListJsonLd(
  items: ReadonlyArray<{ name: string; path: `/${string}` }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
