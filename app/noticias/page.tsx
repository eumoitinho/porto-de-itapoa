"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const noticias = [
  {
    id: 1,
    titulo: "Porto Itapoá Bate Recorde de Movimentação em 2024",
    resumo: "Terminal registra crescimento de 15% na movimentação de contêineres no primeiro semestre.",
    categoria: "Operações",
    data: "15 de Dezembro, 2024",
    autor: "Assessoria de Imprensa",
    imagem: "/foto-porto-patio-1024x721.webp",
  },
  {
    id: 2,
    titulo: "Nova Linha de Serviço Conecta Itapoá à Ásia",
    resumo: "Parceria com grandes armadores amplia conectividade com mercados asiáticos.",
    categoria: "Expansão",
    data: "10 de Dezembro, 2024",
    autor: "Departamento Comercial",
    imagem: "/foto-porto-patio-1024x721.webp",
  },
  {
    id: 3,
    titulo: "Investimento em Sustentabilidade Ambiental",
    resumo: "Porto Itapoá anuncia programa de redução de emissões e energia renovável.",
    categoria: "Sustentabilidade",
    data: "5 de Dezembro, 2024",
    autor: "Gerência Ambiental",
    imagem: "/foto-porto-patio-1024x721.webp",
  },
  {
    id: 4,
    titulo: "Modernização da Infraestrutura Portuária",
    resumo: "Novos equipamentos aumentam eficiência operacional e capacidade de atendimento.",
    categoria: "Infraestrutura",
    data: "28 de Novembro, 2024",
    autor: "Engenharia",
    imagem: "/foto-porto-patio-1024x721.webp",
  },
  {
    id: 5,
    titulo: "Certificação Internacional de Qualidade",
    resumo: "Porto Itapoá recebe certificação ISO 9001:2015 por excelência operacional.",
    categoria: "Qualidade",
    data: "20 de Novembro, 2024",
    autor: "Qualidade e Processos",
    imagem: "/foto-porto-patio-1024x721.webp",
  },
  {
    id: 6,
    titulo: "Programa de Capacitação Profissional",
    resumo: "Iniciativa visa formar novos talentos para o setor portuário e logístico.",
    categoria: "Educação",
    data: "15 de Novembro, 2024",
    autor: "Recursos Humanos",
    imagem: "/foto-porto-patio-1024x721.webp",
  },
]

const categorias = ["Todas", "Operações", "Expansão", "Sustentabilidade", "Infraestrutura", "Qualidade", "Educação"]

export default function NoticiasPage() {
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
          <h1 className="text-5xl font-light text-green-800 mb-6">Notícias</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe as últimas novidades, investimentos e conquistas do Porto Itapoá.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-6 shadow-xl sticky top-8">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Categorias</h3>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-green-50 rounded-lg"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    {categoria}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* News Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {noticias.map((noticia, index) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={noticia.imagem || "/placeholder.svg"}
                        alt={noticia.titulo}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white">{noticia.categoria}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-green-800 mb-3 line-clamp-2">{noticia.titulo}</h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">{noticia.resumo}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {noticia.data}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {noticia.autor}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full rounded-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                      >
                        Ler Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mt-12"
            >
              <div className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    Anterior
                  </Button>
                  <Button variant="default" size="sm" className="rounded-full bg-green-600">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    Próximo
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}