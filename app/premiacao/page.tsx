import { FallbackPage } from "@/components/fallback-page"

export default function PremiacaoPage() {
  return (
    <FallbackPage
      title="Premiações"
      description="Reconhecimentos e prêmios recebidos pelo Porto Itapoá em reconhecimento à excelência operacional."
      expectedFeatures={[
        "Prêmios de Excelência",
        "Reconhecimentos Setoriais",
        "Certificados de Qualidade",
        "Prêmios Ambientais",
        "Reconhecimentos Internacionais",
        "Histórico de Premiações"
      ]}
    />
  )
}