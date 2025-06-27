import { FallbackPage } from "@/components/fallback-page"

export default function RastreamentoPage() {
  return (
    <FallbackPage
      title="Rastreamento"
      description="Acompanhe em tempo real a localização e status de seus contêineres e cargas no Porto Itapoá."
      expectedFeatures={[
        "Rastreamento em Tempo Real",
        "Status de Contêineres",
        "Localização no Pátio",
        "Histórico de Movimentações",
        "Alertas e Notificações",
        "Relatórios de Posição"
      ]}
    />
  )
}