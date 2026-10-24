/**
 * Global site configuration. Values that change between environments
 * (domain, WhatsApp number) come from env vars so moving from the free
 * Vercel subdomain to moroojsham.com is a config change, not a code change.
 */
export const SITE = {
  name: "مروج الشام العقارية",
  nameEn: "Morooj Sham Real Estate",
  shortName: "مروج الشام",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://moroojsham.vercel.app").replace(/\/$/, ""),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "963900000000",
  email: "info@moroojsham.com",
  description:
    "منصة عقارية متخصصة في ريف دمشق: مزارع وفلل وشقق وأراضي للبيع، ومزارع للإيجار اليومي مع مسبح في الدرخبية ودروشا وخان الشيح وعرطوز. معاينة مجانية وفحص قانوني للطابو وخدمة خاصة للمغتربين.",
  locale: "ar_SY",
  defaultTitle: "مروج الشام العقارية | مزارع وفلل وشقق وأراضي للبيع والإيجار في ريف دمشق",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Pretty-print the WhatsApp number for display, e.g. +963 900 000 000 */
export function displayPhone(): string {
  const n = SITE.whatsapp;
  return `+${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}`.trim();
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
