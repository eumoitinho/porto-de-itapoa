"use client"

import { motion } from "framer-motion"
import { Truck, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { useCadastroMotoristaData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"

export default function CadastroMotoristaPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useCadastroMotoristaData()

  const title = getTranslatedField(pageData?.title, language, t("driverRegistration"))
  const description = getTranslatedField(pageData?.description, language, t("driverRegistrationDescription") || "Cadastre-se como motorista para acessar nossos serviços")
  const linkSistema = pageData?.linkSistema || "https://api.portoitapoa.com/hub-frontend/public-cadastro-motoristas"

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

        {/* Embed direto do formulário de motoristas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full overflow-hidden" style={{ height: "2200px" }}>
                <iframe
                  src={linkSistema}
                  title="Cadastro de Motoristas - Porto Itapoá"
                  className="w-full h-full no-scrollbar"
                  scrolling="no"
                  allow="clipboard-write; fullscreen"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ overflow: "hidden", border: 0 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefícios */}
        {pageData?.beneficios && pageData.beneficios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {t("benefits") || "Benefícios"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.beneficios.map((beneficio: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        {getTranslatedField(beneficio.titulo, language, beneficio.titulo)}
                      </h3>
                      {beneficio.descricao && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {getTranslatedField(beneficio.descricao, language, beneficio.descricao)}
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

