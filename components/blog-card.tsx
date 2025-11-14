"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { urlFor } from "@/lib/sanity"

interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  } | string
  excerpt: string
  featuredImageUrl?: string
  featuredImage?: any
  category: string
  publishedAt: string
  readingTime?: number
  author?: {
    name: string
    image?: any
    authorImageUrl?: string
  }
}

interface BlogCardProps {
  post: BlogPost
  index?: number
  variant?: "default" | "featured"
}

const categoryLabels: { [key: string]: string } = {
  operacoes: "Operações",
  expansao: "Expansão",
  sustentabilidade: "Sustentabilidade",
  infraestrutura: "Infraestrutura",
  qualidade: "Qualidade",
  educacao: "Educação",
  tecnologia: "Tecnologia",
  noticias: "Notícias",
}

export function BlogCard({ post, index = 0, variant = "default" }: BlogCardProps) {
  const imageUrl = post.featuredImageUrl || (post.featuredImage ? urlFor(post.featuredImage).url() : "/placeholder.svg")
  const categoryLabel = categoryLabels[post.category] || post.category
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const slug = typeof post.slug === 'string' ? post.slug : post.slug?.current || ''
  
  // Garantir que title e excerpt sejam strings
  const title = typeof post.title === 'string' ? post.title : String(post.title || '')
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : String(post.excerpt || '')

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
        <Link href={`/blog/${slug}`}>
          <Card className="h-full overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200">
            <div className="relative h-64 md:h-80">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600 text-white text-xs font-semibold px-3 py-1">
                  {categoryLabel}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl md:text-2xl line-clamp-2 mb-2">
                  {title}
                </h3>
                <p className="text-white/90 text-sm line-clamp-2 mb-4">
                  {excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formattedDate}</span>
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/blog/${post.slug.current}`}>
        <Card className="h-full overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 rounded-lg">
          <div className="relative h-48">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-600 text-white text-xs font-semibold px-2 py-1">
                {categoryLabel}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
              {title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min</span>
                </div>
              )}
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

