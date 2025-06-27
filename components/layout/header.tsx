"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Institucional", 
    href: "/institucional",
    submenu: [
      { name: "Acionistas", href: "/acionistas" },
      { name: "Demonstrações Financeiras", href: "/demonstracoes" },
      { name: "Denúncias", href: "/denuncias" },
      { name: "Downloads", href: "/downloads" },
      { name: "Galerias", href: "/galerias" },
      { name: "Infraestrutura", href: "/infraestrutura" },
      { name: "Linha do Tempo", href: "/linha-tempo" },
      { name: "Pacto Global 2021", href: "/pacto-global" },
      { name: "Localização", href: "/localizacao" },
      { name: "Porto Itapoá", href: "/porto-itapoa" },
      { name: "Política de Gestão Integrada", href: "/politica-gestao" },
      { name: "LGPD", href: "/lgpd" },
      { name: "Certificações", href: "/certificacoes" },
      { name: "Premiação", href: "/premiacao" },
      { name: "Tour 360°", href: "/tour-360" }
    ]
  },
  { 
    name: "Serviços", 
    href: "/servicos",
    submenu: [
      { name: "Portfólio de Serviços", href: "/portfolio" },
      { name: "Tabela de Preços", href: "/precos" },
      { name: "Agendamento", href: "/agendamento" },
      { name: "Rastreamento", href: "/rastreamento" }
    ]
  },
  { name: "Notícias", href: "/noticias" },
  { name: "Sustentabilidade", href: "/sustentabilidade" },
  { name: "Contato", href: "/contato" }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/logo-grande-1.png"
                alt="Porto Itapoá"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-800">PORTO ITAPOÁ</span>
              <span className="text-xs text-green-600 font-medium">BUILDING THE FUTURE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center text-sm font-semibold transition-colors duration-200 hover:text-green-600 px-4 py-2 rounded-full ${
                    pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href))
                      ? "text-green-600 bg-green-50" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeSubmenu === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 hover:bg-green-50 hover:text-green-600 ${
                              pathname === subItem.href ? "text-green-600 bg-green-50" : "text-gray-700"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
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
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200"
          >
            <div className="px-8 py-6 space-y-4 max-h-96 overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
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
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block text-sm transition-colors duration-200 hover:text-green-600 py-1 ${
                            pathname === subItem.href ? "text-green-600" : "text-gray-600"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}