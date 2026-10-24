import type { DeedType, PropertyStatus, PropertyType, Transaction } from "./types";

/** URL segment under /for-sale/[type] for each property type */
export const typeSlugs: Record<PropertyType, string> = {
  farm: "farms",
  villa: "villas",
  apartment: "apartments",
  land: "lands",
};

export const typeFromSlug = (slug: string): PropertyType | undefined =>
  (Object.entries(typeSlugs) as [PropertyType, string][]).find(([, s]) => s === slug)?.[0];

export const typeLabels: Record<PropertyType, { single: string; plural: string; saleTitle: string; saleDescription: string }> = {
  farm: {
    single: "مزرعة",
    plural: "مزارع",
    saleTitle: "مزارع للبيع في ريف دمشق",
    saleDescription: "مزارع مبنية مع مسابح وآبار وأشجار مثمرة بطابو أخضر وزراعي في الدرخبية ودروشا وخان الشيح.",
  },
  villa: {
    single: "فيلا",
    plural: "فلل ومنازل مستقلة",
    saleTitle: "فلل ومنازل مستقلة للبيع",
    saleDescription: "فلل ريفية ومنازل مستقلة بحدائق خاصة وإكساء فاخر في أفضل بلدات ريف دمشق الغربي.",
  },
  apartment: {
    single: "شقة سكنية",
    plural: "شقق سكنية",
    saleTitle: "شقق سكنية للبيع",
    saleDescription: "شقق سكنية جاهزة بأسعار أقل من دمشق في عرطوز وجديدة عرطوز ودروشا، بملكيات واضحة.",
  },
  land: {
    single: "أرض",
    plural: "أراضٍ ومقاسم",
    saleTitle: "أراضٍ زراعية ومقاسم معدة للبناء للبيع",
    saleDescription: "أراضٍ زراعية ومقاسم معدة للبناء بمساحات متنوعة وأوراق مدققة في ريف دمشق.",
  },
};

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
