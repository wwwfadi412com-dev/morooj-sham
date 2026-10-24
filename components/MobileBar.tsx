"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { SITE, whatsappLink } from "@/lib/site";

/** Persistent bottom action bar on mobile. Property pages render their own variant. */
export function MobileBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/property/")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 p-3 shadow-[0_-6px_20px_rgba(15,61,46,0.12)] backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a
          href={whatsappLink(SITE.whatsappGreeting)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1"
        >
          <WhatsAppIcon className="h-5 w-5" />
          تواصل عبر واتساب
        </a>
        <Link href="/request-property" className="btn-gold flex-1">
          <Search className="h-4 w-4" aria-hidden="true" />
          اطلب عقارك
        </Link>
      </div>
    </div>
  );
}
