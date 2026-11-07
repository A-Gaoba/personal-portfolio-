# 02 — ما يجب الاحتفاظ به أو تحسينه أو حذفه

> المرجع لكل نقطة: [01-website-audit.md](01-website-audit.md). **ترتيب التنفيذ وبواباته في [07](07-implementation-roadmap.md).**
>
> **تحديث بعد قراراتك (2026-11-07):**
> - كل «Remove» للكود أو الحزم يتم **تدريجيًا** على دفعات C0 ← C5 متحقَّق منها برسم الاستيراد ([07 § 1ب](07-implementation-roadmap.md#1ب-التنظيف-التدريجي-الآمن--35-س))، لا دفعة واحدة.
> - كل رقم أو تاريخ بلا دليل **يُخفى** حتى تؤكده ([10-open-questions.md](10-open-questions.md))، ولا يُستبدل بغيره.
> - كل ما هو **مؤكد أنه وهمي** (أسماء الشهادات، `example.com`، روابط Calendly الوهمية) **يُحذف**.
>
> **مفتاح الأولوية:** P0 = يضر بالمصداقية أو يخسر رسائل الآن · P1 = قبل إطلاق منصة GAOBA AI · P2 = تحسين مهم · P3 = لاحقًا
>
> **مفتاح الإجراء:** Keep · Improve · Remove · Replace · Add

---

## 1. الجدول الرئيسي

| الصفحة أو المكون | المشكلة الحالية | التعديل المقترح | السبب | الأولوية |
|---|---|---|---|---|
| **`ContactHighlight.tsx` (نموذج الرئيسية)** | `handleSubmit` = `console.log` فقط؛ البريد `example.com`؛ روابط Calendly وهمية | **Replace:** نموذج واحد مشترك (`<ContactForm/>`) يستخدم Formspree الموجود في `ContactPage.tsx`، أو زر يقود لـ `/contact` | الرسائل تضيع حاليًا | **P0** |
| **`TestimonialsSlider.tsx` + `Testimonials.tsx` + `/testimonials`** | 9 شهادات بأسماء مختلقة + Schema Review وهمي | **Remove** القسم والصفحة والرابط من القائمة؛ **Add** لاحقًا عند وجود شهادات حقيقية (اسم + رابط LinkedIn أو موافقة مكتوبة) | ادعاءات وهمية تدمر الثقة عند أول بحث، ومخالفة لإرشادات Google | **P0** |
| **أرقام المشاريع** (`Projects.tsx` metrics/results، `ProjectsHighlight.tsx`) | مقاييس بقالب موحد بلا مصدر | **Remove** كل رقم لا تملك له دليلًا؛ **Keep** ما تستطيع إثباته؛ استبدل «النتائج» بوصف ما بنيته فعلًا (stack، دورك، التحدي التقني) | لا أخترع أرقامًا بديلة؛ القرار لك بحسب الأدلة | **P0** |
| **إحصاءات About** (`AboutHighlight.tsx:9-34`، `About.tsx`) | «5+ Years» تتعارض مع «over a year»؛ «50+ Projects»، «1000+ Users» | **Improve:** رقم خبرة واحد صحيح ومحسوب من تواريخك (freelance منذ 2023) في مكان واحد (`content/profile.ts`) | تناقض يلاحظه أي مسؤول توظيف | **P0** |
| **`metadataBase` / canonical / sitemap / robots** | تشير إلى `abdulrahmangooba.dev` غير الموجود | **Replace** بمتغير واحد `SITE_URL` (حاليًا `https://gaoba.vercel.app` أو نطاقك الجديد) | الـ canonical لنطاق ميت يضر بالفهرسة مباشرة | **P0** |
| **JSON-LD** في `projects/`، `skills/`، `contact/`، `testimonials/` | `abdulrahman.dev` (شخص آخر)، «Project Alpha/Beta»، Reviews وهمية | **Remove** هذه الكتل؛ **Keep** `Person` + `WebSite` في `layout.tsx` بعد تصحيحهما | بيانات منظمة خاطئة تُنسب لك هوية غيرك | **P0** |
| **`layout.tsx` – verification** | `your-google-verification-code` منشور | **Remove** حتى تحصل على الرمز الحقيقي من Search Console | placeholder ظاهر في كل صفحة | **P0** |
| **`.text-gradient-syntax` + 22 متغير CSS غير معرّف** | عناوين «Next Project?» و«Skills» غير مرئية | **Replace** ضمن نظام الألوان الجديد (tokens في `:root`)؛ إلى ذلك الحين **Remove** الكلاسات المكسورة | نص مخفي فعليًا | **P0** |
| **`about/page.tsx`** | Navbar مكرر، تمرير أفقي على الهاتف، Hero مكرر مع About | **Improve:** احذف `<Navbar/>` السطر 77، ودمج Hero الصفحة مع `About.tsx` | خلل ظاهر على الهاتف | **P0** |
| **روابط GitHub للمشاريع** | 14/15 = 404 | **Improve:** اجعل `githubUrl` اختياريًا؛ صحح `ghofran_badran` و`sara_alhassany`؛ احذف الباقي أو اجعل المستودعات عامة | زر يقود لصفحة خطأ | **P0** |
| **Naqla Tech / GaobaVid / E-Commerce Dashboard** | مواقع لا تعمل أو وهمية، أوصاف متضاربة | **Improve** Naqla (قصة واحدة متسقة + حالة الموقع الحقيقية)؛ **Remove** E-Commerce Dashboard؛ GaobaVid: إن كان متوقفًا اعرضه «Archived» مع لقطات | مشروعك الأبرز (Featured) يعيد 404 | **P0** |
| **روابط LinkedIn** | 3 صيغ، إحداها 404 | **Replace** بثابت واحد في `content/profile.ts` | | **P0** |
| **`Skills.tsx` الفئات** | 3 بطاقات فارغة، 13 مهارة لا تظهر، أيقونات مفقودة | **Replace:** قائمة مهارات مجمعة حسب ما تعمل به فعلًا اليوم (Web / Data & AI / Automation / Tools) بدون نسب مئوية؛ نقلها إلى `/about` | خلل ظاهر + غياب AI/Data | P1 |
| **`SkillsHighlight.tsx`** | حلقات نسب مئوية بتدرج مكسور، «50+ Technologies Mastered» | **Remove** من الرئيسية؛ يُستبدل بشريط «أعمل بـ» بسيط | ادعاء غير قابل للقياس + خلل | P1 |
| **`DeveloperBackground.tsx`** | إعادة رسم مع كل حركة فأرة، ~170 حركة لانهائية، مكرر | **Remove** (الهوية الجديدة لا تحتاجه؛ يستبدل بشبكة ورقية ثابتة بـ CSS) | أكبر عبء أداء في الموقع | P1 |
| **`Hero.tsx`** | قالب «terminal/const role» عام، typewriter بلا cleanup، أيقونة Twitter خاطئة | **Replace** بـ Hero تحريري: اسمك + سطر قيمة واحد واضح + 2 CTA + صورة/دليل حقيقي | الانطباع الأول يشبه آلاف القوالب | P1 |
| **`ServicesHighlight.tsx` / `Services.tsx`** | 6 خدمات ويب عامة + أسعار غير مؤكدة، 704 سطر | **Improve:** الخدمات التي **تؤكدها أنت** (D1)؛ الأسعار **مخفية افتراضيًا** وتُستبدل بـ «اطلب عرض سعر» إلى أن تؤكدها (D2) | التركيز = تحويل أفضل، بلا ادعاء | P1 |
| **`Navbar.tsx`** | 7 روابط، اللوغو `<h1>`، لا رابط للموارد | **Improve:** Work · Services · Resources · About · Contact + زر لغة؛ اللوغو `<a>` لا `<h1>` | تبسيط + SEO | P1 |
| **`Footer.tsx`** | لا Instagram، LinkedIn خاطئ، هاتف وعنوان، `<h1>` | **Improve:** روابط Instagram/GitHub/LinkedIn/Email + رابط الموارد + نشرة بريدية لاحقًا | ربط الهويتين | P1 |
| **`layout.tsx` الخطوط** | Inter + Poppins (9 أوزان) + JetBrains Mono، لا عربي | **Replace** بـ **Readex Pro** (عربي+لاتيني، نفس خط الفيديوهات) + **Martian Mono** للأرقام/الكود | توحيد الهوية + دعم عربي + خطوط أقل | P1 |
| **`next.config.mjs`** | `images.unoptimized: true`، `ignoreBuildErrors`، مفتاح `eslint` قديم، remotePatterns غير مستخدمة | **Improve:** فعّل تحسين الصور، أصلح الـ 18 خطأ ثم أزل `ignoreBuildErrors`، احذف `eslint` و`remotePatterns` | 12MB صور + أخطاء مخفية | P1 |
| **صور `public/`** | حتى 1.9MB لكل صورة | **Improve:** تحويل إلى WebP/AVIF بعرض ≤1600px (أو تفعيل Next/Image) | سرعة على الهاتف | P1 |
| **`ProjectsHighlight.tsx`** | 3 مشاريع، اثنان منها لا يعملان | **Improve:** 3 مشاريع حقيقية تعمل + (لاحقًا) مشروع AI من GitHub | | P1 |
| **`/projects` Dialog** | بطاقات `div` غير قابلة للوصول، لا صفحة لكل مشروع | **Replace:** `/work/[slug]` صفحات دراسة حالة من ملفات MDX؛ البطاقة `<Link>` | قابلية المشاركة + SEO + لوحة المفاتيح | P2 |
| **`sitemap.ts`** | 3 صفحات غير موجودة، `lastModified: new Date()` لكل شيء | **Improve:** توليد تلقائي من ملفات المحتوى (مشاريع + موارد) بتواريخها الحقيقية | | P1 |
| **`/og-image.jpg`** | مفقود | **Add:** صورة OG ديناميكية بـ `opengraph-image.tsx` (ImageResponse) بهوية GAOBA Editorial، ولكل مورد صورته | معاينة عند المشاركة في Instagram/WhatsApp | P1 |
| **`hreflang /en /ar`** | صفحات غير موجودة | **Remove** الآن؛ **Add** عند بناء النسخة العربية فعليًا | | P1 |
| **`CalendlyWidget.tsx`** | iframe بطول 700px دائمًا في `/contact` | **Improve:** زر «احجز مكالمة» يفتح Calendly عند الطلب (lazy) | أداء | P2 |
| **`ScrollProgress.tsx`** | شريط تقدم في كل صفحة | **Remove** (زخرفة لا تخدم المحتوى في الهوية الجديدة) | | P3 |
| **`FloatingElements.tsx`** | دوائر عائمة زخرفية | **Remove** | ضد قاعدة «لا زخارف عشوائية» في الهوية | P2 |
| **كود ميت:** `AnimatedBackground`، `ParticleBackground`، `Certifications` (شهادات AWS/Google مختلقة)، `Contact`، `ProjectModal`، `styles/`، `hooks/` المكرر، 45 ملفًا في `components/ui/`، 4 صور `placeholder-*` | غير قابلة للوصول من أي صفحة (رسم استيراد كامل) | **Remove تدريجيًا:** C1أ (مكونات) ← C1ب (ui) ← C1ج (مكررات) ← C1د (أصول)، كل دفعة PR مستقل + build + لقطات. **يبقى** `placeholder.svg` (مستخدم كبديل) و`caneer-cake.png` (حتى قرارك) | تقليل التعقيد ومنع إعادة تفعيل محتوى مختلق بالخطأ | P2 |
| **حزم غير مستخدمة** + `"latest"` | 24 `@radix-ui/*` + 14 حزمة أخرى؛ تعارض `date-fns` يكسر `npm ci` | **Remove تدريجيًا** (C2أ ← C2ج) بعد حذف مستورديها؛ **استثناءات تبقى:** `react-dom`، `zod`، `tailwindcss-animate`، `next-themes`؛ `framer-motion` و`react-calendly` تُحذفان **فقط** عند استبدال آخر مستخدم (C4)؛ تثبيت `framer-motion@12.23.26` | حذف آمن قابل للتراجع | P2 |
| **`package-lock.json`** | قديم (Next 15.2.4) ومتعارض مع `pnpm-lock.yaml` | **Remove** (C3) **بعد** التأكد من سجل بناء Vercel أنه يستخدم pnpm + `packageManager` في `package.json` | بناءات غير متطابقة | P2 |
| **`README.md`** | يصف Next 14 وميزات غير موجودة | **Replace** بوصف حقيقي + طريقة إضافة مورد | | P3 |
| **`PROJECTS_SERVICES_AUDIT_REPORT.md`** | تقرير قديم في جذر المشروع | **Improve:** نقله إلى `docs/` | تنظيم | P3 |
| **هاتف + عنوان شخصي** في Footer وJSON-LD | منشوران لكل زوار Instagram | **قرارك:** أقترح إبقاء البريد + نموذج + واتساب أعمال فقط | خصوصية | P2 |
| **meta description** | يحشو تهجئات خاطئة للاسم | **Improve:** وصف طبيعي بالعربية والإنجليزية؛ التهجئات البديلة في `alternateName` فقط | المظهر في نتائج Google | P1 |
| **قسم «Core Values»** في About | عبارات عامة («Excellence in Code»...) | **Remove** أو استبداله بـ «كيف أعمل» (3 خطوات حقيقية) | حشو | P3 |

---

## 2. القوائم المختصرة

### Keep (كما هو أو بتعديل بسيط جدًا)
- إطار Next.js 16 + App Router + TypeScript + Tailwind + Vercel.
- `ContactPage.tsx` (نموذج Formspree يعمل) — يُعاد تصميمه بصريًا فقط.
- `sitemap.ts` / `robots.ts` / `manifest.ts` (البنية، لا المحتوى).
- `@vercel/analytics` (سيُستخدم لتتبع النسخ والتنزيل).
- صور المشاريع الحقيقية و12 موقعًا يعمل.
- الصورة الشخصية (بعد ضغطها).
- دعم `prefers-reduced-motion` وأحجام اللمس 44px.
- `lucide-react` للأيقونات، و`components/ui/button|dialog|input|label|textarea`.
- `next-themes` (للوضع الداكن الاختياري)، و`zod` (لمخطط المحتوى)، و`tailwindcss-animate`، و`react-dom`.

### Improve
- نصوص About والخبرة والتواريخ (مصدر واحد للحقيقة).
- قسم المشاريع (صفحات مستقلة، روابط صحيحة، بلا أرقام مختلقة).
- الخدمات (أقل وأوضح ومرتبطة بعملك الحالي في AI/الأتمتة/البيانات).
- Navbar وFooter.
- SEO كاملًا.
- إعدادات Next والصور.

### Remove
- الشهادات الوهمية وصفحة `/testimonials`.
- كل الأرقام بلا مصدر.
- `DeveloperBackground`، `FloatingElements`، `ScrollProgress`، حلقة الصورة الدوارة والشارات.
- الكود الميت (5 مكونات + 45 ملف UI + `styles/` + `hooks/` + 4 placeholders): **على دفعات C1، مع التحقق بعد كل دفعة**.
- الحزم غير المستخدمة و`package-lock.json`: **على دفعات C2–C3**، مع الاستثناءات المذكورة.
- placeholders في الـ meta وJSON-LD الخاطئ.
- `SkillsHighlight` بنسبه المئوية.

### Replace
- نموذج الرئيسية المعطل ← نموذج مشترك يعمل.
- نظام ألوان One Dark ← **GAOBA Editorial tokens** (تفاصيل في [04 § 9](04-gaoba-ai-resources.md#9-الهوية-البصرية-الموحدة-design-tokens)).
- Inter/Poppins/JetBrains ← Readex Pro + Martian Mono.
- Hero «terminal» ← Hero تحريري.
- Dialog المشاريع ← صفحات `/work/[slug]`.
- البيانات داخل المكونات ← ملفات محتوى (`content/`).
- نطاق `abdulrahmangooba.dev` ← متغير `SITE_URL` (ونطاق حقيقي عندما تقرر).

### Add
- `/links` — صفحة Instagram Bio.
- `/resources` و`/resources/[slug]` — مكتبة الموارد.
- `content/` + محمّل محتوى مع تحقق من المخطط (schema).
- مكون `CopyButton` و`DownloadButton` مع تتبع Analytics.
- صور OG ديناميكية.
- رابط Instagram ورابط الموارد في كل مكان مناسب.
- مشاريع AI/Data من GitHub (بعد اختيارك).
- قسم «GAOBA AI» في الرئيسية (جسر بين الهويتين).
- سيرة ذاتية PDF قابلة للتنزيل (لمسؤولي التوظيف).
- دعم RTL وخط عربي.
