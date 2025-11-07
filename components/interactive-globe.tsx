"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { X, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Importação dinâmica do Globe para evitar problemas de SSR
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

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
  },
  {
    lat: 22.3193,
    lng: 114.1694,
    name: "Hong Kong",
    region: "Ásia",
    description: "Porto estratégico na Ásia, conectando o Brasil aos principais mercados asiáticos.",
    services: "2 serviços regulares",
    carriers: ["Maersk", "HMM", "PIL", "Cosco"],
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    name: "Tóquio",
    region: "Ásia",
    description: "Principal porto do Japão, oferecendo acesso direto ao mercado japonês.",
    services: "2 serviços regulares",
    carriers: ["ONE", "Maersk", "HMM"],
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    name: "Xangai",
    region: "Ásia",
    description: "Maior porto do mundo em volume de carga, hub essencial para o comércio global.",
    services: "3 serviços regulares",
    carriers: ["Cosco", "Maersk", "HMM", "ONE"],
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
  },
  {
    lat: 53.5511,
    lng: 9.9937,
    name: "Hamburgo",
    region: "Europa",
    description: "Maior porto da Alemanha, hub importante para o comércio europeu.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC"],
  },
  {
    lat: 51.9225,
    lng: 4.4772,
    name: "Roterdã",
    region: "Europa",
    description: "Maior porto da Europa, gateway estratégico para o continente europeu.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC", "Cosco"],
  },
  {
    lat: 41.3851,
    lng: 2.1734,
    name: "Barcelona",
    region: "Europa",
    description: "Porto mediterrâneo estratégico, conectando o Brasil ao sul da Europa.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "MSC", "CMA CGM"],
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
  },
  {
    lat: 33.6844,
    lng: -118.1378,
    name: "Los Angeles",
    region: "América do Norte",
    description: "Maior porto da costa oeste dos EUA, gateway para o mercado norte-americano.",
    services: "1 serviço regular",
    carriers: ["Maersk", "MSC", "ZIM"],
  },
  {
    lat: 25.7617,
    lng: -80.1918,
    name: "Miami",
    region: "América do Norte",
    description: "Porto estratégico na Flórida, conectando o Brasil ao mercado norte-americano.",
    services: "1 serviço regular",
    carriers: ["Maersk", "MSC"],
  },
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

// Todos os pontos (Porto Itapoá + destinos) - todos verdes
const points = [
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
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number } | null>(null)

  // Carregar dados GeoJSON dos países
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then((data: any) => {
        // Converter para formato do globe.gl
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
        // Continuar sem dados de países
      })
  }, [])

  useEffect(() => {
    if (globeRef.current) {
      // Zoom automático inicial - mais próximo e maior (altitude menor = mais zoom)
      globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.4 }, 2000)
      
      // Permitir zoom apenas com Ctrl pressionado
      const handleWheelZoom = () => {
        const canvas = globeRef.current?.getGlobeCanvas?.()
        if (canvas) {
          const handleWheel = (e: WheelEvent) => {
            // Permitir zoom apenas se Ctrl estiver pressionado
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault()
              e.stopPropagation()
              return false
            }
          }
          canvas.addEventListener('wheel', handleWheel, { passive: false })
          canvas.style.touchAction = 'pan-x pan-y'
        }
      }
      
      // Tentar configurar após o globo estar pronto
      setTimeout(handleWheelZoom, 100)
      setTimeout(handleWheelZoom, 1000)
      
      // Animação de zoom automático suave
      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.5 }, 1000)
        }
      }, 2500)
    }
  }, [])

  const handlePointClick = (point: any, event?: any) => {
    setSelectedPoint(point)
    
    // Calcular posição do card baseado na posição do marker na tela
    if (event && event.clientX && event.clientY) {
      // Usar coordenadas do evento de clique
      setCardPosition({ 
        x: event.clientX, 
        y: event.clientY 
      })
    } else if (globeRef.current) {
      // Calcular posição baseada nas coordenadas do ponto
      const canvas = globeRef.current.getGlobeCanvas()
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        // Converter coordenadas lat/lng para posição na tela
        const width = rect.width
        const height = rect.height
        // Aproximação: ponto no centro direito da tela
        setCardPosition({ 
          x: width * 0.6, 
          y: height * 0.4 
        })
      } else {
        setCardPosition({ x: window.innerWidth - 400, y: 100 })
      }
    } else {
      // Posição padrão se não houver evento
      setCardPosition({ x: window.innerWidth - 400, y: 100 })
    }
    
    // Ampliar mais quando clicar - zoom no ponto
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { 
          lat: point.lat, 
          lng: point.lng, 
          altitude: 0.3 // Mais próximo - zoom maior
        },
        1500 // Animação de 1.5 segundos
      )
    }
  }

  const handleCloseCard = () => {
    setSelectedPoint(null)
    setCardPosition(null)
    
    // Voltar para a visão inicial
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: -26, lng: -48, altitude: 0.5 },
        1500
      )
    }
  }

  return (
    <div 
      className={`relative w-full h-full ${className} overflow-hidden`}
      onWheel={(e) => {
        // Permitir zoom apenas se Ctrl estiver pressionado
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
      style={{ touchAction: 'pan-x pan-y' }}
    >
      {/* Overlay com título e descrição integrados - verde */}
      {(title || description) && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-green-900/90 via-green-800/80 to-transparent backdrop-blur-md pt-8 pb-6 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto text-center">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-white drop-shadow-lg"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-green-50 max-w-2xl mx-auto drop-shadow-md"
              >
                {description}
              </motion.p>
            )}
            {/* Indicador de interatividade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 flex items-center justify-center gap-2 text-green-200 text-sm"
            >
              <MapPin className="h-4 w-4 animate-pulse" />
              <span>Clique nos marcadores para ver detalhes</span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Background tech distópico */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Grid tech pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Linhas de conexão animadas */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent"
              style={{
                top: `${(i * 6.67) % 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {/* Círculos tech decorativos */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border border-green-500/20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${(i * 12.5) % 80}%`,
              top: `${(i * 15) % 80}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <Globe
        ref={globeRef}
        // Background do globo - esfera transparente
        showGlobe={true}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        // Atmosfera com glow verde intenso estilo Gradient Network
        showAtmosphere={true}
        atmosphereColor={GREEN_GLOW}
        atmosphereAltitude={0.25}
        // Hexágonos dos países - estilo cyberpunk/tech
        hexPolygonsData={countriesData}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonUseDots={false}
        hexPolygonColor={() => 'rgba(22, 163, 74, 0.35)'}
        hexPolygonAltitude={0.015}
        hexPolygonCurvatureResolution={3}
        // Pontos (marcadores) - nodes com glow intenso
        pointsData={points}
        pointAltitude={0.04}
        pointColor={(d: any) => hoveredPoint === d ? GREEN_GLOW : GREEN_COLOR}
        pointRadius={(d: any) => hoveredPoint === d ? 1.8 : (d.size === 50 ? 1.5 : 1.0)}
        pointResolution={32}
        pointLabel={(d: any) => d.name}
        onPointClick={(point: any, event: any) => handlePointClick(point, event)}
        onPointHover={(point: any) => setHoveredPoint(point || null)}
        onGlobeClick={(event: any) => {
          // Verificar se clicou em um ponto
          if (event.point) {
            handlePointClick(event.point, event)
          }
        }}
        // Desabilitar zoom com scroll
        enablePointerInteraction={true}
        controls={false}
        // Efeitos visuais nos pontos - glow máximo estilo Gradient
        pointsMerge={false}
        // Arcos (linhas) - conexões animadas estilo Gradient Network
        arcsData={selectedPoint && selectedPoint.name !== PORTO_ITAPOA.name
          ? arcs.filter((arc: any) =>
              Math.abs(arc.endLat - selectedPoint.lat) < 0.1 &&
              Math.abs(arc.endLng - selectedPoint.lng) < 0.1
            )
          : []}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={(arc: any) => [GREEN_COLOR, GREEN_GLOW]}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={1.5}
        arcAltitude={0.3}
        arcDashInitialGap={(e: any) => Math.random()}
        // Configurações gerais
        enablePointerInteraction={true}
        // Desabilitar controles de zoom com scroll
        controls={false}
        // Animações
        animateIn={true}
        // Controles
        onGlobeReady={() => {
          if (globeRef.current) {
            globeRef.current.pointOfView({ lat: -26, lng: -48, altitude: 0.4 }, 2000)
            // Permitir zoom apenas com Ctrl
            const canvas = globeRef.current.getGlobeCanvas()
            if (canvas) {
              canvas.style.touchAction = 'pan-x pan-y'
              canvas.addEventListener('wheel', (e: WheelEvent) => {
                // Permitir zoom apenas se Ctrl estiver pressionado
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }, { passive: false })
            }
          }
        }}
        // Estilo - fundo transparente para mostrar o background tech
        backgroundColor="rgba(0,0,0,0)"
      />
      {/* Tooltip no hover */}
      {hoveredPoint && !selectedPoint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-20 pointer-events-none"
          style={{
            left: '50%',
            top: '20%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-900">{hoveredPoint.name}</span>
            </div>
            <span className="text-xs text-green-600">{hoveredPoint.region}</span>
          </div>
        </motion.div>
      )}
      
      {/* Card com informações quando clicar - posicionado ao lado do marker */}
      <AnimatePresence mode="wait">
        {selectedPoint && cardPosition && (
          <motion.div
            key={selectedPoint.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-6 w-80 lg:w-96"
            style={{
              left: `${Math.min(cardPosition.x + 30, window.innerWidth - 400)}px`,
              top: `${Math.max(cardPosition.y - 150, 80)}px`,
              maxWidth: 'calc(100vw - 40px)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedPoint.name}</h3>
                  <span className="text-sm text-green-600 font-medium">{selectedPoint.region}</span>
                </div>
              </div>
              <button
                onClick={handleCloseCard}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              {selectedPoint.description}
            </p>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Serviços</span>
                <p className="text-sm text-gray-900 font-semibold">{selectedPoint.services}</p>
              </div>
              
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Armadores</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPoint.carriers?.map((carrier: string, index: number) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm"
                    >
                      {carrier}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

