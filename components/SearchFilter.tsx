import { Search } from "lucide-react";
import { areas } from "@/data/areas";
import { BASE_PATH } from "@/lib/site";

interface Props {
  defaults?: { area?: string; type?: string; deal?: string };
  compact?: boolean;
}

/**
 * 3-field smart filter. A plain GET form to /search, so it works instantly
 * on slow connections and without JavaScript.
 */
export function SearchFilter({ defaults = {}, compact = false }: Props) {
  return (
    <form
      action={`${BASE_PATH}/search/`}
      method="get"
      role="search"
      aria-label="البحث عن عقار"
      className={`grid gap-3 rounded-card bg-white p-3 shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto] md:p-4 ${compact ? "shadow-soft" : ""}`}
    >
      <div>
        <label htmlFor="f-area" className="mb-1 block text-xs font-bold text-muted">
          المنطقة
        </label>
        <select id="f-area" name="area" defaultValue={defaults.area ?? ""} className="field !py-2.5">
          <option value="">الكل</option>
          {areas.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.fullName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-type" className="mb-1 block text-xs font-bold text-muted">
          نوع العقار
        </label>
        <select id="f-type" name="type" defaultValue={defaults.type ?? ""} className="field !py-2.5">
          <option value="">كل الأنواع</option>
          <option value="farm">مزرعة</option>
          <option value="villa">فيلا</option>
          <option value="apartment">شقة سكنية</option>
          <option value="land">أرض / مقسم</option>
        </select>
      </div>
      <div>
        <label htmlFor="f-deal" className="mb-1 block text-xs font-bold text-muted">
          نوع العملية
        </label>
        <select id="f-deal" name="deal" defaultValue={defaults.deal ?? ""} className="field !py-2.5">
          <option value="">الكل</option>
          <option value="sale">للبيع</option>
          <option value="daily-rent">للإيجار اليومي / السياحي</option>
          <option value="long-term-rent">للإيجار السنوي</option>
        </select>
      </div>
      <button type="submit" className="btn-gold self-end !py-3 md:min-w-[130px]">
        <Search className="h-4 w-4" aria-hidden="true" />
        ابحث
      </button>
    </form>
  );
}
