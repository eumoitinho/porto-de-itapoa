"use client"

import { motion } from "framer-motion"
import { Ship } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-green-600 border-t-transparent rounded-full"
        />
        <div className="flex items-center gap-2 text-gray-600">
          <Ship className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium">Carregando...</span>
        </div>
      </motion.div>
    </div>
  )
}
