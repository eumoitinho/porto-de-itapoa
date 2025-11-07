"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { X, MapPin, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Importação dinâmica do Globe para evitar problemas de SSR
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

// Declaração de tipos para UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean
      init?: () => void
    }
  }
  const UnicornStudio: {
    init: () => void
  }
}

// Cor verde padrão
const GREEN_COLOR = "#16a34a"
const GREEN_GLOW = "#22c55e"

// Coordenadas do Porto Itapoá (Itapoá, SC, Brasil)
const PORTO_ITAPOA = {
  lat: -26.1167,
  lng: -48.6167,
  name: "Porto Itapoá",
  description: "Terminal portuário de última geração localizado em Itapoá, Santa Catarina, Brasil.",
  region: "Brasil",
  services: "3 berços disponíveis",
  carriers: ["Maersk", "MSC", "Hapag-Lloyd", "Cosco"],
  image: "/foto-porto-patio-1024x721.webp",
}

// Principais portos de destino
const destinations = [
  // Ásia
  {
    lat: 1.2897,
    lng: 103.8501,
    name: "Singapura",
    region: "Ásia",
    description: "Um dos maiores portos do mundo, hub estratégico para o comércio asiático.",
    services: "3 serviços regulares",
    carriers: ["Maersk", "HMM", "PIL", "Cosco", "ONE"],
    image: "/placeholder.jpg",
  },
  {
    lat: 22.3193,
    lng: 114.1694,
    name: "Hong Kong",
    region: "Ásia",
    description: "Porto estratégico na Ásia, conectando o Brasil aos principais mercados asiáticos.",
    services: "2 serviços regulares",
    carriers: ["Maersk", "HMM", "PIL", "Cosco"],
    image: "/placeholder.jpg",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    name: "Tóquio",
    region: "Ásia",
    description: "Principal porto do Japão, oferecendo acesso direto ao mercado japonês.",
    services: "2 serviços regulares",
    carriers: ["ONE", "Maersk", "HMM"],
    image: "/placeholder.jpg",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    name: "Xangai",
    region: "Ásia",
    description: "Maior porto do mundo em volume de carga, hub essencial para o comércio global.",
    services: "3 serviços regulares",
    carriers: ["Cosco", "Maersk", "HMM", "ONE"],
    image: "/placeholder.jpg",
  },
  // Europa
  {
    lat: 51.5074,
    lng: -0.1278,
    name: "Londres",
    region: "Europa",
    description: "Porto estratégico no Reino Unido, conectando o Brasil aos mercados europeus.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC"],
    image: "/placeholder.jpg",
  },
  {
    lat: 53.5511,
    lng: 9.9937,
    name: "Hamburgo",
    region: "Europa",
    description: "Maior porto da Alemanha, hub importante para o comércio europeu.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC"],
    image: "/placeholder.jpg",
  },
  {
    lat: 51.9225,
    lng: 4.4772,
    name: "Roterdã",
    region: "Europa",
    description: "Maior porto da Europa, gateway estratégico para o continente europeu.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC", "Cosco"],
    image: "/placeholder.jpg",
  },
  {
    lat: 41.3851,
    lng: 2.1734,
    name: "Barcelona",
    region: "Europa",
    description: "Porto mediterrâneo estratégico, conectando o Brasil ao sul da Europa.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "MSC", "CMA CGM"],
    image: "/placeholder.jpg",
  },
  // América do Norte
  {
    lat: 40.7128,
    lng: -74.0060,
    name: "Nova York",
    region: "América do Norte",
    description: "Principal porto da costa leste dos EUA, hub estratégico para o mercado norte-americano.",
    services: "1 serviço regular",
    carriers: ["Maersk", "Hapag-Lloyd"],
    image: "/placeholder.jpg",
  },
  {
    lat: 33.6844,
    lng: -118.1378,
    name: "Los Angeles",
    region: "América do Norte",
    description: "Maior porto da costa oeste dos EUA, gateway para o mercado norte-americano.",
    services: "1 serviço regular",
    carriers: ["Maersk", "MSC", "ZIM"],
    image: "/placeholder.jpg",
  },
  {
    lat: 25.7617,
    lng: -80.1918,
    name: "Miami",
    region: "América do Norte",
    description: "Porto estratégico na Flórida, conectando o Brasil ao mercado norte-americano.",
    services: "1 serviço regular",
    carriers: ["Maersk", "MSC"],
    image: "/placeholder.jpg",
  },
]

// Regiões disponíveis para filtro
const regions = [
  { id: "all", name: "Todas as Regiões", color: GREEN_COLOR },
  { id: "Ásia", name: "Ásia", color: "#f59e0b" },
  { id: "Europa", name: "Europa", color: "#3b82f6" },
  { id: "América do Norte", name: "América do Norte", color: "#ef4444" },
  { id: "Brasil", name: "Brasil", color: GREEN_COLOR },
]

// Criar arcos (linhas tracejadas) conectando Porto Itapoá aos destinos
const arcs = destinations.map((dest) => ({
  startLat: PORTO_ITAPOA.lat,
  startLng: PORTO_ITAPOA.lng,
  endLat: dest.lat,
  endLng: dest.lng,
  color: GREEN_COLOR,
  region: dest.region,
}))

interface InteractiveGlobeProps {
  className?: string
  title?: string
  description?: string
}

export function InteractiveGlobe({ className = "", title, description }: InteractiveGlobeProps) {
  const globeRef = useRef<any>(null)
  const [selectedPoint, setSelectedPoint] = useState<any>(null)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [countriesData, setCountriesData] = useState<any[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [showModal, setShowModal] = useState(false)

  // Filtrar pontos baseado na região selecionada
  const filteredPoints = selectedRegion === "all"
    ? [
        {
          ...PORTO_ITAPOA,
          size: 50,
          color: GREEN_COLOR,
        },
        ...destinations.map((dest) => ({
          ...dest,
          size: 30,
          color: GREEN_COLOR,
        })),
      ]
    : selectedRegion === "Brasil"
    ? [{
        ...PORTO_ITAPOA,
        size: 50,
        color: GREEN_COLOR,
      }]
    : [
        {
          ...PORTO_ITAPOA,
          size: 50,
          color: GREEN_COLOR,
        },
        ...destinations
          .filter((dest) => dest.region === selectedRegion)
          .map((dest) => ({
            ...dest,
            size: 30,
            color: GREEN_COLOR,
          })),
      ]

  // Arco ativo: somente quando um destino (≠ Porto Itapoá) é selecionado
  const activeArc = selectedPoint && selectedPoint.name !== PORTO_ITAPOA.name
    ? [{
        startLat: PORTO_ITAPOA.lat,
        startLng: PORTO_ITAPOA.lng,
        endLat: selectedPoint.lat,
        endLng: selectedPoint.lng,
      }]
    : []

  // (Mapa UnicornStudio será injetado na página; não carregar script aqui)

  // Carregar dados GeoJSON dos países
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then((data: any) => {
        const countries = data.features.map((feature: any) => ({
          ...feature,
          properties: {
            ...feature.properties,
            color: GREEN_COLOR,
          }
        }))
        setCountriesData(countries)
      })
      .catch(err => {
        console.warn('Erro ao carregar dados dos países:', err)
      })
  }, [])

  useEffect(() => {
    if (globeRef.current) {
      // Ampliar muito o globo - altitude muito menor = globo muito maior (ocupando 100% da seção)
      globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.03 }, 2000)
      
      const handleWheelZoom = () => {
        const canvas = globeRef.current?.getGlobeCanvas?.()
        if (canvas) {
          const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            e.stopPropagation()
            window.scrollBy(0, e.deltaY)
            return false
          }
          canvas.addEventListener('wheel', handleWheel, { passive: false })
          canvas.style.touchAction = 'pan-x pan-y'
          canvas.style.pointerEvents = 'auto'
        }
      }
      
      setTimeout(handleWheelZoom, 100)
      setTimeout(handleWheelZoom, 1000)
      
      setTimeout(() => {
        if (globeRef.current) {
          // Manter o globo muito ampliado
          globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.03 }, 1000)
        }
      }, 2500)
    }
  }, [])

  const handlePointClick = (point: any, event?: any) => {
    setSelectedPoint(point)
    setShowModal(true)
    
      if (globeRef.current) {
        globeRef.current.pointOfView(
          { 
            lat: point.lat, 
            lng: point.lng, 
            altitude: 0.03
          },
          1500
        )
      }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPoint(null)
    
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: -26, lng: -48, altitude: 0.05 },
        1500
      )
    }
  }

  const handleRegionFilter = (regionId: string) => {
    setSelectedRegion(regionId)
    setSelectedPoint(null)
    setShowModal(false)
    
    if (globeRef.current) {
      if (regionId === "all") {
        globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.03 }, 1500)
      } else if (regionId === "Brasil") {
        globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.03 }, 1500)
      } else {
        const regionPoints = destinations.filter(d => d.region === regionId)
        if (regionPoints.length > 0) {
          const avgLat = regionPoints.reduce((sum, p) => sum + p.lat, 0) / regionPoints.length
          const avgLng = regionPoints.reduce((sum, p) => sum + p.lng, 0) / regionPoints.length
          globeRef.current.pointOfView({ lat: avgLat, lng: avgLng, altitude: 0.03 }, 1500)
        }
      }
    }
  }

  const paddingRightPx = selectedPoint && selectedPoint.name !== PORTO_ITAPOA.name ? 380 : 0

  return (
    <div 
      className={`relative w-full h-full min-h-[800px] ${className} overflow-hidden`}
      onWheel={(e) => {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
      style={{ touchAction: 'pan-x pan-y', paddingRight: `${paddingRightPx}px` }}
    >
      {/* Painel de Seleção de Regiões - Acoplado ao lado esquerdo */}
      <div className="absolute top-6 left-6 z-20 bg-white rounded-xl shadow-lg border border-gray-200 p-3">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-green-600" />
          <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Região</h3>
        </div>
        <div className="space-y-1.5">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionFilter(region.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedRegion === region.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedRegion === region.id ? "white" : region.color }}
                />
                <span className="truncate">{region.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Background UnicornStudio Map (injetado na página para evitar duplicidade) */}

      <Globe
        ref={globeRef}
        showGlobe={true}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        showAtmosphere={true}
        atmosphereColor={GREEN_GLOW}
        atmosphereAltitude={0.25}
        hexPolygonsData={countriesData}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonUseDots={false}
        hexPolygonColor={() => 'rgba(22, 163, 74, 0.35)'}
        hexPolygonAltitude={0.015}
        hexPolygonCurvatureResolution={3}
        // Pontos com labels textuais
        pointsData={filteredPoints}
        pointAltitude={0.04}
        pointColor={(d: any) => hoveredPoint === d ? GREEN_GLOW : GREEN_COLOR}
        pointRadius={(d: any) => hoveredPoint === d ? 1.8 : (d.size === 50 ? 1.5 : 1.0)}
        pointResolution={32}
        pointLabel={undefined}
        // Rótulos HTML atrelados ao mesmo globo (sem segundo canvas)
        htmlElementsData={filteredPoints}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlAltitude={() => 0.01}
        htmlElement={(d: any) => {
          const el = document.createElement('div')
          el.className = 'rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-[10px] text-gray-800 shadow pointer-events-auto'
          el.textContent = d.name
          el.onmouseenter = () => setHoveredPoint(d)
          el.onmouseleave = () => setHoveredPoint(null)
          el.onclick = () => handlePointClick(d)
          return el
        }}
        onPointClick={(point: any, event: any) => handlePointClick(point, event)}
        onPointHover={(point: any) => setHoveredPoint(point || null)}
        // Arcos: somente quando um destino é clicado
        arcsData={activeArc}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={() => [GREEN_COLOR, GREEN_GLOW]}
        arcStroke={2}
        arcAltitude={0.3}
        enablePointerInteraction={true}
        controls={false}
        animateIn={false}
        onGlobeReady={() => {
          if (globeRef.current) {
            // Ampliar muito o globo - altitude muito menor = globo muito maior (ocupando 100% da seção)
            globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.03 }, 2000)
            const canvas = globeRef.current.getGlobeCanvas()
            if (canvas) {
              canvas.style.touchAction = 'pan-x pan-y'
              canvas.addEventListener('wheel', (e: WheelEvent) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }, { passive: false })
            }
          }
        }}
        backgroundColor="rgba(0,0,0,0)"
      />

      {/* Popover do ponto (simples) */}
      {hoveredPoint && !showModal && (
        <div className="absolute z-20 pointer-events-none right-4 top-4">
          <div className="bg-white/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl border border-gray-200 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-gray-900">{hoveredPoint.name}</span>
          </div>
        </div>
      )}

      {/* (labels HTML agora estão no globo principal) */}

      {/* Painel lateral (não cobre o globo) */}
      {selectedPoint && selectedPoint.name !== PORTO_ITAPOA.name && (
        <div className="absolute top-0 right-0 h-full w-[380px] bg-white border-l border-gray-200 z-30 shadow-xl">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{PORTO_ITAPOA.name} → {selectedPoint.name}</h3>
              <button onClick={handleCloseModal} className="p-1 rounded hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Catálogo de serviços disponíveis para esta rota.</p>
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Armadores</div>
              <div className="flex flex-wrap gap-2">
                {selectedPoint.carriers?.map((c: string) => (
                  <span key={c} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">{c}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border bg-gray-50">
                <div className="text-sm font-medium text-gray-900">Serviços Regulares</div>
                <div className="text-xs text-gray-600">{selectedPoint.services || 'Consulte nosso portfólio de serviços.'}</div>
              </div>
            </div>
            <div className="mt-5">
              <a href="/servicos/linhas-navegacao" className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800">
                Ver catálogo completo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M13.5 4.5 21 12l-7.5 7.5m7.5-7.5H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Informativo */}
      <AnimatePresence>
        {showModal && selectedPoint && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header do Modal */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  {selectedPoint.image && (
                    <Image
                      src={selectedPoint.image}
                      alt={selectedPoint.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedPoint.name}</h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                          {selectedPoint.region}
                        </span>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X className="h-6 w-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-8">
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {selectedPoint.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Serviços</span>
                      <p className="text-lg text-gray-900 font-semibold">{selectedPoint.services}</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Localização</span>
                      <p className="text-sm text-gray-900 font-medium">
                        {selectedPoint.lat > 0 ? 'N' : 'S'} {Math.abs(selectedPoint.lat).toFixed(2)}°, 
                        {selectedPoint.lng > 0 ? 'E' : 'W'} {Math.abs(selectedPoint.lng).toFixed(2)}°
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-4">Armadores</span>
                    <div className="flex flex-wrap gap-3">
                      {selectedPoint.carriers?.map((carrier: string, index: number) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm"
                        >
                          {carrier}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
