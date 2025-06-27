"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Shield, Clock, Users, Globe, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

export default function PortalClientePage() {
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento do iframe
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Site
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">Portal do Cliente</h1>
                <p className="text-sm text-gray-600">Acesso aos serviços digitais do Porto Itapoá</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Conexão Segura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-20"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="h-8 w-8 text-green-600" />
              </motion.div>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Carregando Portal do Cliente</h2>
            <p className="text-gray-600">Conectando aos serviços digitais...</p>
          </div>
        </motion.div>
      )}

      {/* Informações do Portal */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Gestão de Conta</h3>
              <p className="text-sm text-gray-600">Gerencie seus dados e preferências</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Agendamentos</h3>
              <p className="text-sm text-gray-600">Agende entregas e retiradas</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Rastreamento</h3>
              <p className="text-sm text-gray-600">Acompanhe suas cargas</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Documentos</h3>
              <p className="text-sm text-gray-600">Acesse documentos e relatórios</p>
            </CardContent>
          </Card>
        </div>

        {/* Iframe Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}
        >
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-600 font-mono">
                https://clientes.portoitapoa.com/#/login
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://clientes.portoitapoa.com/#/login', '_blank')}
              className="text-gray-500 hover:text-green-600"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir em nova aba
            </Button>
          </div>
          
          <iframe
            src="https://clientes.portoitapoa.com/#/login"
            className="w-full h-full border-0"
            title="Portal do Cliente - Porto Itapoá"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            onLoad={() => setIsLoading(false)}
          />
        </motion.div>

        {/* Informações de Suporte */}
        <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Precisa de Ajuda?</h3>
              <p className="text-green-700 mb-4">
                Nossa equipe de suporte está disponível para auxiliar com o Portal do Cliente.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-800">Suporte Técnico:</p>
                  <p className="text-green-700">suporte@portoitapoa.com</p>
                  <p className="text-green-700">+55 47 3443.8700</p>
                </div>
                <div>
                  <p className="font-medium text-green-800">Horário de Atendimento:</p>
                  <p className="text-green-700">Segunda a sexta: 08h às 18h</p>
                  <p className="text-green-700">Sábados: 08h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}