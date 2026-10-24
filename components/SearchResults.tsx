"use client";

import { useSearchParams } from "next/navigation";
import { PropertyGrid } from "./PropertyCard";
import { SearchFilter } from "./SearchFilter";
import { getArea } from "@/data/areas";
import { filterProperties, properties } from "@/data/properties";
import type { PropertyType, Transaction } from "@/data/types";

const TYPES: PropertyType[] = ["farm", "villa", "apartment", "land"];
const DEALS: Transaction[] = ["sale", "daily-rent", "long-term-rent"];

export function SearchResults() {
  const sp = useSearchParams();
  const area = getArea(sp.get("area") ?? "")?.slug;
  const type = TYPES.find((t) => t === sp.get("type"));
  const deal = DEALS.find((d) => d === sp.get("deal"));
  const q = (sp.get("q") ?? "").trim();

  let items = filterProperties({ area, type, transaction: deal });
  if (q) {
    const needle = q.toLowerCase();
    items = properties.filter((p) => [p.title, p.code, p.locationNote, ...p.amenities].some((s) => s.toLowerCase().includes(needle)));
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        {/* key forces the uncontrolled selects to pick up new defaults after navigation */}
        <SearchFilter key={sp.toString()} defaults={{ area, type, deal }} compact />
      </div>
      <p className="mb-5 text-sm text-muted">
        {q && <>نتائج البحث عن «{q}»: </>}
        <span className="font-latin font-bold text-emerald">{items.length}</span> عقار
      </p>
      <PropertyGrid items={items} />
    </div>
  );
}
