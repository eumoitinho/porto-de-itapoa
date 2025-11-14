"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Shield, CheckCircle2, ExternalLink, AlertCircle, Users, Award, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
              <Briefcase className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Oportunidades de Carreira</span>
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

      {/* Intro Section */}
      {pageData?.intro && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <PortableText 
                    content={pageData.intro}
                    className="text-gray-600 leading-relaxed text-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Compromisso com Proteção de Dados Section */}
      <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-2 border-green-200 shadow-md rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-900">
                      {getTranslatedField(pageData?.protecaoDados?.titulo, language, t('dataProtectionCommitment') || 'Compromisso com a proteção de dados')}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-gray-700">
                  {pageData?.protecaoDados?.descricao && (
                    <PortableText 
                      content={pageData.protecaoDados.descricao}
                      className="leading-relaxed text-base"
                    />
                  )}

                  {pageData?.protecaoDados?.usoDados && (
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                        {getTranslatedField(pageData.protecaoDados.usoDados.titulo, language, t('dataUsage') || 'Uso dos dados')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getTranslatedField(pageData.protecaoDados.usoDados.descricao, language, 'Os dados fornecidos em nosso portal de vagas serão utilizados exclusivamente para os processos seletivos do Porto Itapoá. Durante o processo, seus dados poderão ser compartilhados com profissionais terceirizados (como consultorias de RH), cujo envolvimento seja estritamente necessário para a avaliação e seleção.')}
                      </p>
                    </div>
                  )}

                  {pageData?.protecaoDados?.retencaoDados && (
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                        {getTranslatedField(pageData.protecaoDados.retencaoDados.titulo, language, t('dataRetention') || 'Retenção dos dados')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getTranslatedField(pageData.protecaoDados.retencaoDados.descricao, language, 'Seus dados serão mantidos em nosso sistema pelo prazo de 12 meses. Após este período, e cumpridos todos os prazos legais, serão inutilizados de forma segura e automática. Você poderá acessar e modificar seus dados pessoais em nosso portal de vagas a qualquer momento.')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Termo de Consentimento Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-green-800">
                      {getTranslatedField(pageData?.termoConsentimento?.titulo, language, t('consentTerm') || 'Termo de consentimento e declaração')}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  {getTranslatedField(pageData?.termoConsentimento?.descricao, language, t('consentTermDescription') || 'Em atendimento ao que determina a Lei, é importante que os candidatos confirmem o registro de aceite para o tratamento dos dados, respeitando as finalidades descritas acima.')}
                </p>

                {pageData?.termoConsentimento?.declaracaoPEP && (
                  <div className="bg-white rounded-xl p-6 mb-8 border-2 border-amber-200 shadow-sm">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 leading-relaxed">
                        {getTranslatedField(pageData.termoConsentimento.declaracaoPEP, language, 'Declaro estar ciente da obrigatoriedade de informar caso eu ocupe cargo público relevante no Brasil ou no exterior — como chefe de Estado, ministro, parlamentar, magistrado, alto executivo de estatal, entre outros — ou caso tenha familiares diretos ou representantes que exerçam tais funções, sendo, portanto, enquadrados como Pessoas Politicamente Expostas (PEPs).')}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200">
                    <Checkbox
                      id="consent"
                      checked={consentChecked}
                      onCheckedChange={(checked) => setConsentChecked(checked === true)}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                      {getTranslatedField(pageData?.termoConsentimento?.textoConsentimento, language, t('iAgreeToTerms') || 'Li e concordo com os termos de tratamento de dados e com a declaração acima.')}
                    </label>
                  </div>

                  {pageData?.termoConsentimento?.declaracaoPEP && (
                    <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200">
                      <Checkbox
                        id="pep"
                        checked={pepChecked}
                        onCheckedChange={(checked) => setPepChecked(checked === true)}
                        className="mt-1"
                      />
                      <label htmlFor="pep" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                        {getTranslatedField(pageData.termoConsentimento.declaracaoPEP, language, 'Declaro estar ciente da obrigatoriedade de informar caso eu ocupe cargo público relevante no Brasil ou no exterior — como chefe de Estado, ministro, parlamentar, magistrado, alto executivo de estatal, entre outros — ou caso tenha familiares diretos ou representantes que exerçam tais funções, sendo, portanto, enquadrados como Pessoas Politicamente Expostas (PEPs).')}
                      </label>
                    </div>
                  )}
                </div>

                {pageData?.linkPortalVagas && (
                  <div className="mt-8">
                    <Link href={pageData.linkPortalVagas} target="_blank">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          disabled={!consentChecked || (pageData.termoConsentimento?.declaracaoPEP && !pepChecked)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('accessJobPortal') || 'Acessar Portal de Vagas'}
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefícios Section */}
      {pageData?.beneficios && pageData.beneficios.length > 0 && (
        <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                {t('benefits') || 'Benefícios'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça os benefícios oferecidos aos colaboradores do Porto Itapoá
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.beneficios.map((beneficio: any, index: number) => {
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
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={`${style.card} h-full transition-all duration-300 hover:shadow-xl`}>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${style.icon}`}>
                            <Award className="h-7 w-7" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {getTranslatedField(beneficio.titulo, language, beneficio.titulo)}
                          </h3>
                        </div>
                        {beneficio.descricao && (
                          <p className="text-gray-600 leading-relaxed">
                            {getTranslatedField(beneficio.descricao, language, beneficio.descricao)}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
