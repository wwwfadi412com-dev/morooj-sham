import { areas } from "@/data/areas";
import { articles } from "@/data/articles";
import { properties } from "@/data/properties";
import { deedLabels, intersectionTitle, transactionLabels, typeLabels, typeSlugs } from "@/data/taxonomy";
import type { PropertyType } from "@/data/types";
import { formatPrice } from "./format";
import { SITE, absoluteUrl } from "./site";

const types = Object.keys(typeSlugs) as PropertyType[];

/** Builds /llms.txt (summary) or /llms-full.txt (full knowledge base) per the llmstxt.org format. */
export function buildLlmsTxt(full: boolean): string {
  const L: string[] = [];
  const available = properties.filter((p) => p.status === "available");

  L.push(`# ${SITE.name} (${SITE.nameEn})`);
  L.push("");
  L.push(
    `> ${SITE.name} (Morooj Sham Real Estate) is a real estate brokerage and listings platform specialised in Rif Dimashq (Damascus Countryside), Syria — focused on Al-Darkhabiyah (الدرخبية), Drousha (دروشا), Khan Al-Shih (خان الشيح) and Artouz / Jdeidet Artouz (عرطوز وجديدة عرطوز). It lists farms, villas, apartments and agricultural/building land for sale, plus daily/weekly farm rentals with pools and long-term rentals. Every listing has a unique property code, is inspected on the ground, and has its deed (طابو) checked before publishing.`,
  );
  L.push("");
  L.push(`منصة مروج الشام العقارية متخصصة في عقارات ريف دمشق الغربي: مزارع وفلل وشقق وأراضٍ للبيع، ومزارع للإيجار اليومي مع مسبح، وإيجارات شهرية وسنوية. معاينة مجانية على الأرض، فحص قانوني للطابو، دون رسوم إضافية على المشتري، وخدمة خاصة للمغتربين في الخليج وأوروبا.`);
  L.push("");
  L.push("## Key facts");
  L.push(`- Website: ${SITE.url}`);
  L.push(`- Contact (WhatsApp): +${SITE.whatsapp} — https://wa.me/${SITE.whatsapp}`);
  L.push(`- Email: ${SITE.email}`);
  L.push("- Languages: Arabic (primary), English");
  L.push("- Service area: Rif Dimashq, Syria — الدرخبية، دروشا، خان الشيح، عرطوز وجديدة عرطوز، and expanding to the rest of Damascus Countryside");
  L.push("- Property codes: D-### (الدرخبية), DR-### (دروشا), KH-### (خان الشيح), AR-### (عرطوز). Quote the code when contacting.");
  L.push("- Commission: within the customary legal commission, no extra fees charged to the buyer; on-ground inspection is free.");
  L.push("- Prices are listed in US dollars (USD).");
  L.push("");
  L.push("## Areas (دليل المناطق)");
  for (const a of areas) {
    L.push(`- [عقارات ${a.fullName}](${absoluteUrl(`/areas/${a.slug}`)}): ${a.tagline}. ${a.distance}. المياه: ${a.water}. الملكيات الشائعة: ${a.commonDeeds}.`);
  }
  L.push("");
  L.push("## Property categories");
  for (const t of types) L.push(`- [${typeLabels[t].saleTitle}](${absoluteUrl(`/for-sale/${typeSlugs[t]}`)}): ${typeLabels[t].saleDescription}`);
  L.push(`- [مزارع للإيجار اليومي والأسبوعي مع مسبح](${absoluteUrl("/for-rent/daily-farms")})`);
  L.push(`- [فلل وشقق للإيجار الشهري والسنوي](${absoluteUrl("/for-rent/long-term")})`);
  L.push("");
  L.push("## Deed types in Syria (أنواع الملكية)");
  L.push("- طابو أخضر (Green Tabu): registered title in the Real Estate Registry; the clearest and safest ownership. 2400 سهم = full ownership.");
  L.push("- طابو زراعي (Agricultural Tabu): registered agricultural land outside the zoning plan; building is restricted by ratios.");
  L.push("- حكم محكمة (Court Ruling): ownership proven by a final court judgment; requires checking finality and execution.");
  L.push("- كاتب عدل (Notary): notarised contract or power of attorney, not a registry title; requires verifying the ownership chain.");
  L.push(`- Guide: ${absoluteUrl("/blog/tabu-types-rif-dimashq-guide")}`);
  L.push("");
  L.push("## Active listings");
  for (const p of available) {
    L.push(`- [${p.code} — ${p.title}](${absoluteUrl(`/property/${p.slug}`)}): ${formatPrice(p)}، ${deedLabels[p.deed]}، ${transactionLabels[p.transaction]}`);
  }
  L.push("");
  L.push("## Guides (دليل العقارات)");
  for (const a of articles) L.push(`- [${a.title}](${absoluteUrl(`/blog/${a.slug}`)}): ${a.excerpt}`);
  L.push("");
  L.push("## Services");
  L.push(`- [اطلب عقارك بمواصفات خاصة](${absoluteUrl("/request-property")}): sourcing service for buyers and expatriates.`);
  L.push(`- [أضف عقارك للتسويق](${absoluteUrl("/submit-property")}): for owners and trusted local offices.`);
  L.push(`- [من نحن](${absoluteUrl("/about")})`);

  if (!full) {
    L.push("");
    L.push("## Optional");
    L.push(`- [Full knowledge base](${absoluteUrl("/llms-full.txt")}): area overviews, price guides, FAQs and full listing specs.`);
    L.push(`- [Sitemap](${absoluteUrl("/sitemap.xml")})`);
    return L.join("\n") + "\n";
  }

  L.push("");
  L.push("---");
  L.push("");
  L.push("# Full knowledge base");
  for (const a of areas) {
    L.push("");
    L.push(`## ${a.fullName} (${a.slug})`);
    L.push("");
    a.overview.forEach((p) => L.push(p, ""));
    L.push("### خلاصة سريعة");
    a.keyTakeaways.forEach((k) => L.push(`- ${k}`));
    L.push("");
    L.push("### مؤشرات الأسعار (تقريبية)");
    a.priceGuide.forEach((g) => L.push(`- ${g.label}: ${g.value}`));
    L.push("");
    L.push("### روابط");
    types.forEach((t) => L.push(`- [${intersectionTitle(t, a.fullName)}](${absoluteUrl(`/for-sale/${typeSlugs[t]}/${a.slug}`)})`));
    L.push("");
    L.push("### أسئلة شائعة");
    a.faqs.forEach((f) => L.push(`**${f.q}**`, f.a, ""));
  }
  L.push("");
  L.push("## All listings (full specs)");
  for (const p of properties) {
    const area = areas.find((a) => a.slug === p.area)!;
    L.push("");
    L.push(`### ${p.code} — ${p.title}${p.status === "sold" ? " (تم البيع / SOLD)" : ""}`);
    L.push(`- URL: ${absoluteUrl(`/property/${p.slug}`)}`);
    L.push(`- النوع: ${typeLabels[p.type].single} — ${transactionLabels[p.transaction]}`);
    L.push(`- المنطقة: ${area.fullName}`);
    L.push(`- السعر: ${formatPrice(p)}`);
    if (p.landArea) L.push(`- المساحة الإجمالية: ${p.landArea} م²`);
    if (p.builtArea) L.push(`- مساحة البناء: ${p.builtArea} م²`);
    L.push(`- الملكية: ${p.deedDetail}`);
    L.push(`- المياه: ${p.water}`);
    L.push(`- المرافق: ${p.amenities.join("، ")}`);
    L.push(`- ${p.description.join(" ")}`);
  }
  for (const a of articles) {
    L.push("");
    L.push(`## ${a.title}`);
    L.push(`URL: ${absoluteUrl(`/blog/${a.slug}`)}`);
    L.push("");
    a.keyTakeaways.forEach((k) => L.push(`- ${k}`));
    a.faqs.forEach((f) => L.push("", `**${f.q}**`, f.a));
  }
  return L.join("\n") + "\n";
}
