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
  order: number;
  /** Appended to geo-intersection H1s, e.g. "طابو أخضر ومياه وفيرة" */
  intersectionHook?: string;
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
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  readMinutes: number;
  category: string;
  keyTakeaways: string[];
  /** HTML compiled from the markdown written in /admin */
  body: string;
  faqs: FAQ[];
  seoTitle?: string;
  seoDescription?: string;
}

/* ---------- editable site content (content/settings, content/pages) ---------- */

export interface Seo {
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  nameEn: string;
  shortName: string;
  defaultTitle: string;
  description: string;
  whatsapp: string;
  email: string;
  addressRegion: string;
  whatsappGreeting: string;
  propertyTrustNote: string;
  soldBanner: string;
  footerAbout: string;
  ogImage: string;
}

export interface Navigation {
  header: NavLink[];
  footerLinks: NavLink[];
}

export interface ListingPageContent {
  h1: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  image?: string;
  faqs?: FAQ[];
}

export interface CategoryLabels {
  single: string;
  plural: string;
  saleTitle: string;
  saleDescription: string;
}

export type TrustIcon = "map-pin" | "file-search" | "hand-coins" | "globe" | "shield" | "camera" | "handshake" | "star";

export interface PagesContent {
  home: {
    seo: Seo;
    hero: { badge: string; title: string; titleHighlight: string; subtitle: string; image: string; imageAlt: string };
    areasSection: { title: string; subtitle: string };
    saleSection: { title: string };
    dailySection: { eyebrow: string; title: string; text: string; button: string };
    trust: { title: string; subtitle: string; items: { icon: TrustIcon; title: string; text: string }[] };
    blogSection: { title: string };
    faqTitle: string;
    faqs: FAQ[];
    cta: { title: string; text: string; primaryLabel: string; secondaryLabel: string };
  };
  about: {
    seo: Seo;
    title: string;
    subtitle: string;
    bodyHtml: string;
    workflowTitle: string;
    workflow: { title: string; text: string }[];
    faqs: FAQ[];
  };
  "submit-property": {
    seo: Seo;
    title: string;
    subtitle: string;
    steps: { title: string; text: string }[];
    submitLabel: string;
    formNote: string;
  };
  "request-property": {
    seo: Seo;
    title: string;
    subtitle: string;
    introHtml: string;
    submitLabel: string;
    formNote: string;
  };
  listings: Record<"forSale" | "forRent" | "dailyFarms" | "longTerm" | "areasIndex" | "blogIndex", ListingPageContent>;
  categories: Record<PropertyType, CategoryLabels>;
}

export interface CustomPage {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  /** HTML compiled from markdown */
  body: string;
}
