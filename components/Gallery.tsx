"use client";

import { useState } from "react";
import Image from "next/image";
import { WatermarkedImage } from "./WatermarkedImage";

export function Gallery({ images, code, title, dimmed = false }: { images: string[]; code: string; title: string; dimmed?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <WatermarkedImage
        src={images[active]}
        alt={`${title} - صورة ${active + 1} - كود ${code}`}
        code={code}
        sizes="(max-width: 1024px) 100vw, 66vw"
        priority={active === 0}
        className={`aspect-[16/10] rounded-card bg-emerald/10 ${dimmed ? "grayscale" : ""}`}
      />
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" role="tablist" aria-label="صور العقار">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`عرض الصورة ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition md:h-20 md:w-28 ${
                i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
