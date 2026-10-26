"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Calculator, Info } from "lucide-react";
import type { ContractingContent, FinishLevel } from "@/data/types";
import { formatNumber } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Calc = ContractingContent["calculator"];

const unitLabel = (unit: "m2" | "dunum") => (unit === "dunum" ? "دونم" : "م²");

/** Round to a "quote-like" figure: nearest 100 under 10k, nearest 500 above. */
const roundMoney = (n: number) => (n < 10000 ? Math.round(n / 100) * 100 : Math.round(n / 500) * 500);

function formatDuration(minDays: number, maxDays: number): string {
  if (maxDays <= 60) {
    const a = Math.max(1, Math.round(minDays / 7));
    const b = Math.max(a, Math.round(maxDays / 7));
    return a === b ? `${a} أسابيع تقريباً` : `${a} – ${b} أسابيع`;
  }
  const a = Math.max(1, Math.round((minDays / 30) * 2) / 2);
  const b = Math.max(a, Math.round((maxDays / 30) * 2) / 2);
  return a === b ? `${a} أشهر تقريباً` : `${a} – ${b} أشهر`;
}

/**
 * Interactive construction / finishing cost estimator. Rates and ranges are
 * edited in /admin (محتوى الصفحات ← التعهدات ← الحاسبة); nothing is sent
 * anywhere until the visitor taps the WhatsApp button.
 */
export function CostEstimator({ calc }: { calc: Calc }) {
  const [typeId, setTypeId] = useState(calc.projectTypes[0]?.id);
  const type = calc.projectTypes.find((t) => t.id === typeId) ?? calc.projectTypes[0];
  const [qty, setQty] = useState(type.defaultQty);
  const [level, setLevel] = useState<FinishLevel>(calc.levels[1]?.id ?? "deluxe");

  const result = useMemo(() => {
    const q = Math.min(type.maxQty, Math.max(type.minQty, qty || type.minQty));
    const base = type.fixed[level] + type.perUnit[level] * q;
    const spread = calc.rangePercent / 100;
    const days = type.baseDays + type.daysPerUnit * q;
    return {
      q,
      min: roundMoney(base * (1 - spread)),
      max: roundMoney(base * (1 + spread)),
      duration: formatDuration(days * (1 - spread), days * (1 + spread)),
    };
  }, [type, qty, level, calc.rangePercent]);

  const levelLabel = calc.levels.find((l) => l.id === level)?.label ?? level;
  const message = [
    calc.whatsappMessage,
    "",
    `• نوع المشروع: ${type.label}`,
    `• ${type.qtyLabel}: ${formatNumber(result.q)} ${unitLabel(type.unit)}`,
    `• مستوى التشطيب: ${levelLabel}`,
    `• التكلفة التقديرية من الحاسبة: ${formatNumber(result.min)} – ${formatNumber(result.max)} $`,
    `• المدة المتوقعة: ${result.duration}`,
  ].join("\n");

  function selectType(id: string) {
    const t = calc.projectTypes.find((x) => x.id === id);
    if (!t) return;
    setTypeId(id);
    setQty(t.defaultQty);
  }

  return (
    <div className="grid overflow-hidden rounded-card bg-white shadow-soft lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-7 p-5 md:p-8">
        <fieldset>
          <legend className="label mb-3">1. نوع المشروع</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {calc.projectTypes.map((t) => (
              <label
                key={t.id}
                className={`flex cursor-pointer items-center gap-3 rounded-btn border-2 px-4 py-3 text-sm font-bold transition ${
                  t.id === type.id ? "border-gold bg-gold/10 text-emerald" : "border-black/10 hover:border-gold/60"
                }`}
              >
                <input type="radio" name="projectType" value={t.id} checked={t.id === type.id} onChange={() => selectType(t.id)} className="accent-[#0F3D2E]" />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="calc-qty" className="label mb-3">
            2. {type.qtyLabel} ({unitLabel(type.unit)})
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={type.minQty}
              max={type.maxQty}
              step={type.step}
              value={result.q}
              onChange={(e) => setQty(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer accent-[#C8A96A]"
              aria-label={type.qtyLabel}
              dir="ltr"
            />
            <input
              id="calc-qty"
              type="number"
              inputMode="decimal"
              min={type.minQty}
              max={type.maxQty}
              step={type.step}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="field w-28 text-center font-latin font-bold"
              dir="ltr"
              lang="en"
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            من <span className="font-latin">{formatNumber(type.minQty)}</span> إلى <span className="font-latin">{formatNumber(type.maxQty)}</span> {unitLabel(type.unit)}
          </p>
        </div>

        <fieldset>
          <legend className="label mb-3">3. مستوى التشطيب</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {calc.levels.map((l) => (
              <label
                key={l.id}
                className={`cursor-pointer rounded-btn border-2 px-4 py-3 text-center transition ${
                  l.id === level ? "border-emerald bg-emerald text-white" : "border-black/10 hover:border-emerald/40"
                }`}
              >
                <input type="radio" name="finishLevel" value={l.id} checked={l.id === level} onChange={() => setLevel(l.id)} className="sr-only" />
                <span className="block font-heading text-sm font-bold">{l.label}</span>
                <span className={`mt-0.5 block text-xs ${l.id === level ? "text-white/75" : "text-muted"}`}>{l.description}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between gap-6 bg-emerald p-5 text-white md:p-8" aria-live="polite">
        <div>
          <p className="flex items-center gap-2 text-sm text-gold">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            التكلفة التقديرية
          </p>
          <p className="mt-2 font-latin text-3xl font-bold text-gold md:text-4xl" dir="ltr">
            ${formatNumber(result.min)} – ${formatNumber(result.max)}
          </p>
          <p className="mt-1 text-sm text-white/70">
            {type.label} · <span className="font-latin">{formatNumber(result.q)}</span> {unitLabel(type.unit)} · {levelLabel}
          </p>

          <p className="mt-6 flex items-center gap-2 text-sm text-gold">
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            المدة المتوقعة للتنفيذ
          </p>
          <p className="mt-1 font-heading text-2xl font-bold">{result.duration}</p>
        </div>

        <div className="space-y-3">
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full !py-4 text-base">
            <WhatsAppIcon className="h-5 w-5" />
            اطلب كشفاً هندسياً وعرض سعر رسمي
          </a>
          <p className="flex gap-2 text-xs leading-6 text-white/70">
            <Info className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            {calc.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
