# 06 — الخطة التقنية

> **تحديث بعد قراراتك (2026-11-07):**
> - **النطاق:** `gaoba.vercel.app` عبر `lib/site.ts` + `NEXT_PUBLIC_SITE_URL` (§3.2، وخطوات تغييره في [03 § 5](03-new-site-structure.md#5-النطاق-domain--قرارك-8)).
> - **التنظيف:** تدريجي بدفعات C0–C5 متحقَّق منها برسم الاستيراد. الجدول §4 أدناه يوضح **الوجهة النهائية** فقط، والترتيب والاستثناءات في [07 § 1ب](07-implementation-roadmap.md#1ب-التنظيف-التدريجي-الآمن--35-س).
> - **الوضع الداكن:** `next-themes` يبقى (`defaultTheme="light"` + زر).
> - **لا قاعدة بيانات ولا مصادقة.** `zod` يبقى لمخطط المحتوى.
> - **الترقيم:** المرحلة 1 هنا = المراحل 0–2 في 07، والمرحلة 2 هنا = المرحلة 3 في 07.

## 1. قرار البنية: تطوير تدريجي، لا إعادة بناء

**الأسباب التي تمنع إعادة البناء من الصفر:**
- Next.js 16 + App Router + TypeScript + Tailwind + Vercel هي أنسب حزمة لكل الأهداف الثلاثة (محتوى ثابت سريع، MDX، API Routes للـ webhooks، صور OG ديناميكية).
- المشاكل في المحتوى والتصميم والإعدادات، **لا في الإطار**.

**لكن:** معظم المكونات الحالية (`*Highlight.tsx`، `Hero.tsx`، `About.tsx`، `Projects.tsx`، `Services.tsx`) ستُعاد كتابتها بالهوية الجديدة. «تطوير تدريجي» يعني: نفس المستودع، ونفس الإعدادات، ونفس الروابط مع إعادة توجيه، ونفس Formspree وAnalytics وVercel. **ولا يعني الإبقاء على هذه المكونات.**

## 2. الحزمة التقنية

| الطبقة | الحالي | المقترح | تغيير؟ |
|---|---|---|---|
| الإطار | Next.js 16.1.1 | كما هو | — |
| اللغة | TypeScript (أخطاء مخفية) | TypeScript صارم، بلا `ignoreBuildErrors` | إصلاح 18 خطأ |
| التنسيق | Tailwind 3.4 + متغيرات مكسورة | Tailwind 3.4 + tokens GAOBA في `:root` | إعادة كتابة `globals.css` (~120 سطرًا بدل 778) |
| المكونات | 50 shadcn (6 مستخدمة) | 5 shadcn + `components/brand` + `components/resources` | حذف 45 ملفًا |
| الحركة | framer-motion في 21 ملفًا | CSS transitions + `IntersectionObserver` صغير؛ framer-motion **فقط** إن احتجناه للقائمة/Dialog | تقليل JS |
| الخطوط | Inter, Poppins×9, JetBrains Mono | Readex Pro (arabic+latin) + Martian Mono عبر `next/font/google` | |
| المحتوى | بيانات داخل المكونات | `content/*.mdx` + `lib/content.ts` + `zod` | **مكتبتان جديدتان** (محمّل MDX + gray-matter) بعد موافقتك |
| النماذج | Formspree (صفحة) + نموذج معطل | Formspree لنموذج واحد مشترك + honeypot ضد السبام | — |
| التحليلات | `@vercel/analytics` | + أحداث مخصصة `track()` | — |
| مدير الحزم | npm + pnpm (lock متعارض) | **pnpm فقط** (Vercel يستخدمه حاليًا بحكم `pnpm-lock.yaml`) | حذف `package-lock.json` |
| الجودة | لا شيء | `tsc --noEmit` + `next build` في GitHub Actions + Playwright smoke بسيط (لاحقًا) | |

## 3. خطوات تقنية محددة

### 3.1 الإعدادات — `next.config.mjs`
```js
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },   // إزالة unoptimized
  // إزالة: eslint (غير مدعوم في Next 16)، typescript.ignoreBuildErrors (بعد إصلاح الأخطاء)، remotePatterns غير المستخدمة
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/skills", destination: "/about#skills", permanent: true },
      { source: "/testimonials", destination: "/", permanent: true },
      { source: "/instagram", destination: "/links", permanent: false },
      { source: "/ig", destination: "/links", permanent: false },
    ];
  },
};
```

### 3.2 مصدر واحد للحقيقة — `lib/site.ts` و`content/profile.ts`
```ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaoba.vercel.app";
export const profile = {
  name: { en: "Abdulrahman Gaoba", ar: "عبد الرحمن قوبع" },
  email: "…",                       // ← تؤكده أنت (يوجد بريدان مختلفان حاليًا)
  links: { github: "https://github.com/A-Gaoba", linkedin: "…", instagram: "https://www.instagram.com/a_gaoba.ai/" },
  experienceSince: "2023-01",        // ← تؤكده أنت؛ يُحسب منه «X سنوات» تلقائيًا
};
```
كل من `layout.tsx` و`sitemap.ts` و`robots.ts` وJSON-LD والـ Footer وHero يقرأ من هنا، فتختفي التعارضات الحالية من جذورها.

### 3.3 المحتوى — `lib/content.ts`
- `getResources()` و`getResource(slug)` و`getProjects()`: قراءة وقت البناء + تحقق `zod` + فرز.
- `generateStaticParams` لـ `/resources/[slug]` و`/work/[slug]`.
- `buildSearchIndex()`: JSON صغير لصفحة `/resources`.
- `sitemap.ts` يولّد الروابط من المحتوى بتواريخ `updatedAt` الحقيقية.

### 3.4 RTL
- `app/(gaoba)/layout.tsx`: `<html lang="ar" dir="rtl">`.
- استخدام الخصائص المنطقية في Tailwind 3.4: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`. ممنوع `ml-*` و`left-*` في المكونات المشتركة.
- الأيقونات الاتجاهية (← →) تُعكس بـ `rtl:rotate-180`.
- البرومبتات والكود دائمًا داخل `<pre dir="ltr">` عندما `lang: en`.
- الأرقام: لاتينية (قاعدة الهوية في الفيديو: «Latin digits»).

### 3.5 الأداء (أهداف قابلة للقياس)
| المقياس | الهدف | كيف |
|---|---|---|
| LCP على الهاتف (4G) | < 2.0s | Server Components، صورة Hero محسنة بـ `priority`، خطان فقط |
| JS للصفحة `/links` | < 80KB (gzip) | بلا framer-motion، بلا مكونات client إلا زر النسخ |
| CLS | < 0.05 | أبعاد ثابتة للصور، `next/font` |
| وزن صفحة `/work` | < 1.5MB | AVIF/WebP + `sizes` صحيحة (الحالي ~12MB غير مضغوط) |

### 3.6 SEO
- `metadataBase: new URL(SITE_URL)`، و`alternates.canonical` نسبي لكل صفحة.
- `opengraph-image.tsx` للموقع، ولكل مورد ولكل مشروع (هوية GAOBA: عاجي، حبر، أحمر).
- JSON-LD صحيح: `Person` (مع `sameAs` صحيحة) + `WebSite` في الجذر، و`CreativeWork`/`HowTo` للموارد، و`Product` للمنتجات لاحقًا. **بلا Reviews إلا الحقيقية.**
- حذف رموز التحقق المؤقتة. إضافة الحقيقية بعد ربط Google Search Console.
- عنوان ووصف عربي حقيقي لصفحات الموارد (هي الأكثر قابلية للترتيب: «برومبت ChatGPT لـ...»).

### 3.7 الأمان
- honeypot في النموذج + Formspree reCAPTCHA (اختياري).
- `JsonLd`: تهريب `<` عند حقن JSON.
- ترويسات `Content-Security-Policy` و`Referrer-Policy` و`X-Content-Type-Options` في `next.config.mjs` (المرحلة 3؛ وإلزامية قبل الدفع).
- ملفات `public/downloads` تُراجع قبل النشر (لا مفاتيح API، ولا مسارات خاصة). هذا نفس فحص الـ Skill الحالي («no API key or private path»).

## 4. الملفات المتأثرة (ملخص)

| الإجراء | الملفات |
|---|---|
| **تعديل** | `app/layout.tsx`, `app/globals.css`, `tailwind.config.js`, `next.config.mjs`, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/components/Navbar.tsx`, `Footer.tsx`, `app/contact/ContactPage.tsx`, `app/contact/page.tsx`, `package.json`, `README.md` |
| **إعادة كتابة** | `app/page.tsx`, `Hero.tsx`, `About.tsx`/`app/about/page.tsx`, `Projects.tsx`، `ProjectsHighlight.tsx`، `Services.tsx`، `ServicesHighlight.tsx`، `ContactHighlight.tsx` |
| **حذف (تدريجيًا)** | **C1 (غير قابلة للوصول الآن):** `AnimatedBackground.tsx`, `ParticleBackground.tsx`, `Certifications.tsx`, `Contact.tsx`, `ProjectModal.tsx`, 45 ملفًا من `components/ui/`, `styles/`, `hooks/`, 4 صور `public/placeholder-*` (**يبقى** `placeholder.svg` حتى إعادة كتابة مستخدميه). **0أ:** `Testimonials.tsx`, `TestimonialsSlider.tsx`, `app/testimonials/`. **C3:** `package-lock.json`. **C4 (فقط مع بدائلها في المرحلة 2):** `DeveloperBackground.tsx`, `FloatingElements.tsx`, `ScrollProgress.tsx`, `SkillsHighlight.tsx`, `AboutHighlight.tsx`, `Skills.tsx`, `app/skills/`, `app/projects/ProjectsPageClient.tsx` |
| **جديد** | `lib/site.ts`, `lib/content.ts`, `lib/taxonomy.ts`, `content/profile.ts`, `content/projects/*.mdx`, `content/resources/*.mdx`, `components/brand/*`, `components/resources/*`, `app/(gaoba)/*`, `app/(site)/work/[slug]/*`, `app/opengraph-image.tsx`, `scripts/import-reel.mjs`, `design/tokens.json`, `.github/workflows/ci.yml` |

> كل حذف يحدث **بعد موافقتك**، في فرع git منفصل، مع tag للنسخة الحالية قبل البدء (`pre-redesign-2026-11`)، لتتمكن من الرجوع في أي وقت. هذا يطابق طريقتك في الـ Skill: «احفظ نسخة احتياطية قبل أي تجربة».

## 5. ملاحظات عن بيئة البناء (تم اختبارها)

- `npm ci` يفشل حاليًا (`ERESOLVE` بين `react-day-picker@8` و`date-fns@4`، و`package-lock.json` قديم). `pnpm install --frozen-lockfile` ينجح.
- `tsc --noEmit`: **18 خطأ** (17 من types في Framer Motion، و1 مفتاح مكرر).
- `next build` محليًا على هذا الجهاز (Windows) لم يكتمل بسبب تعامل Turbopack مع روابط pnpm في مجلد مؤقت. **هذه مشكلة في بيئة الاختبار، لا في المشروع**، فالموقع ينشر فعلًا على Vercel. أوصي بإضافة CI على Linux (GitHub Actions) ليكون البناء قابلًا للتكرار.
