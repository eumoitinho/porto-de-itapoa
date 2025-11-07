"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Shield, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useI18n } from "@/lib/i18n/context"
import { useCarreirasData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"
import Link from "next/link"

export default function CarreirasPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useCarreirasData()
  const [consentChecked, setConsentChecked] = useState(false)
  const [pepChecked, setPepChecked] = useState(false)

  const title = getTranslatedField(pageData?.title, language, t('careers') || 'Carreiras')
  const description = getTranslatedField(pageData?.description, language, t('careersDescription') || 'O Porto Itapoá é movido por pessoas talentosas e comprometidas com a excelência.')

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

        {/* Compromisso com Proteção de Dados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-blue-50 border border-blue-200 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-semibold text-blue-800">
                  {getTranslatedField(pageData?.protecaoDados?.titulo, language, t('dataProtectionCommitment') || 'Compromisso com a proteção de dados')}
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                {pageData?.protecaoDados?.descricao && (
                  <PortableText 
                    content={pageData.protecaoDados.descricao}
                    className="leading-relaxed"
                  />
                )}

                {pageData?.protecaoDados?.usoDados && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {getTranslatedField(pageData.protecaoDados.usoDados.titulo, language, t('dataUsage') || 'Uso dos dados')}
                    </h3>
                    <p className="text-gray-700">
                      {getTranslatedField(pageData.protecaoDados.usoDados.descricao, language, 'Os dados fornecidos em nosso portal de vagas serão utilizados exclusivamente para os processos seletivos do Porto Itapoá. Durante o processo, seus dados poderão ser compartilhados com profissionais terceirizados (como consultorias de RH), cujo envolvimento seja estritamente necessário para a avaliação e seleção.')}
                    </p>
                  </div>
                )}

                {pageData?.protecaoDados?.retencaoDados && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {getTranslatedField(pageData.protecaoDados.retencaoDados.titulo, language, t('dataRetention') || 'Retenção dos dados')}
                    </h3>
                    <p className="text-gray-700">
                      {getTranslatedField(pageData.protecaoDados.retencaoDados.descricao, language, 'Seus dados serão mantidos em nosso sistema pelo prazo de 12 meses. Após este período, e cumpridos todos os prazos legais, serão inutilizados de forma segura e automática. Você poderá acessar e modificar seus dados pessoais em nosso portal de vagas a qualquer momento.')}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Termo de Consentimento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-green-50 border border-green-200 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-semibold text-green-800">
                  {getTranslatedField(pageData?.termoConsentimento?.titulo, language, t('consentTerm') || 'Termo de consentimento e declaração')}
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                {getTranslatedField(pageData?.termoConsentimento?.descricao, language, t('consentTermDescription') || 'Em atendimento ao que determina a Lei, é importante que os candidatos confirmem o registro de aceite para o tratamento dos dados, respeitando as finalidades descritas acima.')}
              </p>

              {pageData?.termoConsentimento?.declaracaoPEP && (
                <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">
                      {getTranslatedField(pageData.termoConsentimento.declaracaoPEP, language, 'Declaro estar ciente da obrigatoriedade de informar caso eu ocupe cargo público relevante no Brasil ou no exterior — como chefe de Estado, ministro, parlamentar, magistrado, alto executivo de estatal, entre outros — ou caso tenha familiares diretos ou representantes que exerçam tais funções, sendo, portanto, enquadrados como Pessoas Politicamente Expostas (PEPs).')}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-gray-700 leading-relaxed cursor-pointer">
                    {getTranslatedField(pageData?.termoConsentimento?.textoConsentimento, language, t('iAgreeToTerms') || 'Li e concordo com os termos de tratamento de dados e com a declaração acima.')}
                  </label>
                </div>

                {pageData?.termoConsentimento?.declaracaoPEP && (
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="pep"
                      checked={pepChecked}
                      onCheckedChange={(checked) => setPepChecked(checked === true)}
                      className="mt-1"
                    />
                    <label htmlFor="pep" className="text-gray-700 leading-relaxed cursor-pointer">
                      {getTranslatedField(pageData.termoConsentimento.declaracaoPEP, language, 'Declaro estar ciente da obrigatoriedade de informar caso eu ocupe cargo público relevante no Brasil ou no exterior — como chefe de Estado, ministro, parlamentar, magistrado, alto executivo de estatal, entre outros — ou caso tenha familiares diretos ou representantes que exerçam tais funções, sendo, portanto, enquadrados como Pessoas Politicamente Expostas (PEPs).')}
                    </label>
                  </div>
                )}
              </div>

              {pageData?.linkPortalVagas && (
                <div className="mt-8">
                  <Link href={pageData.linkPortalVagas} target="_blank">
                    <Button 
                      disabled={!consentChecked || (pageData.termoConsentimento?.declaracaoPEP && !pepChecked)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('accessJobPortal') || 'Acessar Portal de Vagas'}
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefícios */}
        {pageData?.beneficios && pageData.beneficios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
              {t('benefits') || 'Benefícios'}
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

