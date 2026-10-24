import type { Article } from "./types";
import generated from "./generated/articles.json";

/**
 * Articles are edited in /admin (files in content/articles/). The markdown
 * body is compiled to HTML by scripts/build-content.mjs.
 */
export const articles = (generated as unknown as Article[]).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
