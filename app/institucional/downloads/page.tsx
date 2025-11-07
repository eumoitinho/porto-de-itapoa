"use client"

import { motion } from "framer-motion"
import { Download, FileText, ClipboardList, ShieldCheck, Layers, Presentation, FileCog, Search } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"

const categorias = [
  {
    nome: "Formulários Operacionais",
    icon: FileText,
    iconProps: { strokeWidth: 1.4 },
    color: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    arquivos: [
      { nome: "Formulário de Cadastro de Cliente", tipo: "PDF", tamanho: "1.2 MB", downloads: 1250 },
      { nome: "Formulário de Cadastro de Motorista", tipo: "PDF", tamanho: "980 KB", downloads: 890 },
      { nome: "Solicitação de Agendamento", tipo: "PDF", tamanho: "750 KB", downloads: 2100 },
      { nome: "Formulário de Ocorrências", tipo: "PDF", tamanho: "650 KB", downloads: 340 },
    ],
  },
  {
    nome: "Manuais de Procedimentos",
    icon: ClipboardList,
    iconProps: { strokeWidth: 1.6 },
    color: "bg-gradient-to-br from-green-100 via-green-200 to-green-100 text-green-700 ring-1 ring-green-300",
    arquivos: [
      { nome: "Manual do Cliente", tipo: "PDF", tamanho: "5.8 MB", downloads: 3200 },
      { nome: "Manual do Motorista", tipo: "PDF", tamanho: "4.2 MB", downloads: 2800 },
      { nome: "Procedimentos de Segurança", tipo: "PDF", tamanho: "3.1 MB", downloads: 1900 },
      { nome: "Guia de Operações Portuárias", tipo: "PDF", tamanho: "6.5 MB", downloads: 1500 },
    ],
  },
  {
    nome: "Certificações",
    icon: ShieldCheck,
    iconProps: { strokeWidth: 1.3 },
    color: "bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-100 text-emerald-800 ring-1 ring-emerald-300",
    arquivos: [
      { nome: "Certificado ISO 9001", tipo: "PDF", tamanho: "2.1 MB", downloads: 850 },
      { nome: "Certificado ISO 14001", tipo: "PDF", tamanho: "1.9 MB", downloads: 720 },
      { nome: "Certificado OEA", tipo: "PDF", tamanho: "1.5 MB", downloads: 650 },
    ],
  },
  {
    nome: "Relatórios Técnicos",
    icon: Layers,
    iconProps: { strokeWidth: 1.5 },
    color: "bg-gradient-to-br from-green-200 via-emerald-300 to-green-200 text-emerald-900 ring-1 ring-emerald-400",
    arquivos: [
      { nome: "Relatório de Sustentabilidade 2024", tipo: "PDF", tamanho: "8.2 MB", downloads: 1100 },
      { nome: "Relatório de Performance Operacional", tipo: "PDF", tamanho: "4.7 MB", downloads: 980 },
      { nome: "Estudo de Impacto Ambiental", tipo: "PDF", tamanho: "12.5 MB", downloads: 420 },
    ],
  },
  {
    nome: "Apresentações Institucionais",
    icon: Presentation,
    iconProps: { strokeWidth: 1.4 },
    color: "bg-gradient-to-br from-lime-100 via-lime-200 to-lime-100 text-lime-700 ring-1 ring-lime-300",
    arquivos: [
      { nome: "Apresentação Corporativa 2025", tipo: "PPTX", tamanho: "15.2 MB", downloads: 680 },
      { nome: "Infraestrutura do Porto", tipo: "PDF", tamanho: "8.9 MB", downloads: 920 },
      { nome: "Capacidades Operacionais", tipo: "PPTX", tamanho: "12.1 MB", downloads: 540 },
    ],
  },
  {
    nome: "Documentos Regulatórios",
    icon: FileCog,
    iconProps: { strokeWidth: 1.35 },
    color: "bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-50 text-green-700 ring-1 ring-green-200",
    arquivos: [
      { nome: "Licença de Operação", tipo: "PDF", tamanho: "3.2 MB", downloads: 380 },
      { nome: "Regulamento Interno", tipo: "PDF", tamanho: "2.8 MB", downloads: 1200 },
      { nome: "Política de Compliance", tipo: "PDF", tamanho: "1.9 MB", downloads: 760 },
    ],
  },
]

export default function DownloadsPage() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategorias = categorias.filter(categoria => 
    selectedCategory === null || categoria.nome === selectedCategory
  ).map(categoria => ({
    ...categoria,
    arquivos: categoria.arquivos.filter(arquivo =>
      arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(categoria => categoria.arquivos.length > 0)

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
          <h1 className="text-5xl font-light text-green-800 mb-6">Downloads</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Baixe documentos importantes, formulários, manuais e outros materiais relevantes do Porto Itapoá.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedCategory(null)}
                    size="sm"
                  >
                    Todos
                  </Button>
                  {categorias.map((categoria) => (
                    <Button
                      key={categoria.nome}
                      variant={selectedCategory === categoria.nome ? "default" : "outline"}
                      onClick={() => setSelectedCategory(categoria.nome)}
                      size="sm"
                    >
                      {categoria.nome}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Downloads por Categoria */}
        <div className="space-y-12">
          {filteredCategorias.map((categoria, index) => (
            <motion.div
              key={categoria.nome}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-full mr-4 flex items-center justify-center ${categoria.color}`}>
                      <categoria.icon className="h-6 w-6" strokeWidth={categoria.iconProps?.strokeWidth ?? 1.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-green-800">{categoria.nome}</h2>
                      <p className="text-gray-600">{categoria.arquivos.length} arquivo(s) disponível(is)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoria.arquivos.map((arquivo, fileIndex) => (
                      <motion.div
                        key={fileIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * fileIndex }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center flex-1">
                          <FileText className="h-5 w-5 text-green-600 mr-3" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 group-hover:text-green-700 transition-colors">
                              {arquivo.nome}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{arquivo.tipo}</span>
                              <span>{arquivo.tamanho}</span>
                              <span>{arquivo.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          <Download className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-center text-white">
              <h2 className="text-3xl font-semibold mb-4">Centro de Recursos</h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                Nosso centro de downloads oferece acesso fácil e organizado a todos os documentos importantes 
                para clientes, parceiros e stakeholders do Porto Itapoá.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-green-100">Documentos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">6</div>
                  <div className="text-green-100">Categorias</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">15K+</div>
                  <div className="text-green-100">Downloads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-green-100">Disponível</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
