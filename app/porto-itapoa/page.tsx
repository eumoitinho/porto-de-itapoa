import { FallbackPage } from "@/components/fallback-page"

export default function PortoItapoaPage() {
  return (
    <FallbackPage
      title="Porto Itapoá"
      description="Informações completas sobre o Porto Itapoá, suas operações, capacidades e diferenciais competitivos."
      expectedFeatures={[
        "Visão Geral do Porto",
        "Capacidades Operacionais",
        "Serviços Oferecidos",
        "Diferenciais Competitivos",
        "Estatísticas de Performance",
        "Certificações e Prêmios"
      ]}
    />
  )
}