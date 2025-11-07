"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, ChevronDown, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n, Language } from "@/lib/i18n/context"

const languages = [
  { 
    code: 'pt' as Language, 
    name: 'Português', 
    flag: '🇧🇷',
    shortName: 'PT'
  },
  { 
    code: 'en' as Language, 
    name: 'English', 
    flag: '🇺🇸',
    shortName: 'EN'
  },
  { 
    code: 'es' as Language, 
    name: 'Español', 
    flag: '🇪🇸',
    shortName: 'ES'
  },
  { 
    code: 'zh' as Language, 
    name: '中文', 
    flag: '🇨🇳',
    shortName: 'ZH'
  },
]

interface LanguageSelectorProps {
  variant?: 'header' | 'footer'
  className?: string
  isTransparent?: boolean
}

export function LanguageSelector({ variant = 'header', className = '', isTransparent = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Idioma:</span>
        </div>
        <div className="flex space-x-1">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                language === lang.code
                  ? 'bg-green-100 text-green-700 font-semibold border border-green-300'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.shortName}</span>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 rounded-full px-3 py-2 transition-all duration-300 ${
          isTransparent
            ? "text-white hover:bg-white/10"
            : "text-gray-700 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Languages className={`h-4 w-4 ${isTransparent ? "text-white" : "text-gray-700"}`} />
        </motion.div>
        <div className="flex items-center space-x-1">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className={`text-sm font-medium ${isTransparent ? "text-white" : "text-gray-700"}`}>{currentLanguage.shortName}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`h-3 w-3 ${isTransparent ? "text-white" : "text-gray-700"}`} />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 min-w-[180px] overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Languages className="h-3 w-3" />
                <span>Selecionar idioma</span>
              </div>
            </div>
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center space-x-3 group ${
                  language === lang.code
                    ? 'bg-green-50 text-green-700 font-medium border-r-2 border-green-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ x: 4 }}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {lang.flag}
                </span>
                <div className="flex-1">
                  <div className="font-medium">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.shortName}</div>
                </div>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar o dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}