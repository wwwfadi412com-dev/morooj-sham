import { settings } from "@/data/content";

/**
 * Global site configuration. Names, contact details and default SEO text are
 * edited in /admin (content/settings/site.json); the site URL comes from an env
 * var so moving from GitHub Pages to moroojsham.com is a deploy setting.
 */
export const SITE = {
  ...settings,
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wwwfadi412com-dev.github.io/morooj-sham").replace(/\/$/, ""),
  locale: "ar_SY",
};

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

/**
 * Images uploaded from /admin are stored as "/uploads/x.jpg". next/image does
 * not add basePath to those when unoptimized, so prefix them here.
 */
export function assetSrc(src: string): string {
  return src.startsWith("/") ? `${BASE_PATH}${src}` : src;
}

/** Absolute URL for an image (for JSON-LD), local or remote. */
export function absoluteAsset(src: string): string {
  return src.startsWith("/") ? `${SITE.url}${src}` : src;
}
