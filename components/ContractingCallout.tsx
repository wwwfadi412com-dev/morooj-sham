import Link from "next/link";
import { HardHat } from "lucide-react";
import type { Property } from "@/data/types";
import { pages } from "@/data/content";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Shown on land and shell (needs-finishing) listings: offer to deliver it turnkey. */
export function ContractingCallout({ p }: { p: Property }) {
  const c = pages.contracting.propertyCallout;
  const message = `${pages.contracting.calculator.whatsappMessage}\n\nبخصوص العقار كود [${p.code}] (${p.title})`;
  return (
    <aside className="relative overflow-hidden rounded-card border-2 border-gold bg-emerald p-6 text-white shadow-soft print:hidden md:p-7" aria-label={c.title}>
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10" aria-hidden="true" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold">
          <HardHat className="h-7 w-7 text-emerald" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-gold">{c.title}</h2>
          <p className="mt-2 text-sm leading-7 text-white/85">{c.text}</p>
        </div>
      </div>
      <div className="relative mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-gold">
          <WhatsAppIcon className="h-5 w-5" />
          {c.button}
        </a>
        <Link href="/contracting#calculator" className="btn-outline !text-white">
          {c.secondary}
        </Link>
      </div>
    </aside>
  );
}
