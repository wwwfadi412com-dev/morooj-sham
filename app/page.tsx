import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, Camera, FileSearch, Globe2, HandCoins, Handshake, MapPin, ShieldCheck, Star } from "lucide-react";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyGrid } from "@/components/PropertyCard";
import { FAQ } from "@/components/FAQ";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { areas } from "@/data/areas";
import { articles } from "@/data/articles";
import { countByArea, filterProperties } from "@/data/properties";
import { formatDate } from "@/lib/format";
import { assetSrc } from "@/lib/site";
import { pages } from "@/data/content";
import type { TrustIcon } from "@/data/types";

const home = pages.home;

export const metadata: Metadata = {
  title: { absolute: home.seo.title },
  description: home.seo.description,
  alternates: { canonical: "/" },
};

const ICONS: Record<TrustIcon, typeof MapPin> = {
  "map-pin": MapPin,
  "file-search": FileSearch,
  "hand-coins": HandCoins,
  globe: Globe2,
  shield: ShieldCheck,
  camera: Camera,
  handshake: Handshake,
  star: Star,
};

export default function HomePage() {
  const forSale = filterProperties({ transaction: "sale" }).filter((p) => p.status === "available").slice(0, 6);
  const daily = filterProperties({ transaction: "daily-rent" }).slice(0, 3);

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image src={assetSrc(home.hero.image)} alt={home.hero.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-emerald/65" />
        <div className="container py-16 md:py-28">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-emerald/40 px-4 py-1.5 text-sm text-gold backdrop-blur">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            {home.hero.badge}
          </p>
          <h1 className="max-w-3xl text-3xl font-extrabold !leading-[1.3] text-white md:text-5xl">
            {home.hero.title} <span className="text-gold">{home.hero.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {home.hero.subtitle}
          </p>
          <div className="mt-8 max-w-4xl">
            <SearchFilter />
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="container py-16" aria-labelledby="areas-title">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 id="areas-title" className="section-title">
              {home.areasSection.title}
            </h2>
            <p className="mt-2 text-muted">{home.areasSection.subtitle}</p>
          </div>
          <Link href="/areas" className="hidden text-sm font-bold text-meadow hover:text-emerald md:block">
            كل المناطق ←
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <Link key={a.slug} href={`/areas/${a.slug}`} className="card group relative block aspect-[4/5] overflow-hidden">
              <Image src={assetSrc(a.image.replace("w=1600", "w=700"))} alt={`عقارات ${a.fullName}`} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="mb-2 inline-block rounded bg-gold px-2 py-0.5 text-xs font-bold text-emerald">
                  <span className="font-latin">{countByArea(a.slug)}</span> عقار متاح
                </span>
                <h3 className="text-2xl font-extrabold text-white">{a.fullName}</h3>
                <p className="mt-1 text-sm text-white/80">{a.tagline}</p>
                <p className="mt-3 flex items-center gap-1 text-sm font-bold text-gold">
                  استكشف المنطقة <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" aria-hidden="true" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* For sale */}
      <section className="bg-white py-16" aria-labelledby="sale-title">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="sale-title" className="section-title">
              {home.saleSection.title}
            </h2>
            <Link href="/for-sale" className="text-sm font-bold text-meadow hover:text-emerald">
              كل العقارات ←
            </Link>
          </div>
          <PropertyGrid items={forSale} />
        </div>
      </section>

      {/* Daily rentals */}
      <section className="container py-16" aria-labelledby="daily-title">
        <div className="mb-8 rounded-card bg-emerald p-6 text-white md:flex md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-sm font-bold text-gold">{home.dailySection.eyebrow}</p>
            <h2 id="daily-title" className="mt-1 text-2xl font-extrabold text-white md:text-3xl">
              {home.dailySection.title}
            </h2>
            <p className="mt-2 text-white/80">{home.dailySection.text}</p>
          </div>
          <Link href="/for-rent/daily-farms" className="btn-gold mt-5 md:mt-0">
            {home.dailySection.button}
          </Link>
        </div>
        <PropertyGrid items={daily} />
      </section>

      {/* Trust */}
      <section className="bg-white py-16" aria-labelledby="trust-title">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-gold" aria-hidden="true" />
            <h2 id="trust-title" className="section-title">
              {home.trust.title}
            </h2>
            <p className="mt-2 text-muted">{home.trust.subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.trust.items.map((t) => {
              const Icon = ICONS[t.icon] ?? ShieldCheck;
              return (
              <div key={t.title} className="rounded-card border border-gold/30 bg-alabaster p-6 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald">
                  <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-lg font-bold">{t.title}</h3>
                <p className="text-sm text-muted">{t.text}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog + FAQ */}
      <section className="container grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="section-title">{home.blogSection.title}</h2>
            <Link href="/blog" className="text-sm font-bold text-meadow hover:text-emerald">
              كل المقالات ←
            </Link>
          </div>
          <div className="space-y-4">
            {articles.slice(0, 4).map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="card group flex gap-4 overflow-hidden p-3">
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-md">
                  <Image src={assetSrc(a.image.replace("w=1400", "w=300"))} alt="" fill sizes="112px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gold">
                    {a.category} · {formatDate(a.publishedAt)}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-7 group-hover:text-meadow">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <FAQ items={home.faqs} title={home.faqTitle} />
      </section>

      {/* CTA */}
      <section className="container">
        <div className="relative overflow-hidden rounded-card bg-emerald p-8 text-center md:p-12">
          <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#C8A96A,transparent_40%),radial-gradient(circle_at_80%_80%,#C8A96A,transparent_40%)]" />
          <div className="relative">
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">{home.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">{home.cta.text}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/request-property" className="btn-gold">
                {home.cta.primaryLabel}
              </Link>
              <Link href="/submit-property" className="btn-outline !text-white">
                {home.cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
