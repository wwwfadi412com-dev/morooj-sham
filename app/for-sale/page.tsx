import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { filterProperties } from "@/data/properties";
import { typeLabels, typeSlugs } from "@/data/taxonomy";
import type { PropertyType } from "@/data/types";

export const metadata: Metadata = {
  title: "عقارات للبيع في ريف دمشق - مزارع وفلل وشقق وأراضي",
  description: "تصفح مزارع وفلل وشقق وأراضي للبيع في الدرخبية ودروشا وخان الشيح وعرطوز. عقارات مُعاينة بأوراق مدققة ومعاينة مجانية.",
  alternates: { canonical: "/for-sale" },
};

export default function ForSalePage() {
  const types = Object.keys(typeSlugs) as PropertyType[];
  return (
    <ListingPage
      title="عقارات للبيع في ريف دمشق"
      subtitle="مزارع وفلل وشقق وأراضٍ مُعاينة على الأرض بأوراق مدققة في الدرخبية ودروشا وخان الشيح وعرطوز."
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
