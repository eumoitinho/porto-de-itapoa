"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/554734438700", "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-100 mb-2"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Atendimento</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-4">
                Olá! Como podemos ajudar você hoje?
              </p>
              
              <Button 
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center gap-2 rounded-xl transition-colors font-medium shadow-lg shadow-green-500/20"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="h-5 w-5" />
                Iniciar conversa no WhatsApp
              </Button>
              
              <div className="text-xs text-center text-gray-400 mt-2">
                Atendimento das 08:00 às 18:00
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? "bg-gray-100 text-gray-600 rotate-90" 
            : "bg-[#25D366] text-white hover:bg-[#128C7E]"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
      </motion.button>
    </div>
  )
}
