import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Building2, CheckCircle2, Droplets, Hammer, PaintRoller, Ruler, Sun, Video } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CostEstimator } from "@/components/CostEstimator";
import { BeforeAfter } from "@/components/BeforeAfter";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { areas, getArea } from "@/data/areas";
import { pages, projects } from "@/data/content";
import type { ProjectCategory, ServiceIcon } from "@/data/types";
import { SITE, absoluteUrl, assetSrc, whatsappLink } from "@/lib/site";

const c = pages.contracting;

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: c.seo.description,
  alternates: { canonical: "/contracting" },
  openGraph: { images: [c.hero.image] },
};

const ICONS: Record<ServiceIcon, typeof Building2> = {
  building: Building2,
  paint: PaintRoller,
  droplets: Droplets,
  hammer: Hammer,
  sun: Sun,
  ruler: Ruler,
};

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  build: "بناء",
  finishing: "إكساء",
  pool: "مسابح وتجهيز",
  renovation: "ترميم",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": absoluteUrl("/contracting/#business"),
  name: `${SITE.name} — التعهدات والإكساء`,
  url: absoluteUrl("/contracting"),
  description: c.seo.description,
  telephone: `+${SITE.whatsapp}`,
  parentOrganization: { "@id": absoluteUrl("/#organization") },
  areaServed: areas.map((a) => ({ "@type": "Place", name: `${a.fullName}، ريف دمشق` })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: c.servicesTitle,
    itemListElement: c.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
  },
};

export default function ContractingPage() {
  const quoteLink = whatsappLink(c.calculator.whatsappMessage);
  return (
    <>
      <JsonLd data={serviceSchema} />
      <PageHero
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        image={c.hero.image}
        crumbs={[
          { name: "الرئيسية", href: "/" },
          { name: "التعهدات والإكساء", href: "/contracting" },
        ]}
      >
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-emerald/40 px-4 py-1.5 text-sm text-gold">
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          {c.hero.badge}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#calculator" className="btn-gold">
            احسب تكلفة مشروعك
          </a>
          <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            {c.cta.button}
          </a>
        </div>
      </PageHero>

      {/* Services */}
      <section className="container py-14" aria-labelledby="services-title">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 id="services-title" className="section-title">
            {c.servicesTitle}
          </h2>
          <p className="mt-2 text-muted">{c.servicesSubtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {c.services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Building2;
            return (
              <article key={s.title} className="card group overflow-hidden">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image src={assetSrc(s.image)} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald/80 to-transparent" />
                  <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-emerald">
                    <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  </span>
                  <span className="absolute bottom-4 left-4 font-latin text-4xl font-bold text-white/30">0{i + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-charcoal/80">{s.text}</p>
                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-1.5 text-sm font-bold text-emerald">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Weekly documentation for expatriates */}
      <section className="bg-emerald py-14 text-white" aria-labelledby="weekly-title">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Video className="mx-auto mb-3 h-10 w-10 text-gold" aria-hidden="true" />
            <h2 id="weekly-title" className="text-2xl font-extrabold text-white md:text-3xl">
              {c.weekly.title}
            </h2>
            <p className="mt-2 text-white/75">{c.weekly.subtitle}</p>
          </div>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.weekly.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-card border border-gold/30 bg-white/5 p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold font-latin text-lg font-bold text-emerald">{i + 1}</span>
                <h3 className="text-lg font-bold text-gold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="container scroll-mt-24 py-14" aria-labelledby="calc-title">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 id="calc-title" className="section-title">
            {c.calculator.title}
          </h2>
          <p className="mt-2 text-muted">{c.calculator.subtitle}</p>
        </div>
        <CostEstimator calc={c.calculator} />
      </section>

      {/* Projects before / after */}
      {projects.length > 0 && (
        <section className="bg-white py-14" aria-labelledby="projects-title">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 id="projects-title" className="section-title">
                {c.projectsTitle}
              </h2>
              <p className="mt-2 text-muted">{c.projectsSubtitle}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((p) => (
                <article key={p.slug} className="overflow-hidden rounded-card border border-black/5 bg-alabaster shadow-soft">
                  <BeforeAfter before={p.before} after={p.after} alt={p.title} />
                  <div className="p-5">
                    <p className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded bg-emerald px-2 py-0.5 font-bold text-white">{CATEGORY_LABELS[p.category]}</span>
                      <span className="text-muted">{getArea(p.area)?.fullName}</span>
                      {p.duration && <span className="text-muted">· مدة التنفيذ: {p.duration}</span>}
                      {p.isExample && <span className="rounded border border-gold px-2 py-0.5 font-bold text-gold-hover">مثال توضيحي</span>}
                    </p>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    {p.description && <p className="mt-1 text-sm leading-7 text-charcoal/80">{p.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container space-y-14 py-14">
        {c.faqs.length > 0 && <FAQ items={c.faqs} title="أسئلة شائعة عن التعهدات والإكساء" />}

        <section className="relative overflow-hidden rounded-card bg-emerald p-8 text-center md:p-12">
          <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#C8A96A,transparent_40%),radial-gradient(circle_at_80%_80%,#C8A96A,transparent_40%)]" />
          <div className="relative">
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">{c.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">{c.cta.text}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <WhatsAppIcon className="h-5 w-5" />
                {c.cta.button}
              </a>
              <Link href="/price-index" className="btn-outline !text-white">
                مؤشر أسعار العقارات والإكساء
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
