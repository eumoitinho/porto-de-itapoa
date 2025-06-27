"use client"

import { motion } from "framer-motion"
import { ArrowRight, Ship, Globe, Users, TrendingUp, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/kvhDJrbeEKE?autoplay=1&mute=1&loop=1&playlist=kvhDJrbeEKE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            className="video-background"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="video-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-8 max-w-6xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/20">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-light text-green-800 mb-4 tracking-tight">PORTO ITAPOÁ</h1>
              <h2 className="text-3xl md:text-4xl font-light text-green-700 mb-6">PORTFÓLIO DE SERVIÇOS MARÍTIMOS</h2>
              <div className="text-2xl md:text-3xl font-bold text-green-800 mb-8">2025</div>
            </div>

            <div className="border-t border-green-200 pt-8 mb-8">
              <p className="text-xl md:text-2xl text-green-700 font-medium mb-4">BUILDING THE FUTURE</p>
              <div className="flex flex-wrap justify-center gap-4 text-lg text-green-600">
                <span>CONSTRUINDO O FUTURO</span>
                <span>•</span>
                <span>CONSTRUIRE L'AVENIR</span>
                <span>•</span>
                <span>建设未来</span>
              </div>
            </div>

            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-12 py-6 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Conheça Nossos Serviços
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </motion.div>
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
            <h2 className="text-5xl font-light text-green-800 mb-6">Números que Impressionam</h2>
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
                    <h3 className="text-4xl font-bold text-green-800 mb-3">{stat.value}</h3>
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
            <h2 className="text-5xl font-light text-green-800 mb-6">Serviços Marítimos Regulares</h2>
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
                    <h3 className="text-2xl font-bold text-green-800 mb-3">{service.title}</h3>
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
              <h2 className="text-5xl font-light text-green-800 mb-8">Localização Estratégica</h2>
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
                  src="/foto-porto-patio-1024x721.webp"
                  alt="Vista aérea do Porto Itapoá"
                  width={700}
                  height={500}
                  className="rounded-2xl w-full"
                />
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Terminal Portuário de Itapoá</h4>
                  <p className="text-gray-600">Vista aérea das instalações modernas e eficientes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-green-800">
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
                  className="bg-white text-green-800 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Fale Conosco
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-800 rounded-full px-12 py-6 text-xl font-semibold transition-all duration-300 bg-transparent"
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