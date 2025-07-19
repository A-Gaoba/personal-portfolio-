import type React from "react"

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[]
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  // Handle both single object and array of objects
  const jsonData = Array.isArray(data) ? data : [data]

  return (
    <>
      {jsonData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

export default JsonLd
