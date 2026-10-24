import type { Property, PropertyType, Transaction } from "./types";
import generated from "./generated/properties.json";

/**
 * Listings are edited in /admin (files in content/properties/) and compiled
 * and validated into ./generated/properties.json by scripts/build-content.mjs.
 * Codes follow the area prefix convention:
 * D- الدرخبية · DR- دروشا · KH- خان الشيح · AR- عرطوز
 * Never store partner office names or owner phone numbers in listings.
 */
export const properties = generated as unknown as Property[];

/* ---------- query helpers ---------- */

const byNewest = (a: Property, b: Property) => b.publishedAt.localeCompare(a.publishedAt);
/** Available listings first, then newest */
const byRelevance = (a: Property, b: Property) =>
  Number(a.status !== "available") - Number(b.status !== "available") || byNewest(a, b);

export interface PropertyFilter {
  area?: string;
  type?: PropertyType;
  transaction?: Transaction;
  transactions?: Transaction[];
}

export function filterProperties(f: PropertyFilter = {}): Property[] {
  return properties
    .filter((p) => !f.area || p.area === f.area)
    .filter((p) => !f.type || p.type === f.type)
    .filter((p) => !f.transaction || p.transaction === f.transaction)
    .filter((p) => !f.transactions || f.transactions.includes(p.transaction))
    .sort(byRelevance);
}

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

/** Same area first (same transaction preferred), then same type elsewhere. Only available. */
export function similarProperties(p: Property, limit = 3): Property[] {
  const pool = properties.filter((x) => x.slug !== p.slug && x.status === "available");
  const score = (x: Property) =>
    (x.area === p.area ? 4 : 0) + (x.transaction === p.transaction ? 2 : 0) + (x.type === p.type ? 1 : 0);
  return pool.sort((a, b) => score(b) - score(a) || byNewest(a, b)).slice(0, limit);
}

export function countByArea(areaSlug: string): number {
  return properties.filter((p) => p.area === areaSlug && p.status === "available").length;
}
