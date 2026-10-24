import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, BedDouble, Bath, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gallery } from "@/components/Gallery";
import { PropertyGrid } from "@/components/PropertyCard";
import { JsonLd, listingSchema } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getArea } from "@/data/areas";
import { getProperty, properties, similarProperties } from "@/data/properties";
import { deedLabels, transactionLabels, typeLabels, typeSlugs } from "@/data/taxonomy";
import { formatArea, formatPrice, propertyWhatsappMessage } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProperty((await params).slug);
  if (!p) return {};
  const sold = p.status === "sold" ? "تم البيع - " : "";
  return {
    title: `${sold}${p.title} - كود ${p.code}`,
    description: `${p.description[0].slice(0, 150)}… السعر ${formatPrice(p)}. ${p.deedDetail}.`,
    alternates: { canonical: `/property/${p.slug}` },
    openGraph: { images: [p.images[0]], type: "article" },
  };
}

export default async function PropertyPage({ params }: Params) {
  const p = getProperty((await params).slug);
  if (!p) notFound();
  const area = getArea(p.area)!;
  const sold = p.status === "sold";
  const similar = similarProperties(p, 3);
  const wa = whatsappLink(propertyWhatsappMessage(p));

  // Breadcrumb: الرئيسية > عقارات المنطقة > نوع/عملية > العقار
  const categoryCrumb =
    p.transaction === "sale"
      ? { name: `${typeLabels[p.type].plural} للبيع`, href: `/for-sale/${typeSlugs[p.type]}/${area.slug}` }
      : p.transaction === "daily-rent"
        ? { name: "مزارع للإيجار اليومي", href: `/for-rent/daily-farms/${area.slug}` }
        : { name: "إيجار شهري وسنوي", href: "/for-rent/long-term" };

  const specs: [string, string][] = [
    ["كود العقار المرجعي", p.code],
    ["المنطقة والبلدة", p.locationNote],
    ...(p.landArea ? [["المساحة الإجمالية", formatArea(p.landArea)] as [string, string]] : []),
    ...(p.builtArea ? [["مساحة البناء", `${p.builtArea} م²`] as [string, string]] : []),
    ["نوع الملكية والفراغ", p.deedDetail],
    ["مصادر المياه", p.water],
    ["الكهرباء والطاقة", p.electricity],
    ["المرافق", p.amenities.join("، ")],
    ["نوع العملية", transactionLabels[p.transaction]],
  ];

  return (
    <>
      <JsonLd data={listingSchema(p)} />

      {sold && (
        <div className="border-b-4 border-gold bg-red-800 text-white">
          <div className="container flex flex-col items-start gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-2 font-heading font-bold">
              <AlertTriangle className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              تم بيع هذا العقار عبر منصة مروج الشام — تصفح عقارات مشابهة متاحة حالياً بالأسفل
            </p>
            <a href="#similar" className="btn-gold !py-2 text-xs">
              عرض العقارات المشابهة
            </a>
          </div>
        </div>
      )}

      <div className="container py-6 md:py-8">
        <Breadcrumbs
          items={[
            { name: "الرئيسية", href: "/" },
            { name: `عقارات ${area.fullName}`, href: `/areas/${area.slug}` },
            categoryCrumb,
            { name: `${typeLabels[p.type].single} كود ${p.code}`, href: `/property/${p.slug}` },
          ]}
        />

        <header className="mt-4">
          <h1 className="text-2xl font-extrabold !leading-[1.4] md:text-3xl">
            {p.title} - كود <span className="font-latin">{p.code}</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="code-badge !text-sm">
              كود العقار: <span className="mr-1">{p.code}</span>
            </span>
            <span className="rounded-md bg-emerald px-2.5 py-1 text-sm font-bold text-white">{p.deedDetail}</span>
            <span className={`rounded-md px-2.5 py-1 text-sm font-bold text-white ${sold ? "bg-red-700" : "bg-meadow"}`}>
              {sold ? "تم البيع / Sold" : p.transaction === "sale" ? "متاح للبيع" : "متاح للحجز"}
            </span>
          </div>
        </header>
      </div>

      {sold && similar.length > 0 && (
        <section id="similar" className="bg-white py-10" aria-labelledby="similar-top">
          <div className="container">
            <h2 id="similar-top" className="section-title mb-6">
              عقارات مشابهة متاحة الآن في {area.fullName} وما حولها
            </h2>
            <PropertyGrid items={similar} />
          </div>
        </section>
      )}

      <div className="container grid gap-8 py-8 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-10">
          <Gallery images={p.images} code={p.code} title={p.title} dimmed={sold} />

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {p.landArea && <Stat label="المساحة" value={formatArea(p.landArea).split(" (")[0]} />}
            {!p.landArea && p.builtArea && <Stat label="المساحة" value={`${p.builtArea} م²`} />}
            {p.bedrooms && <Stat label="غرف النوم" value={String(p.bedrooms)} icon={<BedDouble className="h-4 w-4" />} />}
            {p.bathrooms && <Stat label="الحمامات" value={String(p.bathrooms)} icon={<Bath className="h-4 w-4" />} />}
            {p.capacity && <Stat label="السعة" value={`${p.capacity} شخص`} icon={<Users className="h-4 w-4" />} />}
            <Stat label="الملكية" value={deedLabels[p.deed]} />
          </ul>

          <section>
            <h2 className="section-title mb-4">وصف العقار</h2>
            <div className="prose-ms">
              {p.description.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title mb-4">جدول المواصفات السريع</h2>
            <div className="overflow-hidden rounded-card bg-white shadow-soft">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k} className="border-b border-black/5 last:border-0">
                      <th scope="row" className="w-2/5 bg-alabaster px-4 py-3 text-right font-heading font-bold text-emerald">
                        {k}
                      </th>
                      <td className={`px-4 py-3 ${k === "كود العقار المرجعي" ? "font-latin font-bold" : ""}`}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title mb-4">المرافق والمزايا</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {p.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 rounded-btn bg-white px-4 py-3 shadow-soft">
                  <CheckCircle2 className="h-4 w-4 text-meadow" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              الموقع التقريبي: {area.fullName}، ريف دمشق. يُكشف الموقع الدقيق خلال المعاينة برفقة مستشارنا.{" "}
              <Link href={`/areas/${area.slug}`} className="font-bold text-meadow underline">
                تعرف على {area.fullName}
              </Link>
            </p>
          </section>
        </div>

        {/* Sticky booking box */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-emerald p-5 text-white">
              <p className="text-sm text-white/70">{sold ? "السعر عند البيع" : "السعر المطلوب"}</p>
              <p className={`mt-1 font-latin text-3xl font-bold ${sold ? "text-white/60 line-through" : "text-gold"}`} dir="ltr">
                {formatPrice(p)}
              </p>
            </div>
            <div className="space-y-4 p-5">
              {sold ? (
                <>
                  <button type="button" disabled className="btn w-full bg-gray-300 text-gray-600">
                    تم بيع هذا العقار
                  </button>
                  <a href="#similar" className="btn-gold w-full">
                    تصفح عقارات مشابهة متاحة
                  </a>
                </>
              ) : (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full !py-4 text-base">
                  <WhatsAppIcon className="h-5 w-5" />
                  {p.transaction === "sale" ? "احجز موعد معاينة عبر واتساب" : "احجز الآن عبر واتساب"}
                </a>
              )}
              <Link href="/request-property" className="btn-outline w-full">
                اطلب عقاراً بمواصفات مشابهة
              </Link>
              <p className="flex gap-2 rounded-btn bg-alabaster p-3 text-xs leading-6 text-muted">
                <ShieldCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                معاينة مجانية على الأرض برفقة مستشارنا العقاري — عمولتنا ضمن العمولة القانونية المتعارف عليها دون أي رسوم إضافية على المشتري.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {!sold && similar.length > 0 && (
        <section id="similar" className="container py-10" aria-labelledby="similar-bottom">
          <h2 id="similar-bottom" className="section-title mb-6">
            عقارات مشابهة قد تهمك
          </h2>
          <PropertyGrid items={similar} />
        </section>
      )}

      {/* Mobile sticky CTA overrides the global mobile bar on this page */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white p-3 shadow-[0_-6px_20px_rgba(15,61,46,0.12)] md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="font-latin text-xs font-bold text-gold">{p.code}</p>
            <p className={`font-latin text-base font-bold ${sold ? "text-muted line-through" : "text-emerald"}`} dir="ltr">
              {formatPrice(p)}
            </p>
          </div>
          {sold ? (
            <a href="#similar" className="btn-gold flex-1">
              عقارات مشابهة
            </a>
          ) : (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
              <WhatsAppIcon className="h-5 w-5" />
              {p.transaction === "sale" ? "احجز معاينة" : "احجز الآن"}
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <li className="rounded-card bg-white p-4 text-center shadow-soft">
      <p className="flex items-center justify-center gap-1 text-xs text-muted">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-heading font-bold text-emerald">{value}</p>
    </li>
  );
}
