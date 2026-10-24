import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Droplets, FileCheck2, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { ListingTabs } from "@/components/ListingTabs";
import { PropertyGrid } from "@/components/PropertyCard";
import { FAQ } from "@/components/FAQ";
import { areas, getArea } from "@/data/areas";
import { filterProperties } from "@/data/properties";
import { intersectionTitle, typeSlugs } from "@/data/taxonomy";
import type { PropertyType } from "@/data/types";

type Params = { params: Promise<{ areaSlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ areaSlug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const area = getArea((await params).areaSlug);
  if (!area) return {};
  return {
    title: `عقارات ومزارع ${area.fullName} - بيع وشراء وإيجار`,
    description: `دليل عقارات ${area.fullName} في ريف دمشق: مزارع وفلل وشقق وأراضٍ للبيع والإيجار، مؤشرات الأسعار، المياه، وأنواع الطابو. ${area.tagline}.`,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { images: [area.image] },
  };
}

export default async function AreaPage({ params }: Params) {
  const area = getArea((await params).areaSlug);
  if (!area) notFound();

  const sale = filterProperties({ area: area.slug, transaction: "sale" });
  const rent = filterProperties({ area: area.slug, transactions: ["daily-rent", "long-term-rent"] });
  const types = Object.keys(typeSlugs) as PropertyType[];

  return (
    <>
      <PageHero
        title={`عقارات ومزارع ${area.fullName} — بيع وشراء وإيجار`}
        subtitle={area.tagline}
        image={area.image}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "المناطق", href: "/areas" },
          { name: `عقارات ${area.fullName}`, href: `/areas/${area.slug}` },
        ]}
      >
        <ul className="flex flex-wrap gap-4 text-sm text-white/90">
          <li className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
            {area.distance}
          </li>
          <li className="flex items-center gap-1.5">
            <Droplets className="h-4 w-4 text-gold" aria-hidden="true" />
            {area.water}
          </li>
          <li className="flex items-center gap-1.5">
            <FileCheck2 className="h-4 w-4 text-gold" aria-hidden="true" />
            {area.commonDeeds}
          </li>
        </ul>
      </PageHero>

      <div className="container space-y-14 py-10">
        <KeyTakeaways items={area.keyTakeaways} />

        <section aria-labelledby="listings-title">
          <h2 id="listings-title" className="section-title mb-5">
            العقارات المتاحة في {area.fullName}
          </h2>
          <ListingTabs
            tabs={[
              { id: "sale", label: "للبيع", count: sale.length, panel: <PropertyGrid items={sale} /> },
              { id: "rent", label: "للإيجار", count: rent.length, panel: <PropertyGrid items={rent} /> },
            ]}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="section-title mb-4">نظرة عامة على {area.fullName}</h2>
            <div className="prose-ms">
              {area.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-5">
            <div className="card p-5">
              <h2 className="mb-3 text-lg font-extrabold">ما هي أسعار العقارات في {area.fullName}؟</h2>
              <ul className="divide-y divide-black/5">
                {area.priceGuide.map((g) => (
                  <li key={g.label} className="py-2.5 text-sm">
                    <span className="block text-muted">{g.label}</span>
                    <span className="font-bold text-emerald">{g.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted">مؤشرات تقريبية تتغير حسب السوق.</p>
            </div>
            <div className="card p-5">
              <h2 className="mb-3 text-lg font-extrabold">تصفح حسب النوع</h2>
              <ul className="space-y-2 text-sm font-bold">
                {types.map((t) => (
                  <li key={t}>
                    <Link href={`/for-sale/${typeSlugs[t]}/${area.slug}`} className="text-meadow hover:text-emerald">
                      {intersectionTitle(t, area.fullName)} ←
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/for-rent/daily-farms/${area.slug}`} className="text-meadow hover:text-emerald">
                    مزارع للإيجار اليومي في {area.fullName} ←
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        <FAQ items={area.faqs} title={`أسئلة شائعة عن عقارات ${area.fullName}`} />
      </div>
    </>
  );
}
