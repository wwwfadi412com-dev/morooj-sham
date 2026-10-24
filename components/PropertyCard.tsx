import Link from "next/link";
import { BedDouble, Maximize2, MapPin, Users } from "lucide-react";
import type { Property } from "@/data/types";
import { getArea } from "@/data/areas";
import { deedLabels, transactionLabels, typeLabels } from "@/data/taxonomy";
import { formatNumber, formatPrice } from "@/lib/format";
import { WatermarkedImage } from "./WatermarkedImage";

export function PropertyCard({ p, priority = false }: { p: Property; priority?: boolean }) {
  const area = getArea(p.area);
  const sold = p.status === "sold";
  const size = p.type === "apartment" ? p.builtArea : p.landArea;
  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
      <Link href={`/property/${p.slug}`} className="relative block" tabIndex={-1} aria-hidden="true">
        <WatermarkedImage
          src={p.images[0]}
          alt={`${p.title} - كود ${p.code}`}
          code={p.code}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className={`aspect-[4/3] transition duration-500 group-hover:scale-[1.03] ${sold ? "grayscale" : ""}`}
        />
        <span className="code-badge absolute right-3 top-3 shadow">{p.code}</span>
        <span
          className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold text-white shadow ${
            sold ? "bg-red-700" : p.transaction === "sale" ? "bg-meadow" : "bg-emerald"
          }`}
        >
          {sold ? "تم البيع" : transactionLabels[p.transaction]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          {area?.fullName} · {typeLabels[p.type].single}
        </p>
        <h3 className="mb-3 line-clamp-2 text-base font-bold leading-7">
          <Link href={`/property/${p.slug}`} className="hover:text-meadow">
            {p.title}
          </Link>
        </h3>

        <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          {size && (
            <li className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-latin">{formatNumber(size)}</span> م²
            </li>
          )}
          {p.bedrooms && (
            <li className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-latin">{p.bedrooms}</span> غرف
            </li>
          )}
          {p.capacity && (
            <li className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              حتى <span className="font-latin">{p.capacity}</span> شخص
            </li>
          )}
          <li className="rounded bg-emerald/5 px-1.5 font-bold text-emerald">{deedLabels[p.deed]}</li>
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-3">
          <p className={`font-latin text-lg font-bold ${sold ? "text-muted line-through" : "text-emerald"}`} dir="ltr">
            {formatPrice(p)}
          </p>
          <Link href={`/property/${p.slug}`} className="text-sm font-bold text-meadow hover:text-emerald">
            التفاصيل ←
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PropertyGrid({ items, empty }: { items: Property[]; empty?: string }) {
  if (!items.length) {
    return (
      <div className="card p-10 text-center">
        <p className="mb-4 text-muted">{empty ?? "لا توجد عقارات متاحة حالياً بهذه المواصفات."}</p>
        <Link href="/request-property" className="btn-gold">
          اطلب عقاراً بمواصفاتك وسنبحث لك عنه
        </Link>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <PropertyCard key={p.slug} p={p} priority={i < 2} />
      ))}
    </div>
  );
}
