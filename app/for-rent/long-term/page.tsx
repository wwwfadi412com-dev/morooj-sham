import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { filterProperties } from "@/data/properties";
import { pages } from "@/data/content";

const content = pages.listings.longTerm;

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "/for-rent/long-term" },
};

export default function LongTermPage() {
  return (
    <ListingPage
      title={content.h1}
      subtitle={content.subtitle}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: "للإيجار", href: "/for-rent" },
        { name: "إيجار شهري وسنوي", href: "/for-rent/long-term" },
      ]}
      chips={[
        { href: "/for-rent", label: "الكل" },
        { href: "/for-rent/daily-farms", label: "مزارع للإيجار اليومي" },
        { href: "/for-rent/long-term", label: "إيجار شهري وسنوي", active: true },
      ]}
      items={filterProperties({ transaction: "long-term-rent" })}
    />
  );
}
