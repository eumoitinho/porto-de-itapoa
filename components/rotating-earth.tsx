"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, RotateCcw, ZoomIn, ZoomOut, Play, Pause } from "lucide-react"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

interface PortLocation {
  name: string
  lat: number
  lng: number
  services: ServiceInfo[]
}

interface ServiceInfo {
  serviceName: string
  carriers: string[]
  coverage: string
  frequency: string
  transitDays?: { import?: number; export?: number }
}

const portLocations: PortLocation[] = [
  { name: "Santos", lat: -23.9608, lng: -46.3331, services: [] },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, services: [] },
  { name: "Itapoá", lat: -26.1267, lng: -48.6236, services: [] },
  { name: "Paranaguá", lat: -25.5163, lng: -48.5298, services: [] },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, services: [] },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645, services: [] },
  { name: "Rio Grande", lat: -32.035, lng: -52.0986, services: [] },
  { name: "Salvador", lat: -12.9714, lng: -38.5014, services: [] },
  { name: "Suape", lat: -8.3927, lng: -34.9534, services: [] },
  { name: "Pecém", lat: -3.5417, lng: -38.8164, services: [] },
  { name: "Callao", lat: -12.0464, lng: -77.1428, services: [] },
  { name: "Guayaquil", lat: -2.17, lng: -79.9224, services: [] },
  { name: "San Antonio", lat: -33.5935, lng: -71.6155, services: [] },
  { name: "Cartagena", lat: 10.3997, lng: -75.5144, services: [] },
  { name: "Houston", lat: 29.7604, lng: -95.3698, services: [] },
  { name: "New York", lat: 40.7128, lng: -74.006, services: [] },
  { name: "Miami", lat: 25.7617, lng: -80.1918, services: [] },
  { name: "Veracruz", lat: 19.1738, lng: -96.1342, services: [] },
  { name: "Rotterdam", lat: 51.9225, lng: 4.47917, services: [] },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937, services: [] },
  { name: "Antwerp", lat: 51.2194, lng: 4.4025, services: [] },
  { name: "Valencia", lat: 39.4699, lng: -0.3763, services: [] },
  { name: "Barcelona", lat: 41.3874, lng: 2.1686, services: [] },
  { name: "Genoa", lat: 44.4056, lng: 8.9463, services: [] },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, services: [] },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694, services: [] },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737, services: [] },
  { name: "Busan", lat: 35.1796, lng: 129.0756, services: [] },
]

const PORTO_ITAPOA: PortLocation = { name: "Itapoá", lat: -26.1267, lng: -48.6236, services: [] }

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const projectionRef = useRef<d3.GeoProjection | null>(null)
  const rotationRef = useRef<[number, number]>([0, 0])
  const selectedPortRef = useRef<PortLocation | null>(null)
  const connectionLineRef = useRef<{ from: PortLocation; to: PortLocation; progress: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPort, setSelectedPort] = useState<PortLocation | null>(null)
  const [isRotating, setIsRotating] = useState(true)
  const [connectionLine, setConnectionLine] = useState<{ from: PortLocation; to: PortLocation; progress: number } | null>(null)
  
  // Sincronizar refs com state
  useEffect(() => {
    selectedPortRef.current = selectedPort
  }, [selectedPort])
  
  useEffect(() => {
    connectionLineRef.current = connectionLine
  }, [connectionLine])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const getAvailableSize = () => {
      const parent = canvas.parentElement as HTMLElement | null
      const availableWidth = parent?.clientWidth ?? window.innerWidth
      const availableHeight = parent?.clientHeight ?? window.innerHeight
      return { width: Math.max(availableWidth, width), height: Math.max(availableHeight, height) }
    }

    const projection = d3
      .geoOrthographic()
      .scale(1)
      .translate([0, 0])
      .clipAngle(90)
    
    projectionRef.current = projection

    const path = d3.geoPath().projection(projection).context(context)
    let baseRadius = 1
    let containerWidth = 1
    let containerHeight = 1

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) if (pointInPolygon(point, coordinates[i])) return false
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) if (pointInPolygon(point, polygon[i])) inHole = true
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const p: [number, number] = [lng, lat]
          if (pointInFeature(p, feature)) dots.push(p)
        }
      }
      return dots
    }

    interface DotData { lng: number; lat: number; visible: boolean }
    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const scaleFactor = baseRadius > 0 ? currentScale / baseRadius : 1

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#000000"
      context.fill()
      context.strokeStyle = "#166534"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath(); path(graticule())
        context.strokeStyle = "#166534"; context.lineWidth = 1 * scaleFactor; context.globalAlpha = 0.25; context.stroke(); context.globalAlpha = 1

        context.beginPath(); landFeatures.features.forEach((f: any) => { path(f) })
        context.strokeStyle = "#166534"; context.lineWidth = 1 * scaleFactor; context.stroke()

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (projected && projected[0] >= 0 && projected[0] <= containerWidth && projected[1] >= 0 && projected[1] <= containerHeight) {
            context.beginPath(); context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#166534"; context.fill()
          }
        })

        // Desenhar linha de conexão animada se houver (great circle)
        const currentConnectionLine = connectionLineRef.current
        if (currentConnectionLine) {
          const from = currentConnectionLine.from
          const to = currentConnectionLine.to
          
          // Calcular pontos para great circle (rota mais curta na esfera)
          const numPoints = 100
          const points: [number, number][] = []
          for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints
            const interpolated = d3.geoInterpolate(
              [from.lng, from.lat],
              [to.lng, to.lat]
            )(t)
            points.push(interpolated)
          }
          
          // Desenhar linha completa (fina, cinza) - great circle
          const projectedPoints = points.map(p => projection(p)).filter(p => p !== null) as [number, number][]
          if (projectedPoints.length > 1) {
            context.beginPath()
            context.moveTo(projectedPoints[0][0], projectedPoints[0][1])
            for (let i = 1; i < projectedPoints.length; i++) {
              context.lineTo(projectedPoints[i][0], projectedPoints[i][1])
            }
            context.strokeStyle = "rgba(107, 114, 128, 0.3)"
            context.lineWidth = 1 * scaleFactor
            context.stroke()
          }
          
          // Desenhar linha animada até o progresso atual
          const progress = currentConnectionLine.progress
          const currentPointIndex = Math.floor(progress * numPoints)
          
          if (currentPointIndex > 0) {
            context.beginPath()
            const startPoint = projection([from.lng, from.lat])
            if (startPoint) {
              context.moveTo(startPoint[0], startPoint[1])
              
              for (let i = 1; i <= currentPointIndex; i++) {
                const point = projection(points[i])
                if (point) {
                  context.lineTo(point[0], point[1])
                }
              }
              
              // Se ainda está animando, adicionar ponto parcial
              if (progress < 1 && currentPointIndex < numPoints) {
                const partialT = (progress * numPoints) - currentPointIndex
                const nextPoint = projection(points[currentPointIndex + 1])
                const currentPoint = projection(points[currentPointIndex])
                if (currentPoint && nextPoint) {
                  const partialX = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * partialT
                  const partialY = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * partialT
                  context.lineTo(partialX, partialY)
                }
              }
              
              context.strokeStyle = "#22c55e"
              context.lineWidth = 2 * scaleFactor
              context.setLineDash([5 * scaleFactor, 5 * scaleFactor])
              context.stroke()
              context.setLineDash([])
              
              // Desenhar ponto animado na linha
              const currentPoint = progress < 1 && currentPointIndex < numPoints
                ? (() => {
                    const partialT = (progress * numPoints) - currentPointIndex
                    const curr = projection(points[currentPointIndex])
                    const next = projection(points[currentPointIndex + 1])
                    if (curr && next) {
                      return [curr[0] + (next[0] - curr[0]) * partialT, curr[1] + (next[1] - curr[1]) * partialT]
                    }
                    return null
                  })()
                : projection(points[currentPointIndex])
              
              if (currentPoint) {
                context.beginPath()
                context.arc(currentPoint[0], currentPoint[1], 3 * scaleFactor, 0, 2 * Math.PI)
                context.fillStyle = "#22c55e"
                context.fill()
                context.strokeStyle = "#ffffff"
                context.lineWidth = 1 * scaleFactor
                context.stroke()
              }
            }
          }
        }

        portLocations.forEach((port) => {
          const coords = projection([port.lng, port.lat])
          if (coords) {
            const [x, y] = coords
            const distance = d3.geoDistance([port.lng, port.lat], projection.invert!([containerWidth / 2, containerHeight / 2]))
            if (distance < Math.PI / 2) {
              const currentSelectedPort = selectedPortRef.current
              const isSelected = currentSelectedPort?.name === port.name
              const isItapoa = port.name === "Itapoá"
              
              // Portos normais
              context.beginPath()
              context.arc(x, y, (isSelected ? 6 : 4) * scaleFactor, 0, 2 * Math.PI)
              context.fillStyle = isItapoa ? "#16a34a" : (isSelected ? "#22c55e" : "#22c55e")
              context.fill()
              context.strokeStyle = isSelected ? "#ffffff" : "#166534"
              context.lineWidth = (isSelected ? 2 : 1.5) * scaleFactor
              context.stroke()
              
              // Nome do porto
              context.fillStyle = "#ffffff"
              context.font = `${(isSelected ? 11 : 10) * scaleFactor}px sans-serif`
              context.textAlign = "center"
              context.textBaseline = "bottom"
              context.fillText(port.name, x, y - (isSelected ? 8 : 6) * scaleFactor)
            }
          }
        })
      }
    }

    const resizeCanvas = () => {
      const { width: availableWidth, height: availableHeight } = getAvailableSize()
      containerWidth = availableWidth
      containerHeight = availableHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = containerWidth * dpr
      canvas.height = containerHeight * dpr
      canvas.style.width = `${containerWidth}px`
      canvas.style.height = `${containerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Aumentar o tamanho do globo (divisor menor = globo maior)
      baseRadius = Math.min(containerWidth, containerHeight) / 2.2
      projection
        .scale(baseRadius)
        .translate([containerWidth / 2, containerHeight / 2])
      render()
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json")
        if (!response.ok) throw new Error("Failed to load land data")
        landFeatures = await response.json()
        landFeatures.features.forEach((f: any) => {
          const dots = generateDotsInPolygon(f, 16)
          dots.forEach(([lng, lat]) => allDots.push({ lng, lat, visible: true }))
        })
        render(); setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data"); setIsLoading(false)
      }
    }

    rotationRef.current = [0, 0]
    let autoRotate = isRotating
    const rotationSpeed = 0.05 // Velocidade reduzida
    const rotate = () => { 
      if (autoRotate && isRotating) { 
        rotationRef.current[0] += rotationSpeed
        projection.rotate(rotationRef.current)
        render()
      }
    }
    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      setIsRotating(false)
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotationRef.current]
      const handleMouseMove = (move: MouseEvent) => {
        const sensitivity = 0.5
        const dx = move.clientX - startX
        const dy = move.clientY - startY
        rotationRef.current[0] = startRotation[0] + dx * sensitivity
        rotationRef.current[1] = Math.max(-90, Math.min(90, startRotation[1] - dy * sensitivity))
        projection.rotate(rotationRef.current)
        render()
      }
      const handleMouseUp = () => { 
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        // Não retoma rotação automaticamente após arrastar
      }
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      for (const port of portLocations) {
        const coords = projection([port.lng, port.lat])
        if (coords) {
          const [px, py] = coords
          const distance = d3.geoDistance([port.lng, port.lat], projection.invert!([containerWidth / 2, containerHeight / 2]))
          if (distance < Math.PI / 2) {
            const dx = x - px
            const dy = y - py
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 15) {
              setSelectedPort(port)
              
              // Se não for Itapoá, criar linha de conexão animada
              if (port.name !== "Itapoá") {
                setConnectionLine({ from: PORTO_ITAPOA, to: port, progress: 0 })
              } else {
                setConnectionLine(null)
              }
              
              render()
              return
            }
          }
        }
      }
      
      // Se clicou fora, limpar seleção
      setSelectedPort(null)
      setConnectionLine(null)
      render()
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(baseRadius * 0.5, Math.min(baseRadius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius); render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("wheel", handleWheel)
    resizeCanvas()
    loadWorldData()
    window.addEventListener("resize", resizeCanvas)
    
    // Re-renderizar quando connectionLine mudar (para animação)
    const renderInterval = setInterval(() => {
      if (connectionLineRef.current) {
        render()
      }
    }, 16) // ~60fps
    
    return () => { 
      rotationTimer.stop()
      clearInterval(renderInterval)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("wheel", handleWheel)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [width, height, isRotating])
  
  // Animar linha de conexão
  useEffect(() => {
    if (!connectionLine) return
    
    const duration = 2000 // 2 segundos
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      setConnectionLine(prev => {
        if (!prev) return null
        return { ...prev, progress }
      })
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    const animationId = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [connectionLine?.from.name, connectionLine?.to.name])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  const handleReset = () => {
    rotationRef.current = [0, 0]
    if (projectionRef.current) {
      projectionRef.current.rotate([0, 0])
    }
    setSelectedPort(null)
    setConnectionLine(null)
    // Forçar re-render chamando resizeCanvas que chama render
    if (canvasRef.current) {
      const event = new Event('resize')
      window.dispatchEvent(event)
    }
  }

  const handleZoom = (direction: 'in' | 'out') => {
    // Zoom será controlado pelo wheel, mas podemos adicionar botões se necessário
  }

  const calculateDistance = (port: PortLocation) => {
    if (!selectedPort || port.name === "Itapoá") return null
    const distance = d3.geoDistance(
      [PORTO_ITAPOA.lng, PORTO_ITAPOA.lat],
      [port.lng, port.lat]
    )
    // Converter radianos para km (raio da Terra ~6371 km)
    return Math.round(distance * 6371)
  }

  return (
    <div className={`relative flex gap-6 ${className}`}>
      {/* Painel Lateral Esquerdo */}
      <Card className="w-80 flex-shrink-0 h-full bg-white border border-gray-200 shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Conexões Globais
          </CardTitle>
          <CardDescription className="text-gray-600">
            Explore as conexões do Porto de Itapoá
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Controles */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRotating(!isRotating)}
                className="flex-1"
              >
                {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-2">{isRotating ? "Pausar" : "Rotacionar"}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="ml-2">Resetar</span>
              </Button>
            </div>
          </div>

          {/* Informações do Porto Selecionado */}
          {selectedPort ? (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{selectedPort.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Latitude:</span>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono">
                      {selectedPort.lat.toFixed(4)}°
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Longitude:</span>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-mono">
                      {selectedPort.lng.toFixed(4)}°
                    </Badge>
                  </div>
                  {selectedPort.name !== "Itapoá" && (
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Distância:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        {calculateDistance(selectedPort)} km
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {selectedPort.name !== "Itapoá" && connectionLine && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Conexão com Porto de Itapoá</span>
                  </div>
                </div>
              )}

              {selectedPort.name === "Itapoá" && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Porto de Itapoá é o ponto central de conexão para todas as rotas marítimas.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Clique em um porto no globo para ver informações
              </p>
            </div>
          )}

          {/* Lista de Portos */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-sm text-gray-700 mb-3">Portos Conectados</h4>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {portLocations.filter(p => p.name !== "Itapoá").map((port) => (
                <button
                  key={port.name}
                  onClick={() => {
                    setSelectedPort(port)
                    if (port.name !== "Itapoá") {
                      setConnectionLine({ from: PORTO_ITAPOA, to: port, progress: 0 })
                    } else {
                      setConnectionLine(null)
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedPort?.name === port.name
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{port.name}</span>
                    {selectedPort?.name === port.name && (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Globo */}
      <div className="flex-1 relative flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab"
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600 text-sm">Carregando mapa...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


