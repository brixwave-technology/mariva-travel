import { destinationMarkets } from "@/config/site";

export function RoutesMarquee() {
  const items = [...destinationMarkets, ...destinationMarkets];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-5 text-white" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((market, index) => (
          <span key={`${market.slug}-${index}`} className="flex items-center gap-3 whitespace-nowrap text-sm">
            <span className="font-display text-lg text-white/90">Romania</span>
            <span className="text-accent">⇄</span>
            <span className="font-display text-lg text-white/90">{market.country}</span>
            <span className="ml-6 h-1 w-1 rounded-full bg-white/25" />
          </span>
        ))}
      </div>
    </div>
  );
}
