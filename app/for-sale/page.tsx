import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { filterProperties } from "@/data/properties";
import { typeLabels, typeSlugs } from "@/data/taxonomy";
import type { PropertyType } from "@/data/types";
import { pages } from "@/data/content";

const content = pages.listings.forSale;

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "/for-sale" },
};

export default function ForSalePage() {
  const types = Object.keys(typeSlugs) as PropertyType[];
  return (
    <ListingPage
      title={content.h1}
      subtitle={content.subtitle}
      crumbs={[
        { name: "الرئيسية", href: "/" },
        { name: "عقارات للبيع", href: "/for-sale" },
      ]}
      chips={[
        { href: "/for-sale", label: "الكل", active: true },
        ...types.map((t) => ({ href: `/for-sale/${typeSlugs[t]}`, label: typeLabels[t].plural })),
      ]}
      items={filterProperties({ transaction: "sale" })}
    />
  );
}
