"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Ship, Camera, Calendar, Search } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useI18n } from "@/lib/i18n/context"
import { useProgramacaoNaviosData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"
import { format } from "date-fns"

// Tipos para navios
interface Navio {
  id?: string
  nome?: string
  navio?: string
  armador?: string
  viagem?: string
  origem?: string
  destino?: string
  eta?: string // Previsão de chegada
  ata?: string // Chegada
  etb?: string // Previsão de atracação
  atb?: string // Atracação
  ets?: string // Previsão de saída
  ats?: string // Saída
  status?: string
}

export default function ProgramacaoNaviosPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useProgramacaoNaviosData()
  const [navios, setNavios] = useState<Navio[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchDate, setSearchDate] = useState<string>(() => {
    // Default to today's date in YYYY-MM-DD format
    const today = new Date()
    return format(today, 'yyyy-MM-dd')
  })
  const [snapshotUrl, setSnapshotUrl] = useState<string>(`https://cdn.portoitapoa.com/snap_c1.jpg?nocache=${Date.now()}`)

  const title = getTranslatedField(pageData?.title, language, t("shipScheduling") || "Programação de Navios")
  const description = getTranslatedField(pageData?.description, language, t("shipSchedulingDescription") || "Acompanhe em tempo real chegadas, atracações e saídas de navios")

  // Fetch data from API
  useEffect(() => {
    const fetchNavios = async () => {
      if (!searchDate) return
      
      setLoading(true)
      setError(null)
      
      try {
        // Calculate date range: from searchDate to 6 months later
        const startDate = new Date(searchDate)
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + 6)
        
        const de = format(startDate, 'yyyy-MM-dd')
        const ate = format(endDate, 'yyyy-MM-dd')
        
        // Use our API route as proxy to avoid CORS issues
        const response = await fetch(
          `/api/navios/programacao?de=${de}&ate=${ate}`
        )
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
          throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Transform API data to match our interface
        const transformedData: Navio[] = Array.isArray(data) ? data.map((item: any, index: number) => ({
          id: item.id || `navio-${index}`,
          nome: item.navio || item.nome || item.nomeNavio || '',
          armador: item.armador || item.shipowner || '',
          viagem: item.viagem || item.voyage || '',
          origem: item.origem || item.origin || '',
          destino: item.destino || item.destination || '',
          eta: item.eta || '',
          ata: item.ata || '',
          etb: item.etb || '',
          atb: item.atb || '',
          ets: item.ets || '',
          ats: item.ats || '',
          status: item.status || 'esperado'
        })) : []
        
        setNavios(transformedData)
      } catch (err) {
        console.error('Error fetching navios:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setNavios([])
      } finally {
        setLoading(false)
      }
    }

    fetchNavios()
  }, [searchDate])

  // Atualizar snapshot da câmera periodicamente
  useEffect(() => {
    const id = setInterval(() => {
      setSnapshotUrl(`https://cdn.portoitapoa.com/snap_c1.jpg?nocache=${Date.now()}`)
    }, 10000)
    return () => clearInterval(id)
  }, [])

  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return '-'
    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) return dateTime
      return format(date, 'dd/MM/yyyy HH:mm')
    } catch {
      return dateTime
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

        {/* Date Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-8"
        >
          <Card className="bg-white border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label htmlFor="searchDate" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("searchDate") || "Buscar por data"}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="searchDate"
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    const today = new Date()
                    setSearchDate(format(today, 'yyyy-MM-dd'))
                  }}
                  variant="outline"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {t("today") || "Hoje"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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

        {/* Tabela de Navios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <p className="mt-4 text-gray-600">{t("loadingShips") || "Carregando navios..."}</p>
                </div>
              ) : error ? (
                <div className="p-12 text-center">
                  <p className="text-red-600">{error}</p>
                  <Button
                    onClick={() => {
                      const today = new Date()
                      setSearchDate(format(today, 'yyyy-MM-dd'))
                    }}
                    className="mt-4"
                    variant="outline"
                  >
                    {t("tryAgain") || "Tentar novamente"}
                  </Button>
                </div>
              ) : navios.length === 0 ? (
                <div className="p-12 text-center">
                  <Ship className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t("noShipsFound") || "Nenhum navio encontrado para esta data"}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">{t("ship") || "Navio"}</TableHead>
                        <TableHead className="font-semibold">{t("shipowner") || "Armador"}</TableHead>
                        <TableHead className="font-semibold">{t("voyage") || "Viagem"}</TableHead>
                        <TableHead className="font-semibold">{t("origin") || "Origem"}</TableHead>
                        <TableHead className="font-semibold">{t("destination") || "Destino"}</TableHead>
                        <TableHead className="font-semibold">ETA</TableHead>
                        <TableHead className="font-semibold">ATA</TableHead>
                        <TableHead className="font-semibold">ETB</TableHead>
                        <TableHead className="font-semibold">ATB</TableHead>
                        <TableHead className="font-semibold">ETS</TableHead>
                        <TableHead className="font-semibold">ATS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {navios.map((navio) => (
                        <TableRow key={navio.id}>
                          <TableCell className="font-medium">{navio.nome || '-'}</TableCell>
                          <TableCell>{navio.armador || '-'}</TableCell>
                          <TableCell>
                            {navio.viagem ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {navio.viagem}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>{navio.origem || '-'}</TableCell>
                          <TableCell>{navio.destino || '-'}</TableCell>
                          <TableCell>
                            {navio.eta && navio.eta !== '-' ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {formatDateTime(navio.eta)}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            {navio.ata && navio.ata !== '-' ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {formatDateTime(navio.ata)}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            {navio.etb && navio.etb !== '-' ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {formatDateTime(navio.etb)}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            {navio.atb && navio.atb !== '-' ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {formatDateTime(navio.atb)}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            {navio.ets && navio.ets !== '-' ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {formatDateTime(navio.ets)}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            {navio.ats && navio.ats !== '-' ? (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono text-xs">
                                {formatDateTime(navio.ats)}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

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
