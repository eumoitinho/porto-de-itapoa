"use client"

import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative z-10 bg-neutral-950 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left section: Logo, Desc, Contact */}
          <div className="space-y-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative w-32 h-32">
                   {/* Logo monocromática branca */}
                   <Image
                     src="/logo-grande-1.png"
                     alt="Porto Itapoá"
                     fill
                     className="object-contain brightness-0 invert"
                   />
                </div>
              </Link>
              
              <p className="text-neutral-400 max-w-md leading-relaxed">
                Terminal portuário de última geração, conectando o Brasil ao mundo com eficiência, tecnologia, segurança e sustentabilidade.
              </p>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center text-neutral-400">
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm">Rod. SC-415, Km 5 - Itapoá/SC</span>
                </div>
                <div className="flex items-center text-neutral-400">
                  <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm">+55 (47) 3443-8700</span>
                </div>
                <div className="flex items-center text-neutral-400">
                  <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm">atendimento@portoitapoa.com</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
               {/* Redes Sociais */}
               <a href="https://www.linkedin.com/company/porto-itapoa/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
                 <Linkedin className="h-5 w-5" />
               </a>
               <a href="https://www.instagram.com/portoitapoa/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
                 <Instagram className="h-5 w-5" />
               </a>
               <a href="https://www.facebook.com/portoitapoa/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
                 <Facebook className="h-5 w-5" />
               </a>
            </div>
          </div>

          {/* Right section: Links */}
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">{t("services")}</h3>
              <ul className="space-y-4">
                <li><Link href="/servicos" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("maritimeServices")}</Link></li>
                <li><Link href="/agendamento" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("shipSchedulingNav")}</Link></li>
                <li><Link href="/rastreamento" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("tracking")}</Link></li>
                <li><Link href="/precos" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("priceTable")}</Link></li>
                <li><Link href="/portal-cliente" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("clientPortal")}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">{t("institutional")}</h3>
              <ul className="space-y-4">
                <li><Link href="/institucional" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("aboutUs")}</Link></li>
                <li><Link href="/sustentabilidade" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("sustainability")}</Link></li>
                <li><Link href="/noticias" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("news")}</Link></li>
                <li><Link href="/contato" className="text-sm text-neutral-400 hover:text-emerald-400 transition">{t("contact")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © 2025 Porto Itapoá. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition">{t("termsOfUse")}</a>
            <a href="#" className="hover:text-white transition">{t("privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}