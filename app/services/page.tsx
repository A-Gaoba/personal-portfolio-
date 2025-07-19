import Services from "@/app/components/Services"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Services - Abdulrahman Gaoba",
  description:
    "Explore the comprehensive web development services offered by Abdulrahman Gaoba, specializing in React, Next.js, and full-stack solutions.",
  keywords:
    "web development services, React development, Next.js services, full-stack development, UI/UX services, performance optimization, PWA development",
}

export default function ServicesPage() {
  return <Services />
}
