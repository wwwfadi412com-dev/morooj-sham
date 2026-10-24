import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { FAQ } from "@/components/FAQ";
import { areas } from "@/data/areas";
import { filterProperties } from "@/data/properties";
import { pages } from "@/data/content";

const content = pages.listings.dailyFarms;

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "/for-rent/daily-farms" },
};

export default function DailyFarmsPage() {
  return (
    <ListingPage
      title={content.h1}
      subtitle={content.subtitle}
      image={content.image}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: "للإيجار", href: "/for-rent" },
        { name: "مزارع للإيجار اليومي", href: "/for-rent/daily-farms" },
      ]}
      chips={[
        { href: "/for-rent/daily-farms", label: "كل المناطق", active: true },
        ...areas.map((a) => ({ href: `/for-rent/daily-farms/${a.slug}`, label: a.fullName })),
      ]}
      items={filterProperties({ transaction: "daily-rent" })}
    >
      {content.faqs && content.faqs.length > 0 && <FAQ items={content.faqs} />}
    </ListingPage>
  );
}
