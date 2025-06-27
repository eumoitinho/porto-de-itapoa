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
          { name: "Portfólio de Serviços", href: "/portfolio" },
          { name: "Tabela de Preços", href: "/precos" },
          { name: "Agendamento", href: "/agendamento" },
          { name: "Rastreamento", href: "/rastreamento" }
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

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-2 px-8 hidden lg:block">
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
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl" 
            : "bg-white/90 backdrop-blur-sm"
        }`}
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
                  className="object-contain"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-green-800 group-hover:text-green-600 transition-colors">
                  PORTO ITAPOÁ
                </span>
                <span className="text-xs text-green-600 font-medium tracking-wider">
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
                    className={`flex items-center text-sm font-semibold transition-all duration-300 hover:text-green-600 px-4 py-3 rounded-xl relative overflow-hidden ${
                      pathname === item.href || (item.submenu && item.submenu.some(section => 
                        section.items.some(subItem => pathname === subItem.href)
                      ))
                        ? "text-green-600 bg-green-50" 
                        : "text-gray-700 hover:bg-green-50"
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
                      className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" 
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
                          className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 z-50 min-w-[800px]"
                          style={{ 
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                          }}
                        >
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
                        className="p-2 hover:bg-green-50 rounded-full"
                      >
                        <Search className="h-5 w-5 text-gray-600" />
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
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Fale Conosco
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden p-2 hover:bg-green-50 rounded-xl" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
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