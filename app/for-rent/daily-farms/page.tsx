import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { FAQ } from "@/components/FAQ";
import { areas } from "@/data/areas";
import { filterProperties } from "@/data/properties";

export const metadata: Metadata = {
  title: "مزارع للإيجار اليومي والأسبوعي مع مسبح في ريف دمشق",
  description: "احجز مزرعة للإيجار اليومي أو الأسبوعي مع مسبح مفلتر وألعاب أطفال في دروشا وخان الشيح والدرخبية. مزارع مُعاينة ونظيفة، والحجز عبر واتساب.",
  alternates: { canonical: "/for-rent/daily-farms" },
};

const faqs = [
  {
    q: "كم سعر إيجار مزرعة يومية مع مسبح في ريف دمشق؟",
    a: "يتراوح السعر تقريبياً بين 60 و200 دولار لليوم حسب المنطقة وحجم المسبح والسعة والموسم، ويتوفر خصم على الحجز الأسبوعي.",
  },
  {
    q: "ماذا يشمل سعر الإيجار اليومي؟",
    a: "عادة يشمل استخدام المزرعة والمسبح والمرافق من الصباح حتى المساء. نوضح لكل مزرعة ما يشمله السعر ومواعيد الدخول والخروج قبل الحجز.",
  },
  {
    q: "كيف أحجز مزرعة؟",
    a: "اضغط زر واتساب في صفحة المزرعة، وستصلنا رسالة فيها كود المزرعة تلقائياً لنؤكد لك التوفر في التاريخ المطلوب والسعر النهائي.",
  },
];

export default function DailyFarmsPage() {
  return (
    <ListingPage
      title="مزارع للإيجار اليومي والأسبوعي مع مسبح مفلتر وألعاب أطفال"
      subtitle="مزارع عائلية مسورة ومُعاينة في دروشا وخان الشيح والدرخبية — احجز بكود المزرعة عبر واتساب."
      image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=70"
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
      <FAQ items={faqs} />
    </ListingPage>
  );
}
