import { FallbackPage } from "@/components/fallback-page"

export default function SustentabilidadePage() {
  return (
    <FallbackPage
      title="Sustentabilidade"
      description="Conheça nossas iniciativas de sustentabilidade e compromisso com o desenvolvimento responsável."
      expectedFeatures={[
        "Política Ambiental",
        "Projetos de Sustentabilidade",
        "Gestão de Resíduos",
        "Eficiência Energética",
        "Responsabilidade Social",
        "Relatórios de Sustentabilidade"
      ]}
    />
  )
}