"use client"

import { motion } from "framer-motion"
import { FileText, TrendingUp, DollarSign, Calendar, Download, Eye } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n/context"

const demonstracoes = [
  {
    ano: "2024",
    trimestre: "Q4",
    tipo: "Demonstrações Financeiras Completas",
    documentos: [
      { nome: "Balanço Patrimonial", arquivo: "balanco-2024-q4.pdf", tamanho: "2.1 MB" },
      { nome: "Demonstração de Resultados", arquivo: "dre-2024-q4.pdf", tamanho: "1.8 MB" },
      { nome: "Fluxo de Caixa", arquivo: "fluxo-caixa-2024-q4.pdf", tamanho: "1.5 MB" },
      { nome: "Notas Explicativas", arquivo: "notas-2024-q4.pdf", tamanho: "3.2 MB" },
    ],
    status: "Auditado",
    color: "bg-green-500",
  },
  {
    ano: "2024",
    trimestre: "Q3",
    tipo: "Demonstrações Financeiras Trimestrais",
    documentos: [
      { nome: "Balanço Patrimonial", arquivo: "balanco-2024-q3.pdf", tamanho: "1.9 MB" },
      { nome: "Demonstração de Resultados", arquivo: "dre-2024-q3.pdf", tamanho: "1.6 MB" },
      { nome: "Fluxo de Caixa", arquivo: "fluxo-caixa-2024-q3.pdf", tamanho: "1.4 MB" },
    ],
    status: "Revisado",
    color: "bg-blue-500",
  },
  {
    ano: "2023",
    trimestre: "Anual",
    tipo: "Demonstrações Financeiras Anuais",
    documentos: [
      { nome: "Relatório Anual Completo", arquivo: "relatorio-anual-2023.pdf", tamanho: "5.8 MB" },
      { nome: "Balanço Patrimonial", arquivo: "balanco-2023.pdf", tamanho: "2.3 MB" },
      { nome: "Demonstração de Resultados", arquivo: "dre-2023.pdf", tamanho: "2.0 MB" },
      { nome: "Relatório dos Auditores", arquivo: "auditores-2023.pdf", tamanho: "1.2 MB" },
    ],
    status: "Auditado",
    color: "bg-emerald-500",
  },
]

const indicadoresFinanceiros = [
  {
    titulo: "Receita Operacional",
    valor: "R$ 450M",
    variacao: "+12%",
    periodo: "2024",
    icon: DollarSign,
    positive: true,
  },
  {
    titulo: "EBITDA",
    valor: "R$ 180M",
    variacao: "+15%",
    periodo: "2024",
    icon: TrendingUp,
    positive: true,
  },
  {
    titulo: "Margem EBITDA",
    valor: "40%",
    variacao: "+2p.p.",
    periodo: "2024",
    icon: TrendingUp,
    positive: true,
  },
  {
    titulo: "Investimentos",
    valor: "R$ 85M",
    variacao: "+25%",
    periodo: "2024",
    icon: TrendingUp,
    positive: true,
  },
]

export default function DemonstracoesFPage() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Demonstrações Financeiras</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Acesse nossas demonstrações financeiras auditadas, relatórios contábeis e informações sobre performance econômica.
          </p>
        </motion.div>

        {/* Indicadores Financeiros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Indicadores Principais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indicadoresFinanceiros.map((indicador, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <indicador.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-700 mb-2">{indicador.titulo}</h3>
                    <div className="text-2xl font-bold text-green-800 mb-1">{indicador.valor}</div>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className={`${indicador.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {indicador.variacao}
                      </Badge>
                      <span className="text-sm text-gray-500">{indicador.periodo}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demonstrações por Período */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Demonstrações por Período</h2>
          
          <div className="space-y-8">
            {demonstracoes.map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`p-3 ${demo.color} rounded-full mr-4`}>
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-green-800">
                            {demo.ano} - {demo.trimestre}
                          </h3>
                          <p className="text-gray-600">{demo.tipo}</p>
                        </div>
                      </div>
                      <Badge className={`${demo.color.replace('bg-', 'bg-').replace('-500', '-100')} ${demo.color.replace('bg-', 'text-')}`}>
                        {demo.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {demo.documentos.map((doc, docIndex) => (
                        <motion.div
                          key={docIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * docIndex }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-800">{doc.nome}</h4>
                              <p className="text-sm text-gray-500">PDF • {doc.tamanho}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
              <h2 className="text-3xl font-semibold mb-4">Transparência Financeira</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Mantemos nossos stakeholders informados com demonstrações financeiras auditadas e relatórios 
                detalhados sobre nossa performance econômica e investimentos em infraestrutura.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  <span>Relatórios Auditados</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span>Crescimento Consistente</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>Performance Sólida</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
