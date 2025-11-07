"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Noticia } from "@/data/noticias"

interface NewsCardProps {
  noticia: Noticia
  index?: number
  variant?: "default" | "featured"
}

export function NewsCard({ noticia, index = 0, variant = "default" }: NewsCardProps) {
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
      >
        <Link href={`/noticias/${noticia.slug}`}>
          <Card className="h-full overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white">
            <div className="relative h-56">
              <Image
                src={noticia.imagem}
                alt={noticia.titulo}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                  {noticia.categoria}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg line-clamp-2 mb-2">
                  {noticia.titulo}
                </h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {noticia.resumo}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{noticia.data}</span>
                </div>
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  Ler mais
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/noticias/${noticia.slug}`}>
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl overflow-hidden h-full cursor-pointer hover:shadow-2xl transition-shadow">
          <div className="relative h-48">
            <Image
              src={noticia.imagem}
              alt={noticia.titulo}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                {noticia.categoria}
              </span>
            </div>
          </div>

          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-3 line-clamp-2">
              {noticia.titulo}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {noticia.resumo}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {noticia.data}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

