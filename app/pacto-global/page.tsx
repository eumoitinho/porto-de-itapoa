import { FallbackPage } from "@/components/fallback-page"

export default function PactoGlobalPage() {
  return (
    <FallbackPage
      title="Pacto Global 2021"
      description="Nosso compromisso com os princípios do Pacto Global da ONU e as iniciativas de sustentabilidade implementadas."
      expectedFeatures={[
        "Princípios do Pacto Global",
        "Relatório de Progresso",
        "Iniciativas Ambientais",
        "Responsabilidade Social",
        "Metas de Sustentabilidade",
        "Indicadores de Performance"
      ]}
    />
  )
}