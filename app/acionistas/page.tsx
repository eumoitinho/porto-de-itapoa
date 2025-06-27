"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, FileText, Calendar, DollarSign, Building } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"

const estruturaAcionaria = [
  {
    nome: "Grupo Battistella",
    participacao: "Controlador",
    descricao: "Grupo empresarial com tradição no setor logístico e portuário",
    icon: Building,
    color: "bg-green-600",
  },
  {
    nome: "Investidores Estratégicos",
    participacao: "Minoritários",
    descricao: "Parceiros estratégicos do setor de infraestrutura",
    icon: Users,
    color: "bg-blue-600",
  },
]

const indicadores = [
  {
    titulo: "Crescimento da Receita Municipal",
    periodo: "2010-2021",
    valor: "570%",
    descricao: "De R$35 milhões para aproximadamente R$200 milhões",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
  {
    titulo: "Arrecadação de ISS",
    periodo: "2010-2021",
    valor: "9.000%",
    descricao: "De R$210 mil para aproximadamente R$20 milhões por ano",
    icon: DollarSign,
    color: "bg-green-500",
  },
]

const documentos = [
  { nome: "Relatório Anual 2024", tipo: "PDF", tamanho: "2.5 MB" },
  { nome: "Demonstrações Financeiras Q4 2024", tipo: "PDF", tamanho: "1.8 MB" },
  { nome: "Ata da Última Assembleia", tipo: "PDF", tamanho: "850 KB" },
  { nome: "Política de Dividendos", tipo: "PDF", tamanho: "1.2 MB" },
]

export default function AcionistasPage() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Acionistas</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Informações relevantes para nossos acionistas, incluindo relatórios financeiros, assembleias e comunicados oficiais.
          </p>
        </motion.div>

        {/* Estrutura Acionária */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Estrutura Acionária</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {estruturaAcionaria.map((acionista, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`p-3 ${acionista.color} rounded-full mr-4`}>
                        <acionista.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800">{acionista.nome}</h3>
                        <Badge className="bg-green-100 text-green-800 mt-1">{acionista.participacao}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{acionista.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Indicadores Financeiros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Indicadores de Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {indicadores.map((indicador, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 ${indicador.color} rounded-full flex items-center justify-center`}>
                      <indicador.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">{indicador.titulo}</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">{indicador.valor}</div>
                    <Badge className="bg-gray-100 text-gray-700 mb-4">{indicador.periodo}</Badge>
                    <p className="text-gray-600">{indicador.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Documentos para Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Documentos para Acionistas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentos.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-800">{doc.nome}</h4>
                        <p className="text-sm text-gray-500">{doc.tipo} • {doc.tamanho}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Download</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-3xl font-semibold mb-4">Transparência e Crescimento</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Nosso compromisso com a transparência e o crescimento sustentável reflete-se nos resultados consistentes 
                e no valor gerado para nossos acionistas ao longo dos anos.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>14+ anos de operação</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span>Crescimento consistente</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>Valor para acionistas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
