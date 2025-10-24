"use client"

import { motion } from "framer-motion"
import { ArrowRight, Ship, Globe, Users, TrendingUp, MapPin, Play, Calendar, ShoppingCart, DollarSign, Calculator, Package, Menu, Twitter, Instagram, Linkedin, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n/context"
import { 
  useHomepageData, 
  useStatsData, 
  useTerminalData, 
  useMaritimeServicesData, 
  useOtherServicesData, 
  useWhyChooseData, 
  useSustainabilityData, 
  useContactData 
} from "@/hooks/useSanityData"

const stats = [
  { icon: Ship, label: "Navios operados mensalmente", value: "180", description: "Movimentação mensal média" },
  { icon: Globe, label: "Capacidade de atracação", value: "3", description: "Berços disponíveis" },
  { icon: Users, label: "Transações do gate", value: "50.851", description: "Movimentações registradas" },
  { icon: TrendingUp, label: "TEU's movimentados", value: "10 milhões", description: "Volume total movimentado" },
]

const featuredServices = [
  {
    title: "ÁSIA",
    routes: "3 serviços regulares",
    description: "Conexões diretas com os principais portos asiáticos.",
    carriers: ["Maersk", "HMM", "PIL", "Cosco", "ONE"],
  },
  {
    title: "EUROPA",
    routes: "2 serviços regulares", 
    description: "Acesso aos principais hubs europeus.",
    carriers: ["Hapag-Lloyd", "Cosco", "MSC", "ONE", "OOCL"],
  },
  {
    title: "AMÉRICA DO NORTE",
    routes: "1 serviço regular",
    description: "Costa Leste das Américas do Sul e Norte.",
    carriers: ["Maersk", "Hapag-Lloyd"],
  },
  {
    title: "CABOTAGEM",
    routes: "3 serviços regulares",
    description: "Costa leste da América do Sul e Costa Brasileira.",
    carriers: ["Aliança", "Maersk", "CMA CGM"],
  },
  {
    title: "MEDITERRÂNEO",
    routes: "2 serviços regulares",
    description: "Costa Leste da América do Sul e Mediterrâneo",
    carriers: ["Hapag Lloyd", "MSC", "CMA CGM", "Maersk"],
  },
  {
    title: "GOLFO DO MÉXICO",
    routes: "2 serviços regulares",
    description: "Costa Leste dos EUA e América do Sul e Golfo dos EUA",
    carriers: ["Maersk", "MSC", "ZIM"],
  },
]

// Video Background Component com efeito parallax
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
      <div className="absolute inset-0 w-full h-full overflow-hidden" id="parallax-bg">
        <Image
          src="/placeholder.jpg"
          alt="Porto Itapoá"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-900/80 via-green-800/40 to-transparent"></div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden group" id="parallax-bg">
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
        className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/placeholder.jpg"
      >
        <source src="/porto-video.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/80 via-green-800/40 to-transparent"></div>
    </div>
  )
}

export default function HomePage() {
  const { t } = useI18n()
  
  // Buscar dados do Sanity
  const { data: homepageData } = useHomepageData()
  const { data: statsData } = useStatsData()
  const { data: terminalData } = useTerminalData()
  const { data: maritimeServicesData } = useMaritimeServicesData()
  const { data: otherServicesData } = useOtherServicesData()
  const { data: whyChooseData } = useWhyChooseData()
  const { data: sustainabilityData } = useSustainabilityData()
  const { data: contactData } = useContactData()

  // Dados padrão como fallback
  const defaultStats = [
    { icon: Ship, label: "Navios operados mensalmente", value: "180", description: "Movimentação mensal média" },
    { icon: Globe, label: "Capacidade de atracação", value: "3", description: "Berços disponíveis" },
    { icon: Users, label: "Transações do gate", value: "50.851", description: "Movimentações registradas" },
    { icon: TrendingUp, label: "TEU's movimentados", value: "10 milhões", description: "Volume total movimentado" },
  ]

  const defaultFeaturedServices = [
    {
      title: "ÁSIA",
      routes: "3 serviços regulares",
      description: "Conexões diretas com os principais portos asiáticos.",
      carriers: ["Maersk", "HMM", "PIL", "Cosco", "ONE"],
    },
    {
      title: "EUROPA",
      routes: "2 serviços regulares", 
      description: "Acesso aos principais hubs europeus.",
      carriers: ["Hapag-Lloyd", "Cosco", "MSC", "ONE", "OOCL"],
    },
    {
      title: "AMÉRICA DO NORTE",
      routes: "1 serviço regular",
      description: "Costa Leste das Américas do Sul e Norte.",
      carriers: ["Maersk", "Hapag-Lloyd"],
    },
    {
      title: "CABOTAGEM",
      routes: "3 serviços regulares",
      description: "Costa leste da América do Sul e Costa Brasileira.",
      carriers: ["Aliança", "Maersk", "CMA CGM"],
    },
    {
      title: "MEDITERRÂNEO",
      routes: "2 serviços regulares",
      description: "Costa Leste da América do Sul e Mediterrâneo",
      carriers: ["Hapag Lloyd", "MSC", "CMA CGM", "Maersk"],
    },
    {
      title: "GOLFO DO MÉXICO",
      routes: "2 serviços regulares",
      description: "Costa Leste dos EUA e América do Sul e Golfo dos EUA",
      carriers: ["Maersk", "MSC", "ZIM"],
    },
  ]

  // Função para mapear ícones
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Calendar,
      ShoppingCart,
      DollarSign,
      Calculator,
      Package,
    }
    return iconMap[iconName] || Package
  }

  // Usar dados do Sanity ou fallbacks
  const currentStats = statsData?.statistics || defaultStats
  const currentFeaturedServices = maritimeServicesData?.services || defaultFeaturedServices

  // Efeito parallax
  useEffect(() => {
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      // Main hero background
      const parallaxBg = document.getElementById('parallax-bg');
      if (parallaxBg) {
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
      }
      
      // Hero decorative crosses
      const parallaxCrosses = document.getElementById('parallax-crosses');
      if (parallaxCrosses) {
        const speed = 0.3;
        parallaxCrosses.style.transform = `translateY(${scrolled * speed}px)`;
      }
      
      // Hero wordmark
      const parallaxWordmark = document.getElementById('parallax-wordmark');
      if (parallaxWordmark) {
        const speed = 0.7;
        parallaxWordmark.style.transform = `translateY(${scrolled * speed}px)`;
      }
      
      // Second section background
      const parallaxBg2 = document.getElementById('parallax-bg2');
      if (parallaxBg2 && parallaxBg2.parentElement) {
        const rect = parallaxBg2.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= viewportHeight) {
          const speed = 0.4;
          const offset = (scrolled - parallaxBg2.parentElement.offsetTop) * speed;
          parallaxBg2.style.transform = `translateY(${offset}px)`;
        }
      }
      
      // Second section crosses
      const parallaxCrosses2 = document.getElementById('parallax-crosses2');
      if (parallaxCrosses2 && parallaxCrosses2.parentElement) {
        const rect = parallaxCrosses2.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= viewportHeight) {
          const speed = 0.2;
          const offset = (scrolled - parallaxCrosses2.parentElement.offsetTop) * speed;
          parallaxCrosses2.style.transform = `translateY(${offset}px)`;
        }
      }
      
      // Second section wordmark
      const parallaxWordmark2 = document.getElementById('parallax-wordmark2');
      if (parallaxWordmark2 && parallaxWordmark2.parentElement) {
        const rect = parallaxWordmark2.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= viewportHeight) {
          const speed = 0.6;
          const offset = (scrolled - parallaxWordmark2.parentElement.offsetTop) * speed;
          parallaxWordmark2.style.transform = `translateY(${offset}px)`;
        }
      }
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial call
    updateParallax();

    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-hidden">
      {/* Main Hero Section */}
      <main className="min-h-screen overflow-hidden relative">
        {/* Background */}
        <VideoBackground />

        {/* Decorative crosses */}
        <div className="pointer-events-none absolute inset-0" id="parallax-crosses">
          <div className="absolute left-6 top-16 text-white/40">+</div>
          <div className="absolute left-1/3 top-1/4 text-white/40">+</div>
          <div className="absolute right-10 top-14 text-white/40">+</div>
          <div className="absolute right-1/4 top-1/2 text-white/40">+</div>
          <div className="absolute left-12 bottom-24 text-white/40">+</div>
          <div className="absolute right-8 bottom-12 text-white/40">+</div>
        </div>

        {/* Top Bar */}
        <header className="z-10 flex md:px-10 pt-5 pr-6 pb-5 pl-6 relative items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            <span className="md:text-base text-sm font-semibold tracking-tight cursor-pointer" onClick={() => window.location.href = '/'} role="button">
              PORTO ITAPOÁ
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <Link href="/servicos" className="hover:text-white transition">Serviços</Link>
            <Link href="/portfolio" className="hover:text-white transition">Portfólio</Link>
            <Link href="/institucional" className="hover:text-white transition">Institucional</Link>
            <Link href="/contato" className="hover:text-white transition">Contato</Link>
            <div className="h-5 w-px bg-white/20"></div>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Email"><Mail className="h-4 w-4" /></a>
            </div>
          </nav>
          <button className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur hover:bg-white/10 transition">
            <Menu className="h-4 w-4" />
          </button>
        </header>

        {/* Content */}
        <section className="z-10 relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:px-10 lg:pb-36 lg:pt-20 max-w-7xl mr-auto ml-auto pt-10 pr-6 pb-28 pl-6 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">
                {homepageData?.title || "Soluções portuárias com tecnologia e inteligência logística"}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80">
                Conectando o Brasil ao mundo com eficiência, tecnologia e sustentabilidade através de um dos terminais mais modernos da América do Sul.
              </p>
              
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link href={homepageData?.ctaButtonLink || "/servicos"}>
                        <button className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition">
                          {homepageData?.ctaButtonText || "CONHEÇA NOSSOS SERVIÇOS"}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href="/contato">
                        <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white/90 backdrop-blur hover:bg-white/10 transition">
                          Entre em Contato
                          <Calendar className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
            </div>
          </div>
        </section>

        {/* Massive brand wordmark */}
        <div className="pointer-events-none z-0 select-none absolute right-0 left-0" id="parallax-wordmark">
          <div className="md:px-10 max-w-full mr-auto ml-auto pr-6 pl-6 items-center justify-center">
            <div className="whitespace-nowrap text-[20vw] leading-none font-semibold text-green-500/95 tracking-tight text-center">ITAPOÁ</div>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              {statsData?.title || "Números que Impressionam"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {statsData?.description || "Conheça os números que fazem do Porto Itapoá um dos terminais mais eficientes do Brasil"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentStats.map((stat: any, index: number) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="overflow-hidden bg-gray-50 rounded-xl relative shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                      <stat.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-4xl font-bold text-green-900 mb-3 group-hover:text-green-700 transition-colors">{stat.value}</h3>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section with Parallax */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 right-0 bottom-0 left-0" id="parallax-bg2">
          <Image
            src="/foto-porto-patio-1024x721.webp"
            alt="Terminal Porto Itapoá"
            fill
            className="object-cover"
          />
          <div className="bg-gradient-to-b from-slate-900/0 to-[#000000]/30 absolute top-0 right-0 bottom-0 left-0"></div>
        </div>

        {/* Decorative crosses */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0" id="parallax-crosses2">
          <div className="absolute left-6 top-16 text-white/40">+</div>
          <div className="absolute left-1/3 top-1/4 text-white/40">+</div>
          <div className="absolute right-10 top-14 text-white/40">+</div>
          <div className="absolute right-1/4 top-1/2 text-white/40">+</div>
          <div className="absolute left-12 bottom-24 text-white/40">+</div>
          <div className="absolute right-8 bottom-12 text-white/40">+</div>
        </div>

        {/* Content */}
        <section className="z-10 relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:px-10 lg:pb-36 lg:pt-20 max-w-7xl mr-auto ml-auto pt-10 pr-6 pb-28 pl-6 items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                {terminalData?.title || "O Terminal"}
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/80">
                {terminalData?.description || "O Porto Itapoá é um dos maiores e mais eficientes terminais de contêineres do Brasil, com capacidade atual para movimentar 1,8 milhão de TEUs por ano e em expansão para 2 milhões."}
              </p>
            </div>
          </div>
        </section>

        {/* Massive brand wordmark */}
        <div className="pointer-events-none z-0 select-none absolute right-0 bottom-0 left-0" id="parallax-wordmark2">
          <div className="md:px-10 max-w-full mr-auto ml-auto pr-6 pl-6 items-center justify-center">
            <div className="whitespace-nowrap text-[20vw] leading-none text-8xl font-semibold text-zinc-50/95 tracking-tight text-center">TERMINAL</div>
          </div>
        </div>
      </main>

      {/* Terminal Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              {terminalData?.title || "Nossos Valores"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça os pilares que guiam nossas operações e nosso compromisso com a excelência.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="overflow-hidden bg-gray-50 rounded-xl relative shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur">
                <div className="p-8 text-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-600">Missão</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrar negócios</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {terminalData?.mission || "Integrar negócios com modernidade, sustentabilidade e eficiência."}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="overflow-hidden bg-gray-50 rounded-xl relative shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur">
                <div className="p-8 text-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-600">Visão</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Liderança regional</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {terminalData?.vision || "Ser o maior e mais eficiente terminal da América do Sul."}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="overflow-hidden bg-gray-50 rounded-xl relative shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur">
                <div className="p-8 text-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-600">Valores</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Excelência operacional</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {terminalData?.values || "Comprometimento, leveza, conduta íntegra, inovação e excelência em sustentabilidade e segurança."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-zinc-200 border-gray-200 border-t relative">
        <div className="md:px-10 lg:py-28 max-w-7xl mr-auto ml-auto pt-20 pr-6 pb-20 pl-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              {maritimeServicesData?.title || "Serviços Marítimos Regulares"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {maritimeServicesData?.description || "Conecte-se a todos os continentes com rotas de longo curso e cabotagem."}
            </p>
          </div>

          <div className="grid gap-8 md:gap-12 lg:gap-16">
            {/* Featured Service */}
            <div className="overflow-hidden relative bg-gray-50 rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur">
              <div className="grid lg:grid-cols-2 items-center">
                <div className="lg:h-[500px] overflow-hidden h-96 relative top-0 right-0 bottom-0 left-0">
                  <Image
                    src="/placeholder.jpg"
                    alt="Serviços marítimos"
                    fill
                    className="object-cover"
                  />
                  <div className="lg:to-gray-50/50 absolute top-0 right-0 bottom-0 left-0"></div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-600">Serviços Internacionais</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-4 text-gray-900">Conectividade Global</h3>
                  <p className="text-gray-700 mb-6">Conectamos o Brasil aos principais portos mundiais através de uma rede robusta de serviços regulares com os maiores armadores do mundo.</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">Ásia</span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">Europa</span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">América do Norte</span>
                  </div>
                  <Link href="/portfolio">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-500 transition">
                      Ver portfólio completo
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {currentFeaturedServices.slice(0, 3).map((service: any, index: number) => (
                <div key={service.title} className="group overflow-hidden bg-gray-50 rounded-xl relative shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur">
                  <div className="overflow-hidden h-64 relative">
                    <Image
                      src="/placeholder.jpg"
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="bg-gradient-to-t from-white/80 via-transparent to-transparent absolute top-0 right-0 bottom-0 left-0"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-1 w-1 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-green-600">{service.title}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{service.routes}</h4>
                    <p className="text-sm text-gray-700">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              {otherServicesData?.title || "Outros serviços"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {otherServicesData?.description || "O Porto de Itapoá oferece soluções logísticas locais e globais que impulsionam empresas de todos os portes."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(otherServicesData?.services || [
              {
                title: "Programação de navios",
                description: "Acompanhe em tempo real chegadas, atracações e saídas de navios.",
                link: "/agendamento",
                icon: "Calendar"
              },
              {
                title: "Portal de Compras",
                description: "Participe de cotações e forneça produtos e serviços ao Porto.",
                link: "/portal-cliente",
                icon: "ShoppingCart"
              },
              {
                title: "Tabela de preços",
                description: "Consulte as tarifas atualizadas de todos os serviços disponíveis.",
                link: "/precos",
                icon: "DollarSign"
              },
              {
                title: "Simuladores de preço",
                description: "Calcule valores de importação e exportação de forma prática.",
                link: "/precos",
                icon: "Calculator"
              },
              {
                title: "Rastreamento de contêineres",
                description: "Monitore a localização e o status da sua carga em tempo real.",
                link: "/rastreamento",
                icon: "Package"
              }
            ]).map((service: any, index: number) => {
              const IconComponent = getIcon(service.icon)
              return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={service.link}>
                  <div className="overflow-hidden bg-gray-50 rounded-xl relative shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] backdrop-blur cursor-pointer">
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-8 bg-zinc-200 border-gray-200 border-t">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              Últimas Notícias
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acompanhe as novidades e atualizações do Porto Itapoá
            </p>
          </motion.div>

          <div className="text-center">
            <Link href="/noticias">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="inline-flex items-center gap-2 rounded-xl bg-green-500 text-white px-8 py-4 text-lg font-medium hover:bg-green-400 transition-colors">
                  Ver todas as notícias
                  <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-zinc-950 border-white/5 border-t relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-white">
              {whyChooseData?.title || "Por que escolher o Porto Itapoá?"}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {whyChooseData?.description || "Descubra os diferenciais que fazem do nosso terminal a melhor escolha para sua operação"}
            </p>
          </div>

          {/* Featured Benefit */}
          <div className="overflow-hidden bg-zinc-900/50 ring-slate-50/10 ring-1 rounded-2xl mb-12 relative backdrop-blur">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="lg:p-12 order-2 lg:order-1 pt-8 pr-8 pb-8 pl-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-green-400">Diferencial Principal</span>
                </div>
                <blockquote className="lg:text-2xl leading-relaxed text-xl font-medium text-white/90 mb-6">
                  "Tecnologia de ponta combinada com localização estratégica, oferecendo eficiência operacional e conectividade global incomparáveis."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Ship className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Porto Itapoá</div>
                    <div className="text-sm text-white/60">Terminal de Contêineres</div>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-96 overflow-hidden order-1 lg:order-2">
                <Image
                  src="/placeholder.jpg"
                  alt="Terminal Porto Itapoá"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-900/80 lg:to-zinc-900/50"></div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {(whyChooseData?.benefits || [
              {
                title: "Serviços de ponta a ponta",
                description: "Soluções logísticas completas e flexíveis para gerenciar sua carga da origem ao destino."
              },
              {
                title: "Visibilidade total",
                description: "Monitoramento em tempo real da sua carga e controle total sobre sua operação em portos e armazéns."
              },
              {
                title: "Previsibilidade de custos",
                description: "Preços definidos no momento da reserva e total transparência financeira."
              }
                  ]).slice(0, 3).map((item: any, index: number) => (
              <div key={item.title} className="overflow-hidden bg-zinc-900/50 ring-slate-50/10 ring-1 rounded-xl pt-6 pr-6 pb-6 pl-6 relative backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-green-400 stroke-green-400" />
                    <Star className="h-4 w-4 fill-green-400 stroke-green-400" />
                    <Star className="h-4 w-4 fill-green-400 stroke-green-400" />
                    <Star className="h-4 w-4 fill-green-400 stroke-green-400" />
                    <Star className="h-4 w-4 fill-green-400 stroke-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="text-center">
            <h3 className="text-xl font-semibold tracking-tight mb-8 text-white/90">Números que Comprovam</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">180</div>
                <div className="text-sm text-white/60">Navios/mês</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">1.8M</div>
                <div className="text-sm text-white/60">TEUs/ano</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">50K+</div>
                <div className="text-sm text-white/60">Transações</div>
              </div>
              <div className="text-center lg:border-l lg:border-white/10">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">15+</div>
                <div className="text-sm text-white/60">Países conectados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              {sustainabilityData?.title || "Compromisso com a sustentabilidade"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
              {sustainabilityData?.description || "Projetado para ser sustentável e integrado ao meio ambiente, o Porto Itapoá segue a tendência dos portos mais modernos do mundo, priorizando a mínima interferência ambiental."}
            </p>
            
            <Link href="/sustentabilidade">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="inline-flex items-center gap-2 rounded-xl bg-green-500 text-white px-8 py-4 text-lg font-medium hover:bg-green-400 transition-colors">
                  {sustainabilityData?.ctaButtonText || "ACESSE NOSSO PORTAL DE SUSTENTABILIDADE!"}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-zinc-200 border-gray-200 border-t">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-600">Vamos Trabalhar Juntos</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                Pronto para criar algo extraordinário?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Seja para importação, exportação ou serviços logísticos, estamos aqui para tornar sua operação mais eficiente e conectada ao mundo.
              </p>
              
              {/* Contact Methods */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 backdrop-blur flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">{contactData?.email || "contato@portoitapoa.com.br"}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 backdrop-blur flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Endereço</div>
                    <div className="text-sm text-gray-600">{contactData?.address || "Rod. SC-415, Km 5 - Itapoá/SC"}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 backdrop-blur flex items-center justify-center">
                    <Ship className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Localização</div>
                    <div className="text-sm text-gray-600">Santa Catarina, Brasil</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">24h</div>
                  <div className="text-xs text-gray-600">Resposta</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">Global</div>
                  <div className="text-xs text-gray-600">Conectividade</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">Sustentável</div>
                  <div className="text-xs text-gray-600">Operação</div>
                </div>
              </div>
            </div>

            {/* Right Content - Contact Form */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 backdrop-blur border border-gray-200 p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">Nome</label>
                      <input type="text" id="firstName" name="firstName" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">Sobrenome</label>
                      <input type="text" id="lastName" name="lastName" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder="Seu sobrenome" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder="seu.email@exemplo.com" />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">Empresa</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder="Sua empresa" />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-900 mb-2">Tipo de Serviço</label>
                    <select id="serviceType" name="serviceType" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition">
                      <option value="">Selecione o tipo de serviço</option>
                      <option value="import">Importação</option>
                      <option value="export">Exportação</option>
                      <option value="logistics">Serviços Logísticos</option>
                      <option value="storage">Armazenagem</option>
                      <option value="other">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">Mensagem</label>
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition resize-none" placeholder="Conte-nos sobre sua necessidade, prazo e visão..."></textarea>
                  </div>

                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-400 transition-colors">
                    Enviar Mensagem
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-green-500/20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-green-500/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/95 border-t border-white/10 backdrop-blur">
        <div className="md:px-10 lg:py-20 max-w-7xl mr-auto ml-auto pt-16 pr-6 pb-16 pl-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span className="text-lg font-semibold tracking-tight cursor-pointer" onClick={() => window.location.href = '/'} role="button">PORTO ITAPOÁ</span>
                </div>
                <p className="text-white/60 max-w-md">
                  Terminal portuário de última geração, conectando o Brasil ao mundo com eficiência, tecnologia e sustentabilidade.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-white/90">Pronto para colaborar?</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contato">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-green-500 text-black px-4 py-2 text-sm font-medium hover:bg-green-400 transition">
                      Entre em contato
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link href="/servicos">
                    <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur hover:bg-white/10 transition">
                      Nossos serviços
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Serviços</h3>
                <ul className="space-y-3">
                  <li><Link href="/servicos" className="text-sm text-white/60 hover:text-white transition">Serviços Marítimos</Link></li>
                  <li><Link href="/agendamento" className="text-sm text-white/60 hover:text-white transition">Programação de Navios</Link></li>
                  <li><Link href="/rastreamento" className="text-sm text-white/60 hover:text-white transition">Rastreamento</Link></li>
                  <li><Link href="/precos" className="text-sm text-white/60 hover:text-white transition">Tabela de Preços</Link></li>
                  <li><Link href="/portal-cliente" className="text-sm text-white/60 hover:text-white transition">Portal do Cliente</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-white mb-4">Institucional</h3>
                <ul className="space-y-3">
                  <li><Link href="/institucional" className="text-sm text-white/60 hover:text-white transition">Sobre Nós</Link></li>
                  <li><Link href="/sustentabilidade" className="text-sm text-white/60 hover:text-white transition">Sustentabilidade</Link></li>
                  <li><Link href="/noticias" className="text-sm text-white/60 hover:text-white transition">Notícias</Link></li>
                  <li><Link href="/contato" className="text-sm text-white/60 hover:text-white transition">Contato</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © 2024 Porto Itapoá. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition">Termos de Uso</a>
              <a href="#" className="hover:text-white transition">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}