"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export interface Field {
  name: string;
  label: string;
  type?: "text" | "tel" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
}

interface Props {
  /** First line of the WhatsApp message */
  heading: string;
  fields: Field[];
  submitLabel: string;
  note?: string;
}

/**
 * Lead capture form. With no backend on the free tier, submissions are
 * composed into a structured WhatsApp message to the platform owner, which
 * keeps every lead in one channel. Swap handleSubmit for an API call later.
 */
export function LeadForm({ heading, fields, submitLabel, note }: Props) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = fields
      .map((f) => {
        const v = String(data.get(f.name) ?? "").trim();
        return v ? `• ${f.label}: ${v}` : null;
      })
      .filter(Boolean);
    const msg = `${heading}\n\n${lines.join("\n")}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-meadow" aria-hidden="true" />
        <h2 className="mb-2 text-xl font-extrabold">تم تجهيز طلبك</h2>
        <p className="mb-5 text-muted">
          فُتحت محادثة واتساب مع فريق مروج الشام وفيها تفاصيل طلبك. اضغط «إرسال» داخل واتساب لإكمال الطلب، وسيتواصل معك مستشارنا خلال ساعات.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-outline">
          تعديل الطلب أو إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4 p-5 md:grid-cols-2 md:p-8">
      {fields.map((f) => {
        const id = `lf-${f.name}`;
        const common = { id, name: f.name, required: f.required, placeholder: f.placeholder, className: "field" };
        return (
          <div key={f.name} className={f.full || f.type === "textarea" ? "md:col-span-2" : ""}>
            <label htmlFor={id} className="label">
              {f.label} {f.required && <span className="text-red-600">*</span>}
            </label>
            {f.type === "select" ? (
              <select {...common} defaultValue="">
                <option value="" disabled>
                  اختر...
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={4} />
            ) : (
              <input {...common} type={f.type ?? "text"} dir={f.type === "tel" ? "ltr" : undefined} inputMode={f.type === "number" ? "numeric" : undefined} />
            )}
          </div>
        );
      })}
      <div className="md:col-span-2">
        <button type="submit" className="btn-whatsapp w-full !py-4 text-base">
          <WhatsAppIcon className="h-5 w-5" />
          {submitLabel}
        </button>
        {note && <p className="mt-3 text-center text-xs text-muted">{note}</p>}
      </div>
    </form>
  );
}
