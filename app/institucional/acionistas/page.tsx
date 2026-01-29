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
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-light text-green-800 mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Estrutura acionária do Porto Itapoá
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
          
            <div className="grid md:grid-cols-2 gap-8">
              {pageData.estruturaAcionaria?.acionistas?.map((acionista: any, index: number) => (
                <Card key={index} className="overflow-hidden border border-gray-200 bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      {acionista.logo ? (
                        <div className="relative w-20 h-20 bg-gray-50 p-2">
                          <Image
                            src={urlFor(acionista.logo).url()}
                            alt={acionista.nome}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
                          <Building className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{getTranslatedField(acionista.nome, language, acionista.nome)}</h3>
                        {acionista.tipo && (
                          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{acionista.tipo === 'controlador' ? 'Controlador' : 'Minoritário'}</span>
                        )}
                      </div>
                    </div>

                    {acionista.participacao && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Participação</span>
                          <span className="text-2xl font-bold text-green-700">{acionista.participacao}</span>
                        </div>
                        <div className="h-3 bg-gray-100 w-full">
                          <div
                            className={`h-full ${index === 0 ? 'bg-green-600' : 'bg-blue-800'}`}
                            style={{ width: acionista.participacao }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {acionista.descricao && (
                      <p className="text-gray-600 leading-relaxed text-sm">{getTranslatedField(acionista.descricao, language, acionista.descricao)}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
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
