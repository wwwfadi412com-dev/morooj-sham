import type { CustomPage, Navigation, PagesContent, SiteSettings } from "./types";
import siteJson from "./generated/site.json";
import navigationJson from "./generated/navigation.json";
import pagesJson from "./generated/pages.json";
import customPagesJson from "./generated/custom-pages.json";

/**
 * Site-wide editable content, managed in /admin (content/settings, content/pages,
 * content/custom-pages) and compiled by scripts/build-content.mjs.
 */
export const settings = siteJson as unknown as SiteSettings;
export const navigation = navigationJson as unknown as Navigation;
export const pages = pagesJson as unknown as PagesContent;
export const customPages = customPagesJson as unknown as CustomPage[];

export function getCustomPage(slug: string): CustomPage | undefined {
  return customPages.find((p) => p.slug === slug);
}
