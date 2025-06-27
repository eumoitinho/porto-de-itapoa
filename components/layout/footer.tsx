"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  servicos: [
    { name: "Serviços Marítimos", href: "/portfolio" },
    { name: "Logística Integrada", href: "/portfolio" },
    { name: "Armazenagem", href: "/portfolio" },
    { name: "Consultoria", href: "/portfolio" },
  ],
  empresa: [
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Notícias", href: "/noticias" },
    { name: "Carreiras", href: "/carreiras" },
    { name: "Sustentabilidade", href: "/sustentabilidade" },
  ],
  suporte: [
    { name: "Contato", href: "/contato" },
    { name: "FAQ", href: "/faq" },
    { name: "Documentos", href: "/documentos" },
    { name: "Tarifas", href: "/tarifas" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
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
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo-grande-1.png"
                    alt="Porto Itapoá"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-semibold">Porto Itapoá</span>
              </Link>

              <p className="text-green-100 mb-6 leading-relaxed">
                Terminal portuário de última geração, conectando o Brasil ao mundo com eficiência, tecnologia e
                sustentabilidade.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-green-100">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">Rod. SC-415, Km 5 - Itapoá/SC</span>
                </div>
                <div className="flex items-center text-green-100">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">+55 (47) 3441-8000</span>
                </div>
                <div className="flex items-center text-green-100">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
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
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category === "servicos" ? "Serviços" : category === "empresa" ? "Empresa" : "Suporte"}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-green-100 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-green-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-100 text-sm mb-4 md:mb-0">© 2024 Porto Itapoá. Todos os direitos reservados.</p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}