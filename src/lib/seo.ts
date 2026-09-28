import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type CreatePageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  keywords?: string[];
  noIndex?: boolean;
  /** Imaginea Open Graph generata pentru pagina, ex. /og/home.png */
  image?: `/${string}`;
  imageAlt?: string;
  /** Titlul complet, fara sufixul " | Mariva Travel" */
  absoluteTitle?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tags: string[];
  };
};

const robotsDirectives = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} as const;

const rssAlternate = {
  "application/rss+xml": [{ url: "/blog/rss.xml", title: `Ghiduri ${siteConfig.name}` }],
};

const defaultTitle = "Transport persoane si colete Romania - Europa | Mariva Travel";
const defaultImage = "/og/home.png";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  category: "transport",
  icons: {
    icon: [
      { url: "/brand/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  keywords: [
    "transport persoane Romania Europa",
    "transport persoane international",
    "transport colete Romania Europa",
    "transport door to door Romania Europa",
    "transport persoane Germania Romania",
    "transport persoane Belgia Romania",
    "transport persoane Italia Romania",
    "microbuz Romania Europa",
    "curse Romania Europa",
    "Mariva Travel",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "ro-RO": "/",
    },
    types: rssAlternate,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: "Mariva Travel - transport persoane si colete door-to-door Romania - Europa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [defaultImage],
  },
  robots: robotsDirectives,
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  image = defaultImage,
  imageAlt,
  absoluteTitle = false,
  article,
}: CreatePageMetadataInput): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: imageAlt ?? `${siteConfig.name} - ${title}`,
    },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ro-RO": canonicalUrl,
      },
      types: rssAlternate,
    },
    openGraph: article
      ? {
          type: "article",
          title: socialTitle,
          description,
          url: canonicalUrl,
          locale: siteConfig.locale,
          siteName: siteConfig.name,
          images,
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          section: article.section,
          tags: article.tags,
          authors: [siteConfig.url],
        }
      : {
          type: "website",
          title: socialTitle,
          description,
          url: canonicalUrl,
          locale: siteConfig.locale,
          siteName: siteConfig.name,
          images,
        },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: robotsDirectives.googleBot },
  };
}
