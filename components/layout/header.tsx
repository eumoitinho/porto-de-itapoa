"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Search, Phone, Mail, MapPin, Clock, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"
import { useI18n } from "@/lib/i18n/context"

const navigation = [
  { 
    name: "Home", 
    href: "/", 
    nameKey: "home",
    // Missão e Valores serão seções dentro da página Home
  },
  {
    name: "Institucional",
    href: "/institucional",
    nameKey: "institutional",
    submenu: [
      {
        name: "Sobre o Porto",
        items: [
          { 
            name: "Porto Itapoá", 
            href: "/institucional/porto-itapoa",
            description: "História, Linha do Tempo e Localização"
          },
          { 
            name: "Acionistas", 
            href: "/institucional/acionistas",
            description: "Estrutura acionária e governança"
          },
          { 
            name: "Certificações", 
            href: "/institucional/certificacoes",
            description: "Certificações e credenciamentos"
          },
          { 
            name: "Premiações", 
            href: "/institucional/premiacoes",
            description: "Reconhecimentos e prêmios"
          },
        ],
      },
      {
        name: "Estrutura e Recursos",
        items: [
          { 
            name: "Infraestrutura", 
            href: "/institucional/infraestrutura",
            description: "Infraestrutura portuária e Tour 360°"
          },
          { 
            name: "Downloads", 
            href: "/institucional/downloads",
            description: "Demonstrações Financeiras, Pacto Global e Política de Gestão"
          },
          { 
            name: "Portfólio de Serviços", 
            href: "/institucional/portfolio",
            description: "Serviços e procedimentos operacionais"
          },
        ],
      },
      {
        name: "Mídia e Compliance",
        items: [
          { 
            name: "Galerias", 
            href: "/institucional/galerias",
            description: "Fotos e vídeos institucionais"
          },
          { 
            name: "LGPD", 
            href: "/institucional/lgpd",
            description: "Proteção de dados e privacidade"
          },
        ],
      },
    ],
  },
  {
    name: "Serviços",
    href: "/servicos",
    nameKey: "services",
    submenu: [
      {
        name: "Cadastros e Acessos",
        items: [
          { 
            name: "Portal de Compras", 
            href: "/servicos/portal-compras",
            icon: "🛒"
          },
          { 
            name: "Cadastro de Cliente", 
            href: "/servicos/cadastro-cliente",
            icon: "👤"
          },
          { 
            name: "Cadastro de Motorista", 
            href: "/servicos/cadastro-motorista",
            icon: "🚛"
          },
        ],
      },
      {
        name: "Operações",
        items: [
          { 
            name: "Programação de Navios", 
            href: "/servicos/programacao-navios",
            description: "Programação e Câmera 360°",
            icon: "🚢"
          },
          { 
            name: "Integração de Motoristas", 
            href: "/servicos/integracao-motoristas",
            icon: "🚚"
          },
          { 
            name: "Integração de Serviços", 
            href: "/servicos/integracao-servicos",
            icon: "⚙️"
          },
        ],
      },
      {
        name: "Consultas e Simulações",
        items: [
          { 
            name: "Simuladores de Preços", 
            href: "/servicos/simuladores",
            description: "Simulação e Tabela de Preços",
            icon: "💰",
            hasDownload: true
          },
          { 
            name: "Consultas", 
            href: "/servicos/consultas",
            icon: "🔍"
          },
        ],
      },
    ],
  },
  { 
    name: "Contato", 
    href: "/contato", 
    nameKey: "contact" 
  },
  { 
    name: "Carreiras", 
    href: "/carreiras", 
    nameKey: "careers" 
  },
  { 
    name: "Sustentabilidade", 
    href: "/sustentabilidade", 
    nameKey: "sustainability" 
  },
  { 
    name: "Notícias", 
    href: "/noticias", 
    nameKey: "news" 
  },
  { 
    name: "Blog", 
    href: "/blog", 
    nameKey: "blog" 
  },
]

const quickLinks = [
  { name: "Agendamento", href: "/agendamento", icon: Clock },
  { name: "Rastreamento", href: "/rastreamento", icon: Search },
  { name: "Preços", href: "/servicos/simuladores", icon: Phone },
]

export function Header() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (itemName: string) => {
    setActiveSubmenu(itemName)
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setSearchTerm("")
    }
  }

  const isHomePage = pathname === "/"

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-visible ${
          isHomePage
            ? scrolled
              ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
              : "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
        }`}
        style={
          isHomePage && !scrolled
            ? {
                background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)",
                backdropFilter: "blur(8px)",
              }
            : {}
        }
      >
        {/* Top Bar */}
        <AnimatePresence>
          {(scrolled || !isHomePage) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-green-800 text-white py-1.5 px-4 lg:px-8 hidden lg:block"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4 flex-wrap gap-y-1">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="whitespace-nowrap">Av. Beira Mar 5, 2900 • Itapoá/SC</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="whitespace-nowrap">+55 (47) 3441-8000</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="whitespace-nowrap">atendimento@portoitapoa.com</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap"
                      >
                        <link.icon className="h-3 w-3" />
                        <span className="text-xs">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 overflow-visible">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <motion.div
                className="relative w-16 h-16 lg:w-20 lg:h-20 transition-transform group-hover:scale-105"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo-grande-1.png"
                  alt="Porto Itapoá"
                  fill
                  className={`object-contain transition-all duration-500 ${
                    isHomePage && !scrolled ? "brightness-0 invert" : ""
                  }`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-xs font-medium transition-all duration-200 px-2.5 py-2 rounded-lg relative ${
                      pathname === item.href ||
                      (
                        item.submenu &&
                          item.submenu.some((section) => section.items.some((subItem) => pathname.startsWith(subItem.href)))
                      )
                        ? isHomePage && !scrolled
                          ? "text-green-200 bg-white/10"
                          : "text-green-600 bg-green-50"
                        : isHomePage && !scrolled
                          ? "text-white"
                          : "text-gray-700"
                    } ${
                      isHomePage && !scrolled
                        ? "hover:text-green-200"
                        : "hover:text-green-600"
                    }`}
                  >
                    <span className="relative z-10 whitespace-nowrap">{t(item.nameKey as any) || item.name}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          className={`ml-1 h-3 w-3 transition-all duration-200 ${
                            activeSubmenu === item.name ? "text-green-600" : ""
                          }`}
                        />
                      </motion.div>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 z-50 ${
                            item.name === "Serviços" ? "min-w-[700px]" : "min-w-[600px]"
                          }`}
                          style={{
                            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <div className={`grid grid-cols-${item.submenu.length} gap-8 px-8`}>
                            <div className="flex flex-row gap-8 px-4">
                              {item.submenu.map((section, sectionIndex) => (
                                <motion.div
                                  key={section.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                                  className="flex flex-col gap-4"
                                >
                                  <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider border-b border-green-100 pb-2">
                                    {section.name}
                                  </h3>
                                  <div className="flex flex-col gap-2">
                                    {section.items.map((subItem) => (
                                      <motion.div key={subItem.name} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                                        <Link
                                          href={subItem.href}
                                          className={`block text-sm transition-all duration-200 hover:text-green-600 py-2 px-3 rounded-lg hover:bg-green-50 ${
                                            pathname === subItem.href
                                              ? "text-green-600 bg-green-50 font-medium"
                                              : "text-gray-700"
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <span>{subItem.name}</span>
                                            {(subItem as any).hasDownload && (
                                              <Download className="h-3 w-3 text-gray-400" />
                                            )}
                                          </div>
                                          {(subItem as any).description && (
                                            <p className="text-xs text-gray-500 mt-1 ml-7">
                                              {(subItem as any).description}
                                            </p>
                                          )}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-20" />
                          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full opacity-20" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              {/* Language Selector - sempre visível */}
              <LanguageSelector isTransparent={isHomePage && !scrolled} />

              {/* Search */}
              <div className="relative flex-shrink-0">
                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 250, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center"
                    >
                      <Input
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-full border-gray-300 focus:border-green-500 pr-10 text-sm h-8"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className="absolute right-2 p-1 hover:bg-gray-100 rounded-full h-6 w-6"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className={`p-1.5 rounded-full transition-colors duration-200 flex-shrink-0 ${
                          isHomePage && !scrolled ? "hover:bg-white/10 text-white" : "hover:bg-green-50 text-gray-600"
                        }`}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Portal do Cliente Button */}
              <Link href="/portal-cliente" className="flex-shrink-0 overflow-visible">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="overflow-visible">
                  <Button
                    className={`rounded-full px-5 py-2 text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap overflow-visible ${
                      isHomePage && !scrolled
                        ? "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                        : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
                    }`}
                  >
                    {t("clientPortal")}
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
                isHomePage && !scrolled ? "hover:bg-white/10 text-white" : "hover:bg-green-50 text-gray-700"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
            >
              <div className="px-8 py-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full border-gray-300 focus:border-green-500"
                  />
                </div>

                {/* Mobile Menu Items */}
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-3">
                    <Link
                      href={item.href}
                      className={`block text-lg font-semibold transition-colors duration-200 hover:text-green-600 py-2 ${
                        pathname === item.href ? "text-green-600" : "text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item.nameKey as any) || item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-3">
                        {item.submenu.map((section) => (
                          <div key={section.name} className="space-y-2">
                            <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wider">
                              {section.name}
                            </h4>
                            <div className="ml-3 space-y-1">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block text-sm transition-colors duration-200 hover:text-green-600 py-1 ${
                                    pathname === subItem.href ? "text-green-600 font-medium" : "text-gray-600"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="flex items-center space-x-2">
                                    {(subItem as any).icon && (
                                      <span className="text-base">{(subItem as any).icon}</span>
                                    )}
                                    <span>{subItem.name}</span>
                                  </div>
                                  {(subItem as any).description && (
                                    <p className="text-xs text-gray-500 mt-1 ml-6">
                                      {(subItem as any).description}
                                    </p>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <Link href="/portal-cliente" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-full py-3 font-semibold">
                      {t("clientPortal")}
                    </Button>
                  </Link>
                </div>

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSelector variant="footer" />
                </div>

                {/* Mobile Contact Info */}
                <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+55 (47) 3441-8000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>atendimento@portoitapoa.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}