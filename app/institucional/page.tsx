import { FallbackPage } from "@/components/fallback-page"

export default function InstitucionalPage() {
  return (
    <FallbackPage
      title="Institucional"
      description="Conheça mais sobre o Porto Itapoá, nossa história, missão e valores que nos tornam referência no setor portuário brasileiro."
      expectedFeatures={[
        "História do Porto Itapoá",
        "Missão, Visão e Valores",
        "Estrutura Organizacional",
        "Governança Corporativa",
        "Relatórios Anuais",
        "Política de Sustentabilidade"
      ]}
    />
  )
}