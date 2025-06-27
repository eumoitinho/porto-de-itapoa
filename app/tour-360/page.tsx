"use client"

import { motion } from "framer-motion"
import { Camera, Play, Navigation, Eye, Maximize, RotateCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"

const pontosInteresse = [
  {
    nome: "Berços de Atracação",
    descricao: "Visualize nossos 2 berços com capacidade para navios de grande porte",
    icone: "🚢",
    duracao: "3 min",
  },
  {
    nome: "Pátio de Contêineres",
    descricao: "Explore nossos 300.000 m² de área de armazenagem",
    icone: "📦",
    duracao: "5 min",
  },
  {
    nome: "Equipamentos Portuários",
    descricao: "Conheça nossos 6 portêineres e 18 RTGs em operação",
    icone: "🏗️",
    duracao: "4 min",
  },
  {
    nome: "Centro de Controle",
    descricao: "Veja nossa central de monitoramento e gestão operacional",
    icone: "🖥️",
    duracao: "2 min",
  },
  {
    nome: "Área Administrativa",
    descricao: "Conheça nossas instalações administrativas modernas",
    icone: "🏢",
    duracao: "3 min",
  },
  {
    nome: "Portaria e Segurança",
    descricao: "Explore nossos sistemas de controle de acesso",
    icone: "🛡️",
    duracao: "2 min",
  },
]

const recursos = [
  {
    titulo: "Navegação 360°",
    descricao: "Navegue livremente em todas as direções",
    icon: RotateCcw,
    color: "bg-blue-500",
  },
  {
    titulo: "Pontos Interativos",
    descricao: "Clique nos pontos para obter informações detalhadas",
    icon: Eye,
    color: "bg-green-500",
  },
  {
    titulo: "Modo Tela Cheia",
    descricao: "Experimente em tela cheia para melhor imersão",
    icon: Maximize,
    color: "bg-purple-500",
  },
  {
    titulo: "Compatível com VR",
    descricao: "Use óculos VR para uma experiência ainda mais imersiva",
    icon: Camera,
    color: "bg-orange-500",
  },
]

export default function Tour360Page() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Tour 360°</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Faça um tour virtual 360° pelas instalações do Porto Itapoá e conheça nossa infraestrutura moderna.
          </p>
        </motion.div>

        {/* Tour Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-emerald-100">
              <Image
                src="/foto-porto-patio-1024x721.webp"
                alt="Vista 360° do Porto Itapoá"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Overlay de Tour */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="backdrop-blur-md bg-white/90 rounded-2xl p-8 max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-600 rounded-full flex items-center justify-center">
                      <Play className="h-10 w-10 text-white ml-1" />
                    </div>
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Iniciar Tour Virtual</h2>
                    <p className="text-gray-600 mb-6">Explore nossas instalações em uma experiência imersiva 360°</p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full">
                      Começar Tour
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Indicadores de Pontos */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/90 text-green-800">6 Pontos de Interesse</Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pontos de Interesse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Pontos de Interesse</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pontosInteresse.map((ponto, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{ponto.icone}</div>
                      <h3 className="font-semibold text-green-800 mb-2">{ponto.nome}</h3>
                      <Badge variant="outline" className="mb-3">
                        {ponto.duracao}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm text-center">{ponto.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recursos do Tour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Recursos Disponíveis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recursos.map((recurso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-4 ${recurso.color} rounded-full flex items-center justify-center`}
                    >
                      <recurso.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">{recurso.titulo}</h3>
                    <p className="text-gray-600 text-sm">{recurso.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instruções de Uso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Como Usar o Tour 360°</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-700 mb-3">Navegação</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-green-600 text-xs font-bold">1</span>
                      </div>
                      <p className="text-gray-600 text-sm">Clique e arraste para olhar ao redor</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-green-600 text-xs font-bold">2</span>
                      </div>
                      <p className="text-gray-600 text-sm">Use a roda do mouse para zoom</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-green-600 text-xs font-bold">3</span>
                      </div>
                      <p className="text-gray-600 text-sm">Clique nos pontos destacados para mais informações</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-green-700 mb-3">Dicas</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Navigation className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <p className="text-gray-600 text-sm">Use fones de ouvido para melhor experiência sonora</p>
                    </div>
                    <div className="flex items-start">
                      <Maximize className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <p className="text-gray-600 text-sm">Ative o modo tela cheia para imersão total</p>
                    </div>
                    <div className="flex items-start">
                      <Camera className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <p className="text-gray-600 text-sm">Compatible com dispositivos VR</p>
                    </div>
                  </div>
                </div>
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
              <h2 className="text-3xl font-semibold mb-4">Experiência Imersiva</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Nosso tour virtual 360° oferece uma experiência única para conhecer as instalações do Porto Itapoá sem
                sair de casa. Explore cada detalhe de nossa infraestrutura moderna e tecnológica.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  <span>Tecnologia 360°</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  <span>6 Pontos de Interesse</span>
                </div>
                <div className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  <span>Disponível 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
