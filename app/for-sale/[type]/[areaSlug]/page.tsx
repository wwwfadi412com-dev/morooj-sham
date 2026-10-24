import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ListingPage";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { areas, getArea } from "@/data/areas";
import { filterProperties } from "@/data/properties";
import { intersectionTitle, typeFromSlug, typeLabels, typeSlugs } from "@/data/taxonomy";

type Params = { params: Promise<{ type: string; areaSlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(typeSlugs).flatMap((type) => areas.map((a) => ({ type, areaSlug: a.slug })));
}

const withHook = (title: string, hook?: string) => (hook ? `${title} (${hook})` : title);

async function resolve(params: Params["params"]) {
  const { type, areaSlug } = await params;
  const t = typeFromSlug(type);
  const area = getArea(areaSlug);
  return t && area ? { t, area } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const title = intersectionTitle(r.t, r.area.fullName);
  return {
    title: withHook(title, r.area.intersectionHook),
    description: `${title}: عقارات مُعاينة بأوراق مدققة، أسعار محدثة، ومعاينة مجانية مع مروج الشام. ${r.area.tagline}.`,
    alternates: { canonical: `/for-sale/${typeSlugs[r.t]}/${r.area.slug}` },
  };
}

export default async function IntersectionPage({ params }: Params) {
  const r = await resolve(params);
  if (!r) notFound();
  const { t, area } = r;
  const title = intersectionTitle(t, area.fullName);

  return (
    <ListingPage
      title={withHook(title, area.intersectionHook)}
      subtitle={`${area.tagline} — ${area.distance}.`}
      image={area.image}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: `عقارات ${area.fullName}`, href: `/areas/${area.slug}` },
        { name: title, href: `/for-sale/${typeSlugs[t]}/${area.slug}` },
      ]}
      chips={areas.map((a) => ({ href: `/for-sale/${typeSlugs[t]}/${a.slug}`, label: a.fullName, active: a.slug === area.slug }))}
      items={filterProperties({ transaction: "sale", type: t, area: area.slug })}
    >
      <KeyTakeaways items={area.keyTakeaways} />
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-3 text-xl font-extrabold">مؤشرات الأسعار في {area.fullName}</h2>
          <ul className="divide-y divide-black/5">
            {area.priceGuide.map((g) => (
              <li key={g.label} className="flex justify-between gap-4 py-2.5 text-sm">
                <span>{g.label}</span>
                <span className="font-bold text-emerald">{g.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">أسعار تقريبية للاسترشاد وتتغير حسب السوق والمواصفات.</p>
        </div>
        <div className="card p-6">
          <h2 className="mb-3 text-xl font-extrabold">روابط ذات صلة</h2>
          <ul className="space-y-2 text-sm font-bold">
            <li>
              <Link href={`/areas/${area.slug}`} className="text-meadow hover:text-emerald">
                دليل عقارات {area.fullName} الشامل ←
              </Link>
            </li>
            <li>
              <Link href={`/for-sale/${typeSlugs[t]}`} className="text-meadow hover:text-emerald">
                {typeLabels[t].saleTitle} ←
              </Link>
            </li>
            <li>
              <Link href={`/for-rent/daily-farms/${area.slug}`} className="text-meadow hover:text-emerald">
                مزارع للإيجار اليومي في {area.fullName} ←
              </Link>
            </li>
            <li>
              <Link href="/request-property" className="text-meadow hover:text-emerald">
                اطلب {typeLabels[t].single} بمواصفات خاصة في {area.fullName} ←
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ListingPage>
  );
}
