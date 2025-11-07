import { FallbackPage } from "@/components/fallback-page"

export default function LGPDPage() {
  return (
    <FallbackPage
      title="LGPD - Lei Geral de Proteção de Dados"
      description="Informações sobre nossa conformidade com a LGPD e como protegemos os dados pessoais de nossos clientes."
      expectedFeatures={[
        "Política de Privacidade",
        "Tratamento de Dados",
        "Direitos dos Titulares",
        "Canal do Titular",
        "Medidas de Segurança",
        "Relatórios de Conformidade"
      ]}
    />
  )
}