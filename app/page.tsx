"use client"

import { motion } from "framer-motion"
import { ArrowRight, Ship, Globe, Users, TrendingUp, MapPin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n/context"

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
  {
    title: "Mediterrâneo",
    routes: "2 serviços regulares",
    description: "Conexões com portos do Mediterrâneo",
    carriers: ["Hapag-Lloyd", "MSC", "CMA CGM"],
  },
  {
    title: "Golfo do México",
    routes: "2 serviços regulares",
    description: "Acesso ao Golfo do México e Costa Leste dos EUA",
    carriers: ["Maersk", "MSC", "ZIM"],
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
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-green-800/30 to-green-900/50"></div>
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
      
      {/* Overlay com opacidade reduzida */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/45 via-green-800/35 to-green-900/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-transparent to-green-900/30"></div>
      <div className="absolute inset-0 bg-black/15"></div>
    </div>
  )
}

export default function HomePage() {
  const { t } = useI18n()

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
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight text-white"
              style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)' }}
            >
              {t('heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 text-white font-light leading-relaxed"
              style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
            >
              {t('heroSubtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-medium transition-all duration-500 hover:scale-105 shadow-2xl border-2 border-green-400/30 backdrop-blur-sm"
                >
                  {t('knowOurServices')}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              
              <Link href="/contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/80 text-white hover:bg-white/20 hover:text-white rounded-full px-12 py-6 text-xl font-medium transition-all duration-500 bg-white/10 backdrop-blur-md hover:backdrop-blur-lg hover:border-white"
                >
                  {t('contactUs')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 drop-shadow-lg">Role para baixo</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/80 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light text-green-900 mb-6">{t('impressiveNumbers')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('statsDescription')}
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
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)"
                }}
                className="group"
              >
                <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl h-full hover:shadow-xl transition-all duration-500 group-hover:border-green-300">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-4xl font-bold text-green-900 mb-3 group-hover:text-green-700 transition-colors">{stat.value}</h3>
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light text-green-900 mb-6">{t('regularMaritimeServices')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('servicesDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)"
                }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200 shadow-lg rounded-2xl h-full hover:shadow-xl transition-all duration-500 group-hover:border-green-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
                        <Ship className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-900 group-hover:text-green-700 transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-green-600 font-semibold mb-4">{service.routes}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Principais Armadores:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.carriers.slice(0, 3).map((carrier) => (
                          <span
                            key={carrier}
                            className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-xs font-medium border border-green-200 group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-300"
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-12 py-6 text-xl border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-500 bg-transparent font-semibold shadow-lg hover:shadow-xl"
                >
                  {t('seeCompletePortfolio')}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-green-50/50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-light text-green-900 mb-8">{t('strategicLocation')}</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('locationDescription')}
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: MapPin,
                    title: t('directRoadAccess'),
                    description: t('roadAccessDescription')
                  },
                  {
                    icon: Globe,
                    title: t('proximityToCenters'), 
                    description: t('proximityDescription')
                  },
                  {
                    icon: Ship,
                    title: t('deepNaturalDraft'),
                    description: t('draftDescription')
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mr-4 mt-1 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
                      <item.icon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="bg-gradient-to-br from-white to-green-50/50 rounded-2xl p-6 shadow-lg border border-green-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-gray-800">{t('address')}</span>
                </div>
                <p className="text-gray-600 mb-2">Av. Beira Mar 5, 2900 Figueira do Pontal</p>
                <p className="text-gray-600">Itapoá/SC - Brasil</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl p-8 shadow-xl border border-green-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/foto-porto-patio-1024x721.webp"
                  alt="Vista aérea do Porto Itapoá"
                  width={700}
                  height={500}
                  className="rounded-2xl w-full"
                />
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Terminal Portuário de Itapoá</h4>
                  <p className="text-gray-600">Vista aérea das instalações modernas e eficientes</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-green-800 to-emerald-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-5xl font-light mb-8 drop-shadow-lg">{t('readyToConnect')}</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90 drop-shadow">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contato">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-green-900 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-semibold transition-all duration-500 hover:scale-105 shadow-xl"
                  >
                    {t('contactUs')}
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/20 hover:text-white rounded-full px-12 py-6 text-xl font-semibold transition-all duration-500 bg-white/10 backdrop-blur-md"
                  >
                    {t('seeCompleteServices')}
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}