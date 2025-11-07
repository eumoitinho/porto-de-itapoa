"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { getNoticiaBySlug, getNoticiasRecentes } from "@/data/noticias"
import { useI18n } from "@/lib/i18n/context"

export default function NoticiaPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useI18n()
  const slug = params.slug as string
  
  const noticia = getNoticiaBySlug(slug)
  const noticiasRelacionadas = getNoticiasRecentes(3).filter(n => n.slug !== slug)

  if (!noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
          <Link href="/noticias">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para notícias
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Image */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src={noticia.imagemDestaque || noticia.imagem}
          alt={noticia.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/noticias">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToNews') || 'Voltar'}
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
                {noticia.categoria}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {noticia.titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{noticia.data}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{noticia.autor}</span>
                </div>
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
          {/* Resume */}
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-12 rounded-r-lg">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              {noticia.resumo}
            </p>
          </div>

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
          />

          {/* Tags */}
          {noticia.tags && noticia.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Tags:</span>
                {noticia.tags.map((tag) => (
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
                Compartilhar:
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${noticia.titulo}`, '_blank')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Related News */}
        {noticiasRelacionadas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('relatedNews') || 'Notícias Relacionadas'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {noticiasRelacionadas.map((noticiaRelacionada) => (
                <Link key={noticiaRelacionada.id} href={`/noticias/${noticiaRelacionada.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={noticiaRelacionada.imagem}
                        alt={noticiaRelacionada.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-600 text-white text-xs">
                          {noticiaRelacionada.categoria}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {noticiaRelacionada.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {noticiaRelacionada.resumo}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {noticiaRelacionada.data}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to News */}
        <div className="mt-16 text-center">
          <Link href="/noticias">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('seeAllNews') || 'Ver todas as notícias'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

