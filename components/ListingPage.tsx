import Link from "next/link";
import type { ReactNode } from "react";
import type { Property } from "@/data/types";
import { PageHero } from "./PageHero";
import { PropertyGrid } from "./PropertyCard";
import type { Crumb } from "./JsonLd";

export interface Chip {
  href: string;
  label: string;
  active?: boolean;
}

interface Props {
  title: string;
  subtitle: string;
  crumbs: Crumb[];
  image?: string;
  chips?: Chip[];
  items: Property[];
  /** Rendered below the grid (intro copy, FAQ, cross-links) */
  children?: ReactNode;
}

/** Shared layout for hub, category and geo-intersection pages. */
export function ListingPage({ title, subtitle, crumbs, image, chips, items, children }: Props) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} crumbs={crumbs} image={image}>
        {chips && chips.length > 0 && (
          <nav aria-label="تصفية" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {chips.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                aria-current={c.active ? "page" : undefined}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition ${
                  c.active ? "border-gold bg-gold text-emerald" : "border-white/30 text-white hover:border-gold hover:text-gold"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </nav>
        )}
      </PageHero>
      <div className="container py-10">
        <p className="mb-5 text-sm text-muted">
          <span className="font-latin font-bold text-emerald">{items.length}</span> عقار
        </p>
        <PropertyGrid items={items} />
        {children && <div className="mt-16 space-y-14">{children}</div>}
      </div>
    </>
  );
}
