import type { Metadata } from "next";
import { Camera, FileCheck2, Megaphone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { areas } from "@/data/areas";
import { pages } from "@/data/content";

const content = pages["submit-property"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: "/submit-property" },
};

const STEP_ICONS = [FileCheck2, Camera, Megaphone];

export default function SubmitPropertyPage() {
  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: content.title, href: "/submit-property" },
        ]}
      />
      <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-4">
          {content.steps.map((s, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            return (
            <div key={s.title} className="card flex gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald">
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold">
                  <span className="font-latin text-gold">{i + 1}.</span> {s.title}
                </h2>
                <p className="text-sm text-muted">{s.text}</p>
              </div>
            </div>
            );
          })}
        </aside>
        <LeadForm
          heading="مرحباً مروج الشام، أرغب بإضافة عقاري للتسويق:"
          submitLabel={content.submitLabel}
          note={content.formNote}
          fields={[
            { name: "name", label: "الاسم", required: true },
            { name: "phone", label: "رقم الهاتف / واتساب", type: "tel", required: true, placeholder: "+963..." },
            { name: "role", label: "صفتك", type: "select", options: ["مالك العقار", "مكتب عقاري", "وكيل عن المالك"], required: true },
            { name: "type", label: "نوع العقار", type: "select", options: ["مزرعة", "فيلا / منزل مستقل", "شقة سكنية", "أرض / مقسم"], required: true },
            { name: "deal", label: "نوع العملية", type: "select", options: ["بيع", "إيجار يومي / سياحي", "إيجار شهري / سنوي"], required: true },
            { name: "area", label: "المنطقة", type: "select", options: [...areas.map((a) => a.fullName), "منطقة أخرى في ريف دمشق"], required: true },
            { name: "size", label: "المساحة (م² أو دونم)", placeholder: "مثال: 3 دونم" },
            { name: "deed", label: "نوع الملكية", type: "select", options: ["طابو أخضر", "طابو زراعي", "حكم محكمة", "كاتب عدل", "غير متأكد"] },
            { name: "price", label: "السعر المطلوب ($)", placeholder: "مثال: 120,000" },
            { name: "details", label: "وصف مختصر (البناء، المياه، المسبح، الأشجار...)", type: "textarea" },
          ]}
        />
      </div>
    </>
  );
}
