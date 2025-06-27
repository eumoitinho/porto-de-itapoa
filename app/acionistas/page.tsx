import { FallbackPage } from "@/components/fallback-page"

export default function AcionistasPage() {
  return (
    <FallbackPage
      title="Acionistas"
      description="Informações relevantes para nossos acionistas, incluindo relatórios financeiros, assembleias e comunicados oficiais."
      expectedFeatures={[
        "Estrutura Acionária",
        "Relatórios Trimestrais",
        "Atas de Assembleias",
        "Comunicados aos Acionistas",
        "Calendário de Eventos",
        "Política de Dividendos"
      ]}
    />
  )
}