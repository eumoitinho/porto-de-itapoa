"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  empresa: z.string().min(2, "Nome da empresa é obrigatório"),
  assunto: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
})

type FormData = z.infer<typeof formSchema>

export default function ContatoPage() {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contatos = [
    {
      icon: MapPin,
      titulo: t('address'),
      info: "Rod. SC-415, Km 5 - Itapoá/SC",
      detalhe: "CEP: 89248-000",
    },
    {
      icon: Phone,
      titulo: t('telephone'),
      info: "+55 (47) 3441-8000",
      detalhe: "Atendimento 24h",
    },
    {
      icon: Mail,
      titulo: t('email'),
      info: "contato@portoitapoa.com.br",
      detalhe: "Resposta em até 24h",
    },
    {
      icon: Clock,
      titulo: t('schedule'),
      info: "24 horas por dia",
      detalhe: "7 dias por semana",
    },
  ]

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
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form data:", data)
    reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light text-green-800 mb-6">{t('contactTitle')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contactDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="backdrop-blur-md bg-white/60 border border-white/20 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-green-800 mb-6">{t('sendMessage')}</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder={t('yourName')}
                        {...register("nome")}
                        className="rounded-full border-gray-200 focus:border-green-500"
                      />
                      {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder={t('yourEmail')}
                        {...register("email")}
                        className="rounded-full border-gray-200 focus:border-green-500"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                      placeholder={t('companyName')}
                      {...register("empresa")}
                      className="rounded-full border-gray-200 focus:border-green-500"
                    />
                    {errors.empresa && <p className="text-red-500 text-sm mt-1">{errors.empresa.message}</p>}
                  </div>

                  <div>
                    <Input
                      placeholder={t('subject')}
                      {...register("assunto")}
                      className="rounded-full border-gray-200 focus:border-green-500"
                    />
                    {errors.assunto && <p className="text-red-500 text-sm mt-1">{errors.assunto.message}</p>}
                  </div>

                  <div>
                    <Textarea
                      placeholder={t('yourMessage')}
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
                      t('sending')
                    ) : (
                      <>
                        {t('sendMessageButton')}
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contatos.map((contato, index) => (
                <motion.div
                  key={contato.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <contato.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">{contato.titulo}</h3>
                      <p className="text-gray-700 font-medium mb-1">{contato.info}</p>
                      <p className="text-sm text-gray-500">{contato.detalhe}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <Card className="backdrop-blur-md bg-white/60 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/foto-porto-patio-1024x721.webp"
                    alt="Localização do Porto Itapoá"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="backdrop-blur-md bg-white/90 rounded-xl p-4">
                      <h3 className="font-semibold text-green-800 mb-1">Porto Itapoá</h3>
                      <p className="text-sm text-gray-600">Localização estratégica no litoral de Santa Catarina</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}