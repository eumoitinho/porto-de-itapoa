"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, FileText, Calendar, DollarSign, Building, Download } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

        {/* Estrutura Acionária */}
        {pageData?.estruturaAcionaria && pageData.estruturaAcionaria.acionistas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {getTranslatedField(pageData.estruturaAcionaria?.titulo, language, "Estrutura Acionária")}
            </h2>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pageData.estruturaAcionaria?.acionistas?.map((acionista: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        {acionista.logo && (
                          <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                            <Image
                              src={urlFor(acionista.logo).url()}
                              alt={acionista.nome}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-green-800">{getTranslatedField(acionista.nome, language, acionista.nome)}</h3>
                          {acionista.tipo && (
                            <Badge className="bg-green-100 text-green-800 mt-1">
                              {acionista.tipo === 'controlador' ? 'Controlador' : 'Minoritário'}
                            </Badge>
                          )}
                          {acionista.participacao && (
                            <Badge variant="outline" className="ml-2 mt-1">
                              {acionista.participacao}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {acionista.descricao && (
                        <p className="text-gray-600 leading-relaxed">{getTranslatedField(acionista.descricao, language, acionista.descricao)}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Governança */}
        {pageData?.governanca && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {getTranslatedField(pageData.governanca?.titulo, language, "Governança")}
            </h2>

            {pageData.governanca.conteudo && (
              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl mb-8">
                <CardContent className="p-8">
                  <PortableText 
                    content={pageData.governanca.conteudo}
                    className="text-gray-600 leading-relaxed"
                  />
                </CardContent>
              </Card>
            )}

            {/* Documentos */}
            {pageData.governanca.documentos && pageData.governanca.documentos.length > 0 && (
              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-green-800 mb-6 text-center">
                    Documentos para Acionistas
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pageData.governanca.documentos.map((doc: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-800">{getTranslatedField(doc.nome, language, doc.nome)}</h4>
                              {doc.tipo && (
                                <p className="text-sm text-gray-500">{doc.tipo}</p>
                              )}
                            </div>
                        </div>
                        {(doc.arquivo || doc.link) && (
                          <Link
                            href={doc.link || (doc.arquivo ? '#' : '#')}
                            target={doc.link ? '_blank' : undefined}
                          >
                            <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Badge>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
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
