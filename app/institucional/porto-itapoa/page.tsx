"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Building } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { usePortoItapoaData } from "@/hooks/useSanityData"
import { PortableText } from "@/components/portable-text"
import { urlFor } from "@/lib/sanity"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"

export default function PortoItapoaPage() {
  const { data: pageData } = usePortoItapoaData()
  const { language } = useI18n()

  const title = getTranslatedField(pageData?.title, language, 'Porto Itapoá')
  const description = getTranslatedField(pageData?.description, language, 'História, Linha do Tempo e Localização')

  return (
    <div className="min-h-screen mt-44 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light text-green-800 mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* História */}
        {pageData?.historia && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {getTranslatedField(pageData.historia?.titulo, language, "História")}
            </h2>
            
            <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {pageData.historia?.imagem && (
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={urlFor(pageData.historia.imagem).url()}
                        alt={getTranslatedField(pageData.historia?.titulo, language, "História do Porto Itapoá")}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    {pageData.historia?.conteudo && (
                      <PortableText 
                        content={pageData.historia.conteudo}
                        className="text-gray-600 leading-relaxed"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Linha do Tempo */}
        {pageData?.linhaTempo && pageData.linhaTempo.eventos && pageData.linhaTempo.eventos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {getTranslatedField(pageData.linhaTempo?.titulo, language, "Linha do Tempo")}
            </h2>

              <div className="relative pl-8 md:pl-0">
                {/* Timeline line - Thin and elegant */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2"></div>

                <div className="space-y-12">
                  {pageData.linhaTempo.eventos.map((evento: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className={`flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Timeline Marker - Minimalist square */}
                      <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-[11px] h-[11px] bg-green-600 rotate-45 z-10"></div>

                      <div className="flex-1 w-full md:w-auto"></div>

                      {/* Event content - Flat, border-based */}
                      <div className="flex-1 w-full md:w-auto bg-white border border-gray-100 p-6 hover:border-green-500 transition-colors duration-300 group">
                        <div className="flex items-start gap-4">
                          {evento.imagem && (
                            <div className="relative w-20 h-20 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                              <Image
                                src={urlFor(evento.imagem).url()}
                                alt={evento.titulo}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                              <span className="text-2xl font-bold text-green-600/20 group-hover:text-green-600 transition-colors">
                                {evento.ano}
                              </span>
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                                {getTranslatedField(evento.titulo, language, evento.titulo)}
                              </h3>
                            </div>
                            {evento.descricao && (
                              <p className="text-gray-500 text-sm leading-relaxed">
                                {getTranslatedField(evento.descricao, language, evento.descricao)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
          </motion.div>
        )}

        {/* Localização */}
        {pageData?.localizacao && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {getTranslatedField(pageData.localizacao?.titulo, language, "Localização")}
            </h2>

            <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    {pageData.localizacao?.endereco && (
                      <div className="flex items-start gap-4 mb-6">
                        <MapPin className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-2">Endereço</h3>
                          <p className="text-gray-600">{getTranslatedField(pageData.localizacao.endereco, language, pageData.localizacao.endereco)}</p>
                        </div>
                      </div>
                    )}

                    {pageData.localizacao.coordenadas && (
                      <div className="flex items-start gap-4 mb-6">
                        <Clock className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-2">Coordenadas</h3>
                          <p className="text-gray-600">
                            {pageData.localizacao.coordenadas.latitude && pageData.localizacao.coordenadas.longitude && (
                              <>
                                {pageData.localizacao.coordenadas.latitude}, {pageData.localizacao.coordenadas.longitude}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {pageData.localizacao?.descricao && (
                      <div className="mb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {getTranslatedField(pageData.localizacao.descricao, language, pageData.localizacao.descricao)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    {pageData.localizacao?.mapa && (
                      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src={pageData.localizacao.mapa}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Fallback quando não há dados */}
        {!pageData && (
          <div className="text-center py-16">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Conteúdo em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  )
}

