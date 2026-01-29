"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { MapPin, Globe, Ship, Clock, Calendar, ArrowRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

// Importação dinâmica do Globe para evitar problemas de SSR
const GlobeComponent = dynamic(() => import("react-globe.gl"), { ssr: false })

// Cores
const BRAND_GREEN = "#16a34a" // green-600
const BRAND_DARK = "#1f2937" // gray-800
const COL_LAND = "#e5e7eb" // gray-200
const COL_HOVER = "#22c55e" // green-500

// Coordenadas do Porto Itapoá
const PORTO_ITAPOA = {
  lat: -26.1167,
  lng: -48.6167,
  name: "Porto Itapoá",
  region: "Brasil",
  description: "Terminal portuário de última geração localizado em Itapoá, SC.",
}

// Principais portos de destino (Dados)
const destinations = [
  {
    lat: 1.2897,
    lng: 103.8501,
    name: "Singapura",
    region: "Ásia",
    description: "Hub estratégico para o comércio asiático.",
    services: "3 serviços regulares",
    carriers: ["Maersk", "HMM", "PIL", "Cosco", "ONE"],
    transitTime: "28 dias",
    frequency: "Semanal"
  },
  {
    lat: 22.3193,
    lng: 114.1694,
    name: "Hong Kong",
    region: "Ásia",
    description: "Conexão direta com principais mercados.",
    services: "2 serviços regulares",
    carriers: ["Maersk", "HMM", "PIL", "Cosco"],
    transitTime: "32 dias",
    frequency: "Semanal"
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    name: "Tóquio",
    region: "Ásia",
    description: "Acesso direto ao mercado japonês.",
    services: "2 serviços regulares",
    carriers: ["ONE", "Maersk", "HMM"],
    transitTime: "35 dias",
    frequency: "Quinzenal"
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    name: "Xangai",
    region: "Ásia",
    description: "Maior porto do mundo em volume.",
    services: "3 serviços regulares",
    carriers: ["Cosco", "Maersk", "HMM", "ONE"],
    transitTime: "30 dias",
    frequency: "Semanal"
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    name: "Londres",
    region: "Europa",
    description: "Conexão com mercados europeus.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC"],
    transitTime: "18 dias",
    frequency: "Semanal"
  },
  {
    lat: 53.5511,
    lng: 9.9937,
    name: "Hamburgo",
    region: "Europa",
    description: "Hub importante para o norte europeu.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC"],
    transitTime: "20 dias",
    frequency: "Semanal"
  },
  {
    lat: 51.9225,
    lng: 4.4772,
    name: "Roterdã",
    region: "Europa",
    description: "Gateway estratégico central.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "Maersk", "MSC", "Cosco"],
    transitTime: "19 dias",
    frequency: "Semanal"
  },
  {
    lat: 41.3851,
    lng: 2.1734,
    name: "Barcelona",
    region: "Europa",
    description: "Conexão com o Mediterrâneo.",
    services: "2 serviços regulares",
    carriers: ["Hapag-Lloyd", "MSC", "CMA CGM"],
    transitTime: "16 dias",
    frequency: "Semanal"
  },
  {
    lat: 40.7128,
    lng: -74.0060,
    name: "Nova York",
    region: "América do Norte",
    description: "Hub da costa leste dos EUA.",
    services: "1 serviço regular",
    carriers: ["Maersk", "Hapag-Lloyd"],
    transitTime: "14 dias",
    frequency: "Semanal"
  },
  {
    lat: 33.6844,
    lng: -118.1378,
    name: "Los Angeles",
    region: "América do Norte",
    description: "Gateway da costa oeste.",
    services: "1 serviço regular",
    carriers: ["Maersk", "MSC", "ZIM"],
    transitTime: "22 dias",
    frequency: "Semanal"
  },
  {
    lat: 25.7617,
    lng: -80.1918,
    name: "Miami",
    region: "América do Norte",
    description: "Conexão rápida com a Flórida.",
    services: "1 serviço regular",
    carriers: ["Maersk", "MSC"],
    transitTime: "12 dias",
    frequency: "Semanal"
  },
]

// Pontos
const points = [
  { ...PORTO_ITAPOA, size: 1.5, color: BRAND_DARK },
  ...destinations.map((dest) => ({ ...dest, size: 0.8, color: BRAND_GREEN })),
]

interface InteractiveGlobeProps {
  className?: string
  title?: string
  description?: string
}

export function InteractiveGlobe({ className = "", title, description }: InteractiveGlobeProps) {
  const globeRef = useRef<any>(null)
  const [selectedPoint, setSelectedPoint] = useState<any>(null)
  const [countriesData, setCountriesData] = useState<any[]>([])

  // Carregar dados GeoJSON dos países
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then((data: any) => {
        setCountriesData(data.features)
      })
      .catch(err => console.warn('Erro ao carregar países:', err))
  }, [])

  // Inicializar câmera focada no Porto Itapoá e manter fixa
  useEffect(() => {
    if (globeRef.current) {
      // Foco fixo em Porto Itapoá (Brasil), levemente afastado para ver as conexões
      globeRef.current.pointOfView({ lat: -20, lng: -50, altitude: 1.8 }, 1000)
    }
  }, [])

  const handlePointSelect = (point: any) => {
    setSelectedPoint(point)
    // NÃO mudar o ponto de vista da câmera (globeRef.current.pointOfView).
    // O usuário pediu para "ficar ampliado na localização do porto".
    // Apenas selecionamos o ponto para exibir a linha e os detalhes.
    
    // Se quiser garantir que a câmera volta para o porto caso o usuário tenha mexido:
    if (globeRef.current) {
       globeRef.current.pointOfView({ lat: -20, lng: -50, altitude: 1.8 }, 1000)
    }
  }

  return (
    <div className={`relative flex flex-col lg:flex-row h-full w-full bg-white ${className}`}>
      
      {/* Side Panel (Left) - Navigation List */}
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-100 flex flex-col relative z-20 shadow-lg lg:shadow-none h-1/2 lg:h-full overflow-hidden">
        <div className="p-8 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
              {title || "Rotas Comerciais"}
            </h2>
            <p className="text-sm text-gray-500">
              Selecione um destino para ver a conexão.
            </p>
        </div>

        {/* List of Destinations */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4 scrollbar-thin scrollbar-thumb-gray-200">
           {destinations.map((dest) => {
             const isSelected = selectedPoint?.name === dest.name
             return (
               <div 
                 key={dest.name}
                 onClick={() => handlePointSelect(dest)}
                 className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 group ${
                   isSelected 
                     ? "bg-green-50 border-green-200 shadow-sm" 
                     : "bg-white border-gray-100 hover:border-green-200 hover:bg-gray-50"
                 }`}
               >
                 <div className="flex items-center justify-between mb-2">
                   <h3 className={`font-bold ${isSelected ? "text-green-800" : "text-gray-700 group-hover:text-gray-900"}`}>
                     {dest.name}
                   </h3>
                   <span className={`text-xs px-2 py-0.5 rounded-full ${
                     isSelected ? "bg-white text-green-700" : "bg-gray-100 text-gray-500"
                   }`}>
                     {dest.region}
                   </span>
                 </div>
                 
                 {isSelected && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     className="text-sm text-gray-600 space-y-2 mt-2"
                   >
                     <p className="text-xs leading-relaxed border-l-2 border-green-400 pl-2">
                       {dest.description}
                     </p>
                     <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-green-100/50">
                        <div>
                          <span className="block text-gray-400">Trânsito</span>
                          <span className="font-medium text-gray-800">{dest.transitTime}</span>
                        </div>
                        <div>
                          <span className="block text-gray-400">Frequência</span>
                          <span className="font-medium text-gray-800">{dest.frequency}</span>
                        </div>
                     </div>
                   </motion.div>
                 )}
               </div>
             )
           })}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-400 text-center">
          <div className="flex items-center justify-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             Conectado ao Porto Itapoá
          </div>
        </div>
      </div>

      {/* Map Area (Right) */}
      <div className="w-full lg:w-2/3 xl:w-3/4 h-1/2 lg:h-full relative bg-white cursor-grab active:cursor-grabbing">
         {/* Gradient Overlay */}
         <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-24 hidden lg:block pointer-events-none"></div>
         
         <GlobeComponent
            ref={globeRef}
            width={undefined}
            height={undefined}
            backgroundColor="rgba(255, 255, 255, 1)"

            globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"

            polygonsData={countriesData}
            polygonAltitude={0.008}
            polygonCapColor={() => COL_LAND}
            polygonSideColor={() => "rgba(200, 200, 200, 0.5)"}
            polygonStrokeColor={() => "#e5e7eb"}
            onPolygonHover={() => {}}

            pointsData={points}
            pointAltitude={0.02}
            pointColor="color"
            pointRadius={(d: any) => (d.name === selectedPoint?.name ? 1.5 : (d.name === "Porto Itapoá" ? 1.2 : 0.6))}
            pointResolution={16}
            onPointClick={handlePointSelect}

            // Labels para origem e destino
            labelsData={selectedPoint ? [
              { ...PORTO_ITAPOA, label: "PORTO ITAPOÁ", size: 1.2, color: BRAND_DARK },
              { ...selectedPoint, label: selectedPoint.name.toUpperCase(), size: 1.0, color: BRAND_GREEN }
            ] : [
              { ...PORTO_ITAPOA, label: "PORTO ITAPOÁ", size: 1.2, color: BRAND_DARK }
            ]}
            labelLat={(d: any) => d.lat}
            labelLng={(d: any) => d.lng}
            labelText={(d: any) => d.label}
            labelSize={(d: any) => d.size}
            labelColor={(d: any) => d.color}
            labelResolution={2}
            labelAltitude={0.03}
            labelDotRadius={0.4}
            labelDotOrientation={() => "bottom" as const}

            // Arcos (Linhas tracejadas)
            // Mostra arcos apenas para o ponto selecionado, conectando a Itapoá
            arcsData={selectedPoint ? [{
              startLat: PORTO_ITAPOA.lat,
              startLng: PORTO_ITAPOA.lng,
              endLat: selectedPoint.lat,
              endLng: selectedPoint.lng,
              color: [BRAND_GREEN, "#3b82f6"]
            }] : []}
            arcColor="color"
            arcDashLength={0.5}
            arcDashGap={0.2}
            arcDashAnimateTime={1500}
            arcStroke={1.5}
            arcAltitude={0.25}

            enableZoom={false}
            enableGlobeGlow={false}
         />
      </div>
    </div>
  )
}
