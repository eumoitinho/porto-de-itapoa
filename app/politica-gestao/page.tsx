import { FallbackPage } from "@/components/fallback-page"

export default function PoliticaGestaoPage() {
  return (
    <FallbackPage
      title="Política de Gestão Integrada"
      description="Nossa política de gestão integrada abrangendo qualidade, meio ambiente, saúde e segurança ocupacional."
      expectedFeatures={[
        "Política de Qualidade",
        "Gestão Ambiental",
        "Saúde e Segurança",
        "Sistemas de Gestão",
        "Procedimentos Operacionais",
        "Monitoramento e Controle"
      ]}
    />
  )
}