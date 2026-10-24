import type { Area, Article, FAQ, Property } from "@/data/types";
import { areas } from "@/data/areas";
import { deedLabels, typeLabels } from "@/data/taxonomy";
import { SITE, absoluteAsset, absoluteUrl } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape "<" to avoid breaking out of the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export interface Crumb {
  name: string;
  href: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.href),
  })),
});

export const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const placeSchema = (a: Area) => ({
  "@type": "Place",
  name: `${a.fullName}، ريف دمشق`,
  geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "Organization"],
  "@id": absoluteUrl("/#organization"),
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: SITE.url,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteAsset(SITE.ogImage || "/og.png"),
  description: SITE.description,
  telephone: `+${SITE.whatsapp}`,
  email: SITE.email,
  address: { "@type": "PostalAddress", addressRegion: "ريف دمشق", addressCountry: "SY" },
  areaServed: [
    ...areas.map(placeSchema),
    { "@type": "AdministrativeArea", name: "ريف دمشق (Rif Dimashq)" },
  ],
  knowsLanguage: ["ar", "en"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${SITE.whatsapp}`,
    contactType: "sales",
    availableLanguage: ["Arabic", "English"],
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: SITE.url,
  name: SITE.name,
  inLanguage: "ar",
  publisher: { "@id": absoluteUrl("/#organization") },
  potentialAction: {
    "@type": "SearchAction",
    target: `${absoluteUrl("/search")}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export function listingSchema(p: Property) {
  const area = areas.find((a) => a.slug === p.area)!;
  const url = absoluteUrl(`/property/${p.slug}`);
  const availability = p.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut";
  const unitCode = p.transaction === "daily-rent" ? "DAY" : p.transaction === "long-term-rent" ? "MON" : undefined;
  return [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: p.title,
      url,
      datePosted: p.publishedAt,
      image: p.images.map(absoluteAsset),
      description: p.description.join(" "),
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "USD",
        availability,
        businessFunction: p.transaction === "sale" ? "https://schema.org/Sell" : "https://schema.org/LeaseOut",
        ...(unitCode && { priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "USD", unitCode } }),
        seller: { "@id": absoluteUrl("/#organization") },
      },
      about: {
        "@type": p.type === "apartment" ? "Apartment" : p.type === "land" ? "Place" : "SingleFamilyResidence",
        name: `${typeLabels[p.type].single} - ${area.fullName}`,
        ...(p.bedrooms && { numberOfRooms: p.bedrooms }),
        ...(p.bathrooms && { numberOfBathroomsTotal: p.bathrooms }),
        ...((p.builtArea || p.landArea) && {
          floorSize: { "@type": "QuantitativeValue", value: p.builtArea ?? p.landArea, unitCode: "MTK" },
        }),
        address: { "@type": "PostalAddress", addressLocality: area.fullName, addressRegion: "ريف دمشق", addressCountry: "SY" },
        geo: { "@type": "GeoCoordinates", latitude: area.geo.lat, longitude: area.geo.lng },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.title,
      sku: p.code,
      image: p.images.map(absoluteAsset),
      description: p.description[0],
      brand: { "@type": "Brand", name: SITE.name },
      category: typeLabels[p.type].single,
      additionalProperty: [
        { "@type": "PropertyValue", name: "نوع الملكية", value: deedLabels[p.deed] },
        ...(p.landArea ? [{ "@type": "PropertyValue", name: "المساحة الإجمالية", value: p.landArea, unitCode: "MTK" }] : []),
      ],
      offers: { "@type": "Offer", url, price: p.price, priceCurrency: "USD", availability },
    },
  ];
}

export const articleSchema = (a: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.excerpt,
  image: absoluteAsset(a.image),
  datePublished: a.publishedAt,
  dateModified: a.publishedAt,
  inLanguage: "ar",
  mainEntityOfPage: absoluteUrl(`/blog/${a.slug}`),
  author: { "@id": absoluteUrl("/#organization") },
  publisher: { "@id": absoluteUrl("/#organization") },
});
