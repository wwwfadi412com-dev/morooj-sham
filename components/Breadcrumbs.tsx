import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JsonLd, breadcrumbSchema, type Crumb } from "./JsonLd";

/** Visible breadcrumb trail + BreadcrumbList schema. First crumb should be الرئيسية. */
export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const base = light ? "text-white/70" : "text-muted";
  const current = light ? "text-gold" : "text-emerald";
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="مسار التنقل" className={`text-sm ${base}`}>
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className={`font-bold ${current}`}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-gold">
                      {c.name}
                    </Link>
                    <ChevronLeft className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
