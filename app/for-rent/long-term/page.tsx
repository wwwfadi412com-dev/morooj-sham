import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { filterProperties } from "@/data/properties";

export const metadata: Metadata = {
  title: "فلل وشقق للإيجار الشهري والسنوي في ريف دمشق",
  description: "فلل وشقق مفروشة وغير مفروشة للإيجار الشهري والسنوي في عرطوز وجديدة عرطوز والدرخبية ودروشا. عقود واضحة ومعاينة مجانية.",
  alternates: { canonical: "/for-rent/long-term" },
};

export default function LongTermPage() {
  return (
    <ListingPage
      title="فلل وشقق للإيجار الشهري والسنوي"
      subtitle="سكن مريح بأسعار أقل من دمشق في عرطوز والدرخبية ودروشا — مفروش وغير مفروش."
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
