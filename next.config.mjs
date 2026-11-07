/** @type {import('next').NextConfig} */
const nextConfig = {
  // 2026-11-07: the `eslint` key was removed (no longer supported in Next.js 16; it only produced a warning).
  // TypeScript errors now fail the build again: the codebase type-checks cleanly (it used to have 17 errors).
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      {
        protocol: "https",
        hostname: "**.v0.dev",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.pexels.com",
      },
      {
        protocol: "https",
        hostname: "**.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "**.cdn.dev",
      },
    ],
    unoptimized: true,
  },
  // Phase 0a (2026-11-07): /testimonials showed fabricated testimonials (invented names, placeholder photos) and was
  // removed. Temporary (307) so the path can come back when real, attributable testimonials exist.
  async redirects() {
    // i18n (2026-11-07): also the language-prefixed paths. Un-prefixed URLs are handled by proxy.ts.
    return [
      { source: "/testimonials", destination: "/", permanent: false },
      { source: "/:locale(en|ar)/testimonials", destination: "/:locale", permanent: false },
    ];
  },
};

export default nextConfig;
