"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus, X, Calculator, FileText, Package, Truck, Ship, Anchor, DollarSign, Clock, MapPin, Users, TrendingUp, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { servicosPrecos } from "@/lib/data/pricing"

const categoriaLabels = {
  armazenagem: "Armazenagem",
  movimentacao: "Movimentação",
  inspecao: "Inspeção",
  reefer: "Reefer",
  agendamento: "Agendamento",
  armazem: "Armazém",
  lcl: "LCL",
  administrativo: "Administrativo",
  outros: "Outros Serviços"
}

const categoriaIcons = {
  armazenagem: Package,
  movimentacao: Truck,
  inspecao: FileText,
  reefer: Ship,
  agendamento: Clock,
  armazem: Package,
  lcl: Package,
  administrativo: FileText,
  outros: Anchor
}

const tipoCobrancaLabels = {
  percentual: "Percentual sobre CIF",
  fixo: "Valor Fixo",
  diario: "Valor por Dia",
  consulta: "Sob Consulta"
}

const filtrosAdicionais = [
  { id: "importacao", label: "Importação", icon: Ship },
  { id: "exportacao", label: "Exportação", icon: Truck },
  { id: "cabotagem", label: "Cabotagem", icon: Anchor },
  { id: "perigosa", label: "Carga Perigosa", icon: Package },
  { id: "oog", label: "Carga OOG", icon: Package },
  { id: "vazio", label: "Contêiner Vazio", icon: Package },
  { id: "projeto", label: "Carga Projeto", icon: Package },
  { id: "lcl", label: "LCL", icon: Package }
]

const faixaPrecoFiltros = [
  { id: "ate-100", label: "Até R$ 100", icon: DollarSign },
  { id: "100-500", label: "R$ 100 - R$ 500", icon: DollarSign },
  { id: "500-1000", label: "R$ 500 - R$ 1.000", icon: DollarSign },
  { id: "1000-5000", label: "R$ 1.000 - R$ 5.000", icon: DollarSign },
  { id: "acima-5000", label: "Acima de R$ 5.000", icon: DollarSign },
  { id: "consulta", label: "Sob Consulta", icon: Calculator }
]

export default function PrecosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState<string>("all")
  const [selectedTipoCobranca, setSelectedTipoCobranca] = useState<string>("all")
  const [selectedFiltros, setSelectedFiltros] = useState<Set<string>>(new Set())
  const [selectedFaixaPreco, setSelectedFaixaPreco] = useState<Set<string>>(new Set())
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const filteredServicos = useMemo(() => {
    return servicosPrecos.filter((servico) => {
      const matchesSearch =
        servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategoria = selectedCategoria === "all" || servico.categoria === selectedCategoria
      const matchesTipoCobranca = selectedTipoCobranca === "all" || servico.tipoCobranca === selectedTipoCobranca
      
      const matchesFiltros = selectedFiltros.size === 0 || 
        Array.from(selectedFiltros).some(filtro => servico.aplicavelA?.includes(filtro))

      const matchesFaixaPreco = selectedFaixaPreco.size === 0 ||
        Array.from(selectedFaixaPreco).some(faixa => {
          if (faixa === "consulta") return servico.tipoCobranca === "consulta"
          // Implementar lógica de faixa de preço baseada no valor
          return true // Simplificado para este exemplo
        })

      return matchesSearch && matchesCategoria && matchesTipoCobranca && matchesFiltros && matchesFaixaPreco
    })
  }, [searchTerm, selectedCategoria, selectedTipoCobranca, selectedFiltros, selectedFaixaPreco])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const toggleFiltro = (filtroId: string) => {
    const newFiltros = new Set(selectedFiltros)
    if (newFiltros.has(filtroId)) {
      newFiltros.delete(filtroId)
    } else {
      newFiltros.add(filtroId)
    }
    setSelectedFiltros(newFiltros)
  }

  const toggleFaixaPreco = (faixaId: string) => {
    const newFaixas = new Set(selectedFaixaPreco)
    if (newFaixas.has(faixaId)) {
      newFaixas.delete(faixaId)
    } else {
      newFaixas.add(faixaId)
    }
    setSelectedFaixaPreco(newFaixas)
  }

  const clearAllFilters = () => {
    setSelectedCategoria("all")
    setSelectedTipoCobranca("all")
    setSelectedFiltros(new Set())
    setSelectedFaixaPreco(new Set())
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Melhorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-12 shadow-xl border border-gray-200 mb-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-600 rounded-full"></div>
              <div className="absolute top-20 right-20 w-16 h-16 border-2 border-green-600 rounded-full"></div>
              <div className="absolute bottom-10 left-20 w-12 h-12 border-2 border-blue-600 rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-green-600 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-5xl font-light text-blue-800 mb-2">TABELA DE PREÇOS E SERVIÇOS</h1>
                  <div className="text-2xl font-bold text-blue-700">2025</div>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Consulte nossa tabela completa de preços e serviços portuários. Valores atualizados e transparentes 
                para todos os serviços oferecidos pelo Porto Itapoá.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">Serviços</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">80+</div>
                  <div className="text-sm text-gray-600">Tipos de Serviços</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-semibold text-green-800">Transparência</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">100%</div>
                  <div className="text-sm text-gray-600">Preços Públicos</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-purple-600 mr-2" />
                    <span className="font-semibold text-purple-800">Atualização</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">2025</div>
                  <div className="text-sm text-gray-600">Valores Vigentes</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="h-6 w-6 text-orange-600 mr-2" />
                    <span className="font-semibold text-orange-800">Categorias</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">9</div>
                  <div className="text-sm text-gray-600">Tipos de Operação</div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Av. Beira Mar 5, 2900 • Figueira do Pontal • Itapoá/SC</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>+55 47 3443.8700</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com Filtros Expandida */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-6 shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-blue-800">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-blue-600"
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
                    className="pl-10 rounded-full border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Categoria</label>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {Object.entries(categoriaLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Cobrança */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de Cobrança</label>
                <Select value={selectedTipoCobranca} onValueChange={setSelectedTipoCobranca}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    {Object.entries(tipoCobrancaLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Faixa de Preço */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Faixa de Preço</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {faixaPrecoFiltros.map((faixa) => (
                    <Button
                      key={faixa.id}
                      variant={selectedFaixaPreco.has(faixa.id) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleFaixaPreco(faixa.id)}
                      className={`w-full justify-start text-left rounded-lg ${
                        selectedFaixaPreco.has(faixa.id) 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "hover:bg-blue-50"
                      }`}
                    >
                      <faixa.icon className="h-4 w-4 mr-2" />
                      {faixa.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Aplicável a */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Aplicável a</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filtrosAdicionais.map((filtro) => (
                    <Button
                      key={filtro.id}
                      variant={selectedFiltros.has(filtro.id) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleFiltro(filtro.id)}
                      className={`w-full justify-start text-left rounded-lg ${
                        selectedFiltros.has(filtro.id) 
                          ? "bg-green-600 text-white hover:bg-green-700" 
                          : "hover:bg-green-50"
                      }`}
                    >
                      <filtro.icon className="h-4 w-4 mr-2" />
                      {filtro.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtros Ativos */}
              {(selectedFiltros.size > 0 || selectedFaixaPreco.size > 0 || selectedCategoria !== "all" || selectedTipoCobranca !== "all") && (
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
                    {selectedTipoCobranca !== "all" && (
                      <Badge variant="secondary" className="text-xs">
                        {tipoCobrancaLabels[selectedTipoCobranca as keyof typeof tipoCobrancaLabels]}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSelectedTipoCobranca("all")}
                        />
                      </Badge>
                    )}
                    {Array.from(selectedFaixaPreco).map((faixa) => (
                      <Badge key={faixa} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {faixaPrecoFiltros.find(f => f.id === faixa)?.label}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleFaixaPreco(faixa)}
                        />
                      </Badge>
                    ))}
                    {Array.from(selectedFiltros).map((filtro) => (
                      <Badge key={filtro} variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {filtrosAdicionais.find(f => f.id === filtro)?.label}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleFiltro(filtro)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Informações de Contato */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Precisa de Ajuda?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Entre em contato com nossa equipe comercial para esclarecimentos ou cotações especiais.
                </p>
                <div className="space-y-1 text-xs text-blue-600">
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
                <Calculator className="h-4 w-4" />
                <span>Valores em Reais (R$)</span>
              </div>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {filteredServicos.map((servico, index) => {
                  const isExpanded = expandedCards.has(servico.id)
                  const CategoryIcon = categoriaIcons[servico.categoria] || Package

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
                        <CardContent className="p-6">
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <CategoryIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-blue-800">{servico.nome}</h3>
                                  <Badge variant="outline" className="text-blue-600 border-blue-600 font-medium mt-1">
                                    {servico.codigo}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-3">{servico.descricao}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpanded(servico.id)}
                              className="rounded-full p-2 hover:bg-blue-50 border border-blue-200"
                            >
                              {isExpanded ? (
                                <X className="h-5 w-5 text-blue-600" />
                              ) : (
                                <Plus className="h-5 w-5 text-blue-600" />
                              )}
                            </Button>
                          </div>

                          {/* Preço Principal */}
                          <div className="bg-blue-50 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <DollarSign className="h-5 w-5 text-blue-600" />
                                  <span className="font-semibold text-blue-800">Valor</span>
                                </div>
                                <div className="text-2xl font-bold text-blue-900">
                                  {servico.valor}
                                </div>
                                {servico.valorMinimo && (
                                  <div className="text-sm text-blue-700">
                                    Valor mínimo: {servico.valorMinimo}
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <Badge className="bg-blue-600 text-white">
                                  {categoriaLabels[servico.categoria]}
                                </Badge>
                                <div className="text-sm text-gray-600 mt-1">
                                  {tipoCobrancaLabels[servico.tipoCobranca]}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Informações Básicas */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {servico.unidade && (
                              <div className="flex items-center text-gray-700">
                                <Package className="h-4 w-4 mr-2 text-blue-600" />
                                <span className="text-sm">
                                  <strong>Unidade:</strong> {servico.unidade}
                                </span>
                              </div>
                            )}
                            {servico.periodo && (
                              <div className="flex items-center text-gray-700">
                                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                <span className="text-sm">
                                  <strong>Período:</strong> {servico.periodo}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Aplicável a */}
                          {servico.aplicavelA && servico.aplicavelA.length > 0 && (
                            <div className="mb-4">
                              <span className="text-sm font-medium text-gray-700 mb-2 block">Aplicável a:</span>
                              <div className="flex flex-wrap gap-2">
                                {servico.aplicavelA.map((item) => (
                                  <Badge key={item} variant="secondary" className="text-xs">
                                    {filtrosAdicionais.find(f => f.id === item)?.label || item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-gray-200 pt-6 mt-6"
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  {/* Detalhes do Serviço */}
                                  <div>
                                    <h4 className="text-lg font-bold text-blue-800 mb-4">Detalhes do Serviço</h4>
                                    
                                    {servico.observacoes && (
                                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                                        <h5 className="font-semibold text-blue-800 mb-2">Observações:</h5>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                          {servico.observacoes.map((obs, idx) => (
                                            <li key={idx} className="flex items-start">
                                              <span className="mr-2">•</span>
                                              <span>{obs}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {servico.adicionais && servico.adicionais.length > 0 && (
                                      <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                                        <h5 className="font-semibold text-yellow-800 mb-2">Adicionais:</h5>
                                        <ul className="text-sm text-yellow-700 space-y-1">
                                          {servico.adicionais.map((adicional, idx) => (
                                            <li key={idx} className="flex items-start">
                                              <span className="mr-2">•</span>
                                              <span>{adicional}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>

                                  {/* Informações de Cobrança */}
                                  <div>
                                    <h4 className="text-lg font-bold text-blue-800 mb-4">Informações de Cobrança</h4>
                                    
                                    <div className="bg-gray-50 rounded-xl p-4">
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className="text-sm font-medium text-gray-700">Tipo de Cobrança:</span>
                                          <span className="text-sm text-gray-900">
                                            {tipoCobrancaLabels[servico.tipoCobranca]}
                                          </span>
                                        </div>
                                        
                                        {servico.unidade && (
                                          <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Unidade:</span>
                                            <span className="text-sm text-gray-900">{servico.unidade}</span>
                                          </div>
                                        )}
                                        
                                        {servico.periodo && (
                                          <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Período:</span>
                                            <span className="text-sm text-gray-900">{servico.periodo}</span>
                                          </div>
                                        )}

                                        {servico.valorMinimo && (
                                          <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Valor Mínimo:</span>
                                            <span className="text-sm text-gray-900">{servico.valorMinimo}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Contato */}
                                    <div className="mt-6 bg-blue-50 rounded-xl p-4">
                                      <h5 className="font-semibold text-blue-800 mb-2">Dúvidas sobre este serviço?</h5>
                                      <div className="space-y-1 text-sm text-blue-700">
                                        <p>📧 comercial@portoitapoa.com</p>
                                        <p>📞 +55 47 3443.8700</p>
                                        <p className="text-xs text-blue-600 mt-2">
                                          Atendimento: Segunda a sexta das 08h às 18h
                                        </p>
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

            {/* No Results */}
            {filteredServicos.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 max-w-md mx-auto">
                  <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum serviço encontrado</h3>
                  <p className="text-gray-500 mb-4">Tente ajustar os filtros de busca</p>
                  <Button onClick={clearAllFilters} className="bg-blue-600 hover:bg-blue-700">
                    Limpar Filtros
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Informações Importantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-blue-800 mb-6">INFORMAÇÕES IMPORTANTES</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-700 mb-4">Da Tabela de Preços</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Todos os preços estão expressos em reais</li>
                        <li>• Tabela válida por prazo indeterminado</li>
                        <li>• Pode sofrer alterações sem aviso prévio</li>
                        <li>• Mantida atualizada em nosso site</li>
                        <li>• Inclui impostos sobre serviços vigentes</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-blue-700 mb-4">Do Pagamento</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Importação: pagamento prévio obrigatório</li>
                        <li>• Exportação: liquidação em até 7 dias</li>
                        <li>• LCL: pagamento à vista na retirada</li>
                        <li>• Pagamento via boleto bancário</li>
                        <li>• Encargos por atraso conforme boleto</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Contatos Comerciais</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-blue-700">Geral:</p>
                        <p className="text-blue-600">comercial@portoitapoa.com</p>
                        <p className="text-blue-600">+55 47 3443.8700</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Atendimento:</p>
                        <p className="text-blue-600">atendimento@portoitapoa.com</p>
                        <p className="text-blue-600">Segunda a sexta: 08h às 18h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}