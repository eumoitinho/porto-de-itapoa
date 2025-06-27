"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"
import { useI18n } from "@/lib/i18n/context"

const footerLinks = {
  servicos: [
    { name: "Serviços Marítimos", href: "/portfolio", nameKey: "regularMaritimeServices" },
    { name: "Logística Integrada", href: "/portfolio", nameKey: "integratedLogistics" },
    { name: "Armazenagem", href: "/portfolio", nameKey: "storage" },
    { name: "Consultoria", href: "/portfolio", nameKey: "consulting" },
  ],
  empresa: [
    { name: "Sobre Nós", href: "/institucional", nameKey: "aboutUs" },
    { name: "Notícias", href: "/noticias", nameKey: "news" },
    { name: "Carreiras", href: "/carreiras", nameKey: "careers" },
    { name: "Sustentabilidade", href: "/sustentabilidade", nameKey: "sustainability" },
  ],
  suporte: [
    { name: "Contato", href: "/contato", nameKey: "contact" },
    { name: "FAQ", href: "/faq", nameKey: "faq" },
    { name: "Documentos", href: "/downloads", nameKey: "documents" },
    { name: "Tarifas", href: "/precos", nameKey: "rates" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
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

              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('footerDescription')}
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0 text-green-600" />
                  <span className="text-sm">Rod. SC-415, Km 5 - Itapoá/SC</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-green-600" />
                  <span className="text-sm">+55 (47) 3441-8000</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-green-600" />
                  <span className="text-sm">contato@portoitapoa.com.br</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-green-800 capitalize">
                {category === "servicos" ? t("services") : category === "empresa" ? "Empresa" : "Suporte"}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Portal do Cliente Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-green-800 mb-2">Portal do Cliente</h3>
                <p className="text-gray-600 mb-4">
                  Acesse nossos serviços digitais para agendamentos, rastreamento e muito mais.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Disponível 24/7</span>
                </div>
              </div>
              <Link href="/portal-cliente">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  Acessar Portal
                  <ExternalLink className="ml-2 h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © 2024 Porto Itapoá. {t('allRightsReserved')}
              </p>
              <LanguageSelector variant="footer" />
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-green-600 group-hover:text-green-700" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}