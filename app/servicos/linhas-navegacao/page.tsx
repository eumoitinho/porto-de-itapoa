"use client"

import { motion } from "framer-motion"
import { Ship, Globe2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"
import { useLinhasNavegacaoData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"

// Logos dos armadores (serão carregados do Sanity ou assets)
const armadores = [
  { nome: "Aliança", logo: "/logos/alianca.png" },
  { nome: "CMA CGM", logo: "/logos/cma-cgm.png" },
  { nome: "Cosco Shipping", logo: "/logos/cosco.png" },
  { nome: "OOCL", logo: "/logos/oocl.png" },
  { nome: "Evergreen", logo: "/logos/evergreen.png" },
  { nome: "Hamburg Süd", logo: "/logos/hamburg-sud.png" },
  { nome: "Hapag-Lloyd", logo: "/logos/hapag-lloyd.png" },
  { nome: "HMM", logo: "/logos/hmm.png" },
  { nome: "Login", logo: "/logos/login.png" },
  { nome: "Maersk", logo: "/logos/maersk.png" },
  { nome: "MSC", logo: "/logos/msc.png" },
  { nome: "Mercosul Line", logo: "/logos/mercosul.png" },
  { nome: "PIL", logo: "/logos/pil.png" },
  { nome: "One (Ocean Network Express)", logo: "/logos/one.png" },
  { nome: "ZIM", logo: "/logos/zim.png" },
]

export default function LinhasNavegacaoPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useLinhasNavegacaoData()

  const title = getTranslatedField(pageData?.title, language, t("navigationLines") || "Linhas de Navegação")
  const description = getTranslatedField(pageData?.description, language, t("navigationLinesDescription") || "Porto Itapoá possui acordos comerciais com os principais armadores que operam em todo o mundo")

  // Usar armadores do Sanity se disponível, senão usar os hardcoded
  const armadoresList = pageData?.armadores && pageData.armadores.length > 0 
    ? pageData.armadores 
    : armadores.map(a => ({ nome: a.nome, logo: a.logo }))

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

        {/* Grid de Armadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {armadoresList.map((armador: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl h-full hover:shadow-2xl transition-all hover:scale-105">
                  <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                    {armador.logo ? (
                      <div className="relative w-full h-24 mb-4">
                        <Image
                          src={armador.logo}
                          alt={armador.nome}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
                        <Ship className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <h3 className="text-sm font-semibold text-gray-800 text-center">
                      {armador.nome}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Informações Adicionais */}
        {pageData?.informacoesAdicionais && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="backdrop-blur-md bg-green-50 border border-green-200 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe2 className="h-8 w-8 text-green-600" />
                  <h2 className="text-2xl font-semibold text-green-800">
                    {t("additionalInformation") || "Informações Adicionais"}
                  </h2>
                </div>
                <PortableText 
                  content={pageData.informacoesAdicionais}
                  className="text-gray-700 leading-relaxed"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

