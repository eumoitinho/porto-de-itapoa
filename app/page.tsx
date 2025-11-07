"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Ship, Globe, Users, TrendingUp, MapPin, Play, Calendar, ShoppingCart, DollarSign, Calculator, Package, Menu, Twitter, Instagram, Linkedin, Mail, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
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
import RotatingEarth from "@/components/rotating-earth"

// Video Background Component com efeito parallax
function VideoBackground() {
  const [isClient, setIsClient] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Parallax effect for video
    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        videoRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden hero-parallax-bg" id="parallax-bg">
      {/* Fallback background */}
      <Image
        src="/placeholder.jpg"
        alt="Porto Itapoá"
        fill
        className="object-cover"
        priority
      />
      
      {/* Video element */}
      {isClient && (
      <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        loop
        muted
        playsInline
          preload="auto"
        poster="/placeholder.jpg"
      >
          <source src="/Design sem nome.mp4" type="video/mp4" />
      </video>
      )}
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 hero-gradient-overlay"></div>
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
    { icon: Ship, label: t("shipsOperatedMonthly"), value: "180", description: t("monthlyAverageMovement") },
    { icon: Globe, label: t("dockingCapacity"), value: "3", description: t("availableBerths") },
    { icon: Users, label: t("gateTransactions"), value: "50.851", description: t("registeredMovements") },
    { icon: TrendingUp, label: t("teusMoved"), value: "10 milhões", description: t("totalVolumeMoved") },
  ]

  const defaultFeaturedServices = [
    {
      title: t("asiaHome"),
      routes: t("asiaRoutes"),
      description: t("asiaDescription"),
      carriers: ["Maersk", "HMM", "PIL", "Cosco", "ONE"],
    },
    {
      title: t("europeHome"),
      routes: t("europeRoutes"), 
      description: t("europeDescription"),
      carriers: ["Hapag-Lloyd", "Cosco", "MSC", "ONE", "OOCL"],
    },
    {
      title: t("northAmericaHome"),
      routes: t("northAmericaRoutes"),
      description: t("northAmericaDescription"),
      carriers: ["Maersk", "Hapag-Lloyd"],
    },
    {
      title: t("cabotageHome"),
      routes: t("cabotageRoutes"),
      description: t("cabotageDescription"),
      carriers: ["Aliança", "Maersk", "CMA CGM"],
    },
    {
      title: t("mediterraneanHome"),
      routes: t("mediterraneanRoutes"),
      description: t("mediterraneanDescription"),
      carriers: ["Hapag Lloyd", "MSC", "CMA CGM", "Maersk"],
    },
    {
      title: t("gulfOfMexicoHome"),
      routes: t("gulfOfMexicoRoutes"),
      description: t("gulfOfMexicoDescription"),
      carriers: ["Maersk", "MSC", "ZIM"],
    },
  ]

  const maritimeGalleryImages = [
    {
      src: "/48.jpg",
      alt: "Operações portuárias Porto Itapoá"
    },
    {
      src: "/210302-porto-de-los-angeles-1.jpg",
      alt: "Porto de Los Angeles com navios"
    },
    {
      src: "/2025102199458f0bf5e147a6b6ccf979943e6230_20251021bc9a169f1791497a858fe90eecad0894.jpeg",
      alt: "Terminal logístico movimentado"
    },
    {
      src: "/aerea-porto-scaled.jpg",
      alt: "Vista aérea Porto Itapoá"
    },
    {
      src: "/048-navio-20log-in-20logistica-20intermodal.webp",
      alt: "Navio logístico"
    },
    {
      src: "/downloads.jpg",
      alt: "Movimentação de contêineres"
    },
    {
      src: "/laem-chabang-1024x767.jpg",
      alt: "Porto Laem Chabang"
    },
    {
      src: "/turquia-istambul-canal-do-bosforo-ponte-do-bosforo-um-navio-de-carga-no-canal-da-mancha_857279-14188.avif",
      alt: "Navio no estreito de Bósforo"
    }
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

  const currentStats = statsData?.stats || defaultStats
  const currentFeaturedServices = maritimeServicesData?.services || defaultFeaturedServices

  // (Valores) exibição simultânea - sem abas

  // Estilos para cards de estatísticas
  const statAccentClasses = [
    {
      card: "bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg",
      circle: "bg-emerald-500 text-white shadow-lg",
      value: "text-emerald-600"
    },
    {
      card: "bg-white border-2 border-green-200 shadow-md rounded-2xl",
      circle: "bg-gradient-to-br from-green-400 to-green-600 text-white",
      value: "text-green-600"
    },
    {
      card: "bg-gradient-to-tr from-lime-50 to-white border border-lime-300 shadow-sm rounded-xl",
      circle: "bg-lime-100 text-lime-700 border-2 border-lime-300",
      value: "text-lime-600"
    },
    {
      card: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 shadow-2xl",
      circle: "bg-white text-emerald-600 ring-2 ring-emerald-300",
      value: "text-white"
    },
  ]

  const valueCardStyles = [
    {
      card: "bg-gradient-to-br from-emerald-50 via-white to-white border-l-4 border-emerald-500 shadow-lg",
      badge: "text-emerald-600",
      dot: "bg-emerald-500"
    },
    {
      card: "bg-white border-2 border-green-200 shadow-md rounded-2xl",
      badge: "text-green-600",
      dot: "bg-green-500"
    },
    {
      card: "bg-gradient-to-tr from-lime-50 to-white border border-lime-300 shadow-sm rounded-xl",
      badge: "text-lime-600",
      dot: "bg-lime-500"
    }
  ]

  const otherServiceStyles = [
    {
      border: "border-l-4 border-emerald-500",
      bg: "bg-gradient-to-br from-emerald-50 to-white",
      icon: "bg-emerald-500 text-white shadow-lg",
      hover: "hover:border-emerald-600"
    },
    {
      border: "border-2 border-green-300 rounded-2xl",
      bg: "bg-white",
      icon: "bg-gradient-to-br from-green-400 to-green-600 text-white",
      hover: "hover:border-green-400"
    },
    {
      border: "border border-lime-300 rounded-xl",
      bg: "bg-gradient-to-tr from-lime-50 to-white",
      icon: "bg-lime-100 text-lime-700 border-2 border-lime-300",
      hover: "hover:border-lime-400"
    },
    {
      border: "border-l-4 border-emerald-500",
      bg: "bg-white",
      icon: "bg-emerald-50 text-emerald-600 ring-2 ring-emerald-200",
      hover: "hover:border-emerald-600"
    },
    {
      border: "border-2 border-green-200 rounded-2xl",
      bg: "bg-gradient-to-br from-green-50 to-white",
      icon: "bg-green-500 text-white shadow-md",
      hover: "hover:border-green-400"
    }
  ]

  // Enhanced scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    // Initialize hero content animation
    setTimeout(() => {
      const heroContent = document.querySelector('.hero-content')
      if (heroContent) {
        heroContent.classList.add('animate')
      }
    }, 500)

    return () => observer.disconnect()
  }, [])

  // Parallax effects
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
    updateParallax();

    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-hidden">
      {/* Main Hero Section */}
      <main className="min-h-screen overflow-hidden relative pt-20">
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

        {/* Content */}
        <section className="z-10 relative flex h-full max-w-7xl mx-auto px-6 items-center justify-center min-h-screen pt-20">
          <div className="max-w-xl text-white hero-content">
            <p className="text-sm/6 uppercase tracking-widest opacity-80 animate-on-scroll text-reveal stagger-1">
              {t("heroSubtitle")}
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">
              {homepageData?.title || t("heroTitle")}
              </h1>
            <p className="text-base/7 md:text-lg/8 opacity-90 mt-4 animate-on-scroll text-reveal stagger-3">
              {homepageData?.subtitle || t("heroSubtitleText")}
              </p>
            <div className="mt-8 flex items-center gap-3">
                      <Link href={homepageData?.ctaButtonLink || "/servicos"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition shadow-lg overflow-hidden"
                >
                  <span className="relative z-10">{homepageData?.ctaButtonText || t("knowOurServices")}</span>
                  <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                      </Link>
                      <Link href="/contato">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:bg-white/10 backdrop-blur transition transform hover:scale-105 animate-on-scroll slide-left stagger-5"
                >
                  {t("contactButton")}
                  <Play className="w-4 h-4" />
                </motion.button>
                      </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Statistics Section (mínimo) */}
      <section className="py-20 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              {statsData?.title || t("impressiveNumbers")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {statsData?.description || t("statsDescription")}
            </p>
          </motion.div>

          <div className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {currentStats.map((stat: any, index: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="px-8 py-10 text-center"
                >
                  <div className="mb-3 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-emerald-600" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl md:text-4xl font-semibold text-gray-900 leading-none">{stat.value}</div>
                  <div className="mt-2 text-base font-medium text-gray-800">{stat.label}</div>
                  <div className="mt-1 text-sm text-gray-600">{stat.description}</div>
                </motion.div>
              ))}
            </div>
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
        <section className="z-10 relative flex h-full max-w-7xl mx-auto px-6 items-center pt-20 pb-20">
          <div className="max-w-2xl text-white hero-content">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white animate-on-scroll text-reveal stagger-1">
              {terminalData?.title || t("terminalTitle")}
              </h2>
            <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed animate-on-scroll text-reveal stagger-2">
              {terminalData?.description || t("terminalDescription")}
            </p>
            {/* Trust Bar Content dentro da seção do terminal */}
            <div className="mt-12 text-center animate-on-scroll blur-slide">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <span className="animate-on-scroll slide-left stagger-1 text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold italic text-white">
                  {t("strategicLocation")},
                </span>
                <Image
                  src="/aerea-porto-scaled.jpg"
                  alt="Porto Itapoá"
                  width={48}
                  height={48}
                  className="animate-on-scroll rotate-in stagger-2 inline-block sm:h-10 sm:w-10 md:h-12 md:w-12 bg-white w-8 h-8 object-cover ring-white ring-2 rounded-xl shadow-lg -rotate-6"
                />
                <span className="animate-on-scroll slide-right stagger-3 text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold italic text-white">
                  {t("connectivity")},
                </span>
                <Image
                  src="/placeholder.jpg"
                  alt="Porto Itapoá"
                  width={48}
                  height={48}
                  className="animate-on-scroll rotate-in stagger-4 inline-block sm:h-10 sm:w-10 md:h-12 md:w-12 ring-white ring-2 bg-white w-8 h-8 object-cover rounded-xl shadow-lg rotate-6"
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Image
                  src="/placeholder.jpg"
                  alt="Porto Itapoá"
                  width={80}
                  height={48}
                  className="animate-on-scroll scale-up stagger-5 inline-block sm:h-10 sm:w-16 md:h-12 md:w-20 ring-white ring-2 w-0 h-0 object-cover rounded-xl shadow-lg -rotate-3"
                />
                <span className="animate-on-scroll slide-up stagger-6 text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold italic text-white">
                  {t("sustainable")}.
                </span>
              </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900 animate-on-scroll text-reveal stagger-1">
              {terminalData?.title || t("ourValues")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
              {t("valuesDescription")}
            </p>
          </motion.div>

          {/* Três colunas abertas com divisórias finas */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-gray-200 bg-white/80 backdrop-blur rounded-2xl border border-gray-100">
              {[{
                title: t('mission'),
                heading: t('missionHeading'),
                content: terminalData?.mission || t('missionContent')
              }, {
                title: t('vision'),
                heading: t('visionHeading'),
                content: terminalData?.vision || t('visionContent')
              }, {
                title: t('values'),
                heading: t('valuesHeading'),
                content: terminalData?.values || t('valuesContent')
              }].map((sec, i) => (
                <motion.div
                  key={sec.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="px-8 py-10"
                >
                  <div className="text-emerald-700 text-base md:text-lg font-semibold tracking-wide mb-3">{sec.title}</div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">{sec.heading}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{sec.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-zinc-200 border-gray-200 border-t relative">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl tracking-tight font-semibold text-green-600 mb-2">
              {maritimeServicesData?.title || t("regularMaritimeServices")}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              {maritimeServicesData?.description || t("servicesDescription")}
            </p>
          </div>
        </div>
        <div className="relative w-full h-screen min-h-[100vh] flex items-center justify-center">
          <RotatingEarth className="w-full h-full max-w-6xl" />
        </div>

        {/* Services Grid */}
        <div className="md:px-10 lg:py-28 max-w-7xl mr-auto ml-auto pt-20 pr-6 pb-20 pl-6">
            <div className="flex mb-8 items-end justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl tracking-tight font-semibold text-green-600">
                  {t("regularMaritimeServices")}
                </h2>
                <p className="mt-2 text-neutral-600">
                  {t("servicesDescription")}
                </p>
                  </div>
              <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-2 text-sm hover:text-neutral-600 transition">
                {t("seeCompletePortfolio")}
                <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {maritimeGalleryImages.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    priority={image.src === "/aerea-porto-scaled.jpg"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 bg-[#ffffff] w-full max-w-none rounded-3xl pt-6 pr-6 pb-6 pl-6 shadow-2xl space-x-4 animate-on-scroll scale-in overflow-x-auto">
              {currentFeaturedServices.slice(0, 5).map((service: any, index: number) => (
                <div 
                  key={service.title} 
                  className="card-panel flex-1 min-w-[200px] overflow-hidden cursor-pointer transition-all duration-500 flex hover:flex-[4] group bg-gray-800 h-[464px] rounded-3xl relative top-0 right-0 bottom-0 left-0 items-center justify-center animate-on-scroll blur-in"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                    <Image
                      src="/placeholder.jpg"
                      alt={service.title}
                      fill
                    className="card-image w-full h-full object-cover rounded-sm"
                  />
                  <div className="card-overlay group-hover:opacity-100 transition-opacity duration-300 flex flex-col bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 rounded-3xl pt-6 pr-6 pb-6 pl-6 absolute top-0 right-0 bottom-0 left-0 justify-end">
                    <h3 className="text-white text-xl font-medium mb-1 tracking-tight">{service.title}</h3>
                    <p className="text-gray-200 text-sm">{service.routes}</p>
                    <p className="text-gray-400 text-xs mt-2">{service.description}</p>
                  </div>
                </div>
              ))}
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900 animate-on-scroll text-reveal stagger-1">
              {otherServicesData?.title || t("otherServices")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
              {otherServicesData?.description || t("otherServicesDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(otherServicesData?.services || [
              {
                title: t("shipScheduling"),
                description: t("shipSchedulingDesc"),
                link: "/agendamento",
                icon: "Calendar"
              },
              {
                title: t("purchasePortal"),
                description: t("purchasePortalDesc"),
                link: "/portal-cliente",
                icon: "ShoppingCart"
              },
              {
                title: t("priceTableTitle"),
                description: t("priceTableDesc"),
                link: "/precos",
                icon: "DollarSign"
              },
              {
                title: t("priceSimulators"),
                description: t("priceSimulatorsDesc"),
                link: "/precos",
                icon: "Calculator"
              },
              {
                title: t("containerTracking"),
                description: t("containerTrackingDesc"),
                link: "/rastreamento",
                icon: "Package"
              }
            ]).map((service: any, index: number) => {
              const IconComponent = getIcon(service.icon)
              const style = otherServiceStyles[index % otherServiceStyles.length]
              return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <Link href={service.link} className="h-full flex">
                  <div className={`h-full flex flex-col w-full overflow-hidden rounded-2xl relative ${style.bg} border border-gray-100 ${style.border} ${style.hover} transition-all duration-300 cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-xl`}>
                    <div className="p-8 text-left flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${style.icon}`}>
                          <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6 flex-1">{service.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                        {t("accessService")}
                        <ArrowRight className="h-4 w-4" />
                      </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900 animate-on-scroll text-reveal stagger-1">
              {t("latestNews")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
              {t("latestNewsDescription")}
            </p>
          </motion.div>

          <div className="text-center">
            <Link href="/noticias">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-8 py-4 text-lg font-medium hover:bg-green-400 transition-colors animate-on-scroll scale-in stagger-3"
              >
                {t("seeAllNews")}
                  <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-zinc-950 border-white/5 border-t relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="text-center mb-16 animate-on-scroll blur-slide">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-white animate-on-scroll text-reveal stagger-1">
              {whyChooseData?.title || t("whyChoose")}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto animate-on-scroll text-reveal stagger-2">
              {whyChooseData?.description || t("whyChooseDescription")}
            </p>
          </div>

          {/* Featured Benefit */}
          <div className="overflow-hidden bg-zinc-900/50 ring-slate-50/10 ring-1 rounded-2xl mb-12 relative backdrop-blur animate-on-scroll card-reveal stagger-1">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="lg:p-12 order-2 lg:order-1 pt-8 pr-8 pb-8 pl-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-green-400">{t("mainDifferential")}</span>
                </div>
                <blockquote className="lg:text-2xl leading-relaxed text-xl font-medium text-white/90 mb-6">
                  "{t("mainDifferentialQuote")}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Ship className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Porto Itapoá</div>
                    <div className="text-sm text-white/60">{t("terminalContainers")}</div>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-96 overflow-hidden order-1 lg:order-2 animate-on-scroll image-reveal stagger-2">
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
                title: t("endToEndServices"),
                description: t("endToEndServicesDesc")
              },
              {
                title: t("totalVisibility"),
                description: t("totalVisibilityDesc")
              },
              {
                title: t("costPredictability"),
                description: t("costPredictabilityDesc")
              }
                  ]).slice(0, 3).map((item: any, index: number) => (
              <div key={item.title} className="overflow-hidden bg-zinc-900/50 ring-slate-50/10 ring-1 rounded-xl pt-6 pr-6 pb-6 pl-6 relative backdrop-blur animate-on-scroll card-reveal" style={{ transitionDelay: `${(index + 1) * 0.1}s` }}>
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
          <div className="text-center animate-on-scroll blur-slide">
            <h3 className="text-xl font-semibold tracking-tight mb-8 text-white/90 animate-on-scroll text-reveal stagger-1">{t("numbersThatProve")}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-on-scroll slide-up stagger-2">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">180</div>
                <div className="text-sm text-white/60">{t("shipsPerMonth")}</div>
              </div>
              <div className="text-center animate-on-scroll slide-up stagger-3">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">1.8M</div>
                <div className="text-sm text-white/60">{t("teusPerYear")}</div>
              </div>
              <div className="text-center animate-on-scroll slide-up stagger-4">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">50K+</div>
                <div className="text-sm text-white/60">{t("transactions")}</div>
              </div>
              <div className="text-center lg:border-l lg:border-white/10 animate-on-scroll slide-up stagger-5">
                <div className="text-3xl lg:text-4xl font-semibold tracking-tight text-green-500 mb-2">15+</div>
                <div className="text-sm text-white/60">{t("connectedCountries")}</div>
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
            className="text-center animate-on-scroll blur-slide"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900 animate-on-scroll text-reveal stagger-1">
              {sustainabilityData?.title || t("sustainabilityTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12 animate-on-scroll text-reveal stagger-2">
              {sustainabilityData?.description || t("sustainabilityDescription")}
            </p>
            
            <Link href="/sustentabilidade">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-8 py-4 text-lg font-medium hover:bg-green-400 transition-colors animate-on-scroll scale-in stagger-3"
              >
                {sustainabilityData?.ctaButtonText || t("accessSustainabilityPortal")}
                  <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-zinc-200 border-gray-200 border-t">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="animate-on-scroll slide-left stagger-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-600">{t("letsWorkTogether")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
                {t("readyToCreate")}
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                {t("contactDescriptionHome")}
              </p>
              
              {/* Contact Methods */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 backdrop-blur flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t("email")}</div>
                    <div className="text-sm text-gray-600">{contactData?.email || "contato@portoitapoa.com.br"}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 backdrop-blur flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t("address")}</div>
                    <div className="text-sm text-gray-600">{contactData?.address || "Rod. SC-415, Km 5 - Itapoá/SC"}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-50 backdrop-blur flex items-center justify-center">
                    <Ship className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t("location")}</div>
                    <div className="text-sm text-gray-600">{t("santaCatarinaBrazil")}</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="animate-on-scroll fade-in stagger-2">
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t("response24h")}</div>
                  <div className="text-xs text-gray-600">{t("response")}</div>
                </div>
                <div className="animate-on-scroll fade-in stagger-3">
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t("global")}</div>
                  <div className="text-xs text-gray-600">{t("connectivity")}</div>
                </div>
                <div className="animate-on-scroll fade-in stagger-4">
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t("sustainable")}</div>
                  <div className="text-xs text-gray-600">{t("operation")}</div>
                </div>
              </div>
            </div>

            {/* Right Content - Contact Form */}
            <div className="relative animate-on-scroll slide-right stagger-1">
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 backdrop-blur border border-gray-200 p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">{t("firstName")}</label>
                      <input type="text" id="firstName" name="firstName" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder={t("yourNamePlaceholder")} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">{t("lastName")}</label>
                      <input type="text" id="lastName" name="lastName" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder={t("yourLastNamePlaceholder")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">{t("email")}</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder={t("emailPlaceholder")} />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">{t("companyName")}</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition" placeholder={t("companyName")} />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-900 mb-2">{t("serviceCategory")}</label>
                    <select id="serviceType" name="serviceType" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition">
                      <option value="">{t("selectLanguage")}</option>
                      <option value="import">{t("import")}</option>
                      <option value="export">{t("export")}</option>
                      <option value="logistics">{t("otherServices")}</option>
                      <option value="storage">{t("storage")}</option>
                      <option value="other">{t("otherServices")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">{t("yourMessage")}</label>
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition resize-none" placeholder={t("messagePlaceholder")}></textarea>
                  </div>

                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-400 transition-colors">
                    {t("sendMessageButton")}
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
    </div>
  )
}
