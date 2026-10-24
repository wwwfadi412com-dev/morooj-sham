import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { filterProperties } from "@/data/properties";

export const metadata: Metadata = {
  title: "مزارع وفلل وشقق للإيجار في ريف دمشق - يومي وشهري وسنوي",
  description: "مزارع للإيجار اليومي والأسبوعي مع مسبح، وفلل وشقق للإيجار الشهري والسنوي في دروشا وخان الشيح والدرخبية وعرطوز.",
  alternates: { canonical: "/for-rent" },
};

export default function ForRentPage() {
  return (
    <ListingPage
      title="المزارع والإيجارات السياحية والسكنية في ريف دمشق"
      subtitle="مزارع للإيجار اليومي مع مسبح مفلتر، وفلل وشقق للإيجار الشهري والسنوي — كلها مُعاينة قبل النشر."
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
