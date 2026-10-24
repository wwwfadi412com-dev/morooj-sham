// Compiles the CMS-editable JSON files in content/ into data/generated/*.json,
// which the site imports. Runs before every build (npm "prebuild"/"predev").
// Any invalid entry fails the build, so a bad edit in /admin never goes live.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "content");
const OUT = join(ROOT, "data", "generated");

const TYPES = ["farm", "villa", "apartment", "land"];
const TRANSACTIONS = ["sale", "daily-rent", "long-term-rent"];
const STATUSES = ["available", "sold", "rented"];
const DEEDS = ["green-tabu", "agricultural-tabu", "court-ruling", "notary"];
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const errors = [];
const check = (file, cond, msg) => {
  if (!cond) errors.push(`${file}: ${msg}`);
};

function readJson(rel) {
  const full = join(CONTENT, rel);
  if (!existsSync(full)) {
    errors.push(`content/${rel}: الملف غير موجود`);
    return {};
  }
  try {
    return JSON.parse(readFileSync(full, "utf8"));
  } catch (e) {
    errors.push(`content/${rel}: ملف JSON غير صالح (${e.message})`);
    return {};
  }
}

function readCollection(dir) {
  return readdirSync(join(CONTENT, dir))
    .filter((f) => f.endsWith(".json"))
    .map((file) => ({ file: `content/${dir}/${file}`, slug: file.replace(/\.json$/, "").toLowerCase(), data: readJson(`${dir}/${file}`) }));
}

/** Drop null / "" values the CMS writes for empty optional fields. */
const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== ""));
const toDate = (v) => (v ? String(v).slice(0, 10) : new Date().toISOString().slice(0, 10));
const strList = (v) =>
  Array.isArray(v) ? v.map((x) => (typeof x === "string" ? x : Object.values(x ?? {})[0])).filter((x) => typeof x === "string" && x.trim()) : [];
const num = (v) => (v === null || v === undefined || v === "" ? undefined : Number(v));
const md = (s) => marked.parse(String(s ?? ""), { gfm: true, async: false });
const faqList = (v) => (Array.isArray(v) ? v.filter((f) => f?.q && f?.a).map((f) => ({ q: f.q, a: f.a })) : []);
const linkList = (v) => (Array.isArray(v) ? v.filter((l) => l?.label && l?.href).map((l) => ({ label: l.label, href: l.href })) : []);

/* ---------- settings ---------- */
const site = readJson("settings/site.json");
for (const k of ["name", "nameEn", "shortName", "defaultTitle", "description", "whatsapp", "email"]) check("content/settings/site.json", site[k], `الحقل ${k} مطلوب`);
site.whatsapp = String(site.whatsapp ?? "").replace(/\D/g, "").replace(/^00/, "");
check("content/settings/site.json", /^\d{9,15}$/.test(site.whatsapp), "رقم الواتساب يجب أن يكون أرقاماً بالصيغة الدولية، مثل 963991111474");

const navigation = readJson("settings/navigation.json");
navigation.header = linkList(navigation.header);
navigation.footerLinks = linkList(navigation.footerLinks);

/* ---------- pages ---------- */
const pages = {};
for (const name of ["home", "about", "submit-property", "request-property", "listings", "categories"]) {
  pages[name] = readJson(`pages/${name}.json`);
}
pages.home.faqs = faqList(pages.home.faqs);
pages.about.faqs = faqList(pages.about.faqs);
pages.about.bodyHtml = md(pages.about.body);
pages["request-property"].introHtml = md(pages["request-property"].intro);
pages.listings.dailyFarms.faqs = faqList(pages.listings.dailyFarms?.faqs);
for (const t of TYPES) check("content/pages/categories.json", pages.categories[t]?.single && pages.categories[t]?.saleTitle, `بيانات النوع ${t} ناقصة`);

/* ---------- areas ---------- */
const areaPrefixes = new Map();
const areas = readCollection("areas")
  .map(({ file, slug, data }) => {
    const a = {
      ...data,
      slug,
      codePrefix: String(data.codePrefix ?? "").trim().toUpperCase(),
      order: num(data.order) ?? 99,
      geo: { lat: num(data.geo?.lat) ?? 33.51, lng: num(data.geo?.lng) ?? 36.29 },
      highlights: strList(data.highlights),
      keyTakeaways: strList(data.keyTakeaways),
      overview: strList(data.overview),
      priceGuide: Array.isArray(data.priceGuide) ? data.priceGuide.filter((g) => g?.label && g?.value) : [],
      faqs: faqList(data.faqs),
    };
    delete a.urlSlug;
    check(file, SLUG_RE.test(slug), "رابط المنطقة يجب أن يكون حروفاً إنجليزية صغيرة وشرطات");
    for (const k of ["name", "fullName", "distance", "tagline", "image", "water", "commonDeeds"]) check(file, a[k], `الحقل ${k} مطلوب`);
    check(file, /^[A-Z]{1,3}$/.test(a.codePrefix), "بادئة الكود يجب أن تكون 1–3 حروف إنجليزية، مثل D أو DR");
    if (areaPrefixes.has(a.codePrefix)) errors.push(`${file}: بادئة الكود ${a.codePrefix} مستخدمة في ${areaPrefixes.get(a.codePrefix)}`);
    areaPrefixes.set(a.codePrefix, file);
    check(file, a.overview.length > 0, "النبذة مطلوبة");
    return a;
  })
  .sort((x, y) => x.order - y.order);
const AREAS = areas.map((a) => a.slug);
check("content/areas", AREAS.length > 0, "يجب وجود منطقة واحدة على الأقل");

/* ---------- properties ---------- */
const codes = new Map();
const properties = readCollection("properties").map(({ file, slug, data }) => {
  const p = clean({
    ...data,
    slug,
    code: String(data.code ?? "").trim().toUpperCase(),
    featured: Boolean(data.featured),
    price: num(data.price),
    capacity: num(data.capacity),
    landArea: num(data.landArea),
    builtArea: num(data.builtArea),
    bedrooms: num(data.bedrooms),
    bathrooms: num(data.bathrooms),
    amenities: strList(data.amenities),
    description: strList(data.description),
    images: strList(data.images),
    publishedAt: toDate(data.publishedAt),
  });
  check(file, SLUG_RE.test(slug), `اسم الملف يجب أن يكون حروفاً إنجليزية صغيرة وشرطات`);
  check(file, p.title, "العنوان مطلوب");
  check(file, /^[A-Z]{1,3}-\d+$/.test(p.code), `كود العقار غير صالح "${p.code}" (مثال صحيح: D-105)`);
  if (codes.has(p.code)) errors.push(`${file}: الكود ${p.code} مكرر (مستخدم في ${codes.get(p.code)})`);
  codes.set(p.code, file);
  check(file, TYPES.includes(p.type), "نوع العقار غير صالح");
  check(file, TRANSACTIONS.includes(p.transaction), "نوع العملية غير صالح");
  check(file, AREAS.includes(p.area), `المنطقة "${p.area}" غير موجودة في قسم المناطق`);
  check(file, STATUSES.includes(p.status), "حالة العقار غير صالحة");
  check(file, DEEDS.includes(p.deed), "نوع الملكية غير صالح");
  check(file, Number.isFinite(p.price) && p.price > 0, "السعر مطلوب ويجب أن يكون رقماً أكبر من صفر");
  check(file, p.images.length > 0, "أضف صورة واحدة على الأقل");
  check(file, p.description.length > 0, "الوصف مطلوب");
  for (const k of ["deedDetail", "locationNote", "water", "electricity"]) check(file, p[k], `الحقل ${k} مطلوب`);
  return p;
});

/* ---------- articles ---------- */
const articles = readCollection("articles").map(({ file, slug, data }) => {
  const a = clean({
    slug,
    title: data.title,
    excerpt: data.excerpt,
    image: data.image,
    publishedAt: toDate(data.publishedAt),
    readMinutes: num(data.readMinutes) ?? Math.max(2, Math.round(String(data.body ?? "").split(/\s+/).length / 200)),
    category: data.category || "مقالات",
    keyTakeaways: strList(data.keyTakeaways),
    body: md(data.body),
    faqs: faqList(data.faqs),
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
  });
  check(file, SLUG_RE.test(slug), "رابط المقال يجب أن يكون حروفاً إنجليزية صغيرة وشرطات");
  check(file, a.title, "العنوان مطلوب");
  check(file, a.excerpt, "الملخص مطلوب");
  check(file, a.image, "الصورة الرئيسية مطلوبة");
  check(file, String(data.body ?? "").trim(), "نص المقال مطلوب");
  return a;
});

/* ---------- custom pages ---------- */
const customPages = readCollection("custom-pages").map(({ file, slug, data }) => {
  const p = clean({ slug, title: data.title, seoTitle: data.seoTitle, seoDescription: data.seoDescription, image: data.image, body: md(data.body) });
  check(file, SLUG_RE.test(slug), "رابط الصفحة يجب أن يكون حروفاً إنجليزية صغيرة وشرطات");
  check(file, p.title, "العنوان مطلوب");
  check(file, String(data.body ?? "").trim(), "محتوى الصفحة مطلوب");
  return p;
});
check("content/custom-pages", customPages.length > 0, "يجب وجود صفحة واحدة على الأقل");

if (errors.length) {
  console.error("\n✖ أخطاء في المحتوى (لم يُنشر الموقع):\n");
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const write = (name, data) => writeFileSync(join(OUT, `${name}.json`), JSON.stringify(data, null, 2));
write("site", site);
write("navigation", navigation);
write("pages", pages);
write("areas", areas);
write("properties", properties);
write("articles", articles);
write("custom-pages", customPages);
console.log(`✓ content: ${areas.length} areas, ${properties.length} properties, ${articles.length} articles, ${customPages.length} pages`);
