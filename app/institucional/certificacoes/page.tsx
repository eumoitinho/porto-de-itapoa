"use client"

import { motion } from "framer-motion"
import { Award, FileText, Calendar, CheckCircle2, Building } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
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

export default function CertificacoesPage() {
  const { data: pageData } = useCertificacoesData()
  const { language } = useI18n()

  const certificacoes = pageData?.certificacoes || []
  const title = getTranslatedField(pageData?.title, language, 'Certificações')
  const description = getTranslatedField(pageData?.description, language, 'Certificações e credenciamentos')

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
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 flex items-center justify-center">
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-light text-green-800 mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Certificações */}
        {certificacoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificacoes.map((cert: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full overflow-hidden">
                  <CardContent className="p-0">
                    {cert.logo && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={urlFor(cert.logo).url()}
                          alt={cert.nome}
                          fill
                          className="object-contain p-6"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            {getTranslatedField(cert.nome, language, cert.nome)}
                          </h3>
                          {cert.codigo && (
                            <Badge variant="outline" className="mb-2">
                              {cert.codigo}
                            </Badge>
                          )}
                          {cert.categoria && (
                            <Badge className="bg-green-100 text-green-800">
                              {categoriaLabels[cert.categoria] || cert.categoria}
                            </Badge>
                          )}
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                      </div>

                      {cert.orgao && (
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                          <Building className="h-4 w-4" />
                          <span>{getTranslatedField(cert.orgao, language, cert.orgao)}</span>
                        </div>
                      )}

                      {cert.descricao && (
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {getTranslatedField(cert.descricao, language, cert.descricao)}
                        </p>
                      )}

                      <div className="space-y-2 text-xs text-gray-500 border-t pt-4">
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
                        <div className="mt-4 pt-4 border-t">
                          <a
                            href={cert.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            <FileText className="h-4 w-4" />
                            Ver Certificado
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Conteúdo em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  )
}
