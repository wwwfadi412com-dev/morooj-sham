import type { Property } from "@/data/types";
import { transactionLabels, typeLabels } from "@/data/taxonomy";
import { getArea } from "@/data/areas";
import { absoluteUrl } from "./site";

const nf = new Intl.NumberFormat("en-US");

export const formatNumber = (n: number) => nf.format(n);

export function formatPrice(p: Property): string {
  const base = `${nf.format(p.price)} $`;
  if (p.transaction === "daily-rent") return `${base} / يوم`;
  if (p.transaction === "long-term-rent") return `${base} / شهر`;
  return base;
}

export function formatArea(m2: number): string {
  if (m2 >= 1000) {
    const dunum = m2 / 1000;
    return `${nf.format(m2)} م² (${Number.isInteger(dunum) ? dunum : dunum.toFixed(1)} دونم)`;
  }
  return `${nf.format(m2)} م²`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ar-SY-u-nu-latn", { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
}

/** Short summary used inside the pre-filled WhatsApp message, e.g. "مزرعة 4 دونم في الدرخبية" */
export function shortSummary(p: Property): string {
  const area = getArea(p.area)?.name ?? "";
  const size =
    p.type === "apartment" && p.builtArea
      ? `${p.builtArea} م²`
      : p.landArea
        ? p.landArea >= 1000
          ? `${p.landArea / 1000} دونم`
          : `${p.landArea} م²`
        : "";
  return [typeLabels[p.type].single, size, `في ${area}`].filter(Boolean).join(" ");
}

export function propertyWhatsappMessage(p: Property): string {
  const action = p.transaction === "sale" ? "وتحديد موعد لمعاينة العقار" : `وحجز العقار ${transactionLabels[p.transaction]}`;
  return `مرحباً مروج الشام، أرغب بالاستفسار ${action} كود [${p.code}] (${shortSummary(p)})\n${absoluteUrl(`/property/${p.slug}`)}`;
}
