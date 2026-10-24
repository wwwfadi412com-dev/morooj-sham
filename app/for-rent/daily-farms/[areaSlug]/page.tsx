import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ListingPage";
import { areas, getArea } from "@/data/areas";
import { filterProperties } from "@/data/properties";

type Params = { params: Promise<{ areaSlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ areaSlug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const area = getArea((await params).areaSlug);
  if (!area) return {};
  return {
    title: `مزارع للإيجار اليومي في ${area.fullName} مع مسبح`,
    description: `احجز مزرعة للإيجار اليومي أو الأسبوعي في ${area.fullName} مع مسبح مفلتر ومساحات خضراء. مزارع مُعاينة والحجز بكود المزرعة عبر واتساب.`,
    alternates: { canonical: `/for-rent/daily-farms/${area.slug}` },
  };
}

export default async function DailyFarmsAreaPage({ params }: Params) {
  const area = getArea((await params).areaSlug);
  if (!area) notFound();
  return (
    <ListingPage
      title={`مزارع للإيجار اليومي في ${area.fullName} مع مسبح`}
      subtitle={`مزارع عائلية مسورة ومجهزة في ${area.fullName} — ${area.distance}.`}
      image={area.image}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: "مزارع للإيجار اليومي", href: "/for-rent/daily-farms" },
        { name: area.fullName, href: `/for-rent/daily-farms/${area.slug}` },
      ]}
      chips={[
        { href: "/for-rent/daily-farms", label: "كل المناطق" },
        ...areas.map((a) => ({ href: `/for-rent/daily-farms/${a.slug}`, label: a.fullName, active: a.slug === area.slug })),
      ]}
      items={filterProperties({ transaction: "daily-rent", area: area.slug })}
    />
  );
}
