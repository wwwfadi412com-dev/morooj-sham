interface Props {
  className?: string;
  /** "light" renders text in white for dark (emerald) backgrounds */
  variant?: "light" | "dark";
  showText?: boolean;
}

/**
 * Damascene arch + villa roofline + two meadow leaves over a hill line,
 * drawn in Champagne Gold.
 */
export function BrandEmblem({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none" stroke="#C8A96A" strokeLinecap="round" strokeLinejoin="round">
      {/* Damascene pointed arch */}
      <path d="M10 56V30C10 17 20 8 32 4c12 4 22 13 22 26v26" strokeWidth="3" />
      {/* Villa roofline */}
      <path d="M19 38l13-10 13 10" strokeWidth="2.6" />
      <path d="M23 35v11h18V35" strokeWidth="2.2" />
      <path d="M30 46v-5h4v5" strokeWidth="1.8" />
      {/* Hill line */}
      <path d="M6 56c8-5 16-6 26-3s18 2 26-2" strokeWidth="2.6" />
      {/* Meadow leaves */}
      <path d="M32 24c-4-3-5-8-3-12 4 2 6 7 3 12z" fill="#C8A96A" stroke="none" />
      <path d="M33 24c2-5 7-7 11-6-1 4-6 7-11 6z" fill="#C8A96A" stroke="none" opacity="0.8" />
    </svg>
  );
}

export function BrandLogo({ className = "", variant = "light", showText = true }: Props) {
  const main = variant === "light" ? "text-white" : "text-emerald";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandEmblem />
      {showText && (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className={`font-heading text-xl font-extrabold ${main}`}>مروج الشام</span>
          <span className="mt-1 font-latin text-[8.5px] font-semibold tracking-[0.18em] text-gold" dir="ltr">
            MOROOJ SHAM REAL ESTATE
          </span>
        </span>
      )}
    </span>
  );
}
