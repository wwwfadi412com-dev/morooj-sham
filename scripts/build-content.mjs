// Compiles the CMS-editable JSON files in content/ into data/generated/*.json,
// which the site imports. Runs before every build (npm "prebuild"/"predev").
// Any invalid entry fails the build, so a bad edit in /admin never goes live.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

const ROOT = process.cwd();
const OUT = join(ROOT, "data", "generated");

const TYPES = ["farm", "villa", "apartment", "land"];
const TRANSACTIONS = ["sale", "daily-rent", "long-term-rent"];
const STATUSES = ["available", "sold", "rented"];
const DEEDS = ["green-tabu", "agricultural-tabu", "court-ruling", "notary"];
const AREAS = ["darkhabiyah", "drousha", "khan-al-shih", "artouz"];

const errors = [];

function readCollection(dir) {
  const full = join(ROOT, "content", dir);
  return readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const slug = file.replace(/\.json$/, "").toLowerCase();
      try {
        return { file: `content/${dir}/${file}`, slug, data: JSON.parse(readFileSync(join(full, file), "utf8")) };
      } catch (e) {
        errors.push(`content/${dir}/${file}: ملف JSON غير صالح (${e.message})`);
        return null;
      }
    })
    .filter(Boolean);
}

/** Drop null / "" values the CMS writes for empty optional fields. */
function clean(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== ""));
}

const toDate = (v) => (v ? String(v).slice(0, 10) : new Date().toISOString().slice(0, 10));
const strList = (v) => (Array.isArray(v) ? v.map((x) => (typeof x === "string" ? x : Object.values(x ?? {})[0])).filter((x) => typeof x === "string" && x.trim()) : []);
const num = (v) => (v === null || v === undefined || v === "" ? undefined : Number(v));

function check(file, cond, msg) {
  if (!cond) errors.push(`${file}: ${msg}`);
}

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
  check(file, p.title, "العنوان مطلوب");
  check(file, /^[A-Z]{1,3}-\d+$/.test(p.code), `كود العقار غير صالح "${p.code}" (مثال صحيح: D-105)`);
  if (codes.has(p.code)) errors.push(`${file}: الكود ${p.code} مكرر (مستخدم في ${codes.get(p.code)})`);
  codes.set(p.code, file);
  check(file, TYPES.includes(p.type), "نوع العقار غير صالح");
  check(file, TRANSACTIONS.includes(p.transaction), "نوع العملية غير صالح");
  check(file, AREAS.includes(p.area), "المنطقة غير صالحة");
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
  const a = {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    image: data.image,
    publishedAt: toDate(data.publishedAt),
    readMinutes: num(data.readMinutes) ?? Math.max(2, Math.round(String(data.body ?? "").split(/\s+/).length / 200)),
    category: data.category || "مقالات",
    keyTakeaways: strList(data.keyTakeaways),
    body: marked.parse(String(data.body ?? ""), { gfm: true, async: false }),
    faqs: (data.faqs ?? []).filter((f) => f?.q && f?.a).map((f) => ({ q: f.q, a: f.a })),
  };
  check(file, a.title, "العنوان مطلوب");
  check(file, a.excerpt, "الملخص مطلوب");
  check(file, a.image, "الصورة الرئيسية مطلوبة");
  check(file, String(data.body ?? "").trim(), "نص المقال مطلوب");
  return a;
});

if (errors.length) {
  console.error("\n✖ أخطاء في المحتوى (لم يُنشر الموقع):\n");
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "properties.json"), JSON.stringify(properties, null, 2));
writeFileSync(join(OUT, "articles.json"), JSON.stringify(articles, null, 2));
console.log(`✓ content: ${properties.length} properties, ${articles.length} articles`);
