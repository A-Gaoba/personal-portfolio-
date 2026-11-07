# 09 — خط الإنتاج: من الـ Reel إلى صفحة المورد

> **الهدف:** كل مورد يُذكر في فيديو يصبح صفحة على الموقع فيها نسخ وتنزيل ورابط مباشر، **ولا يُنشر إلا بعد موافقتك**، **ولا يُستخدم رابطه في Instagram أو ManyChat إلا بعد التحقق منه على الموقع الحي.**
>
> كل ما في هذا الملف مبني على ملفات فعلية فحصتها في 2026-11-07: `gaoba-edu-reel-v3/scripts/package.mjs`، `references/cta.md`، `gaoba-script-v3/approve.mjs`، والحِزم الحقيقية في `D:/instgram2026/gaoba-ai/V-3.0/REELS/`.
>
> **لا تعديل على الـ Skill.** كل السكربتات الجديدة تعيش في مستودع الموقع، وتقرأ ملفات الـ Reel دون أن تكتب فيها. الاستثناء الوحيد اختياري: كتابة `dm.resource_url` في `publish.json`، بعلَم صريح وبعد التحقق.

---

## 1. ما وجدته في ملفات الـ Reel

### 1.1 مصدر البيانات: `<REELS>/<slug>/publish.json`
الحقول التي تهم الموقع (الصيغة من `cta.md`، والقيم من الحِزم الفعلية):

| الحقل | مثال حقيقي (`ai-agent-morning`) | الاستخدام في الموقع |
|---|---|---|
| `resource.type` | `"guide"` (المسموح: `guide\|prompt\|tool\|workflow`) | نوع المورد |
| `resource.title` | «وكيلك الصباحي: Telegram + n8n + AI Agent» | عنوان الصفحة |
| `resource.source_md` | `resources/guide.md` | **جسم الصفحة** (الشرح كاملًا) |
| `resource.workflow_json` | (اختياري) | ملف قابل للتنزيل والنسخ |
| `resource.tested` | `false` | يُعرض بصدق على الصفحة (انظر §3.3) |
| `keyword` / `keyword_variants` | `"وكيل"` | يُعرض «من فيديو: اكتب وكيل»، ويُستخدم في البحث |
| `caption.hook` / `caption.value[]` | نصوص معتمدة منك | مسودة للوصف المختصر (summary) |
| `pinned.sources[]` | 4 روابط توثيق n8n | قسم «المصادر» في الصفحة |
| `pinned.note` | «المقطع توضيحي (Demo)…» | تنبيه الصفحة إن وُجد |
| `dm.resource_url` | `"TODO: رابط الدليل بعد ما يرفعه GAOBA"` | **الحقل الذي يملؤه هذا الخط في النهاية** |
| `cta_mode` | `"follow"` في `zero-editing` | إن لم يوجد مورد ← **لا يُستورد** |

### 1.2 الملفات الناتجة عن `package.mjs` في `<slug>/GAOBA_REEL/`
```
resources/resource_guide.pdf     ← من resources/guide.md (Chromium)
resources/workflow.json          ← إن وُجد
thumbnail/thumbnail.png          ← 1080×1920، الهوية نفسها
sources/sources.md
publishing/…                     ← caption, pinned, dm, automation.json  (لا يُستورد منها شيء)
video/…                          ← (لا يُستورد)
```

### 1.3 قيد مهم في فحص الحزمة (`package.mjs`)
- `placeholder(u)` يرفض أي رابط فيه `TODO` أو `example.com` أو `placeholder` أو `<` أو `>`.
- فحص «resource link set (DM button)» **يفشل** ما دام `dm.resource_url` غير حقيقي. هذا هو حال `ai-agent-morning` الآن: `qa/package.json → pass: false`.
- فحص «links open» يفتح كل رابط في `dm_message.txt` وغيره بطلب HTTP.
- `reel.mjs` **يرفض الموافقة النهائية على الـ Reel** ما لم تنجح الحزمة.

**النتيجة:** صفحة المورد يجب أن تكون **حيّة ومتحقَّقًا منها قبل** الموافقة النهائية على الـ Reel، وهذا يتوافق تمامًا مع قاعدتك «المورد الموعود يجب أن يكون موجودًا».

### 1.4 حالات خاصة وجدتها
| الحالة | المثال | المعالجة |
|---|---|---|
| Reel بلا مورد (CTA متابعة) | `zero-editing` (`resource.type: "none (follow CTA)"`) | السكربت يتوقف برسالة «لا مورد لهذا الـ Reel» |
| Reel قديم بلا `publish.json` | `claude-code-build-app` (كلمة SPEC، البرومبتات داخل `out/dm.md` و`gift-notes.md`) | `new-resource.mjs` ينشئ مسودة يدوية فارغة بنفس المخطط، ثم تُملأ من `dm.md`، وتمر بنفس الموافقة والتحقق |
| دليل غير مختبر | `ai-agent-morning` (`tested: false`) | شارة «غير مُختبَر» + نص توضيحي **تكتبه أو توافق عليه أنت** |
| زر الـ DM يشير لصفحة خارجية | `claude-code-build-app` يشير إلى توثيق Claude Code | صفحة المورد تجمع البرومبتات بأزرار نسخ وتضع التوثيق في «المصادر» |

---

## 2. المراحل (State Machine)

```
  Reel package (publish.json + GAOBA_REEL/)
            │  1. import-reel.mjs          (لا يكتب في مجلد الـ Reel)
            ▼
     ┌──────────────┐  مسودة: تظهر فقط في Vercel Preview مع شريط «مسودة» و noindex
     │   draft      │
     └──────┬───────┘
            │  2. مراجعتك على رابط Preview (هاتف + متصفح Instagram)
            │  3. approve-resource.mjs --statement "<كلماتك حرفيًا>"
            ▼
     ┌──────────────┐  ملف موافقة + sha256 لكل ملف؛ أي تعديل لاحق يبطلها
     │  approved    │
     └──────┬───────┘
            │  4. دمج في main ← نشر Production على gaoba.vercel.app
            ▼
     ┌──────────────┐
     │  published   │
     └──────┬───────┘
            │  5. verify-resource.mjs      (يفحص الموقع الحي، لا الملفات المحلية)
            ▼
     ┌──────────────┐  يطبع الرابط النهائي + تقرير verify/<slug>.json
     │  verified ✓  │
     └──────┬───────┘
            │  6. الرابط ← publish.json dm.resource_url  (يدويًا، أو --write بعلَم صريح)
            │  7. package.mjs في الـ Skill ← يعيد فحص الرابط ← pass
            │  8. الموافقة النهائية على الـ Reel ← النشر ← ManyChat
            ▼
     ┌──────────────┐  لا حذف أبدًا: روابط الـ DM القديمة تبقى تعمل
     │  archived    │  (صفحة تبقى، مع تنبيه «يوجد إصدار أحدث» إن لزم)
     └──────────────┘
```

**قاعدة البناء:**
- **Production** يبني فقط `status: published` التي **لها ملف موافقة صالح** (الـ hash مطابق).
- **Preview** يبني المسودات أيضًا (بشريط «مسودة — لم يُعتمد» + `noindex`).
- أي مورد منشور تغيّر ملفه بعد الموافقة ← **فشل البناء** برسالة «تغيّر بعد الموافقة، أعد الاعتماد». لا تصل نسخة غير معتمدة إلى رابط في DM.

---

## 3. السكربتات (داخل مستودع الموقع: `scripts/`)

### 3.1 `import-reel.mjs <slug|path> [--slug <resource-slug>] [--dry-run]`

**يقرأ فقط** من مجلد الـ Reel (المسار الأساسي من `GAOBA_REELS` أو `D:/instgram2026/gaoba-ai/V-3.0/REELS`، مثل `paths.mjs` في الـ Skill).

| الخطوة | التفاصيل |
|---|---|
| 1. تحقق | `publish.json` موجود؛ `resource.type` ضمن `guide/prompt/tool/workflow`؛ الـ Reel له `approvals/final.json` أو تحذير «الفيديو لم يُعتمد بعد» (لا يمنع، لأن المورد يسبق الموافقة النهائية) |
| 2. فحص أمان | يرفض إن وجد في النصوص أو الملفات: مفاتيح API (`sk-…`, `AKIA…`, `ghp_…`, `xox…`)، مسارات محلية (`D:/`, `C:\Users`)، بريدًا غير المعتمد في `profile.ts`. نفس روح فحص الـ Skill «no API key or private path» |
| 3. ينشئ | `content/resources/<slug>.mdx` بـ `status: draft` |
| 4. ينسخ | `resource_guide.pdf` ← `public/downloads/<slug>/<slug>-guide.pdf`؛ `workflow.json` ← `public/downloads/<slug>/<slug>-workflow.json`؛ `thumbnail.png` ← `public/downloads/<slug>/cover.png` |
| 5. يطبع | رابط Preview المتوقع + قائمة الحقول التي **تحتاج مراجعتك** |

**ما لا يُستورد أبدًا:** نصوص الـ DM، و`automation.json`، والـ hashtags، وملفات المشروع، والصوت والفيديو، ولقطات المصادر.

**خريطة الحقول:**

| في الـ MDX | المصدر | ملاحظة |
|---|---|---|
| `slug` | اسم مجلد الـ Reel (أو `--slug`) | **لا يتغير بعد النشر** |
| `title` | `resource.title` | |
| `summary` | `caption.value[0]` | **مسودة للمراجعة** (نصك المعتمد، ليس نصًا جديدًا) |
| `type` | `guide→guide` · `prompt→prompt` · `tool→tools` · `workflow→template` | |
| `topics` | فارغ ← **تختاره أنت** من القائمة المغلقة | لا تخمين |
| `tested` | `resource.tested` | |
| `note` | `pinned.note` إن وجد | |
| `reel.slug` / `reel.keyword` | اسم المجلد / `keyword` | |
| `reel.instagramUrl` | فارغ ← يُضاف **بعد** نشر الـ Reel | الصفحة تعمل بدونه |
| `sources[]` | `pinned.sources[]` | |
| `files[]` | الملفات المنسوخة + الحجم الفعلي | |
| الجسم | محتوى `resources/guide.md` كما هو | كل بلوك كود فيه يحصل تلقائيًا على زر نسخ |
| `provenance` | `publishJsonSha256` + sha256 لكل ملف مصدر | لمعرفة إن تغيّر المصدر لاحقًا |

### 3.2 `new-resource.mjs <slug>` (للموارد اليدوية أو القديمة)
ينشئ مسودة بنفس المخطط، بحقول فارغة. يستخدم للـ Reels القديمة مثل `claude-code-build-app`، أو لمورد غير مرتبط بفيديو.

### 3.3 كيف تُعرض البرومبتات والنسخ والتنزيل
- **بلوك كود في الـ MDX = برومبت قابل للنسخ.** زر «نسخ» أعلى كل بلوك، و`dir="ltr"` تلقائيًا للنص اللاتيني.
- **حقل `prompts[]` اختياري** لبرومبت «رئيسي» يظهر أعلى الصفحة مع زر نسخ كبير. مثلًا برومبت المقابلة في SPEC.
- **`files[]`** ← أزرار تنزيل بالاسم والحجم والصيغة؛ `workflow.json` له زران: «تنزيل» و«نسخ JSON» (للصق مباشرة في n8n).
- **`tested: false`** ← شارة «غير مُختبَر» بجانب النوع + نص `testedNote` **إلزامي** (يفشل التحقق إن كان فارغًا). **أنت من يكتبه أو يوافق عليه.**

### 3.4 `approve-resource.mjs <slug> --statement "<موافقتك حرفيًا>"`
بنفس فلسفة `approve.mjs` في الـ Skill:
- **يُشغَّل فقط بعد موافقتك الصريحة على هذا المورد بعينه في المحادثة**، لا لأن الفحوص نجحت، ولا بعبارة معاد صياغتها.
- يكتب `content/resources/<slug>.approval.json`:
```json
{
  "schema": "gaoba-approval/2",
  "stage": "resource",
  "resource": "ai-agent-morning",
  "approvedBy": "GAOBA",
  "approvedAt": "2026-11-08T…Z",
  "approvalSource": "chat",
  "approvalStatement": "<كلماتك حرفيًا>",
  "previewUrl": "https://…vercel.app/resources/ai-agent-morning",
  "files": {
    "mdx":   { "path": "content/resources/ai-agent-morning.mdx", "sha256": "…" },
    "guide": { "path": "public/downloads/ai-agent-morning/ai-agent-morning-guide.pdf", "sha256": "…" }
  }
}
```
- يغيّر `status: draft` ← `published`.
- يرفض إن بقي حقل إلزامي فارغ (`topics`، `summary`، `testedNote` عند `tested: false`).

### 3.5 `verify-resource.mjs <slug> [--write-publish-json]`
**يفحص الموقع الحي على `SITE_URL`**، لا الملفات المحلية:

| # | الفحص | لماذا |
|---|---|---|
| 1 | الرابط `https://` وعلى نطاق `SITE_URL` نفسه، ومساره `/resources/<slug>`، وبلا `TODO` أو `<` أو `>` | يطابق `placeholder()` في `package.mjs` |
| 2 | `GET` ← **200** بدون إعادة توجيه، `content-type: text/html` | ManyChat يفتح الرابط كما هو |
| 3 | الصفحة تحمل `<meta name="gaoba:resource" content="<slug>">` و`<meta name="gaoba:approval" content="<sha256 الموافقة>">` **مطابقين** لملف الموافقة | يثبت أن **النسخة الحية هي المعتمدة**، لا نسخة قديمة في cache |
| 4 | ليست `noindex`، والـ `canonical` صحيح، و`og:image` يعيد 200 | لا تُنشر مسودة بالخطأ، ومعاينة الرابط تظهر في الـ DM |
| 5 | كل ملف تنزيل ← 200 + `content-type` صحيح (`application/pdf`، `application/json`) + **sha256 مطابق للموافقة** | الملف المنزَّل هو المعتمد |
| 6 | طلب بـ User-Agent لمتصفح Instagram الداخلي وطلب بـ User-Agent هاتف ← 200 | بعض الإعدادات تحجب المتصفحات الداخلية |
| 7 | زمن الاستجابة (يُسجَّل، تحذير فوق 3 ثوانٍ) | المتابع على شبكة هاتف |

**المخرجات:**
- `verify/<slug>.json` (نجاح/فشل كل فحص + الوقت).
- طباعة الرابط النهائي: `https://gaoba.vercel.app/resources/<slug>`.
- مع `--write-publish-json` **فقط** (وبعد نجاح كل الفحوص): يكتب الرابط في `dm.resource_url` داخل `publish.json`. **هذا هو التعديل الوحيد الممكن على ملفات الـ Reel، ولا يحدث افتراضيًا.**

**الخطوة اليدوية الإلزامية (مرة لكل مورد):** إرسال الرابط لنفسك في Instagram، وفتحه من داخل التطبيق، ثم تجربة: النسخ، والتنزيل، وزر المشاركة. **لا أستطيع محاكاة متصفح Instagram الداخلي بدقة، لذلك هذه الخطوة عندك.**

---

## 4. الروابط المباشرة

| الاستخدام | الرابط | ملاحظة |
|---|---|---|
| زر الـ DM في ManyChat | `https://gaoba.vercel.app/resources/<slug>` | بلا query string افتراضيًا. إن أردت معرفة كم زائرًا جاء من الـ DM: `?src=dm` (يمر من `placeholder()`)، و**يُتحقق منه بنفس السكربت** |
| رابط البايو | `https://gaoba.vercel.app/links` | ثابت لا يتغير؛ «أحدث مورد» يتحدث تلقائيًا |
| التعليق المثبّت | الرابط الكامل بلا query | قاعدة `cta.md`: «keep the URLs short (no query strings) so they can be copied» |
| المشاركة | زر «مشاركة» في الصفحة (Web Share API ثم نسخ) | |

**ثبات الروابط:** الـ `slug` لا يتغير بعد النشر، والمورد لا يُحذف، بل يُؤرشف. أي رابط أُرسل في DM قبل سنة يجب أن يعمل اليوم. فحص في البناء يمنع اختفاء أي slug سبق نشره (سجل `content/resources/_published.json`).

**عند تغيير النطاق لاحقًا:** يتغير `SITE_URL` في مكان واحد، وتُضاف إعادة توجيه 301 دائمة من `gaoba.vercel.app` إلى النطاق الجديد، فتبقى الروابط القديمة في الـ DMs تعمل.

---

## 5. مثال كامل على Reel حقيقي: `ai-agent-morning`

```
1.  node scripts/import-reel.mjs ai-agent-morning
      ✓ publish.json · type=guide · tested=false
      ✓ resource_guide.pdf (… KB) · thumbnail.png
      ✓ لا مفاتيح ولا مسارات خاصة
      → content/resources/ai-agent-morning.mdx  (draft)
      ⚠ يحتاج مراجعتك: topics · summary (مسودة من caption) · testedNote
2.  git push (فرع resource/ai-agent-morning) → رابط Vercel Preview
3.  تراجع الصفحة على هاتفك؛ تعدّل ما تريد؛ تكتب موافقتك في المحادثة
4.  node scripts/approve-resource.mjs ai-agent-morning --statement "<موافقتك>"
5.  دمج → Production
6.  node scripts/verify-resource.mjs ai-agent-morning
      ✓ 200 · approval hash مطابق · PDF مطابق · Instagram UA 200 · 0.4s
      → https://gaoba.vercel.app/resources/ai-agent-morning
7.  تضع الرابط في publish.json (أو --write-publish-json بموافقتك)
8.  node <skill>/scripts/package.mjs ai-agent-morning   → resource link set ✓ · links open ✓
9.  الموافقة النهائية على الـ Reel، ثم النشر، ثم بناء ManyChat من automation.json
10. بعد النشر: تضيف reel.instagramUrl في الـ MDX (تعديل بسيط ← يتطلب إعادة اعتماد، أو حقل مستثنى من الـ hash — قرارك، انظر 10-open-questions)
```

---

## 6. ما يحتاج موافقتك تحديدًا في هذا الخط

| القرار | الخيارات | اقتراحي |
|---|---|---|
| هل يكتب `verify-resource.mjs` في `publish.json`؟ | يدويًا دائمًا / بعلَم `--write-publish-json` | العلَم، بعد نجاح كل الفحوص |
| هل `reel.instagramUrl` جزء من المحتوى المعتمد؟ | يدخل في الـ hash (كل تعديل يتطلب إعادة اعتماد) / مستثنى | **مستثنى** (لا يغير المورد نفسه) |
| `?src=dm` في رابط الـ DM؟ | نعم / لا | نعم، للقياس فقط |
| ربط `package.mjs` في الـ Skill باستدعاء `verify-resource.mjs` تلقائيًا | الآن / لاحقًا / أبدًا | **لاحقًا**، بموافقة منفصلة، لأن الـ Skill مقفل |
| أول مورد للتجربة | `ai-agent-morning` (حزمته جاهزة وتنتظر الرابط) / `claude-code-build-app` (يدوي) | `ai-agent-morning` |
