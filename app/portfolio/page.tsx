"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus, X, Ship, Clock, MapPin, Users, Globe2, Anchor, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { servicosMaritimos, outrosServicos } from "@/lib/data/services"
import { portoData } from "@/lib/data/porto-data"

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

// Filtros de Cobertura baseados nos serviços existentes
const coberturaFiltros = [
  { id: "costa-leste-america-sul", label: "Costa Leste América do Sul", count: 8 },
  { id: "norte-europa", label: "Norte da Europa", count: 3 },
  { id: "costa-leste-eua", label: "Costa Leste dos EUA", count: 2 },
  { id: "golfo-eua", label: "Golfo dos EUA", count: 3 },
  { id: "mediterraneo", label: "Mediterrâneo", count: 2 },
  { id: "asia", label: "Ásia", count: 3 },
  { id: "costa-brasileira", label: "Costa Brasileira", count: 3 },
  { id: "africa-ocidental", label: "África Ocidental", count: 1 }
]

// Filtros de Nome do Serviço
const nomeServicoFiltros = [
  { id: "esa", label: "ESA - Europa Costa Leste" },
  { id: "ucla-gulf", label: "UCLA/GULF" },
  { id: "zgt", label: "ZGT" },
  { id: "tango-sec", label: "TANGO/SEC" },
  { id: "mse-wmed", label: "MSE/WMED" },
  { id: "sirius-bossa", label: "SIRIUS/Bossa Nova" },
  { id: "lux-ese2", label: "LUX/ESE2/EEX" },
  { id: "nwc", label: "NWC" },
  { id: "neoasas", label: "NEOASAS/ASE" },
  { id: "seas2", label: "SEAS2/ESA2" },
  { id: "fil2", label: "FIL2/SX2" },
  { id: "alcat", label: "ALCAT (Cabotagem)" },
  { id: "braco", label: "BRACO" }
]

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState<string>("all")
  const [selectedCobertura, setSelectedCobertura] = useState<Set<string>>(new Set())
  const [selectedNomeServico, setSelectedNomeServico] = useState<Set<string>>(new Set())
  const [selectedTransitTime, setSelectedTransitTime] = useState<Set<string>>(new Set())
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  // Função para calcular o transit time máximo de um serviço
  const getMaxTransitTime = (servico: any) => {
    if (!servico.transit_times || servico.transit_times.length === 0) return 0
    return Math.max(...servico.transit_times.map((t: any) => Math.max(t.importacao || 0, t.exportacao || 0)))
  }

  // Calcular contadores dos filtros de transit time dinamicamente
  const transitTimeFiltros = useMemo(() => {
    const counts = {
      "ate-15": 0,
      "15-25": 0,
      "25-35": 0,
      "35-45": 0,
      "acima-45": 0
    }

    servicosMaritimos.forEach(servico => {
      const maxTransit = getMaxTransitTime(servico)
      if (maxTransit > 0) {
        if (maxTransit <= 15) counts["ate-15"]++
        else if (maxTransit <= 25) counts["15-25"]++
        else if (maxTransit <= 35) counts["25-35"]++
        else if (maxTransit <= 45) counts["35-45"]++
        else counts["acima-45"]++
      }
    })

    return [
      { id: "ate-15", label: "Até 15 dias", count: counts["ate-15"] },
      { id: "15-25", label: "15 a 25 dias", count: counts["15-25"] },
      { id: "25-35", label: "25 a 35 dias", count: counts["25-35"] },
      { id: "35-45", label: "35 a 45 dias", count: counts["35-45"] },
      { id: "acima-45", label: "Acima de 45 dias", count: counts["acima-45"] }
    ]
  }, [])

  const filteredServicos = useMemo(() => {
    return servicosMaritimos.filter((servico) => {
      const matchesSearch =
        servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.armadores.some((armador) => armador.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategoria = selectedCategoria === "all" || servico.categoria === selectedCategoria
      
      const matchesCobertura = selectedCobertura.size === 0 || 
        Array.from(selectedCobertura).some(cobertura => {
          // Mapear coberturas para os serviços
          switch(cobertura) {
            case "costa-leste-america-sul":
              return servico.cobertura.toLowerCase().includes("américa do sul") || 
                     servico.cobertura.toLowerCase().includes("costa leste")
            case "norte-europa":
              return servico.cobertura.toLowerCase().includes("europa") && 
                     !servico.cobertura.toLowerCase().includes("mediterrâneo")
            case "costa-leste-eua":
              return servico.cobertura.toLowerCase().includes("costa leste") && 
                     servico.cobertura.toLowerCase().includes("américa do norte")
            case "golfo-eua":
              return servico.cobertura.toLowerCase().includes("golfo")
            case "mediterraneo":
              return servico.cobertura.toLowerCase().includes("mediterrâneo")
            case "asia":
              return servico.cobertura.toLowerCase().includes("ásia")
            case "costa-brasileira":
              return servico.categoria === "Cabotagem"
            case "africa-ocidental":
              return servico.cobertura.toLowerCase().includes("áfrica")
            default:
              return false
          }
        })

      const matchesNomeServico = selectedNomeServico.size === 0 ||
        Array.from(selectedNomeServico).some(nome => {
          return servico.codigo.toLowerCase().includes(nome.replace(/[^a-z]/g, '')) ||
                 servico.nome.toLowerCase().includes(nome.replace(/[^a-z]/g, ''))
        })

      const matchesTransitTime = selectedTransitTime.size === 0 ||
        Array.from(selectedTransitTime).some(tempo => {
          const maxTransit = getMaxTransitTime(servico)
          if (maxTransit === 0) return false
          
          switch(tempo) {
            case "ate-15":
              return maxTransit <= 15
            case "15-25":
              return maxTransit > 15 && maxTransit <= 25
            case "25-35":
              return maxTransit > 25 && maxTransit <= 35
            case "35-45":
              return maxTransit > 35 && maxTransit <= 45
            case "acima-45":
              return maxTransit > 45
            default:
              return false
          }
        })

      return matchesSearch && matchesCategoria && matchesCobertura && matchesNomeServico && matchesTransitTime
    })
  }, [searchTerm, selectedCategoria, selectedCobertura, selectedNomeServico, selectedTransitTime])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const toggleCobertura = (coberturaId: string) => {
    const newCobertura = new Set(selectedCobertura)
    if (newCobertura.has(coberturaId)) {
      newCobertura.delete(coberturaId)
    } else {
      newCobertura.add(coberturaId)
    }
    setSelectedCobertura(newCobertura)
  }

  const toggleNomeServico = (nomeId: string) => {
    const newNomes = new Set(selectedNomeServico)
    if (newNomes.has(nomeId)) {
      newNomes.delete(nomeId)
    } else {
      newNomes.add(nomeId)
    }
    setSelectedNomeServico(newNomes)
  }

  const toggleTransitTime = (tempoId: string) => {
    const newTempos = new Set(selectedTransitTime)
    if (newTempos.has(tempoId)) {
      newTempos.delete(tempoId)
    } else {
      newTempos.add(tempoId)
    }
    setSelectedTransitTime(newTempos)
  }

  const clearAllFilters = () => {
    setSelectedCategoria("all")
    setSelectedCobertura(new Set())
    setSelectedNomeServico(new Set())
    setSelectedTransitTime(new Set())
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header com Design System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <Ship className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-4xl md:text-5xl font-light text-green-800 mb-2">
                    PORTFÓLIO DE SERVIÇOS MARÍTIMOS
                  </CardTitle>
                  <div className="text-2xl font-bold text-green-700">2025</div>
                </div>
              </div>
              <CardDescription className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Conectamos o Brasil aos principais mercados mundiais através de serviços marítimos regulares com os
                maiores armadores globais. Nossa rede de conexões oferece frequência semanal e tempos de trânsito
                competitivos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Ship className="h-6 w-6 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">Serviços</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900 mt-2">
                      {portoData.servicos_maritimos.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Serviços Regulares</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-blue-600 mr-2" />
                      <span className="font-semibold text-gray-900">Armadores</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mt-2">
                      {new Set(portoData.servicos_maritimos.flatMap(s => s.armadores)).size}+
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Parceiros Globais</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-purple-600 mr-2" />
                      <span className="font-semibold text-gray-900">Frequência</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-900 mt-2">
                      {portoData.servicos_maritimos.filter(s => s.escala === "Semanal").length > 0 ? "Semanal" : "Variável"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Serviços Regulares</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="h-6 w-6 text-orange-600 mr-2" />
                      <span className="font-semibold text-gray-900">Portos</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-900 mt-2">
                      {new Set(
                        portoData.servicos_maritimos.flatMap(s => 
                          s.portos?.map(p => p.nome) || 
                          s.portos_brasileiros || 
                          []
                        )
                      ).size}+
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Destinos Mundiais</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com Filtros Atualizados */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-6 shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-green-800">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-green-600"
                >
                  Limpar
                </Button>
              </div>

              {/* Busca */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar serviços..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full border-gray-200 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Região */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Região</label>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Todas as regiões" />
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

              {/* Cobertura (14 serviços) */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-green-600" />
                  Cobertura (14 serviços)
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {coberturaFiltros.map((cobertura) => (
                    <Button
                      key={cobertura.id}
                      variant={selectedCobertura.has(cobertura.id) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleCobertura(cobertura.id)}
                      className={`w-full justify-between text-left rounded-lg ${
                        selectedCobertura.has(cobertura.id) 
                          ? "bg-green-600 text-white hover:bg-green-700" 
                          : "hover:bg-green-50"
                      }`}
                    >
                      <span className="text-xs">{cobertura.label}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {cobertura.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Nome do Serviço */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Ship className="h-4 w-4 mr-2 text-blue-600" />
                  Nome do Serviço
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {nomeServicoFiltros.map((nome) => (
                    <Button
                      key={nome.id}
                      variant={selectedNomeServico.has(nome.id) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleNomeServico(nome.id)}
                      className={`w-full justify-start text-left rounded-lg ${
                        selectedNomeServico.has(nome.id) 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-xs">{nome.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Transit Time (porto) - CORRIGIDO */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  Transit Time (porto)
                </label>
                <div className="space-y-2">
                  {transitTimeFiltros.map((tempo) => (
                    <Button
                      key={tempo.id}
                      variant={selectedTransitTime.has(tempo.id) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleTransitTime(tempo.id)}
                      className={`w-full justify-between text-left rounded-lg ${
                        selectedTransitTime.has(tempo.id) 
                          ? "bg-purple-600 text-white hover:bg-purple-700" 
                          : "hover:bg-purple-50"
                      }`}
                    >
                      <span className="text-xs">{tempo.label}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {tempo.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtros Ativos */}
              {(selectedCobertura.size > 0 || selectedNomeServico.size > 0 || selectedTransitTime.size > 0 || selectedCategoria !== "all") && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Filtros Ativos</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoria !== "all" && (
                      <Badge variant="secondary" className="text-xs">
                        {categoriaLabels[selectedCategoria as keyof typeof categoriaLabels]}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSelectedCategoria("all")}
                        />
                      </Badge>
                    )}
                    {Array.from(selectedCobertura).map((cobertura) => (
                      <Badge key={cobertura} variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {coberturaFiltros.find(f => f.id === cobertura)?.label}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleCobertura(cobertura)}
                        />
                      </Badge>
                    ))}
                    {Array.from(selectedNomeServico).map((nome) => (
                      <Badge key={nome} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {nomeServicoFiltros.find(f => f.id === nome)?.label}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleNomeServico(nome)}
                        />
                      </Badge>
                    ))}
                    {Array.from(selectedTransitTime).map((tempo) => (
                      <Badge key={tempo} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                        {transitTimeFiltros.find(f => f.id === tempo)?.label}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleTransitTime(tempo)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Informações de Contato */}
              <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Precisa de Ajuda?</h4>
                <p className="text-sm text-green-700 mb-3">
                  Entre em contato com nossa equipe comercial para informações detalhadas sobre rotas e serviços.
                </p>
                <div className="space-y-1 text-xs text-green-600">
                  <p>📧 comercial@portoitapoa.com</p>
                  <p>📞 +55 47 3443.8700</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lista de Serviços */}
          <div className="lg:col-span-3">
            {/* Resultados */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredServicos.length} serviço{filteredServicos.length !== 1 ? 's' : ''} encontrado{filteredServicos.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Ship className="h-4 w-4" />
                <span>Serviços Marítimos Regulares</span>
              </div>
            </div>

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
                  <p className="text-gray-500 mb-4">Tente ajustar os filtros de busca</p>
                  <Button onClick={clearAllFilters} className="bg-green-600 hover:bg-green-700">
                    Limpar Filtros
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}