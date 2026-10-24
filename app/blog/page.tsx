import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { assetSrc } from "@/lib/site";

export const metadata: Metadata = {
  title: "دليل العقارات والاستثمار في ريف دمشق - مقالات قانونية واستثمارية",
  description: "أدلة عملية لشراء المزارع والشقق والأراضي في ريف دمشق: أنواع الطابو، مقارنة المناطق، الإيجار اليومي، ونصائح الاستثمار.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="دليل العقارات والاستثمار في ريف دمشق"
        subtitle="مقالات قانونية واستثمارية تساعدك على اتخاذ قرار الشراء أو الاستئجار بثقة."
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "دليل العقارات", href: "/blog" },
        ]}
      />
      <div className="container grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <article key={a.slug} className="card group flex flex-col overflow-hidden">
            <Link href={`/blog/${a.slug}`} className="relative block aspect-[16/10]" tabIndex={-1} aria-hidden="true">
              <Image src={assetSrc(a.image.replace("w=1400", "w=800"))} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" priority={i < 2} className="object-cover transition duration-500 group-hover:scale-105" />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="mb-2 flex items-center gap-2 text-xs text-muted">
                <span className="rounded bg-gold/20 px-2 py-0.5 font-bold text-emerald">{a.category}</span>
                {formatDate(a.publishedAt)}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <span className="font-latin">{a.readMinutes}</span> د
                </span>
              </p>
              <h2 className="mb-2 text-lg font-bold leading-8">
                <Link href={`/blog/${a.slug}`} className="hover:text-meadow">
                  {a.title}
                </Link>
              </h2>
              <p className="line-clamp-3 text-sm text-muted">{a.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
