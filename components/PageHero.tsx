import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "./JsonLd";
import { assetSrc } from "@/lib/site";

interface Props {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  image?: string;
  children?: ReactNode;
}

/** Emerald hero band used on hubs, area and service pages. */
export function PageHero({ title, subtitle, crumbs, image, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-emerald text-white">
      {image && (
        <>
          <Image src={assetSrc(image)} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-emerald/80" />
        </>
      )}
      <div className="container relative py-10 md:py-14">
        <Breadcrumbs items={crumbs} light />
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold !leading-[1.35] text-white md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/80 md:text-lg">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
