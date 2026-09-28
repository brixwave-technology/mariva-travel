import { siteConfig } from "@/config/site";
import { getWhatsAppHref } from "@/lib/contact";
import { ClockIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

export function FinalCtaSection() {
  return (
    <section id="contact" className="section-y bg-background pt-0 lg:pt-0">
      <div className="container-x">
        <div
          data-reveal
          className="bg-ink-gradient grain relative overflow-hidden rounded-[2rem] px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow eyebrow-light">Contact si rezervari</p>
              <h2 className="heading-lg mt-4 text-balance">
                Un telefon sau un mesaj, si drumul tau e organizat
              </h2>
              <p className="lead mt-6 max-w-xl text-white/65">
                Contacteaza dispeceratul pentru oferta, disponibilitate sau informatii despre
                colete. Raspundem rapid, 7 zile din 7.
              </p>
              <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
                <ClockIcon className="h-4 w-4 text-accent" />
                Disponibil 24/7 pentru rezervari, oferte si informatii despre rute
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.dispatchPhoneE164}`}
                className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-accent/60 hover:bg-white/[0.07] sm:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-ink">
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-white/55">Telefon dispecerat</span>
                  <span className="block font-display text-2xl sm:text-3xl">
                    {siteConfig.dispatchPhoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#3ddc84]/60 hover:bg-white/[0.07] sm:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-whatsapp text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-white/55">WhatsApp</span>
                  <span className="block font-display text-2xl sm:text-3xl">
                    {siteConfig.whatsappPhoneDisplay}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
