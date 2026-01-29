"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon, Building2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useI18n } from "@/lib/i18n/context"
import { useContatoData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"
import Link from "next/link"

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  assunto: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
})

type FormData = z.infer<typeof formSchema>

export default function ContatoPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useContatoData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = getTranslatedField(pageData?.title, language, t('contactTitle') || 'Contato e Ouvidoria')
  const description = getTranslatedField(pageData?.description, language, t('contactDescription') || 'Seja para questões comerciais, administrativas ou para dialogar com a comunidade, o Porto Itapoá mantém canais de comunicação abertos e acessíveis.')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // TODO: Integrar com API real
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form data:", data)
    reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen mt-44 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl md:text-5xl font-light text-green-800 mb-4">
                {title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-700 max-w-4xl mx-auto">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Intro */}
        {pageData?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-white border-gray-200">
              <CardContent>
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Atendimento ao Cliente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HeadphonesIcon className="h-8 w-8 text-green-600" />
                <CardTitle className="text-3xl font-semibold text-green-800">
                  {getTranslatedField(pageData?.atendimentoCliente?.titulo, language, t('customerService') || 'Atendimento ao Cliente')}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-700 mt-2">
                {getTranslatedField(pageData?.atendimentoCliente?.descricao, language, t('customerServiceDescription') || 'Canais dedicados para clientes, despachantes e parceiros comerciais.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{t('telephone') || 'Telefone'}</p>
                    <a href={`tel:${pageData?.atendimentoCliente?.telefone || '+554734438700'}`} className="text-green-800 font-semibold hover:text-green-600">
                      {pageData?.atendimentoCliente?.telefone || '+55 (47) 3443-8700'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{t('email') || 'E-mail'}</p>
                    <a href={`mailto:${pageData?.atendimentoCliente?.email || 'atendimento@portoitapoa.com'}`} className="text-green-800 font-semibold hover:text-green-600">
                      {pageData?.atendimentoCliente?.email || 'atendimento@portoitapoa.com'}
                    </a>
                  </div>
                </div>

                {pageData?.atendimentoCliente?.chatOnline && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('onlineChat') || 'Chat Online'}</p>
                      <p className="text-green-800 font-semibold">
                        {getTranslatedField(pageData.atendimentoCliente.chatOnline, language, t('availableViaClientPortal') || 'Disponível via Portal do Cliente')}
                      </p>
                    </div>
                  </div>
                )}

                {pageData?.atendimentoCliente?.centralAjuda && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('helpCenter') || 'Central de Ajuda/FAQ'}</p>
                      <Link href={pageData.atendimentoCliente.centralAjuda} target="_blank" className="text-green-800 font-semibold hover:text-green-600">
                        {t('accessHelpCenter') || 'Acessar'}
                      </Link>
                    </div>
                  </div>
                )}

                {pageData?.atendimentoCliente?.horarios && (
                  <div className="flex items-start gap-4 md:col-span-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{t('serviceHours') || 'Horários de atendimento'}</p>
                      <p className="text-gray-800">
                        {getTranslatedField(pageData.atendimentoCliente.horarios, language, 'Chat, e-mail e telefone: Operação contínua de segunda a sexta (8h às 23h) e sábados (8h às 18h).')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ouvidoria Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-3xl font-semibold text-blue-800">
                  {getTranslatedField(pageData?.ouvidoriaSocial?.titulo, language, t('socialOmbudsman') || 'Ouvidoria Social')}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-700 mt-2">
                {getTranslatedField(pageData?.ouvidoriaSocial?.descricao, language, t('socialOmbudsmanDescription') || 'Um canal direto para a comunidade, motoristas, terceiros e público externo. Utilize este contato para registrar reclamações, sugestões ou tirar dúvidas gerais sobre as atividades do terminal.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">{t('freeCall') || 'Telefone (Ligação Gratuita)'}</p>
                  <a href={`tel:${pageData?.ouvidoriaSocial?.telefone || '08007674558'}`} className="text-blue-800 font-semibold text-xl hover:text-blue-600">
                    {pageData?.ouvidoriaSocial?.telefone || '0800-7674-558'}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    {getTranslatedField(pageData?.ouvidoriaSocial?.disponibilidade, language, t('available24h') || 'Atendimento 24 horas por dia, 7 dias por semana.')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sede Administrativa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-gray-600" />
                <CardTitle className="text-3xl font-semibold text-gray-800">
                  {getTranslatedField(pageData?.sedeAdministrativa?.titulo, language, t('administrativeHeadquarters') || 'Sede Administrativa')}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-700 mt-2">
                {getTranslatedField(pageData?.sedeAdministrativa?.descricao, language, t('administrativeHeadquartersDescription') || 'Para assuntos administrativos, fornecedores e correspondências.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{t('address') || 'Endereço'}</p>
                    <p className="text-gray-800">
                      {getTranslatedField(pageData?.sedeAdministrativa?.endereco, language, 'Itapoá Terminais Portuários S.A.\nAvenida Beira Mar 05, nº 2900, Figueira do Pontal | 89364-658 – Itapoá – SC')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{t('serviceHours') || 'Horário de atendimento'}</p>
                    <p className="text-gray-800">
                      {getTranslatedField(pageData?.sedeAdministrativa?.horario, language, 'Segunda a quinta, das 8h às 17h; Sexta, até as 16h.')}
                    </p>
                  </div>
                </div>

                {pageData?.sedeAdministrativa?.cnpj && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">CNPJ</p>
                      <p className="text-gray-800">{pageData.sedeAdministrativa.cnpj}</p>
                    </div>
                  </div>
                )}

                {pageData?.sedeAdministrativa?.inscricaoEstadual && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Inscrição Estadual/SC</p>
                      <p className="text-gray-800">{pageData.sedeAdministrativa.inscricaoEstadual}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Formulário de Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-800">
                {getTranslatedField(pageData?.formulario?.titulo, language, t('contactUs') || 'Fale conosco')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {getTranslatedField(pageData?.formulario?.descricao, language, t('contactFormDescription') || 'Para outras informações, preencha o formulário abaixo. Teremos prazer em atendê-lo.')}
              </CardDescription>
            </CardHeader>
            <CardContent>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                      placeholder={t('yourName') || 'Seu nome'}
                        {...register("nome")}
                        className="rounded-full border-gray-200 focus:border-green-500"
                      />
                      {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                    </div>

                    <div>
                      <Input
                        type="email"
                      placeholder={t('yourEmail') || 'Seu e-mail'}
                        {...register("email")}
                        className="rounded-full border-gray-200 focus:border-green-500"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                    placeholder={t('subject') || 'Assunto'}
                      {...register("assunto")}
                      className="rounded-full border-gray-200 focus:border-green-500"
                    />
                    {errors.assunto && <p className="text-red-500 text-sm mt-1">{errors.assunto.message}</p>}
                  </div>

                  <div>
                    <Textarea
                    placeholder={t('yourMessage') || 'Sua mensagem'}
                      rows={6}
                      {...register("mensagem")}
                      className="rounded-2xl border-gray-200 focus:border-green-500 resize-none"
                    />
                    {errors.mensagem && <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    {isSubmitting ? (
                    t('sending') || 'Enviando...'
                    ) : (
                      <>
                      {t('sendMessageButton') || 'Enviar Mensagem'}
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
      </div>
    </div>
  )
}
