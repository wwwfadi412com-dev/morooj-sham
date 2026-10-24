import { ChevronDown } from "lucide-react";
import type { FAQ as FAQItem } from "@/data/types";
import { JsonLd, faqSchema } from "./JsonLd";

/** Accordion built on <details> so it works with zero JavaScript. */
export function FAQ({ items, title = "الأسئلة الشائعة", withSchema = true }: { items: FAQItem[]; title?: string; withSchema?: boolean }) {
  return (
    <section aria-labelledby="faq-title">
      {withSchema && <JsonLd data={faqSchema(items)} />}
      <h2 id="faq-title" className="section-title mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((f, i) => (
          <details key={i} className="card group p-0 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
              <h3 className="text-base font-bold md:text-lg">{f.q}</h3>
              <ChevronDown className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-charcoal/85">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
