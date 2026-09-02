"use client"

import dynamic from "next/dynamic"

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
)

export default function MarkdownPreviewClient({ source }: { source: string }) {
  return (
    <MarkdownPreview 
      source={source} 
      className="bg-transparent text-gray-300" 
      style={{ backgroundColor: 'transparent' }}
    />
  )
}
