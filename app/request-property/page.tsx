import type { Metadata } from "next";
import { Crown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { areas } from "@/data/areas";

export const metadata: Metadata = {
  title: "اطلب عقارك بمواصفات خاصة - خدمة VIP للمغتربين والمستثمرين",
  description: "أخبرنا بالمساحة والميزانية ونوع الملكية والمنطقة، وسيبحث لك مستشار مروج الشام عن العقار المطابق في ريف دمشق مع معاينة وفحص قانوني.",
  alternates: { canonical: "/request-property" },
};

export default function RequestPropertyPage() {
  return (
    <>
      <PageHero
        title="اطلب عقارك بمواصفات خاصة"
        subtitle="خدمة VIP للمغتربين والمستثمرين: حدّد ما تريد، ونحن نبحث ونعاين ونفحص الأوراق ونرسل لك الخيارات المطابقة."
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "اطلب عقارك", href: "/request-property" },
        ]}
      />
      <div className="container max-w-4xl py-12">
        <div className="mb-6 flex items-start gap-3 rounded-card border border-gold/40 bg-white p-5">
          <Crown className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
          <p className="text-sm leading-7">
            <strong className="text-emerald">كيف تعمل الخدمة؟</strong> نستلم طلبك، ونبحث في شبكتنا من المالكين والمكاتب الموثوقة، ثم نرسل لك العروض المطابقة مع فيديو معاينة وتقرير عن نوع الملكية — دون أي التزام منك.
          </p>
        </div>
        <LeadForm
          heading="مرحباً مروج الشام، أبحث عن عقار بالمواصفات التالية:"
          submitLabel="إرسال الطلب عبر واتساب"
          note="سيتواصل معك مستشارنا خلال ساعات عمل اليوم نفسه."
          fields={[
            { name: "name", label: "الاسم", required: true },
            { name: "phone", label: "رقم واتساب", type: "tel", required: true, placeholder: "+..." },
            { name: "country", label: "بلد الإقامة الحالي", placeholder: "مثال: الإمارات، ألمانيا، سوريا" },
            { name: "type", label: "نوع العقار المطلوب", type: "select", options: ["مزرعة", "فيلا / منزل مستقل", "شقة سكنية", "أرض / مقسم"], required: true },
            { name: "deal", label: "الغرض", type: "select", options: ["شراء", "إيجار يومي / سياحي", "إيجار شهري / سنوي"], required: true },
            { name: "area", label: "المنطقة المفضلة", type: "select", options: [...areas.map((a) => a.fullName), "أي منطقة في ريف دمشق الغربي"] },
            { name: "budget", label: "الميزانية التقريبية ($)", placeholder: "مثال: 80,000 – 120,000", required: true },
            { name: "size", label: "المساحة المطلوبة", placeholder: "مثال: 2–4 دونم" },
            { name: "deed", label: "نوع الملكية المطلوب", type: "select", options: ["طابو أخضر فقط", "طابو أخضر أو زراعي", "لا مانع من أي نوع بعد التدقيق"] },
            { name: "notes", label: "مواصفات إضافية (مسبح، بئر، عدد الغرف، قرب الطريق...)", type: "textarea" },
          ]}
        />
      </div>
    </>
  );
}
