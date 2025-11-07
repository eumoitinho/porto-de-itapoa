"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Ship, Clock, MapPin, Camera, ExternalLink, Calendar } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useI18n } from "@/lib/i18n/context"
import { useProgramacaoNaviosData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"

// Tipos para navios
interface Navio {
  id: string
  nome: string
  armador: string
  viagem: string
  origem: string
  destino: string
  eta?: string // Previsão de chegada
  ata?: string // Chegada
  etb?: string // Previsão de atracação
  atb?: string // Atracação
  ets?: string // Previsão de saída
  ats?: string // Saída
  status: 'esperado' | 'atracado' | 'desatracado'
}

export default function ProgramacaoNaviosPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useProgramacaoNaviosData()
  const [activeTab, setActiveTab] = useState<'esperados' | 'atracados' | 'desatracados'>('esperados')
  const [navios, setNavios] = useState<Navio[]>([])
  const [snapshotUrl, setSnapshotUrl] = useState<string>(`https://cdn.portoitapoa.com/snap_c1.jpg?nocache=${Date.now()}`)

  const title = getTranslatedField(pageData?.title, language, t("shipScheduling") || "Programação de Navios")
  const description = getTranslatedField(pageData?.description, language, t("shipSchedulingDescription") || "Acompanhe em tempo real chegadas, atracações e saídas de navios")

  // Simular dados de navios (posteriormente virá da API)
  useEffect(() => {
    // TODO: Integrar com API real
    const mockNavios: Navio[] = [
      {
        id: '1',
        nome: 'MSC OSCAR',
        armador: 'MSC',
        viagem: 'MSC123',
        origem: 'Roterdã',
        destino: 'Singapura',
        eta: '2025-01-15 08:00',
        etb: '2025-01-15 10:00',
        ets: '2025-01-16 18:00',
        status: 'esperado'
      },
      {
        id: '2',
        nome: 'MAERSK MADRID',
        armador: 'Maersk',
        viagem: 'MAE456',
        origem: 'Xangai',
        destino: 'Nova York',
        ata: '2025-01-14 14:30',
        atb: '2025-01-14 16:00',
        status: 'atracado'
      },
      {
        id: '3',
        nome: 'COSCO SHIPPING',
        armador: 'Cosco',
        viagem: 'COS789',
        origem: 'Hong Kong',
        destino: 'Barcelona',
        ats: '2025-01-13 20:00',
        status: 'desatracado'
      }
    ]
    setNavios(mockNavios)
  }, [])

  // Atualizar snapshot da câmera periodicamente quando a URL de streaming não está configurada
  useEffect(() => {
    const id = setInterval(() => {
      setSnapshotUrl(`https://cdn.portoitapoa.com/snap_c1.jpg?nocache=${Date.now()}`)
    }, 10000)
    return () => clearInterval(id)
  }, [])

  const naviosFiltrados = navios.filter(n => {
    if (activeTab === 'esperados') return n.status === 'esperado'
    if (activeTab === 'atracados') return n.status === 'atracado'
    if (activeTab === 'desatracados') return n.status === 'desatracado'
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'esperado': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'atracado': return 'bg-green-100 text-green-800 border-green-300'
      case 'desatracado': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'esperado': return t("expected") || 'Esperado'
      case 'atracado': return t("docked") || 'Atracado'
      case 'desatracado': return t("departed") || 'Desatracado'
      default: return status
    }
  }

  return (
    <div className="min-h-screen mt-44 py-16 px-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title mb-6">
            {title}
          </h1>
          <p className="section-subtitle max-w-4xl">
            {description}
          </p>
        </motion.div>

        {/* Intro */}
        {pageData?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Legenda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-green-50 border border-green-200 rounded-xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">{t("legend") || "Legenda"}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">ETA:</span>
                  <span className="text-gray-600 ml-2">{t("eta") || "Previsão de chegada"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">ATA:</span>
                  <span className="text-gray-600 ml-2">{t("ata") || "Chegada"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">ETB:</span>
                  <span className="text-gray-600 ml-2">{t("etb") || "Previsão de atracação"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">ATB:</span>
                  <span className="text-gray-600 ml-2">{t("atb") || "Atracação"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">ETS:</span>
                  <span className="text-gray-600 ml-2">{t("ets") || "Previsão de saída"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">ATS:</span>
                  <span className="text-gray-600 ml-2">{t("ats") || "Saída"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs de Status */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="esperados">
              {t("expected") || "Esperados"} ({navios.filter(n => n.status === 'esperado').length})
            </TabsTrigger>
            <TabsTrigger value="atracados">
              {t("docked") || "Atracados"} ({navios.filter(n => n.status === 'atracado').length})
            </TabsTrigger>
            <TabsTrigger value="desatracados">
              {t("departed") || "Desatracados"} ({navios.filter(n => n.status === 'desatracado').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Lista de Navios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {naviosFiltrados.map((navio, index) => (
            <motion.div
              key={navio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl h-full hover:shadow-2xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Ship className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{navio.nome}</h3>
                        <p className="text-sm text-gray-600">{navio.armador}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(navio.status)}>
                      {getStatusLabel(navio.status)}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-gray-700">{t("voyage") || "Viagem"}:</span>
                      <span className="text-gray-600">{navio.viagem}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-gray-600">{navio.origem} → {navio.destino}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    {navio.eta && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ETA:</span>
                        <span className="text-gray-700 font-medium">{navio.eta}</span>
                      </div>
                    )}
                    {navio.ata && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ATA:</span>
                        <span className="text-gray-700 font-medium">{navio.ata}</span>
                      </div>
                    )}
                    {navio.etb && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ETB:</span>
                        <span className="text-gray-700 font-medium">{navio.etb}</span>
                      </div>
                    )}
                    {navio.atb && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ATB:</span>
                        <span className="text-gray-700 font-medium">{navio.atb}</span>
                      </div>
                    )}
                    {navio.ets && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ETS:</span>
                        <span className="text-gray-700 font-medium">{navio.ets}</span>
                      </div>
                    )}
                    {navio.ats && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ATS:</span>
                        <span className="text-gray-700 font-medium">{navio.ats}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Câmera Online */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-semibold text-green-800">
                  {t("onlineCamera") || "Câmera Online"}
                </h2>
              </div>
              <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 bg-black/90">
                <img
                  src={snapshotUrl}
                  alt="Câmera ao vivo - Porto Itapoá"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <p className="text-sm text-white/90">
                    {t("cameraFallback") || "Imagem ao vivo do terminal (atualiza automaticamente)."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

