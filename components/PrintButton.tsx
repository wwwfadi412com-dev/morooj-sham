"use client";

import { Printer } from "lucide-react";

/** Opens the browser print dialog; "Save as PDF" there produces the brochure. */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-outline w-full print:hidden">
      <Printer className="h-4 w-4" aria-hidden="true" />
      تحميل بطاقة العقار PDF / طباعة
    </button>
  );
}
