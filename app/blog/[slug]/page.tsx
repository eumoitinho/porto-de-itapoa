"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { useBlogPost, useRelatedBlogPosts } from "@/hooks/useSanityData"
import { PortableText } from "@/components/portable-text"
import { urlFor } from "@/lib/sanity"
import { BlogCard } from "@/components/blog-card"

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

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useI18n()
  const slug = params.slug as string

  const { data: post, isLoading, error } = useBlogPost(slug)
  const { data: relatedPosts = [] } = useRelatedBlogPosts(
    post?._id || "",
    post?.category,
    3
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">{t("loading") || "Carregando..."}</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("postNotFound") || "Post não encontrado"}
          </h1>
          <p className="text-gray-600 mb-4">
            {t("postNotFoundDescription") || "O post que você está procurando não existe ou foi removido."}
          </p>
          <Link href="/blog">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToBlog") || "Voltar para o blog"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = post.featuredImageUrl || (post.featuredImage ? urlFor(post.featuredImage).url() : "/placeholder.svg")
  const categoryLabel = categoryLabels[post.category] || post.category
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  // Garantir que title seja string
  const postTitle = typeof post.title === 'string' ? post.title : String(post.title || '')
  const postExcerpt = typeof post.excerpt === 'string' ? post.excerpt : String(post.excerpt || '')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Image */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src={imageUrl}
          alt={postTitle}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/blog">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToBlog") || "Voltar"}
            </Button>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-green-600 text-white mb-4 text-sm px-4 py-1">
                {categoryLabel}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {postTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formattedDate}</span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{post.readingTime} {t("minutes") || "min"}</span>
                  </div>
                )}
                {post.author?.name && (
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{post.author.name}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Excerpt */}
          {postExcerpt && (
            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-12 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {postExcerpt}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700 prose-img:rounded-lg prose-img:shadow-lg mb-12">
            {post.content && <PortableText content={post.content} />}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">
                  {t("tags") || "Tags"}:
                </span>
                {post.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-gray-50 text-gray-700 border-gray-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                {t("share") || "Compartilhar"}:
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    "_blank"
                  )
                }
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}`,
                    "_blank"
                  )
                }
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                    "_blank"
                  )
                }
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Author Info */}
          {post.author && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex gap-4">
                {post.author.authorImageUrl && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.author.authorImageUrl}
                      alt={post.author.name || "Autor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {post.author.name}
                  </h3>
                  {post.author.bio && (
                    <p className="text-gray-600 text-sm">{post.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t("relatedPosts") || "Posts Relacionados"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any, index: number) => (
                <BlogCard key={relatedPost._id} post={relatedPost} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Blog */}
        <div className="mt-16 text-center">
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("backToBlog") || "Voltar para o blog"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

