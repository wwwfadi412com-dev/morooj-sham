"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export const NAV = [
  { href: "/for-sale", label: "عقارات للبيع" },
  { href: "/for-rent/daily-farms", label: "مزارع للإيجار اليومي" },
  { href: "/for-rent/long-term", label: "إيجار شهري وسنوي" },
  { href: "/areas", label: "المناطق" },
  { href: "/blog", label: "دليل العقارات" },
  { href: "/about", label: "من نحن" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-emerald/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-emerald/90">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label="مروج الشام العقارية - الرئيسية">
          <BrandLogo />
        </Link>

        <nav aria-label="القائمة الرئيسية" className="hidden xl:block">
          <ul className="flex items-center gap-5">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`whitespace-nowrap font-heading text-[15px] font-bold transition-colors hover:text-gold ${active ? "text-gold" : "text-white/90"}`}
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
            href={whatsappLink("مرحباً مروج الشام، أرغب بالاستفسار عن عقار في ريف دمشق")}
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
                <Link href={n.href} className="block border-b border-white/5 py-3 font-heading font-bold text-white hover:text-gold">
                  {n.label}
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
