"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Search, Globe, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Institucional", 
    href: "/institucional",
    submenu: [
      { 
        name: "Sobre o Porto", 
        items: [
          { name: "Porto Itapoá", href: "/porto-itapoa" },
          { name: "Infraestrutura", href: "/infraestrutura" },
          { name: "Localização", href: "/localizacao" },
          { name: "Tour 360°", href: "/tour-360" }
        ]
      },
      { 
        name: "Governança", 
        items: [
          { name: "Acionistas", href: "/acionistas" },
          { name: "Demonstrações Financeiras", href: "/demonstracoes" },
          { name: "Política de Gestão Integrada", href: "/politica-gestao" },
          { name: "LGPD", href: "/lgpd" }
        ]
      },
      { 
        name: "Transparência", 
        items: [
          { name: "Denúncias", href: "/denuncias" },
          { name: "Certificações", href: "/certificacoes" },
          { name: "Premiações", href: "/premiacao" },
          { name: "Pacto Global 2021", href: "/pacto-global" }
        ]
      },
      { 
        name: "Recursos", 
        items: [
          { name: "Downloads", href: "/downloads" },
          { name: "Galerias", href: "/galerias" },
          { name: "Linha do Tempo", href: "/linha-tempo" }
        ]
      }
    ]
  },
  { 
    name: "Serviços", 
    href: "/servicos",
    submenu: [
      { 
        name: "Operacionais", 
        items: [
          { name: "Portal de Compras", href: "/portal-compras" },
          { name: "Cadastro de Cliente", href: "/cadastro-cliente" },
          { name: "Cadastro de Motorista", href: "/cadastro-motorista" },
          { name: "Câmera Online", href: "/camera-online" },
          { name: "Consultas", href: "/consultas" },
          { name: "Linhas de Navegação", href: "/linhas-navegacao" },
          { name: "Tabela de Preços 2025", href: "/precos" },
          { name: "Tabela de Preços 2025 (A partir de 21/03)", href: "/precos-21-03" },
          { name: "Simuladores de Preço", href: "/simuladores" },
          { name: "Portfólio de Serviços", href: "/portfolio" },
          { name: "Procedimentos", href: "/procedimentos" },
          { name: "Cartas Protestos", href: "/cartas-protestos" },
          { name: "Programação de Navios", href: "/programacao-navios" },
          { name: "Integração de Motoristas", href: "/integracao-motoristas" },
          { name: "Integração de Terceiros", href: "/integracao-terceiros" }
        ]
      }
    ]
  },
  { name: "Notícias", href: "/noticias" },
  { name: "Sustentabilidade", href: "/sustentabilidade" },
  { name: "Contato", href: "/contato" }
]

const quickLinks = [
  { name: "Agendamento", href: "/agendamento", icon: Clock },
  { name: "Rastreamento", href: "/rastreamento", icon: Search },
  { name: "Preços", href: "/precos", icon: Phone }
]

export function Header() {
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

  // Determinar se estamos na página inicial para aplicar o efeito transparente
  const isHomePage = pathname === "/"

  return (
    <>
      {/* Top Bar - apenas quando scrolled ou não for home */}
      <AnimatePresence>
        {(scrolled || !isHomePage) && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-green-800 text-white py-2 px-8 hidden lg:block"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Av. Beira Mar 5, 2900 • Itapoá/SC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+55 (47) 3441-8000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>atendimento@portoitapoa.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>PT</span>
                </div>
                <div className="flex items-center space-x-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center space-x-1 hover:text-green-200 transition-colors"
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

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHomePage 
            ? scrolled 
              ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl" 
              : "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
        }`}
        style={
          isHomePage && !scrolled 
            ? {
                background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
                backdropFilter: 'blur(8px)'
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative w-12 h-12 transition-transform group-hover:scale-105"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo-grande-1.png"
                  alt="Porto Itapoá"
                  fill
                  className={`object-contain transition-all duration-500 ${
                    isHomePage && !scrolled ? 'brightness-0 invert' : ''
                  }`}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors duration-500 group-hover:text-green-600 ${
                  isHomePage && !scrolled 
                    ? 'text-white' 
                    : 'text-green-800'
                }`}>
                  PORTO ITAPOÁ
                </span>
                <span className={`text-xs font-medium tracking-wider transition-colors duration-500 ${
                  isHomePage && !scrolled 
                    ? 'text-green-200' 
                    : 'text-green-600'
                }`}>
                  BUILDING THE FUTURE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm font-semibold transition-all duration-300 px-4 py-3 rounded-xl relative overflow-hidden ${
                      pathname === item.href || (item.submenu && item.submenu.some(section => 
                        section.items.some(subItem => pathname === subItem.href)
                      ))
                        ? isHomePage && !scrolled
                          ? "text-green-300 bg-white/10 backdrop-blur-sm" 
                          : "text-green-600 bg-green-50"
                        : isHomePage && !scrolled
                          ? "text-white hover:text-green-200 hover:bg-white/10"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className={`ml-2 h-4 w-4 transition-all duration-300 ${
                          activeSubmenu === item.name ? 'text-green-600' : ''
                        }`} />
                      </motion.div>
                    )}
                    
                    {/* Hover Effect */}
                    <motion.div 
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
                        isHomePage && !scrolled
                          ? 'bg-white/10 backdrop-blur-sm'
                          : 'bg-gradient-to-r from-green-50 to-emerald-50'
                      }`}
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
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
                            item.name === "Serviços" ? "min-w-[600px]" : "min-w-[800px]"
                          }`}
                          style={{ 
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          {item.name === "Serviços" ? (
                            // Layout especial para Serviços - uma coluna
                            <div className="px-8">
                              {item.submenu.map((section, sectionIndex) => (
                                <motion.div
                                  key={section.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider border-b border-green-100 pb-2">
                                    {section.name}
                                  </h3>
                                  <div className="grid grid-cols-2 gap-2">
                                    {section.items.map((subItem) => (
                                      <motion.div
                                        key={subItem.name}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Link
                                          href={subItem.href}
                                          className={`block text-sm transition-all duration-200 hover:text-green-600 py-2 px-3 rounded-lg hover:bg-green-50 ${
                                            pathname === subItem.href 
                                              ? "text-green-600 bg-green-50 font-medium" 
                                              : "text-gray-700"
                                          }`}
                                        >
                                          {subItem.name}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            // Layout padrão para outros menus - quatro colunas
                            <div className="grid grid-cols-4 gap-8 px-8">
                              {item.submenu.map((section, sectionIndex) => (
                                <motion.div
                                  key={section.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider border-b border-green-100 pb-2">
                                    {section.name}
                                  </h3>
                                  <div className="space-y-2">
                                    {section.items.map((subItem) => (
                                      <motion.div
                                        key={subItem.name}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Link
                                          href={subItem.href}
                                          className={`block text-sm transition-all duration-200 hover:text-green-600 py-2 px-3 rounded-lg hover:bg-green-50 ${
                                            pathname === subItem.href 
                                              ? "text-green-600 bg-green-50 font-medium" 
                                              : "text-gray-700"
                                          }`}
                                        >
                                          {subItem.name}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                          
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
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center"
                    >
                      <Input
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-full border-gray-300 focus:border-green-500 pr-10"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className="absolute right-2 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className={`p-2 rounded-full transition-colors duration-300 ${
                          isHomePage && !scrolled
                            ? 'hover:bg-white/10 text-white'
                            : 'hover:bg-green-50 text-gray-600'
                        }`}
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Link href="/contato">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className={`rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isHomePage && !scrolled
                      ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                      : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white'
                  }`}>
                    Fale Conosco
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-green-50 text-gray-700'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
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
                      {item.name}
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
                                  {subItem.name}
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
                  <Link href="/contato" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-full py-3 font-semibold">
                      Fale Conosco
                    </Button>
                  </Link>
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