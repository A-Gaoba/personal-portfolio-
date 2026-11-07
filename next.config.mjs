/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
    return [{ source: "/testimonials", destination: "/", permanent: false }];
  },
};

export default nextConfig;
