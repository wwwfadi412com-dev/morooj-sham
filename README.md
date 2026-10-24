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

انسخ `.env.example` إلى `.env.local` وعدّل القيم، وأضفها أيضاً في إعدادات الاستضافة (Vercel → Settings → Environment Variables):

| المتغير | الوصف |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع الكامل (يُستخدم في sitemap و canonical و JSON-LD). عند شراء الدومين غيّره إلى `https://moroojsham.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم واتساب صاحب المنصة بالصيغة الدولية بدون `+`، مثل `9639XXXXXXXX` |

## إدارة المحتوى

| الملف | المحتوى |
| --- | --- |
| `data/properties.ts` | العقارات (الكود، السعر، المساحة، الطابو، الصور، الحالة `available` / `sold` / `rented`) |
| `data/areas.ts` | المناطق: النبذة، مؤشرات الأسعار، الأسئلة الشائعة |
| `data/articles.ts` | مقالات المدونة |
| `lib/site.ts` | اسم المنصة والبريد والإعدادات العامة |

- **العقار المباع:** غيّر `status` إلى `"sold"` ولا تحذفه — تبقى صفحته مع شريط «تم البيع» وعقارات مشابهة (حفاظاً على السيو).
- **أكواد العقارات:** `D-` الدرخبية · `DR-` دروشا · `KH-` خان الشيح · `AR-` عرطوز.
- **لا تضع** أسماء المكاتب الشريكة أو أرقام المالكين في البيانات.
- الصور الحالية تجريبية من Unsplash؛ استبدلها بصور العقارات الحقيقية (يُفضّل وضعها في `public/properties/` بصيغة WebP).

## السيو والبحث بالذكاء الاصطناعي

- `/sitemap.xml` و `/robots.txt` (يسمح لـ Googlebot و Bingbot و OAI-SearchBot و PerplexityBot و ClaudeBot و Google-Extended وغيرها).
- `/llms.txt` و `/llms-full.txt` تُولَّد تلقائياً من البيانات.
- JSON-LD: `RealEstateAgent` و `WebSite` (الرئيسية)، `RealEstateListing` + `Product` (العقار)، `BreadcrumbList`، `FAQPage`، `Article`.

## النشر (GitHub Pages — مجاني)

الموقع يُصدَّر كملفات ثابتة (`output: "export"`) ويُنشر على فرع `gh-pages`:

```bash
npm run deploy
```

الرابط الحالي: https://wwwfadi412com-dev.github.io/morooj-sham/

> ملاحظة: Vercel وبعض المنصات الأمريكية تحجب التسجيل من سوريا، لذلك اعتمدنا GitHub Pages مبدئياً.

**عند شراء الدومين والسيرفر المدفوع:**
1. اجعل `NEXT_PUBLIC_BASE_PATH` فارغاً و`NEXT_PUBLIC_SITE_URL=https://moroojsham.com`.
2. شغّل `npm run build`، وارفع محتوى مجلد `out/` إلى أي استضافة (أو اربط الدومين بـ GitHub Pages من Settings → Pages → Custom domain).

`robots.txt` يجب أن يكون في جذر الدومين ليقرأه محرك البحث، وهذا يتحقق تلقائياً عند ربط الدومين الخاص.
