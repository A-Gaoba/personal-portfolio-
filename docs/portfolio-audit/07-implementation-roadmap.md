# 07 — خطة التنفيذ النهائية (بعد قراراتك في 2026-11-07)

> **الحالة:** خطة للمراجعة. **لم يُعدَّل أي ملف في الموقع.**
>
> **القرارات المعتمدة منك والمطبقة هنا:**
> 1. هوية GAOBA Editorial: الوضع الفاتح افتراضي، والداكن اختياري، مع التباين وإمكانية الوصول.
> 2. المصداقية والروابط والنموذج وSEO أولًا، **قبل أي ميزة جديدة**.
> 3. تنظيف تدريجي متحقَّق منه، **لا حذف جماعي**.
> 4. و5. تكامل الموارد مع Video Skill، مع **موافقة قبل النشر** و**تحقق من الرابط الحي** قبل Instagram وManyChat.
> 6. تصميم موحد، مع فصل وظيفتي Portfolio وResources.
> 7. **لا قاعدة بيانات، ولا تسجيل دخول، ولا متجر** في هذه الخطة.
> 8. `gaoba.vercel.app` نطاق مؤقت، يُعرَّف في **إعداد مركزي واحد**.
> 9. **لا اختلاق.** كل معلومة ناقصة في [10-open-questions.md](10-open-questions.md).
>
> **قواعد العمل في كل المراحل:**
> - **قبل أي تعديل:** tag للنسخة الحالية (`pre-redesign-2026-11`)، وفرع لكل مرحلة، وPull Request، ومعاينة Vercel Preview.
> - **لا دمج في `main` بدون موافقتك** على الـ Preview.
> - **بوابات الجودة لكل PR:** `tsc --noEmit` = 0 أخطاء (بعد المرحلة 1)، و`next build` ينجح، ولقطات قبل/بعد على 390px و1440px، ولا عنوان مخفي (فحص آلي)، ولا رابط داخلي مكسور.
> - **التقديرات** بساعات العمل التقنية، ولا تشمل وقت إجاباتك.

---

## نظرة عامة

| المرحلة | الهدف | يحتاج موافقة | يحتاج معلومات منك | تقدير |
|---|---|---|---|---|
| **0أ** | إزالة كل ما هو وهمي أو مكسور (بلا قرارات تصميم) | الخطة + الـ Preview | لا | 3–4 س |
| **0ب** | SEO أساسي + النطاق المركزي | الـ Preview | لا | 2–3 س |
| **0ج** | تصحيح الحقائق (تواريخ، روابط، بريد) | الـ Preview | **نعم**: A1، A3، B1–B7 | 1–2 س |
| **1** | الأساس: tokens + خطوط + وضع داكن اختياري + تنظيف آمن (C0–C3) + CI | التصميم الأساسي + كل دفعة حذف | قليل | 10–14 س |
| **2** | Portfolio بالهوية الجديدة | الـ Preview لكل صفحة | **نعم**: B8–B15، C، D | 20–28 س |
| **3** | GAOBA Resources + خط Reel ← مورد + `/links` | المكتبات + كل مورد | **نعم**: E | 22–30 س |
| **4** | النمو: Search Console، القياس، النسخة العربية للـ Portfolio | لكل بند | حسب البند | 10–16 س |
| **5** | تجهيز المنتجات (بلا تنفيذ) | — | قرارات تجارية | 0 (محسوم في البنية) |

---

## المرحلة 0أ — إزالة الوهمي والمكسور · 3–4 ساعات · **لا تحتاج معلومات**

**المبدأ:** ما هو مؤكد أنه وهمي يُحذف. وما **قد** يكون صحيحًا لكنه بلا دليل **يُخفى** (يبقى في الكود معطلًا بعلَم، حتى تؤكده أو ترفضه)، فلا تخسر معلومة صحيحة.

| # | المهمة | الإجراء | الملفات |
|---|---|---|---|
| 0أ.1 | الشهادات المختلقة (9 أسماء) | **حذف** القسم من الرئيسية وصفحة `/testimonials` ورابطها في القائمة وفي sitemap، وSchema الـ Reviews، وإعادة توجيه `/testimonials` ← `/` | `app/page.tsx`, `TestimonialsSlider.tsx`, `Testimonials.tsx`, `app/testimonials/page.tsx`, `Navbar.tsx`, `sitemap.ts`, `next.config.mjs` |
| 0أ.2 | نموذج الرئيسية المعطل | استبداله بنموذج يرسل فعلًا عبر Formspree نفسه (منطق `ContactPage.tsx` في مكون مشترك `ContactForm`) + honeypot ضد السبام + رسالة نجاح/فشل | `ContactHighlight.tsx`, `app/contact/ContactPage.tsx`, جديد `components/ContactForm.tsx` |
| 0أ.3 | `abdulrahman@example.com` وروابط Calendly الوهمية | حذف البطاقات الوهمية؛ البريد من `profile.ts` (0ب) | `ContactHighlight.tsx` |
| 0أ.4 | «50+ Happy Clients» و«100% Success Rate» و«24h Guaranteed» | **حذف** (ادعاءات تسويقية بلا أساس) | `ContactHighlight.tsx` |
| 0أ.5 | أرقام المشاريع والإحصاءات و«50+ Technologies» ونسب المهارات | **إخفاء** خلف `SHOW_UNVERIFIED_METRICS = false` حتى تؤكد كل رقم (C1–C15) | `Projects.tsx`, `ProjectsHighlight.tsx`, `AboutHighlight.tsx`, `About.tsx`, `SkillsHighlight.tsx` |
| 0أ.6 | روابط GitHub التي تعيد 404 | تظهر فقط إن كانت في قائمة «مستودعات عامة متحقَّق منها»؛ وتصحيح `ghofran_badran` و`sara_alhassany` (عامّان ويعملان) | `Projects.tsx`, `ProjectsHighlight.tsx` |
| 0أ.7 | مشاريع روابطها لا تعمل (Naqla، GaobaVid، Dashboard) | إخفاء زر «View Live»؛ E-Commerce Dashboard **مخفي** حتى إجابة C15 | نفسها |
| 0أ.8 | العناوين المخفية («Next Project?»، «Skills») | إزالة `.text-gradient-syntax` واستبدالها بنص عادي مؤقتًا | `ContactHighlight.tsx`, `Skills.tsx`, `globals.css` |
| 0أ.9 | Navbar مكرر + تمرير أفقي في About | حذف `<Navbar />` من الصفحة؛ ضبط عرض الصورة والشارات | `app/about/page.tsx` |
| 0أ.10 | بطاقات المهارات الفارغة + أيقونات مفقودة | مطابقة الفئات مع البيانات؛ حذف مسارات `/icons/*` غير الموجودة | `Skills.tsx` |
| 0أ.11 | `DeveloperBackground` المكرر | إزالة النسخة الثانية من `Hero.tsx` (الإصلاح الكامل في المرحلة 2) | `Hero.tsx` |

**معيار الخروج:** لا اسم وهمي، ولا رابط `example.com` أو `your-link`، ولا زر يقود إلى 404، ولا عنوان مخفي، ولا تمرير أفقي على 390px. **تحقق آلي بنفس سكربت Chrome المستخدم في التدقيق.**

**المخاطر:** منخفضة. خطر وحيد: إخفاء رقم صحيح مؤقتًا. *التخفيف:* إخفاء لا حذف.

---

## المرحلة 0ب — SEO أساسي ونطاق مركزي · 2–3 ساعات · **لا تحتاج معلومات**

| # | المهمة | الملفات |
|---|---|---|
| 0ب.1 | **`lib/site.ts`**: `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaoba.vercel.app"`، و`SITE_NAME`، و`DEFAULT_LOCALE`. **مكان واحد لتغيير النطاق لاحقًا** | جديد |
| 0ب.2 | **`content/profile.ts`**: الاسم والروابط والبريد، مصدر واحد تقرأ منه كل المكونات. القيم الحالية فقط، ومع إجابات 0ج تُصحَّح | جديد |
| 0ب.3 | `metadataBase` وcanonical وsitemap وrobots وmanifest ← `SITE_URL` | `layout.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`, كل `page.tsx` |
| 0ب.4 | حذف: رموز التحقق المؤقتة، و`hreflang /en /ar`، و`SearchAction /search`، وصفحات المشاريع غير الموجودة من sitemap | `layout.tsx`, `sitemap.ts` |
| 0ب.5 | حذف JSON-LD الخاطئ (`abdulrahman.dev` لشخص آخر، «Project Alpha/Beta»)؛ وتصحيح `Person`/`WebSite` من `profile.ts` | `layout.tsx`, `app/{projects,skills,contact}/page.tsx` |
| 0ب.6 | `og-image.jpg` المفقود ← `app/opengraph-image.tsx` بسيط (اسمك على الخلفية العاجية) | جديد |
| 0ب.7 | وصف meta طبيعي بلا حشو تهجئات (التهجئات تبقى في `alternateName` في JSON-LD) | `layout.tsx` وصفحات |
| 0ب.8 | `JsonLd.tsx`: تهريب `<` | `JsonLd.tsx` |

**معيار الخروج:** الـ canonical على كل صفحة = `https://gaoba.vercel.app/...`، وكل رابط في sitemap يعيد 200، و`og:image` يعيد 200، ولا placeholder في `<head>`، وJSON-LD يمر من Rich Results Test.

**ما يحتاج موافقتك بعد التنفيذ:** إضافة الموقع إلى Google Search Console (حسابك أنت)، ورمز التحقق الحقيقي (المرحلة 4).

---

## المرحلة 0ج — تصحيح الحقائق · 1–2 ساعة · **تحتاج: A1، A3، B1–B7**

| # | المهمة | تعتمد على |
|---|---|---|
| 0ج.1 | بريد واحد، LinkedIn واحد، X إن أردت | A1، A3، A4 |
| 0ج.2 | تاريخ بداية الخبرة ← «X سنوات» يُحسب تلقائيًا في كل الأماكن | B1 |
| 0ج.3 | تواريخ CereSoftware، وNaqla Tech، والعمل الحر، موحدة في كل الصفحات وJSON-LD | B2–B6 |
| 0ج.4 | إظهار الأرقام التي أكدتها فقط | C1–C15 |
| 0ج.5 | الهاتف والعنوان حسب قرارك | A6، A7 |

---

## المرحلة 1 — الأساس والتنظيف الآمن · 10–14 ساعة

### 1أ. الهوية (Design Tokens) · 5–6 س

| # | المهمة | الملفات |
|---|---|---|
| 1أ.1 | `design/tokens.json` (مصدر القيم، مطابق لـ `brand.ts` في الـ Skill + الإضافات المحسوبة للتباين) | جديد |
| 1أ.2 | `globals.css`: متغيرات `:root` (فاتح) و`.dark` (داكن) بأسماء shadcn نفسها (`--background`، `--foreground`، `--primary`، `--accent`، `--border`، `--ring`، `--card`...)، فتعمل `button` و`dialog` و`input` بلا تعديل | `app/globals.css` |
| 1أ.3 | `tailwind.config.js`: ألوان دلالية (`accent`, `accent-text`, `ink-*`, `ivory-*`)، وتعريف الكلاسات المفقودة أو حذف استخدامها (`xs:`، `shadow-glow-*`، `animate-pulse-slow`) | `tailwind.config.js` |
| 1أ.4 | الخطوط: Readex Pro (arabic + latin) + Martian Mono عبر `next/font/google`، وإزالة Inter وPoppins (9 أوزان) وJetBrains Mono | `app/layout.tsx` |
| 1أ.5 | **الوضع:** `ThemeProvider defaultTheme="light"` + زر تبديل (شمس/قمر) في الترويسة يحفظ اختيار الزائر. **لا يتبع إعداد النظام تلقائيًا** (قرارك: الفاتح افتراضي). خيار بديل بسطر واحد: `enableSystem` | `layout.tsx`, `theme-provider.tsx`, جديد `ThemeToggle.tsx` |
| 1أ.6 | قواعد إمكانية الوصول في الـ tokens: الأحمر `#FF4A1C` **ممنوع كنص صغير على الفاتح** (2.75:1)، وللروابط `accent-text #B8320E` (4.91:1)؛ النص على الأحمر حبر دائمًا (5.48:1)؛ حلقة تركيز 2px واضحة؛ `prefers-reduced-motion` | `globals.css` + توثيق |

**مرحلة انتقالية:** بعد 1أ يصبح الموقع الحالي بألوان الهوية الجديدة، **قبل** إعادة تصميم الصفحات في المرحلة 2. ستكون هناك أجزاء غير متناسقة مؤقتًا (مثل محرر الكود الوهمي)، ولذلك **لا يُدمج 1أ وحده في `main`**، بل يُدمج مع المرحلة 2، أو تكتفي بمراجعته في Preview.

### 1ب. التنظيف التدريجي الآمن · 3–5 س

**الأداة:** `scripts/audit-usage.mjs`، وهي نسخة من سكربت التحليل الذي شغّلته في التدقيق. يبني **رسمًا بيانيًا للاستيراد** يبدأ من نقاط دخول Next.js (`page`، `layout`، `sitemap`، `robots`، `manifest`، `opengraph-image`...)، ويتتبع الاستيرادات المتعدية (`@/` والمسارات النسبية)، ويفحص ملفات الإعداد (`tailwind.config.js`، `postcss.config.mjs`، `next.config.mjs`). يعمل في CI بعد كل دفعة.

**نتيجة التحليل الحالية (2026-11-07):** 40 ملفًا قابلًا للوصول، و53 غير قابل للوصول، و0 استيراد غير محلول.

| الدفعة | المحتوى | التحقق المسبق | التحقق بعدها | الخطر |
|---|---|---|---|---|
| **C0 — خط الأساس** | tag `pre-cleanup` + حفظ تقرير `audit-usage` + لقطات كل الصفحات + نجاح build على Preview | — | — | لا شيء |
| **C1أ — مكونات تطبيق غير مستوردة** | `AnimatedBackground.tsx`، `ParticleBackground.tsx`، `ProjectModal.tsx`، `Contact.tsx` (فيه رابط Calendly وهمي)، `Certifications.tsx` (فيه **شهادات AWS وGoogle بأرقام اعتماد مختلقة**، فحذفه يمنع إعادة تفعيلها بالخطأ) | 0 مستوردين + `grep` للاسم في كل المستودع (بما فيه الاستيراد الديناميكي والنصوص) | `tsc` + build + لقطات مطابقة | منخفض جدًا |
| **C1ب — 45 ملف shadcn غير قابل للوصول** | كل `components/ui/*` (50 ملفًا) ما عدا الخمسة المستخدمة: `button`، `dialog`، `input`، `label`، `textarea`. (`toast` و`use-toast` و`sonner` من ضمن المحذوف، فالتحليل أثبت أنها غير مستخدمة رغم أن البحث النصي الأول أوحى بغير ذلك) | التحليل يتتبع الاستيراد **داخل** مجلد ui أيضًا (مثلًا `sidebar` يستورد `sheet`)؛ كلها غير قابلة للوصول من أي صفحة | نفسها | منخفض. يمكن إعادة أي مكون بأمر `shadcn add` |
| **C1ج — مكررات** | `hooks/use-mobile.tsx`، `hooks/use-toast.ts` (نسخ من `components/ui`)، `styles/globals.css` (غير مستورد) | 0 مستوردين | نفسها | منخفض جدًا |
| **C1د — أصول غير مشار إليها** | `public/placeholder-logo.png`، `placeholder-logo.svg`، `placeholder-user.jpg`، `placeholder.jpg`. **`caneer-cake.png` يبقى** حتى إجابة C16. **`placeholder.svg` يبقى** (مستخدم كبديل صورة في 3 مكونات حية) | `grep` للمسار في كل الملفات | لقطات + لا 404 في الشبكة | منخفض جدًا |
| **C2أ — حزم كانت تستوردها فقط ملفات C1** | 24 حزمة `@radix-ui/*` (كلها ما عدا `react-dialog`، `react-label`، `react-slot`)، `cmdk`، `vaul`، `sonner`، `recharts`، `embla-carousel-react`، `input-otp`، `react-day-picker`، `date-fns`، `react-resizable-panels` | التحليل يؤكد «DEAD» بعد C1 | `pnpm install --frozen-lockfile` + build + Preview | منخفض؛ **يحل أيضًا تعارض `date-fns` الذي يكسر `npm ci`** |
| **C2ب — حزم نماذج غير مستخدمة** | `react-hook-form`، `@hookform/resolvers`، `@formspree/react` (النموذج يستخدم `fetch` مباشرة) | 0 مستوردين | اختبار إرسال النموذج على Preview (**تجريه أنت**: رسالة تجريبية) | منخفض |
| **C2ج — حالات خاصة** | `@emotion/is-prop-valid` (peer اختياري لـ framer-motion، بإصدار `latest`): حذف ثم تشغيل كل الحركات. `autoprefixer`: غير مفعّل أصلًا (`postcss.config.mjs` يحمّل Tailwind فقط)، يُحذف أو يُفعَّل عن قصد | تشغيل يدوي | لقطات | منخفض |
| **C3 — مدير الحزم والإصدارات** | حذف `package-lock.json` القديم (Next 15.2.4، و`npm ci` يفشل)؛ إضافة `"packageManager": "pnpm@9.x"`؛ تثبيت `framer-motion@12.23.26` بدل `latest` (الإصدار المحلول حاليًا في `pnpm-lock.yaml`) | **التحقق من سجل بناء Vercel أنه يستخدم pnpm** قبل حذف ملف npm | build على Preview | منخفض-متوسط → محسوب |

**ما لا يُحذف رغم أن التحليل الآلي يراه «غير مستورد» (false positives):**

| الحزمة | السبب |
|---|---|
| `react-dom` | peer dependency إلزامي لـ Next.js |
| `zod` | سيُستخدم لمخطط المحتوى في المرحلة 3 (لا داعي لحذفه ثم إعادته) |
| `tailwindcss-animate` | مستخدم في `tailwind.config.js`، و`dialog` يعتمد على كلاسات `animate-in` |
| `next-themes` | يدير الوضع الفاتح/الداكن (1أ.5) |

**يُحذف لاحقًا، فقط عند استبدال آخر مستخدم له (المرحلة 2، الدفعة C4):** `framer-motion` (مستخدم في 18 ملفًا)، `react-calendly` (يُستبدل برابط)، والمكونات الحية التي تُعاد كتابتها. **قاعدة C4: المكون القديم يُحذف في نفس الـ PR الذي يضيف بديله، لا قبله.**

**C5 (نهاية المرحلة 2):** حذف كلاسات CSS غير المستخدمة من `globals.css` (`.btn-*`، `.card-*`، `.terminal`، `.floating-code`... وكلها تعتمد على المتغيرات الـ 22 غير المعرّفة).

### 1ج. البناء والجودة · 2–3 س

| # | المهمة |
|---|---|
| 1ج.1 | إصلاح 18 خطأ TypeScript (17 types لـ framer-motion، ومفتاح مكرر)، ثم إزالة `ignoreBuildErrors`، وحذف مفتاح `eslint` غير المدعوم في Next 16 |
| 1ج.2 | تفعيل تحسين الصور (إزالة `unoptimized: true`) + حذف `remotePatterns` غير المستخدمة |
| 1ج.3 | GitHub Actions: `pnpm install --frozen-lockfile` + `tsc --noEmit` + `next build` + `audit-usage` (يفشل إن ظهر ملف غير قابل للوصول جديد) |

**المخاطر:** متوسطة في 1ج.2: تفعيل تحسين الصور يستهلك حصة Vercel Image Optimization. *البديل:* تحويل الصور مسبقًا إلى WebP في المستودع. **قرارك بعد رؤية الأرقام** (F2).

**تحتاج موافقتك:** التصميم الأساسي (Preview للـ tokens على الصفحات الحالية)، وكل دفعة حذف (C1أ ← C3، وكل واحدة PR صغير مستقل).

---

## المرحلة 2 — Portfolio بالهوية الجديدة · 20–28 ساعة

**وظيفة هذا الجزء:** الخبرات، والمشاريع، والعملاء. انظر الفصل بين الوظيفتين في [03 § 1](03-new-site-structure.md#1-المبدأ).

| # | المهمة | تقدير | يحتاج معلومات | الملفات |
|---|---|---|---|---|
| 2.1 | مكونات العلامة: `SiteHeader` (Portfolio)، `Footer` (مع Instagram)، `Button` ×3، `Card`، `Section`، `PaperGrid` | 4س | — | `components/brand/*`, `Navbar.tsx`, `Footer.tsx` |
| 2.2 | الرئيسية: Hero تحريري + 3 بطاقات زوار + أعمال مختارة + شريط GAOBA AI (روابط ثابتة حتى المرحلة 3) + خدمات + تواصل. **حذف** `DeveloperBackground`، `FloatingElements`، `ScrollProgress`، `*Highlight` في نفس الـ PR (C4) | 6س | B15 (السطر التعريفي) | `app/page.tsx`, `Hero.tsx`, `*Highlight.tsx` |
| 2.3 | `/about`: القصة + الخبرة (تواريخ صحيحة) + التعليم + المهارات (بلا نسب) + زر CV إن وجد؛ `/skills` ← 301 إلى `/about#skills` | 4س | B8–B14 | `app/about/*`, `About.tsx`, `Skills.tsx` |
| 2.4 | `/work` (المشاريع من `content/projects/*.ts` أو `.mdx`) + `/projects` ← 301؛ بطاقات `<Link>` قابلة للوصول | 4س | C1–C18 | `app/work/*`, `Projects.tsx` |
| 2.5 | `/services`: الخدمات التي تؤكدها + «اطلب عرض سعر» | 3س | D1–D5 | `Services.tsx` |
| 2.6 | `/contact`: `ContactForm` + زر Calendly (بلا iframe) | 2س | A9 | `app/contact/*`, `CalendlyWidget.tsx` |
| 2.7 | ضغط الصور (AVIF/WebP)، وأبعاد ثابتة، و`priority` للـ Hero | 2س | — | `public/*` |
| 2.8 | فحص إمكانية الوصول والتباين في الوضعين + لوحة المفاتيح + 390px | 2س | — | — |

**معيار الخروج:** LCP على الهاتف < 2.0s، و0 أخطاء تباين AA في الوضعين، و`framer-motion` محذوف أو محصور في مكون واحد، والصفحة الرئيسية ≤ 4 شاشات على الهاتف.

**تحتاج موافقتك:** Preview لكل صفحة قبل الدمج.

---

## المرحلة 3 — GAOBA Resources والتكامل مع Video Skill · 22–30 ساعة

**وظيفة هذا الجزء:** المحتوى، والموارد، والمنتجات الرقمية لاحقًا. التفاصيل الكاملة في [09-reel-resource-pipeline.md](09-reel-resource-pipeline.md).

| # | المهمة | تقدير | الملفات |
|---|---|---|---|
| 3.1 | **[موافقة: تثبيت مكتبتين]** محمّل MDX + `gray-matter`؛ `lib/content.ts` + مخطط `zod` + `lib/taxonomy.ts` + قاعدة «Production = المعتمد فقط» | 4س | جديد |
| 3.2 | Route group `(gaoba)` بـ `lang="ar" dir="rtl"` + `GaobaHeader` (صورتك + `@a_gaoba.ai`) | 2س | `app/(gaoba)/layout.tsx` |
| 3.3 | `CopyButton` (+ بدائل متصفح Instagram)، و`DownloadButton`، و`ShareButton`، وزر نسخ تلقائي لكل بلوك كود | 3س | `components/resources/*` |
| 3.4 | `/resources/[slug]` + `og:image` لكل مورد + `<meta gaoba:resource / gaoba:approval>` + شريط «مسودة» في Preview | 4س | `app/(gaoba)/resources/[slug]/*` |
| 3.5 | `/resources`: بطاقات + بحث (تطبيع عربي) + فلاتر في الرابط | 4س | `app/(gaoba)/resources/page.tsx` |
| 3.6 | `/links` + إعادة توجيه `/instagram` و`/ig` | 2س | `app/(gaoba)/links/page.tsx` |
| 3.7 | `scripts/import-reel.mjs` + `new-resource.mjs` (قراءة فقط من مجلدات الـ Reels، مع فحص الأسرار والمسارات) | 3س | `scripts/*` |
| 3.8 | `scripts/approve-resource.mjs` (نمط `gaoba-approval/2` نفسه في الـ Skill) + فحص البناء للـ hash | 2س | `scripts/*`, `lib/content.ts` |
| 3.9 | `scripts/verify-resource.mjs` (7 فحوص على الموقع الحي + تقرير) | 3س | `scripts/*` |
| 3.10 | **التجربة الأولى:** `ai-agent-morning` كاملًا من الاستيراد حتى نجاح `package.mjs` | 2س | — |
| 3.11 | **اختبار يدوي منك** داخل تطبيق Instagram (نسخ، تنزيل، مشاركة، RTL) | — | — |
| 3.12 | شريط GAOBA AI في الرئيسية يقرأ أحدث الموارد المعتمدة تلقائيًا | 1س | `app/page.tsx` |

**بوابات الموافقة في هذه المرحلة:**
1. تثبيت المكتبتين (3.1).
2. **كل مورد** على حدة: Preview ← موافقتك بكلماتك ← `approve-resource.mjs`.
3. كتابة الرابط في `publish.json`: يدويًا منك، أو `--write-publish-json` بإذن صريح.
4. **لا تغيير في ملفات الـ Skill.**

**معيار الخروج:** `ai-agent-morning` منشور، و`verify-resource` ✓، و`package.mjs` في الـ Skill يمر بفحص «resource link set» و«links open»، وقد اختبرت الرابط بنفسك من Instagram.

**المخاطر:** متصفح Instagram الداخلي (النسخ والتنزيل) ← البدائل + اختبارك اليدوي قبل وضع الرابط في البايو. وتضخم `public/downloads` ← حد 10MB للملف.

---

## المرحلة 4 — النمو · 10–16 ساعة (على دفعات، حسب البيانات)

| # | المهمة | تحتاج |
|---|---|---|
| 4.1 | Google Search Console + رمز التحقق الحقيقي + إرسال sitemap | حسابك |
| 4.2 | قياس: Vercel Analytics (page views + `?src=bio/dm`)؛ الأحداث المخصصة (نسخ/تنزيل) **إن كانت خطتك تدعمها** | F2 |
| 4.3 | دراسات حالة `/work/[slug]` لأفضل 3–4 مشاريع (منها منظومة GAOBA Reels إن وافقت، C18) | C17، C18 |
| 4.4 | النسخة العربية للرئيسية و`/services` + `hreflang` حقيقي | D5 |
| 4.5 | ترويسات أمان (CSP، Referrer-Policy، X-Content-Type-Options) | — |
| 4.6 | نموذج اشتراك بريدي اختياري (مزود خارجي بـ double opt-in، **بلا قاعدة بيانات عندنا**) + صفحة خصوصية | قرار المزود |

---

## المرحلة 5 — المنتجات الرقمية · **تجهيز فقط، بلا تنفيذ**

**ما هو جاهز بنيويًا بعد المرحلة 3:** حقلا `access: free|paid` و`product` في مخطط المورد؛ مكون إجراء واحد يقرر الزر؛ الملفات بمراجع لا بروابط ثابتة؛ و`SITE_URL` مركزي.

**ما لا يُبنى في هذه الخطة (قرارك 7):** قاعدة بيانات، وتسجيل دخول، وحسابات عملاء، ومتجر، وwebhooks للطلبات. عند القرار: Checkout مستضاف لدى مزود «تاجر مسجل» (MoR)، مع التحقق أولًا من دعم بلدك وحسابك البنكي. التفاصيل في [05-future-business.md](05-future-business.md).

---

## ملخص بوابات الموافقة

| البوابة | متى | ماذا توافق عليه |
|---|---|---|
| G0 | الآن | هذه الخطة |
| G1 | بعد 0أ+0ب | Preview: لا وهمي، لا مكسور، SEO سليم ← دمج |
| G2 | قبل 0ج | إجاباتك على A1، A3، B1–B7 |
| G3 | المرحلة 1 | Preview الهوية (فاتح + داكن)، ثم كل دفعة تنظيف (C1أ … C3) |
| G4 | المرحلة 2 | كل صفحة Portfolio + نصوصها |
| G5 | المرحلة 3 | تثبيت MDX وgray-matter |
| G6 | المرحلة 3 | **كل مورد** (بكلماتك حرفيًا) + كتابة `dm.resource_url` |
| G7 | المرحلة 4 | Search Console، مزود البريد، النسخة العربية |
| G8 | المرحلة 5 | قرار البيع والمزود |

## الخطوة التالية المقترحة

**بموافقتك على G0:** أبدأ بالمرحلتين **0أ و0ب** معًا في فرع واحد (`fix/credibility-seo`). لا تحتاجان أي معلومة منك، وتنتهيان بـ Preview تراجعه قبل الدمج. وبالتوازي تجيب على **A1، A3، B1–B7** من [10-open-questions.md](10-open-questions.md) لإكمال 0ج.
