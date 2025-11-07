"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Download, FileText, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useI18n } from "@/lib/i18n/context"
import { useSimuladoresPrecosData } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"
import Link from "next/link"

export default function SimuladoresPrecosPage() {
  const { t, language } = useI18n()
  const { data: pageData } = useSimuladoresPrecosData()
  const [activeTab, setActiveTab] = useState<'importacao-fcl' | 'importacao-lcl' | 'exportacao-fcl'>('importacao-fcl')
  
  // Estados para os cálculos
  const [peso, setPeso] = useState('')
  const [volume, setVolume] = useState('')
  const [valor, setValor] = useState('')
  const [resultado, setResultado] = useState<number | null>(null)

  const title = getTranslatedField(pageData?.title, language, t("priceSimulators") || "Simuladores de Preços")
  const description = getTranslatedField(pageData?.description, language, t("priceSimulatorsDescription") || "Calcule os custos de importação e exportação")
  const tabelaPdfUrl = pageData?.tabelaPdfUrl || "https://www.portoitapoa.com/wp-content/uploads/2025/03/Tabela-Publica-2025-Final-Fevereiro.pdf"

  const calcularPreco = () => {
    // TODO: Integrar com API real de cálculo
    // Por enquanto, cálculo simulado
    const pesoNum = parseFloat(peso) || 0
    const volumeNum = parseFloat(volume) || 0
    const valorNum = parseFloat(valor) || 0

    let calculo = 0
    if (activeTab === 'importacao-fcl') {
      calculo = pesoNum * 50 + volumeNum * 30 + valorNum * 0.05
    } else if (activeTab === 'importacao-lcl') {
      calculo = pesoNum * 60 + volumeNum * 35 + valorNum * 0.06
    } else if (activeTab === 'exportacao-fcl') {
      calculo = pesoNum * 45 + volumeNum * 28 + valorNum * 0.04
    }

    setResultado(calculo)
  }

  return (
    <div className="min-h-screen mt-44 py-16 px-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title mb-6">
            {title}
          </h1>
          <p className="section-subtitle max-w-4xl">
            {description}
          </p>
        </motion.div>

        {/* Intro */}
        {pageData?.intro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <PortableText 
                  content={pageData.intro}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tabs de Simuladores */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="importacao-fcl">
              {t("importFCL") || "Importação FCL"}
            </TabsTrigger>
            <TabsTrigger value="importacao-lcl">
              {t("importLCL") || "Importação LCL"}
            </TabsTrigger>
            <TabsTrigger value="exportacao-fcl">
              {t("exportFCL") || "Exportação FCL"}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Calculadora */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-green-800">
                  {t("priceCalculator") || "Calculadora de Preços"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="peso" className="text-gray-700 mb-2 block">
                    {t("weight") || "Peso (kg)"}
                  </Label>
                  <Input
                    id="peso"
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="0"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="volume" className="text-gray-700 mb-2 block">
                    {t("volume") || "Volume (m³)"}
                  </Label>
                  <Input
                    id="volume"
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="0"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="valor" className="text-gray-700 mb-2 block">
                    {t("value") || "Valor (R$)"}
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="0"
                    className="w-full"
                  />
                </div>
              </div>

              <Button 
                onClick={calcularPreco}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6 text-lg mb-6"
              >
                <Calculator className="mr-2 h-5 w-5" />
                {t("calculate") || "Calcular"}
              </Button>

              {resultado !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    {t("estimatedPrice") || "Preço Estimado"}
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabela de Preços PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8" />
                <h2 className="text-2xl font-semibold">
                  {t("priceTable") || "Tabela de Preços"}
                </h2>
              </div>
              <p className="text-green-100 mb-6 max-w-3xl">
                {t("priceTableDescription") || "Baixe a tabela completa de preços públicos para consulta detalhada"}
              </p>
              <Link href={tabelaPdfUrl} target="_blank">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8">
                  <Download className="mr-2 h-5 w-5" />
                  {t("downloadPriceTable") || "Baixar Tabela de Preços"}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

