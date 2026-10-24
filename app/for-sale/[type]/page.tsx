import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ListingPage";
import { areas } from "@/data/areas";
import { filterProperties } from "@/data/properties";
import { intersectionTitle, typeFromSlug, typeLabels, typeSlugs } from "@/data/taxonomy";
import type { PropertyType } from "@/data/types";

type Params = { params: Promise<{ type: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(typeSlugs).map((type) => ({ type }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = typeFromSlug((await params).type);
  if (!t) return {};
  return {
    title: typeLabels[t].saleTitle,
    description: typeLabels[t].saleDescription,
    alternates: { canonical: `/for-sale/${typeSlugs[t]}` },
  };
}

export default async function TypePage({ params }: Params) {
  const slug = (await params).type;
  const t = typeFromSlug(slug);
  if (!t) notFound();
  const types = Object.keys(typeSlugs) as PropertyType[];

  return (
    <ListingPage
      title={typeLabels[t].saleTitle}
      subtitle={typeLabels[t].saleDescription}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: "عقارات للبيع", href: "/for-sale" },
        { name: typeLabels[t].saleTitle, href: `/for-sale/${slug}` },
      ]}
      chips={[
        { href: "/for-sale", label: "الكل" },
        ...types.map((x) => ({ href: `/for-sale/${typeSlugs[x]}`, label: typeLabels[x].plural, active: x === t })),
      ]}
      items={filterProperties({ transaction: "sale", type: t })}
    >
      <section>
        <h2 className="section-title mb-5">{typeLabels[t].plural} للبيع حسب المنطقة</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <Link key={a.slug} href={`/for-sale/${slug}/${a.slug}`} className="card p-4 font-bold text-emerald hover:text-meadow">
              {intersectionTitle(t, a.fullName)} ←
            </Link>
          ))}
        </div>
      </section>
    </ListingPage>
  );
}
