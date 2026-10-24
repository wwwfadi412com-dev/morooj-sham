import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { filterProperties } from "@/data/properties";
import { pages } from "@/data/content";

const content = pages.listings.forRent;

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "/for-rent" },
};

export default function ForRentPage() {
  return (
    <ListingPage
      title={content.h1}
      subtitle={content.subtitle}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: "للإيجار", href: "/for-rent" },
      ]}
      chips={[
        { href: "/for-rent", label: "الكل", active: true },
        { href: "/for-rent/daily-farms", label: "مزارع للإيجار اليومي" },
        { href: "/for-rent/long-term", label: "إيجار شهري وسنوي" },
      ]}
      items={filterProperties({ transactions: ["daily-rent", "long-term-rent"] })}
    />
  );
}
