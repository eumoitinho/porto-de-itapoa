"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus, X, Ship, Clock, MapPin, Users, Globe2, Anchor, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { servicosMaritimos, outrosServicos } from "@/lib/data/services"

const categoriaLabels = {
  Europa: "Europa",
  America_Norte: "América do Norte",
  Golfo_Mexico: "Golfo do México",
  Mediterraneo: "Mediterrâneo",
  Asia: "Ásia",
  Cabotagem: "Cabotagem",
  Outros: "Outros Serviços",
}

const categoriaIcons = {
  Europa: Globe2,
  America_Norte: Anchor,
  Golfo_Mexico: Ship,
  Mediterraneo: Route,
  Asia: Globe2,
  Cabotagem: Ship,
  Outros: Anchor,
}

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState<string>("all")
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const filteredServicos = useMemo(() => {
    return servicosMaritimos.filter((servico) => {
      const matchesSearch =
        servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.armadores.some((armador) => armador.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategoria = selectedCategoria === "all" || servico.categoria === selectedCategoria

      return matchesSearch && matchesCategoria
    })
  }, [searchTerm, selectedCategoria])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <div className="min-h-screen py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200 mb-12">
            <h1 className="text-6xl font-light text-green-800 mb-6">PORTFÓLIO DE SERVIÇOS MARÍTIMOS</h1>
            <div className="text-3xl font-bold text-green-700 mb-8">2025</div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conectamos o Brasil aos principais mercados mundiais através de serviços marítimos regulares com os
              maiores armadores globais. Nossa rede de conexões oferece frequência semanal e tempos de trânsito
              competitivos.
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar por serviço, código ou armador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 rounded-full border-gray-300 focus:border-green-500 h-12 text-lg"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="text-gray-500 h-5 w-5" />
              <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                <SelectTrigger className="w-56 rounded-full h-12">
                  <SelectValue placeholder="Filtrar por região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Regiões</SelectItem>
                  {Object.entries(categoriaLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-8">
          <AnimatePresence>
            {filteredServicos.map((servico, index) => {
              const isExpanded = expandedCards.has(servico.id)
              const CategoryIcon = categoriaIcons[servico.categoria] || Ship

              return (
                <motion.div
                  key={servico.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: isExpanded ? 1 : 1.02 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <CategoryIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-green-800">{servico.nome.toUpperCase()}</h3>
                              <Badge variant="outline" className="text-green-600 border-green-600 font-semibold mt-2">
                                {servico.codigo}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-lg text-gray-600 mb-4">{servico.cobertura}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(servico.id)}
                          className="rounded-full p-3 hover:bg-green-50 border border-green-200"
                        >
                          {isExpanded ? (
                            <X className="h-6 w-6 text-green-600" />
                          ) : (
                            <Plus className="h-6 w-6 text-green-600" />
                          )}
                        </Button>
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center text-gray-700">
                          <Users className="h-5 w-5 mr-3 text-green-600" />
                          <div>
                            <span className="font-semibold">Armadores:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {servico.armadores.map((armador) => (
                                <span
                                  key={armador}
                                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                                >
                                  {armador}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-5 w-5 mr-3 text-green-600" />
                          <div>
                            <span className="font-semibold">Frequência:</span>
                            <span className="ml-2">{servico.escala}</span>
                          </div>
                        </div>
                        {servico.navios && (
                          <div className="flex items-center text-gray-700">
                            <Ship className="h-5 w-5 mr-3 text-green-600" />
                            <div>
                              <span className="font-semibold">Navios:</span>
                              <span className="ml-2">{servico.navios}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 pt-8 mt-8"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                              {/* Transit Times Table */}
                              {servico.transit_times.length > 0 && (
                                <div>
                                  <h4 className="text-2xl font-bold text-green-800 mb-6">Tempos de Trânsito (dias)</h4>
                                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="overflow-x-auto">
                                      <table className="w-full">
                                        <thead>
                                          <tr className="border-b-2 border-green-200">
                                            <th className="text-left py-4 text-green-800 font-bold text-lg">Porto</th>
                                            <th className="text-center py-4 text-green-800 font-bold text-lg">Import</th>
                                            <th className="text-center py-4 text-green-800 font-bold text-lg">Export</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {servico.transit_times.map((transit, idx) => (
                                            <tr
                                              key={idx}
                                              className="border-b border-gray-200 hover:bg-white transition-colors"
                                            >
                                              <td className="py-4 text-gray-800 font-semibold">
                                                {transit.porto}
                                                {transit.codigo && (
                                                  <span className="ml-2 text-sm text-gray-500">({transit.codigo})</span>
                                                )}
                                              </td>
                                              <td className="py-4 text-center text-gray-700 font-medium">
                                                {transit.importacao || "-"}
                                              </td>
                                              <td className="py-4 text-center text-gray-700 font-medium">
                                                {transit.exportacao || "-"}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Route Information */}
                              <div>
                                <h4 className="text-2xl font-bold text-green-800 mb-6">Rota do Serviço</h4>
                                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                  <div className="flex items-start mb-4">
                                    <MapPin className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h5 className="font-semibold text-gray-800 mb-2">Sequência de Portos:</h5>
                                      <p className="text-gray-700 leading-relaxed">{servico.rota}</p>
                                    </div>
                                  </div>

                                  <div className="mt-6 pt-6 border-t border-green-200">
                                    <h5 className="font-semibold text-gray-800 mb-3">Categoria de Serviço:</h5>
                                    <Badge className="bg-green-600 text-white text-sm px-4 py-2">
                                      {categoriaLabels[servico.categoria]}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                                  <h5 className="font-semibold text-gray-800 mb-3">Informações de Contato:</h5>
                                  <div className="space-y-2 text-sm text-gray-600">
                                    <p>Av. Beira Mar 5, 2900 Figueira do Pontal</p>
                                    <p>Itapoá/SC - Brasil</p>
                                    <p>+55 47 3443.8700</p>
                                    <p>atendimento@portoitapoa.com</p>
                                    <p className="text-green-600 font-medium">www.portoitapoa.com</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Other Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-green-800 mb-8">OUTROS SERVIÇOS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {outrosServicos.map((servico, index) => (
                  <div key={servico.nome} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-xl font-bold text-green-800 mb-3">{servico.nome}</h4>
                    <p className="text-gray-600 mb-3">{servico.cobertura}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Armadores: </span>
                        <span className="text-sm text-gray-600">{servico.armadores.join(", ")}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {servico.escala}
                      </Badge>
                    </div>
                  </div>
                ))}

                {/* Project Cargo */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-xl font-bold text-green-800 mb-3">CARGAS PROJETO</h4>
                  <p className="text-gray-600 mb-4">Especialistas em cargas especiais e projetos complexos</p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">Parceiro:</span> BBC Chartering
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Contato:</span> renata.souza@portoitapoa.com
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Telefone:</span> (47) 9 9937-0182
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* No Results */}
        {filteredServicos.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 max-w-md mx-auto">
              <Ship className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum serviço encontrado</h3>
              <p className="text-gray-500">Tente ajustar os filtros de busca</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}