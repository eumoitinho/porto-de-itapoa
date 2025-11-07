"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ExternalLink, ArrowRight } from "lucide-react"
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
    <footer className="relative z-10 bg-white border-t border-gray-200">
    <div className="md:px-10 lg:py-20 max-w-7xl mr-auto ml-auto pt-16 pr-6 pb-16 pl-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left section */}
        <div className="space-y-8">
          <div>
          <Link href="/" className="flex items-center space-x-3 mb-2">
                <div className="relative w-28 h-28">
                  <Image
                    src="/logo-grande-1.png"
                    alt="Porto Itapoá"
                    fill
                    className="object-contain"
                  />
                </div>
               
              </Link>
            <p className="text-gray-600 max-w-md">
              {t("footerDescription")}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-900">{t("readyToCollaborate")}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contato">
                <button className="inline-flex items-center gap-2 rounded-xl bg-green-500 text-white px-4 py-2 text-sm font-medium hover:bg-green-400 transition">
                  {t("contactUsFooter")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/servicos">
                <button className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                  {t("ourServices")}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">{t("services")}</h3>
            <ul className="space-y-3">
              <li><Link href="/servicos" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("maritimeServices")}</Link></li>
              <li><Link href="/agendamento" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("shipSchedulingNav")}</Link></li>
              <li><Link href="/rastreamento" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("tracking")}</Link></li>
              <li><Link href="/precos" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("priceTable")}</Link></li>
              <li><Link href="/portal-cliente" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("clientPortal")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">{t("institutional")}</h3>
            <ul className="space-y-3">
              <li><Link href="/institucional" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("aboutUs")}</Link></li>
              <li><Link href="/sustentabilidade" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("sustainability")}</Link></li>
              <li><Link href="/noticias" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("news")}</Link></li>
              <li><Link href="/contato" className="text-sm text-gray-600 hover:text-gray-900 transition">{t("contact")}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © 2025 Porto Itapoá. {t("allRightsReserved")}
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900 transition">{t("termsOfUse")}</a>
          <a href="#" className="hover:text-gray-900 transition">{t("privacy")}</a>
        </div>
      </div>
    </div>
  </footer>
  
  )
}