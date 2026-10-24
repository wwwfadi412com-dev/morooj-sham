import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { areas } from "@/data/areas";
import { typeLabels, typeSlugs } from "@/data/taxonomy";
import type { PropertyType } from "@/data/types";
import { SITE, displayPhone, whatsappLink } from "@/lib/site";

export function Footer() {
  const types = Object.keys(typeSlugs) as PropertyType[];
  return (
    <footer className="mt-20 bg-emerald pb-24 text-white/80 md:pb-0">
      <div className="h-1 bg-gradient-to-l from-gold via-gold/40 to-gold" />
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo />
          <p className="mt-5 text-sm leading-7">
            منصة عقارية متخصصة في ريف دمشق الغربي. نعاين كل عقار على الأرض، ونفحص الطابو والأوراق، ونرافقك حتى نقل الملكية — داخل سوريا أو من بلد الاغتراب.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-lg font-bold text-gold">عقارات للبيع</h2>
          <ul className="space-y-2 text-sm">
            {types.map((t) => (
              <li key={t}>
                <Link href={`/for-sale/${typeSlugs[t]}`} className="hover:text-gold">
                  {typeLabels[t].saleTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/for-rent/daily-farms" className="hover:text-gold">
                مزارع للإيجار اليومي مع مسبح
              </Link>
            </li>
            <li>
              <Link href="/for-rent/long-term" className="hover:text-gold">
                فلل وشقق للإيجار الشهري والسنوي
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-lg font-bold text-gold">مناطق ريف دمشق</h2>
          <ul className="space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-gold">
                  عقارات {a.fullName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="hover:text-gold">
                دليل العقارات والاستثمار
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-lg font-bold text-gold">تواصل معنا</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink("مرحباً مروج الشام، أرغب بالاستفسار عن عقار")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold"
              >
                <WhatsAppIcon className="h-4 w-4 text-gold" />
                <span dir="ltr" className="font-latin">
                  {displayPhone()}
                </span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="font-latin hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              ريف دمشق، سوريا
            </li>
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <Link href="/submit-property" className="btn-gold">
              أضف عقارك للتسويق
            </Link>
            <Link href="/request-property" className="btn-outline !text-white">
              اطلب عقارك بمواصفات خاصة
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.</p>
          <p className="font-latin" dir="ltr">
            {SITE.nameEn}
          </p>
        </div>
      </div>
    </footer>
  );
}
