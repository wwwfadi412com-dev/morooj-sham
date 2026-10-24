import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { customPages, getCustomPage } from "@/data/content";
import { assetSrc } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Free-form pages created in /admin (content/custom-pages), e.g. privacy policy. */
export function generateStaticParams() {
  return customPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getCustomPage((await params).slug);
  if (!p) return {};
  return {
    title: p.seoTitle || p.title,
    description: p.seoDescription,
    alternates: { canonical: `/page/${p.slug}` },
    ...(p.image && { openGraph: { images: [p.image] } }),
  };
}

export default async function CustomPage({ params }: Params) {
  const p = getCustomPage((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero
        title={p.title}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: p.title, href: `/page/${p.slug}` },
        ]}
      />
      <div className="container max-w-4xl py-12">
        {p.image && (
          <div className="relative mb-8 aspect-[16/8] overflow-hidden rounded-card">
            <Image src={assetSrc(p.image)} alt={p.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>
        )}
        <ArticleBody html={p.body} />
      </div>
    </>
  );
}
