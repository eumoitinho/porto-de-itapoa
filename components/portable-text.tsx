import { PortableText as SanityPortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

interface PortableTextProps {
  content: PortableTextBlock[] | null | undefined
  className?: string
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold mb-2">{children}</h4>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
}

export function PortableText({ content, className = '' }: PortableTextProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <SanityPortableText value={content} components={components} />
    </div>
  )
}

