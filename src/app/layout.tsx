import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { CommandPalette } from "@/components/layout/command-palette";
import { FloatingActions } from "@/components/layout/floating-actions";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getLatestPosts } from "@/content/blog";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f5f1",
};

// Marcheaza documentul ca avand JS inainte de primul paint, pentru animatiile la scroll.
// Daca hidratarea esueaza, continutul redevine vizibil dupa 3 secunde.
const revealBootstrap = `document.documentElement.classList.add('js');setTimeout(function(){var r=document.documentElement;if(!r.classList.contains('reveal-ready')){r.classList.remove('js')}},3000);`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const latestPosts = getLatestPosts(3).map((post) => ({
    slug: post.slug,
    title: post.title,
    readingMinutes: post.readingMinutes,
  }));

  return (
    <html lang="ro" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className={`${geistSans.variable} ${playfair.variable} antialiased`}>
        <a
          href="#continut"
          className="fixed left-4 top-3 z-[90] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Sari la continut
        </a>
        <SiteHeader latestPosts={latestPosts} />
        <div id="continut">{children}</div>
        <SiteFooter />
        <FloatingActions />
        <MobileCallBar />
        <CommandPalette />
        <ScrollReveal />
      </body>
    </html>
  );
}
