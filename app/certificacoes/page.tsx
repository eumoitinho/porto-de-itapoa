"use client"

import { motion } from "framer-motion"
import { Award, FileText, Calendar, CheckCircle2, Building, Shield, Leaf, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCertificacoesData } from "@/hooks/useSanityData"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"

const categoriaLabels: { [key: string]: string } = {
  'qualidade': 'Qualidade',
  'meio-ambiente': 'Meio Ambiente',
  'seguranca': 'Segurança',
  'operacional': 'Operacional',
  'outros': 'Outros'
}

const categoriaIcons: { [key: string]: any } = {
  'qualidade': Award,
  'meio-ambiente': Leaf,
  'seguranca': Shield,
  'operacional': Zap,
  'outros': Building,
}

export default function CertificacoesPage() {
  const { data: pageData } = useCertificacoesData()
  const { language } = useI18n()

  const certificacoes = pageData?.certificacoes || []
  const title = getTranslatedField(pageData?.title, language, 'Certificações')
  const description = getTranslatedField(pageData?.description, language, 'Certificações e credenciamentos')

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
              <Award className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Certificações e Credenciamentos</span>
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

      {/* Certificações Grid Section */}
      {certificacoes.length > 0 ? (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificacoes.map((cert: any, index: number) => {
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
                const CategoryIcon = categoriaIcons[cert.categoria] || Building
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={`${style.card} h-full overflow-hidden transition-all duration-300 hover:shadow-xl`}>
                      {cert.logo && (
                        <div className="relative h-48 w-full bg-gray-50">
                          <Image
                            src={urlFor(cert.logo).url()}
                            alt={cert.nome}
                            fill
                            className="object-contain p-6"
                          />
                        </div>
                      )}
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${style.icon}`}>
                                <CategoryIcon className="h-6 w-6" />
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {getTranslatedField(cert.nome, language, cert.nome)}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {cert.codigo && (
                                <Badge variant="outline" className="border-green-300 text-green-700">
                                  {cert.codigo}
                                </Badge>
                              )}
                              {cert.categoria && (
                                <Badge className="bg-green-600 text-white">
                                  {categoriaLabels[cert.categoria] || cert.categoria}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                        </div>

                        {cert.orgao && (
                          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                            <Building className="h-4 w-4" />
                            <span>{getTranslatedField(cert.orgao, language, cert.orgao)}</span>
                          </div>
                        )}

                        {cert.descricao && (
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {getTranslatedField(cert.descricao, language, cert.descricao)}
                          </p>
                        )}

                        <div className="space-y-2 text-xs text-gray-500 border-t pt-4 mb-4">
                          {cert.dataEmissao && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>Emitido em: {new Date(cert.dataEmissao).toLocaleDateString('pt-BR')}</span>
                            </div>
                          )}
                          {cert.dataValidade && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>Válido até: {new Date(cert.dataValidade).toLocaleDateString('pt-BR')}</span>
                            </div>
                          )}
                        </div>

                        {(cert.certificado || cert.link) && (
                          <div className="pt-4 border-t">
                            <a
                              href={cert.link || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              Ver Certificado
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Conteúdo em desenvolvimento</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
