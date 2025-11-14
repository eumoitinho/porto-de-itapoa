"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, FileText, Calendar, DollarSign, Building, Download, ChevronRight, Award, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAcionistasData } from "@/hooks/useSanityData"
import { PortableText } from "@/components/portable-text"
import { urlFor } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"

export default function AcionistasPage() {
  const { data: pageData } = useAcionistasData()
  const { language } = useI18n()

  const title = getTranslatedField(pageData?.title, language, 'Acionistas')
  const description = getTranslatedField(pageData?.description, language, 'Estrutura acionária e governança')

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
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Estrutura Acionária</span>
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

      {/* Estrutura Acionária Section */}
      {pageData?.estruturaAcionaria && pageData.estruturaAcionaria.acionistas && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                {getTranslatedField(pageData.estruturaAcionaria?.titulo, language, "Estrutura Acionária")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça os principais acionistas e sua participação no capital do Porto Itapoá
              </p>
            </motion.div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pageData.estruturaAcionaria?.acionistas?.map((acionista: any, index: number) => {
                const styleVariants = [
                  {
                    card: "bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg",
                    icon: "bg-emerald-500 text-white shadow-lg",
                  },
                  {
                    card: "bg-white border-2 border-green-200 shadow-md rounded-2xl",
                    icon: "bg-gradient-to-br from-green-400 to-green-600 text-white",
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
                        <div className="flex items-start gap-6 mb-6">
                          {acionista.logo && (
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={urlFor(acionista.logo).url()}
                                alt={acionista.nome}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl font-semibold text-gray-900">
                                {getTranslatedField(acionista.nome, language, acionista.nome)}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {acionista.tipo && (
                                <Badge className="bg-green-600 text-white">
                                  {acionista.tipo === 'controlador' ? 'Controlador' : 'Minoritário'}
                                </Badge>
                              )}
                              {acionista.participacao && (
                                <Badge variant="outline" className="border-green-300 text-green-700">
                                  {acionista.participacao}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {acionista.descricao && (
                          <p className="text-gray-600 leading-relaxed text-base">
                            {getTranslatedField(acionista.descricao, language, acionista.descricao)}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Governança Section */}
      {pageData?.governanca && (
        <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Governança Corporativa</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                {getTranslatedField(pageData.governanca?.titulo, language, "Governança")}
              </h2>
            </motion.div>

            {pageData.governanca.conteudo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <Card className="bg-white border border-gray-100 shadow-lg rounded-2xl">
                  <CardContent className="p-8 md:p-12">
                    <PortableText 
                      content={pageData.governanca.conteudo}
                      className="text-gray-600 leading-relaxed text-lg"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Documentos */}
            {pageData.governanca.documentos && pageData.governanca.documentos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg rounded-2xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-green-800 mb-2">
                      Documentos para Acionistas
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Acesse documentos importantes relacionados à governança e estrutura acionária
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pageData.governanca.documentos.map((doc: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="group"
                        >
                          <Link
                            href={doc.link || (doc.arquivo ? '#' : '#')}
                            target={doc.link ? '_blank' : undefined}
                            className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                <FileText className="h-6 w-6 text-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                                  {getTranslatedField(doc.nome, language, doc.nome)}
                                </h4>
                                {doc.tipo && (
                                  <p className="text-sm text-gray-500">{doc.tipo}</p>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-4 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Download className="h-5 w-5" />
                            </Button>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Fallback quando não há dados */}
      {!pageData && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Conteúdo em desenvolvimento</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
