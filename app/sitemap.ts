import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { articles } from "@/data/articles";
import { properties } from "@/data/properties";
import { typeSlugs } from "@/data/taxonomy";
import { customPages } from "@/data/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly", lastModified: Date = now) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "daily"),
    entry("/for-sale", 0.9, "daily"),
    ...Object.values(typeSlugs).map((t) => entry(`/for-sale/${t}`, 0.85, "daily")),
    entry("/for-rent", 0.85, "daily"),
    entry("/for-rent/daily-farms", 0.85, "daily"),
    entry("/for-rent/long-term", 0.75),
    entry("/areas", 0.8),
    ...areas.map((a) => entry(`/areas/${a.slug}`, 0.85)),
    ...Object.values(typeSlugs).flatMap((t) => areas.map((a) => entry(`/for-sale/${t}/${a.slug}`, 0.75))),
    ...areas.map((a) => entry(`/for-rent/daily-farms/${a.slug}`, 0.7)),
    ...properties.map((p) => entry(`/property/${p.slug}`, p.status === "available" ? 0.8 : 0.5, "weekly", new Date(p.publishedAt))),
    entry("/blog", 0.7),
    ...articles.map((a) => entry(`/blog/${a.slug}`, 0.7, "monthly", new Date(a.publishedAt))),
    entry("/submit-property", 0.6, "monthly"),
    entry("/request-property", 0.6, "monthly"),
    entry("/about", 0.5, "monthly"),
    ...customPages.map((p) => entry(`/page/${p.slug}`, 0.3, "yearly")),
  ];
}
