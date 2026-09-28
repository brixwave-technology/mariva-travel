import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const dynamicParams = false;

const sizes: Record<string, number> = {
  "logo.png": 512,
  "icon-512.png": 512,
  "icon-192.png": 192,
  "apple-touch-icon.png": 180,
  "favicon-48.png": 48,
};

export function generateStaticParams() {
  return Object.keys(sizes).map((image) => ({ image }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const { image } = await params;
  const size = sizes[image] ?? 512;
  const radius = image === "apple-touch-icon.png" ? 0 : Math.round(size * 0.22);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius,
          background: "linear-gradient(145deg, #1a1f2b 0%, #0b0d12 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: size * 0.18,
            border: `${Math.max(2, Math.round(size * 0.02))}px solid rgba(207,171,106,0.55)`,
            color: "#cfab6a",
            fontSize: size * 0.46,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          M
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
