"use client";

import { useState, type ReactNode } from "react";

/** Simple tab switcher; panels are server-rendered and passed in. */
export function ListingTabs({ tabs }: { tabs: { id: string; label: string; count: number; panel: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div>
      <div role="tablist" aria-label="نوع العملية" className="mb-6 inline-flex rounded-btn bg-white p-1 shadow-soft">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded-btn px-4 py-2 font-heading text-sm font-bold transition ${
              active === t.id ? "bg-emerald text-white" : "text-emerald hover:bg-alabaster"
            }`}
          >
            {t.label} <span className="font-latin opacity-70">({t.count})</span>
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id}>
          {t.panel}
        </div>
      ))}
    </div>
  );
}
