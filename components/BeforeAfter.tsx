"use client";

import { useState } from "react";
import Image from "next/image";
import { assetSrc } from "@/lib/site";

/**
 * Before/after comparison: the "before" photo sits on top, clipped to the
 * slider position. A native range input drives it, so it works with touch,
 * mouse and keyboard.
 */
export function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] select-none overflow-hidden bg-emerald/10" dir="ltr">
      <Image src={assetSrc(after)} alt={`${alt} — بعد التنفيذ`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={assetSrc(before)} alt={`${alt} — قبل التنفيذ`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold shadow-[0_0_8px_rgba(0,0,0,0.4)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-gold font-latin text-sm font-bold text-emerald shadow-lg">
          ⇆
        </span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 font-heading text-xs font-bold text-white">قبل</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded bg-gold px-2 py-0.5 font-heading text-xs font-bold text-emerald">بعد</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="مقارنة قبل وبعد"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
