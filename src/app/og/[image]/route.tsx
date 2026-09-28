import { ImageResponse } from "next/og";
import { destinationMarkets, siteConfig } from "@/config/site";
import { blogCategories, blogPosts, getCategoryBySlug } from "@/content/blog";

export const dynamic = "force-static";
export const dynamicParams = false;

type OgEntry = {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips?: readonly string[];
};

function getEntries(): Record<string, OgEntry> {
  const entries: Record<string, OgEntry> = {
    home: {
      eyebrow: "Transport door-to-door · 24/7",
      title: "Transport persoane si colete Romania - Europa",
      subtitle: "Preluare de la adresa, lasare la destinatie, in 10 tari europene.",
      chips: destinationMarkets.slice(0, 6).map((market) => market.country),
    },
    transport: {
      eyebrow: "Rute internationale",
      title: "Romania conectata cu 10 tari din Europa",
      subtitle: "Germania, Belgia, Franta, Italia, Olanda, Austria, Elvetia si altele.",
      chips: destinationMarkets.map((market) => market.code),
    },
    colete: {
      eyebrow: "Transport colete",
      title: "Colete si bagaje Romania - Europa, la adresa",
      subtitle: "Preluare din Romania, livrare la destinatar, pe curse regulate.",
    },
    blog: {
      eyebrow: "Ghiduri si sfaturi",
      title: "Tot ce trebuie sa stii inainte de drum",
      subtitle: `${blogPosts.length} ghiduri despre rute, acte, bagaje, colete si tarife.`,
    },
  };

  for (const market of destinationMarkets) {
    entries[`ruta-${market.slug}`] = {
      eyebrow: `Ruta Romania - ${market.country} · ${market.durationHint}`,
      title: `Transport persoane si colete Romania - ${market.country}`,
      subtitle: "Door-to-door, cu preluare de la adresa si rezervare rapida.",
      chips: market.popularCities,
    };
  }

  for (const category of blogCategories) {
    entries[`categorie-${category.slug}`] = {
      eyebrow: "Ghiduri Mariva Travel",
      title: category.name,
      subtitle: category.description,
    };
  }

  for (const post of blogPosts) {
    entries[`ghid-${post.slug}`] = {
      eyebrow: `${getCategoryBySlug(post.category)?.name ?? "Ghid"} · ${post.readingMinutes} min`,
      title: post.title,
      subtitle: post.excerpt,
    };
  }

  return entries;
}

export function generateStaticParams() {
  return Object.keys(getEntries()).map((key) => ({ image: `${key}.png` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const { image } = await params;
  const entry = getEntries()[image.replace(/\.png$/, "")] ?? getEntries().home;
  const titleSize = entry.title.length > 70 ? 52 : entry.title.length > 45 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#ffffff",
          backgroundColor: "#0b0d12",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(207,171,106,0.38), rgba(11,13,18,0) 55%), radial-gradient(circle at 0% 100%, rgba(207,171,106,0.18), rgba(11,13,18,0) 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              border: "2px solid rgba(207,171,106,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              color: "#cfab6a",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>Mariva Travel</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", letterSpacing: 6 }}>
              TRANSPORT PERSOANE SI COLETE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              color: "#cfab6a",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 44, height: 2, background: "#cfab6a" }} />
            {entry.eyebrow}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: titleSize,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: -1.5,
              maxWidth: 1020,
            }}
          >
            {entry.title}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 980,
            }}
          >
            {entry.subtitle.length > 140 ? `${entry.subtitle.slice(0, 137)}...` : entry.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {(entry.chips ?? []).slice(0, 6).map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 20,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
            <div
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "#cfab6a",
                color: "#0b0d12",
                fontWeight: 700,
              }}
            >
              {siteConfig.dispatchPhoneDisplay}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)" }}>marivatravel.com</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
