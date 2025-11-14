"use client"

import { motion } from "framer-motion"
import { Ship, Calendar, Clock, MapPin, ExternalLink, Info, ChevronRight, Anchor, Waves } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Ship className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Programação em Tempo Real</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      {pageData?.intro && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <PortableText 
                    content={pageData.intro}
                    className="text-gray-600 leading-relaxed text-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Funcionalidades Section */}
      {pageData?.funcionalidades && pageData.funcionalidades.length > 0 && (
        <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                Funcionalidades
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Recursos disponíveis no sistema de programação de navios
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.funcionalidades.map((func: any, index: number) => {
                const styleVariants = [
                  {
                    card: "bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg",
                    icon: "bg-emerald-500 text-white shadow-lg",
                  },
                  {
                    card: "bg-white border-2 border-green-200 shadow-md rounded-2xl",
                    icon: "bg-gradient-to-br from-green-400 to-green-600 text-white",
                  },
                  {
                    card: "bg-gradient-to-tr from-lime-50 to-white border border-lime-300 shadow-sm rounded-xl",
                    icon: "bg-lime-100 text-lime-700 border-2 border-lime-300",
                  },
                ]
                const style = styleVariants[index % styleVariants.length]
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={`${style.card} h-full transition-all duration-300 hover:shadow-xl`}>
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                            <Ship className="h-7 w-7" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                              {getTranslatedField(func.titulo, language, func.titulo)}
                            </h3>
                            {func.descricao && (
                              <p className="text-gray-600 leading-relaxed">
                                {getTranslatedField(func.descricao, language, func.descricao)}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Link para Sistema Section */}
      {pageData?.linkSistema && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-12 text-white relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                      <Ship className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                      Acesse a Programação de Navios
                    </h2>
                    <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                      Consulte em tempo real todas as informações sobre chegadas, atracações e saídas de navios.
                    </p>
                    <Link href={pageData.linkSistema} target="_blank">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-medium shadow-xl">
                          Acessar Sistema
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Instruções Section */}
      {pageData?.instrucoes && (
        <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white border-2 border-green-200 shadow-md rounded-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info className="h-7 w-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                        Instruções de Uso
                      </h3>
                      <PortableText 
                        content={pageData.instrucoes}
                        className="text-gray-700 leading-relaxed text-base"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Fallback quando não há dados */}
      {!pageData && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <Ship className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Conteúdo em desenvolvimento</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
