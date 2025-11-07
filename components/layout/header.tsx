"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Search } from 'lucide-react'
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
  },
  {
    name: "Institucional",
    href: "/institucional",
    nameKey: "institutional",
    submenu: [
      {
        name: "Sobre o Porto",
        nameKey: "aboutPort",
        items: [
          { 
            name: "Porto Itapoá", 
            nameKey: "portItapoa",
            href: "/institucional/porto-itapoa",
            description: "História, Linha do Tempo e Localização",
            descriptionKey: "portItapoaDescription"
          },
          { 
            name: "Acionistas", 
            nameKey: "shareholders",
            href: "/institucional/acionistas",
            description: "Estrutura acionária e governança",
            descriptionKey: "shareholdersDescription"
          },
          { 
            name: "Certificações", 
            nameKey: "certifications",
            href: "/institucional/certificacoes",
            description: "Certificações e credenciamentos",
            descriptionKey: "certificationsDescription"
          },
          { 
            name: "Premiações", 
            nameKey: "awards",
            href: "/institucional/premiacoes",
            description: "Reconhecimentos e prêmios",
            descriptionKey: "awardsDescription"
          },
        ],
      },
      {
        name: "Estrutura e Recursos",
        nameKey: "structureAndResources",
        items: [
          { 
            name: "Infraestrutura", 
            nameKey: "infrastructure",
            href: "/institucional/infraestrutura",
            description: "Infraestrutura portuária e Tour 360°",
            descriptionKey: "infrastructureDescription"
          },
          { 
            name: "Downloads", 
            nameKey: "downloads",
            href: "/institucional/downloads",
            description: "Demonstrações Financeiras, Pacto Global e Política de Gestão",
            descriptionKey: "downloadsDescription"
          },
          { 
            name: "Portfólio de Serviços", 
            nameKey: "servicePortfolio",
            href: "/institucional/portfolio",
            description: "Serviços e procedimentos operacionais",
            descriptionKey: "servicePortfolioDescription"
          },
        ],
      },
      {
        name: "Mídia e Compliance",
        nameKey: "mediaAndCompliance",
        items: [
          { 
            name: "Galerias", 
            nameKey: "galleries",
            href: "/institucional/galerias",
            description: "Fotos e vídeos institucionais",
            descriptionKey: "galleriesDescription"
          },
          { 
            name: "LGPD", 
            nameKey: "lgpd",
            href: "/institucional/lgpd",
            description: "Proteção de dados e privacidade",
            descriptionKey: "lgpdDescription"
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
        nameKey: "registrationsAndAccess",
        items: [
          { 
            name: "Portal de Compras", 
            nameKey: "purchasePortal",
            href: "/servicos/portal-compras",
          },
          { 
            name: "Cadastro de Cliente", 
            nameKey: "clientRegistration",
            href: "/servicos/cadastro-cliente",
          },
          { 
            name: "Cadastro de Motorista", 
            nameKey: "driverRegistration",
            href: "/servicos/cadastro-motorista",
          },
        ],
      },
      {
        name: "Operações",
        nameKey: "operations",
        items: [
          { 
            name: "Programação de Navios", 
            nameKey: "shipScheduling",
            href: "/servicos/programacao-navios",
            description: "Programação e Câmera 360°",
            descriptionKey: "shipSchedulingDescription"
          },
          { 
            name: "Integração de Motoristas", 
            nameKey: "driverIntegration",
            href: "/servicos/integracao-motoristas",
          },
          { 
            name: "Integração de Serviços", 
            nameKey: "serviceIntegration",
            href: "/servicos/integracao-servicos",
          },
        ],
      },
      {
        name: "Consultas e Simulações",
        nameKey: "queriesAndSimulations",
        items: [
          { 
            name: "Simuladores de Preços", 
            nameKey: "priceSimulators",
            href: "/servicos/simuladores",
            description: "Simulação e Tabela de Preços",
            descriptionKey: "priceSimulatorsDescription"
          },
          { 
            name: "Consultas", 
            nameKey: "queries",
            href: "/servicos/consultas",
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

export function Header() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const pathname = usePathname()

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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                className="relative w-16 h-16 lg:w-20 lg:h-20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/logo-grande-1.png"
                  alt="Porto Itapoá"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm font-medium transition-colors duration-200 py-2 ${
                      pathname === item.href ||
                      (item.submenu && item.submenu.some((section) => section.items.some((subItem) => pathname.startsWith(subItem.href))))
                        ? "text-accent"
                        : "text-gray-700 hover:text-accent"
                    }`}
                  >
                    <span>{t(item.nameKey as any) || item.name}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </motion.div>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-4 bg-white rounded-lg shadow-2xl border border-gray-100 py-8 z-50 min-w-[600px]"
                        >
                          <div className="grid grid-cols-3 gap-8 px-8">
                            {item.submenu.map((section) => (
                              <div key={section.name} className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                  {t(section.nameKey as any) || section.name}
                                  </h3>
                                <div className="space-y-3">
                                    {section.items.map((subItem) => (
                                        <Link
                                      key={subItem.name}
                                          href={subItem.href}
                                      className={`block text-sm transition-colors duration-200 ${
                                            pathname === subItem.href
                                          ? "text-accent font-medium"
                                          : "text-gray-700 hover:text-accent"
                                          }`}
                                        >
                                      <div>
                                        <div>{t(subItem.nameKey as any) || subItem.name}</div>
                                          {(subItem as any).description && (
                                          <p className="text-xs text-gray-500 mt-1">
                                            {t((subItem as any).descriptionKey as any) || (subItem as any).description}
                                            </p>
                                          )}
                                      </div>
                                        </Link>
                                    ))}
                                  </div>
                              </div>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
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
                        className="h-10 text-sm"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className="absolute right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                      className="hover:bg-gray-100"
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Selector */}
              <LanguageSelector />

              {/* CTA Button */}
              <Link href="/portal-cliente">
                <Button variant="default" size="sm" className="shadow-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">
                    {t("clientPortal")}
                  </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-6 py-6 space-y-4 max-h-96 overflow-y-auto">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11"
                  />
                </div>

                {/* Mobile Menu Items */}
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <Link
                      href={item.href}
                      className={`block text-base font-medium ${
                        pathname === item.href ? "text-accent" : "text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item.nameKey as any) || item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-2">
                        {item.submenu.map((section) => (
                          <div key={section.name} className="space-y-1">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              {section.name}
                            </h4>
                            <div className="ml-2 space-y-1">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block text-sm ${
                                    pathname === subItem.href ? "text-accent font-medium" : "text-gray-600"
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
                <div className="pt-4 border-t border-gray-100">
                  <Link href="/portal-cliente" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0" size="lg">
                      {t("clientPortal")}
                    </Button>
                  </Link>
                </div>

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-100">
                  <LanguageSelector variant="footer" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
