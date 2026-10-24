/**
 * Shared data types. The shape mirrors what a future CMS / database table
 * would hold, so swapping the static seed files for an API is a drop-in change.
 */

export type PropertyType = "farm" | "villa" | "apartment" | "land";
export type Transaction = "sale" | "daily-rent" | "long-term-rent";
export type PropertyStatus = "available" | "sold" | "rented";
export type DeedType = "green-tabu" | "agricultural-tabu" | "court-ruling" | "notary";

export interface FAQ {
  q: string;
  a: string;
}

export interface Area {
  slug: string;
  name: string;
  /** Long display name, e.g. "عرطوز وجديدة عرطوز" */
  fullName: string;
  codePrefix: string;
  distance: string;
  geo: { lat: number; lng: number };
  image: string;
  tagline: string;
  highlights: string[];
  keyTakeaways: string[];
  /** ~200 word authoritative overview, one string per paragraph */
  overview: string[];
  water: string;
  commonDeeds: string;
  priceGuide: { label: string; value: string }[];
  faqs: FAQ[];
}

export interface Property {
  slug: string;
  code: string;
  title: string;
  type: PropertyType;
  transaction: Transaction;
  area: string;
  status: PropertyStatus;
  featured?: boolean;
  /** USD. For rentals: per day (daily-rent) or per month (long-term-rent). */
  price: number;
  landArea?: number;
  builtArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  deed: DeedType;
  deedDetail: string;
  locationNote: string;
  water: string;
  electricity: string;
  amenities: string[];
  description: string[];
  images: string[];
  /** Max guests, only for daily rentals */
  capacity?: number;
  publishedAt: string;
}

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  readMinutes: number;
  category: string;
  keyTakeaways: string[];
  body: ArticleBlock[];
  faqs: FAQ[];
}
