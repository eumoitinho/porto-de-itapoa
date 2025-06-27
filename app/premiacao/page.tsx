"use client"

import { motion } from "framer-motion"
import { Award, Trophy, Star, Calendar, Building, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"

const premios = [
  {
    ano: "2024",
    titulo: "Prêmio Excelência Portuária",
    categoria: "Melhor Terminal de Contêineres",
    orgao: "Associação Brasileira dos Terminais de Contêineres (ABRATEC)",
    descricao: "Reconhecimento pela excelência operacional e inovação tecnológica",
    icon: Trophy,
    color: "bg-yellow-500",
    nivel: "Nacional",
  },
  {
    ano: "2023",
    titulo: "Prêmio Sustentabilidade Portuária",
    categoria: "Melhor Prática Ambiental",
    orgao: "Ministério de Portos e Aeroportos",
    descricao: "Reconhecimento pelas iniciativas de sustentabilidade e preservação ambiental",
    icon: Leaf,
    color: "bg-green-500",
    nivel: "Nacional",
  },
  {
    ano: "2023",
    titulo: "Top Employer Brasil",
    categoria: "Excelência em Gestão de Pessoas",
    orgao: "Top Employers Institute",
    descricao: "Certificação internacional por práticas excepcionais de recursos humanos",
    icon: Star,
    color: "bg-blue-500",
    nivel: "Internacional",
  },
  {
    ano: "2022",
    titulo: "Prêmio ANTAQ de Qualidade",
    categoria: "Melhor Performance Operacional",
    orgao: "Agência Nacional de Transportes Aquaviários (ANTAQ)",
    descricao: "Reconhecimento pela eficiência e qualidade dos serviços prestados",
    icon: Award,
    color: "bg-purple-500",
    nivel: "Nacional",
  },
  {
    ano: "2021",
    titulo: "Porto Destaque Socioambiental",
    categoria: "Responsabilidade Social",
    orgao: "ANTAQ e Ministério da Infraestrutura",
    descricao: "Reconhecimento pelas práticas de responsabilidade social e ambiental",
    icon: Leaf,
    color: "bg-emerald-500",
    nivel: "Nacional",
  },
  {
    ano: "2020",
    titulo: "Prêmio Inovação Logística",
    categoria: "Tecnologia Portuária",
    orgao: "Revista Tecnologística",
    descricao: "Reconhecimento pela implementação de soluções tecnológicas inovadoras",
    icon: Star,
    color: "bg-indigo-500",
    nivel: "Nacional",
  },
]

const reconhecimentos = [
  {
    titulo: "1º Lugar em Santa Catarina",
    descricao: "Maior porto de contêineres do estado",
    valor: "#1 SC",
    icon: Trophy,
  },
  {
    titulo: "3º Lugar no Brasil",
    descricao: "Entre os maiores terminais do país",
    valor: "#3 BR",
    icon: Award,
  },
  {
    titulo: "14 Anos de Operação",
    descricao: "Histórico consistente de excelência",
    valor: "14+",
    icon: Calendar,
  },
  {
    titulo: "Certificações Internacionais",
    descricao: "ISO 9001, ISO 14001, OEA",
    valor: "3",
    icon: Star,
  },
]

export default function PremiacaoPage() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Premiações</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Reconhecimentos e prêmios recebidos pelo Porto Itapoá em reconhecimento à excelência operacional.
          </p>
        </motion.div>

        {/* Reconhecimentos Principais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Principais Reconhecimentos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reconhecimentos.map((reconhecimento, index) => (
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
                      <reconhecimento.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-800 mb-2">{reconhecimento.valor}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{reconhecimento.titulo}</h3>
                    <p className="text-sm text-gray-600">{reconhecimento.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline de Prêmios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Histórico de Premiações</h2>

          <div className="space-y-8">
            {premios.map((premio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/4 p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
                        <div className={`w-16 h-16 ${premio.color} rounded-full flex items-center justify-center mb-4`}>
                          <premio.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">{premio.ano}</div>
                        <Badge
                          className={`${premio.nivel === "Internacional" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                        >
                          {premio.nivel}
                        </Badge>
                      </div>

                      <div className="lg:w-3/4 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-green-800 mb-2">{premio.titulo}</h3>
                            <Badge variant="outline" className="mb-2">
                              {premio.categoria}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{premio.descricao}</p>

                        <div className="flex items-center text-sm text-gray-500">
                          <Building className="h-4 w-4 mr-2" />
                          <span>{premio.orgao}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/foto-porto-patio-1024x721.webp"
                alt="Porto Itapoá - Terminal premiado"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-white/90 rounded-xl p-6">
                  <h2 className="text-2xl font-semibold text-green-800 mb-2">Excelência Reconhecida</h2>
                  <p className="text-gray-600">
                    Nossos prêmios e reconhecimentos refletem o compromisso contínuo com a excelência operacional e a
                    inovação no setor portuário.
                  </p>
                </div>
              </div>
            </div>
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
              <h2 className="text-3xl font-semibold mb-4">Tradição em Excelência</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Cada prêmio e reconhecimento recebido representa o resultado do trabalho dedicado de nossa equipe e
                nosso compromisso inabalável com a qualidade, inovação e sustentabilidade em todas as nossas operações.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span>6+ Prêmios Principais</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  <span>Reconhecimento Internacional</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Liderança Nacional</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
