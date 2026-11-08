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
  /** Who made the original work the resource is about (shown on every card and page). */
  source: { name: string; author: string; url: string; license?: string }
  /** Who prepared this resource (the guide itself). */
  preparedBy: string
  /** Optional short link code: /r/<code> → /ar/resources/<slug> (see proxy.ts). */
  shortLink?: { code: string; locale: Locale }
  text: Record<Locale, ResourceText>
}

const SKILLS_REPO = "https://github.com/Jakeschincariol/instagram-agent-skill"

export const resources: Resource[] = [
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
