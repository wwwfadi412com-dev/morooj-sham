import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PropertyGrid } from "@/components/PropertyCard";
import { SearchFilter } from "@/components/SearchFilter";
import { getArea } from "@/data/areas";
import { properties, filterProperties } from "@/data/properties";
import type { PropertyType, Transaction } from "@/data/types";

export const metadata: Metadata = {
  title: "نتائج البحث عن عقارات في ريف دمشق",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

type SP = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const TYPES: PropertyType[] = ["farm", "villa", "apartment", "land"];
const DEALS: Transaction[] = ["sale", "daily-rent", "long-term-rent"];

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function SearchPage({ searchParams }: SP) {
  const sp = await searchParams;
  const area = getArea(str(sp.area))?.slug;
  const type = TYPES.find((t) => t === str(sp.type));
  const deal = DEALS.find((d) => d === str(sp.deal));
  const q = str(sp.q).trim();

  let items = filterProperties({ area, type, transaction: deal });
  if (q) {
    const needle = q.toLowerCase();
    items = properties.filter((p) => [p.title, p.code, p.locationNote, ...p.amenities].some((s) => s.toLowerCase().includes(needle)));
  }

  return (
    <>
      <PageHero
        title="ابحث عن عقارك في ريف دمشق"
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "البحث", href: "/search" },
        ]}
      >
        <SearchFilter defaults={{ area, type, deal }} />
      </PageHero>
      <div className="container py-10">
        <p className="mb-5 text-sm text-muted">
          {q && <>نتائج البحث عن «{q}»: </>}
          <span className="font-latin font-bold text-emerald">{items.length}</span> عقار
        </p>
        <PropertyGrid items={items} />
      </div>
    </>
  );
}
