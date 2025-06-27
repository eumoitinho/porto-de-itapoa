"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, Lock, Phone, Mail, FileText } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"

const canaisContato = [
  {
    titulo: "Canal Online",
    descricao: "Formulário seguro e anônimo disponível 24/7",
    icon: Shield,
    color: "bg-green-500",
    disponibilidade: "24/7",
  },
  {
    titulo: "Telefone",
    descricao: "Linha direta para denúncias confidenciais",
    icon: Phone,
    color: "bg-blue-500",
    contato: "0800-123-4567",
  },
  {
    titulo: "E-mail",
    descricao: "Canal de comunicação seguro e criptografado",
    icon: Mail,
    color: "bg-purple-500",
    contato: "etica@portoitapoa.com",
  },
]

const tiposDenuncia = [
  "Corrupção e Suborno",
  "Fraude Financeira",
  "Assédio Moral ou Sexual",
  "Discriminação",
  "Conflito de Interesses",
  "Violação de Segurança",
  "Questões Ambientais",
  "Outros",
]

const garantias = [
  {
    titulo: "Confidencialidade",
    descricao: "Sua identidade será protegida durante todo o processo",
    icon: Lock,
  },
  {
    titulo: "Não Retaliação",
    descricao: "Proteção contra qualquer forma de represália",
    icon: Shield,
  },
  {
    titulo: "Investigação Imparcial",
    descricao: "Todas as denúncias são investigadas de forma independente",
    icon: FileText,
  },
]

export default function DenunciasPage() {
  const { t } = useI18n()

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
          <h1 className="text-5xl font-light text-green-800 mb-6">Canal de Denúncias</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Canal seguro e confidencial para reportar irregularidades, garantindo a ética e transparência em nossas operações.
          </p>
        </motion.div>

        {/* Canais de Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Canais Disponíveis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {canaisContato.map((canal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 ${canal.color} rounded-full flex items-center justify-center`}>
                      <canal.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-4">{canal.titulo}</h3>
                    <p className="text-gray-600 mb-4">{canal.descricao}</p>
                    {canal.disponibilidade && (
                      <Badge className="bg-green-100 text-green-800">{canal.disponibilidade}</Badge>
                    )}
                    {canal.contato && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <span className="font-mono text-sm text-gray-700">{canal.contato}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Formulário de Denúncia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Formulário de Denúncia</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Denúncia
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="">Selecione o tipo</option>
                      {tiposDenuncia.map((tipo, index) => (
                        <option key={index} value={tipo}>{tipo}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome (Opcional)
                    </label>
                    <Input placeholder="Seu nome (pode ser deixado em branco)" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail (Opcional)
                    </label>
                    <Input type="email" placeholder="Seu e-mail para retorno (opcional)" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone (Opcional)
                    </label>
                    <Input placeholder="Seu telefone (opcional)" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição da Denúncia *
                    </label>
                    <Textarea 
                      placeholder="Descreva detalhadamente a situação que deseja reportar..."
                      className="min-h-[200px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evidências (Opcional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Clique para anexar arquivos ou arraste aqui</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                  Enviar Denúncia
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  * Campos obrigatórios. Sua denúncia será tratada com total confidencialidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Garantias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Nossas Garantias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {garantias.map((garantia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <garantia.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">{garantia.titulo}</h3>
                    <p className="text-gray-600 text-sm">{garantia.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-3xl font-semibold mb-4">Compromisso com a Ética</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Nosso canal de denúncias é parte fundamental do nosso compromisso com a ética, transparência e 
                integridade em todas as nossas operações. Sua contribuição é essencial para mantermos os mais 
                altos padrões de conduta.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>100% Confidencial</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  <span>Proteção Garantida</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>Investigação Imparcial</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
