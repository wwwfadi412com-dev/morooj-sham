import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";
import { ArticleBody } from "@/components/ArticleBody";
import { pages } from "@/data/content";

const about = pages.about;

export const metadata: Metadata = {
  title: about.seo.title,
  description: about.seo.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={about.title}
        subtitle={about.subtitle}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: about.title, href: "/about" },
        ]}
      />
      <div className="container max-w-4xl space-y-14 py-12">
        <ArticleBody html={about.bodyHtml} />

        {about.workflow.length > 0 && (
          <section>
            <h2 className="section-title mb-6">{about.workflowTitle}</h2>
            <ol className="space-y-4">
              {about.workflow.map((step, i) => (
                <li key={step.title} className="card flex gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-latin font-bold text-emerald">{i + 1}</span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {about.faqs.length > 0 && <FAQ items={about.faqs} />}
      </div>
    </>
  );
}
