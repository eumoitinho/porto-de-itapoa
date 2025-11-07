"use client"

import { motion } from "framer-motion"
import { Award, Trophy, Star, Calendar, Building, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePremiacoesData } from "@/hooks/useSanityData"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"

export default function PremiacaoPage() {
  const { data: pageData } = usePremiacoesData()
  const { language } = useI18n()

  const reconhecimentos = pageData?.reconhecimentos || []
  const premios = pageData?.premios || []
  const title = getTranslatedField(pageData?.title, language, 'Premiações')
  const description = getTranslatedField(pageData?.description, language, 'Reconhecimentos e prêmios')

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

        {/* Reconhecimentos Principais */}
        {reconhecimentos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              Principais Reconhecimentos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reconhecimentos.map((reconhecimento: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-green-600" />
                      </div>
                      {reconhecimento.valor && (
                        <div className="text-3xl font-bold text-green-800 mb-2">
                          {reconhecimento.valor}
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {getTranslatedField(reconhecimento.titulo, language, reconhecimento.titulo)}
                      </h3>
                      {reconhecimento.descricao && (
                        <p className="text-sm text-gray-600">
                          {getTranslatedField(reconhecimento.descricao, language, reconhecimento.descricao)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline de Prêmios */}
        {premios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              Histórico de Premiações
            </h2>

            <div className="space-y-8">
              {premios.map((premio: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/4 p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                            <Award className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-gray-800 mb-2">
                            {premio.ano}
                          </div>
                          {premio.nivel && (
                            <Badge
                              className={
                                premio.nivel === "internacional"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }
                            >
                              {premio.nivel === 'internacional' ? 'Internacional' : 
                               premio.nivel === 'regional' ? 'Regional' : 'Nacional'}
                            </Badge>
                          )}
                        </div>

                        <div className="lg:w-3/4 p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-green-800 mb-2">
                                {getTranslatedField(premio.titulo, language, premio.titulo)}
                              </h3>
                              {premio.categoria && (
                                <Badge variant="outline" className="mb-2">
                                  {getTranslatedField(premio.categoria, language, premio.categoria)}
                                </Badge>
                              )}
                            </div>
                            {premio.imagem && (
                              <div className="relative w-20 h-20 ml-4 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={urlFor(premio.imagem).url()}
                                  alt={getTranslatedField(premio.titulo, language, premio.titulo)}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>

                          {premio.descricao && (
                            <p className="text-gray-600 mb-4">
                              {getTranslatedField(premio.descricao, language, premio.descricao)}
                            </p>
                          )}

                          {premio.orgao && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Building className="h-4 w-4 mr-2" />
                              <span>{getTranslatedField(premio.orgao, language, premio.orgao)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fallback quando não há dados */}
        {reconhecimentos.length === 0 && premios.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Conteúdo em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  )
}
