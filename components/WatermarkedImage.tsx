import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  code: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Image with a diagonal "مروج الشام | كود العقار" watermark baked into the
 * rendered layer to discourage other brokers from reusing the photos.
 */
export function WatermarkedImage({ src, alt, code, sizes, priority, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center" aria-hidden="true">
        <span className="-rotate-[18deg] whitespace-nowrap rounded-md border border-white/50 px-3 py-1 font-heading text-lg font-extrabold text-white opacity-30 drop-shadow md:text-2xl">
          مروج الشام | <span className="font-latin">{code}</span>
        </span>
      </div>
    </div>
  );
}
