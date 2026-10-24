import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { ArticleBody } from "@/components/ArticleBody";
import { FAQ } from "@/components/FAQ";
import { JsonLd, articleSchema } from "@/components/JsonLd";
import { articles, getArticle } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { assetSrc } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.seoTitle || a.title,
    description: a.seoDescription || a.excerpt,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", images: [a.image], publishedTime: a.publishedAt },
  };
}

export default async function ArticlePage({ params }: Params) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article>
      <JsonLd data={articleSchema(a)} />
      <div className="container max-w-4xl py-8">
        <Breadcrumbs
          items={[
            { name: "الرئيسية", href: "/" },
            { name: "دليل العقارات", href: "/blog" },
            { name: a.category, href: `/blog/${a.slug}` },
          ]}
        />
        <header className="mt-5">
          <p className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded bg-gold/20 px-2 py-0.5 font-bold text-emerald">{a.category}</span>
            <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-latin">{a.readMinutes}</span> دقائق قراءة
            </span>
          </p>
          <h1 className="text-2xl font-extrabold !leading-[1.45] md:text-4xl">{a.title}</h1>
          <p className="mt-4 text-lg text-muted">{a.excerpt}</p>
        </header>
        <div className="relative mt-6 aspect-[16/8] overflow-hidden rounded-card">
          <Image src={assetSrc(a.image)} alt={a.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
        </div>

        <div className="mt-8">
          <KeyTakeaways items={a.keyTakeaways} />
        </div>

        <div className="mt-6">
          <ArticleBody html={a.body} />
        </div>

        <div className="mt-12">
          <FAQ items={a.faqs} />
        </div>

        <div className="mt-12 rounded-card bg-emerald p-6 text-center text-white md:p-8">
          <h2 className="text-xl font-extrabold text-white md:text-2xl">تحتاج استشارة قبل الشراء؟</h2>
          <p className="mt-2 text-white/80">مستشارنا العقاري يجيبك مجاناً عن أسئلتك حول الأسعار والطابو والمناطق.</p>
          <Link href="/request-property" className="btn-gold mt-5">
            اطلب استشارة أو عقاراً بمواصفاتك
          </Link>
        </div>
      </div>

      <section className="container py-10" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title mb-6">
          مقالات ذات صلة
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {more.map((m) => (
            <Link key={m.slug} href={`/blog/${m.slug}`} className="card p-5 hover:shadow-xl">
              <p className="text-xs font-bold text-gold">{m.category}</p>
              <h3 className="mt-2 line-clamp-3 font-bold leading-7">{m.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
