import type { Metadata } from "next";
import { BlogTeaserSection } from "@/components/sections/blog-teaser-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { HeroSection } from "@/components/sections/hero-section";
import { RoutesMarquee } from "@/components/sections/routes-marquee";
import { RoutesSection } from "@/components/sections/routes-section";
import { ServiceHighlightsSection } from "@/components/sections/service-highlights-section";
import { TrustSection } from "@/components/sections/trust-section";
import { JsonLd } from "@/components/ui/json-ld";
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
    title: "Transport persoane si colete Romania - Europa | Mariva Travel",
    absoluteTitle: true,
    description:
      "Transport persoane si colete door-to-door Romania - Germania, Belgia, Italia, Franta si alte 6 tari. Preluare de la adresa, dispecerat 24/7, oferta pe WhatsApp.",
    path: "/",
    image: "/og/home.png",
    keywords: [
      "transport persoane Romania Europa",
      "transport colete Romania Europa",
      "transport persoane door to door",
      "transport persoane Germania Belgia Italia",
      "microbuz Romania Europa",
    ],
  });
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RoutesMarquee />
      <ServiceHighlightsSection />
      <RoutesSection />
      <FleetSection />
      <TrustSection />
      <BlogTeaserSection />
      <FaqSection
        title="Intrebari frecvente despre transportul international"
        intro="Raspunsurile esentiale pentru cei care cauta transport persoane si colete Romania - Europa, cu preluare de la adresa si confirmare rapida."
        items={siteConfig.faqItems}
      />
      <FinalCtaSection />

      <JsonLd
        data={[
          getOrganizationJsonLd(),
          getWebsiteJsonLd(),
          getTransportServiceJsonLd(),
          getFaqJsonLd(siteConfig.faqItems),
        ]}
      />
    </main>
  );
}
