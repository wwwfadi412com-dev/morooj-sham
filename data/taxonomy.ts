import type { CategoryLabels, DeedType, PropertyStatus, PropertyType, Transaction } from "./types";
import { pages } from "./content";

/** URL segment under /for-sale/[type] for each property type */
export const typeSlugs: Record<PropertyType, string> = {
  farm: "farms",
  villa: "villas",
  apartment: "apartments",
  land: "lands",
};

export const typeFromSlug = (slug: string): PropertyType | undefined =>
  (Object.entries(typeSlugs) as [PropertyType, string][]).find(([, s]) => s === slug)?.[0];

export const typeLabels: Record<PropertyType, CategoryLabels> = pages.categories;

/** Title used for geo-intersection pages, e.g. "مزارع للبيع في الدرخبية" */
export const intersectionTitle = (type: PropertyType, areaName: string) => {
  switch (type) {
    case "farm":
      return `مزارع للبيع في ${areaName}`;
    case "villa":
      return `فلل ومنازل مستقلة للبيع في ${areaName}`;
    case "apartment":
      return `شقق سكنية للبيع في ${areaName}`;
    case "land":
      return `أراضٍ ومقاسم للبيع في ${areaName}`;
  }
};

export const transactionLabels: Record<Transaction, string> = {
  sale: "للبيع",
  "daily-rent": "للإيجار اليومي",
  "long-term-rent": "للإيجار الشهري",
};

export const deedLabels: Record<DeedType, string> = {
  "green-tabu": "طابو أخضر",
  "agricultural-tabu": "طابو زراعي",
  "court-ruling": "حكم محكمة",
  notary: "كاتب عدل",
};

export const statusLabels: Record<PropertyStatus, string> = {
  available: "متاح",
  sold: "تم البيع",
  rented: "مؤجر حالياً",
};
