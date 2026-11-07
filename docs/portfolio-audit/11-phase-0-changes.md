# 11 — سجل تنفيذ المرحلتين 0أ و0ب

> **التاريخ:** 2026-11-07 · **الفرع:** `fix/credibility-seo` · **نقطة الرجوع:** tag `pre-redesign-2026-11` (= `main` عند `ef7aea7`)
>
> **النطاق:** 0أ و0ب فقط، بموافقة GAOBA. **لم يُغيَّر** نظام الألوان ولا الخطوط ولا التصميم العام، ولم تبدأ 0ج أو أي مرحلة أخرى.
>
> **مبدأ التنفيذ:** ما هو **مؤكد أنه وهمي** أُزيل من الواجهة. وما **قد يكون صحيحًا لكنه بلا مصدر** أُخفي **دون حذف** من الكود، ويعود بتغيير قيمة واحدة. ولا شيء حُذف نهائيًا: كل ما أُزيل يمكن استعادته من git.

---

## 1. آليات الإخفاء (كيف يُستعاد كل شيء)

| الآلية | الملف | ماذا تخفي | الاستعادة |
|---|---|---|---|
| `SHOW_UNVERIFIED_CLAIMS = false` | `lib/site.ts` | كل الأرقام والمقاييس والأسعار بلا مصدر (القائمة في §3) | تغيير القيمة إلى `true` يعيد **كل** شيء كما كان. الأفضل: تأكيد كل رقم على حدة (0ج)، ثم حذف ما لم يُؤكَّد |
| `withoutUnverifiedClaims()` / `unverified()` | `lib/claims.ts` | جمل الأرقام داخل أوصاف المشاريع، و«50+» داخل نصوص About | النصوص الأصلية **لم تُعدَّل** في ملفات البيانات؛ الإخفاء وقت العرض فقط |
| `VERIFIED_LIVE_URLS` / `VERIFIED_REPO_URLS` | `lib/verified-links.ts` | أزرار «View Live» و«Source Code» لكل رابط لم يعمل في 2026-11-07 | إضافة الرابط إلى القائمة بعد إصلاحه أو تأكيده. الروابط الأصلية **باقية** في بيانات المشاريع |
| `HIDDEN_PROJECT_IDS` | `app/components/Projects.tsx` | مشروع «E-Commerce Dashboard» (id 15) | حذف الرقم 15 من المجموعة |
| `profile.links.linkedin = null` | `content/profile.ts` | أيقونة LinkedIn في Hero وFooter وContact، وفي `sameAs` | وضع الرابط الصحيح (السؤال A3)، فيظهر في كل الأماكن تلقائيًا |
| `SHOW_CERT_ICONS = false` | `app/components/Skills.tsx` | أيقونات الشهادات (ملفاتها غير موجودة) | إضافة الملفات إلى `public/icons/` ثم `true` |

## 2. ما أُزيل من الواجهة (مؤكد أنه وهمي أو مكسور)

| العنصر | أين كان | ما حدث | الاستعادة من git |
|---|---|---|---|
| 4 شهادات عملاء بأسماء مختلقة (Jane Doe، John Smith…) | قسم في الرئيسية (`TestimonialsSlider`) | أُزيل من `app/page.tsx`. **ملف المكون باقٍ كما هو** | — |
| صفحة `/testimonials` (5 شهادات مختلقة + Schema Review) | `app/testimonials/page.tsx` | الملف حُذف من الفرع؛ والمسار يعيد توجيهًا مؤقتًا (307) إلى `/`. **ملف المكون `Testimonials.tsx` باقٍ** | `git checkout pre-redesign-2026-11 -- app/testimonials/page.tsx` |
| رابط «Testimonials» في القائمة | `Navbar.tsx` | أُزيل | — |
| بريد `abdulrahman@example.com` + رابطا Calendly وهميان (`your-quick-call-link`، `your-project-meeting-link`) | `ContactHighlight.tsx` | استُبدلت بالبريد المستخدم في باقي الموقع ورابط Calendly الحقيقي (متحقق: 200) | — |
| «Get a response within 24 hours»، «24h Response Guaranteed»، «50+ Happy Clients»، «100% Success Rate» | `ContactHighlight.tsx` | أُزيلت | `git show pre-redesign-2026-11:app/components/ContactHighlight.tsx` |
| نموذج الرئيسية الذي ينفذ `console.log` فقط | `ContactHighlight.tsx` | استُبدل بمكون `components/ContactForm.tsx` المشترك (Formspree) | — |
| JSON-LD بـ `abdulrahman.dev` (موقع شخص آخر)، و«Project Alpha/Beta»، وReviews وهمية | `app/{projects,skills,contact,testimonials}/page.tsx` | استُبدل بـ JSON-LD صحيح على `gaoba.vercel.app` | — |
| رموز التحقق `your-google-verification-code` و`your-bing-verification-code` | `app/layout.tsx` | أُزيلت (تُضاف الحقيقية في المرحلة 4) | — |
| `hreflang` إلى `/en` و`/ar` (غير موجودتين) و`SearchAction` إلى `/search` (غير موجود) | `app/layout.tsx` | أُزيلت | — |
| `telephone` و`address` و`worksFor CereSoftware` في JSON-LD | `app/layout.tsx` | أُزيلت من JSON-LD فقط (A6، B2). **الهاتف ما زال ظاهرًا في Footer وContact** حتى قرارك | — |
| قوائم `keywords` الطويلة بالتهجئات الخاطئة والتكرار، ووصف meta فيه «5+ years experience» | `layout.tsx` وكل الصفحات | وصف طبيعي بلا أرقام؛ قائمة كلمات مختصرة؛ التهجئات البديلة في `alternateName` (JSON-LD) فقط | `git show pre-redesign-2026-11:app/layout.tsx` |
| 3 صفحات مشاريع غير موجودة في sitemap (`/projects/naqla-tech`…) + `/testimonials` | `app/sitemap.ts` | أُزيلت | — |
| `DeveloperBackground` الثاني داخل Hero | `Hero.tsx` | أُزيل (الصفحة ترسم واحدًا) | — |
| `<Navbar />` الثاني في صفحة About | `app/about/page.tsx` | أُزيل | — |

## 3. ما أُخفي (قد يكون صحيحًا، يحتاج تأكيدك: 10-open-questions.md)

| ما أُخفي | المكان | السؤال المرتبط |
|---|---|---|
| مقاييس المشاريع: «1000+ Users»، «$50K+ Revenue»، «40% Efficiency»، «10K+ Viewers»، «98% Mobile Score»… | `ProjectsHighlight.tsx` (الرئيسية) | C1–C14 |
| قسما «Key Results & Metrics» و«Achieved Results» في نافذة كل مشروع | `Projects.tsx` | C1–C14 |
| جمل الأرقام في أوصاف المشاريع («Achieved +40% sales growth…»، «serving over 1000 active users and generating $50K+…»، «60% faster loading»، «98% score») | `Projects.tsx`، `ProjectsHighlight.tsx` | C1–C14 |
| مشروع «E-Commerce Dashboard» (رابطه وهمي، وصورته مكررة) | `Projects.tsx` | C15 |
| بطاقات الإحصاءات: «4.8/5 GPA»، «1000+ Users»، «50+ Projects»، «5+ Years» | `AboutHighlight.tsx` (الرئيسية) | B1، B6، B8 |
| «50+» في 3 جمل عن العمل الحر | `About.tsx` | B6 |
| نسب المهارات (95%، 92%، 94%، 88%) و«50+» في «Technologies Mastered» | `SkillsHighlight.tsx` | B13 |
| الأسعار («Starting from $5,000»…) | `ServicesHighlight.tsx`، `Services.tsx` | D2 |
| شارة «Most Popular» | `Services.tsx` | D2 |
| بطاقتا «1000+ Users Served» و«60% Performance Boost» | `Services.tsx` | C1 |
| أزرار «View Live» لـ Naqla Tech (404) وGaobaVid (لا يستجيب) و«E-Commerce Dashboard» (وهمي) | المشاريع | B5، C13، C15 |
| أزرار GitHub لـ 12 مستودعًا (404) | المشاريع | C2–C14 |
| LinkedIn (غير قابل للتحقق آليًا، و3 صيغ مختلفة إحداها 404) | Hero، Footer، Contact، JSON-LD | A3 |

**ما لم يُخفَ رغم أنه ادعاء (ليس رقم إنجاز، ويُعالج في 0ج أو المرحلة 2):** معدلات GPA في نصوص About والتعليم (B8)، «over a year of experience» (B1)، تواريخ CereSoftware وNaqla Tech المتضاربة (B2–B4)، «Remote, Yemen» (A7)، وصف Naqla كـ «logistics platform» (B3)، عبارات مثل «React.js Expert» و«Mastered» و«Excellence» (نص تسويقي يُعاد كتابته في المرحلة 2).

## 4. الإصلاحات المنفذة

### 0أ — المصداقية والروابط والنموذج
1. **نموذج الرئيسية يرسل فعلًا** عبر Formspree بمكون مشترك مع صفحة Contact، مع: حقول `name`، وhoneypot `_gotcha` ضد السبام، وترويسة `Accept: application/json` (تتطلبها Formspree)، وحقل `source` (`home` أو `contact`) يظهر في البريد الوارد، وتحقق من البريد بتعبير منتظم بدل `includes("@")`، ورسائل نجاح وخطأ تُعلَن لقارئ الشاشة.
2. **العناوين المخفية** («Next Project?»، «Skills»، «Services & Solutions»، «Full-Stack Excellence») أصبحت نصًا أخضر بلون الموقع الحالي نفسه (`text-syntax-green`).
3. **بطاقات المهارات:** الفئات تطابق البيانات (Languages، Frontend، Backend، Database، Tools، Testing، Practices). لا بطاقة فارغة، وكل المهارات الـ 25 ظاهرة.
4. **التمرير الأفقي في صفحة Contact على الهاتف** (415px على شاشة 390px) أُصلح: `overflow-hidden` و`min-w-0` و`break-all` للبريد الطويل. هذه مشكلة سابقة اكتُشفت أثناء الاختبار.
5. **روابط X و GitHub والبريد والهاتف** تأتي من `content/profile.ts`. ورابط X كان مرسومًا بأيقونة Terminal في Hero، فأصبح بأيقونته الصحيحة.
6. تصحيح مستودعَي `ghofran_badran` و`sara_alhassany` (كانا بأسماء خاطئة).

### 0ب — SEO والنطاق المركزي
1. **`lib/site.ts`:** `SITE_URL` = `NEXT_PUBLIC_SITE_URL` أو `https://gaoba.vercel.app`. **هذا المكان الوحيد** المعرّف فيه النطاق.
2. **`metadataBase`** وcanonical لكل صفحة (`/`، `/about`، `/projects`، `/skills`، `/services`، `/contact`)، و`og:url` الصحيح لكل صفحة، و`sitemap.xml`، و`robots.txt`، وJSON-LD، كلها تُبنى من `SITE_URL`.
3. **صورة Open Graph** (`app/opengraph-image.tsx`، 1200×630) بألوان الموقع **الحالية** ونص فقط، ومرتبطة بكل الصفحات. (كانت تشير إلى `/og-image.jpg` غير الموجود.)
4. **JSON-LD:** `Person` + `WebSite` صحيحان، و`sameAs` فيه الروابط المتحقق منها فقط (GitHub، X)، و`CollectionPage`/`ContactPage` للصفحات بعناوينها الصحيحة. `JsonLd.tsx` يهرّب `<`.
5. **`<h1>` واحد لكل صفحة:** اللوغو في Navbar وFooter أصبح `<span class="block">` (نفس المظهر)، والعنوان الرئيسي لصفحات Projects وSkills وServices وContact أصبح `<h1>` (نفس الكلاسات).
6. وصف meta طبيعي بلا تهجئات محشوة وبلا أرقام.

## 5. الملفات

**جديدة:** `lib/site.ts`، `lib/claims.ts`، `lib/verified-links.ts`، `content/profile.ts`، `components/ContactForm.tsx`، `app/opengraph-image.tsx`.

**معدلة:** `app/layout.tsx`، `app/page.tsx`، `app/sitemap.ts`، `app/robots.ts`، `next.config.mjs` (إعادة توجيه `/testimonials` فقط)، `app/{about,projects,skills,services,contact}/page.tsx`، `app/contact/ContactPage.tsx`، `app/components/{ContactHighlight,Projects,ProjectsHighlight,About,AboutHighlight,Skills,SkillsHighlight,Services,ServicesHighlight,Hero,Navbar,Footer,JsonLd}.tsx`.

**محذوفة من الفرع:** `app/testimonials/page.tsx` فقط.

**لم يُمس:** `globals.css`، `tailwind.config.js`، الخطوط، `package.json` وملفات lock (لا مكتبة جديدة)، `components/ui/*`، وكل مكونات الكود الميت (تنظيفها مرحلة C1 بموافقة منفصلة).

## 6. الاختبارات (2026-11-07، على بناء إنتاج محلي `next build` + `next start`)

| الاختبار | الأداة | النتيجة |
|---|---|---|
| TypeScript | `tsc --noEmit` | **17 خطأ، كلها سابقة** (16 types لـ Framer Motion + مفتاح مكرر في `DeveloperBackground`). كانت 18 قبل التعديل، ولا خطأ جديد. إصلاحها في المرحلة 1 |
| البناء | `next build` (Next 16.1.1، Turbopack) | ✅ نجح، 12 مسارًا ثابتًا. تحذير وحيد سابق: مفتاح `eslint` غير مدعوم (المرحلة 1) |
| 6 صفحات × هاتف 390px + حاسوب 1440px | Chrome headless عبر CDP | ✅ لا تمرير أفقي، Navbar واحد، `<h1>` واحد، 0 نص مخفي، 0 صورة مكسورة، 0 نص وهمي أو رقم محظور |
| SEO | فحص `<head>` في المتصفح | ✅ canonical و`og:url` و`og:image` صحيحة لكل صفحة؛ JSON-LD يُحلَّل بلا أخطاء؛ لا `abdulrahmangooba.dev` ولا `abdulrahman.dev` ولا placeholders |
| `robots.txt` و`sitemap.xml` | HTTP | ✅ 6 روابط على `gaoba.vercel.app`، كلها 200 محليًا |
| `/testimonials` | HTTP | ✅ 307 إلى `/` |
| `/opengraph-image` | HTTP | ✅ 200، `image/png`، 34KB |
| الروابط الظاهرة في الصفحات (16) | HTTP | ✅ كلها 200 (mailto وtel غير قابلة للطلب) |
| روابط المشاريع المعروضة | HTTP + فتح النافذة في المتصفح | ✅ 12 موقعًا حيًا + 3 مستودعات، كلها 200. Naqla وGaobaVid بلا أزرار. لا «Key Results» ولا أرقام في أي نافذة. Dashboard مخفي |
| النموذجان (الرئيسية وContact) | Chrome + **اعتراض طلب Formspree** (لا تُرسل رسالة حقيقية) | ✅ الإرسال الفارغ ← «All fields are required.»؛ النجاح ← رسالة نجاح + تفريغ الحقول؛ الخطأ 422 ← رسالة الخطأ وتبقى البيانات؛ الطلب يذهب إلى `formspree.io/f/xnnzdron` بالحقول الصحيحة و`source` |

**ما لم يُختبر، ولماذا:**
- **الإرسال الحقيقي عبر Formspree:** لم أرسل رسالة فعلية حتى لا تصل إلى بريدك دون علمك. **المطلوب منك:** رسالة تجريبية من رابط المعاينة، ثم التأكد من وصولها وعلى أي بريد (A2).
- **Vercel Analytics:** لا يعمل محليًا (404 لسكربت `/_vercel/insights`)، وهذا طبيعي؛ يعمل على Vercel فقط.
- **المعاينة على Vercel:** تعتمد على ربط المستودع بـ Vercel. التفاصيل في رسالة التسليم.

## 7. مشكلات متبقية (خارج نطاق 0أ/0ب)

| المشكلة | المرحلة |
|---|---|
| 17 خطأ TypeScript سابق + `ignoreBuildErrors: true` + مفتاح `eslint` غير مدعوم | 1 |
| `images.unoptimized: true`، وصور حتى 1.9MB | 1 |
| `DeveloperBackground` الثقيل (إعادة رسم مع كل حركة فأرة) | 2 |
| خلفية حقول النموذج شفافة (متغيرات CSS غير معرّفة في `globals.css`)، مظهر سابق لم يتغير | 1 |
| التواريخ والخبرة المتضاربة، البريد، LinkedIn، الهاتف والعنوان | **0ج** (تحتاج إجاباتك) |
| الكود الميت (5 مكونات، 45 ملف ui، الحزم غير المستخدمة، `package-lock.json`) | 1 (C1–C3) |
| النصوص التسويقية العامة («Expert»، «Mastered»، «Excellence») | 2 |
