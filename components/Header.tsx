"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { navigation } from "@/data/content";
import { SITE, whatsappLink } from "@/lib/site";

const NAV = navigation.header;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-emerald/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-emerald/90 print:hidden">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label={`${SITE.name} - الرئيسية`} className="shrink-0">
          <BrandLogo />
        </Link>

        <nav aria-label="القائمة الرئيسية" className="hidden xl:block">
          <ul className="flex items-center gap-4 2xl:gap-5">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={
                      n.highlight
                        ? `whitespace-nowrap rounded-full border border-gold px-3 py-1.5 font-heading text-sm font-bold transition-colors ${
                            active ? "bg-gold text-emerald" : "text-gold hover:bg-gold hover:text-emerald"
                          }`
                        : `whitespace-nowrap font-heading text-sm font-bold transition-colors hover:text-gold 2xl:text-[15px] ${active ? "text-gold" : "text-white/90"}`
                    }
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/submit-property" className="btn-gold hidden !py-2.5 md:inline-flex">
            أضف عقارك
          </Link>
          <a
            href={whatsappLink(SITE.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden !py-2.5 md:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            واتساب
          </a>
          <button
            type="button"
            className="rounded-btn p-2 text-white xl:hidden"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="القائمة" className="border-t border-white/10 bg-emerald xl:hidden">
          <ul className="container flex flex-col py-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`flex items-center justify-between border-b border-white/5 py-3 font-heading font-bold hover:text-gold ${n.highlight ? "text-gold" : "text-white"}`}
                >
                  {n.label}
                  {n.highlight && <span className="rounded-full bg-gold px-2 py-0.5 text-xs text-emerald">جديد</span>}
                </Link>
              </li>
            ))}
            <li className="flex gap-2 pt-4">
              <Link href="/submit-property" className="btn-gold flex-1">
                أضف عقارك
              </Link>
              <Link href="/request-property" className="btn-outline flex-1 !text-white">
                اطلب عقارك
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
