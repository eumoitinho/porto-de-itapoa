"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ship, Calendar, Clock, MapPin, ExternalLink, Info, Search, ChevronRight, Anchor, Waves } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProgramacaoNaviosData } from "@/hooks/useSanityData"
import { PortableText } from "@/components/portable-text"
import Link from "next/link"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { useI18n } from "@/lib/i18n/context"


// Mock Data for Ships
const UPCOMING_SHIPS = [
  { name: "MAERSK LETA", voyage: "348S", service: "ASAS", eta: "15/10/2023 14:00", status: "Esperado" },
  { name: "MSC AGRIGENTO", voyage: "342N", service: "ESA", eta: "16/10/2023 08:30", status: "Confirmado" },
  { name: "HAPAG LLOYD RIO", voyage: "991E", service: "LOGIN", eta: "16/10/2023 20:00", status: "Atrasado" },
  { name: "CMA CGM AMAZON", voyage: "102W", service: "BRAZEX", eta: "17/10/2023 10:00", status: "Esperado" },
  { name: "EVER GIVEN", voyage: "202E", service: "ASIA", eta: "18/10/2023 06:00", status: "Esperado" },
]

const OPERATED_SHIPS = [
  { name: "CAP SAN AUGUSTIN", voyage: "347S", service: "ASAS", etd: "14/10/2023 18:00", status: "Operado" },
  { name: "MSC ATHENS", voyage: "341N", service: "ESA", etd: "13/10/2023 22:15", status: "Operado" },
  { name: "LOG-IN PANTANAL", voyage: "990E", service: "CAB", etd: "13/10/2023 09:45", status: "Operado" },
  { name: "COSCO BRAZIL", voyage: "101W", service: "BRAZEX", etd: "12/10/2023 16:30", status: "Operado" },
]

export default function AgendamentoPage() {
  const { data: pageData } = useProgramacaoNaviosData()
  const { language } = useI18n()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("esperados")

  const title = getTranslatedField(pageData?.title, language, 'Programação de Navios')
  const description = getTranslatedField(pageData?.description, language, 'Acompanhe em tempo real chegadas, atracações e saídas de navios')

  const filteredUpcoming = UPCOMING_SHIPS.filter(ship => 
    ship.name.toLowerCase().includes(search.toLowerCase()) || 
    ship.voyage.toLowerCase().includes(search.toLowerCase()) ||
    ship.service.toLowerCase().includes(search.toLowerCase())
  )

  const filteredOperated = OPERATED_SHIPS.filter(ship => 
    ship.name.toLowerCase().includes(search.toLowerCase()) || 
    ship.voyage.toLowerCase().includes(search.toLowerCase()) ||
    ship.service.toLowerCase().includes(search.toLowerCase())
  )

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
          <h1 className="text-5xl font-light text-green-800 mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Search and Tabs */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button 
                onClick={() => setActiveTab("esperados")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "esperados" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Navios Esperados
              </button>
              <button 
                onClick={() => setActiveTab("operados")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "operados" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Navios Operados
              </button>
            </div>
            
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar navio, viagem ou serviço..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <Card className="backdrop-blur-md bg-white border border-gray-200 shadow-lg rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600">Navio</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Viagem</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Serviço</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">{activeTab === "esperados" ? "ETA (Chegada)" : "ETD (Saída)"}</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(activeTab === "esperados" ? filteredUpcoming : filteredOperated).length > 0 ? (
                    (activeTab === "esperados" ? filteredUpcoming : filteredOperated).map((ship, index) => (
                      <tr key={index} className="hover:bg-green-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                          <Ship className="h-4 w-4 text-green-500" />
                          {ship.name}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">{ship.voyage}</td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">{ship.service}</Badge>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          {activeTab === "esperados" ? (ship as any).eta : (ship as any).etd}
                        </td>
                        <td className="px-6 py-4 text-center">
                           <div className="flex items-center justify-center gap-2">
                             <div className={`h-2 w-2 rounded-full ${ship.status === 'Confirmado' || ship.status === 'Operado' ? 'bg-green-500' : ship.status === 'Atrasado' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                             <span className="text-gray-700">{ship.status}</span>
                           </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        Nenhum navio encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Intro */}
        {pageData?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Link para Sistema Antigo (Opcional/Legacy) */}
        {pageData?.linkSistema && (
          <div className="text-center mt-8 mb-16">
            <Link href={pageData.linkSistema} target="_blank" className="text-sm text-green-600 hover:text-green-800 hover:underline flex items-center justify-center gap-1">
              Acessar sistema legado de programação <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        )}

        {/* Funcionalidades Section */}
        {pageData?.funcionalidades && pageData.funcionalidades.length > 0 && (
          <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                  Funcionalidades
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Recursos disponíveis no sistema de programação de navios
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pageData.funcionalidades.map((func: any, index: number) => {
                  const styleVariants = [
                    {
                      card: "bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg",
                      icon: "bg-emerald-500 text-white shadow-lg",
                    },
                    {
                      card: "bg-white border-2 border-green-200 shadow-md rounded-2xl",
                      icon: "bg-gradient-to-br from-green-400 to-green-600 text-white",
                    },
                    {
                      card: "bg-gradient-to-tr from-lime-50 to-white border border-lime-300 shadow-sm rounded-xl",
                      icon: "bg-lime-100 text-lime-700 border-2 border-lime-300",
                    },
                  ]
                  const style = styleVariants[index % styleVariants.length]
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className={`${style.card} h-full transition-all duration-300 hover:shadow-xl`}>
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                              <Ship className="h-7 w-7" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {getTranslatedField(func.titulo, language, func.titulo)}
                              </h3>
                              {func.descricao && (
                                <p className="text-gray-600 leading-relaxed">
                                  {getTranslatedField(func.descricao, language, func.descricao)}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Link para Sistema Section */}
        {pageData?.linkSistema && (
          <section className="py-20 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 border-0 shadow-2xl rounded-2xl overflow-hidden">
                  <CardContent className="p-12 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                        <Ship className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                        Acesse a Programação de Navios
                      </h2>
                      <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                        Consulte em tempo real todas as informações sobre chegadas, atracações e saídas de navios.
                      </p>
                      <Link href={pageData.linkSistema} target="_blank">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-medium shadow-xl">
                            Acessar Sistema
                            <ExternalLink className="ml-2 h-5 w-5" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* Instruções Section */}
        {pageData?.instrucoes && (
          <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white border-2 border-green-200 shadow-md rounded-2xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="h-7 w-7 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                          Instruções de Uso
                        </h3>
                        <PortableText 
                          content={pageData.instrucoes}
                          className="text-gray-700 leading-relaxed text-base"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* Fallback quando não há dados */}
        {!pageData && (
          <section className="py-20 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-16">
                <Ship className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Conteúdo em desenvolvimento</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
