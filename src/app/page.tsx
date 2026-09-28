import type { Metadata } from "next";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { BlogTeaserSection } from "@/components/sections/blog-teaser-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { HeroSection } from "@/components/sections/hero-section";
import { RoutesSection } from "@/components/sections/routes-section";
import { ServiceHighlightsSection } from "@/components/sections/service-highlights-section";
import { TrustSection } from "@/components/sections/trust-section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import {
  getFaqJsonLd,
  getOrganizationJsonLd,
  getTransportServiceJsonLd,
  getWebsiteJsonLd,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Transport persoane si colete Romania - Europa, door-to-door zilnic",
    description:
      "Mariva Travel ofera transport persoane si colete door-to-door intre Romania si Europa, cu plecari zilnice, preluare de la adresa, tarife corecte si rezervari rapide pe telefon sau WhatsApp.",
    path: "/",
    keywords: [
      "transport persoane Romania Europa",
      "transport colete Romania Europa",
      "transport persoane door to door",
      "transport persoane Belgia Germania Franta",
      "transport international zilnic",
    ],
  });
}

export default function HomePage() {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();
  const transportServiceJsonLd = getTransportServiceJsonLd();
  const faqJsonLd = getFaqJsonLd(siteConfig.faqItems);

  return (
    <>
      <main className="pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <HeroSection />
        <ServiceHighlightsSection />
        <RoutesSection />
        <FleetSection />
        <TrustSection />
        <BlogTeaserSection />
        <FaqSection
          title="Intrebari frecvente despre transportul international"
          intro="Am adunat raspunsurile esentiale pentru clientii care cauta transport persoane si colete Romania - Europa, cu plecari zilnice, preluare de la adresa si confirmare rapida."
          items={siteConfig.faqItems}
        />
        <FinalCtaSection />
      </main>

      <MobileCallBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(transportServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
    </>
  );
}
