"use client"

import { motion } from "framer-motion"
import { Search, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { useConsultasData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"

export default function ConsultasPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useConsultasData()

  const title = getTranslatedField(pageData?.title, language, t("queries") || "Consultas")
  const description = getTranslatedField(pageData?.description, language, t("queriesDescription") || "Acesse o sistema de consultas para informações detalhadas")
  const linkSistema = pageData?.linkSistema || "https://prod.portoitapoa.com.br/apex/n4.zul"

  return (
    <div className="min-h-screen mt-44 py-16 px-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title mb-6">
            {title}
          </h1>
          <p className="section-subtitle max-w-4xl">
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
            <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Link para Sistema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-white">
              <Search className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-semibold mb-4">
                {t("accessQueries") || "Acesse o Sistema de Consultas"}
              </h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                {t("queriesDescription") || "Consulte informações detalhadas sobre suas operações e serviços"}
              </p>
              <Link href={linkSistema} target="_blank">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8">
                  {t("accessQueries") || "Acessar Consultas"}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Funcionalidades */}
        {pageData?.funcionalidades && pageData.funcionalidades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {t("features") || "Funcionalidades"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.funcionalidades.map((funcionalidade: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        {getTranslatedField(funcionalidade.titulo, language, funcionalidade.titulo)}
                      </h3>
                      {funcionalidade.descricao && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {getTranslatedField(funcionalidade.descricao, language, funcionalidade.descricao)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

