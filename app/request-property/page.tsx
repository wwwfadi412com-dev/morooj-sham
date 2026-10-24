import type { Metadata } from "next";
import { Crown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { areas } from "@/data/areas";
import { pages } from "@/data/content";

const content = pages["request-property"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: "/request-property" },
};

export default function RequestPropertyPage() {
  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: content.title, href: "/request-property" },
        ]}
      />
      <div className="container max-w-4xl py-12">
        <div className="mb-6 flex items-start gap-3 rounded-card border border-gold/40 bg-white p-5">
          <Crown className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
          <div className="text-sm leading-7 [&_strong]:text-emerald" dangerouslySetInnerHTML={{ __html: content.introHtml }} />
        </div>
        <LeadForm
          heading="مرحباً مروج الشام، أبحث عن عقار بالمواصفات التالية:"
          submitLabel={content.submitLabel}
          note={content.formNote}
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
