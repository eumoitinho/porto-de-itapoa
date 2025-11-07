"use client"

import { motion } from "framer-motion"
import { ShoppingCart, CheckCircle2, FileText, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePortalComprasData } from "@/hooks/useSanityData"
import { PortableText } from "@/components/portable-text"
import Link from "next/link"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"

export default function PortalComprasPage() {
  const { data: pageData } = usePortalComprasData()
  const { language } = useI18n()

  const title = getTranslatedField(pageData?.title, language, 'Portal de Compras')
  const description = getTranslatedField(pageData?.description, language, 'Participe de cotações e forneça produtos e serviços ao Porto')

  return (
    <div className="min-h-screen bg-white text-gray-900 mt-44 py-16 px-8">
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

        {/* Intro */}
        {pageData?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Benefícios */}
        {pageData?.beneficios && pageData.beneficios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              Benefícios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.beneficios.map((beneficio: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            {getTranslatedField(beneficio.titulo, language, beneficio.titulo)}
                          </h3>
                          {beneficio.descricao && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {getTranslatedField(beneficio.descricao, language, beneficio.descricao)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Como Participar */}
        {pageData?.comoParticipar && pageData.comoParticipar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              Como Participar
            </h2>
            <div className="space-y-6">
              {pageData.comoParticipar.map((passo: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                          {passo.passo || index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            {getTranslatedField(passo.titulo, language, passo.titulo)}
                          </h3>
                          {passo.descricao && (
                            <p className="text-gray-600 leading-relaxed">
                              {getTranslatedField(passo.descricao, language, passo.descricao)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Link para Sistema */}
        {pageData?.linkSistema && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8 text-white">
                <ShoppingCart className="h-16 w-16 mx-auto mb-6" />
                <h2 className="text-3xl font-semibold mb-4">
                  Acesse o Portal de Compras
                </h2>
                <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                  Participe de cotações e forneça produtos e serviços ao Porto Itapoá.
                </p>
                <Link href={pageData.linkSistema} target="_blank">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8">
                    Acessar Portal
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Contato */}
        {pageData?.contato && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="backdrop-blur-md bg-blue-50 border border-blue-200 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
                  Entre em Contato
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {pageData.contato.email && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">E-mail</p>
                        <a 
                          href={`mailto:${pageData.contato.email}`}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          {pageData.contato.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {pageData.contato.telefone && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Telefone</p>
                        <a 
                          href={`tel:${pageData.contato.telefone}`}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          {pageData.contato.telefone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Fallback quando não há dados */}
        {!pageData && (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Conteúdo em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  )
}

