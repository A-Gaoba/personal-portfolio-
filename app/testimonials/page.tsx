import Testimonials from "@/app/components/Testimonials"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"

export const metadata = {
  title: "Testimonials - Abdulrahman's Portfolio",
  description: "Hear what clients say about Abdulrahman's full-stack development and UI/UX work.",
}

export default function TestimonialsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Client Testimonials",
    description: "Testimonials from satisfied clients of Abdulrahman, a full-stack developer.",
    url: "https://abdulrahman.dev/testimonials",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Review",
            author: { "@type": "Person", name: "Sarah Chen" },
            reviewBody:
              "Abdulrahman transformed our outdated platform into a modern, lightning-fast application. His attention to detail and expertise in Next.js were exceptional. Highly recommend!",
            reviewRating: { "@type": "Rating", ratingValue: "5" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Review",
            author: { "@type": "Person", name: "Michael Rodriguez" },
            reviewBody:
              "Working with Abdulrahman was a breeze. He delivered a complex feature set ahead of schedule, with clean code and a user experience that exceeded our expectations.",
            reviewRating: { "@type": "Rating", ratingValue: "5" },
          },
        },
      ],
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen flex flex-col justify-center items-center pt-24 relative bg-dark-bg">
        {" "}
        {/* Added bg-dark-bg here */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-20 w-80 h-80 bg-syntax-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-syntax-orange/10 rounded-full blur-3xl" />
        </div>
        <Testimonials />
      </main>
    </>
  )
}
