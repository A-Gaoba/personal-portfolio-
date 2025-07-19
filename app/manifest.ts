import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    short_name: "Abdulrahman Gaoba",
    description:
      "Professional portfolio of Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#10b981",
    icons: [
      {
        src: "/portfolio-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/portfolio-icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/myimage.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/myimage.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
