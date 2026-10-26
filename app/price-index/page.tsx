import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { ArticleBody } from "@/components/ArticleBody";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { areas } from "@/data/areas";
import { pages } from "@/data/content";
import type { AreaPriceIndex, PriceRange } from "@/data/types";
import { formatDate, formatNumber } from "@/lib/format";
import { SITE, absoluteUrl } from "@/lib/site";

const pi = pages["price-index"];
const calc = pages.contracting.calculator;

export const metadata: Metadata = {
  title: { absolute: pi.seo.title },
  description: pi.seo.description,
  alternates: { canonical: "/price-index" },
};

const ROWS: { key: Exclude<keyof AreaPriceIndex, "trend">; label: string; unit: string }[] = [
  { key: "agriDunum", label: "الدونم الزراعي", unit: "$ / دونم" },
  { key: "plotM2", label: "متر المقسم المعد للبناء", unit: "$ / م²" },
  { key: "apartmentM2", label: "متر الشقة السكنية", unit: "$ / م²" },
  { key: "villaM2", label: "متر الفيلا المبنية", unit: "$ / م²" },
  { key: "finishingM2", label: "إكساء المتر المربع", unit: "$ / م²" },
  { key: "dailyRent", label: "إيجار المزرعة اليومي", unit: "$ / يوم" },
];

const TREND = {
  up: { label: "صاعد", icon: TrendingUp, cls: "text-meadow" },
  stable: { label: "مستقر", icon: Minus, cls: "text-muted" },
  down: { label: "هابط", icon: TrendingDown, cls: "text-red-700" },
} as const;

const indexed = areas.filter((a) => a.priceIndex);
const avg = (r: PriceRange) => Math.round((r.min + r.max) / 2);

/** Finishing cost per m² by level, taken from the calculator's apartment-finishing rates. */
const finishing = calc.projectTypes.find((t) => t.id === "apartment-finishing") ?? calc.projectTypes.find((t) => t.unit === "m2");

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: pi.title,
  description: pi.seo.description,
  url: absoluteUrl("/price-index"),
  dateModified: pi.updatedAt,
  inLanguage: "ar",
  creator: { "@id": absoluteUrl("/#organization") },
  publisher: { "@type": "Organization", name: SITE.name },
  spatialCoverage: indexed.map((a) => ({
    "@type": "Place",
    name: `${a.fullName}، ريف دمشق`,
    geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
  })),
  variableMeasured: ROWS.map((r) => `${r.label} (${r.unit})`),
};

export default function PriceIndexPage() {
  return (
    <>
      <JsonLd data={datasetSchema} />
      <PageHero
        title={pi.title}
        subtitle={pi.subtitle}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "مؤشر الأسعار", href: "/price-index" },
        ]}
      >
        <p className="inline-flex items-center gap-2 text-sm text-gold">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          آخر تحديث: <time dateTime={pi.updatedAt}>{formatDate(pi.updatedAt)}</time>
        </p>
      </PageHero>

      <div className="container space-y-14 py-10">
        <KeyTakeaways items={pi.keyTakeaways} />

        <section aria-labelledby="compare-title">
          <h2 id="compare-title" className="section-title mb-2">
            مقارنة متوسط الأسعار بين المناطق
          </h2>
          <p className="mb-5 text-sm text-muted">الرقم الكبير هو المتوسط، وتحته النطاق (من – إلى) بالدولار الأمريكي.</p>
          <div className="overflow-x-auto rounded-card shadow-soft">
            <table className="w-full min-w-[640px] border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-emerald text-white">
                  <th scope="col" className="px-4 py-3 text-right font-heading">
                    البند
                  </th>
                  {indexed.map((a) => (
                    <th key={a.slug} scope="col" className="px-4 py-3 text-center font-heading">
                      <Link href={`/areas/${a.slug}`} className="hover:text-gold">
                        {a.fullName}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.key} className="border-b border-black/5 last:border-0">
                    <th scope="row" className="bg-alabaster px-4 py-3 text-right font-heading font-bold text-emerald">
                      {r.label}
                      <span className="block text-xs font-normal text-muted">{r.unit}</span>
                    </th>
                    {indexed.map((a) => {
                      const v = a.priceIndex![r.key];
                      return (
                        <td key={a.slug} className="px-4 py-3 text-center">
                          <span className="block font-latin text-base font-bold text-emerald">{formatNumber(avg(v))}</span>
                          <span className="font-latin text-xs text-muted" dir="ltr">
                            {formatNumber(v.min)} – {formatNumber(v.max)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="bg-alabaster px-4 py-3 text-right font-heading font-bold text-emerald">
                    اتجاه السوق
                  </th>
                  {indexed.map((a) => {
                    const t = TREND[a.priceIndex!.trend];
                    return (
                      <td key={a.slug} className={`px-4 py-3 text-center font-bold ${t.cls}`}>
                        <span className="inline-flex items-center gap-1">
                          <t.icon className="h-4 w-4" aria-hidden="true" />
                          {t.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {finishing && (
          <section aria-labelledby="finishing-title" className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 id="finishing-title" className="section-title">
                تكلفة إكساء المتر المربع حسب مستوى التشطيب
              </h2>
              <p className="mt-3 text-charcoal/80">
                تكلفة تقريبية لإكساء الشقق والفلل من العظم إلى المفتاح (مواد ويد عاملة وإشراف)، متقاربة في الدرخبية ودروشا وخان الشيح وعرطوز. لتقدير مشروعك بالمساحة والمدة استخدم{" "}
                <Link href="/contracting#calculator" className="font-bold text-meadow underline decoration-gold underline-offset-4">
                  حاسبة التكلفة
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {calc.levels.map((l) => (
                <div key={l.id} className="rounded-card border border-gold/40 bg-white p-5 text-center shadow-soft">
                  <p className="font-heading font-bold text-emerald">{l.label}</p>
                  <p className="mt-2 font-latin text-2xl font-bold text-gold-hover" dir="ltr">
                    ${formatNumber(finishing.perUnit[l.id])}
                  </p>
                  <p className="text-xs text-muted">للمتر المربع تقريباً</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="card p-6 md:p-8" aria-labelledby="method-title">
          <h2 id="method-title" className="mb-3 text-xl font-extrabold">
            كيف نحسب المؤشر؟
          </h2>
          <ArticleBody html={pi.methodologyHtml} />
        </section>

        {pi.faqs.length > 0 && <FAQ items={pi.faqs} title="أسئلة شائعة عن أسعار العقارات في ريف دمشق" />}
      </div>
    </>
  );
}
