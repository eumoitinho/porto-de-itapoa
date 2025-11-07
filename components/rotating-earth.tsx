"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPort, setSelectedPort] = useState<PortLocation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

        portLocations.forEach((port) => {
          const coords = projection([port.lng, port.lat])
          if (coords) {
            const [x, y] = coords
            const distance = d3.geoDistance([port.lng, port.lat], projection.invert!([containerWidth / 2, containerHeight / 2]))
            if (distance < Math.PI / 2) {
              context.beginPath(); context.arc(x, y, 4 * scaleFactor, 0, 2 * Math.PI)
              context.fillStyle = "#22c55e"; context.fill(); context.strokeStyle = "#166534"; context.lineWidth = 1.5 * scaleFactor; context.stroke()
              context.fillStyle = "#ffffff"; context.font = `${10 * scaleFactor}px sans-serif`; context.textAlign = "center"; context.textBaseline = "bottom"
              context.fillText(port.name, x, y - 6 * scaleFactor)
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

    const rotation: [number, number] = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.15
    const rotate = () => { if (autoRotate) { rotation[0] += rotationSpeed; projection.rotate(rotation); render() } }
    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX; const startY = event.clientY; const startRotation = [...rotation]
      const handleMouseMove = (move: MouseEvent) => {
        const sensitivity = 0.5
        const dx = move.clientX - startX; const dy = move.clientY - startY
        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - dy * sensitivity))
        projection.rotate(rotation); render()
      }
      const handleMouseUp = () => { document.removeEventListener("mousemove", handleMouseMove); document.removeEventListener("mouseup", handleMouseUp); setTimeout(() => { autoRotate = true }, 10) }
      document.addEventListener("mousemove", handleMouseMove); document.addEventListener("mouseup", handleMouseUp)
    }

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top
      for (const port of portLocations) {
        const coords = projection([port.lng, port.lat])
        if (coords) {
          const [px, py] = coords
          const distance = d3.geoDistance([port.lng, port.lat], projection.invert!([containerWidth / 2, containerHeight / 2]))
          if (distance < Math.PI / 2) {
            const dx = x - px; const dy = y - py; const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 10) { setSelectedPort(port); setIsModalOpen(true); return }
          }
        }
      }
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
    return () => { rotationTimer.stop(); canvas.removeEventListener("mousedown", handleMouseDown); canvas.removeEventListener("click", handleClick); canvas.removeEventListener("wheel", handleWheel); window.removeEventListener("resize", resizeCanvas) }
  }, [width, height])

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

  return (
    <>
      <div className={`relative flex items-center justify-center ${className}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab"
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">{selectedPort?.name}</DialogTitle>
            <DialogDescription className="text-gray-600">
              Port Location: {selectedPort?.lat.toFixed(4)}°, {selectedPort?.lng.toFixed(4)}°
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg text-emerald-700 mb-2">Shipping Routes & Services</h3>
              <div className="text-sm text-gray-600 mb-4">
                This port is part of major international shipping routes connecting South America with North America, Europe, and Asia.
              </div>
            </div>
            <div className="grid gap-3">
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <h4 className="font-medium text-gray-900">South America Routes (CONOSUR)</h4>
                <p className="text-sm text-gray-600 mt-1">Carriers: Maersk, Hapag Lloyd</p>
                <p className="text-sm text-gray-500">Coverage: East & West Coast South America • Weekly Service</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <h4 className="font-medium text-gray-900">North America Routes</h4>
                <p className="text-sm text-gray-600 mt-1">Carriers: Maersk, Hapag Lloyd, ZIM, MSC</p>
                <p className="text-sm text-gray-500">Coverage: US East Coast & Gulf of Mexico • Weekly Service</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <h4 className="font-medium text-gray-900">Europe Routes</h4>
                <p className="text-sm text-gray-600 mt-1">Carriers: Maersk, MSC, Hapag Lloyd, CMA CGM</p>
                <p className="text-sm text-gray-500">Coverage: Northern Europe & Mediterranean • Weekly Service</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <h4 className="font-medium text-gray-900">Asia Routes</h4>
                <p className="text-sm text-gray-600 mt-1">Carriers: Maersk, CMA CGM, COSCO, HMM, ONE, Evergreen</p>
                <p className="text-sm text-gray-500">Coverage: Major Asian ports • Weekly Service • 28-47 days transit</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <h4 className="font-medium text-gray-900">Cabotage (Coastal)</h4>
                <p className="text-sm text-gray-600 mt-1">Carriers: Aliança, Mercosul Line</p>
                <p className="text-sm text-gray-500">Coverage: Brazilian Coast • Weekly Service</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


