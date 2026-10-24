/**
 * Global site configuration. Values that change between environments
 * (domain, WhatsApp number) come from env vars so moving from the free
 * GitHub Pages URL to moroojsham.com is a config change, not a code change.
 */
export const SITE = {
  name: "مروج الشام العقارية",
  nameEn: "Morooj Sham Real Estate",
  shortName: "مروج الشام",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wwwfadi412com-dev.github.io/morooj-sham").replace(/\/$/, ""),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "963991111474",
  email: "info@moroojsham.com",
  description:
    "منصة عقارية متخصصة في ريف دمشق: مزارع وفلل وشقق وأراضي للبيع، ومزارع للإيجار اليومي مع مسبح في الدرخبية ودروشا وخان الشيح وعرطوز. معاينة مجانية وفحص قانوني للطابو وخدمة خاصة للمغتربين.",
  locale: "ar_SY",
  defaultTitle: "مروج الشام العقارية | مزارع وفلل وشقق وأراضي للبيع والإيجار في ريف دمشق",
} as const;

/** Prefix for raw (non next/link) URLs such as plain <form action>. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Absolute URL with a trailing slash on pages (matches trailingSlash: true), none on files. */
export function absoluteUrl(path = "/"): string {
  let p = path.startsWith("/") ? path : `/${path}`;
  const [pathname, hash = ""] = p.split("#");
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  p = !isFile && !pathname.endsWith("/") ? `${pathname}/` : pathname;
  return `${SITE.url}${p}${hash ? `#${hash}` : ""}`;
}

/** Pretty-print the WhatsApp number for display, e.g. +963 900 000 000 */
export function displayPhone(): string {
  const n = SITE.whatsapp;
  return `+${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}`.trim();
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
