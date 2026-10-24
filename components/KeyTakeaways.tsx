import { Sparkles } from "lucide-react";

/** Answer-first "خلاصة سريعة" box placed at the top of area pages and articles. */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside className="rounded-card border-r-4 border-gold bg-white p-5 shadow-soft md:p-6" aria-label="خلاصة سريعة">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
        <Sparkles className="h-5 w-5 text-gold" aria-hidden="true" />
        خلاصة سريعة
      </h2>
      <ul className="space-y-2">
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-[15px] leading-7">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
