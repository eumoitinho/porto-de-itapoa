import { FallbackPage } from "@/components/fallback-page"

export default function DenunciasPage() {
  return (
    <FallbackPage
      title="Canal de Denúncias"
      description="Canal seguro e confidencial para reportar irregularidades, garantindo a ética e transparência em nossas operações."
      expectedFeatures={[
        "Formulário de Denúncia Anônima",
        "Código de Ética",
        "Política de Compliance",
        "Acompanhamento de Casos",
        "Proteção ao Denunciante",
        "Relatórios de Transparência"
      ]}
    />
  )
}