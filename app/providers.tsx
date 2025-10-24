"use client"

import { I18nProvider } from "@/lib/i18n/context"
import { QueryProvider } from "@/components/query-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <I18nProvider>
        {children}
      </I18nProvider>
    </QueryProvider>
  )
}