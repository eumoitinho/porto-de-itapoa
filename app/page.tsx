"use client"

import { motion } from "framer-motion"
import { ArrowRight, Ship, Globe, Users, TrendingUp, MapPin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

const stats = [
  { icon: Ship, label: "TEUs/ano", value: "1.2M", description: "Capacidade anual de movimentação" },
  { icon: Globe, label: "Navios/mês", value: "180", description: "Movimentação mensal média" },
  { icon: Users, label: "Área total", value: "2.3M m²", description: "Área total do terminal" },
  { icon: TrendingUp, label: "Calado", value: "17m", description: "Profundidade máxima do berço" },
]

const featuredServices = [
  {
    title: "Ásia",
    routes: "3 serviços regulares",
    description: "Conexões diretas com principais portos asiáticos",
    carriers: ["Maersk", "HMM", "ONE", "COSCO"],
  },
  {
    title: "Europa",
    routes: "3 serviços regulares",
    description: "Acesso aos principais hubs europeus",
    carriers: ["Hapag-Lloyd", "MSC", "OOCL"],
  },
  {
    title: "América do Norte",
    routes: "1 serviço regular",
    description: "Costa leste americana e Golfo do México",
    carriers: ["Maersk", "Hapag-Lloyd"],
  },
  {
    title: "Cabotagem",
    routes: "3 serviços regulares",
    description: "Conectividade nacional completa",
    carriers: ["Aliança", "Maersk", "CMA CGM"],
  },
]

// Video Background Component
function VideoBackground() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isClient || isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/placeholder.jpg"
          alt="Porto Itapoá"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-900/50 to-green-900/70"></div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback background */}
      <Image
        src="/placeholder.jpg"
        alt="Porto Itapoá"
        fill
        className="object-cover"
        priority
      />
      
      {/* Video element */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/placeholder.jpg"
      >
        <source src="/porto-video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-900/40 to-green-900/60"></div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Estilo Motin Films */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground />

        <div className="container mx-auto px-6 z-20 relative text-center">
          <div className="max-w-5xl mx-auto">
            

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight text-white"
            >
              Gateway da
              <br />
              <span className="font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                América Latina
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 text-gray-200 font-light leading-relaxed"
            >
              Conectamos o Brasil ao mundo com eficiência, tecnologia e sustentabilidade
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-12 py-6 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-3"
                >
                  Conheça nossos serviços
                  <ArrowRight size={20} />
                </Button>
              </Link>
              
              <Link href="/contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-900 rounded-full px-12 py-6 text-xl font-medium transition-all duration-300 bg-transparent"
                >
                  Fale conosco
                </Button>
              </Link>
            </motion.div>

            
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light text-green-900 mb-6">Números que Impressionam</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dados que demonstram nossa capacidade e eficiência operacional no cenário portuário brasileiro
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <stat.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-4xl font-bold text-green-900 mb-3">{stat.value}</h3>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light text-green-900 mb-6">Serviços Marítimos Regulares</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectamos o Brasil aos principais mercados mundiais através de parcerias com os maiores armadores globais
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-green-900 mb-3">{service.title}</h3>
                    <p className="text-green-600 font-semibold mb-4">{service.routes}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Principais Armadores:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.carriers.slice(0, 3).map((carrier) => (
                          <span
                            key={carrier}
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                          >
                            {carrier}
                          </span>
                        ))}
                        {service.carriers.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{service.carriers.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-12 py-6 text-xl border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 bg-transparent font-semibold"
              >
                Ver Portfólio Completo
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-light text-green-900 mb-8">Localização Estratégica</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Situado no litoral norte de Santa Catarina, o Porto Itapoá oferece acesso privilegiado aos principais
                mercados do Mercosul e conexões diretas com os maiores portos mundiais.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full mr-4 mt-1 flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Acesso Rodoviário Direto</h4>
                    <p className="text-gray-600">
                      Conexão direta com a BR-101, principal rodovia do litoral brasileiro
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full mr-4 mt-1 flex items-center justify-center">
                    <Globe className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Proximidade com Grandes Centros</h4>
                    <p className="text-gray-600">
                      Localização estratégica próxima aos principais centros urbanos e industriais
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full mr-4 mt-1 flex items-center justify-center">
                    <Ship className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Calado Natural Profundo</h4>
                    <p className="text-gray-600">17 metros de calado natural, permitindo receber os maiores navios</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-gray-800">Endereço</span>
                </div>
                <p className="text-gray-600 mb-2">Av. Beira Mar 5, 2900 Figueira do Pontal</p>
                <p className="text-gray-600">Itapoá/SC - Brasil</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <Image
                  src="/placeholder.jpg"
                  alt="Vista aérea do Porto Itapoá"
                  width={700}
                  height={500}
                  className="rounded-2xl w-full"
                />
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Terminal Portuário de Itapoá</h4>
                  <p className="text-gray-600">Vista aérea das instalações modernas e eficientes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-green-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-5xl font-light mb-8">Pronto para Conectar seu Negócio ao Mundo?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
              Entre em contato conosco e descubra como o Porto Itapoá pode otimizar sua cadeia logística com nossos
              serviços marítimos regulares e infraestrutura de classe mundial.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contato">
                <Button
                  size="lg"
                  className="bg-white text-green-900 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Fale Conosco
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-900 rounded-full px-12 py-6 text-xl font-semibold transition-all duration-300 bg-transparent"
                >
                  Ver Serviços Completos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}