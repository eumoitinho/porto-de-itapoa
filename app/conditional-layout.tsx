'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FloatingChat } from '@/components/floating-chat'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')
  
  if (isStudio) {
    return <main>{children}</main>
  }
  
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingChat />
    </>
  )
}

