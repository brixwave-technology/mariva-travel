import { siteConfig } from "@/config/site";
import { getWhatsAppHref } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

export function MobileCallBar() {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] px-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden">
      <div className="mx-auto flex max-w-screen-sm items-center gap-2">
        <a
          href={`tel:${siteConfig.dispatchPhoneE164}`}
          className="btn btn-dark h-12 flex-1 gap-2 px-3 text-sm"
        >
          <PhoneIcon className="h-4 w-4 text-accent" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[0.65rem] font-medium uppercase tracking-wider text-white/60">
              Suna 24/7
            </span>
            <span>{siteConfig.dispatchPhoneDisplay}</span>
          </span>
        </a>
        <a
          href={getWhatsAppHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp h-12 flex-1 gap-2 px-3 text-sm"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
