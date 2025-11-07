"use client"

import { motion } from "framer-motion"
import { Ship, Calendar, Clock, MapPin, ExternalLink, Info } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProgramacaoNaviosData } from "@/hooks/useSanityData"
import { PortableText } from "@/components/portable-text"
import Link from "next/link"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"

export default function AgendamentoPage() {
  const { data: pageData } = useProgramacaoNaviosData()
  const { language } = useI18n()

  const title = getTranslatedField(pageData?.title, language, 'Programação de Navios')
  const description = getTranslatedField(pageData?.description, language, 'Acompanhe em tempo real chegadas, atracações e saídas de navios')

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

        {/* Intro */}
        {pageData?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Funcionalidades */}
        {pageData?.funcionalidades && pageData.funcionalidades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              Funcionalidades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.funcionalidades.map((func: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Ship className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            {getTranslatedField(func.titulo, language, func.titulo)}
                          </h3>
                          {func.descricao && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {getTranslatedField(func.descricao, language, func.descricao)}
                            </p>
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

        {/* Link para Sistema */}
        {pageData?.linkSistema && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8 text-white">
                <Ship className="h-16 w-16 mx-auto mb-6" />
                <h2 className="text-3xl font-semibold mb-4">
                  Acesse a Programação de Navios
                </h2>
                <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                  Consulte em tempo real todas as informações sobre chegadas, atracações e saídas de navios.
                </p>
                <Link href={pageData.linkSistema} target="_blank">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8">
                    Acessar Sistema
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Instruções */}
        {pageData?.instrucoes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="backdrop-blur-md bg-blue-50 border border-blue-200 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <h3 className="text-2xl font-semibold text-blue-800">
                    Instruções de Uso
                  </h3>
                </div>
                <PortableText 
                  content={pageData.instrucoes}
                  className="text-blue-900 leading-relaxed"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Fallback quando não há dados */}
        {!pageData && (
          <div className="text-center py-16">
            <Ship className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Conteúdo em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  )
}
