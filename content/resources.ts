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
  /** Optional: per-tool notes (e.g. Claude Code, Cursor). */
  tools?: { name: string; points: string[] }[]
  rulesFile?: GuideStep
  checklist?: { title: string; items: string[] }
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
