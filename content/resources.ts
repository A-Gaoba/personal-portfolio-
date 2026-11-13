import type { Locale } from "@/lib/i18n/config"

/**
 * GAOBA AI Resources — the single source of truth for /resources and /resources/[slug] (both languages), the
 * sitemap, the Open Graph images (scripts/generate-resource-images.mjs) and the short links (/r/<code>, proxy.ts).
 *
 * To add a resource: copy its files into public/resources/<slug>/, add one entry below, run
 *   node scripts/generate-resource-images.mjs
 * and nothing else: the pages, sitemap, metadata and short link are built from this entry.
 *
 * Rules (credibility): every fact here must be checkable. Third-party work is credited to its author with its
 * license and original link, and never presented as GAOBA AI's own.
 */

export type ResourceCategory = "guide" | "template" | "tool" | "checklist"

export type ResourceText = {
  title: string
  /** One or two sentences: cards, meta description, Open Graph. */
  description: string
  /** Short label on the Open Graph image under the title. */
  ogTagline: string
  /** Longer introduction on the details page. */
  intro: string[]
  /** Direction for copyable prompts, which may differ from the page language. */
  promptDirection?: "ltr" | "rtl"
  /** "What's inside": label + one-line explanation. */
  contents?: { label: string; text: string }[]
  contentsNote?: string
  /** "What you need". */
  requirements?: string[]
  /** Language the file itself is written in, as shown to the reader. */
  fileLanguage: string
  imageAlt: string
  /** Optional: short labels on the cover image under the tagline (first one is highlighted). */
  ogChips?: string[]
  /** Optional: a highlighted one-line note shown where the source block goes when there is no third-party source. */
  note?: string
  /** Optional: "What you get" bullets. */
  benefits?: string[]
  /** Optional step-by-step guide content (each step can carry a copy-paste prompt). */
  setup?: GuideStep
  rules?: GuideStep[]
  /** Optional: per-tool notes (e.g. Claude Code, Cursor), with an optional official link. */
  tools?: { name: string; points: string[]; link?: { label: string; url: string } }[]
  /** Optional heading/lede for the tools section (defaults to the site strings "Claude Code and Cursor"). */
  toolsTitle?: string
  toolsLede?: string
  rulesFile?: GuideStep
  checklist?: { title: string; items: string[] }
  /** Optional: models grouped by RAM (name, download size, run command, official page). */
  tiers?: { ram: string; title: string; models: { name: string; size: string; command: string; url: string }[]; notes?: string[] }[]
  /** Optional closing notes (e.g. sources), each with an optional link. */
  footnotes?: { title: string; text: string; link?: { label: string; url: string } }[]
}

export type GuideStep = {
  title: string
  text: string
  /** Tool-specific lines, e.g. { name: "Claude Code", text: "…" }. */
  tools?: { name: string; text: string }[]
  /** Copy-paste prompt for the agent. */
  prompt?: string
}

export type Resource = {
  slug: string
  category: ResourceCategory
  /** ISO date the resource was published on this site. */
  published: string
  /** Language(s) of the downloadable file (BCP 47). */
  inLanguage: string[]
  /** Card + Open Graph image per site language, 1200×630, generated from `ogTagline` (public/…). */
  image: Record<Locale, string>
  file: { path: string; downloadName: string; type: "application/pdf"; pages: number; bytes: number }
  /** Optional extra downloads shown on the details page (e.g. a zip with scripts the guide refers to). */
  extras?: { path: string; downloadName: string; type: "application/zip"; bytes: number; files: string[]; text: Record<Locale, { title: string; description: string }> }[]
  /** Who made the original work the resource is about (shown on every card and page). Omitted for GAOBA AI's own guides. */
  source?: { name: string; author: string; url: string; license?: string }
  /** Who prepared this resource (the guide itself). */
  preparedBy: string
  /** Optional short link code: /r/<code> → /ar/resources/<slug> (see proxy.ts). */
  shortLink?: { code: string; locale: Locale }
  text: Record<Locale, ResourceText>
}

const SKILLS_REPO = "https://github.com/Jakeschincariol/instagram-agent-skill"

export const resources: Resource[] = [
  {
    // The prompts and PDF are copied from Reel 008's approved resource files.
    slug: "chatgpt-study-prompts",
    category: "guide",
    published: "2026-11-13",
    inLanguage: ["ar", "en"],
    image: {
      ar: "/resources/chatgpt-study-prompts/og-ar.png",
      en: "/resources/chatgpt-study-prompts/og-en.png",
    },
    file: {
      path: "/resources/chatgpt-study-prompts/resource_guide.pdf",
      downloadName: "gaoba-15-chatgpt-study-prompts.pdf",
      type: "application/pdf",
      pages: 4,
      bytes: 184540,
    },
    preparedBy: "GAOBA AI (@a_gaoba.ai)",
    shortLink: { code: "study-prompts", locale: "ar" },
    text: {
      ar: {
        title: "15 برومبت لملخصات دراسية مصوّرة مع ChatGPT",
        description:
          "15 برومبتًا جاهزًا لـChatGPT لتحويل موضوع درسك إلى صورة دراسية بـ15 أسلوبًا بصريًا. استبدل [TOPIC] بموضوعك، وراجع المعلومات قبل اعتمادها.",
        fileLanguage: "العربية والإنجليزية",
        imageAlt: "غلاف دليل 15 برومبت لملخصات دراسية مصوّرة مع ChatGPT",
        ogTagline: "حوّل موضوع الدرس إلى ملخص بصري",
        ogChips: ["15 برومبت", "15 أسلوبًا", "ChatGPT"],
        intro: [
          "اختر موضوع درسك واستبدل [TOPIC] في أي برومبت لتحصل على صورة دراسية بأحد 15 أسلوبًا بصريًا، من الخريطة الذهنية إلى دفتر كورنيل.",
          "البرومبتات أصلها بالإنجليزية. راجع المعلومات التي تظهر في الصورة قبل اعتمادها؛ قد يخطئ الذكاء الاصطناعي.",
        ],
        promptDirection: "ltr",
        note: "ميزة توليد الصور يجب أن تكون متاحة في حساب ChatGPT. الصور تساعد على الفهم والترتيب، لكنها قد تحتوي على معلومات غير دقيقة؛ راجعها قبل استخدامها.",
        requirements: ["حساب ChatGPT تتوفر فيه ميزة توليد الصور."],
        setup: {
          title: "طريقة الاستخدام",
          text: "افتح ChatGPT، واختر برومبتًا، ثم استبدل [TOPIC] بموضوع درسك. إذا أردت نصًا عربيًا داخل الصورة، أضف: «اكتب العناوين بالعربية الفصحى وبأقل عدد من الكلمات».",
        },
        rules: [
          {
            title: "خريطة ذهنية · ⁦/mindmap⁩",
            text: "خريطة مرسومة يدويًا على ورق عاجي، بفكرة مركزية وخمسة فروع ملونة ومتوازنة.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a hand-sketched mind map on ivory paper, one central concept, 5 balanced colorful branches with short keyword labels, small academic icons, hand-drawn arrows, realistic marker texture. Clean readable layout, short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "ملاحظات بخط اليد · ⁦/handwritten⁩",
            text: "صفحة دفتر أنيقة بتجليد حلزوني، وعناوين بالحبر الأسود وتظليل ملون ورسمين بسيطين.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a premium handwritten notebook page with spiral binding, neat black ink headings, colored highlighter strokes on key terms, two simple hand-drawn diagrams, natural pen texture. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "بطاقات مراجعة · ⁦/flashcard⁩",
            text: "ثلاث بطاقات مراجعة فعلية مرتبة قطريًا على مكتب خشبي، بألوان كريمية وبرتقالية وكحلية.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: three physical revision flashcards arranged diagonally on a wooden desk, showing a question on the front of one and the answer on the back of another, cream cards with orange and navy accents. Short text only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "ملصق ملخص · ⁦/summary⁩",
            text: "ملصق دراسي من صفحة واحدة يضم عنوانًا ورسمًا وأربع خانات قصيرة للحقائق.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a one-page study summary poster with clear editorial hierarchy, a title area, one diagram panel and four short fact blocks, ivory and navy palette. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "خطوات مرئية · ⁦/steps⁩",
            text: "دليل مرسوم من ست خطوات داخل لوحات مرقمة وموصولة بأسهم، مع أيقونة صغيرة لكل خطوة.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a six-step visual guide as an illustrated flow, numbered rounded panels 1 to 6 connected by arrows, one tiny icon per step, harmonious palette. Short step labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "ورقة تحليل · ⁦/analysis⁩",
            text: "ورقة تحليل أكاديمية برسمين بيانيين بسيطين، وأدلة بارزة وأسهم للمقارنة، دون أرقام مختلقة.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: an academic analysis sheet with two clean simple charts, highlighted key evidence, comparison arrows and short annotation areas. Use no invented numbers, short labels only, no logos, no watermarks.",
          },
          {
            title: "اختبار قصير · ⁦/quiz⁩",
            text: "اختبار اختيار من متعدد على الورق، بخمسة أسئلة قصيرة وأربع دوائر للإجابات لكل سؤال.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a multiple-choice revision quiz on paper, five numbered questions with four answer circles each, small hand-drawn illustrations. Keep the questions very short, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "ملاحظات لاصقة · ⁦/stickynotes⁩",
            text: "صورة علوية لملاحظات لاصقة شفافة ملونة على مكتب من خشب الجوز، بكلمات ورسوم صغيرة.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: an overhead photograph of colorful translucent sticky notes on a dark walnut desk, each with a short keyword and a tiny marker drawing, believable paper shadows. Short text only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "مقارنة بعمودين · ⁦/compare⁩",
            text: "ورقة مقارنة بعمودين تفصل بين المفهومين A وB، بأيقونات متقابلة وألوان خوخية وزرقاء.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a two-column visual comparison sheet, concept A on the left versus concept B on the right, a central divider, paired icons, restrained peach and blue palette. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "لوحة تعلّم بصري · ⁦/visual-learning⁩",
            text: "لوحة تعليمية برسم مركزي كبير وأربعة رسوم مساندة وأسهم تعليمية، بأسلوب طيني ثلاثي الأبعاد.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a visual learning board with one large central illustration and four smaller supporting diagrams, educational arrows, generous spacing, soft 3D clay-style look. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "شرح على السبورة · ⁦/explain⁩",
            text: "شرح على سبورة بعناصر مرسومة وأسهم وتعليقات ملونة تعرض الفكرة بالترتيب.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a whiteboard explanation with simple illustrated objects, directional arrows and colored-marker annotations that explain the idea in order. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "ورقة مراجعة سريعة · ⁦/revision⁩",
            text: "ورقة مراجعة سريعة تجمع شرائط تظليل وخانات حقائق ورسومًا مصغرة.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a quick-review one-page sheet with highlight strips, summary fact tiles and mini diagrams, clear editorial hierarchy. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "ملاحظات كورنيل · ⁦/cornell⁩",
            text: "صفحة ملاحظات كورنيل بعمود للتلميحات ومساحة للملاحظات وخانة ملخص في الأسفل.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: an authentic Cornell-notes page with a cue column on the left, a main notes area and a summary box at the bottom, neat handwriting, small diagram. Short text only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "شبكة بن تو · ⁦/bento⁩",
            text: "شبكة دراسة من خانات مستديرة بأحجام مختلفة، تضم كل منها حقيقة أو رسمًا مصغرًا.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a bento-grid study layout of rounded tiles of different sizes, each with one fact or one mini illustration, soft shadows, cohesive palette. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "دفتر قصاصات · ⁦/scrapbook⁩",
            text: "صفحة مراجعة بأسلوب دفتر القصاصات، بأوراق وشريط واشي وطوابع ورسوم صغيرة.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a scrapbook-style revision page with taped paper scraps, washi tape, stamps, small cut-out illustrations and handwritten keywords, warm paper textures. Short text only, no logos, no watermarks, no fabricated facts.",
          },
        ],
      },
      en: {
        title: "15 Prompts for Visual Study Summaries with ChatGPT",
        description:
          "15 ready-to-copy ChatGPT prompts for turning a lesson topic into a study image in 15 visual styles. Replace [TOPIC] with your subject and review the information before using it.",
        fileLanguage: "Arabic and English",
        imageAlt: "Cover of the 15 ChatGPT prompts for visual study summaries",
        ogTagline: "Turn a lesson topic into a visual summary",
        ogChips: ["15 prompts", "15 styles", "ChatGPT"],
        intro: [
          "Choose a lesson topic and replace [TOPIC] in any prompt to create a study image in one of 15 visual styles, from a mind map to Cornell notes.",
          "The prompts are in English. Review information shown in the generated image before using it; AI can make mistakes.",
        ],
        promptDirection: "ltr",
        note: "ChatGPT image generation must be available in your account. Images can help with understanding and organization, but may contain inaccurate information; review them before relying on them.",
        requirements: ["A ChatGPT account with image generation available."],
        setup: {
          title: "How to use",
          text: "Open ChatGPT, choose a prompt, and replace [TOPIC] with your lesson subject. To request Arabic text in the image, add: “Write the headings in Modern Standard Arabic using as few words as possible.”",
        },
        rules: [
          {
            title: "Mind map · /mindmap",
            text: "A hand-sketched mind map on ivory paper, with one central concept and five balanced colorful branches.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a hand-sketched mind map on ivory paper, one central concept, 5 balanced colorful branches with short keyword labels, small academic icons, hand-drawn arrows, realistic marker texture. Clean readable layout, short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Handwritten notes · /handwritten",
            text: "A premium spiral-bound notebook page with neat black headings, colored highlighting and two simple diagrams.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a premium handwritten notebook page with spiral binding, neat black ink headings, colored highlighter strokes on key terms, two simple hand-drawn diagrams, natural pen texture. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Flashcards · /flashcard",
            text: "Three physical revision cards arranged diagonally on a wooden desk, with cream, orange and navy accents.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: three physical revision flashcards arranged diagonally on a wooden desk, showing a question on the front of one and the answer on the back of another, cream cards with orange and navy accents. Short text only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Study summary poster · /summary",
            text: "A one-page study poster with a title, one diagram panel and four short fact blocks.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a one-page study summary poster with clear editorial hierarchy, a title area, one diagram panel and four short fact blocks, ivory and navy palette. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Visual steps · /steps",
            text: "An illustrated six-step flow with numbered panels, connecting arrows and one small icon per step.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a six-step visual guide as an illustrated flow, numbered rounded panels 1 to 6 connected by arrows, one tiny icon per step, harmonious palette. Short step labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Analysis sheet · /analysis",
            text: "An academic analysis sheet with two simple charts, highlighted evidence and comparison arrows; no invented numbers.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: an academic analysis sheet with two clean simple charts, highlighted key evidence, comparison arrows and short annotation areas. Use no invented numbers, short labels only, no logos, no watermarks.",
          },
          {
            title: "Revision quiz · /quiz",
            text: "A paper multiple-choice quiz with five short numbered questions and four answer circles per question.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a multiple-choice revision quiz on paper, five numbered questions with four answer circles each, small hand-drawn illustrations. Keep the questions very short, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Sticky notes · /stickynotes",
            text: "An overhead photo of colorful translucent sticky notes on a dark walnut desk, with short keywords and tiny drawings.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: an overhead photograph of colorful translucent sticky notes on a dark walnut desk, each with a short keyword and a tiny marker drawing, believable paper shadows. Short text only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Two-column comparison · /compare",
            text: "A visual comparison of concept A and concept B, separated by a divider with paired icons.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a two-column visual comparison sheet, concept A on the left versus concept B on the right, a central divider, paired icons, restrained peach and blue palette. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Visual learning board · /visual-learning",
            text: "A large central illustration supported by four smaller diagrams, educational arrows and a soft 3D clay-style look.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a visual learning board with one large central illustration and four smaller supporting diagrams, educational arrows, generous spacing, soft 3D clay-style look. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Whiteboard explanation · /explain",
            text: "A whiteboard explanation using simple illustrated objects, directional arrows and colored annotations.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a whiteboard explanation with simple illustrated objects, directional arrows and colored-marker annotations that explain the idea in order. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Quick revision sheet · /revision",
            text: "A one-page quick review with highlight strips, fact tiles, mini diagrams and clear visual hierarchy.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a quick-review one-page sheet with highlight strips, summary fact tiles and mini diagrams, clear editorial hierarchy. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Cornell notes · /cornell",
            text: "A Cornell-notes page with a cue column, a main notes area, a summary box and a small diagram.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: an authentic Cornell-notes page with a cue column on the left, a main notes area and a summary box at the bottom, neat handwriting, small diagram. Short text only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Bento grid · /bento",
            text: "A grid of rounded tiles in different sizes, each holding one fact or one mini illustration.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a bento-grid study layout of rounded tiles of different sizes, each with one fact or one mini illustration, soft shadows, cohesive palette. Short labels only, no logos, no watermarks, no fabricated facts.",
          },
          {
            title: "Scrapbook · /scrapbook",
            text: "A revision page with taped paper scraps, washi tape, stamps, cut-out illustrations and warm paper textures.",
            prompt:
              "Create a 2:3 portrait study image about [TOPIC]: a scrapbook-style revision page with taped paper scraps, washi tape, stamps, small cut-out illustrations and handwritten keywords, warm paper textures. Short text only, no logos, no watermarks, no fabricated facts.",
          },
        ],
      },
    },
  },
  {
    // GAOBA AI's own guide for the ram-local-models reel (no third-party project, so no `source`).
    // public/resources/ram-local-models/resource_guide.pdf is GAOBA_REEL/resources/resource_guide.pdf, unmodified
    // (3 pages, 213,336 bytes); its URL is already shared. Models, sizes, commands and links are copied from the PDF,
    // which took the sizes from the Ollama library tag pages on 2026-11-09. The English text is a translation.
    // Latin UI paths inside Arabic text are wrapped in U+2066…U+2069 (LTR isolates) so they read left to right.
    slug: "ram-local-models",
    category: "guide",
    published: "2026-11-09",
    inLanguage: ["ar"],
    image: {
      ar: "/resources/ram-local-models/og-ar.png",
      en: "/resources/ram-local-models/og-en.png",
    },
    file: {
      path: "/resources/ram-local-models/resource_guide.pdf",
      downloadName: "local-ai-models-by-ram-guide-ar.pdf",
      type: "application/pdf",
      pages: 3,
      bytes: 213336,
    },
    preparedBy: "GAOBA AI (@a_gaoba.ai)",
    shortLink: { code: "local-models", locale: "ar" },
    text: {
      ar: {
        title: "نماذج AI المناسبة لرام جهازك",
        description:
          "دليل مختصر بالعربية يساعدك تختار نموذج ذكاء اصطناعي تشغّله على جهازك حسب حجم الرام: 8 أو 16 أو 32 أو ⁦64 GB⁩، مع حجم كل نموذج وأمر تشغيله في Ollama ورابطه.",
        ogTagline: "اختر النموذج حسب رام جهازك",
        ogChips: ["8 · 16 · 32 · 64 GB", "Ollama", "LM Studio"],
        intro: [
          "تقدر تشغّل نموذج ذكاء اصطناعي على لابتوبك بدون إنترنت وبدون اشتراك، لكن النموذج لازم يناسب رام جهازك. هذا الدليل يرتّب النماذج حسب الرام: 8 و16 و32 و⁦64 GB⁩.",
          "لكل نموذج: حجمه، وأمر تشغيله في Ollama، ورابط صفحته الرسمية. وقبلها 3 قواعد تساعدك تختار صح، وطريقتان للتشغيل: سطر أوامر أو واجهة سهلة.",
        ],
        note: "القاعدة الذهبية: اختر نموذجًا حجمه أقل من رام جهازك بفارق واضح، لأن نظام التشغيل والبرامج المفتوحة تحتاج جزءًا من الرام.",
        benefits: [
          "تعرف أي نموذج يناسب جهازك: 8 أو 16 أو 32 أو ⁦64 GB⁩.",
          "11 نموذجًا مع حجم كل نموذج وأمر تشغيله ورابط صفحته.",
          "طريقتان للتشغيل: Ollama بسطر الأوامر، وLM Studio بواجهة سهلة.",
          "3 قواعد قبل التحميل حتى لا يثقل الجهاز.",
          "كيف تعرف رام جهازك على Windows وMac.",
          "ملاحظة واضحة عن النماذج الأكبر من اللابتوب، مثل Kimi K3.",
        ],
        setup: {
          title: "كيف تعرف رام جهازك؟",
          text: "قبل ما تختار، اعرف كم رام في جهازك:",
          tools: [
            { name: "Windows", text: "افتح ⁦Task Manager > Performance > Memory⁩." },
            { name: "Mac", text: "من قائمة ⁦Apple > About This Mac > Memory⁩." },
          ],
        },
        rules: [
          {
            title: "الحجم المكتوب = حجم التحميل المضغوط (4-bit) في Ollama",
            text: "النموذج يحتاج تقريبًا نفس الحجم في الذاكرة، وأكثر قليلًا مع المحادثات الطويلة.",
          },
          {
            title: "خلّي مكان للجهاز",
            text: "نظام التشغيل والبرامج المفتوحة تأخذ جزءًا من الرام، فاختر نموذجًا حجمه أقل من الرام بفارق واضح.",
          },
          {
            title: "كرت الشاشة (GPU) يسرّع",
            text: "بدون GPU يشتغل النموذج على المعالج لكن أبطأ. وفي أجهزة Mac بشرائح Apple، الرام مشتركة مع كرت الشاشة.",
          },
        ],
        toolsTitle: "طريقتان للتشغيل",
        toolsLede: "اختر طريقة واحدة: سطر أوامر أو واجهة سهلة. البرنامجان يعملان على Windows وMac.",
        tools: [
          {
            name: "Ollama",
            points: [
              "سطر أوامر: حمّله ثم اكتب الأمر المكتوب بجانب النموذج، مثل ⁦ollama run qwen3:4b⁩.",
              "كل أوامر التشغيل في هذه الصفحة لـ Ollama، ومعها زر نسخ.",
            ],
            link: { label: "تحميل Ollama", url: "https://ollama.com/download" },
          },
          {
            name: "LM Studio",
            points: ["واجهة سهلة: حمّله وابحث عن اسم النموذج من داخل البرنامج."],
            link: { label: "تحميل LM Studio", url: "https://lmstudio.ai/download" },
          },
        ],
        tiers: [
          {
            ram: "8 GB",
            title: "رام ⁦8 GB⁩: النماذج الصغيرة",
            models: [
              { name: "Qwen3 4B", size: "2.5 GB", command: "ollama run qwen3:4b", url: "https://ollama.com/library/qwen3" },
              { name: "Gemma 3 4B", size: "3.4 GB", command: "ollama run gemma3:4b", url: "https://ollama.com/library/gemma3" },
            ],
            notes: ["أغلق البرامج الثقيلة أثناء التشغيل. النماذج فوق ⁦5 GB⁩ تكون ثقيلة على ⁦8 GB⁩."],
          },
          {
            ram: "16 GB",
            title: "رام ⁦16 GB⁩: النماذج المشهورة",
            models: [
              { name: "Llama 3.1 8B", size: "4.9 GB", command: "ollama run llama3.1:8b", url: "https://ollama.com/library/llama3.1" },
              { name: "Qwen3 8B", size: "5.2 GB", command: "ollama run qwen3:8b", url: "https://ollama.com/library/qwen3" },
              { name: "Gemma 3 12B", size: "8.2 GB", command: "ollama run gemma3:12b", url: "https://ollama.com/library/gemma3" },
              { name: "Qwen3 14B", size: "9.3 GB", command: "ollama run qwen3:14b", url: "https://ollama.com/library/qwen3" },
              { name: "GPT-OSS 20B", size: "14 GB", command: "ollama run gpt-oss:20b", url: "https://ollama.com/library/gpt-oss" },
            ],
            notes: ["GPT-OSS 20B على ⁦16 GB⁩ ضيّق: يشتغل، لكن الجهاز لا يبقى له مكان كثير."],
          },
          {
            ram: "32 GB",
            title: "رام ⁦32 GB⁩: النماذج الكبيرة",
            models: [
              { name: "Gemma 3 27B", size: "17 GB", command: "ollama run gemma3:27b", url: "https://ollama.com/library/gemma3" },
              { name: "Qwen3 30B", size: "19 GB", command: "ollama run qwen3:30b", url: "https://ollama.com/library/qwen3" },
              { name: "Qwen3 32B", size: "20 GB", command: "ollama run qwen3:32b", url: "https://ollama.com/library/qwen3" },
            ],
          },
          {
            ram: "64 GB",
            title: "رام ⁦64 GB⁩: الوحوش",
            models: [
              { name: "Llama 3.3 70B", size: "43 GB", command: "ollama run llama3.3:70b", url: "https://ollama.com/library/llama3.3" },
            ],
            notes: [
              "النماذج من هذا الحجم تحتاج صبرًا: السرعة تعتمد كثيرًا على كرت الشاشة.",
              "GPT-OSS 120B حجمه ⁦65 GB⁩، أكبر من رام ⁦64 GB⁩، فلا يناسب هذا الجهاز.",
            ],
          },
        ],
        footnotes: [
          {
            title: "وKimi K3؟",
            text: "واحد من إصداراته المضغوطة (Unsloth 1-bit) يحتاج حوالي ⁦610 GB⁩ من الذاكرة (RAM + VRAM مجتمعة)، يعني ليس للابتوب.",
            link: { label: "المصدر: Unsloth", url: "https://unsloth.ai/docs/models/kimi-k3" },
          },
          {
            title: "مصادر الأحجام",
            text: "مكتبة Ollama (صفحات tags لكل نموذج)، تاريخ المراجعة: 9 نوفمبر 2026. الأحجام تتغير مع التحديثات، فراجع صفحة النموذج قبل التحميل.",
          },
        ],
        requirements: [
          "جهاز Windows أو Mac، وكلما زادت الرام زادت النماذج المتاحة.",
          "Ollama أو LM Studio.",
          "مساحة تخزين تكفي حجم النموذج الذي ستحمّله.",
        ],
        fileLanguage: "العربية",
        imageAlt: "غلاف دليل «نماذج AI المناسبة لرام جهازك» من GAOBA AI",
      },
      en: {
        title: "AI Models That Fit Your RAM",
        description:
          "A short guide (in Arabic) to choosing an AI model you can run on your own computer by RAM size: 8, 16, 32 or 64 GB, with each model's size, its Ollama run command and its link.",
        ogTagline: "Pick a local model by your RAM (in Arabic)",
        ogChips: ["8 · 16 · 32 · 64 GB", "Ollama", "LM Studio"],
        intro: [
          "You can run an AI model on your laptop with no internet and no subscription, but the model has to fit your RAM. This guide sorts models by RAM: 8, 16, 32 and 64 GB.",
          "For each model: its size, its Ollama run command and its official page. Before that, 3 rules to help you choose well, and two ways to run models: a command line or an easy app.",
        ],
        note: "The golden rule: pick a model clearly smaller than your RAM, because the operating system and open apps need part of it too.",
        benefits: [
          "Know which model fits your computer: 8, 16, 32 or 64 GB.",
          "11 models, each with its size, run command and page.",
          "Two ways to run them: Ollama on the command line, or LM Studio with an easy interface.",
          "3 rules before downloading, so your computer doesn't slow to a crawl.",
          "How to check your RAM on Windows and Mac.",
          "A clear note on models too big for a laptop, such as Kimi K3.",
        ],
        setup: {
          title: "How much RAM do you have?",
          text: "Before you choose, check how much RAM your computer has:",
          tools: [
            { name: "Windows", text: "Open Task Manager > Performance > Memory." },
            { name: "Mac", text: "From the Apple menu > About This Mac > Memory." },
          ],
        },
        rules: [
          {
            title: "The listed size = the compressed (4-bit) download in Ollama",
            text: "The model needs about the same amount of memory, and a bit more in long conversations.",
          },
          {
            title: "Leave room for your computer",
            text: "The operating system and open apps take part of the RAM, so pick a model clearly smaller than your RAM.",
          },
          {
            title: "A graphics card (GPU) speeds things up",
            text: "Without a GPU the model runs on the processor, just slower. On Macs with Apple chips, the RAM is shared with the graphics.",
          },
        ],
        toolsTitle: "Two ways to run them",
        toolsLede: "Pick one: a command line or an easy app. Both run on Windows and Mac.",
        tools: [
          {
            name: "Ollama",
            points: [
              "Command line: install it, then type the command listed next to the model, e.g. ollama run qwen3:4b.",
              "Every run command on this page is for Ollama and has a copy button.",
            ],
            link: { label: "Download Ollama", url: "https://ollama.com/download" },
          },
          {
            name: "LM Studio",
            points: ["Easy interface: install it and search for the model's name inside the app."],
            link: { label: "Download LM Studio", url: "https://lmstudio.ai/download" },
          },
        ],
        tiers: [
          {
            ram: "8 GB",
            title: "8 GB RAM: small models",
            models: [
              { name: "Qwen3 4B", size: "2.5 GB", command: "ollama run qwen3:4b", url: "https://ollama.com/library/qwen3" },
              { name: "Gemma 3 4B", size: "3.4 GB", command: "ollama run gemma3:4b", url: "https://ollama.com/library/gemma3" },
            ],
            notes: ["Close heavy apps while it runs. Models over 5 GB are heavy on 8 GB."],
          },
          {
            ram: "16 GB",
            title: "16 GB RAM: the popular models",
            models: [
              { name: "Llama 3.1 8B", size: "4.9 GB", command: "ollama run llama3.1:8b", url: "https://ollama.com/library/llama3.1" },
              { name: "Qwen3 8B", size: "5.2 GB", command: "ollama run qwen3:8b", url: "https://ollama.com/library/qwen3" },
              { name: "Gemma 3 12B", size: "8.2 GB", command: "ollama run gemma3:12b", url: "https://ollama.com/library/gemma3" },
              { name: "Qwen3 14B", size: "9.3 GB", command: "ollama run qwen3:14b", url: "https://ollama.com/library/qwen3" },
              { name: "GPT-OSS 20B", size: "14 GB", command: "ollama run gpt-oss:20b", url: "https://ollama.com/library/gpt-oss" },
            ],
            notes: ["GPT-OSS 20B on 16 GB is tight: it runs, but leaves your computer little room."],
          },
          {
            ram: "32 GB",
            title: "32 GB RAM: large models",
            models: [
              { name: "Gemma 3 27B", size: "17 GB", command: "ollama run gemma3:27b", url: "https://ollama.com/library/gemma3" },
              { name: "Qwen3 30B", size: "19 GB", command: "ollama run qwen3:30b", url: "https://ollama.com/library/qwen3" },
              { name: "Qwen3 32B", size: "20 GB", command: "ollama run qwen3:32b", url: "https://ollama.com/library/qwen3" },
            ],
          },
          {
            ram: "64 GB",
            title: "64 GB RAM: the heavyweights",
            models: [
              { name: "Llama 3.3 70B", size: "43 GB", command: "ollama run llama3.3:70b", url: "https://ollama.com/library/llama3.3" },
            ],
            notes: [
              "Models this size take patience: speed depends a lot on the graphics card.",
              "GPT-OSS 120B is 65 GB, more than 64 GB of RAM, so it doesn't fit this machine.",
            ],
          },
        ],
        footnotes: [
          {
            title: "What about Kimi K3?",
            text: "One of its compressed versions (Unsloth 1-bit) needs about 610 GB of memory (RAM + VRAM combined), so it's not for a laptop.",
            link: { label: "Source: Unsloth", url: "https://unsloth.ai/docs/models/kimi-k3" },
          },
          {
            title: "Where the sizes come from",
            text: "The Ollama library (each model's tags page), reviewed on 9 November 2026. Sizes change with updates, so check the model's page before downloading.",
          },
        ],
        requirements: [
          "A Windows or Mac computer; the more RAM, the more models you can run.",
          "Ollama or LM Studio.",
          "Enough storage for the model you download.",
        ],
        fileLanguage: "Arabic",
        imageAlt: "Cover of the “AI Models That Fit Your RAM” guide by GAOBA AI",
      },
    },
  },
  {
    // GAOBA AI's own guide (no third-party project, so no `source`). The idea comes from GAOBA AI's reel about Pando.
    // public/resources/pando-openai/resource_guide.pdf is GAOBA_REEL/resources/resource_guide.pdf, unmodified
    // (4 pages, 747,709 bytes). Its path is kept as-is: it is already shared as a direct link (ManyChat).
    // Every rule, prompt and tool note below comes from the PDF; the English text is a translation.
    slug: "ai-agent-rules",
    category: "guide",
    published: "2026-11-09",
    inLanguage: ["ar"],
    image: {
      ar: "/resources/pando-openai/og-ar.png",
      en: "/resources/pando-openai/og-en.png",
    },
    file: {
      path: "/resources/pando-openai/resource_guide.pdf",
      downloadName: "7-rules-ai-agents-guide-ar.pdf",
      type: "application/pdf",
      pages: 4,
      bytes: 747709,
    },
    preparedBy: "GAOBA AI (@a_gaoba.ai)",
    shortLink: { code: "agent-rules", locale: "ar" },
    text: {
      ar: {
        title: "7 قواعد تحمي مشروعك مع AI Agents",
        description:
          "دليل عملي بالعربية: 7 قواعد تحمي مشروعك عندما يعدّل وكيل الذكاء الاصطناعي ملفاتك، ومع كل قاعدة أمر جاهز تنسخه وتلصقه في Claude Code أو Cursor.",
        ogTagline: "أوامر جاهزة تنسخها وتلصقها للوكيل",
        ogChips: ["7 قواعد", "Claude Code", "Cursor", "أوامر جاهزة"],
        intro: [
          "عندما يعدّل الذكاء الاصطناعي مشروعك بسرعة، تحتاج نظامًا يرتّب التعديلات ويحميك من الفوضى: كل مهمة في فرع خاص بها، وإذا أخطأ الوكيل لا تدمج تعديلاته.",
          "هذه هي الفكرة نفسها التي عرضها ريل Pando على حساب GAOBA AI. حوّلناها إلى 7 قواعد بسيطة، ومع كل قاعدة أمر (Prompt) جاهز تنسخه وتلصقه للوكيل. لا تحتاج أن تكون مبرمجًا.",
        ],
        note: "«الوكيل» (AI Agent) يعني ذكاءً اصطناعيًا يعدّل ملفات مشروعك بنفسه، لا يكتفي بالإجابة عن أسئلتك.",
        benefits: [
          "نقطة رجوع آمنة قبل كل تعديل، فتعود إلى النسخة السليمة خلال ثوانٍ.",
          "كل مهمة في فرع منفصل، فتبقى النسخة الأصلية سليمة حتى توافق.",
          "خطة قبل التنفيذ، ومراجعة التغييرات بكلام بسيط قبل الدمج.",
          "زر طوارئ واضح عندما يخرب المشروع، وحماية مفاتيح API وكلمات السر.",
          "خطوات خاصة بـ Claude Code وCursor، وملف قواعد دائم تضعه مرة واحدة.",
          "قائمة سريعة من 6 نقاط تراجعها قبل كل جلسة.",
        ],
        setup: {
          title: "قبل ما تبدأ (مرة وحدة بس)",
          text: "تأكد أن مشروعك محفوظ في Git. ‏Git هو «سجل الحفظ» لمشروعك: كل نقطة حفظ تستطيع الرجوع إليها.",
          prompt: `تأكد إن المشروع فيه Git. إذا ما فيه، شغّل git init، وجهّز ملف .gitignore مناسب للمشروع، واعمل أول حفظ (commit) باسم "start". لا تعدّل أي كود ثاني. بعدها قل لي ايش سويت بجملتين.`,
        },
        rules: [
          {
            title: "نقطة رجوع قبل كل طلب",
            text: "قبل أي تعديل كبير، احفظ النسخة التي تعمل. إذا خرب شيء، تعود إليها خلال ثوانٍ.",
            prompt: `قبل ما تبدأ هذي المهمة، اعمل commit بالحالة الحالية باسم "before: <اسم المهمة>".\nلا تبدأ التعديل إلا بعد ما تأكد لي إن الحفظ تم.`,
          },
          {
            title: "كل مهمة في فرع خاص",
            text: "الفرع (branch) نسخة جانبية من مشروعك. يعمل الوكيل فيها، وتبقى النسخة الأصلية سليمة حتى توافق. وهي نفس فكرة «المسار الخاص» في Pando.",
            prompt: `سوّ فرع جديد باسم task/<اسم-المهمة> واشتغل فيه بس.\nلا تلمس الفرع الرئيسي (main) أبداً، ولا تدمج إلا لما أقول لك "ادمج".`,
          },
          {
            title: "خطة أول، تعديل بعدين",
            text: "اجعل الوكيل يخبرك بما سيفعله قبل أن يلمس أي ملف.",
            tools: [
              { name: "Claude Code", text: "شغّل وضع التخطيط (Plan Mode) قبل المهام الكبيرة." },
              { name: "Cursor", text: "اطلب الخطة في المحادثة أولًا." },
            ],
            prompt: `لا تعدّل أي ملف ذلحين. اكتب لي خطة قصيرة: ايش الملفات اللي بتغيّرها، وليش، وايش ممكن يخرب. انتظر موافقتي قبل التنفيذ.`,
          },
          {
            title: "مهمة صغيرة وحدة في كل مرة",
            text: "طلب واحد كبير يعني تعديلات كثيرة يصعب التراجع عنها، فقسّمه. ولا تشغّل وكيلين على الملف نفسه في الوقت نفسه.",
            prompt: `نفّذ الخطوة الأولى من الخطة بس، واعمل commit لها، ووقف.\nلا تكمل الخطوة الثانية إلا لما أراجع.`,
          },
          {
            title: "راجع قبل ما تدمج",
            text: "لا تحتاج أن تكون مبرمجًا: اطلب من الوكيل أن يشرح التغييرات بكلام بسيط.",
            prompt: `اعرض لي ملخص كل التغييرات في هذا الفرع مقارنة بـ main (git diff)، بكلام بسيط:\nايش تغيّر، وليش، وهل فيه أي ملف انحذف أو أي إعداد تغيّر. لا تخفي شي.`,
          },
          {
            title: "زر الطوارئ",
            text: "إذا خرب المشروع، لا تترك الوكيل «يصلّح» فوق الخراب. ارجع إلى آخر نسخة تعمل.",
            tools: [
              { name: "Claude Code", text: "فيه نقاط رجوع (checkpoints) تعود إليها بالأمر ⁦/rewind⁩." },
              { name: "Cursor", text: "فيه زر استرجاع نقطة الحفظ (Restore Checkpoint) بجانب رسائل المحادثة." },
            ],
            prompt: `وقف التعديل. ارجع المشروع لآخر commit اسمه يبدأ بـ "before:" بدون ما تحذف السجل، وقل لي بالضبط ايش رجّعت.`,
          },
          {
            title: "المفاتيح والأسرار ما ترتفع أبداً",
            text: "مكان مفاتيح API وكلمات السر هو ملف ⁦.env⁩، وهذا الملف لا يدخل Git.",
            prompt: `تأكد إن .env وكل ملفات المفاتيح موجودة في .gitignore.\nافحص المشروع: هل فيه أي مفتاح API أو كلمة سر مكتوبة داخل الكود أو محفوظة في Git؟\nإذا لقيت، قل لي فين بالضبط وكيف أنقلها لـ .env. لا ترفع أي شي.`,
          },
        ],
        tools: [
          {
            name: "Claude Code",
            points: [
              "وضع التخطيط (Plan Mode) قبل المهام الكبيرة.",
              "نقاط رجوع (checkpoints) تعود إليها بالأمر ⁦/rewind⁩.",
              "ملف القواعد الدائم يوضع في CLAUDE.md داخل مجلد المشروع.",
            ],
          },
          {
            name: "Cursor",
            points: [
              "اطلب الخطة في المحادثة قبل أي تعديل.",
              "زر استرجاع نقطة الحفظ (Restore Checkpoint) بجانب رسائل المحادثة.",
              "ملف القواعد الدائم يوضع داخل ⁦.cursor/rules⁩ أو في AGENTS.md.",
            ],
          },
        ],
        rulesFile: {
          title: "ملف القواعد الدائم (الصقه مرة وينفّذه الوكيل كل مرة)",
          text: "ضع هذه القواعد في ملف داخل مشروعك، فيلتزم بها الوكيل في كل جلسة دون أن تكرّرها.",
          tools: [
            { name: "Claude Code", text: "ضعه في ملف CLAUDE.md في مجلد المشروع." },
            { name: "Cursor", text: "ضعه في ملف قواعد داخل ⁦.cursor/rules⁩ أو في AGENTS.md." },
          ],
          prompt: `# قواعد العمل في هذا المشروع\n- قبل أي مهمة: commit باسم "before: <المهمة>".\n- اشتغل دائماً في فرع task/<اسم-المهمة>، ولا تعدّل main مباشرة.\n- اعرض الخطة وانتظر الموافقة قبل تعديل أكثر من ملف واحد.\n- نفّذ خطوة وحدة، واعمل commit، ووقف للمراجعة.\n- لا تحذف ملفات، ولا تغيّر إعدادات قاعدة البيانات أو الدفع، إلا بموافقة صريحة.\n- لا تكتب مفاتيح API أو كلمات سر داخل الكود. استخدم .env.\n- لا تدمج في main إلا لما أقول "ادمج".\n- بعد كل خطوة: لخّص التغييرات بكلام بسيط.`,
        },
        checklist: {
          title: "قائمة سريعة قبل كل جلسة",
          items: [
            "آخر نسخة شغالة محفوظة (commit)",
            "الوكيل في فرع خاص، مش في main",
            "شفت الخطة ووافقت عليها",
            "المهمة صغيرة ووحدة",
            "راجعت ملخص التغييرات قبل الدمج",
            "⁦.env⁩ موجود في ⁦.gitignore⁩",
          ],
        },
        requirements: [
          "Claude Code أو Cursor، أو أي وكيل ذكاء اصطناعي يعدّل ملفات مشروعك.",
          "مشروع محفوظ في Git (الدليل يشرح كيف تجهّزه بأمر واحد).",
        ],
        fileLanguage: "العربية",
        imageAlt: "غلاف دليل «7 قواعد تحمي مشروعك مع AI Agents» من GAOBA AI",
      },
      en: {
        title: "7 Rules to Protect Your Project with AI Agents",
        description:
          "A practical guide (in Arabic): 7 rules that keep your project safe when an AI agent edits your files, each with a ready prompt to copy into Claude Code or Cursor.",
        ogTagline: "Copy-paste prompts for your agent (in Arabic)",
        ogChips: ["7 rules", "Claude Code", "Cursor", "Ready prompts"],
        intro: [
          "When AI edits your project fast, you need a system that keeps the changes in order and protects you from chaos: every task on its own branch, and if the agent gets it wrong, you simply don't merge its changes.",
          "It's the same idea as GAOBA AI's reel about Pando, turned into 7 simple rules. Each rule comes with a ready prompt you copy and paste to the agent. You don't need to be a programmer.",
        ],
        note: "An “agent” (AI agent) is an AI that edits your project's files by itself, not one that only answers your questions.",
        benefits: [
          "A safe restore point before every change, so you can go back to a working version in seconds.",
          "Every task on a separate branch, so the original stays intact until you approve.",
          "A plan before any edit, and a plain-language review of the changes before merging.",
          "A clear emergency button when things break, and protection for API keys and passwords.",
          "Steps specific to Claude Code and Cursor, plus a permanent rules file you add once.",
          "A 6-point checklist to run before every session.",
        ],
        setup: {
          title: "Before you start (once only)",
          text: "Make sure your project is saved in Git. Git is your project's “save history”: every save point is one you can go back to.",
          prompt: `Make sure the project uses Git. If it doesn't, run git init, add a .gitignore that suits the project, and make the first save (commit) named "start". Don't change any other code. Then tell me what you did in two sentences.`,
        },
        rules: [
          {
            title: "A restore point before every request",
            text: "Before any big change, save the version that works. If something breaks, you're back in seconds.",
            prompt: `Before you start this task, commit the current state as "before: <task name>".\nDon't start editing until you've confirmed the save is done.`,
          },
          {
            title: "Every task on its own branch",
            text: "A branch is a side copy of your project. The agent works there and the original stays intact until you approve. It's the same idea as the “private lane” in Pando.",
            prompt: `Create a new branch named task/<task-name> and work only there.\nNever touch the main branch (main), and don't merge until I say "merge".`,
          },
          {
            title: "Plan first, edit later",
            text: "Have the agent tell you what it's going to do before it touches any file.",
            tools: [
              { name: "Claude Code", text: "Turn on Plan Mode before big tasks." },
              { name: "Cursor", text: "Ask for the plan in the chat first." },
            ],
            prompt: `Don't edit any file yet. Write me a short plan: which files you'll change, why, and what could break. Wait for my approval before doing it.`,
          },
          {
            title: "One small task at a time",
            text: "One big request means many changes that are hard to undo, so split it up. And never run two agents on the same file at the same time.",
            prompt: `Do only the first step of the plan, commit it, and stop.\nDon't continue to the second step until I've reviewed.`,
          },
          {
            title: "Review before you merge",
            text: "You don't need to be a programmer: ask the agent to explain the changes in plain words.",
            prompt: `Show me a summary of all the changes on this branch compared with main (git diff), in plain words:\nwhat changed, why, and whether any file was deleted or any setting changed. Don't hide anything.`,
          },
          {
            title: "The emergency button",
            text: "If the project breaks, don't let the agent “fix” on top of the mess. Go back to the last working version.",
            tools: [
              { name: "Claude Code", text: "It has checkpoints you can return to with the /rewind command." },
              { name: "Cursor", text: "It has a Restore Checkpoint button next to the chat messages." },
            ],
            prompt: `Stop editing. Restore the project to the last commit whose name starts with "before:" without deleting the history, and tell me exactly what you restored.`,
          },
          {
            title: "Keys and secrets never get pushed",
            text: "API keys and passwords belong in a .env file, and that file never goes into Git.",
            prompt: `Make sure .env and every key file are listed in .gitignore.\nScan the project: is there any API key or password written in the code or saved in Git?\nIf you find one, tell me exactly where and how to move it to .env. Don't push anything.`,
          },
        ],
        tools: [
          {
            name: "Claude Code",
            points: [
              "Plan Mode before big tasks.",
              "Checkpoints you can return to with /rewind.",
              "The permanent rules file goes in CLAUDE.md in the project folder.",
            ],
          },
          {
            name: "Cursor",
            points: [
              "Ask for the plan in the chat before any edit.",
              "A Restore Checkpoint button next to the chat messages.",
              "The permanent rules file goes inside .cursor/rules or in AGENTS.md.",
            ],
          },
        ],
        rulesFile: {
          title: "The permanent rules file (paste once, the agent follows it every time)",
          text: "Put these rules in a file inside your project and the agent follows them in every session without you repeating them.",
          tools: [
            { name: "Claude Code", text: "Put it in a CLAUDE.md file in the project folder." },
            { name: "Cursor", text: "Put it in a rules file inside .cursor/rules or in AGENTS.md." },
          ],
          prompt: `# Working rules for this project\n- Before any task: commit named "before: <task>".\n- Always work on a task/<task-name> branch; never edit main directly.\n- Show the plan and wait for approval before editing more than one file.\n- Do one step, commit it, and stop for review.\n- Don't delete files or change database or payment settings without explicit approval.\n- Never write API keys or passwords in the code. Use .env.\n- Don't merge into main until I say "merge".\n- After every step: summarise the changes in plain words.`,
        },
        checklist: {
          title: "Quick checklist before every session",
          items: [
            "The last working version is saved (commit)",
            "The agent is on its own branch, not on main",
            "I've seen the plan and approved it",
            "The task is small and single",
            "I reviewed the summary of changes before merging",
            ".env is listed in .gitignore",
          ],
        },
        requirements: [
          "Claude Code or Cursor, or any AI agent that edits your project's files.",
          "A project saved in Git (the guide shows how to set this up with one prompt).",
        ],
        fileLanguage: "Arabic",
        imageAlt: "Cover of the “7 Rules to Protect Your Project with AI Agents” guide by GAOBA AI",
      },
    },
  },
  {
    // Checked 2026-11-08 against the GitHub API and the repo files: public, owner "Jake Schincariol", MIT
    // ("Copyright (c) 2026 Jake Schincariol"), 13 folders under skills/ (ig-*), plugin "instagram-agent" in the
    // "instagram-agent-skill" marketplace. The PDF is GAOBA AI's Arabic guide to that project (3 pages).
    // public/resources/instagram-agent-skills/instagram-agent-skills-guide-ar.pdf is a copy of
    // GAOBA_REEL/resources/resource_guide.pdf with one fix: its only clickable link pointed to
    // ".../instagram-agent-skill%3C/b%3E" (a stray "</b>"); it now points to the URL printed on the page.
    slug: "instagram-agent-skills",
    category: "guide",
    published: "2026-11-08",
    inLanguage: ["ar"],
    image: {
      ar: "/resources/instagram-agent-skills/og-ar.png",
      en: "/resources/instagram-agent-skills/og-en.png",
    },
    file: {
      path: "/resources/instagram-agent-skills/instagram-agent-skills-guide-ar.pdf",
      downloadName: "13-instagram-agent-skills-guide-ar.pdf",
      type: "application/pdf",
      pages: 3,
      bytes: 190594,
    },
    // ar-addon.zip = README.md, ar.py, example.txt from ig-agent-skill/resources/ar-addon (reviewed 2026-11-08: no
    // secrets, personal data or network calls; standard library only; ar.py checked on example.txt → 12 words).
    // The guide refers to these files ("ar.py", "ar-addon/README.md") but gave no download link.
    extras: [
      {
        path: "/resources/instagram-agent-skills/ar-addon.zip",
        downloadName: "gaoba-ai-ar-addon.zip",
        type: "application/zip",
        bytes: 3405,
        files: ["ar.py", "README.md", "example.txt"],
        text: {
          ar: {
            title: "إضافة العربي (ar.py)",
            description:
              "إضافة صغيرة من GAOBA AI (رخصة MIT) تجعل أدوات المشروع تعدّ الكلمات العربية بشكل صحيح، فيطلع وقت السكربت العربي صحيحًا. تعمل بـ Python 3 دون أي مكتبة إضافية، ولا تعدّل أدوات المشروع.",
          },
          en: {
            title: "Arabic add-on (ar.py)",
            description:
              "A small GAOBA AI add-on (MIT) that makes the project's tools count Arabic words correctly, so Arabic script timings come out right. Python 3, no extra libraries, and the project's tools are not modified.",
          },
        },
      },
    ],
    source: { name: "instagram-agent-skill", author: "Jake Schincariol", url: SKILLS_REPO, license: "MIT" },
    preparedBy: "GAOBA AI (@a_gaoba.ai)",
    shortLink: { code: "instagram-agent", locale: "ar" },
    text: {
      ar: {
        title: "13 Instagram Agent Skills",
        description:
          "دليل عملي بالعربية لاستخدام مهارات Instagram Agent الـ13 مع Claude Code: ماذا تفعل كل مهارة، وكيف تركّبها، وأول خطوة بعد التركيب.",
        ogTagline: "دليل عملي بالعربية مع Claude Code",
        intro: [
          "مجموعة من 13 مهارة (Skills) لـ Claude Code تساعدك في إدارة حساب Instagram: كتابة سكربتات الريلز والكابشن، وتخطيط الأسبوع، والستوري والكاروسيل، والرد على التعليقات والرسائل، ومراجعة البروفايل والمنشورات القديمة.",
          "المشروع من تطوير Jake Schincariol، مجاني ومفتوح المصدر برخصة MIT. هذا الدليل أعدّه GAOBA AI بالعربية ليشرح المهارات وطريقة تركيبها خطوة بخطوة.",
        ],
        contents: [
          { label: "/ig-reel", text: "تكتب سكربت الريل، وتقترح ثلاث بدايات مع تقييمها، وتقدّر وقت كل جملة." },
          { label: "/ig-caption", text: "تكتب الكابشن، وتريك ما يظهر قبل «المزيد»." },
          { label: "/ig-viral", text: "تجد الريلز الناجحة في مجالك، وترتّبها، وتحلّل بداياتها." },
          { label: "/ig-plan", text: "خطة الأسبوع: ماذا تنشر، وبأي صيغة، ومتى." },
          { label: "/ig-story", text: "تسلسل الستوري اليومي." },
          { label: "/ig-carousel", text: "الكاروسيل: الغلاف ونص كل شريحة." },
          { label: "/ig-repurpose", text: "تحوّل فيديو أو بودكاست واحدًا إلى أسبوع من الريلز والكاروسيل." },
          { label: "/ig-reply", text: "مسودات ردود على التعليقات تحت منشوراتك." },
          { label: "/ig-dm", text: "مسودات رسائل الخاص." },
          { label: "/ig-comment", text: "تعليقات على منشورات الآخرين." },
          { label: "/ig-profile", text: "تقييم البروفايل من 100 وتعديل ما ينقصه." },
          { label: "/ig-audit", text: "مراجعة منشوراتك القديمة: ما الذي نجح وما الذي لم ينجح." },
          { label: "/ig-human", text: "تجعل النص طبيعيًا وتزيل منه علامات الكتابة الآلية." },
        ],
        contentsNote: "المهارات تكتب لك المسودات، وأنت من يراجعها وينشرها.",
        requirements: ["Claude Code (متاح مع خطط Claude المدفوعة).", "Python 3 على جهازك، لأدوات القياس داخل بعض المهارات."],
        fileLanguage: "العربية",
        imageAlt: "غلاف دليل 13 Instagram Agent Skills من GAOBA AI",
      },
      en: {
        title: "13 Instagram Agent Skills",
        description:
          "A practical guide (in Arabic) to using the 13 Instagram Agent skills with Claude Code: what each skill does, how to install them, and the first step after installing.",
        ogTagline: "A practical guide for Claude Code (in Arabic)",
        intro: [
          "Thirteen Claude Code skills that help run an Instagram account: Reel scripts and captions, a weekly plan, stories and carousels, replies to comments and DMs, and reviews of your profile and past posts.",
          "The project is by Jake Schincariol, free and open source under the MIT license. This guide, written in Arabic by GAOBA AI, explains the skills and how to install them step by step.",
        ],
        contents: [
          { label: "/ig-reel", text: "Writes the Reel script, gives three scored opening hooks and times each line." },
          { label: "/ig-caption", text: "Writes the caption and shows what appears before “… more”." },
          { label: "/ig-viral", text: "Finds the Reels that worked in your niche, ranks them and breaks down their hooks." },
          { label: "/ig-plan", text: "The week's plan: what to post, in which format, and when." },
          { label: "/ig-story", text: "The day's story sequence." },
          { label: "/ig-carousel", text: "Carousels: the cover and the copy for each slide." },
          { label: "/ig-repurpose", text: "Turns one video or podcast into a week of Reels and carousels." },
          { label: "/ig-reply", text: "Draft replies to the comments under your posts." },
          { label: "/ig-dm", text: "Draft direct messages." },
          { label: "/ig-comment", text: "Comments on other people's posts." },
          { label: "/ig-profile", text: "Scores your profile out of 100 and fixes what is missing." },
          { label: "/ig-audit", text: "Reviews your past posts: what worked and what did not." },
          { label: "/ig-human", text: "Makes text read naturally and removes the marks of machine writing." },
        ],
        contentsNote: "The skills write drafts; you review and publish them.",
        requirements: ["Claude Code (included with paid Claude plans).", "Python 3 on your computer, for the measuring tools inside some skills."],
        fileLanguage: "Arabic",
        imageAlt: "Cover of the 13 Instagram Agent Skills guide by GAOBA AI",
      },
    },
  },
]

export const getResource = (slug: string) => resources.find((r) => r.slug === slug)

/** /r/<code> → localized details page. Codes are matched case-insensitively. */
export const shortLinks: Record<string, string> = Object.fromEntries(
  resources
    .filter((r) => r.shortLink)
    .map((r) => [r.shortLink!.code.toLowerCase(), `/${r.shortLink!.locale}/resources/${r.slug}`]),
)
