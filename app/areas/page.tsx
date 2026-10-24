import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { areas } from "@/data/areas";
import { countByArea } from "@/data/properties";

export const metadata: Metadata = {
  title: "دليل مناطق ريف دمشق العقارية - الدرخبية ودروشا وخان الشيح وعرطوز",
  description: "مقارنة شاملة بين مناطق ريف دمشق الغربي: المسافة عن دمشق، المياه، أنواع الطابو، ومؤشرات أسعار المزارع والشقق والأراضي.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        title="دليل مناطق ريف دمشق العقارية"
        subtitle="كل ما تحتاج معرفته عن الدرخبية ودروشا وخان الشيح وعرطوز قبل الشراء أو الاستئجار."
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "المناطق", href: "/areas" },
        ]}
      />
      <div className="container py-12">
        <section className="mb-14">
          <h2 className="section-title mb-5">مقارنة سريعة بين المناطق</h2>
          <div className="prose-ms overflow-x-auto rounded-card shadow-soft">
            <table className="!mb-0">
              <thead>
                <tr>
                  <th>المنطقة</th>
                  <th>المسافة عن دمشق</th>
                  <th>المياه</th>
                  <th>أنواع الملكية الشائعة</th>
                  <th>عقارات متاحة</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((a) => (
                  <tr key={a.slug}>
                    <td className="font-bold">
                      <Link href={`/areas/${a.slug}`}>{a.fullName}</Link>
                    </td>
                    <td>{a.distance}</td>
                    <td>{a.water}</td>
                    <td>{a.commonDeeds}</td>
                    <td className="font-latin font-bold">{countByArea(a.slug)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {areas.map((a) => (
            <Link key={a.slug} href={`/areas/${a.slug}`} className="card group overflow-hidden">
              <div className="relative aspect-[16/8]">
                <Image src={a.image.replace("w=1600", "w=900")} alt={`عقارات ${a.fullName}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-extrabold">عقارات {a.fullName}</h2>
                <p className="mt-1 text-sm text-muted">{a.tagline}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {a.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-alabaster px-3 py-1 text-xs font-bold text-emerald">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
