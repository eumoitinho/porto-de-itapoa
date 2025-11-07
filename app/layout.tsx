import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "./providers"
import { ConditionalLayout } from "./conditional-layout"

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans"
})

export const metadata: Metadata = {
  title: "Porto Itapoá - Gateway da América Latina",
  description:
    "Terminal portuário de última geração, conectando o Brasil ao mundo com eficiência, tecnologia e sustentabilidade.",
  keywords: "porto, itapoá, terminal, portuário, brasil, logística, containers, navegação",
  openGraph: {
    title: "Porto Itapoá - Gateway da América Latina",
    description:
      "Terminal portuário de última geração, conectando o Brasil ao mundo com eficiência, tecnologia e sustentabilidade.",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${openSans.variable} font-sans`}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}
