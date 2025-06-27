"use client"

import { motion } from "framer-motion"
import { Globe, Target, Users, Leaf, Shield, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"

const principiosPacto = [
  {
    categoria: "Direitos Humanos",
    principios: [
      "Apoiar e respeitar a proteção de direitos humanos reconhecidos internacionalmente",
      "Assegurar-se de sua não-participação em violações destes direitos",
    ],
    icon: Users,
    color: "bg-blue-500",
    progresso: 95,
  },
  {
    categoria: "Trabalho",
    principios: [
      "Apoiar a liberdade de associação e o reconhecimento do direito à negociação coletiva",
      "Apoiar a eliminação de todas as formas de trabalho forçado ou compulsório",
      "Apoiar a erradicação efetiva do trabalho infantil",
      "Apoiar a eliminação da discriminação no emprego",
    ],
    icon: Shield,
    color: "bg-green-500",
    progresso: 98,
  },
  {
    categoria: "Meio Ambiente",
    principios: [
      "Apoiar uma abordagem preventiva aos desafios ambientais",
      "Desenvolver iniciativas para promover maior responsabilidade ambiental",
      "Incentivar o desenvolvimento e difusão de tecnologias ambientalmente amigáveis",
    ],
    icon: Leaf,
    color: "bg-emerald-500",
    progresso: 92,
  },
  {
    categoria: "Anticorrupção",
    principios: ["Combater a corrupção em todas as suas formas, incluindo extorsão e propina"],
    icon: Target,
    color: "bg-purple-500",
    progresso: 100,
  },
]

const iniciativas2021 = [
  {
    titulo: "Programa de Capacitação em Direitos Humanos",
    descricao: "Treinamento para 100% dos colaboradores sobre direitos humanos e diversidade",
    meta: "1000 colaboradores",
    realizado: "1000 colaboradores",
    status: "Concluído",
  },
  {
    titulo: "Certificação Ambiental ISO 14001",
    descricao: "Manutenção e aprimoramento do sistema de gestão ambiental",
    meta: "Certificação renovada",
    realizado: "Certificação renovada",
    status: "Concluído",
  },
  {
    titulo: "Canal de Denúncias Ético",
    descricao: "Implementação de canal confidencial para denúncias de irregularidades",
    meta: "Canal operacional",
    realizado: "Canal operacional",
    status: "Concluído",
  },
  {
    titulo: "Programa Itapoá Sempre Verde",
    descricao: "Iniciativas de reflorestamento e conservação da biodiversidade local",
    meta: "5000 mudas plantadas",
    realizado: "6200 mudas plantadas",
    status: "Superado",
  },
]

const ods = [
  { numero: 3, nome: "Saúde e Bem-estar", cor: "bg-green-600" },
  { numero: 4, nome: "Educação de Qualidade", cor: "bg-red-600" },
  { numero: 5, nome: "Igualdade de Gênero", cor: "bg-orange-600" },
  { numero: 8, nome: "Trabalho Decente e Crescimento Econômico", cor: "bg-purple-600" },
  { numero: 9, nome: "Indústria, Inovação e Infraestrutura", cor: "bg-orange-500" },
  { numero: 11, nome: "Cidades e Comunidades Sustentáveis", cor: "bg-yellow-600" },
  { numero: 13, nome: "Ação contra a Mudança Global do Clima", cor: "bg-green-700" },
  { numero: 14, nome: "Vida na Água", cor: "bg-blue-600" },
  { numero: 15, nome: "Vida Terrestre", cor: "bg-green-800" },
]

export default function PactoGlobalPage() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Pacto Global 2021</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Nosso compromisso com os princípios do Pacto Global da ONU e as iniciativas de sustentabilidade
            implementadas.
          </p>
        </motion.div>

        {/* Sobre o Pacto Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-green-800">Nosso Compromisso</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                O Porto Itapoá aderiu ao Pacto Global da ONU em 2021, comprometendo-se a implementar os dez princípios
                universais nas áreas de direitos humanos, trabalho, meio ambiente e anticorrupção. Esta adesão reforça
                nosso compromisso com o desenvolvimento sustentável e a responsabilidade corporativa.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">10</div>
                  <div className="text-sm text-gray-600">Princípios</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Áreas</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2021</div>
                  <div className="text-sm text-gray-600">Ano de Adesão</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Comprometimento</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Princípios do Pacto Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Os 10 Princípios do Pacto Global</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {principiosPacto.map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`p-3 ${categoria.color} rounded-full mr-4`}>
                        <categoria.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-green-800">{categoria.categoria}</h3>
                        <div className="flex items-center mt-2">
                          <Progress value={categoria.progresso} className="flex-1 mr-3" />
                          <span className="text-sm font-medium text-green-600">{categoria.progresso}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {categoria.principios.map((principio, pIndex) => (
                        <div key={pIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-gray-600 text-sm leading-relaxed">{principio}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Iniciativas 2021 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Iniciativas Implementadas em 2021</h2>

          <div className="space-y-6">
            {iniciativas2021.map((iniciativa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-green-800">{iniciativa.titulo}</h3>
                      <Badge
                        className={`${
                          iniciativa.status === "Concluído"
                            ? "bg-green-100 text-green-800"
                            : iniciativa.status === "Superado"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {iniciativa.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{iniciativa.descricao}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Meta: </span>
                        <span className="text-gray-600">{iniciativa.meta}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Realizado: </span>
                        <span className="text-gray-600">{iniciativa.realizado}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ODS - Objetivos de Desenvolvimento Sustentável */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
            Objetivos de Desenvolvimento Sustentável (ODS)
          </h2>

          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <p className="text-gray-600 text-center mb-8">
                Nossas ações estão alinhadas com os seguintes Objetivos de Desenvolvimento Sustentável da ONU:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ods.map((objetivo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className={`${objetivo.cor} text-white p-4 rounded-lg text-center hover:scale-105 transition-transform`}
                  >
                    <div className="text-2xl font-bold mb-2">{objetivo.numero}</div>
                    <div className="text-sm font-medium">{objetivo.nome}</div>
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
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-3xl font-semibold mb-4">Compromisso Contínuo</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Nossa adesão ao Pacto Global da ONU representa um compromisso contínuo com a sustentabilidade,
                responsabilidade social e desenvolvimento econômico responsável. Continuamos trabalhando para
                implementar e aprimorar nossas práticas em todas as áreas.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Pacto Global ONU</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  <span>10 Princípios</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
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
