import { siteConfig } from "@/config/site";
import { getWhatsAppHref } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

type CtaBandProps = {
  title?: string;
  text?: string;
  whatsappMessage?: string;
};

export function CtaBand({
  title = "Spune-ne ruta, noi ne ocupam de rest",
  text = "Trimite localitatea de plecare, destinatia, data si numarul de persoane sau detaliile coletului. Revenim rapid cu disponibilitatea si tariful.",
  whatsappMessage,
}: CtaBandProps) {
  return (
    <section className="bg-background pb-20 lg:pb-28">
      <div className="container-x">
        <div
          data-reveal
          className="bg-ink-gradient grain relative overflow-hidden rounded-[2rem] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow eyebrow-light">Rezervare rapida</p>
              <h2 className="heading-lg mt-4 max-w-2xl text-balance">{title}</h2>
              <p className="lead mt-5 max-w-2xl text-white/65">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={`tel:${siteConfig.dispatchPhoneE164}`} className="btn btn-gold h-14 px-7">
                <PhoneIcon className="h-5 w-5" />
                {siteConfig.dispatchPhoneDisplay}
              </a>
              <a
                href={getWhatsAppHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp h-14 px-7"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp {siteConfig.whatsappPhoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
