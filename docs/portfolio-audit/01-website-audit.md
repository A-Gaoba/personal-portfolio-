# 01 — تحليل الموقع الحالي

> تاريخ الفحص: 2026-11-07 · المستودع: `A-Gaoba/personal-portfolio-` (آخر commit: `ef7aea7`، 2025-12-29) · الموقع الحي: `https://gaoba.vercel.app`
>
> **منهجية الفحص:** قراءة كل ملفات `app/` و`components/` والإعدادات، فحص الروابط الخارجية بطلبات HTTP، فتح الموقع الحي في Chrome (headless) على مقاسي 1440px و390px (iPhone) مع قياسات من المتصفح نفسه، تشغيل `tsc --noEmit`، ومقارنة الألوان بمعايير WCAG. لم يُعدَّل أي ملف في المشروع؛ كل الاختبارات جرت على نسخة منفصلة.
>
> كل نقطة أدناه موثقة بملف/سطر أو بقياس. ما لم أستطع التحقق منه مذكور صراحةً بأنه «غير قابل للتحقق».

---

## الخلاصة في سطور

| المحور | التقييم | أهم سبب |
|---|---|---|
| الصفحة الرئيسية | 4/10 | شكل قالب v0 عام، عنوان مخفي، نموذج تواصل لا يرسل شيئًا |
| تقديم الهوية | 3/10 | لا ذكر للذكاء الاصطناعي أو GAOBA AI أو تحليل البيانات إطلاقًا |
| المشاريع | 3/10 | أرقام نتائج منسوخة بقالب واحد، 14 من 15 رابط GitHub يعيد 404 |
| المهارات والتعليم | 4/10 | 3 بطاقات مهارات فارغة، تواريخ متضاربة |
| التصميم والألوان والخطوط | 4/10 | ألوان One Dark/VS Code، لا خط عربي، 22 متغير CSS غير معرّف |
| تجربة المستخدم والتنقل | 5/10 | 7 روابط في القائمة، الصفحة الرئيسية بطول ~20 شاشة على الهاتف |
| التوافق مع الهاتف | 5/10 | تمرير أفقي في صفحة About، Navbar مكرر |
| الأداء | 4/10 | خلفية متحركة تعيد الرسم مع كل حركة فأرة، صور حتى 1.9MB بلا تحسين |
| SEO | 2/10 | الـ canonical يشير إلى نطاق غير موجود، صورة OG مفقودة، Schema بأسماء وهمية |
| جودة الكود | 4/10 | 18 خطأ TypeScript مخفي، كود ميت كثير، بيانات داخل المكونات |
| الاعتماديات | 3/10 | 44 من 50 مكون UI غير مستخدم، ~25 حزمة زائدة، ملفّا lock متعارضان |
| الأمان | 6/10 | لا ثغرات حرجة، لكن رقم الهاتف والعنوان منشوران، ونموذج يطبع البيانات في console |
| المحتوى | 2/10 | شهادات عملاء مختلقة، بريد `example.com`، روابط Calendly وهمية |
| الأزرار والروابط | 3/10 | روابط مكسورة متعددة (تفاصيل في القسم 14) |
| وضوح الهوية | 3/10 | «Abdulrahman.dev» بدون نطاق فعلي، لا علاقة بصرية بـ GAOBA AI |

**التقييم العام: 3.5/10.** الأساس التقني (Next.js 16 + App Router + Tailwind + Vercel) جيد وقابل للتوسع، والمشكلة الأساسية في **المحتوى والمصداقية وSEO**، وليست في البنية. لذلك **لا أنصح بإعادة البناء من الصفر**.

---

## 1. البنية الحالية للمشروع

```
app/
  layout.tsx            ← Navbar + Footer + ThemeProvider + JSON-LD + Vercel Analytics
  page.tsx              ← الرئيسية: 7 أقسام "Highlight"
  about/ projects/ skills/ services/ testimonials/ contact/
  components/           ← 24 مكون (5 منها غير مستخدمة)
  sitemap.ts robots.ts manifest.ts
components/ui/          ← 50 مكون shadcn (6 مستخدمة فقط)
hooks/                  ← نسخة مكررة من components/ui/use-*.ts
styles/globals.css      ← غير مستورد في أي مكان
public/                 ← صورة شخصية + 15 صورة مشاريع
```

- **Next.js 16.1.1، React 19.2، Tailwind 3.4، Framer Motion، shadcn/ui.** اسم الحزمة في `package.json` ما زال `my-v0-project`، أي أن الموقع مولَّد في الأصل بـ v0 ولم يُخصَّص.
- **كل الصفحات تقريبًا Client Components** (`"use client"` في 21 ملفًا)، رغم أن محتواها ثابت.
- **البيانات مكتوبة داخل المكونات** (مثلًا 15 مشروعًا في [Projects.tsx](../../app/components/Projects.tsx) بطول 868 سطرًا)، وتتكرر بنسخ مختلفة في `ProjectsHighlight.tsx` و`AboutHighlight.tsx` و`About.tsx` و`layout.tsx`.

---

## 2. الصفحة الرئيسية

**الملفات:** [app/page.tsx](../../app/page.tsx)، [Hero.tsx](../../app/components/Hero.tsx) و6 مكونات `*Highlight`.

| ما وجدته | الدليل |
|---|---|
| تصميم Hero عام: «terminal» + `const role = "..."` + محرر كود وهمي. هذا الشكل منتشر جدًا في قوالب v0/AI. | `Hero.tsx` |
| **`DeveloperBackground` يُرسم مرتين**: مرة في `page.tsx` ومرة داخل `Hero.tsx`. | [page.tsx:92](../../app/page.tsx#L92)، [Hero.tsx:49](../../app/components/Hero.tsx#L49) |
| تأثير الكتابة في Hero ينشئ `setTimeout` متداخلة دون إلغاء عند تفكيك المكون. | [Hero.tsx:16-38](../../app/components/Hero.tsx#L16-L38) |
| زر «Twitter» يظهر بأيقونة Terminal. | [Hero.tsx:44](../../app/components/Hero.tsx#L44) |
| **عنوان «Next Project?» غير مرئي** (نص شفاف بلا خلفية). تم التحقق في Chrome: `-webkit-text-fill-color: transparent` و`background-image: none`. | [ContactHighlight.tsx:114](../../app/components/ContactHighlight.tsx#L114) + `.text-gradient-syntax` في [globals.css:75](../../app/globals.css#L75) |
| **نموذج «Send a Quick Message» في الرئيسية لا يرسل شيئًا**: `handleSubmit` يكتفي بـ `console.log`. أي عميل يكتب رسالة هنا يخسرها دون أن يعرف. | [ContactHighlight.tsx:51-55](../../app/components/ContactHighlight.tsx#L51-L55) |
| بريد التواصل في الرئيسية `abdulrahman@example.com`، وروابط Calendly `your-quick-call-link`. | [ContactHighlight.tsx:22-40](../../app/components/ContactHighlight.tsx#L22-L40) |
| 4 شهادات عملاء بأسماء وهمية (Jane Doe، John Smith...) وصور placeholder. | [TestimonialsSlider.tsx:8-45](../../app/components/TestimonialsSlider.tsx#L8-L45) |
| طول الصفحة على الهاتف **17,440px (~20 شاشة)**، وعلى الحاسوب 10,490px. | قياس Chrome |
| زر «View My Work» يقفز إلى `#projects` في الصفحة نفسها، و«Get Free Consultation» إلى `#contact`: يعملان، لكنهما يقودان إلى المحتوى الضعيف المذكور أعلاه. | |

## 3. طريقة تقديم نفسك

- العنوان الوظيفي في كل مكان: **«Full Stack Developer & UI/UX Designer»**، ولا ذكر للذكاء الاصطناعي أو الأتمتة أو تحليل البيانات أو المنتجات الرقمية أو GAOBA AI (`grep` على `instagram|claude|chatgpt|automation|prompt` لا يعيد أي نتيجة).
- في الوقت نفسه حسابك على GitHub يحتوي مشاريع حديثة أقرب لهويتك الحالية ولا تظهر في الموقع: `ai-post-generator` (Postora)، `forcasting`، `DMLS`، `LinkCollector`، `chat-bot`، `facial-recognition`، و`learn-management-sysetem`.
- الماجستير في **Data-Driven Management (RUDN)** مذكور في سطر واحد فقط في `About.tsx`، بينما هو الجسر الطبيعي بين «مطوّر» و«بيانات + AI».
- التعريف في الـ meta يحشو أخطاء إملائية مقصودة للاسم («abdulraman gaoba, a-gaboa, abdulrahamn gooba») داخل الوصف المرئي في نتائج البحث. هذا يضر بالمظهر المهني ولا يفيد SEO فعليًا.

## 4. المشاريع

**الملفات:** [Projects.tsx](../../app/components/Projects.tsx)، [ProjectsHighlight.tsx](../../app/components/ProjectsHighlight.tsx)

**فحص الروابط (HTTP، 2026-11-07):**

| المشروع | الرابط الحي | رابط GitHub في الموقع |
|---|---|---|
| Naqla Tech | `naqlatech.com` → **404** | **404** |
| Anfasak Perfumes | 200 ✓ | **404** |
| Ghofran Badran | 200 ✓ | **404** (المستودع الفعلي: `ghofran_badran`) |
| Gifts Touchy | 200 ✓ | **404** |
| Junzi Tech | 200 (يعيد التوجيه إلى `junzidev.com`) | **404** |
| Loqmat Hala | 200 ✓ | 200 ✓ |
| Planner Balloons | 200 ✓ | **404** |
| Product Senab | 200 ✓ | **404** |
| Richy Planner | 200 ✓ | **404** |
| Sara Alhassany | 200 ✓ | **404** (المستودع الفعلي: `sara_alhassany`) |
| Yemen Culture | 200 ✓ | **404** |
| Qesat Shalet | 200 ✓ | **404** |
| GaobaVid | `gaobavid.com` → **لا يستجيب** | **404** |
| To Russia! | 200 ✓ | **404** |
| E-Commerce Dashboard | `dashboard-demo.com` → **لا يستجيب** (رابط وهمي، ويستخدم صورة Richy) | **404** |

> قد تكون بعض المستودعات خاصة (Private)، وهذا يعطي 404 أيضًا. في الحالتين يرى الزائر صفحة خطأ.

**الأرقام والإنجازات:** كل مشروع يحمل 4 مقاييس و4 «نتائج» بالقالب نفسه (+X% نمو، 4.8/5 رضا، 99.9% uptime...). أمثلة:
- Naqla Tech: «1000+ users، $50K+ revenue، 40% efficiency، 85% retention» ومدته «2021-2023»، بينما صفحة About تقول إن Naqla Tech بدأت **Jan 2025**، وموقعها يعيد 404.
- GaobaVid: «10K+ viewers، 60% faster» والموقع لا يعمل.
- E-Commerce Dashboard: «100+ active merchants، 1M+ data points» والرابط وهمي.

**لم أجد أي دليل على هذه الأرقام في المستودع**، ولن أقترح أرقامًا بديلة. القرار لك: احتفظ بالرقم إذا كان لديك مصدر (لوحة Analytics، فاتورة، رسالة عميل)، واحذفه إذا لم يكن.

> ملاحظة: الملف [PROJECTS_SERVICES_AUDIT_REPORT.md](../../PROJECTS_SERVICES_AUDIT_REPORT.md) (يناير 2025) رصد المشكلة نفسها ووصف مستوى المصداقية بـ «CONCERNING»، ولم يُنفَّذ أي من توصياته.

**طريقة العرض:** شبكة بطاقات تفتح Dialog. البطاقات `div` قابلة للنقر بدون `button`/`role` (لا تعمل من لوحة المفاتيح)، ولا توجد صفحة مستقلة لكل مشروع، رغم أن `sitemap.ts` يعلن عن `/projects/naqla-tech` وغيرها، **وهذه الصفحات غير موجودة (404)**.

## 5. المهارات والخبرات والتعليم

- **[Skills.tsx:51-57](../../app/components/Skills.tsx#L51-L57):** فئات البطاقات (Frontend, Backend, Database, Cloud, DevOps, Testing, Design) لا تطابق فئات البيانات (Languages, Frontend, Backend, Database, Tools, Testing, Practices). النتيجة، وقد تأكدت منها بالصورة: **بطاقات Cloud وDevOps وDesign فارغة**، ومهارات JavaScript وTypeScript وPrisma وJira وScrum... **لا تظهر أبدًا**.
- أيقونات الشهادات تشير إلى `/icons/ai.svg` و`/icons/data-analytics.svg`، **والمجلد `public/icons` غير موجود**.
- عنوان «Skills» في صفحة المهارات **غير مرئي** (المشكلة نفسها في `.text-gradient-syntax`)، والصفحة بلا `<h1>` حقيقي.
- [SkillsHighlight.tsx:170-171](../../app/components/SkillsHighlight.tsx#L170-L171): ألوان الحلقات تُبنى من أسماء كلاسات Tailwind (`#syntax-cyan`) وهي ليست ألوانًا صالحة، فلا يُرسم التدرج.
- نسب المهارات (React 95%، Next.js 92%...) ومقولة «50+ Technologies Mastered» ادعاءات لا يمكن قياسها، ومسؤولو التوظيف عادةً يتجاهلونها أو يرونها مبالغة.

**تضارب في التواريخ والخبرة:**

| المعلومة | المصدر 1 | المصدر 2 |
|---|---|---|
| سنوات الخبرة | «5+ Years Experience» (`AboutHighlight`، `About`، الـ meta) | «over a year of experience» (النص نفسه في `About` وJSON-LD) |
| Naqla Tech | «Jan 2025 – Present» (`About.tsx`) | «2021-2023» (`Projects.tsx`) |
| CereSoftware | «2023–Present» (timeline) + `worksFor` في JSON-LD | «Apr 2023 – Jan 2024» (قسم Experience) |
| الموقع | «Moscow, Russia» | «Remote, Yemen» (timeline) |
| عدد المشاريع | «50+ Projects» / «50+ Happy Clients» | 15 مشروعًا معروضًا، أحدها وهمي |

ترتيب الـ timeline أيضًا غير زمني (2020 ← 2024 ← 2017 ← 2023).

## 6. التصميم والألوان والخطوط

- **الهوية الحالية:** «One Dark Pro / VS Code» (خلفية `#1E1E1E`، أزرق `#61AFEF`، أخضر `#98C379`، بنفسجي، برتقالي...) مع تدرجات ملونة وتوهج (glow) في كل قسم. **لا علاقة بصرية بهوية GAOBA Editorial** (عاجي + حبر أسود + أحمر برتقالي). المقارنة التفصيلية في [04-gaoba-ai-resources.md § الهوية](04-gaoba-ai-resources.md#9-الهوية-البصرية-الموحدة-design-tokens).
- **22 متغير CSS مستخدم وغير معرّف** في [globals.css](../../app/globals.css) (`--color-accent-primary`، `--syntax-blue`...). أثرها: العناوين المتدرجة تختفي، وأنماط `.btn-*` و`.card` و`a { color }` لا تعمل.
- **تعليقات الألوان خاطئة:** `--primary: 207 90% 65%` معلَّق عليه `#007ACC` وقيمته الفعلية قريبة من `#5AA9F0`.
- **3 خطوط لاتينية** (Inter + Poppins **بكل الأوزان التسعة** + JetBrains Mono) و**لا يوجد خط عربي**، مع أن الجمهور المستهدف عربي.
- كلاسات Tailwind غير موجودة في الإعدادات: `xs:*` (6 مرات)، `shadow-glow-primary` (18)، `shadow-glow-secondary` (16)، `animate-pulse-slow`، `opacity-6/8/15`. هذه كلها تُتجاهل بصمت.
- قاعدة `* { transition: ... 200ms }` في [globals.css:260](../../app/globals.css#L260) تطبق الانتقال على كل عنصر في الصفحة.

## 7. تجربة المستخدم والتنقل

- القائمة فيها 7 روابط: Home وAbout وProjects وSkills وServices وTestimonials وContact. Skills وTestimonials لا تستحقان صفحتين مستقلتين بمحتواهما الحالي.
- كل قسم في الرئيسية ينتهي بزر «View All ...»، فيعيد الزائر محتوى رآه للتو.
- لا يوجد مسار واضح لكل نوع زائر (مسؤول توظيف / عميل / متابع Instagram)، ولا رابط لتحميل السيرة الذاتية.
- اللوغو `Abdulrahman.dev` هو `<h1>` في الـ Navbar وفي الـ Footer، فكل صفحة فيها 2–4 عناصر `<h1>`.

## 8. التوافق مع الهواتف

القياسات من Chrome بمقاس 390×844 وUser-Agent لـ iPhone:
- **صفحة About فيها تمرير أفقي**: عرض المستند 425px على شاشة 390px.
- **صفحة About تعرض شريطي تنقل** (`navCount: 2`) لأن [about/page.tsx:77](../../app/about/page.tsx#L77) يضيف `<Navbar />` فوق الموجود في `layout.tsx`.
- محرر الكود الوهمي في Hero أعرض من الشاشة (مقصوص بـ `overflow-hidden`).
- الأزرار والقائمة الجانبية تعمل جيدًا، وأحجام اللمس ≥44px مضبوطة في [globals.css:279-292](../../app/globals.css#L279-L292). **هذه نقطة جيدة.**

## 9. الأداء وسرعة التحميل

- **[DeveloperBackground.tsx](../../app/components/DeveloperBackground.tsx) هو أكبر مشكلة أداء:**
  - `mousemove` ← `setState` ← إعادة رسم كاملة مع **كل حركة فأرة**.
  - في كل إعادة رسم يُعاد توليد 50 موقعًا عشوائيًا بـ `Math.random()`، فتقفز العناصر.
  - `setInterval` كل 100ms يعيد الرسم أيضًا.
  - ~85 حركة لانهائية (50 نقطة + 15 نص + 20 خط «Matrix»)، ومضروبة في 2 لأن المكون يُرسم مرتين في الرئيسية.
- **`images.unoptimized: true`** في [next.config.mjs](../../next.config.mjs) يعطّل تحسين Next/Image بالكامل. الصورة الشخصية 946KB، وصور المشاريع بين 85KB و**1.9MB** (`productsenab.png`)، أي ~12MB في صفحة المشاريع.
- `framer-motion` مستورد في 21 ملفًا، وكل عنصر تقريبًا له `whileInView` و`whileHover`.
- Poppins بتسعة أوزان يزيد ملفات الخطوط.

## 10. تحسين محركات البحث (SEO)

| المشكلة | الأثر | الدليل |
|---|---|---|
| **`metadataBase` و`canonical` و`sitemap` و`robots` تشير إلى `abdulrahmangooba.dev`، وهذا النطاق لا يعمل (DNS لا يستجيب).** الموقع الحي على `gaoba.vercel.app` يعلن أن نسخته «الأصلية» في نطاق ميت. | Google قد يتجاهل الصفحات أو يرفض فهرستها | [layout.tsx:99-106](../../app/layout.tsx#L99-L106)، [sitemap.ts](../../app/sitemap.ts)، [robots.ts](../../app/robots.ts) |
| JSON-LD يستخدم **ثلاثة نطاقات**: `gaoba.vercel.app` و`abdulrahmangooba.dev` و`abdulrahman.dev`. **النطاق الأخير يملكه شخص آخر** («Abdulrahman Salah — Software Engineer»). | إشارة هوية خاطئة | `projects/page.tsx:77`، `skills/page.tsx`، `contact/page.tsx`، `testimonials/page.tsx` |
| `/og-image.jpg` غير موجود (404) | لا صورة معاينة عند مشاركة الرابط | [layout.tsx:114](../../app/layout.tsx#L114) |
| `hreflang` يعلن `/en` و`/ar` وكلاهما 404 | إشارة لغوية مكسورة | [layout.tsx:102-105](../../app/layout.tsx#L102-L105) |
| رموز تحقق Google وBing نصوص placeholder (`your-google-verification-code`) | تُنشر كما هي في `<head>` | [layout.tsx:144-152](../../app/layout.tsx#L144-L152) |
| `SearchAction` يشير إلى `/search` غير الموجود | Schema غير صالح | [layout.tsx:244-248](../../app/layout.tsx#L244-L248) |
| Schema لمشاريع «Project Alpha / Beta» وتقييمات (Review) بأسماء وهمية | Google يعتبر التقييمات المختلقة مخالفة لإرشادات البيانات المنظمة | `projects/page.tsx`، `testimonials/page.tsx` |
| `sitemap` يعلن 3 صفحات مشاريع غير موجودة | أخطاء 404 في Search Console | [sitemap.ts:53-72](../../app/sitemap.ts#L53-L72) |
| `lang="en"` لكل الموقع، ولا محتوى عربي، مع كلمات مفتاحية عربية | لا ترتيب فعلي بالعربية | |
| حشو كلمات مفتاحية (meta keywords يتجاهلها Google) وتكرار «عبد الرحمن قوبع» مرتين في كل قائمة | لا فائدة، ومظهر غير مهني في الكود | |
| LinkedIn بثلاث صيغ: `linkedin.com/a-gaoba` (404) و`/in/a-gaoba` و`/in/A_Gaoba` | روابط مكسورة | `Hero.tsx`، `Footer.tsx`، `layout.tsx` |

## 11. جودة الكود وتنظيم الملفات

- **`typescript.ignoreBuildErrors: true`** يخفي **18 خطأ TypeScript** (من تشغيل `tsc --noEmit`): 17 من نوع variants في Framer Motion (`ease: number[]`)، وخطأ مفتاح مكرر `top` في [DeveloperBackground.tsx:172](../../app/components/DeveloperBackground.tsx#L172).
- مفتاح `eslint` في `next.config.mjs` **لم يعد مدعومًا في Next 16** (تحذير عند البناء). ولا يوجد ESLint مُعد أصلًا.
- **كود ميت:** `AnimatedBackground.tsx` و`ParticleBackground.tsx` و`Certifications.tsx` (576 سطرًا، فيه شهادات AWS وGoogle بأرقام اعتماد مختلقة مثل `AI-2024-001`) و`Contact.tsx` و`ProjectModal.tsx`، كلها غير مستوردة. وكذلك `styles/globals.css` و`hooks/` (نسخة مكررة) و5 صور placeholder في `public/`.
- `ProjectsPageClient.tsx` يغلّف مكونًا في `<main>` داخل `<main>` آخر.
- ملف [README.md](../../README.md) يصف «Next.js 14» و«WCAG compliant» و«English & Arabic»، وكلها غير دقيقة.
- **لا يوجد اختبار واحد ولا CI.**

## 12. المكتبات والاعتماديات

- **45 من 50** ملفًا في `components/ui/` غير قابلة للوصول من أي صفحة. المستخدم فقط: `button` و`dialog` و`input` و`label` و`textarea`. (تحديث 2026-11-07: تحقّقٌ بتحليل رسم الاستيراد الكامل، لا ببحث نصي؛ التفاصيل وخطة التنظيف التدريجي في [07 § 1ب](07-implementation-roadmap.md#1ب-التنظيف-التدريجي-الآمن--35-س)).
- حزم يستوردها **فقط** ملف UI غير مستخدم، أو لا يستوردها أحد: `@emotion/is-prop-valid`، `@formspree/react`، `@hookform/resolvers`، `react-hook-form`، `zod`، `date-fns`، `react-day-picker`، `recharts`، `cmdk`، `vaul`، `input-otp`، `embla-carousel-react`، `react-resizable-panels`، `sonner`، `autoprefixer` (غير مفعّل في `postcss.config.mjs`)، و24 حزمة `@radix-ui/*`.
- **استثناءات لا تُحذف رغم أن التحليل الآلي يعتبرها غير مستوردة:** `react-dom` (peer لـ Next)، و`tailwindcss-animate` (في الإعدادات، و`dialog` يستخدمه)، و`next-themes` (الوضع الداكن)، و`zod` (مخطط المحتوى لاحقًا).
- `framer-motion` و`@emotion/is-prop-valid` بإصدار `"latest"`، فكل تثبيت قد يجلب إصدارًا مختلفًا.
- **ملفّا lock متعارضان:** `package-lock.json` قديم (Next 15.2.4) و`pnpm-lock.yaml` حديث (Next 16.1.1). `npm ci` **يفشل** بخطأ `ERESOLVE` (`react-day-picker@8` يتطلب `date-fns` ≤3، والمشروع يثبت 4.1.0). `pnpm install --frozen-lockfile` ينجح.
- `react-calendly` مستخدم في صفحة Contact فقط، ويحمّل iframe ثقيلًا (700px).

## 13. الأمان والمشكلات التقنية

- **لا توجد أسرار مكشوفة** في الكود، و`.env*` في `.gitignore`. **جيد.**
- `JsonLd` يستخدم `dangerouslySetInnerHTML` مع `JSON.stringify` لبيانات ثابتة. هذا آمن الآن، لكن عند ربطه ببيانات من CMS يجب تهريب `<` (مثلًا `.replace(/</g, '\\u003c')`).
- **رقم هاتف شخصي وواتساب ومدينة** منشورة في الـ Footer وفي JSON-LD. هذا قرارك، لكن مع جمهور Instagram كبير أنصح باستبداله بنموذج تواصل أو رابط واتساب للأعمال.
- Formspree ID (`xnnzdron`) ظاهر في العميل، وهذا طبيعي في Formspree، لكن لا توجد حماية من السبام (honeypot أو reCAPTCHA).
- لا توجد ترويسات أمان مخصصة (CSP وغيرها). أولوية منخفضة لموقع ثابت، لكنها تصبح ضرورية عند إضافة الدفع.

## 14. المحتوى القديم/المكرر/الوهمي، والأزرار والروابط غير المكتملة

**محتوى وهمي (يجب حذفه، لا تعديله):**
- 4 شهادات في `TestimonialsSlider.tsx` و5 في `Testimonials.tsx` (Sarah Chen، Michael Rodriguez، Emily White، David Lee، Jessica Brown)، وكلها بصور placeholder.
- «50+ Happy Clients» و«100% Success Rate» و«24h Response Guaranteed» في `ContactHighlight.tsx`.
- أسعار الخدمات («Starting from $5,000»، «$150/hour»...): ليست وهمية بالضرورة، لكنها **تحتاج تأكيدك**.

**روابط مكسورة أو وهمية:**
`abdulrahman@example.com` · `calendly.com/your-quick-call-link` · `calendly.com/your-project-meeting-link` · `calendly.com/your-link` (في Contact.tsx غير المستخدم) · `linkedin.com/a-gaoba` · 14 رابط GitHub · `naqlatech.com` · `gaobavid.com` · `dashboard-demo.com` · `/og-image.jpg` · `/en` · `/ar` · `/search` · `/projects/naqla-tech` و2 مثلها في sitemap.

**تكرار:** نص «Honors Software Engineering graduate (GPA 4.8)...» في 3 أماكن. عنوان «From Academic Excellence to Startup Success» في الرئيسية وAbout. حلقة الصورة الدوارة والشارات نفسها في `AboutHighlight` و`About` و`about/page.tsx`.

**بريدان مختلفان:** الموقع يستخدم `abdulrahmangooba@gmail.com` وCalendly يستخدم `abdalrahmangooba25`. **تأكد أي بريد هو الصحيح والنشط.**

## 15. وضوح الهوية الشخصية والتجارية

- **الاسم التجاري المعروض:** «Abdulrahman.dev»، ولا يوجد نطاق `.dev` فعلي.
- **الهوية على Instagram:** `@a_gaoba.ai`، GAOBA AI، محتوى عربي عن AI. **غير موجودة في الموقع إطلاقًا**، ولا رابط Instagram حتى في الـ Footer.
- **الهوية في الفيديوهات:** GAOBA Editorial (عاجي، حبر أسود، أحمر برتقالي، خط Readex Pro). **الموقع على النقيض تمامًا** (داكن، أزرق وأخضر، Inter).
- النتيجة: من يأتي من Instagram لن يتعرف على أنه في المكان الصحيح، ومن يأتي من LinkedIn لن يعرف أنك تبني جمهورًا ومنتجات في الذكاء الاصطناعي.

---

## ما يعمل جيدًا ويستحق الاحتفاظ به

1. **الإطار التقني:** Next.js App Router + TypeScript + Tailwind + Vercel. ممتاز للتوسع (MDX، API routes، webhooks للدفع لاحقًا).
2. **`app/sitemap.ts` و`robots.ts` و`manifest.ts`** موجودة بالشكل الصحيح، وتحتاج فقط تصحيح النطاق والروابط.
3. **صفحة Contact الكاملة** ترسل فعلًا عبر Formspree مع معالجة أخطاء ([ContactPage.tsx:43-66](../../app/contact/ContactPage.tsx#L43-L66)).
4. **Vercel Analytics** مثبت، ويمكن استخدامه لاحقًا لتتبع نسخ البرومبتات والتنزيلات دون مكتبة جديدة.
5. **صور المشاريع الحقيقية** و**12 موقعًا حيًا يعمل** (200 OK)، وهذه مادة جيدة لدراسات حالة صادقة.
6. **دعم `prefers-reduced-motion`** و**أحجام لمس ≥44px** في CSS.
7. **قائمة الهاتف** تعمل بشكل سليم.
8. **الصورة الشخصية** حقيقية واحترافية، وتحتاج فقط ضغطًا.
