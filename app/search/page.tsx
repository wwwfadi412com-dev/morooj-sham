import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "نتائج البحث عن عقارات في ريف دمشق",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

// Static export: filtering happens in the browser from the query string.
export default function SearchPage() {
  return (
    <>
      <PageHero
        title="ابحث عن عقارك في ريف دمشق"
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "البحث", href: "/search" },
        ]}
      />
      <Suspense fallback={<div className="container py-10 text-muted">جارٍ التحميل…</div>}>
        <SearchResults />
      </Suspense>
    </>
  );
}
