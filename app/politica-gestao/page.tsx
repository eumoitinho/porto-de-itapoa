"use client"

import { motion } from "framer-motion"
import { Shield, Leaf, Target, CheckCircle, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"

const pilares = [
  {
    titulo: "Qualidade",
    descricao: "Excelência em todos os processos e serviços oferecidos",
    icon: Award,
    color: "bg-blue-500",
    certificacao: "ISO 9001:2015",
    indicadores: [
      { nome: "Satisfação do Cliente", valor: 95, meta: 90 },
      { nome: "Conformidade de Processos", valor: 98, meta: 95 },
    ],
  },
  {
    titulo: "Meio Ambiente",
    descricao: "Proteção ambiental e desenvolvimento sustentável",
    icon: Leaf,
    color: "bg-green-500",
    certificacao: "ISO 14001:2015",
    indicadores: [
      { nome: "Redução de Emissões", valor: 85, meta: 80 },
      { nome: "Gestão de Resíduos", valor: 92, meta: 90 },
    ],
  },
  {
    titulo: "Saúde e Segurança",
    descricao: "Proteção da saúde e segurança de todos os colaboradores",
    icon: Shield,
    color: "bg-red-500",
    certificacao: "OHSAS 18001",
    indicadores: [
      { nome: "Taxa de Acidentes", valor: 98, meta: 95 },
      { nome: "Treinamentos de Segurança", valor: 100, meta: 100 },
    ],
  },
]

const processos = [
  {
    categoria: "Planejamento Estratégico",
    itens: [
      "Definição de objetivos e metas",
      "Análise de riscos e oportunidades",
      "Planejamento de recursos",
      "Cronograma de implementação",
    ],
  },
  {
    categoria: "Implementação",
    itens: ["Treinamento de equipes", "Execução de procedimentos", "Monitoramento contínuo", "Comunicação interna"],
  },
  {
    categoria: "Verificação",
    itens: ["Auditorias internas", "Medição de indicadores", "Análise de não conformidades", "Avaliação de eficácia"],
  },
  {
    categoria: "Melhoria",
    itens: ["Ações corretivas", "Ações preventivas", "Revisão de processos", "Inovação contínua"],
  },
]

const objetivos = [
  {
    area: "Qualidade",
    objetivo: "Manter 95% de satisfação dos clientes",
    status: "Atingido",
    progresso: 95,
  },
  {
    area: "Meio Ambiente",
    objetivo: "Reduzir 20% das emissões de CO2",
    status: "Em andamento",
    progresso: 75,
  },
  {
    area: "Segurança",
    objetivo: "Zero acidentes com afastamento",
    status: "Atingido",
    progresso: 100,
  },
  {
    area: "Eficiência",
    objetivo: "Aumentar 15% a produtividade",
    status: "Superado",
    progresso: 118,
  },
]

export default function PoliticaGestaoPage() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Política de Gestão Integrada</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Nossa política de gestão integrada abrangendo qualidade, meio ambiente, saúde e segurança ocupacional.
          </p>
        </motion.div>

        {/* Pilares da Gestão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Pilares da Gestão Integrada</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pilares.map((pilar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 ${pilar.color} rounded-full flex items-center justify-center`}
                      >
                        <pilar.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">{pilar.titulo}</h3>
                      <p className="text-gray-600 mb-4">{pilar.descricao}</p>
                      <Badge className="bg-green-100 text-green-800">{pilar.certificacao}</Badge>
                    </div>

                    <div className="space-y-4">
                      {pilar.indicadores.map((indicador, iIndex) => (
                        <div key={iIndex}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">{indicador.nome}</span>
                            <span className="text-sm text-green-600">{indicador.valor}%</span>
                          </div>
                          <Progress value={indicador.valor} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">Meta: {indicador.meta}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ciclo PDCA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Ciclo de Melhoria Contínua (PDCA)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processos.map((processo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-lg">{index + 1}</span>
                      </div>
                      <h3 className="font-semibold text-green-800">{processo.categoria}</h3>
                    </div>

                    <div className="space-y-2">
                      {processo.itens.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Objetivos e Metas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Objetivos e Metas 2025</h2>

          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {objetivos.map((objetivo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="mr-3">
                          {objetivo.area}
                        </Badge>
                        <h4 className="font-medium text-gray-800">{objetivo.objetivo}</h4>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress value={objetivo.progresso} className="flex-1 max-w-xs" />
                        <span className="text-sm font-medium text-green-600">{objetivo.progresso}%</span>
                        <Badge
                          className={`${
                            objetivo.status === "Atingido"
                              ? "bg-green-100 text-green-800"
                              : objetivo.status === "Superado"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {objetivo.status}
                        </Badge>
                      </div>
                    </div>
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
              <h2 className="text-3xl font-semibold mb-4">Compromisso com a Excelência</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Nossa Política de Gestão Integrada reflete nosso compromisso com a excelência operacional,
                sustentabilidade ambiental e bem-estar de nossos colaboradores. Trabalhamos continuamente para superar
                expectativas e criar valor para todos os stakeholders.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <span>ISO 9001</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  <span>ISO 14001</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>OHSAS 18001</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  <span>Melhoria Contínua</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
