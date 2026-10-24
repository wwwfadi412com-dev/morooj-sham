import type { Metadata } from "next";
import { Camera, FileCheck2, Megaphone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { areas } from "@/data/areas";

export const metadata: Metadata = {
  title: "أضف عقارك للتسويق - بيع أو تأجير عقارك في ريف دمشق",
  description: "سجّل مزرعتك أو فيلتك أو شقتك أو أرضك في ريف دمشق للتسويق عبر مروج الشام: تصوير احترافي، وصول للمغتربين، وحماية كاملة لخصوصيتك.",
  alternates: { canonical: "/submit-property" },
};

const steps = [
  { icon: FileCheck2, title: "أرسل التفاصيل", text: "املأ النموذج وأرسل الصور عبر واتساب." },
  { icon: Camera, title: "معاينة وتصوير", text: "نعاين العقار ونصوره باحترافية مع التحقق من الأوراق." },
  { icon: Megaphone, title: "تسويق محمي", text: "ننشر العقار بكود خاص دون كشف هويتك أو رقمك." },
];

export default function SubmitPropertyPage() {
  return (
    <>
      <PageHero
        title="أضف عقارك للتسويق"
        subtitle="للمالكين والمكاتب العقارية الموثوقة: نسوّق مزرعتك أو فيلتك أو شقتك أو أرضك لآلاف الباحثين في سوريا وبلاد الاغتراب."
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "أضف عقارك", href: "/submit-property" },
        ]}
      />
      <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card flex gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald">
                <s.icon className="h-6 w-6 text-gold" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold">
                  <span className="font-latin text-gold">{i + 1}.</span> {s.title}
                </h2>
                <p className="text-sm text-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </aside>
        <LeadForm
          heading="مرحباً مروج الشام، أرغب بإضافة عقاري للتسويق:"
          submitLabel="إرسال بيانات العقار عبر واتساب"
          note="بعد فتح المحادثة، أرسل صور العقار مباشرة في نفس محادثة واتساب. بياناتك لا تُنشر للعموم."
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
