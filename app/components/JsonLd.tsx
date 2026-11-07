import type React from "react"

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[]
}

// "<" is escaped so a value containing "</script>" can never close the tag early (Phase 0b hardening).
const serialize = (item: Record<string, any>) => JSON.stringify(item).replace(/</g, "\\u003c")

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  // Handle both single object and array of objects
  const jsonData = Array.isArray(data) ? data : [data]

  return (
    <>
      {jsonData.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(item) }} />
      ))}
    </>
  )
}

export default JsonLd
