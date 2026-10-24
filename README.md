# مروج الشام العقارية — Morooj Sham Real Estate

منصة عقارية عربية (RTL) لعقارات ريف دمشق: الدرخبية، دروشا، خان الشيح، عرطوز وجديدة عرطوز.
مبنية بـ **Next.js 15 (App Router) + TypeScript + Tailwind CSS**، وكل الصفحات تُولَّد مسبقاً (SSG) لسرعة الفهرسة.

## التشغيل محلياً

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # بناء الإنتاج + فحص الأنواع
```

## متغيرات البيئة

انسخ `.env.example` إلى `.env.local` وعدّل القيم، للنشر تُضبط القيم في `.github/workflows/deploy.yml`:

| المتغير | الوصف |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع الكامل (يُستخدم في sitemap و canonical و JSON-LD). عند شراء الدومين غيّره إلى `https://moroojsham.com` |
| `NEXT_PUBLIC_BASE_PATH` | المسار الفرعي على GitHub Pages (`/morooj-sham`). يُترك فارغاً مع الدومين الخاص |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم واتساب صاحب المنصة بالصيغة الدولية بدون `+`، مثل `9639XXXXXXXX` |

## لوحة التحكم (`/admin`)

الرابط: https://wwwfadi412com-dev.github.io/morooj-sham/admin/

لوحة مجانية (Sveltia CMS) لإضافة العقارات والمقالات وتعديلها ورفع الصور. كل حفظ يُسجَّل في GitHub، ثم يُعاد بناء الموقع ونشره تلقائياً خلال 2–3 دقائق.
دليل الاستخدام خطوة بخطوة: [ADMIN_GUIDE.md](ADMIN_GUIDE.md).

| المسار | المحتوى | يُعدَّل من |
| --- | --- | --- |
| `content/properties/*.json` | العقارات (ملف لكل عقار) | لوحة التحكم |
| `content/articles/*.json` | المقالات (نص Markdown) | لوحة التحكم |
| `public/uploads/` | الصور المرفوعة | لوحة التحكم |
| `data/areas.ts` | المناطق: النبذة، مؤشرات الأسعار، الأسئلة الشائعة | الكود |
| `lib/site.ts` | اسم المنصة والبريد والإعدادات العامة | الكود |

- `scripts/build-content.mjs` يحوّل ملفات `content/` إلى `data/generated/` قبل كل بناء، ويرفض البناء إذا كان هناك خطأ (كود مكرر، سعر ناقص، بلا صور...). لذلك لا يصل أي إدخال خاطئ إلى الموقع، والنسخة السابقة تبقى منشورة.
- **العقار المباع:** غيّر «الحالة» إلى «تم البيع» ولا تحذفه، فتبقى صفحته مع شريط «تم البيع» وعقارات مشابهة (حفاظاً على السيو).
- **أكواد العقارات:** `D-` الدرخبية · `DR-` دروشا · `KH-` خان الشيح · `AR-` عرطوز.
- **لا تضع** أسماء المكاتب الشريكة أو أرقام المالكين في البيانات.
- الصور الحالية تجريبية من Unsplash؛ استبدلها بصور العقارات الحقيقية.

## السيو والبحث بالذكاء الاصطناعي

- `/sitemap.xml` و `/robots.txt` (يسمح لـ Googlebot و Bingbot و OAI-SearchBot و PerplexityBot و ClaudeBot و Google-Extended وغيرها).
- `/llms.txt` و `/llms-full.txt` تُولَّد تلقائياً من البيانات.
- JSON-LD: `RealEstateAgent` و `WebSite` (الرئيسية)، `RealEstateListing` + `Product` (العقار)، `BreadcrumbList`، `FAQPage`، `Article`.

## النشر (GitHub Pages — مجاني وتلقائي)

الموقع يُصدَّر كملفات ثابتة (`output: "export"`)، و`.github/workflows/deploy.yml` يبنيه وينشره مع كل `push` على `main`، بما فيها حفظ التعديلات من لوحة التحكم. تتابع حالة النشر من تبويب **Actions** في المستودع.

الرابط الحالي: https://wwwfadi412com-dev.github.io/morooj-sham/

> ملاحظة: Vercel وبعض المنصات الأمريكية تحجب التسجيل من سوريا، لذلك اعتمدنا GitHub Pages مبدئياً.

**عند شراء الدومين والسيرفر المدفوع:**
1. في `.github/workflows/deploy.yml` اجعل `NEXT_PUBLIC_BASE_PATH` فارغاً و`NEXT_PUBLIC_SITE_URL: https://moroojsham.com`، وحدّث الروابط في `public/admin/config.yml`.
2. اربط الدومين من Settings → Pages → Custom domain، أو ارفع محتوى `out/` (بعد `npm run build`) إلى أي استضافة.

`robots.txt` يجب أن يكون في جذر الدومين ليقرأه محرك البحث، وهذا يتحقق تلقائياً عند ربط الدومين الخاص.
