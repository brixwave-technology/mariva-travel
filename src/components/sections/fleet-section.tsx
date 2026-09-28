import Image from "next/image";
import {
  LuggageIcon,
  PauseIcon,
  PlugIcon,
  SeatIcon,
  SnowIcon,
  WifiIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

const amenities = [
  { icon: SnowIcon, label: "Aer conditionat" },
  { icon: WifiIcon, label: "Wi-Fi la bord" },
  { icon: PlugIcon, label: "Prize USB" },
  { icon: LuggageIcon, label: "Spatiu generos pentru bagaje" },
  { icon: SeatIcon, label: "Scaune reclinabile" },
  { icon: PauseIcon, label: "Pauze regulate" },
] as const;

const vehicles = [
  {
    title: "Microbuze executive",
    capacity: "8+1 locuri",
    description: "Ideale pentru grupuri mici, transferuri door-to-door si rute rapide.",
  },
  {
    title: "Autocare premium",
    capacity: "49 locuri",
    description: "Pentru curse lungi, cu accent pe confort si spatiu pentru bagaje.",
  },
] as const;

export function FleetSection() {
  return (
    <section id="flota" className="section-y bg-ink-gradient grain relative overflow-hidden text-white">
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Flota"
          title="Vehicule moderne, pregatite pentru drum lung"
          text="Microbuze si autocare verificate tehnic periodic, cu dotari pentru confort pe traseele Romania - Europa si spatiu dedicat pentru bagaje si colete."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <figure
            data-reveal
            className="group relative overflow-hidden rounded-[1.5rem] lg:col-span-2 lg:row-span-2"
          >
            <div className="relative aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[32rem]">
              <Image
                src="/images/fleet-minibus.jpg"
                alt="Microbuz Mariva Travel pentru transport persoane Romania - Europa"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            </div>
            <figcaption className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">
                8+1 locuri
              </span>
              <p className="mt-3 font-display text-3xl">Microbuze executive</p>
              <p className="mt-2 max-w-md text-white/70">
                Pentru curse door-to-door, grupuri mici si transport flexibil spre destinatiile
                europene.
              </p>
            </figcaption>
          </figure>

          {[
            { src: "/images/interior-luxury.jpg", alt: "Interior confortabil in vehiculele Mariva Travel", title: "Interior spatios", text: "Scaune confortabile pentru drum lung" },
            { src: "/images/on-the-road.jpg", alt: "Microbuz Mariva Travel pe traseu european", title: "Pe drum", text: "Soferi cu experienta pe rute internationale" },
          ].map((image, index) => (
            <figure
              key={image.src}
              data-reveal
              style={{ "--reveal-delay": `${(index + 1) * 90}ms` } as React.CSSProperties}
              className="group relative overflow-hidden rounded-[1.5rem]"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-5 bottom-5">
                <p className="font-semibold">{image.title}</p>
                <p className="text-sm text-white/65">{image.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div data-reveal className="flex flex-col gap-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.title} className="card-dark flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold">{vehicle.title}</p>
                  <p className="mt-1 text-sm text-white/60">{vehicle.description}</p>
                </div>
                <span className="shrink-0 rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent">
                  {vehicle.capacity}
                </span>
              </div>
            ))}
          </div>
          <ul data-reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amenities.map((amenity) => (
              <li key={amenity.label} className="card-dark flex flex-col gap-3 p-4">
                <amenity.icon className="h-5 w-5 text-accent" />
                <span className="text-sm text-white/80">{amenity.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
