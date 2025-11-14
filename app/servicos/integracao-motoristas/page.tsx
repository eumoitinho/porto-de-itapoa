"use client"

import { motion } from "framer-motion"
import { Truck, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { useIntegracaoMotoristasData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"

export default function IntegracaoMotoristasPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useIntegracaoMotoristasData()

  // Garantir que title e description sejam strings
  const title = typeof getTranslatedField(pageData?.title, language, t("driverIntegration") || "Integração de Motoristas") === 'string' 
    ? getTranslatedField(pageData?.title, language, t("driverIntegration") || "Integração de Motoristas") 
    : (t("driverIntegration") || "Integração de Motoristas")
  
  const description = typeof getTranslatedField(pageData?.description, language, t("driverIntegrationDescription") || "Integre-se como motorista para acessar nossos serviços") === 'string'
    ? getTranslatedField(pageData?.description, language, t("driverIntegrationDescription") || "Integre-se como motorista para acessar nossos serviços")
    : (t("driverIntegrationDescription") || "Integre-se como motorista para acessar nossos serviços")
  
  const linkSistema = pageData?.linkSistema || "https://forms.office.com/Pages/ResponsePage.aspx?id=QwqdHgbzNk2eLbcz8M_rfpsnsK8kh9lAs1EGfbjDLbFUMTJEMFJBSUlWWFRSRDhJRDVUU0hNT0EzWS4u"
  
  // URL do embed do formulário
  const formEmbedUrl = linkSistema.includes('?') 
    ? `${linkSistema}&embed=true` 
    : `${linkSistema}?embed=true`

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

        {/* Formulário Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Truck className="h-8 w-8" />
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    {t("accessIntegration") || "Acesse a Integração"}
                  </h2>
                </div>
                <p className="text-green-100 text-center max-w-3xl mx-auto">
                  {t("driverIntegrationDescription") || "Preencha o formulário abaixo para integrar-se como motorista"}
                </p>
              </div>
              <div className="w-full" style={{ minHeight: '800px' }}>
                <iframe
                  src={formEmbedUrl}
                  width="100%"
                  height="800"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  style={{ 
                    border: 'none',
                    display: 'block',
                    width: '100%',
                    minHeight: '800px'
                  }}
                  title={t("driverIntegration") || "Integração de Motoristas"}
                >
                  Carregando…
                </iframe>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {t("formNotLoading") || "O formulário não está carregando?"}
                </p>
                <Link href={linkSistema} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                    {t("openInNewTab") || "Abrir em nova aba"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
                        {typeof getTranslatedField(beneficio.titulo, language) === 'string' 
                          ? getTranslatedField(beneficio.titulo, language) 
                          : String(beneficio.titulo || '')}
                      </h3>
                      {beneficio.descricao && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {typeof getTranslatedField(beneficio.descricao, language) === 'string'
                            ? getTranslatedField(beneficio.descricao, language)
                            : String(beneficio.descricao || '')}
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

