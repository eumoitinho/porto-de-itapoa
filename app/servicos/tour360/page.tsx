"use client"

import { motion } from "framer-motion"
import { Camera, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { useTour360Data } from "@/hooks/useSanityData"
import { getTranslatedField } from "@/lib/sanity-i18n"
import { PortableText } from "@/components/portable-text"

export default function Tour360Page() {
  const { t, language } = useI18n()
  const { data: pageData } = useTour360Data()

  const title = getTranslatedField(pageData?.title, language, t("tour360") || "Tour 360º")
  const description = getTranslatedField(pageData?.description, language, t("tour360Description") || "Explore o Porto Itapoá em uma experiência imersiva 360º")
  const tourUrl = pageData?.tourUrl || "https://www.portoitapoa.com/tour360/index.htm"

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

        {/* Tour 360º Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-green-800">
                  {t("tour360") || "Tour 360º"}
                </h2>
              </div>
              <div className="relative w-full h-[800px] rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src={tourUrl}
                  className="w-full h-full"
                  allow="fullscreen"
                  allowFullScreen
                  title="Tour 360º Porto Itapoá"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Link Alternativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <Card className="backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-700 border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">
                {t("openInNewTab") || "Abrir em Nova Aba"}
              </h2>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                {t("tour360Description") || "Para uma melhor experiência, abra o tour em uma nova aba"}
              </p>
              <Link href={tourUrl} target="_blank">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8">
                  {t("openTour") || "Abrir Tour 360º"}
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

